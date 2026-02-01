const container = document.querySelector('.container');

const cols = Math.ceil(window.innerWidth / 50);
const rows = Math.ceil(window.innerHeight / 50);
const total = cols * rows;

for (let i = 0; i < total; i++) {
    const div = document.createElement('div');
    div.className = "grid-item";
    
    // stagger the animation
    div.style.animationDelay = `${i * 0.001}s`; 
    container.appendChild(div);
}