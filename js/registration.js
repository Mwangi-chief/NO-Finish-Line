class RegistrationApp {
  constructor() {
    this.apiBaseUrl = 'https://nofinishnrbdjango.fly.dev/api';
      // Initiate Pesapal payment
      async initiatePesapalPayment(paymentData) {
        const response = await fetch(`${this.apiBaseUrl}/pesapal/initiate/`, {
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
        alert(`M-Pesa payment request sent to ${phoneInput.value}. Please complete the payment on your phone.`);
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

    const response = await fetch(`${this.apiBaseUrl}/registrations/individual/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    });

    return await response.json();
  }

  async submitGroupRegistration() {
    const formData = {
      groupType: document.querySelector('#groupForm select')?.value,
      organizationName: document.querySelector('#groupForm input[placeholder="Organization Name"]')?.value,
      totalParticipants: parseInt(document.getElementById('participantCount')?.value) || 1,
      contactPerson: document.querySelector('input[placeholder="Emergency Contact Name"]')?.value,
      contactPhone: document.querySelector('input[placeholder="Emergency Contact Phone"]')?.value
    };

    // Validate required fields
    if (!formData.groupType || !formData.organizationName || !formData.contactPerson || !formData.contactPhone) {
      throw new Error('Please fill in all required fields');
    }

    const response = await fetch(`${this.apiBaseUrl}/registrations/group/`, {
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

  // Handle URL hash for direct linking to group form
  if (window.location.hash === '#groupForm') {
    const groupTab = document.getElementById('groupTab');
    if (groupTab) groupTab.click();
  }
});