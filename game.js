function gameactivated() {
     var gamematch = document.getElementById('game');
     if (!(gamematch && gamematch.classList.contains('game-activated'))) {
          return;
     }

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

     const game = document.getElementById("game");

     // Create cards based on heart pattern
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

                    game.appendChild(card);
                    cards.push(card);
               } else {
                    // Empty cell
                    const empty = document.createElement("div");
                    game.appendChild(empty);
               }
          }
     }

     // ------------------- Image setup -------------------
     const images = [
          "img/image1.png",
          "img/image2.png",
          "img/image3.png",
          "img/image4.png",
          "img/image5.png",
          "img/image6.png",
          "img/image7.png",
          "img/image8.png",
          "img/image9.png",
          "img/image10.png",
          "img/image11.png",
          "img/image12.png"
     ];

     // Duplicate images for pairs
     const pairCount = Math.floor(cards.length / 2);
     let selectedImages = images.slice(0, pairCount);
     let cardImages = [...selectedImages, ...selectedImages];

     // Shuffle images
     cardImages.sort(() => Math.random() - 0.5);

     // Assign images to cards
     cards.forEach((card, index) => {
          const back = card.querySelector(".back");
          back.style.backgroundImage = `url(${cardImages[index]})`;
          back.style.backgroundSize = "cover";
          back.style.backgroundPosition = "center";
          card.dataset.value = cardImages[index]; // use image URL as identifier
     });

     // ------------------- Game logic -------------------
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
                              // Match found
                              matchedCount += 2; // Increase matched count
                              // Optional: add some sparkle animation here
                         } else {
                              // Not a match
                              c1.classList.remove("flipped");
                              c2.classList.remove("flipped");
                         }

                         flipped = [];
                         lock = false;

                         // Check if all cards are matched
                         if (matchedCount === cards.length) {
                              // Game finished!
                              setTimeout(() => {
                                   alert("🎉 Congratulations! You completed the heart matching game! 🎉");
                                   // Or you can show a custom div instead of alert
                              }, 500);
                         }
                    }, 1000);
               }
          });
     });
}

gameactivated();