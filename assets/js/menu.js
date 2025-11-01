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



async function cargarMenu() {
    const res = await fetch('assets/data/menu.json'); // Ruta desde index.html
    if (!res.ok) throw new Error("Error al cargar el menú");
    return await res.json();
}

function crearSeccion(nombre, base = "") {
    const section = document.createElement("section");
    section.className = "space-y-4";
    section.id = nombre.toLowerCase().replace(/\s+/g, "-");

    const titulo = document.createElement("h2");
    titulo.textContent = nombre.toUpperCase();
    titulo.className = "text-2xl font-bold mb-4";
    section.appendChild(titulo);

    if (base) {
        const baseText = document.createElement("p");
        baseText.textContent = base;
        baseText.className = "text-sm text-gray-500 mb-6";
        section.appendChild(baseText);
    }

    const grid = document.createElement("div");
    grid.className = "grid grid-cols-1 md:grid-cols-2 gap-6";
    section.appendChild(grid);

    return { section, grid };
}

function crearTarjeta(producto) {
    const article = document.createElement("article");
    article.className = "flex items-start gap-4 p-4 border dark:border-white rounded-lg backdrop-blur-[3px] shadow-md dark:shadow-[0_4px_6px_rgba(255,248,240,0.1)] border-black";

    const contenido = document.createElement("div");

    const nombre = document.createElement("h3");
    nombre.textContent = producto.nombre;
    nombre.className = "font-bold text-xl text-stone-950 dark:text-stone-100";
    contenido.appendChild(nombre);

    const descripcion = document.createElement("p");
    descripcion.textContent = producto.descripcion || "";
    descripcion.className = "text-sm text-stone-950 dark:text-stone-100";
    contenido.appendChild(descripcion);

    const precio = document.createElement("span");
    precio.textContent = `$${producto.precio.toFixed(2)}`;
    precio.className = "block mt-2 font-bold text-stone-950 dark:text-stone-100";
    contenido.appendChild(precio);

    article.appendChild(contenido);
    return article;
}

function renderizarCategoria(nombre, productos, contenedor, base = "") {
    const { section, grid } = crearSeccion(nombre, base);

    productos.forEach(producto => {
        const tarjeta = crearTarjeta(producto);
        grid.appendChild(tarjeta);
    });

    contenedor.appendChild(section);
}

function renderizarPizzas(pizzas, contenedor, base) {
    const { section, grid } = crearSeccion("Pizzas", base);

    pizzas.deLaCasa.forEach(pizza => {
        const tarjeta = crearTarjeta(pizza);
        grid.appendChild(tarjeta);
    });

    const alGusto = document.createElement("article");
    alGusto.className = "flex items-start gap-4 p-4 border dark:border-white rounded-lg backdrop-blur-[3px] shadow-md dark:shadow-[0_4px_6px_rgba(255,248,240,0.1)] border-black";

    const contenido = document.createElement("div");
    contenido.innerHTML = `
    <h3 class="font-bold text-xl text-stone-950 dark:text-stone-100">Pizza al gusto</h3>
    <p class="text-sm text-stone-950 dark:text-stone-100">Elige hasta ${pizzas.alGusto.maxIngredientes} ingredientes</p>
    <ul class="text-sm text-stone-950 dark:text-stone-100 mt-2">
      ${pizzas.alGusto.ingredientesOpcionales.map(i => `<li>• ${i}</li>`).join("")}
    </ul>
    <span class="block mt-2 font-bold text-stone-950 dark:text-stone-100">Precio base: $9.00</span>
  `;
    alGusto.appendChild(contenido);
    grid.appendChild(alGusto);

    contenedor.appendChild(section);
}

function renderizarBebidas(bebidas, contenedor) {
    const { section, grid } = crearSeccion("Bebidas");

    bebidas.forEach(grupo => {
        const subtitulo = document.createElement("h3");
        subtitulo.textContent = grupo.categoria;
        subtitulo.className = "text-lg font-semibold col-span-full mt-4";
        grid.appendChild(subtitulo);

        grupo.productos.forEach(producto => {
            const tarjeta = crearTarjeta(producto);
            grid.appendChild(tarjeta);
        });
    });

    contenedor.appendChild(section);
}

function renderizarMenu(menu) {
    const contenedor = document.getElementById("carta");

    for (const categoria in menu.categorias) {
        const datos = menu.categorias[categoria];

        if (categoria === "pizzas") {
            renderizarPizzas(datos, contenedor, menu.baseIngredientes.pizzas);
        } else if (categoria === "bebidas") {
            renderizarBebidas(datos, contenedor);
        } else {
            renderizarCategoria(
                categoria,
                datos,
                contenedor,
                menu.baseIngredientes[categoria]
            );
        }
    }
}

function generarNavegacionRapida(categorias) {
    const nav = document.getElementById("nav-categorias");

    for (const categoria in categorias) {
        const nombre = categoria === "pizzas" ? "Pizzas" : categoria.charAt(0).toUpperCase() + categoria.slice(1);
        const id = nombre.toLowerCase().replace(/\s+/g, "-");

        const btn = document.createElement("button");
        btn.textContent = nombre;
        btn.className = "px-3 py-1 rounded-full bg-stone-200 dark:bg-stone-800 hover:bg-stone-300 dark:hover:bg-stone-700 transition";
        btn.onclick = () => {
            document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
        };

        nav.appendChild(btn);
    }
}


cargarMenu()
    .then(menu => {
        renderizarMenu(menu);
        generarNavegacionRapida(menu.categorias);
    })
    .catch(console.error);


