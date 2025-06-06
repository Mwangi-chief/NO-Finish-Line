// DOM Elements
const elements = {
  uploadBtn: document.querySelector('.upload-btn'),
  fileInput: document.querySelector('.upload-btn input[type="file"]'),
  submitBtn: document.querySelector('button.bg-orange-500'),
  clinicBtn: document.querySelector('button.bg-\\[#E52D2F\\]'),
  blogContainer: document.querySelector('.grid.grid-cols-1.sm\\:grid-cols-2.md\\:grid-cols-3'),
  storiesContainer: document.querySelector('.grid.md\\:grid-cols-2.lg\\:grid-cols-3'),
  clinicSection: document.querySelector('.bg-\\[#E52D2F\\]')
};

// Initialize blog functionality
class BlogApp {
  constructor() {
    this.initEventListeners();
    this.loadContent();
  }

  initEventListeners() {
    // File upload interaction
    if (elements.fileInput) {
      elements.fileInput.addEventListener('change', this.handleFileUpload.bind(this));
    }

    // Challenge submission
    if (elements.submitBtn) {
      elements.submitBtn.addEventListener('click', this.submitChallenge.bind(this));
    }

    // Clinic schedule button
    if (elements.clinicBtn) {
      elements.clinicBtn.addEventListener('click', this.showClinicSchedule.bind(this));
    }
  }

  async loadContent() {
    // Load and render blog posts
    const blogResponse = await BlogAPI.getBlogPosts();
    if (blogResponse.success && elements.blogContainer) {
      this.renderBlogPosts(blogResponse.data);
    }

    // Load and render impact stories
    const storiesResponse = await BlogAPI.getImpactStories();
    if (storiesResponse.success && elements.storiesContainer) {
      this.renderImpactStories(storiesResponse.data);
    }

    // Load featured clinic
    const clinicsResponse = await BlogAPI.getClinics();
    if (clinicsResponse.success && clinicsResponse.data.length > 0 && elements.clinicSection) {
      this.renderFeaturedClinic(clinicsResponse.data[0]);
    }
  }

  handleFileUpload(e) {
    const fileName = e.target.files[0]?.name || 'No file selected';
    elements.uploadBtn.innerHTML = `<i class="fas fa-check mr-2"></i> ${fileName.substring(0, 20)}...`;
  }

  async submitChallenge(e) {
    e.preventDefault();

    if (!elements.fileInput.files[0]) {
      this.showAlert('Please select a video file');
      return;
    }

    const socialUrl = prompt('Please enter the URL to your social media post:');
    if (!socialUrl) {
      this.showAlert('Please provide your social media URL');
      return;
    }

    const formData = new FormData();
    formData.append('video', elements.fileInput.files[0]);
    formData.append('socialMediaUrl', socialUrl);

    // Show loading state
    const originalText = elements.submitBtn.innerHTML;
    elements.submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Submitting...';
    elements.submitBtn.disabled = true;

    const response = await BlogAPI.submitChallenge(formData);

    if (response.success) {
      this.showAlert('Challenge submitted successfully! Good luck!');
      // Reset form
      elements.uploadBtn.innerHTML = '<i class="fas fa-plus mr-2"></i> Select File';
      elements.fileInput.value = '';
    } else {
      this.showAlert(response.error || 'Submission failed');
    }

    // Reset button
    elements.submitBtn.innerHTML = originalText;
    elements.submitBtn.disabled = false;
  }

  async showClinicSchedule() {
    const response = await BlogAPI.getClinics();

    if (response.success) {
      // In a real app, you'd show a modal with the schedule
      console.log('Clinic schedule:', response.data);
      this.showAlert('Clinic schedule loaded. Check console for details.');
    } else {
      this.showAlert(response.error || 'Failed to load clinic schedule');
    }
  }

  renderBlogPosts(posts) {
    elements.blogContainer.innerHTML = posts.slice(0, 3).map(post => `
      <div class="bg-white shadow-md rounded-lg overflow-hidden">
        <img src="${post.featuredImage}" alt="${post.title}" class="w-full h-48 object-cover">
        <div class="p-4">
          <h3 class="text-xl font-bold">${post.title}</h3>
          <p class="text-gray-600 mt-2">${post.excerpt}</p>
          <a href="/blog/${post.slug}" class="text-[#E52D2F] mt-4 block">Read More</a>
        </div>
      </div>
    `).join('');
  }

  renderImpactStories(stories) {
    elements.storiesContainer.innerHTML = stories.slice(0, 3).map(story => `
      <div class="bg-white shadow-md rounded-lg overflow-hidden impact-story">
        <img src="${story.image}" alt="${story.title}" class="w-full h-48 object-cover">
        <div class="p-6">
          <h3 class="text-xl font-bold mb-2">${story.title}</h3>
          <p class="text-gray-600 mb-4">${story.excerpt}</p>
          <a href="/stories/${story._id}" class="text-[#E52D2F] font-medium">Read Full Story →</a>
        </div>
      </div>
    `).join('');
  }

  renderFeaturedClinic(clinic) {
    elements.clinicSection.querySelector('h3').textContent = clinic.title;
    elements.clinicSection.querySelector('p').textContent = clinic.description;
    elements.clinicSection.querySelector('img').src = clinic.image;
  }

  showAlert(message) {
    // In a real app, you'd use a proper notification system
    alert(message);
  }
}

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  new BlogApp();
});