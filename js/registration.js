class RegistrationApp {
  constructor() {
    this.apiBaseUrl = 'https://nofinishnrbdjango.fly.dev/api';
    // Initiate Pesapal payment (fields at root, correct endpoint)
    async initiatePesapalPayment({ amount, firstName, lastName, email, phone }) {
      const paymentData = {
        amount,
        currency: 'KES',
        description: 'Registration Payment',
        first_name: firstName,
        last_name: lastName,
        email,
        phone_number: phone
      };
      const response = await fetch(`${this.apiBaseUrl}/payments/initiate/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(paymentData)
      });
      return await response.json();
    }
    this.initEventListeners();
  }

  initEventListeners() {
    // Form tab switching
    document.getElementById('individualTab')?.addEventListener('click', () => this.showIndividualForm());
    document.getElementById('groupTab')?.addEventListener('click', () => this.showGroupForm());

    // Participant count change
    const participantInput = document.getElementById('participantCount');
    if (participantInput) {
      participantInput.addEventListener('input', () => this.updateGroupAmount());
    }

    // Form submission //
    const form = document.querySelector('form');
    if (form) {
      form.addEventListener('submit', (e) => this.handleFormSubmit(e));
    }
  }

  showIndividualForm() {
    document.getElementById('individualTab').classList.remove('inactive');
    document.getElementById('individualTab').classList.add('active');
    document.getElementById('groupTab').classList.remove('active');
    document.getElementById('groupTab').classList.add('inactive');
    document.getElementById('individualForm').classList.remove('hidden');
    document.getElementById('groupForm').classList.add('hidden');

    // Set required for individual fields, remove for group fields
    document.getElementById('fullName')?.setAttribute('required', 'required');
    document.getElementById('email')?.setAttribute('required', 'required');
    document.getElementById('phone')?.setAttribute('required', 'required');
    document.getElementById('dob')?.setAttribute('required', 'required');
    document.getElementById('raceCategory')?.setAttribute('required', 'required');
    document.getElementById('groupName')?.removeAttribute('required');
    document.getElementById('groupFullName')?.removeAttribute('required');
    document.getElementById('groupEmail')?.removeAttribute('required');
    document.getElementById('groupPhone')?.removeAttribute('required');

    // Reset amount displays
    this.updateAmountDisplay(3000);
  }

  showGroupForm() {
    document.getElementById('groupTab').classList.remove('inactive');
    document.getElementById('groupTab').classList.add('active');
    document.getElementById('individualTab').classList.remove('active');
    document.getElementById('individualTab').classList.add('inactive');
    document.getElementById('groupForm').classList.remove('hidden');
    document.getElementById('individualForm').classList.add('hidden');

    // Set required for group fields, remove for individual fields
    document.getElementById('groupName')?.setAttribute('required', 'required');
    document.getElementById('groupFullName')?.setAttribute('required', 'required');
    document.getElementById('groupEmail')?.setAttribute('required', 'required');
    document.getElementById('groupPhone')?.setAttribute('required', 'required');
    document.getElementById('fullName')?.removeAttribute('required');
    document.getElementById('email')?.removeAttribute('required');
    document.getElementById('phone')?.removeAttribute('required');
    document.getElementById('dob')?.removeAttribute('required');
    document.getElementById('raceCategory')?.removeAttribute('required');

    // Calculate initial amount
    const initialCount = parseInt(document.getElementById('participantCount').value) || 1;
    this.updateGroupAmount(initialCount);
  }

  updateGroupAmount() {
    const count = parseInt(document.getElementById('participantCount').value) || 1;
    const totalAmount = count * 3000;

    // Update displays
    document.getElementById('displayParticipantCount').textContent = count;
    document.getElementById('totalAmount').textContent = `${totalAmount.toLocaleString()} KES`;
    this.updateAmountDisplay(totalAmount);
  }

  updateAmountDisplay(amount) {
    document.getElementById('mpesaAmount').textContent = `${amount.toLocaleString()} KES`;
    document.getElementById('confirmAmount').textContent = `${amount.toLocaleString()} KES`;
    document.getElementById('submitAmount').textContent = `${amount.toLocaleString()} KES`;
  }

  async handleFormSubmit(e) {
    e.preventDefault();

    const isGroupForm = !document.getElementById('groupForm').classList.contains('hidden');
    const phoneInput = document.querySelector('input[type="tel"]');

    if (!phoneInput?.value || phoneInput.value.length < 9) {
      alert('Please enter a valid M-Pesa phone number');
      return;
    }

    const submitBtn = document.querySelector('form button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';
    submitBtn.disabled = true;

    try {
      let response;
      if (isGroupForm) {
        response = await this.submitGroupRegistration();
      } else {
        response = await this.submitIndividualRegistration();
      }

      if (response?.success) {
        // Prepare payment data
        const fullName = document.querySelector('input[placeholder="Full Name"]')?.value || '';
        const [firstName, ...rest] = fullName.split(' ');
        const lastName = rest.join(' ') || '';
        const email = document.querySelector('input[placeholder="Email"]')?.value || '';
        let phone = document.querySelector('input[placeholder="Phone Number (for M-Pesa payment)"]')?.value || '';
        if (phone.startsWith('0')) phone = '254' + phone.slice(1);
        const amount = isGroupForm ? (response.totalAmount || 3000) : 3000;
        // Call Pesapal payment initiation
        await this.initiatePesapalPayment({ amount, firstName, lastName, email, phone });
        alert(`M-Pesa payment request sent to ${phone}. Please complete the payment on your phone.`);

        // Poll registration/payment status using registration_id
        const currentRegistrationId = response.registration_id;
        if (!currentRegistrationId) {
          console.error('registrationId is undefined!');
          return;
        }
        pollPaymentStatus(currentRegistrationId, isGroupForm);
        // Optionally redirect to confirmation page
        // window.location.href = '/registration-success.html';
      } else {
        throw new Error(response?.message || 'Registration failed');
      }
    } catch (error) {
      console.error('Registration error:', error);
      alert(`Registration failed: ${error.message}`);
    } finally {
      submitBtn.innerHTML = originalText;
      submitBtn.disabled = false;
    }
  }

  async submitIndividualRegistration() {
    const formData = {
      fullName: document.querySelector('input[placeholder="Full Name"]')?.value,
      email: document.querySelector('input[placeholder="Email"]')?.value,
      phone: document.querySelector('input[placeholder="Phone Number (for M-Pesa payment)"]')?.value,
      dateOfBirth: document.querySelector('input[type="date"]')?.value,
      raceCategory: document.querySelector('select')?.value,
      emergencyContact: {
        name: document.querySelector('input[placeholder="Emergency Contact Name"]')?.value,
        phone: document.querySelector('input[placeholder="Emergency Contact Phone"]')?.value
      }
    };

    // Validate required fields
    if (!formData.fullName || !formData.email || !formData.phone || !formData.dateOfBirth || !formData.raceCategory) {
      throw new Error('Please fill in all required fields');
    }

    const response = await fetch(`${this.apiBaseUrl}/users/registrations/individual/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    });

    return await response.json();
  }

  ////////

  async submitGroupRegistration() {
    const formData = {
      groupName: document.getElementById('groupName')?.value,
      fullName: document.getElementById('groupFullName')?.value,
      email: document.getElementById('groupEmail')?.value,
      phone: document.getElementById('groupPhone')?.value
    };

    // Validate required fields
    if (!formData.groupName || !formData.fullName || !formData.email || !formData.phone) {
      throw new Error('Please fill in all required fields');
    }

    const response = await fetch(`${this.apiBaseUrl}/users/registrations/group/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    });

    return await response.json();
  }
}

// Initialize the app
document.addEventListener('DOMContentLoaded', () => {
  new RegistrationApp();

  // On load, set required attributes correctly for visible form
  const groupForm = document.getElementById('groupForm');
  const individualForm = document.getElementById('individualForm');
  if (groupForm && individualForm) {
    if (!groupForm.classList.contains('hidden')) {
      document.getElementById('groupName')?.setAttribute('required', 'required');
      document.getElementById('groupFullName')?.setAttribute('required', 'required');
      document.getElementById('groupEmail')?.setAttribute('required', 'required');
      document.getElementById('groupPhone')?.setAttribute('required', 'required');
      document.getElementById('fullName')?.removeAttribute('required');
      document.getElementById('email')?.removeAttribute('required');
      document.getElementById('phone')?.removeAttribute('required');
      document.getElementById('dob')?.removeAttribute('required');
      document.getElementById('raceCategory')?.removeAttribute('required');
    } else {
      document.getElementById('fullName')?.setAttribute('required', 'required');
      document.getElementById('email')?.setAttribute('required', 'required');
      document.getElementById('phone')?.setAttribute('required', 'required');
      document.getElementById('dob')?.setAttribute('required', 'required');
      document.getElementById('raceCategory')?.setAttribute('required', 'required');
      document.getElementById('groupName')?.removeAttribute('required');
      document.getElementById('groupFullName')?.removeAttribute('required');
      document.getElementById('groupEmail')?.removeAttribute('required');
      document.getElementById('groupPhone')?.removeAttribute('required');
    }
  }

  // Handle URL hash for direct linking to group form
  if (window.location.hash === '#groupForm') {
    const groupTab = document.getElementById('groupTab');
    if (groupTab) groupTab.click();
  }
});