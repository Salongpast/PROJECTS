// ===================== CAROUSEL SYSTEM =====================
// Each carousel has its own state tracked by ID
const carousels = {
     trending: { index: 0, isScrolling: false },
     releases: { index: 0, isScrolling: false },
     toprated: { index: 0, isScrolling: false },
     continue: { index: 0, isScrolling: false },
     because: { index: 0, isScrolling: false },
};

function getVisibleCount() {
     const width = window.innerWidth;
     if (width <= 390) return 1;
     if (width <= 640) return 2;
     if (width <= 960) return 3;
     if (width <= 1024) return 4;
     return 5;
}

function moveCarousel(id, direction) {
     const state = carousels[id];
     if (state.isScrolling) return;
     state.isScrolling = true;

     const wrapper = document.getElementById(id + 'Wrapper');
     const cards = wrapper.querySelectorAll('.carousel-card');
     const visibleCount = getVisibleCount();

     state.index += direction;

     // wrap around
     if (state.index < 0) state.index = cards.length - visibleCount;
     if (state.index > cards.length - visibleCount) state.index = 0;

     const cardWidth = cards[0].offsetWidth + 10;
     wrapper.scrollTo({
          left: state.index * cardWidth,
          behavior: 'smooth'
     });

     setTimeout(() => {
          state.isScrolling = false;
     }, 400);
}

// Re-snap all carousels on window resize
window.addEventListener('resize', () => {
     const visibleCount = getVisibleCount();

     Object.keys(carousels).forEach(id => {
          const wrapper = document.getElementById(id + 'Wrapper');
          const cards = wrapper.querySelectorAll('.carousel-card');
          const state = carousels[id];

          const maxIndex = cards.length - visibleCount;
          if (state.index > maxIndex) state.index = maxIndex;
          if (state.index < 0) state.index = 0;

          const cardWidth = cards[0].offsetWidth + 10;
          wrapper.scrollTo({
               left: state.index * cardWidth,
               behavior: 'auto'
          });
     });
});

// ===================== GENERATE CARDS =====================
function generateCards(trackId, amount, showProgress = false) {
     const track = document.getElementById(trackId);

     for (let i = 0; i < amount; i++) {
          const card = document.createElement('div');
          card.classList.add('carousel-card');

          const img = document.createElement('img');
          // use different seed offsets per carousel so images don't repeat
          const seed = trackId + i;
          img.src = `https://picsum.photos/seed/${seed}/600/400`;
          img.alt = `Image ${i + 1}`;

          card.appendChild(img);

          // add progress bar for "continue watching"
          if (showProgress) {
               const progressBar = document.createElement('div');
               progressBar.classList.add('progress-bar');
               const progressFill = document.createElement('span');
               // random progress between 10% and 90%
               const progress = 10 + Math.floor(Math.random() * 80);
               progressFill.style.width = progress + '%';
               progressBar.appendChild(progressFill);
               card.appendChild(progressBar);
          }

          track.appendChild(card);
     }
}

// Generate all carousels
generateCards('trendingTrack', 20);
generateCards('releasesTrack', 20);
generateCards('topratedTrack', 20);
generateCards('continueTrack', 10, true); // with progress bars
generateCards('becauseTrack', 20);

// ===================== HEADER SCROLL EFFECT =====================
window.addEventListener('scroll', () => {
     const header = document.querySelector('.site-header');
     if (window.scrollY > 50) {
          header.classList.add('scrolled');
     } else {
          header.classList.remove('scrolled');
     }
});

// ===================== MENU DRAWER =====================
function toggleMenu() {
     const drawer = document.getElementById('menuDrawer');
     const overlay = document.getElementById('menuOverlay');
     const icon = document.getElementById('menuIcon');

     drawer.classList.toggle('active');
     overlay.classList.toggle('active');

     if (drawer.classList.contains('active')) {
          icon.classList.remove('ri-menu-line');
          icon.classList.add('ri-close-line');
     } else {
          icon.classList.remove('ri-close-line');
          icon.classList.add('ri-menu-line');
     }
}