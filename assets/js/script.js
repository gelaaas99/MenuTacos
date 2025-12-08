// PARA QUE DESAPAREZCA AL HACER SCROLL HACIA ARRIBA Y APAREZCA AL HACER SCROLL HACIA ABAJO 
let lastScrollY = window.scrollY;
const header = document.getElementById("main-header");

window.addEventListener("scroll", () => {
  if (window.scrollY > lastScrollY && window.scrollY > 100) {
    // Scroll hacia arriba → ocultar header
    header.classList.add("-translate-y-full");

  } else {
    // Scroll hacia abajo → mostrar header
    header.classList.remove("-translate-y-full");
  }
  lastScrollY = window.scrollY;
});

// --- EVENTOS PARA QUE MENU.JS PUEDA FUNCIONAR --- //

// Detectar si el header principal está oculto o visible
if (header.classList.contains("-translate-y-full")) {
  window.dispatchEvent(new CustomEvent("headerMainHidden"));
} else {
  window.dispatchEvent(new CustomEvent("headerMainShown"));
}

// Detectar dirección del scroll y enviarla a menu.js
const scrollDirection = window.scrollY > lastScrollY ? "down" : "up";
window.dispatchEvent(new CustomEvent("headerScrollDirection", { detail: scrollDirection }));

// ===========================
// SCROLL SUAVE GLOBAL PARA TODOS LOS ENLACES DE NAV
// ===========================
const allNavLinks = document.querySelectorAll('nav a[href^="#"]');

allNavLinks.forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();

    const targetId = link.getAttribute('href');
    const targetElement = document.querySelector(targetId);
    if (!targetElement) return;

    // Altura de los headers fijos
    const mainHeaderHeight = document.getElementById("main-header")?.offsetHeight || 0;
    const cartaHeaderHeight = document.getElementById("nav-categorias")?.offsetHeight || 0;

    // Calculamos posición final restando altura de headers
    const elementPosition = targetElement.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.scrollY - mainHeaderHeight - cartaHeaderHeight;

    window.scrollTo({
      top: offsetPosition,
      behavior: "smooth"
    });
  });
});







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


