// Function to toggle the comment dock visibility
function toggleCommentsDock() {
  const dock = document.getElementById('comments-dock');
  dock.style.display = (dock.style.display === 'block' ? 'none' : 'block');
}

// Function to close the comment dock when clicking outside
document.addEventListener('click', function(event) {
  const dock = document.getElementById('comments-dock');
  const commentIcon = document.querySelector('.comments-icon');
  if (!commentIcon.contains(event.target) && !dock.contains(event.target)) {
      dock.style.display = 'none';
  }
});

// Function to toggle user profile dropdown visibility
function toggleUserProfile(event) {
  const dropdown = document.getElementById('user-profile-dropdown');
  const isDropdownVisible = dropdown.style.display === 'block';

  // Close any open dropdowns first
  const allDropdowns = document.querySelectorAll('.user-profile-dropdown');
  allDropdowns.forEach((dropdown) => dropdown.style.display = 'none');

  // Toggle the visibility of the clicked profile dropdown
  if (!isDropdownVisible) {
      dropdown.style.display = 'block';
  } else {
      dropdown.style.display = 'none';
  }
}

// Close the user profile dropdown if clicking outside
document.addEventListener('click', function(event) {
  const dropdown = document.getElementById('user-profile-dropdown');
  const profileImg = document.querySelector('.profile-nav');

  // Close dropdown if click is outside of the profile image and dropdown
  if (!profileImg.contains(event.target) && !dropdown.contains(event.target)) {
      dropdown.style.display = 'none';
  }
});