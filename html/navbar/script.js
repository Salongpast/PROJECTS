

const navBar = document.querySelector(".nav-bar");
const settings = navBar.querySelector(".settings");

const dropdown = settings.querySelector(".dropdown");
const arrowBtn = settings.querySelector(".arrow-btn");

arrowBtn.addEventListener('click', () =>{
     settings.classList.toggle("active");
})

const navLinks = document.querySelectorAll(".nav-links");

function setNav() {
    const hash = window.location.hash || "#dashboard"; // default
    navLinks.forEach(link => {
        if (link.getAttribute("href") === hash) {
            link.classList.add("active");
        } else {
            link.classList.remove("active");
        }
    });
}

// Run on page load
setNav();

// Run when hash changes (user clicks link)
window.addEventListener("hashchange", setNav);