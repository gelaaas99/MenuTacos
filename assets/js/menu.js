// ===========================
// MENU.JS - Navegación de carta + carga dinámica
// ===========================

document.addEventListener("DOMContentLoaded", () => {
    const mainHeader = document.getElementById("main-header");
    const cartaHeader = document.getElementById("nav-categorias");
    const cartaSection = document.getElementById("carta");

    if (!mainHeader || !cartaHeader || !cartaSection) {
        console.warn("menu.js: faltan elementos necesarios en el DOM.");
    } else {
        // Inicializamos header carta
        cartaHeader.style.position = "sticky";
        cartaHeader.style.left = "0";
        cartaHeader.style.right = "0";
        cartaHeader.style.width = "100%";
        cartaHeader.style.zIndex = "40";
        cartaHeader.style.transition = "top 200ms ease";

        // Estado para saber si vamos hacia arriba o hacia abajo
        let lastScrollY = window.scrollY;
        let headerVisible = true; // al inicio asumimos que está visible

        function updateHeaderVisibilityState() {
            const currentY = window.scrollY;
            const delta = currentY - lastScrollY;

            // ignoramos cambios muy pequeños
            if (Math.abs(delta) < 2) {
                return;
            }

            if (delta > 0) {
                // Scroll hacia abajo → escondemos header
                headerVisible = false;
            } else {
                // Scroll hacia arriba → mostramos header
                headerVisible = true;
            }

            lastScrollY = currentY;
        }

        function updateCartaHeader() {
            const scrollY = window.scrollY;
            const cartaTop = cartaSection.offsetTop;
            const cartaBottom = cartaTop + cartaSection.offsetHeight;

            // Solo mostramos el nav mientras el scroll está dentro de la sección carta
            if (scrollY + 1 >= cartaTop && scrollY <= cartaBottom) {
                const topOffset = headerVisible ? mainHeader.offsetHeight : 0;
                cartaHeader.style.top = `${topOffset}px`;
            } else {
                // Fuera de carta → lo subimos fuera de pantalla
                cartaHeader.style.top = `-${cartaHeader.offsetHeight}px`;
            }
        }

        function handleScroll() {
            updateHeaderVisibilityState();
            updateCartaHeader();
        }

        window.addEventListener("scroll", handleScroll);
        window.addEventListener("resize", updateCartaHeader);

        // Posición inicial
        updateCartaHeader();
    }

    // Una vez que el DOM está listo, cargamos el menú
    cargarMenu();
});

async function cargarMenu() {
    try {
        const response = await fetch("assets/data/menu.json");
        const data = await response.json();

        const categorias = data.categorias; // ESTA es tu carta REAL
        const menuDinamico = document.getElementById("menu-dinamico");
        const navCategorias = document.getElementById("nav-categorias");

        if (!menuDinamico || !navCategorias || !categorias) {
            console.warn("menu.js: faltan contenedores de carta o datos.");
            return;
        }

        menuDinamico.innerHTML = "";
        navCategorias.innerHTML = "";

        // Generar tarjetas para cada categoría
        Object.keys(categorias).forEach(nombreCategoria => {

            // Crear botón de navegación arriba
            const btn = document.createElement("button");
            btn.className =
                "px-3 py-1 rounded-lg bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition";
            btn.textContent =
                nombreCategoria.charAt(0).toUpperCase() + nombreCategoria.slice(1);
            btn.addEventListener("click", () => scrollToSection(nombreCategoria));
            navCategorias.appendChild(btn);

            // Crear tarjeta de categoría
            const card = document.createElement("article");
            card.className =
                "scroll-mt-[160px] p-4 border dark:border-white rounded-lg backdrop-blur-[3px] shadow-md dark:shadow-[0_4px_6px_rgba(255,248,240,0.1)] border-black";
            card.id = `cat-${nombreCategoria}`;

            // Título grande
            const title = document.createElement("h2");
            title.className =
                "font-bold text-2xl mb-3 text-stone-950 dark:text-stone-100";
            title.textContent = nombreCategoria.toUpperCase();
            card.appendChild(title);

            // LISTA DE PRODUCTOS
            const ul = document.createElement("ul");
            ul.className = "space-y-2";

            // Caso especial bebidas
            if (nombreCategoria === "bebidas") {
                categorias.bebidas.forEach(sub => {
                    sub.productos.forEach(prod => {
                        const li = document.createElement("li");
                        li.className =
                            "flex justify-between text-stone-950 dark:text-stone-100";
                        li.innerHTML =
                            `<span>${prod.nombre}</span> <span class="font-bold">${prod.precio}€</span>`;
                        ul.appendChild(li);
                    });
                });
            }

            // Caso pizzas (tiene subcategorías: deLaCasa + alGusto)
            else if (nombreCategoria === "pizzas") {
                // PIZZAS DE LA CASA
                categorias.pizzas.deLaCasa.forEach(prod => {
                    const li = document.createElement("li");
                    li.className =
                        "flex justify-between text-stone-950 dark:text-stone-100";
                    li.innerHTML =
                        `<span>${prod.nombre}</span> <span class="font-bold">${prod.precio}€</span>`;
                    ul.appendChild(li);
                });

                // PIZZA AL GUSTO (solo muestro ingredientes opcionales)
                const gusto = categorias.pizzas.alGusto.ingredientesOpcionales;
                gusto.forEach(ing => {
                    const li = document.createElement("li");
                    li.className =
                        "flex justify-between text-stone-950 dark:text-stone-100";
                    li.innerHTML = `<span>Pizza al gusto: ${ing}</span>`;
                    ul.appendChild(li);
                });
            }

            // Caso normal (entrantes, tacos, hamburguesas…)
            else if (Array.isArray(categorias[nombreCategoria])) {
                categorias[nombreCategoria].forEach(prod => {
                    const li = document.createElement("li");
                    li.className =
                        "flex justify-between text-stone-950 dark:text-stone-100";
                    li.innerHTML =
                        `<span>${prod.nombre}</span> <span class="font-bold">${prod.precio}€</span>`;
                    ul.appendChild(li);
                });
            }

            card.appendChild(ul);
            menuDinamico.appendChild(card);
        });

    } catch (error) {
        console.error("Error cargando menú:", error);
    }
}

function scrollToSection(nombre) {
    const section = document.getElementById(`cat-${nombre}`);
    if (!section) return;

    const mainHeader = document.getElementById("main-header");
    const cartaHeader = document.getElementById("nav-categorias");

    const mainHeight = mainHeader ? mainHeader.offsetHeight : 0;
    const cartaHeight = cartaHeader ? cartaHeader.offsetHeight : 0;
    const extra = 8; // pequeño margen visual

    const sectionTop = section.getBoundingClientRect().top + window.scrollY;
    const targetScroll = sectionTop - (mainHeight + cartaHeight + extra);

    window.scrollTo({
        top: targetScroll,
        behavior: "smooth"
    });
}









const footerYearEl = document.getElementById("footer-year");
if (footerYearEl) {
    footerYearEl.textContent = new Date().getFullYear();
}





