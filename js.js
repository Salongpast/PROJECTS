let starsActive = true; // start active

function enableStars(active, symbol = "♥") {
     document.querySelectorAll(".star").forEach(star => star.remove());
     if (!active) {
          return;
     }

     function getRandom(min, max) {
          return Math.random() * (max - min) + min;
     }

     const starCount = 200;
     const minSize = 20;
     const maxSize = 30;
     const minDuration = 2;
     const maxDuration = 5;

     for (let i = 0; i < starCount; i++) {
          const star = document.createElement("div");
          star.className = "star";
          star.textContent = symbol; // use passed symbol or default

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

function test() {
     const button = document.getElementById("test");
     const envelope = document.getElementById('envelope');

     button.addEventListener("click", () => {
          envelope.classList.toggle('open');
          envelope.classList.toggle('close');
     });
}

function clickme() {
     const envelope = document.getElementById('envelope');
     const button = envelope.querySelector(".click-me");

     button.addEventListener("click", () => {
          enableStars(starsActive, "I LOVE YOUU!");
     });
}

function addEnvelope(containerId) {
     const container = document.getElementById(containerId);
     if (!container) return;

     const envelopeHTML = ` 
     <div id="envelope" class="close"> 
          <div class="front flap"> 
               <button id="test">hello</button> 
          </div> 
          <div class="front pocket"></div> 
          <div class="letter"> 
               <p class="message line1">Happy Valentine’s Day!</p> 
               <p class="message line2">Click me</p> 
               <div class="message heart open"> 
                    <div class="triangle">
               </div> 
               </div> <button class="click-me"></button> 
          </div> 
     </div> `;
     container.innerHTML = envelopeHTML;
}
addEnvelope("content");
enableStars(starsActive);
clickme();
test();
