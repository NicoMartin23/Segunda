document.addEventListener('DOMContentLoaded', () => {
    const productos = document.getElementById('productos');
    const carrito = document.getElementById('lista-carrito');
    const total = document.getElementById('total');

    productos.addEventListener('click', agregarAlCarrito);

    function agregarAlCarrito(e) {
        if (e.target.classList.contains('agregar-carrito')) {
            const productoSeleccionado = e.target.parentElement;
            agregarProductoAlCarrito(productoSeleccionado);
        }
    }

    function agregarProductoAlCarrito(producto) {
        const productoNuevo = {
            id: producto.dataset.id,
            nombre: producto.dataset.nombre,
            precio: producto.dataset.precio
        };

        const itemCarrito = document.createElement('li');
        itemCarrito.classList.add('list-group-item');
        itemCarrito.innerHTML =
        productoNuevo.nombre + ' - $' + productoNuevo.precio +
        '<button class="btn btn-danger btn-sm float-right eliminar-item">Eliminar</button>';

        carrito.appendChild(itemCarrito);

        calcularTotal();
    }

    carrito.addEventListener('click', eliminarDelCarrito);

    function eliminarDelCarrito(e) {
        if (e.target.classList.contains('eliminar-item')) {
            const itemEliminar = e.target.parentElement;
            carrito.removeChild(itemEliminar);
            calcularTotal();
        }
    }

    function calcularTotal() {
        let totalCalculado = 0;

        const itemsCarrito = carrito.querySelectorAll('li');

        itemsCarrito.forEach(item => {
            const precio = parseFloat(item.textContent.split('$')[1]);
            totalCalculado += precio;
        });

        total.textContent = totalCalculado.toFixed(2);
    }
});