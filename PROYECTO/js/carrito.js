(function () {
    // INIT
    let carritoInicializado = false;

    // GLOBAL
    window.initSharedCarrito = function () {
        if (carritoInicializado) return;
        carritoInicializado = true;

        // STORAGE
        const STORAGE_KEY = 'gamelive-carrito';
        let carrito = [];

        // DOM
        const modal = document.getElementById('modalCarrito');
        const modalBoleta = document.getElementById('modalBoleta');
        const btnCarrito = document.getElementById('btnCarrito');
        const cerrarModal = document.getElementById('cerrarModal');
        const cerrarBoleta = document.getElementById('cerrarBoleta');
        const listaCarrito = document.getElementById('listaCarrito');
        const totalCarrito = document.getElementById('totalCarrito');
        const pagarBtn = document.querySelector('.pagar');
        const estadoCompra = document.getElementById('estadoCompra');
        const detalleBoleta = document.getElementById('detalleBoleta');
        const totalBoleta = document.getElementById('totalBoleta');
        const fechaBoleta = document.getElementById('fechaBoleta');
        const clienteBoleta = document.getElementById('clienteBoleta');
        const correoBoleta = document.getElementById('correoBoleta');
        const documentoBoleta = document.getElementById('documentoBoleta');

        // CHECK
        if (!modal || !btnCarrito || !listaCarrito || !totalCarrito || !estadoCompra || !pagarBtn) {
            return;
        }

        // LOAD
        function cargarCarrito() {
            try {
                const datosGuardados = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');

                // Formato nuevo: un array de objetos con nombre y precio.
                if (Array.isArray(datosGuardados)) {
                    carrito = datosGuardados.map(item => ({
                        nombre: item.nombre || item.titulo || 'Juego',
                        precio: Number(item.precio || 0)
                    }));
                    return;
                }

                // Formato anterior: un objeto con arrays de nombres y precios.
                if (datosGuardados && Array.isArray(datosGuardados.nombres)) {
                    carrito = datosGuardados.nombres.map((nombre, index) => ({
                        nombre,
                        precio: Number(datosGuardados.precios?.[index] || 0)
                    }));
                }
            } catch (error) {
                // Si el storage está corrupto o vacío, se inicia con un carrito vacío.
                carrito = [];
            }
        }

        // Guarda el estado actual del carrito en localStorage.
        function guardarCarrito() {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(carrito));
        }

        // Convierte textos como "S/ 99.00" o "Próximamente" en un número real.
        function parsePrecio(texto) {
            if (!texto) return 0;
            const limpio = String(texto).toLowerCase()
                .replace('s/', '')
                .replace('gratuito', '0')
                .replace('próximamente', '0')
                .trim();
            return parseFloat(limpio) || 0;
        }

        // Muestra mensajes debajo del modal para informar al usuario.
        function mostrarEstado(texto, tipo = 'info') {
            estadoCompra.textContent = texto;
            estadoCompra.className = `estado-compra ${tipo}`.trim();
        }

        // Abre el modal del carrito y cambia el mensaje según si hay productos.
        function abrirModal() {
            modal.style.display = 'block';
            if (carrito.length > 0) {
                mostrarEstado(`Tienes ${carrito.length} artículo(s) listo(s) para pagar.`, 'info');
            } else {
                mostrarEstado('Tu carrito está listo para pagar.', 'info');
            }
        }

        // Cierra el modal del carrito.
        function cerrarModalCarrito() {
            modal.style.display = 'none';
        }

        function resolverRutaImagen(relativa) {
            return location.pathname.includes('/paginas/')
                ? `../../${relativa}`
                : relativa;
        }

        // Genera el contenido de la boleta después de una compra simulada.
        function mostrarBoleta() {
            if (!detalleBoleta || !totalBoleta || !fechaBoleta) return;

            const sesionCorreo = localStorage.getItem('gamelive-sesion');
            const cuentasRaw = localStorage.getItem('gamelive-usuarios') || localStorage.getItem('gamelive-cuentas') || '[]';
            const cuentas = JSON.parse(cuentasRaw);
            const cuenta = Array.isArray(cuentas)
                ? cuentas.find((item) => item.correo === sesionCorreo) || null
                : null;

            detalleBoleta.innerHTML = '';
            let total = 0;

            carrito.forEach((item, index) => {
                total += item.precio;
                const itemElement = document.createElement('div');
                itemElement.className = 'item-boleta';
                const imagen = ['imagen/catalogo/HADES.jpg', 'imagen/catalogo/HORINZON.jpg', 'imagen/catalogo/forniteee.jpg'][index % 3];
                const imagenFinal = resolverRutaImagen(imagen);
                itemElement.innerHTML = `
                    <img src="${imagenFinal}" alt="${item.nombre}">
                    <div class="item-info">
                        <strong>${item.nombre}</strong>
                        <span>Juego digital</span>
                    </div>
                    <span>S/ ${item.precio.toFixed(2)}</span>
                `;
                detalleBoleta.appendChild(itemElement);
            });

            if (clienteBoleta) {
                clienteBoleta.textContent = cuenta?.nombre || 'Usuario invitado';
            }
            if (correoBoleta) {
                correoBoleta.textContent = cuenta?.correo || 'Sin correo registrado';
            }
            if (documentoBoleta) {
                documentoBoleta.textContent = cuenta?.id || 'Sin documento';
            }

            totalBoleta.textContent = total.toFixed(2);
            fechaBoleta.textContent = new Date().toLocaleString();
            modalBoleta.style.display = 'block';
        }

        // Actualiza la lista visible del carrito, el total y el contador del botón.
        function actualizarCarrito() {
            listaCarrito.innerHTML = '';
            guardarCarrito();

            if (carrito.length === 0) {
                listaCarrito.innerHTML = '<p>Tu carrito está vacío.</p>';
                totalCarrito.textContent = '0.00';
                btnCarrito.innerHTML = '🛒 Carrito';
                return;
            }

            let total = 0;

            carrito.forEach((item, index) => {
                total += item.precio;
                const div = document.createElement('div');
                div.className = 'carrito-item';
                div.innerHTML = `
                    <span>${item.nombre}</span>
                    <span>S/ ${item.precio.toFixed(2)}</span>
                    <button type="button" class="btn-eliminar" data-index="${index}">X</button>
                `;
                listaCarrito.appendChild(div);
            });

            totalCarrito.textContent = total.toFixed(2);
            btnCarrito.innerHTML = `🛒 Carrito (${carrito.length})`;
        }

        // Elimina un juego de la lista del carrito.
        function eliminarItem(index) {
            carrito.splice(index, 1);
            actualizarCarrito();
            mostrarEstado('Se quitó un juego del carrito.', 'info');
        }

        // Verifica si hay una sesión activa antes de agregar productos.
        function haySesionActiva() {
            return Boolean(localStorage.getItem('gamelive-sesion'));
        }

        // Añade un producto al carrito y lo muestra inmediatamente.
        function agregarAlCarrito(nombre, precio) {
            if (!haySesionActiva()) {
                mostrarEstado('Debes iniciar sesión para agregar juegos al carrito.', 'error');
                return;
            }

            carrito.push({ nombre, precio });
            actualizarCarrito();
            mostrarEstado(`${nombre} agregado al carrito.`, 'success');
            abrirModal();
        }

        // Eventos del botón principal y de cierre del modal.
        btnCarrito.addEventListener('click', abrirModal);
        cerrarModal.addEventListener('click', cerrarModalCarrito);
        cerrarBoleta?.addEventListener('click', () => {
            modalBoleta.style.display = 'none';
        });

        // Cierra el modal si el usuario hace clic fuera de él.
        window.addEventListener('click', (event) => {
            if (event.target === modal) cerrarModalCarrito();
            if (event.target === modalBoleta) modalBoleta.style.display = 'none';
        });

        // Delegación de eventos: detecta clics en botones de agregar o eliminar.
        document.addEventListener('click', (event) => {
            const eliminarButton = event.target.closest('.btn-eliminar');
            if (eliminarButton) {
                eliminarItem(parseInt(eliminarButton.dataset.index, 10));
                return;
            }

            const button = event.target.closest('.buy-cart');
            if (!button) return;

            const card = button.closest('.card');
            const nombre = card?.dataset.nombre || card?.querySelector('h3, h2')?.textContent?.trim() || 'Juego';
            const precioText = card?.querySelector('p')?.textContent || '0';
            const precioValor = parsePrecio(card?.dataset.precio || precioText);

            agregarAlCarrito(nombre, precioValor);
        });

        // Flujo simulado de pago: valida, procesa y muestra la boleta.
        pagarBtn.addEventListener('click', () => {
            if (carrito.length === 0) {
                mostrarEstado('Tu carrito está vacío.', 'error');
                return;
            }

            pagarBtn.disabled = true;
            pagarBtn.textContent = 'Procesando...';
            mostrarEstado('Procesando tu compra...', 'info');

            setTimeout(() => {
                const total = carrito.reduce((acc, item) => acc + item.precio, 0);
                mostrarEstado(`¡Compra simulada realizada con éxito! Total: S/ ${total.toFixed(2)}.`, 'success');
                mostrarBoleta();
                carrito = [];
                actualizarCarrito();
                pagarBtn.disabled = false;
                pagarBtn.textContent = 'Pagar (simulado)';
            }, 1000);
        });

        // Se cargan los datos guardados y se renderiza el carrito al entrar.
        cargarCarrito();
        actualizarCarrito();
    };

    // Inicia el carrito cuando termina de cargarse el DOM.
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', window.initSharedCarrito);
    } else {
        window.initSharedCarrito();
    }
})();

const btnDescargar = document.getElementById('descargarBoleta');

if (btnDescargar) {
    btnDescargar.addEventListener('click', () => {
        const { jsPDF } = window.jspdf;
        const elementoParaCapturar = document.getElementById('modalBoleta');

        // Configuración para que el PDF se vea bien
        html2canvas(elementoParaCapturar, {
            scale: 2, 
            backgroundColor: '#151515', // Asegura que combine con tu tema oscuro
            logging: false
        }).then(canvas => {
            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF('p', 'mm', 'a4');
            
            const imgProps = pdf.getImageProperties(imgData);
            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

            pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
            pdf.save('Boleta_GameLiveCenter.pdf');
        });
    });
}
