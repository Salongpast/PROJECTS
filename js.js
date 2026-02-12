// ==============================
// Global settings
// ==============================
let starsActive = true;

// ==============================
// Helper functions
// ==============================
function getRandom(min, max) {
     return Math.random() * (max - min) + min;
}

// Toggle classes safely
function toggleClasses(element, removeClass, addClass) {
     if (!element) return;
     element.classList.remove(removeClass);
     element.classList.add(addClass);
}

// ==============================
// Stars
// ==============================
function enableStars(active, symbol = "♥") {
     document.querySelectorAll(".star").forEach(star => star.remove());
     if (!active) return;

     const starCount = 200;
     const minSize = 15, maxSize = 20;
     const minDuration = 2, maxDuration = 5;

     for (let i = 0; i < starCount; i++) {
          const star = document.createElement("div");
          star.className = "star";
          star.textContent = symbol;

          const size = getRandom(minSize, maxSize);
          star.style.fontSize = size + "px";
          star.style.left = getRandom(0, 100) + "vw";
          star.style.top = getRandom(0, 100) + "vh";
          star.style.animationDuration = getRandom(minDuration, maxDuration) + "s";
          star.style.animationDelay = getRandom(0, maxDuration) + "s";

          const hue = getRandom(320, 340);
          const sat = getRandom(60, 100);
          const light = getRandom(30, 40);
          star.style.color = `hsl(${hue}, ${sat}%, ${light}%)`;

          document.body.appendChild(star);
     }
}

// ==============================
// Envelope
// ==============================
function addEnvelope(containerId) {
     const container = document.getElementById(containerId);
     if (!container) return;

     container.innerHTML = `
        <div id="envelope" class="close">
            <div class="letter"></div>
            <div class="front top"></div>
            <div class="front right"></div>
            <div class="front left"></div>
            <button id="btn-open" onclick="openEnvelope();"></button>
        </div>
    `;
}
function addGame(containerId) {
     const container = document.getElementById(containerId);
     if (!container) return;

     container.innerHTML = `<div id="game" class="game-activated" style="position: absolute; width: 100vw; height: 100vh;"></div>`;
     gameactivated();
}

function clear(containerId) {
     const container = document.getElementById(containerId);
     if (!container) return;

     container.innerHTML = "";
}

function openEnvelope() {
     const envelope = document.getElementById("envelope");
     const button = document.getElementById("btn-click");
     if (!envelope) {
          return;
     }
     toggleClasses(envelope, "close", "open")
     for (let i = 0; i < 3; i++) {
          setTimeout(() => {
               const heart = document.createElement("div");
               heart.classList.add("heart");

               // Random horizontal offset
               const offsetX = getRandom(-40, 40);
               heart.style.left = `calc(50% + ${offsetX}px)`;

               // Force animation
               heart.style.animation = "floatHeart 2s ease-in-out forwards";
               heart.style.opacity = "1";

               envelope.appendChild(heart);

               // Remove after animation
               setTimeout(() => heart.remove(), 2000);
          }, i * 350);
     }


}

addEnvelope("content");
enableStars(starsActive);
