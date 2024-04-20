let listaCarrito = [];

const listaCarritoJSON = localStorage.getItem("productos");
if (listaCarritoJSON) {
  listaCarrito = JSON.parse(listaCarritoJSON);
} else {
  listaCarrito = [];
}

const carrito = document.getElementById("carrito");
carrito.innerHTML = `<p class="m-0">Todavía no hay productos en el carrito</p>`;
carrito.classList.add("gap-3");

const total = document.createElement("b");
total.className = "fs-5 text-start mx-2";

const contenedorBotonesCarrito = document.createElement("div");
contenedorBotonesCarrito.className = "d-flex gap-1";

const btnVerCarrito = document.createElement("a");
if (location.pathname.endsWith("index.html")) {
  btnVerCarrito.href = "cart.html";
} else {
  btnVerCarrito.href = "cart.html";
}
btnVerCarrito.textContent = "Ver carrito";
btnVerCarrito.className =
  "col-6 border-0 text-light bg-success text-decoration-none";

const verHistorial = document.createElement("div");

const btnVerHistorial = document.createElement("a");
btnVerHistorial.href = "history.html";
btnVerHistorial.textContent = "Ver historial de compras";
btnVerHistorial.className = "text-dark fw-bold";

verHistorial.appendChild(btnVerHistorial);

const btnEliminarTodo = document.createElement("button");
btnEliminarTodo.textContent = "Vaciar carrito";
btnEliminarTodo.className = "col-6 border-0 text-light bg-danger";

btnEliminarTodo.addEventListener("click", () => {
  localStorage.clear();
  listaCarrito = [];
  actualizarCarrito();
});

contenedorBotonesCarrito.appendChild(btnEliminarTodo);
contenedorBotonesCarrito.appendChild(btnVerCarrito);

// Convertir el string almacenado en el localStorage en JSON para mostrarlo en el carrito

function actualizarCarrito() {
  carrito.innerHTML = "";

  let subtotalTotal = 0;

  if (listaCarrito.length === 0) {
    carrito.innerHTML = `<p class="m-0">Todavía no hay productos en el carrito</p>`;
    carrito.classList.add("gap-3");
    return;
  }

  listaCarrito.forEach((producto) => {
    const contenedorProductoCarrtido = document.createElement("div");
    contenedorProductoCarrtido.className =
      "d-flex gap-4 justify-content-between";

    const imagenProductoCarrito = document.createElement("img");
    imagenProductoCarrito.src = `${producto.imagen}`;
    imagenProductoCarrito.className = "col-3 img-fluid object-fit-cover";

    const contenedorProductoNombrePrecioCarrito = document.createElement("div");
    contenedorProductoNombrePrecioCarrito.className =
      "d-flex col-9 flex-column justify-content-between";
    const nombreProductoCarrito = document.createElement("h5");
    nombreProductoCarrito.textContent = producto.nombre;
    nombreProductoCarrito.className = "text-start";

    const precioProductoCarrito = document.createElement("b");
    const subtotalProducto = producto.precio * producto.contador;
    precioProductoCarrito.textContent = `$${subtotalProducto.toFixed(3)}`;
    precioProductoCarrito.className = "text-start";

    const contadorProductoCarrito = document.createElement("p");
    contadorProductoCarrito.className = "text-start m-0";
    contadorProductoCarrito.textContent = `Cantidad: ${producto.contador}`;

    const btnEliminar = document.createElement("button");
    btnEliminar.textContent = "Eliminar";
    btnEliminar.className =
      "text-danger text-decoration-underline bg-transparent border-0 text-start p-0";
    btnEliminar.id = "btnEliminar";

    btnEliminar.addEventListener("click", () => {
      const listaCarritoIndex = listaCarrito.findIndex(
        (item) => item.id === producto.id
      );
      if (listaCarritoIndex !== -1) {
        listaCarrito.splice(listaCarritoIndex, 1);
        if (listaCarrito.length != 0) {
          const listaCarritoJSON = JSON.stringify(listaCarrito);
          localStorage.setItem("productos", listaCarritoJSON);
        } else {
          localStorage.clear();
        }
        actualizarCarrito();
      }
    });

    contenedorProductoNombrePrecioCarrito.appendChild(nombreProductoCarrito);
    contenedorProductoNombrePrecioCarrito.appendChild(contadorProductoCarrito);
    contenedorProductoNombrePrecioCarrito.appendChild(btnEliminar);
    contenedorProductoNombrePrecioCarrito.appendChild(precioProductoCarrito);
    contenedorProductoCarrtido.appendChild(imagenProductoCarrito);
    contenedorProductoCarrtido.appendChild(
      contenedorProductoNombrePrecioCarrito
    );
    carrito.appendChild(contenedorProductoCarrtido);

    subtotalTotal += subtotalProducto;
  });

  total.textContent = `Subtotal: $${subtotalTotal.toFixed(3)}`;
  carrito.appendChild(contenedorBotonesCarrito);
  carrito.appendChild(verHistorial);
  carrito.appendChild(total);
}

// Mostrar los productos en el carrito al cargar la página
if (listaCarritoJSON) {
  actualizarCarrito();
}

fetch("data.json")
  .then((response) => response.json())
  .then((data) => {
    const productos = data.productos;
    const parametrosURL = new URL(window.location).searchParams;
    const selectorCategoria = document.getElementById("selectorCategoria");
    const contenedorProductos = document.getElementById("contenedorProductos");

    // Crear la card del producto
    function crearCardProducto(producto) {
      const contenedorProducto = document.createElement("div");
      contenedorProducto.className = "card border-0";
      contenedorProducto.style.width = "18rem";

      const linkProducto = document.createElement("a");
      linkProducto.href = `shop.html?id=${producto.id}`;

      const imagenProducto = document.createElement("img");
      imagenProducto.className = "w-100 object-fit-cover";
      imagenProducto.src = `${producto.imagen}`;
      imagenProducto.alt = `Foto de ${producto.nombre}`;

      linkProducto.appendChild(imagenProducto);
      contenedorProducto.appendChild(linkProducto);

      const cardBody = document.createElement("div");
      cardBody.className =
        "card-body p-1 d-flex flex-column justify-content-between";
      cardBody.style.color = "#0c0c0c";

      const nombreProducto = document.createElement("h5");
      nombreProducto.className = "fs-6 card-title";
      nombreProducto.style.color = "#0c0c0c";
      nombreProducto.textContent = producto.nombre;

      const categoriaProducto = document.createElement("b");
      categoriaProducto.textContent = producto.categoria;

      const contenedorPrecioCategoria = document.createElement("div");
      contenedorPrecioCategoria.className = "d-flex flex-column";
      contenedorPrecioCategoria.appendChild(categoriaProducto);

      const precioProducto = document.createElement("b");
      precioProducto.textContent = `$${producto.precio}`;

      const comprarBoton = document.createElement("button");
      comprarBoton.textContent = "Agregar al carrito";
      comprarBoton.style.backgroundColor = "#0c0c0c9d";
      comprarBoton.className =
        "text-light border-0 w-100 py-1 hvr-shutter-out-horizontal";

      // Agregar productos al carrito -> almacenarlos en el localStorage -> mostrarlos en el carrito
      comprarBoton.addEventListener("click", () => {
        const productoAgregado = listaCarrito.find(
          (item) => item.id === producto.id
        );
        if (!productoAgregado) {
          listaCarrito.push({
            id: producto.id,
            nombre: producto.nombre,
            imagen: producto.imagen,
            precio: producto.precio,
            contador: 1,
          });
        } else {
          productoAgregado.contador++;
        }

        // Convertir el carrito JSON en un string para guardarlo en el localStorage
        const listaCarritoJSON = JSON.stringify(listaCarrito);
        localStorage.setItem("productos", listaCarritoJSON);

        actualizarCarrito();
      });

      const comprarBotonContenedor = document.createElement("div");
      comprarBotonContenedor.appendChild(comprarBoton);

      contenedorPrecioCategoria.appendChild(precioProducto);

      cardBody.appendChild(nombreProducto);
      cardBody.appendChild(contenedorPrecioCategoria);
      contenedorProducto.appendChild(cardBody);
      contenedorProducto.appendChild(comprarBotonContenedor);

      return contenedorProducto;
    }

    // Mostrar los productos en el contenedor
    function mostrarProductos(productos) {
      if (document.getElementById("contenedorProductos")) {
        contenedorProductos.innerHTML = "";

        productos.forEach((producto) => {
          const tarjetaProducto = crearCardProducto(producto);
          contenedorProductos.appendChild(tarjetaProducto);
        });
      }
    }

    // Función de filtrado
    function filtrarProductos(categoriaSeleccionada) {
      if (categoriaSeleccionada === "") {
        return productos;
      } else {
        return productos.filter(
          (producto) => producto.categoria === categoriaSeleccionada
        );
      }
    }

    // Si se entró a shop.html desde un enlace de categoría:
    if (parametrosURL.has("categoria")) {
      const categoriaURL = parametrosURL.get("categoria");
      selectorCategoria.value = categoriaURL;

      const productosFiltrados = filtrarProductos(selectorCategoria.value);
      mostrarProductos(productosFiltrados);
    } else {
      mostrarProductos(productos);
    }

    // Si se realiza un cambio en el select de la categoría:
    if (document.getElementById("selectorCategoria")) {
      selectorCategoria.addEventListener("change", () => {
        const categoriaSeleccionada = selectorCategoria.value;
        const productosFiltrados = filtrarProductos(categoriaSeleccionada);
        mostrarProductos(productosFiltrados);

        // Contenido de la oferta
        const ofertaContainer = document.getElementById("ofertaContainer");
        ofertaContainer.style.display = "block";

        const oferta = document.createElement("p");
        oferta.className = "text-center text-light m-0 py-1";

        if (ofertaContainer) {
          // Cambiar el contenido de la oferta según la categoría seleccionada
          if (categoriaSeleccionada == "Musculosas") {
            oferta.innerHTML =
              "¡Recordá que llevando 5 prendas tenés un 20% de descuento en todas las musculosas!";
          } else if (categoriaSeleccionada == "Chombas") {
            oferta.innerHTML =
              "¡A partir de agosto, todas las chombas tienen un 30% de descuento en envíos!";
          } else if (categoriaSeleccionada == "Pijamas") {
            oferta.innerHTML =
              "¡Llevando 2 conjuntos o más, tenés envío gratis en todos los pijamas!";
          }

          if (categoriaSeleccionada != "") {
            ofertaContainer.appendChild(oferta);
          }
        }

        // Eliminar la oferta pasados los 10 segundos
        setTimeout(() => {
          oferta.remove();
        }, 10000);
      });
    }
  })
  .catch((error) => console.log(error));

// Función para mostrar el carrito
function mostrarCarrito() {
  const carrito = document.getElementById("carrito");
  if (carrito.style.display === "none") {
    carrito.style.display = "flex";
  } else {
    carrito.style.display = "none";
  }
}

// Evento por si el carrito se está mostrando y el usuario achica el viewport
window.addEventListener("resize", () => {
  if (window.innerWidth < 992) {
    const carrito = document.getElementById("carrito");
    carrito.style.display = "none";
  }
});

document.getElementById("verCarrito").addEventListener("click", () => {
  // Validación para mostrar el carrito o usar un link de redirección
  if (window.innerWidth >= 992) {
    mostrarCarrito();
  } else {
    // Validación para la redirección del link carrito
    if (location.pathname.endsWith("index.html")) {
      window.location.href = "cart.html";
    } else {
      window.location.href = "cart.html";
    }
  }
});

// ---------------------------------------------------------

const btnFinalizarCompra = document.getElementById("btnFinalizarCompra");

// IndexedDB

let db;
let request = window.indexedDB.open("TresAses", 1);

request.onupgradeneeded = function (event) {
  db = event.target.result;
  const productosStore = db.createObjectStore("productos", {
    keyPath: "id",
    autoIncrement: true,
  });
};

request.onerror = function () {
  console.log("Error al conectar con la base de datos");
};

request.onsuccess = function () {
  db = request.result;
  leerProductos();
  if (document.getElementById("btnFinalizarCompra")) {
    btnFinalizarCompra.addEventListener("click", () => {
      const transaction = db.transaction(["productos"], "readwrite");
      const productosStore = transaction.objectStore("productos");

      listaCarrito.forEach((producto) => {
        const productoExistente = productosStore.get(producto.id);

        productoExistente.onsuccess = function () {
          const productoAlmacenado = productoExistente.result;

          if (productoAlmacenado) {
            producto.contador += productoAlmacenado.contador;
          }

          productosStore.put(producto);
        };
      });

      transaction.oncomplete = function () {
        console.log("Productos agregados a la base de datos");
      };

      transaction.onerror = function (event) {
        console.log(
          "Error al agregar los productos a la base de datos: ",
          event.target.error
        );
      };

      listaCarrito = [];
      actualizarCarrito();
      localStorage.clear();
      window.location.href = "history.html";
    });
  }
};

const historialComprasContenedor = document.getElementById(
  "historialComprasContenedor"
);

function leerProductos() {
  let transaction = db.transaction(["productos"], "readonly");
  let objectStore = transaction.objectStore("productos");
  let request = objectStore.getAll();
  request.onsuccess = function () {
    if (request.result.length != 0) {
      const tablaHistorial = document.createElement("table");
      tablaHistorial.className = "m-auto";
      const thead = document.createElement("thead");
      const theadRow = document.createElement("tr");
      theadRow.innerHTML = `
                <th class="text-center" scope="col" width="15%">Foto</th>
                <th class="text-center" scope="col" width="20%">Nombre</th>
                <th class="text-center" scope="col" width="20%">Precio</th>
                <th class="text-center" scope="col" width="20%">Cantidad</th>
                <th class="text-center" scope="col" width="20%">Total</th>
                <th class="text-center" scope="col" width="5%"></th>
            `;
      thead.appendChild(theadRow);
      tablaHistorial.appendChild(thead);

      const tbody = document.createElement("tbody");

      if (request.result.length > 0) {
        request.result.map((producto) => {
          const tbodyRow = document.createElement("tr");

          const itemImgCol = document.createElement("td");
          itemImgCol.className = "d-flex justify-content-center";

          const itemImg = document.createElement("img");
          itemImg.src = `${producto.imagen}`;
          itemImg.alt = producto.nombre;
          itemImg.height = 96;

          itemImgCol.appendChild(itemImg);

          const itemNombre = document.createElement("td");
          itemNombre.textContent = producto.nombre;
          itemNombre.className = "text-center";

          const itemPrecio = document.createElement("td");
          itemPrecio.textContent = `$${producto.precio}`;
          itemPrecio.className = "text-center";

          const itemCantidad = document.createElement("td");
          itemCantidad.textContent = producto.contador;
          itemCantidad.className = "text-center";

          const itemPrecioTotal = document.createElement("td");
          itemPrecioTotal.textContent = `$${
            producto.precio * producto.contador
          }`;
          itemPrecioTotal.className = "text-center";

          tbodyRow.appendChild(itemImgCol);
          tbodyRow.appendChild(itemNombre);
          tbodyRow.appendChild(itemPrecio);
          tbodyRow.appendChild(itemCantidad);
          tbodyRow.appendChild(itemPrecioTotal);

          tbody.appendChild(tbodyRow);

          tablaHistorial.appendChild(tbody);

          transaction.oncomplete = function () {
            console.log("Transacción completada");
          };

          transaction.onerror = function (event) {
            console.log("Error en la transacción: ", event.target.error);
          };
        });
      }
      if (historialComprasContenedor) {
        historialComprasContenedor.appendChild(tablaHistorial);
        historialComprasContenedor.className =
          "justify-content-center col-10 m-auto";
        const contenedorBtnEliminar = document.createElement("div");
        contenedorBtnEliminar.className =
          "d-flex justify-content-end m-auto col-10";

        const btnEliminarHistorial = document.createElement("button");
        btnEliminarHistorial.className =
          "border-0 rounded bg-danger text-light py-1 my-3";
        btnEliminarHistorial.textContent = `Click acá para eliminar el historial de compras o presioná "R"`;

        btnEliminarHistorial.addEventListener("click", () => {
          eliminarProductos();
        });
        contenedorBtnEliminar.appendChild(btnEliminarHistorial);

        historialComprasContenedor.appendChild(contenedorBtnEliminar);
      }
      document.addEventListener("keydown", function (event) {
        if (event.key === "r") {
          eliminarProductos();
        }
      });
    } else {
      if (historialComprasContenedor) {
        const contenedroHistorialVacio = document.createElement("div");
        contenedroHistorialVacio.className =
          "d-flex flex-column justify-content-center text-center gap-5";

        const h4 = document.createElement("h4");
        h4.textContent = "No hay productos en el historial de compras";

        const btnVolver = document.createElement("a");
        btnVolver.textContent = "Volver a la tienda";
        btnVolver.className = "bg-dark text-light text-decoration-none col-6 m-auto";
        btnVolver.href = "shop.html";

        contenedroHistorialVacio.appendChild(h4);
        contenedroHistorialVacio.appendChild(btnVolver);

        historialComprasContenedor.appendChild(contenedroHistorialVacio);
      }
    }
  };
}

function eliminarProductos() {
  let transaction = db.transaction(["productos"], "readwrite");
  let objectStore = transaction.objectStore("productos");
  objectStore.clear();
  location.reload();
}

// Serviceworker

if ("serviceWorker" in navigator) {
  try {
    var swRegistration = navigator.serviceWorker.register("serviceWorker.js");
    console.log("service worker registered");
  } catch (error) {
    console.log("service worker reg failed");
  }
}
else {
  console.log("sw not supperted");
}