class Producto {
  constructor(id, nombre, precio, img) {
    this.id = id;
    this.nombre = nombre;
    this.precio = precio;
    this.img = img;
    this.cantidad = 1;
  }
}

const kenpaiPandas = new Producto(1, "Kanpai Pandas", 7, "img/kenpaiPandas.jpg");
const cryptoPunks = new Producto(2, "Crypto Punks", 15, "img/cryptoPunks.jpg");
const boredApe = new Producto(3, "Bored Ape Yacht", 8,"img/boredApe.jpg");
const invisibleFriends = new Producto(4, "Invisible Friends", 12, "img/invisibleFriends.jpg");
const unicorn = new Producto(5, "Unicorn", 5, "img/unicorn.jpg");
const rainbowCat = new Producto(6, "Rainbow Cat", 3, "img/rainbowCat.jpg");
const cuteCloud = new Producto(7, "Cute Cloud", 2, "img/cuteCloud.jpg");
const davidStatue = new Producto(8, "David Statue", 18, "img/davidStatue.jpg");

// Array con todo el catálogo de productos:

const productos = [kenpaiPandas, cryptoPunks, boredApe, invisibleFriends, unicorn, rainbowCat, cuteCloud, davidStatue];

// Array carrito:

let carrito = [];

// Cargar carrito desde localStorage

if(localStorage.getItem("carrito")) {
  carrito = JSON.parse(localStorage.getItem("carrito"));
}

// Modificamos el DOM mostrando los productos:

const contenedorProductos = document.getElementById("contenedorProductos");

// Función para mostrar los productos:

const mostrarProductos = () => {
  productos.forEach(producto => {
    const card = document.createElement("div");
    card.classList.add("col-xl-3", "col-md-6", "col-xs-12");
    card.innerHTML = `
              <div class="card">
                <img src="${producto.img}" class="card-img-top imgProductos" alt="${producto.nombre}">
                <div class="card-body">
                  <h5>${producto.nombre}</h5>
                  <p>${producto.precio}<span> ETH</span></p>
                  <button class="btn colorBoton" id="boton${producto.id}">Agregar al carrito</button>
                </div>
              </div>`
    contenedorProductos.appendChild(card);

    // Agregar productos al carrito:

    const boton = document.getElementById(`boton${producto.id}`);
    boton.addEventListener("click", () => {
      agregarAlCarrito(producto.id);
      // notficación de producto agregado:
      Toastify({
        text: "Producto agregado al carrito",
        duration: 3000,
        gravity: "bottom",
        composition: "right",
        style: {
          background: "linear-gradient(to right, #570080, #574680)",
        }
      }).showToast();
    })

  })
}

mostrarProductos();

const agregarAlCarrito = (id) => {
  const productoEnCarrito = carrito.find(producto => producto.id === id);
  if (productoEnCarrito) {
    productoEnCarrito.cantidad++;
    mostrarCarrito();
  } else {
    const producto = productos.find(producto => producto.id === id);
    carrito.push(producto);
    mostrarCarrito();
  }
      // actualizar localStorage:
      localStorage.setItem("carrito", JSON.stringify(carrito));
}

// Mostrar el carrito de compras:

const contenedorCarrito = document.getElementById("contenedorCarrito");
const verCarrito = document.getElementById("verCarrito");

verCarrito.addEventListener("click", () => {
  mostrarCarrito();
})

const mostrarCarrito = () => {
  contenedorCarrito.innerHTML = "";

  carrito.forEach(producto => {
    const card = document.createElement("div");
    card.classList.add("col-xl-3", "col-md-6", "col-xs-12");
    card.innerHTML = `
              <div class="card">
                <img src="${producto.img}" class="card-img-top imgProductos" alt="${producto.nombre}">
                <div class="card-body">
                  <h5>${producto.nombre}</h5>
                  <p>${producto.nombre}</p>
                  <p>${producto.cantidad}</p>
                  <button class="btn colorBoton" id="eliminar${producto.id}">Eliminar Producto</button>
                </div>
              </div>`   
    contenedorCarrito.appendChild(card);

    // Eliminar productos del carrito:

    const boton = document.getElementById(`eliminar${producto.id}`);
    boton.addEventListener("click", () => {
      eliminarDelCarrito(producto.id);
    })
    
  })
  calculoTotal();
}

// Función que elimina producto del carrito:

const eliminarDelCarrito = (id) => {
  const producto = carrito.find(producto => producto.id === id);
  const indice = carrito.indexOf(producto);
  carrito.splice(indice, 1);
  mostrarCarrito();
  // actualizar localStorage
  localStorage.setItem("carrito", JSON.stringify(carrito));
}


// Vaciar el carrito

const vaciarCarrito = document.getElementById("vaciarCarrito");

vaciarCarrito.addEventListener("click", () => {
  eliminarCarritoCompleto();
})

// Función q elimina todo el carrito

const eliminarCarritoCompleto = () => {
  carrito = [];
  mostrarCarrito();
  // actualizamos localStorage:
  localStorage.clear();
}


// Total de la compra:

const total = document.getElementById("total");

const calculoTotal = () => {
  let totalCompra = 0;
  carrito.forEach(producto => {
    totalCompra += producto.precio * producto.cantidad;
  })
  total.innerHTML = `Total: $${totalCompra}`;
}