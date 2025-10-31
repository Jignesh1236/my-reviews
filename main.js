
import './style.css'

const API_URL = '/api/reviews';

// Simple routing
const routes = {
  '/': renderHomePage,
  '/reviews': renderReviewsPage
}

// Get reviews from API
async function getReviews() {
  try {
    const response = await fetch(API_URL);
    return await response.json();
  } catch (error) {
    console.error('Error fetching reviews:', error);
    return [];
  }
}

// Save review to API
async function saveReview(review) {
  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(review)
    });
    return await response.json();
  } catch (error) {
    console.error('Error saving review:', error);
    throw error;
  }
}

// Navigate to a route
function navigate(path) {
  window.history.pushState({}, '', path)
  router()
}

// Router
function router() {
  const path = window.location.pathname
  const route = routes[path] || routes['/']
  route()
}

// Home page - Submit review
function renderHomePage() {
  document.querySelector('#app').innerHTML = `
    <div class="container">
      <div class="profile-header">
        <img src="https://avatars.githubusercontent.com/u/186457314?v=4" alt="Profile" class="profile-avatar">
        <div class="profile-info">
          <h2 class="profile-name">Jignesh D Maru</h2>
          <p class="profile-username">@jignesh1236</p>
        </div>
      </div>
      
      <nav class="nav">
        <button class="nav-btn active" onclick="window.navigateHome()">Overview</button>
        <button class="nav-btn" onclick="window.navigateReviews()">Reviews</button>
      </nav>
      
      <form id="reviewForm" class="review-form-inline">
        <div class="form-row">
          <input type="text" id="name" name="name" required placeholder="Your name" class="inline-input name-input">
          
          <div class="star-rating-inline">
            ${[1, 2, 3, 4, 5].map(num => `
              <label class="star-label-inline" data-value="${num}">
                <input type="radio" name="rating" value="${num}" required>
                <span class="star">★</span>
              </label>
            `).join('')}
          </div>
        </div>
        <div class="form-row-full">
          <textarea id="review" name="review" required placeholder="Write your review..." class="inline-textarea"></textarea>
          <button type="submit" class="submit-btn-inline">Post</button>
        </div>
      </form>
    </div>
  `
  
  // Handle form submission
  document.getElementById('reviewForm').addEventListener('submit', async (e) => {
    e.preventDefault()
    const formData = new FormData(e.target)
    const review = {
      name: formData.get('name'),
      rating: parseInt(formData.get('rating')),
      review: formData.get('review')
    }
    
    try {
      await saveReview(review)
      alert('Review submitted successfully! Thank you!')
      e.target.reset()
    } catch (error) {
      alert('Failed to submit review. Please try again.')
    }
  })
  
  // Add interactivity to star rating
  document.querySelectorAll('.star-label-inline').forEach(label => {
    label.addEventListener('click', function() {
      const value = this.getAttribute('data-value')
      document.querySelectorAll('.star-label-inline').forEach(l => l.classList.remove('selected'))
      // Highlight all stars up to the selected one
      document.querySelectorAll('.star-label-inline').forEach(l => {
        if (parseInt(l.getAttribute('data-value')) <= parseInt(value)) {
          l.classList.add('selected')
        }
      })
      // Check the radio button
      this.querySelector('input[type="radio"]').checked = true
    })
  })
}

// Reviews page - View all reviews
async function renderReviewsPage() {
  const reviews = await getReviews()
  
  document.querySelector('#app').innerHTML = `
    <div class="container">
      <div class="profile-header">
        <img src="https://avatars.githubusercontent.com/u/186457314?v=4" alt="Profile" class="profile-avatar">
        <div class="profile-info">
          <h2 class="profile-name">Jignesh D Maru</h2>
          <p class="profile-username">@jigneshdmaru</p>
        </div>
      </div>
      
      <nav class="nav">
        <button class="nav-btn" onclick="window.navigateHome()">Overview</button>
        <button class="nav-btn active" onclick="window.navigateReviews()">Reviews</button>
      </nav>
      
      <div class="reviews-list">
        ${reviews.length === 0 ? 
          '<p class="no-reviews">No reviews yet. Be the first to write one!</p>' :
          reviews.map(review => `
            <div class="review-card">
              <div class="review-header">
                <h3>${review.name}</h3>
                <div class="review-rating">
                  ${generateStars(review.rating)}
                  <span class="rating-text">(${review.rating}/5)</span>
                </div>
              </div>
              <p class="review-text">${review.review}</p>
              <p class="review-date">${review.date}</p>
            </div>
          `).reverse().join('')
        }
      </div>
    </div>
  `
}

// Generate stars for display
function generateStars(rating) {
  let stars = ''
  for (let i = 1; i <= 5; i++) {
    stars += `<span class="display-star ${i <= rating ? 'filled' : ''}"">★</span>`
  }
  return stars
}

// Global navigation functions
window.navigateHome = () => navigate('/')
window.navigateReviews = () => navigate('/reviews')

// Handle browser back/forward buttons
window.addEventListener('popstate', router)

// Initial render
router()
