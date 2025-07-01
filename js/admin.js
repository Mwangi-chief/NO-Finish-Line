// Admin Dashboard Script
document.addEventListener('DOMContentLoaded', function() {
    // Initialize the dashboard
    loadDashboard();
    showSection('dashboard');

    // Event listeners for file inputs
    document.getElementById('blogPostImage').addEventListener('change', function(e) {
        previewImage(e, 'blogPostImagePreview', 'blogPostImagePreviewImg');
    });

    document.getElementById('impactStoryImage').addEventListener('change', function(e) {
        previewImage(e, 'impactStoryImagePreview', 'impactStoryImagePreviewImg');
    });

    document.getElementById('clinicImage').addEventListener('change', function(e) {
        previewImage(e, 'clinicImagePreview', 'clinicImagePreviewImg');
    });

    // Form submissions
    document.getElementById('blogPostForm').addEventListener('submit', handleBlogPostSubmit);
    document.getElementById('impactStoryForm').addEventListener('submit', handleImpactStorySubmit);
    document.getElementById('clinicForm').addEventListener('submit', handleClinicSubmit);
});

// Image preview function
function previewImage(event, previewContainerId, previewImageId) {
    const input = event.target;
    const previewContainer = document.getElementById(previewContainerId);
    const previewImage = document.getElementById(previewImageId);

    if (input.files && input.files[0]) {
        const reader = new FileReader();

        reader.onload = function(e) {
            previewImage.src = e.target.result;
            previewContainer.classList.remove('hidden');
        };

        reader.readAsDataURL(input.files[0]);
    } else {
        previewContainer.classList.add('hidden');
    }
}

// Sidebar toggle
function toggleSidebar() {
    const sidebar = document.getElementById('sidebar');
    const content = document.getElementById('content');

    sidebar.classList.toggle('collapsed');
    content.classList.toggle('expanded');
}

// Section navigation
function showSection(sectionId) {
    // Hide all sections
    document.getElementById('dashboardSection').classList.add('hidden');
    document.getElementById('blogPostsSection').classList.add('hidden');
    document.getElementById('impactStoriesSection').classList.add('hidden');
    document.getElementById('clinicsSection').classList.add('hidden');
    document.getElementById('challengesSection').classList.add('hidden');

    // Show selected section
    document.getElementById(`${sectionId}Section`).classList.remove('hidden');

    // Update title
    const titles = {
        'dashboard': 'Dashboard',
        'blogPosts': 'Blog Posts',
        'impactStories': 'Impact Stories',
        'clinics': 'Mental Health Clinics',
        'challenges': 'Challenge Entries'
    };
    document.getElementById('sectionTitle').textContent = titles[sectionId];

    // Load data if needed
    if (sectionId === 'blogPosts') {
        loadBlogPosts();
    } else if (sectionId === 'impactStories') {
        loadImpactStories();
    } else if (sectionId === 'clinics') {
        loadClinics();
    } else if (sectionId === 'challenges') {
        loadChallengeEntries();
    }
}

// Dashboard functions
async function loadDashboard() {
    try {
        // Load counts
        const [blogRes, storiesRes, clinicsRes, challengesRes] = await Promise.all([
            fetch('http://localhost:5000/api/blog').then(res => res.json()),
            fetch('http://localhost:5000/api/stories').then(res => res.json()),
            fetch('http://localhost:5000/api/clinics').then(res => res.json()),
            fetch('http://localhost:5000/api/challenge').then(res => res.json())
        ]);

        if (blogRes.success) {
            document.getElementById('blogPostCount').textContent = blogRes.data.length;
        }
        if (storiesRes.success) {
            document.getElementById('impactStoryCount').textContent = storiesRes.data.length;
        }
        if (clinicsRes.success) {
            document.getElementById('clinicCount').textContent = clinicsRes.data.length;
        }
        if (challengesRes.success) {
            document.getElementById('challengeCount').textContent = challengesRes.data.length;
        }

        // Load recent activity
        const recentActivity = [];
        if (blogRes.success && blogRes.data.length > 0) {
            recentActivity.push({
                type: 'blog',
                title: blogRes.data[0].title,
                date: new Date(blogRes.data[0].createdAt).toLocaleDateString()
            });
        }
        if (storiesRes.success && storiesRes.data.length > 0) {
            recentActivity.push({
                type: 'story',
                title: storiesRes.data[0].title,
                date: new Date(storiesRes.data[0].createdAt).toLocaleDateString()
            });
        }
        if (clinicsRes.success && clinicsRes.data.length > 0) {
            recentActivity.push({
                type: 'clinic',
                title: clinicsRes.data[0].title,
                date: new Date(clinicsRes.data[0].date).toLocaleDateString()
            });
        }

        const activityContainer = document.getElementById('recentActivity');
        activityContainer.innerHTML = recentActivity.map(item => `
            <div class="flex items-start">
                <div class="flex-shrink-0 h-10 w-10 rounded-full bg-${item.type === 'blog' ? 'blue' : item.type === 'story' ? 'pink' : 'orange'}-100 flex items-center justify-center">
                    <i class="fas fa-${item.type === 'blog' ? 'newspaper' : item.type === 'story' ? 'heart' : 'clinic-medical'} text-${item.type === 'blog' ? 'blue' : item.type === 'story' ? 'pink' : 'orange'}-600"></i>
                </div>
                <div class="ml-4">
                    <p class="text-sm font-medium text-gray-900">${item.title}</p>
                    <p class="text-sm text-gray-500">${item.type === 'blog' ? 'Blog post' : item.type === 'story' ? 'Impact story' : 'Clinic'} added on ${item.date}</p>
                </div>
            </div>
        `).join('');
    } catch (error) {
        console.error('Error loading dashboard:', error);
        alert('Failed to load dashboard data');
    }
}

// Blog Post functions
async function loadBlogPosts() {
    try {
        const response = await fetch('http://localhost:5000/api/blog');
        const data = await response.json();

        if (data.success) {
            const tableBody = document.getElementById('blogPostsTable');
            tableBody.innerHTML = data.data.map(post => `
                <tr>
                    <td class="px-6 py-4 whitespace-nowrap">
                        <div class="flex items-center">
                            ${post.featuredImage ? `
                                <div class="flex-shrink-0 h-10 w-10">
                                    <img class="h-10 w-10 rounded-full object-cover" src="${post.featuredImage}" alt="">
                                </div>
                            ` : ''}
                            <div class="ml-4">
                                <div class="text-sm font-medium text-gray-900">${post.title}</div>
                            </div>
                        </div>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap">
                        <div class="text-sm text-gray-500">${new Date(post.createdAt).toLocaleDateString()}</div>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <button onclick="editBlogPost('${post._id}')" class="text-blue-600 hover:text-blue-900 mr-3">Edit</button>
                        <button onclick="deleteBlogPost('${post._id}')" class="text-red-600 hover:text-red-900">Delete</button>
                    </td>
                </tr>
            `).join('');
        }
    } catch (error) {
        console.error('Error loading blog posts:', error);
        alert('Failed to load blog posts');
    }
}

function showBlogPostForm(postId = null) {
    const modal = document.getElementById('blogPostModal');
    const form = document.getElementById('blogPostForm');

    if (postId) {
        // Edit mode
        document.getElementById('blogPostModalTitle').textContent = 'Edit Blog Post';
        document.getElementById('blogPostId').value = postId;

        // Load post data
        fetch(`http://localhost:5000/api/blog/${postId}`)
            .then(res => res.json())
            .then(data => {
                if (data.success) {
                    const post = data.data;
                    document.getElementById('blogPostTitle').value = post.title;
                    document.getElementById('blogPostExcerpt').value = post.excerpt;
                    document.getElementById('blogPostContent').value = post.content;

                    if (post.featuredImage) {
                        document.getElementById('blogPostImagePreviewImg').src = post.featuredImage;
                        document.getElementById('blogPostImagePreview').classList.remove('hidden');
                    }
                }
            });
    } else {
        // New post mode
        document.getElementById('blogPostModalTitle').textContent = 'New Blog Post';
        form.reset();
        document.getElementById('blogPostImagePreview').classList.add('hidden');
    }

    modal.classList.remove('hidden');
}

function hideBlogPostForm() {
    document.getElementById('blogPostModal').classList.add('hidden');
}

async function handleBlogPostSubmit(e) {
    e.preventDefault();

    try {
        // Get form values
        const title = document.getElementById('blogPostTitle').value;
        const content = document.getElementById('blogPostContent').value;
        const excerpt = document.getElementById('blogPostExcerpt').value;
        const postId = document.getElementById('blogPostId').value;
        const imageInput = document.getElementById('blogPostImage');

        // Upload image to Cloudinary if present
        let imageUrl = null;
        if (imageInput.files[0]) {
            imageUrl = await uploadImageToCloudinary(imageInput.files[0]);
        }

        // Prepare the blog post data
        const blogData = {
            title,
            content,
            excerpt: excerpt || content.substring(0, 150) + '...',
            featuredImage: imageUrl
        };

        // Determine the request method and URL
        const method = postId ? 'PUT' : 'POST';
        const url = postId ? `http://localhost:5000/api/blog/${postId}` : 'http://localhost:5000/api/blog';

        // Send the request with JSON data
        const response = await fetch(url, {
            method,
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(blogData)
        });

        const data = await response.json();

        if (data.success) {
            alert('Blog post saved successfully!');
            hideBlogPostForm();
            loadBlogPosts();
        } else {
            alert('Error saving blog post: ' + (data.error || 'Unknown error'));
        }
    } catch (error) {
        console.error('Error submitting blog post:', error);
        alert('Failed to save blog post: ' + error.message);
    }
}

// ======= CLOUDINARY CONFIGURATION =======
// Replace these with your actual Cloudinary credentials
const CLOUDINARY_CLOUD_NAME = "dce7m1f01"; // From Cloudinary dashboard
const CLOUDINARY_UPLOAD_PRESET = "blog_uploads"; // From Cloudinary upload presets

async function uploadImageToCloudinary(file) {
    const cloudinaryUrl = `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/upload`;
    const formData = new FormData();

    formData.append('file', file);
    formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);

    try {
        const response = await fetch(cloudinaryUrl, {
            method: 'POST',
            body: formData
        });

        const data = await response.json();

        if (data.secure_url) {
            return data.secure_url; // Return the Cloudinary URL
        } else {
            throw new Error(data.error?.message || 'Failed to upload image to Cloudinary');
        }
    } catch (error) {
        console.error('Error uploading image:', error);
        throw new Error('Image upload failed: ' + error.message);
    }
}

async function editBlogPost(postId) {
    showBlogPostForm(postId);
}

async function deleteBlogPost(postId) {
    if (confirm('Are you sure you want to delete this blog post?')) {
        try {
            const response = await fetch(`http://localhost:5000/api/blog/${postId}`, {
                method: 'DELETE'
            });

            const data = await response.json();

            if (data.success) {
                alert('Blog post deleted successfully!');
                loadBlogPosts();
            } else {
                alert('Error deleting blog post: ' + (data.error || 'Unknown error'));
            }
        } catch (error) {
            console.error('Error deleting blog post:', error);
            alert('Failed to delete blog post');
        }
    }
}

// Impact Story functions (similar to blog posts)
async function loadImpactStories() {
    try {
        const response = await fetch('http://localhost:5000/api/stories');
        const data = await response.json();

        if (data.success) {
            const tableBody = document.getElementById('impactStoriesTable');
            tableBody.innerHTML = data.data.map(story => `
                <tr>
                    <td class="px-6 py-4 whitespace-nowrap">
                        <div class="flex items-center">
                            ${story.image ? `
                                <div class="flex-shrink-0 h-10 w-10">
                                    <img class="h-10 w-10 rounded-full object-cover" src="${story.image}" alt="">
                                </div>
                            ` : ''}
                            <div class="ml-4">
                                <div class="text-sm font-medium text-gray-900">${story.title}</div>
                            </div>
                        </div>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap">
                        <div class="text-sm text-gray-500">${new Date(story.createdAt).toLocaleDateString()}</div>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <button onclick="editImpactStory('${story._id}')" class="text-blue-600 hover:text-blue-900 mr-3">Edit</button>
                        <button onclick="deleteImpactStory('${story._id}')" class="text-red-600 hover:text-red-900">Delete</button>
                    </td>
                </tr>
            `).join('');
        }
    } catch (error) {
        console.error('Error loading impact stories:', error);
        alert('Failed to load impact stories');
    }
}

function showImpactStoryForm(storyId = null) {
    const modal = document.getElementById('impactStoryModal');
    const form = document.getElementById('impactStoryForm');

    if (storyId) {
        // Edit mode
        document.getElementById('impactStoryModalTitle').textContent = 'Edit Impact Story';
        document.getElementById('impactStoryId').value = storyId;

        // Load story data
        fetch(`http://localhost:5000/api/stories/${storyId}`)
            .then(res => res.json())
            .then(data => {
                if (data.success) {
                    const story = data.data;
                    document.getElementById('impactStoryTitle').value = story.title;
                    document.getElementById('impactStoryExcerpt').value = story.excerpt;
                    document.getElementById('impactStoryContent').value = story.content;

                    if (story.image) {
                        document.getElementById('impactStoryImagePreviewImg').src = story.image;
                        document.getElementById('impactStoryImagePreview').classList.remove('hidden');
                    }
                }
            });
    } else {
        // New story mode
        document.getElementById('impactStoryModalTitle').textContent = 'New Impact Story';
        form.reset();
        document.getElementById('impactStoryImagePreview').classList.add('hidden');
    }

    modal.classList.remove('hidden');
}

async function handleImpactStorySubmit(e) {
    e.preventDefault();

    try {
        // Get form values
        const title = document.getElementById('impactStoryTitle').value;
        const content = document.getElementById('impactStoryContent').value;
        const excerpt = document.getElementById('impactStoryExcerpt').value;
        const storyId = document.getElementById('impactStoryId').value;
        const imageInput = document.getElementById('impactStoryImage');

        // Upload image to Cloudinary if present
        let imageUrl = null;
        if (imageInput.files[0]) {
            imageUrl = await uploadImageToCloudinary(imageInput.files[0]);
        }

        // Prepare the impact story data
        const storyData = {
            title,
            content,
            excerpt: excerpt || content.substring(0, 150) + '...',
            image: imageUrl  // This will be the Cloudinary URL
        };

        // Determine the request method and URL
        const method = storyId ? 'PUT' : 'POST';
        const url = storyId ? `http://localhost:5000/api/stories/${storyId}` : 'http://localhost:5000/api/stories';

        // Send the request with JSON data
        const response = await fetch(url, {
            method,
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(storyData)
        });

        const data = await response.json();

        if (data.success) {
            alert('Impact story saved successfully!');
            hideImpactStoryForm();
            loadImpactStories();
        } else {
            alert('Error saving impact story: ' + (data.error || 'Unknown error'));
        }
    } catch (error) {
        console.error('Error submitting impact story:', error);
        alert('Failed to save impact story: ' + error.message);
    }
}

function hideImpactStoryForm() {
    document.getElementById('impactStoryModal').classList.add('hidden');
}

async function editImpactStory(storyId) {
    showImpactStoryForm(storyId);
}

async function deleteImpactStory(storyId) {
    if (confirm('Are you sure you want to delete this impact story?')) {
        try {
            const response = await fetch(`http://localhost:5000/api/stories/${storyId}`, {
                method: 'DELETE'
            });

            const data = await response.json();

            if (data.success) {
                alert('Impact story deleted successfully!');
                loadImpactStories();
            } else {
                alert('Error deleting impact story: ' + (data.error || 'Unknown error'));
            }
        } catch (error) {
            console.error('Error deleting impact story:', error);
            alert('Failed to delete impact story');
        }
    }
}

// Clinic functions
async function loadClinics() {
    try {
        const response = await fetch('http://localhost:5000/api/clinics');
        const data = await response.json();

        if (data.success) {
            const tableBody = document.getElementById('clinicsTable');
            tableBody.innerHTML = data.data.map(clinic => `
                <tr>
                    <td class="px-6 py-4 whitespace-nowrap">
                        <div class="flex items-center">
                            ${clinic.image ? `
                                <div class="flex-shrink-0 h-10 w-10">
                                    <img class="h-10 w-10 rounded-full object-cover" src="${clinic.image}" alt="">
                                </div>
                            ` : ''}
                            <div class="ml-4">
                                <div class="text-sm font-medium text-gray-900">${clinic.title}</div>
                            </div>
                        </div>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap">
                        <div class="text-sm text-gray-500">${new Date(clinic.date).toLocaleDateString()}</div>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap">
                        <div class="text-sm text-gray-500">${clinic.location}</div>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <button onclick="editClinic('${clinic._id}')" class="text-blue-600 hover:text-blue-900 mr-3">Edit</button>
                        <button onclick="deleteClinic('${clinic._id}')" class="text-red-600 hover:text-red-900">Delete</button>
                    </td>
                </tr>
            `).join('');
        }
    } catch (error) {
        console.error('Error loading clinics:', error);
        alert('Failed to load clinics');
    }
}

function showClinicForm(clinicId = null) {
    const modal = document.getElementById('clinicModal');
    const form = document.getElementById('clinicForm');

    if (clinicId) {
        // Edit mode
        document.getElementById('clinicModalTitle').textContent = 'Edit Clinic';
        document.getElementById('clinicId').value = clinicId;

        // Load clinic data
        fetch(`http://localhost:5000/api/clinics/${clinicId}`)
            .then(res => res.json())
            .then(data => {
                if (data.success) {
                    const clinic = data.data;
                    document.getElementById('clinicTitle').value = clinic.title;
                    document.getElementById('clinicDescription').value = clinic.description;
                    document.getElementById('clinicDate').value = new Date(clinic.date).toISOString().slice(0, 16);
                    document.getElementById('clinicLocation').value = clinic.location;

                    if (clinic.image) {
                        document.getElementById('clinicImagePreviewImg').src = clinic.image;
                        document.getElementById('clinicImagePreview').classList.remove('hidden');
                    }
                }
            });
    } else {
        // New clinic mode
        document.getElementById('clinicModalTitle').textContent = 'New Clinic';
        form.reset();
        document.getElementById('clinicImagePreview').classList.add('hidden');
    }

    modal.classList.remove('hidden');
}

function hideClinicForm() {
    document.getElementById('clinicModal').classList.add('hidden');
}

async function handleClinicSubmit(e) {
    e.preventDefault();

    const formData = new FormData();
    formData.append('title', document.getElementById('clinicTitle').value);
    formData.append('description', document.getElementById('clinicDescription').value);
    formData.append('date', document.getElementById('clinicDate').value);
    formData.append('location', document.getElementById('clinicLocation').value);

    const imageInput = document.getElementById('clinicImage');
    if (imageInput.files[0]) {
        formData.append('image', imageInput.files[0]);
    }

    const clinicId = document.getElementById('clinicId').value;
    const method = clinicId ? 'PUT' : 'POST';
    const url = clinicId ? `http://localhost:5000/api/clinics/${clinicId}` : 'http://localhost:5000/api/clinics';

    try {
        const response = await fetch(url, {
            method,
            body: formData
        });

        const data = await response.json();

        if (data.success) {
            alert('Clinic saved successfully!');
            hideClinicForm();
            loadClinics();
        } else {
            alert('Error saving clinic: ' + (data.error || 'Unknown error'));
        }
    } catch (error) {
        console.error('Error submitting clinic:', error);
        alert('Failed to save clinic');
    }
}

async function editClinic(clinicId) {
    showClinicForm(clinicId);
}

async function deleteClinic(clinicId) {
    if (confirm('Are you sure you want to delete this clinic?')) {
        try {
            const response = await fetch(`http://localhost:5000/api/clinics/${clinicId}`, {
                method: 'DELETE'
            });

            const data = await response.json();

            if (data.success) {
                alert('Clinic deleted successfully!');
                loadClinics();
            } else {
                alert('Error deleting clinic: ' + (data.error || 'Unknown error'));
            }
        } catch (error) {
            console.error('Error deleting clinic:', error);
            alert('Failed to delete clinic');
        }
    }
}

// Challenge functions
async function loadChallengeEntries() {
    try {
        const response = await fetch('http://localhost:5000/api/challenge');
        const data = await response.json();

        if (data.success) {
            const tableBody = document.getElementById('challengesTable');
            tableBody.innerHTML = data.data.map(entry => `
                <tr>
                    <td class="px-6 py-4 whitespace-nowrap">
                        <a href="${entry.socialMediaUrl}" target="_blank" class="text-blue-600 hover:text-blue-900">${entry.socialMediaUrl.substring(0, 50)}...</a>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap">
                        <div class="text-sm text-gray-500">${new Date(entry.createdAt).toLocaleDateString()}</div>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <button onclick="viewChallengeEntry('${entry._id}')" class="text-blue-600 hover:text-blue-900 mr-3">View</button>
                        <button onclick="deleteChallengeEntry('${entry._id}')" class="text-red-600 hover:text-red-900">Delete</button>
                    </td>
                </tr>
            `).join('');
        }
    } catch (error) {
        console.error('Error loading challenge entries:', error);
        alert('Failed to load challenge entries');
    }
}

function viewChallengeEntry(entryId) {
    // In a real app, you'd show a modal with the video
    fetch(`http://localhost:5000/api/challenge/${entryId}`)
        .then(res => res.json())
        .then(data => {
            if (data.success) {
                window.open(data.data.socialMediaUrl, '_blank');
            }
        });
}

async function deleteChallengeEntry(entryId) {
    if (confirm('Are you sure you want to delete this challenge entry?')) {
        try {
            const response = await fetch(`http://localhost:5000/api/challenge/${entryId}`, {
                method: 'DELETE'
            });

            const data = await response.json();

            if (data.success) {
                alert('Challenge entry deleted successfully!');
                loadChallengeEntries();
            } else {
                alert('Error deleting challenge entry: ' + (data.error || 'Unknown error'));
            }
        } catch (error) {
            console.error('Error deleting challenge entry:', error);
            alert('Failed to delete challenge entry');
        }
    }
}