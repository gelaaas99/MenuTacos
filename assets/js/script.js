// Dark Mode Desktop
const toggleDesktop = document.querySelector("#theme-toggle-desktop");
toggleDesktop.addEventListener("click", () => {
  document.documentElement.classList.toggle("dark");
});

// Dark Mode Mobile
const toggleMobile = document.querySelector("#theme-toggle-mobile");
toggleMobile.addEventListener("click", () => {
  document.documentElement.classList.toggle("dark");
});

// Toggle menú móvil
const mobileBtn = document.querySelector("#mobile-menu-btn");
const mobileMenu = document.querySelector("#mobile-menu");
mobileBtn.addEventListener("click", () => {
  mobileMenu.classList.toggle("hidden");
});

