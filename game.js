// ------------------- Global Variables -------------------
let currentImageSet = 1; // Track which set is active
const gamematch = document.getElementById('game');

const imageSets = {
     1: [
          "img/dog/image1.png",
          "img/dog/image2.png",
          "img/dog/image3.png",
          "img/dog/image4.png",
          "img/dog/image5.png",
          "img/dog/image6.png",
          "img/dog/image7.png",
          "img/dog/image8.png",
          "img/dog/image9.png",
          "img/dog/image10.png",
          "img/dog/image11.png",
          "img/dog/image12.png"
     ],
     2: [
          "img/us/image1.png",
          "img/us/image2.png",
          "img/us/image3.png",
          "img/us/image4.png",
          "img/us/image5.png",
          "img/us/image6.png",
          "img/us/image7.png",
          "img/us/image8.png",
          "img/us/image9.png",
          "img/us/image10.png",
          "img/us/image11.png",
          "img/us/image12.png"
     ]
};

// ------------------- Game Activation -------------------
function gameactivated() {
     gamematch.classList.add('game-activated');
     if (!(gamematch && gamematch.classList.contains('game-activated'))) return;

     gamematch.innerHTML = ""; // Clear previous cards
     let matchedCount = 0;

     const heartPattern = [
          [0, 0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 1, 0, 0, 0, 1, 0, 0],
          [0, 1, 1, 1, 0, 1, 1, 1, 0],
          [0, 1, 1, 1, 1, 1, 1, 1, 0],
          [0, 0, 1, 1, 1, 1, 1, 0, 0],
          [0, 0, 0, 1, 1, 1, 0, 0, 0],
          [0, 0, 0, 0, 1, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0, 0]
     ];

     let cards = [];

     for (let r = 0; r < heartPattern.length; r++) {
          for (let c = 0; c < heartPattern[r].length; c++) {
               if (heartPattern[r][c] === 1) {
                    const card = document.createElement("div");
                    card.classList.add("card");

                    const front = document.createElement("div");
                    front.classList.add("front");

                    const back = document.createElement("div");
                    back.classList.add("back");

                    card.appendChild(front);
                    card.appendChild(back);

                    gamematch.appendChild(card);
                    cards.push(card);
               } else {
                    const empty = document.createElement("div");
                    gamematch.appendChild(empty);
               }
          }
     }

     // ------------------- Assign Images -------------------
     const activeImages = imageSets[currentImageSet];
     const pairCount = Math.floor(cards.length / 2);
     let selectedImages = activeImages.slice(0, pairCount);
     let cardImages = [...selectedImages, ...selectedImages];

     // Shuffle
     cardImages.sort(() => Math.random() - 0.5);

     // Assign to cards
     cards.forEach((card, index) => {
          const back = card.querySelector(".back");
          back.style.backgroundImage = `url(${cardImages[index]})`;
          back.style.backgroundSize = "cover";
          back.style.backgroundPosition = "center";
          card.dataset.value = cardImages[index];
     });

     // ------------------- Game Logic -------------------
     let flipped = [];
     let lock = false;

     cards.forEach(card => {
          card.addEventListener("click", () => {
               if (lock || card.classList.contains("flipped")) return;

               card.classList.add("flipped");
               flipped.push(card);

               if (flipped.length === 2) {
                    lock = true;
                    setTimeout(() => {
                         const [c1, c2] = flipped;
                         if (c1.dataset.value === c2.dataset.value) {
                              matchedCount += 2;
                              addHeartOnPair(c1, c2);
                         } else {
                              c1.classList.remove("flipped");
                              c2.classList.remove("flipped");
                         }

                         flipped = [];
                         lock = false;

                         if (matchedCount === cards.length) {
                              setTimeout(() => gameDone(cards), 500);
                         }
                    }, 1000);
               }
          });
     });
}

// ------------------- Add Heart on Match -------------------
function addHeartOnPair(c1, c2) {
     [c1, c2].forEach(card => {
          for (let i = 0; i < 3; i++) {
               setTimeout(() => {
                    const heart = document.createElement("div");
                    heart.classList.add("heart");
                    const offsetX = getRandom(-40, 40);
                    heart.style.left = `calc(50% + ${offsetX}px)`;
                    heart.style.animation = "floatHeart 2s ease-in-out forwards";
                    heart.style.opacity = "1";
                    card.appendChild(heart);
                    setTimeout(() => heart.remove(), 2000);
               }, i * 300);
          }
     });
}

// ------------------- Show Hearts on All Cards -------------------
function showHeartsOnAllCards(cards) {
     cards.forEach(card => {
          for (let i = 0; i < 3; i++) {
               setTimeout(() => {
                    const heart = document.createElement("div");
                    heart.classList.add("heart");
                    const offsetX = getRandom(-40, 40);
                    heart.style.left = `calc(50% + ${offsetX}px)`;
                    heart.style.animation = "floatHeart 2s ease-in-out forwards";
                    heart.style.opacity = "1";
                    card.appendChild(heart);
                    setTimeout(() => heart.remove(), 2000);
               }, i * 200);
          }
     });
}

// ------------------- Game Finished -------------------
async function gameDone(cards) {
     gamematch.classList.add('done');
     showHeartsOnAllCards(cards);
     victoryHearts();

     const container = document.getElementById("container");
     const continueBtn = document.getElementById("continueBtn");

     container.classList.remove("close");
     container.classList.add("open");

     await waitForClick(continueBtn);

     container.classList.remove("open");
     container.classList.add("close");
     gamematch.classList.remove('done');

     if (currentImageSet === 1) {
          currentImageSet = 2;
          gameactivated(); // load set 2
     } else if (currentImageSet === 2) {
          loadNextGame(); // move to next game
     }
}

// ------------------- Shortcut Win -------------------
function shortcutWin() {
     const cards = document.querySelectorAll("#game .card");
     cards.forEach(card => {
          if (!card.classList.contains("flipped")) card.classList.add("flipped");
     });
     setTimeout(() => gameDone(cards), 300);
}

// ------------------- Floating Hearts -------------------
function victoryHearts(count = 20, src = "img/dog/image1.png") {
     for (let i = 0; i < count; i++) {
          setTimeout(() => {
               const heart = document.createElement("img");
               heart.src = src;
               heart.classList.add("victory-heart");

               const offsetX = Math.random() * 90;
               heart.style.left = `${offsetX}vw`;

               const size = 20 + Math.random() * 20;
               heart.style.width = `${size}px`;
               heart.style.height = `${size}px`;

               const duration = 1.5 + Math.random();
               heart.style.animationDuration = `${duration}s`;

               document.body.appendChild(heart);
               setTimeout(() => heart.remove(), duration * 1000);
          }, i * 150);
     }
}

// ------------------- Utility -------------------
function getRandom(min, max) {
     return Math.random() * (max - min) + min;
}

function waitForClick(button) {
     return new Promise(resolve => {
          button.addEventListener("click", function handler() {
               button.removeEventListener("click", handler);
               resolve();
          });
     });
}

// ------------------- Load Next Game -------------------
function loadNextGame() {
     addValentine('content');
     ValentineGame();
}

function ValentineGame() {
     // Early return if Valentine box does not exist
     const valBox = document.getElementById("valentine-box");
     if (!valBox) return;

     const yesBtn = valBox.querySelector(".yes-btn");
     const noBtn = valBox.querySelector(".no-btn");

     if (!yesBtn || !noBtn) return; // Extra safety

     // Function to grow the Yes button
     function growYesButton() {
          // Get current width, height, font-size, padding
          const style = window.getComputedStyle(yesBtn);
          const currentFontSize = parseFloat(style.fontSize);
          const currentPaddingY = parseFloat(style.paddingTop);
          const currentPaddingX = parseFloat(style.paddingLeft);

          // Increase font size and padding
          yesBtn.style.fontSize = (currentFontSize + 4) + "px";
          yesBtn.style.padding = (currentPaddingY + 2) + "px " + (currentPaddingX + 4) + "px";
     }

     // On hovering or clicking No button, grow Yes button
     noBtn.addEventListener("click", growYesButton);

     // Optional: Yes button click action
     yesBtn.addEventListener("click", () => {
          alert("Yay I LOVE YOUUU! 💖");
          addEnvelope('content');
          valBox.remove(); // Close popup
     });
}
gameactivated();
