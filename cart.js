const contenedorTablaCarrito = document.getElementById(
  "contenedorTablaCarrito"
);

function mostrarTabla() {
  if (listaCarrito.length != 0) {
    const tablaProductos = document.createElement("table");
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
    tablaProductos.appendChild(thead);

    const tbody = document.createElement("tbody");

    let precioTotal = 0;

    listaCarrito.forEach((producto) => {
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
      itemPrecioTotal.textContent = `$${producto.precio * producto.contador}`;
      itemPrecioTotal.className = "text-center";

      precioTotal += producto.precio * producto.contador;

      const itemEliminar = document.createElement("td");
      const itemEliminarBtn = document.createElement("button");
      itemEliminarBtn.textContent = "X";
      itemEliminarBtn.className = "border-0 bg-danger text-light";

      // Eliminar el producto del carrito y actualizar el localStorage

      itemEliminarBtn.addEventListener("click", () => {
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
        }
        contenedorTablaCarrito.innerHTML = "";
        mostrarTabla();
      });

      itemEliminar.appendChild(itemEliminarBtn);

      tbodyRow.appendChild(itemImgCol);
      tbodyRow.appendChild(itemNombre);
      tbodyRow.appendChild(itemPrecio);
      tbodyRow.appendChild(itemCantidad);
      tbodyRow.appendChild(itemPrecioTotal);
      tbodyRow.appendChild(itemEliminar);

      tbody.appendChild(tbodyRow);

      tablaProductos.appendChild(tbody);
    });

    contenedorTablaCarrito.appendChild(tablaProductos);

    const precioTotalContainer = document.createElement("div");
    precioTotalContainer.className = "d-flex flex-column text-end me-5";

    const precioTotalContenido = document.createElement("b");
    precioTotalContenido.textContent = `Subtotal: $${precioTotal.toFixed(3)}`;
    precioTotalContenido.className = "fs-5";

    const iva = document.createElement("p");
    iva.textContent = "+IVA 21%";
    iva.className = "text-secondary mb-2";

    const finalizarCompra = document.createElement("a");
    finalizarCompra.href = "payment.html";
    finalizarCompra.textContent = "Finalizar Compra";
    finalizarCompra.className = "text-light p-1 text-decoration-none ms-auto hvr-shutter-out-horizontal";
    finalizarCompra.style.backgroundColor = "#0c0c0c9d";
    finalizarCompra.style.width = "fit-content";

    precioTotalContainer.appendChild(precioTotalContenido);
    precioTotalContainer.appendChild(iva);
    precioTotalContainer.appendChild(finalizarCompra);
    contenedorTablaCarrito.appendChild(precioTotalContainer);
  } else {
    if (contenedorTablaCarrito) {
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

        contenedorTablaCarrito.appendChild(contenedroHistorialVacio);
      }
  }
}

mostrarTabla();