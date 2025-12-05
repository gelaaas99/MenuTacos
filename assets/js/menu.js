// // ===========================
// // MENU.JS - HEADER DE CARTA FUNCIONAL
// // ===========================

// const mainHeader = document.getElementById("main-header");
// const cartaHeader = document.getElementById("nav-categorias");
// const cartaSection = document.getElementById("carta");

// if (!mainHeader || !cartaHeader || !cartaSection) {
//     console.warn("menu.js: faltan elementos #main-header, #nav-categorias o #carta en el DOM.");
// }

// // Ocultar nav de carta por defecto
// cartaHeader.classList.add("hidden");

// // Flag para saber si estamos dentro de la sección carta
// let isInCarta = false;

// // Función que detecta si el header principal está visible
// function isMainHeaderVisible() {
//     if (!mainHeader) return false;
//     const rect = mainHeader.getBoundingClientRect();
//     return rect.bottom > 0; // Si el bottom > 0, está visible
// }

// // Función principal para actualizar la posición y visibilidad del header de carta
// function updateCartaHeader() {
//     const scrollY = window.scrollY;
//     const cartaTop = cartaSection.offsetTop;
//     const cartaBottom = cartaTop + cartaSection.offsetHeight;

//     // Ver si estamos dentro de la sección carta
//     if (scrollY + 1 >= cartaTop && scrollY <= cartaBottom) {
//         isInCarta = true;
//         cartaHeader.classList.remove("hidden");
//         cartaHeader.style.position = "sticky";
//         cartaHeader.style.left = "0";
//         cartaHeader.style.right = "0";
//         cartaHeader.style.width = "100%";
//         cartaHeader.style.zIndex = "40";
//         cartaHeader.style.transition = "top 200ms ease";

//         // Ajustar top según visibilidad del header principal
//         if (isMainHeaderVisible()) {
//             cartaHeader.style.top = `${mainHeader.offsetHeight}px`;
//         } else {
//             cartaHeader.style.top = "0px";
//         }

//     } else {
//         // fuera de carta
//         isInCarta = false;
//         cartaHeader.classList.add("hidden");
//         cartaHeader.style.position = "";
//         cartaHeader.style.top = "";
//         cartaHeader.style.width = "";
//     }
// }

// // ===========================
// // EVENTOS
// // ===========================
// window.addEventListener("scroll", updateCartaHeader);
// window.addEventListener("resize", updateCartaHeader);
// document.addEventListener("DOMContentLoaded", updateCartaHeader);

// // ===========================
// // OPCIONAL: si quieres sincronizar con eventos de script.js
// // ===========================
// window.addEventListener("headerMainHidden", () => { if (isInCarta) updateCartaHeader(); });
// window.addEventListener("headerMainShown", () => { if (isInCarta) updateCartaHeader(); });


const mainHeader = document.getElementById("main-header");
const cartaHeader = document.getElementById("nav-categorias");
const cartaSection = document.getElementById("carta");

if (!mainHeader || !cartaHeader || !cartaSection) {
    console.warn("menu.js: faltan elementos necesarios en el DOM.");
}

// Inicializamos header carta
cartaHeader.style.position = "sticky";
cartaHeader.style.left = "0";
cartaHeader.style.right = "0";
cartaHeader.style.width = "100%";
cartaHeader.style.zIndex = "40";
cartaHeader.style.transition = "top 200ms ease";

// Función para saber si el header principal está visible
function isMainHeaderVisible() {
    return mainHeader.getBoundingClientRect().bottom > 0;
}

// Función para actualizar la posición del header de carta
function updateCartaHeader() {
    const scrollY = window.scrollY;
    const cartaTop = cartaSection.offsetTop;
    const cartaBottom = cartaTop + cartaSection.offsetHeight;

    // Solo mostrar dentro de la sección carta
    if (scrollY + 1 >= cartaTop && scrollY <= cartaBottom) {
        // Ajustar top según visibilidad del header principal
        cartaHeader.style.top = isMainHeaderVisible() ? `${mainHeader.offsetHeight}px` : "0px";
    } else {
        // Fuera de carta → lo dejamos fuera de la pantalla
        cartaHeader.style.top = `-${cartaHeader.offsetHeight}px`;
    }
}

// Eventos
window.addEventListener("scroll", updateCartaHeader);
window.addEventListener("resize", updateCartaHeader);
document.addEventListener("DOMContentLoaded", updateCartaHeader);

// ------------------

document.addEventListener("DOMContentLoaded", () => {
    cargarMenu();
});

async function cargarMenu() {
    try {
        const response = await fetch("assets/data/menu.json");
        const data = await response.json();

        const categorias = data.categorias; // ESTA es tu carta REAL
        const menuDinamico = document.getElementById("menu-dinamico");
        const navCategorias = document.getElementById("nav-categorias");

        menuDinamico.innerHTML = "";
        navCategorias.innerHTML = "";

        // Generar tarjetas para cada categoría
        Object.keys(categorias).forEach(nombreCategoria => {

            // Crear botón de navegación arriba
            const btn = document.createElement("button");
            btn.className = "px-3 py-1 rounded-lg bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition";
            btn.textContent = nombreCategoria;
            btn.onclick = () => scrollToSection(nombreCategoria);
            navCategorias.appendChild(btn);

            // Crear tarjeta de categoría
            const card = document.createElement("article");
            card.className =
                "p-4 border dark:border-white rounded-lg backdrop-blur-[3px] shadow-md dark:shadow-[0_4px_6px_rgba(255,248,240,0.1)] border-black";
            card.id = `cat-${nombreCategoria}`;

            // Título grande
            const title = document.createElement("h2");
            title.className = "font-bold text-2xl mb-3 text-stone-950 dark:text-stone-100";
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
                        li.className = "flex justify-between text-stone-950 dark:text-stone-100";
                        li.innerHTML = `<span>${prod.nombre}</span> <span class="font-bold">${prod.precio}€</span>`;
                        ul.appendChild(li);
                    });
                });
            }

            // Caso normal (entrantes, tacos, hamburguesas…)
            else if (Array.isArray(categorias[nombreCategoria])) {
                categorias[nombreCategoria].forEach(prod => {
                    const li = document.createElement("li");
                    li.className = "flex justify-between text-stone-950 dark:text-stone-100";
                    li.innerHTML = `<span>${prod.nombre}</span> <span class="font-bold">${prod.precio}€</span>`;
                    ul.appendChild(li);
                });
            }

            // Caso pizzas (tiene subcategorías: deLaCasa + alGusto)
            else if (nombreCategoria === "pizzas") {

                // PIZZAS DE LA CASA
                categorias.pizzas.deLaCasa.forEach(prod => {
                    const li = document.createElement("li");
                    li.className = "flex justify-between text-stone-950 dark:text-stone-100";
                    li.innerHTML = `<span>${prod.nombre}</span> <span class="font-bold">${prod.precio}€</span>`;
                    ul.appendChild(li);
                });

                // PIZZA AL GUSTO (solo muestro ingredientes opcionales)
                const gusto = categorias.pizzas.alGusto.ingredientesOpcionales;
                gusto.forEach(ing => {
                    const li = document.createElement("li");
                    li.className = "flex justify-between text-stone-950 dark:text-stone-100";
                    li.innerHTML = `<span>Pizza al gusto: ${ing}</span>`;
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
    const section = document.querySelector(`#cat-${nombre}`);
    if (section) section.scrollIntoView({ behavior: "smooth" });
}




// async function cargarMenu() {
//     const res = await fetch('assets/data/menu.json'); // Ruta desde index.html
//     if (!res.ok) throw new Error("Error al cargar el menú");
//     return await res.json();
// }

// function crearSeccion(nombre, base = "") {
//     const section = document.createElement("section");
//     section.className = "space-y-4";

//     const titulo = document.createElement("h2");
//     titulo.textContent = nombre.toUpperCase();
//     titulo.className = "text-2xl font-bold mb-4";
//     section.appendChild(titulo);

//     if (base) {
//         const baseText = document.createElement("p");
//         baseText.textContent = base;
//         baseText.className = "text-sm text-gray-500 mb-6";
//         section.appendChild(baseText);
//     }

//     const grid = document.createElement("div");
//     grid.className = "grid grid-cols-1 md:grid-cols-2 gap-6";
//     section.appendChild(grid);

//     return { section, grid };
// }

// function crearTarjeta(producto) {
//     const article = document.createElement("article");
//     article.className = "flex items-start gap-4 p-4 border dark:border-white rounded-lg backdrop-blur-[3px] shadow-md dark:shadow-[0_4px_6px_rgba(255,248,240,0.1)] border-black";

//     const contenido = document.createElement("div");

//     const nombre = document.createElement("h3");
//     nombre.textContent = producto.nombre;
//     nombre.className = "font-bold text-xl text-stone-950 dark:text-stone-100";
//     contenido.appendChild(nombre);

//     const descripcion = document.createElement("p");
//     descripcion.textContent = producto.descripcion || "";
//     descripcion.className = "text-sm text-stone-950 dark:text-stone-100";
//     contenido.appendChild(descripcion);

//     const precio = document.createElement("span");
//     precio.textContent = `${producto.precio.toFixed(2)} €`;
//     precio.className = "block mt-2 font-bold text-stone-950 dark:text-stone-100";
//     contenido.appendChild(precio);

//     article.appendChild(contenido);
//     return article;
// }

// function renderizarCategoria(nombre, productos, contenedor, base = "") {
//     const { section, grid } = crearSeccion(nombre, base);

//     productos.forEach(producto => {
//         const tarjeta = crearTarjeta(producto);
//         grid.appendChild(tarjeta);
//     });

//     contenedor.appendChild(section);
// }

// function renderizarPizzas(pizzas, contenedor, base) {
//     const { section, grid } = crearSeccion("Pizzas", base);

//     pizzas.deLaCasa.forEach(pizza => {
//         const tarjeta = crearTarjeta(pizza);
//         grid.appendChild(tarjeta);
//     });

//     const alGusto = document.createElement("article");
//     alGusto.className = "flex items-start gap-4 p-4 border dark:border-white rounded-lg backdrop-blur-[3px] shadow-md dark:shadow-[0_4px_6px_rgba(255,248,240,0.1)] border-black";

//     const contenido = document.createElement("div");
//     contenido.innerHTML = `
//     <h3 class="font-bold text-xl text-stone-950 dark:text-stone-100">Pizza al gusto</h3>
//     <p class="text-sm text-stone-950 dark:text-stone-100">Elige hasta ${pizzas.alGusto.maxIngredientes} ingredientes</p>
//     <ul class="text-sm text-stone-950 dark:text-stone-100 mt-2">
//       ${pizzas.alGusto.ingredientesOpcionales.map(i => `<li>• ${i}</li>`).join("")}
//     </ul>
//     <span class="block mt-2 font-bold text-stone-950 dark:text-stone-100">Precio base: $9.00</span>
//   `;
//     alGusto.appendChild(contenido);
//     grid.appendChild(alGusto);

//     contenedor.appendChild(section);
// }

// function renderizarBebidas(bebidas, contenedor) {
//     const { section, grid } = crearSeccion("Bebidas");

//     bebidas.forEach(grupo => {
//         const subtitulo = document.createElement("h3");
//         subtitulo.textContent = grupo.categoria;
//         subtitulo.className = "text-lg font-semibold col-span-full mt-4";
//         grid.appendChild(subtitulo);

//         grupo.productos.forEach(producto => {
//             const tarjeta = crearTarjeta(producto);
//             grid.appendChild(tarjeta);
//         });
//     });

//     contenedor.appendChild(section);
// }

// function renderizarMenu(menu) {
//     const contenedor = document.getElementById("carta");

//     for (const categoria in menu.categorias) {
//         const datos = menu.categorias[categoria];

//         if (categoria === "pizzas") {
//             renderizarPizzas(datos, contenedor, menu.baseIngredientes.pizzas);
//         } else if (categoria === "bebidas") {
//             renderizarBebidas(datos, contenedor);
//         } else {
//             renderizarCategoria(
//                 categoria,
//                 datos,
//                 contenedor,
//                 menu.baseIngredientes[categoria]
//             );
//         }
//     }
// }

// cargarMenu().then(renderizarMenu).catch(console.error);























// async function cargarMenu() {
//     const res = await fetch('assets/data/menu.json'); // Ruta desde index.html
//     if (!res.ok) throw new Error("Error al cargar el menú");
//     return await res.json();
// }

// function crearSeccion(nombre, base = "") {
//     const section = document.createElement("section");
//     section.className = "space-y-4";
//     section.id = nombre.toLowerCase().replace(/\s+/g, "-");

//     const titulo = document.createElement("h2");
//     titulo.textContent = nombre.toUpperCase();
//     titulo.className = "text-2xl font-bold mb-4";
//     section.appendChild(titulo);

//     if (base) {
//         const baseText = document.createElement("p");
//         baseText.textContent = base;
//         baseText.className = "text-sm text-gray-500 mb-6";
//         section.appendChild(baseText);
//     }

//     const grid = document.createElement("div");
//     grid.className = "grid grid-cols-1 md:grid-cols-2 gap-6";
//     section.appendChild(grid);

//     return { section, grid };
// }

// function crearTarjeta(producto) {
//     const article = document.createElement("article");
//     article.className = "flex items-start gap-4 p-4 border dark:border-white rounded-lg backdrop-blur-[3px] shadow-md dark:shadow-[0_4px_6px_rgba(255,248,240,0.1)] border-black";

//     const contenido = document.createElement("div");

//     const nombre = document.createElement("h3");
//     nombre.textContent = producto.nombre;
//     nombre.className = "font-bold text-xl text-stone-950 dark:text-stone-100";
//     contenido.appendChild(nombre);

//     const descripcion = document.createElement("p");
//     descripcion.textContent = producto.descripcion || "";
//     descripcion.className = "text-sm text-stone-950 dark:text-stone-100";
//     contenido.appendChild(descripcion);

//     const precio = document.createElement("span");
//     precio.textContent = `$${producto.precio.toFixed(2)}`;
//     precio.className = "block mt-2 font-bold text-stone-950 dark:text-stone-100";
//     contenido.appendChild(precio);

//     article.appendChild(contenido);
//     return article;
// }

// function renderizarCategoria(nombre, productos, contenedor, base = "") {
//     const { section, grid } = crearSeccion(nombre, base);

//     productos.forEach(producto => {
//         const tarjeta = crearTarjeta(producto);
//         grid.appendChild(tarjeta);
//     });

//     contenedor.appendChild(section);
// }

// function renderizarPizzas(pizzas, contenedor, base) {
//     const { section, grid } = crearSeccion("Pizzas", base);

//     pizzas.deLaCasa.forEach(pizza => {
//         const tarjeta = crearTarjeta(pizza);
//         grid.appendChild(tarjeta);
//     });

//     const alGusto = document.createElement("article");
//     alGusto.className = "flex items-start gap-4 p-4 border dark:border-white rounded-lg backdrop-blur-[3px] shadow-md dark:shadow-[0_4px_6px_rgba(255,248,240,0.1)] border-black";

//     const contenido = document.createElement("div");
//     contenido.innerHTML = `
//     <h3 class="font-bold text-xl text-stone-950 dark:text-stone-100">Pizza al gusto</h3>
//     <p class="text-sm text-stone-950 dark:text-stone-100">Elige hasta ${pizzas.alGusto.maxIngredientes} ingredientes</p>
//     <ul class="text-sm text-stone-950 dark:text-stone-100 mt-2">
//       ${pizzas.alGusto.ingredientesOpcionales.map(i => `<li>• ${i}</li>`).join("")}
//     </ul>
//     <span class="block mt-2 font-bold text-stone-950 dark:text-stone-100">Precio base: $9.00</span>
//   `;
//     alGusto.appendChild(contenido);
//     grid.appendChild(alGusto);

//     contenedor.appendChild(section);
// }

// function renderizarBebidas(bebidas, contenedor) {
//     const { section, grid } = crearSeccion("Bebidas");

//     bebidas.forEach(grupo => {
//         const subtitulo = document.createElement("h3");
//         subtitulo.textContent = grupo.categoria;
//         subtitulo.className = "text-lg font-semibold col-span-full mt-4";
//         grid.appendChild(subtitulo);

//         grupo.productos.forEach(producto => {
//             const tarjeta = crearTarjeta(producto);
//             grid.appendChild(tarjeta);
//         });
//     });

//     contenedor.appendChild(section);
// }

// function renderizarMenu(menu) {
//     const contenedor = document.getElementById("carta");

//     for (const categoria in menu.categorias) {
//         const datos = menu.categorias[categoria];

//         if (categoria === "pizzas") {
//             renderizarPizzas(datos, contenedor, menu.baseIngredientes.pizzas);
//         } else if (categoria === "bebidas") {
//             renderizarBebidas(datos, contenedor);
//         } else {
//             renderizarCategoria(
//                 categoria,
//                 datos,
//                 contenedor,
//                 menu.baseIngredientes[categoria]
//             );
//         }
//     }
// }

// function generarNavegacionRapida(categorias) {
//     const nav = document.getElementById("nav-categorias");

//     for (const categoria in categorias) {
//         const nombre = categoria === "pizzas" ? "Pizzas" : categoria.charAt(0).toUpperCase() + categoria.slice(1);
//         const id = nombre.toLowerCase().replace(/\s+/g, "-");

//         const btn = document.createElement("button");
//         btn.textContent = nombre;
//         btn.className = "px-3 py-1 rounded-full bg-stone-200 dark:bg-stone-800 hover:bg-stone-300 dark:hover:bg-stone-700 transition";
//         btn.onclick = () => {
//             document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
//         };

//         nav.appendChild(btn);
//     }
// }


// cargarMenu()
//     .then(menu => {
//         renderizarMenu(menu);
//         generarNavegacionRapida(menu.categorias);
//     })
//     .catch(console.error);


