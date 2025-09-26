// // Dark Mode Desktop
// const toggleDesktop = document.querySelector("#theme-toggle-desktop");
// toggleDesktop.addEventListener("click", () => {
//   document.documentElement.classList.toggle("dark");
// });

// // Dark Mode Mobile
// const toggleMobile = document.querySelector("#theme-toggle-mobile");
// toggleMobile.addEventListener("click", () => {
//   document.documentElement.classList.toggle("dark");
// });

// // Toggle menú móvil
// const mobileBtn = document.querySelector("#mobile-menu-btn");
// const mobileMenu = document.querySelector("#mobile-menu");
// mobileBtn.addEventListener("click", () => {
//   mobileMenu.classList.toggle("hidden");
// });

// Dark Mode Desktop
const toggleDesktop = document.querySelector("#theme-toggle-desktop");
toggleDesktop.addEventListener("click", () => {
  document.documentElement.classList.toggle("dark");
});

// Dark Mode Mobile
const toggleMobile = document.querySelector("#theme-toggle-mobile");
toggleMobile.addEventListener("click", () => {
  document.documentElement.classList.toggle("dark");
  // 👇 también cierra el menú móvil si está abierto
  mobileMenu.classList.add("hidden");
});

// Toggle menú móvil
const mobileBtn = document.querySelector("#mobile-menu-btn");
const mobileMenu = document.querySelector("#mobile-menu");

// Abrir / cerrar al pulsar el botón hamburguesa
mobileBtn.addEventListener("click", (e) => {
  e.stopPropagation(); // evita que se cierre por el listener global
  mobileMenu.classList.toggle("hidden");
});

// Cerrar al hacer click en cualquier opción del menú
const menuLinks = mobileMenu.querySelectorAll("a");
menuLinks.forEach(link => {
  link.addEventListener("click", () => {
    mobileMenu.classList.add("hidden");
  });
});

// Cerrar al hacer click fuera del menú
document.addEventListener("click", (e) => {
  if (!mobileMenu.classList.contains("hidden")) {
    if (!mobileMenu.contains(e.target) && !mobileBtn.contains(e.target)) {
      mobileMenu.classList.add("hidden");
    }
  }
});


