// Select elements
const wrapper = document.querySelector('.wrapper');
const backButton = document.querySelector('.sidebar button');
const backIcon = backButton.querySelector('img');
const sidebarLinks = document.querySelectorAll('.sidebar a');

// Toggle active link
sidebarLinks.forEach(link => {
  link.addEventListener('click', () => {
    sidebarLinks.forEach(l => l.classList.remove('active'));
    link.classList.add('active');
  });
});

// Back button toggle
backButton.addEventListener('click', () => {
  wrapper.classList.toggle('sidebar-hidden');

  // Swap back icon depending on sidebar state
  backIcon.src = wrapper.classList.contains('sidebar-hidden') 
    ? 'svgs/arrow-right-icon.svg'
    : 'svgs/arrow-left-icon.svg';
});
