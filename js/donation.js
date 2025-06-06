// js/donation.js
class DonationHandler {
  constructor() {
    this.initEventListeners();
  }

  initEventListeners() {
    // Donation amount selection
    const donationOptions = document.querySelectorAll('.donation-option');
    const customAmountInput = document.querySelector('input[type="number"]');

    donationOptions.forEach(option => {
      option.addEventListener('click', function() {
        donationOptions.forEach(opt => opt.classList.remove('active', 'bg-[#E52D2F]', 'text-white'));
        this.classList.add('active', 'bg-[#E52D2F]', 'text-white');
        customAmountInput.value = '';
      });
    });

    customAmountInput.addEventListener('input', function() {
      donationOptions.forEach(opt => opt.classList.remove('active', 'bg-[#E52D2F]', 'text-white'));
    });

    // Payment method selection
    const paymentMethods = document.querySelectorAll('input[name="payment"]');

    paymentMethods.forEach(method => {
      method.addEventListener('change', function() {
        // You can add payment method specific UI changes here if needed
      });
    });

    // Form submission
    const donationForm = document.getElementById('donation-form') || document.querySelector('.max-w-3xl form');
    if (donationForm) {
      donationForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        await this.processDonation();
      });
    }

    // Sponsor buttons
    const sponsorButtons = document.querySelectorAll('[class*="Partner"]');
    sponsorButtons.forEach(button => {
      button.addEventListener('click', async (e) => {
        e.preventDefault();
        const tier = e.target.textContent.replace('Become ', '').replace(' Partner', '').toLowerCase();
        await this.initiateSponsorship(tier);
      });
    });
  }

  async processDonation() {
    const amount = document.querySelector('.donation-option.active')?.textContent ||
                  document.querySelector('input[type="number"]').value;

    if (!amount || isNaN(amount)) {
      this.showAlert('Please select or enter a valid donation amount');
      return;
    }

    const paymentMethod = document.querySelector('input[name="payment"]:checked').id;
    const firstName = document.querySelector('input[placeholder="First Name"]').value;
    const lastName = document.querySelector('input[placeholder="Last Name"]').value;
    const email = document.querySelector('input[type="email"]').value;
    const phone = document.querySelector('input[type="tel"]').value;
    const isRecurring = document.getElementById('recurring').checked;

    const donationData = {
      amount: parseFloat(amount),
      paymentMethod,
      firstName,
      lastName,
      email,
      phone,
      isRecurring
    };

    try {
      // Show loading state
      const donateButton = document.querySelector('button.bg-\\[#E52D2F\\]');
      const originalText = donateButton.textContent;
      donateButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';
      donateButton.disabled = true;

      // Replace with your actual API endpoint
      const response = await fetch('https://your-api-endpoint.com/donations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(donationData)
      });

      const result = await response.json();

      if (response.ok) {
        // Redirect to thank you page or show success message
        window.location.href = `/thank-you.html?amount=${amount}`;
      } else {
        throw new Error(result.message || 'Donation failed');
      }
    } catch (error) {
      console.error('Donation error:', error);
      this.showAlert(`Donation failed: ${error.message}`);
    } finally {
      // Reset button state
      const donateButton = document.querySelector('button.bg-\\[#E52D2F\\]');
      if (donateButton) {
        donateButton.textContent = originalText;
        donateButton.disabled = false;
      }
    }
  }

  async initiateSponsorship(tier) {
    // You would typically show a modal or redirect to a sponsorship form
    // For now, we'll just redirect to a contact page
    window.location.href = `/contact.html?interest=sponsorship&tier=${tier}`;
  }

  showAlert(message) {
    // You can replace this with a more sophisticated alert system
    alert(message);
  }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  new DonationHandler();
});