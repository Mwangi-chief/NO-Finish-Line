// Base API configuration
const BlogAPI = {
  baseUrl: 'https://your-api-endpoint.com/api',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': localStorage.getItem('token') ? `Bearer ${localStorage.getItem('token')}` : ''
  },

  // Fetch all blog posts
  async getBlogPosts() {
    try {
      const response = await fetch(`${this.baseUrl}/blog`);
      return await response.json();
    } catch (error) {
      console.error('Error fetching blog posts:', error);
      return { success: false, error: 'Failed to load blog posts' };
    }
  },

  // Fetch impact stories
  async getImpactStories() {
    try {
      const response = await fetch(`${this.baseUrl}/stories`);
      return await response.json();
    } catch (error) {
      console.error('Error fetching impact stories:', error);
      return { success: false, error: 'Failed to load impact stories' };
    }
  },

  // Fetch clinic schedule
  async getClinics() {
    try {
      const response = await fetch(`${this.baseUrl}/clinics`);
      return await response.json();
    } catch (error) {
      console.error('Error fetching clinics:', error);
      return { success: false, error: 'Failed to load clinic schedule' };
    }
  },

  // Submit challenge entry
  async submitChallenge(formData) {
    try {
      // Remove the default headers for file upload
      const headers = {};
      if (localStorage.getItem('token')) {
        headers['Authorization'] = `Bearer ${localStorage.getItem('token')}`;
      }

      const response = await fetch(`${this.baseUrl}/challenge`, {
        method: 'POST',
        body: formData,
        headers: headers
      });
      return await response.json();
    } catch (error) {
      console.error('Error submitting challenge:', error);
      return { success: false, error: 'Submission failed' };
    }
  },

  // Register for clinic
  async registerForClinic(clinicId) {
    try {
      const response = await fetch(`${this.baseUrl}/clinics/${clinicId}/register`, {
        method: 'PUT',
        headers: this.headers
      });
      return await response.json();
    } catch (error) {
      console.error('Error registering for clinic:', error);
      return { success: false, error: 'Registration failed' };
    }
  }
};