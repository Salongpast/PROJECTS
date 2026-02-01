const navItem = document.querySelector(".nav-item");
const btn = navItem.querySelector(".nav-btn");

  btn.addEventListener("click", () => {
    navItem.classList.toggle("active");
  });