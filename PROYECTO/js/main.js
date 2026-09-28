/* MAIN */

/* NOMBRES */
const nombresProductos = [
    "EA SPORTS FC 25",
    "Call of Duty",
    "GTA V",
    "Horizon Forbidden West",
    "Cyberpunk 2077",
    "The Last of Us Part II",
    "Sekiro: Shadows Die Twice",
    "Death Stranding",
    "Hades",
    "Stardew Valley"
];

const preciosProductos = [
    199.90,
    249.90,
    89.90,
    179.00,
    99.00,
    159.00,
    89.00,
    129.00,
    39.00,
    24.00
];

const imagenesProductos = [
    "imagen/inicio/nuvana-games-xbox-series-x-ea-sports-fc-25-standard-edition-nuvanatech-1176216290.jpg",
    "imagen/inicio/Call_of_Duty_Infinite_Warfare_cover.jpg",
    "imagen/inicio/Grand_Theft_Auto_V.png",
    "imagen/catalogo/HORINZON.jpg",
    "imagen/catalogo/CYBERPUNK 2077.jpg",
    "imagen/catalogo/THE LAST OF US 2.jpg",
    "imagen/catalogo/Sekiro_art.jpg",
    "imagen/catalogo/DEATH STRANDING.jpg",
    "imagen/catalogo/HADES.jpg",
    "imagen/catalogo/STARDEW VALLEY.png"
];

const juegosOferta = [
    { titulo: "Call of Duty", imagen: "imagen/inicio/Call_of_Duty_Infinite_Warfare_cover.jpg", precio: "S/ 169.90", descuento: "-32%" },
    { titulo: "GTA V", imagen: "imagen/inicio/Grand_Theft_Auto_V.png", precio: "S/ 59.90", descuento: "-33%" },
    { titulo: "Minecraft", imagen: "imagen/inicio/apps.808.14492077886571533.be42f4bd-887b-4430-8ed0-622341b4d2b0.jpg", precio: "S/ 69.90", descuento: "-30%" }
];

const juegosGratis = [
    { titulo: "Fortnite", imagen: "imagen/catalogo/forniteee.jpg", precio: "S/ 0.00" },
    { titulo: "Genshin Impact", imagen: "imagen/catalogo/genshin impact.jpg", precio: "S/ 0.00" },
    { titulo: "Apex Legends", imagen: "imagen/catalogo/APEX.jpg", precio: "S/ 0.00" },
    { titulo: "Zenless Zone Zero", imagen: "imagen/catalogo/zenless lucia.jpg", precio: "S/ 0.00" }
];

const juegosPreferencias = [
    { titulo: "Hades", imagen: "imagen/catalogo/HADES.jpg", precio: "S/ 39.00" },
    { titulo: "Cyberpunk 2077", imagen: "imagen/catalogo/CYBERPUNK 2077.jpg", precio: "S/ 99.00" },
    { titulo: "Sekiro: Shadows Die Twice", imagen: "imagen/catalogo/Sekiro_art.jpg", precio: "S/ 89.00" },
    { titulo: "Doom Eternal", imagen: "imagen/catalogo/DOOM.jpg", precio: "S/ 79.00" },
    { titulo: "Ori and the Will of the Wisps", imagen: "imagen/catalogo/Ori-and-the-Will-of-the-Wisps.jpg", precio: "S/ 49.00" }
];

const juegosNovedades = [
    { titulo: "Zenless Zone Zero", imagen: "imagen/catalogo/zenless lucia.jpg", precio: "S/ 0.00" },
    { titulo: "Horizon Forbidden West", imagen: "imagen/catalogo/HORINZON.jpg", precio: "S/ 179.00" },
    { titulo: "Death Stranding", imagen: "imagen/catalogo/DEATH STRANDING.jpg", precio: "S/ 129.00" },
    { titulo: "Resident evil requiem", imagen: "imagen/catalogo/Byh5MPnoJInGirgG_zHK9pSfIFrl0RTDxQbsiXLBLLY.jpg", precio: "S/ 134.00" },
    { titulo: "Hollow Knight: Silksong", imagen: "imagen/catalogo/Silksong.jpg", precio: "S/ 42.99" }
];

const juegosProximos = [
    { titulo: "GTA VI", imagen: "imagen/catalogo/GTAVI.jpeg", precio: "Próximamente" }
];

function normalizarTexto(texto) {
    return (texto || "")
        .toLowerCase()
        .trim()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/\s+/g, " ");
}

function obtenerJuegosBuscables() {
    if (typeof window !== "undefined" && Array.isArray(window.juegosCatalogo)) {
        return window.juegosCatalogo;
    }

    if (typeof juegosCatalogo !== "undefined" && Array.isArray(juegosCatalogo)) {
        return juegosCatalogo;
    }

    return [];
}

function resolverRutaJuego(juego) {
    if (!juego || typeof juego !== "object") return "";

    if (typeof juego.link === "string" && juego.link) {
        if (/^(https?:)?\/\//i.test(juego.link) || juego.link.startsWith("/")) {
            return juego.link;
        }

        const rutaSinPrefijos = juego.link.replace(/^(\.\.\/)+/, "");
        return `paginas/${rutaSinPrefijos}`;
    }

    return "";
}

function buscarJuego() {
    const input = document.getElementById("buscarJuego");
    if (!input) return;

    const textoBusqueda = input.value.trim();
    if (!textoBusqueda) {
        alert("Escribe el nombre de un juego para buscarlo.");
        return;
    }

    const juegos = obtenerJuegosBuscables();
    const query = normalizarTexto(textoBusqueda);

    const coincidencia = juegos.find((juego) => {
        const titulo = normalizarTexto(juego.titulo);
        const generos = (juego.generos || []).map(genero => normalizarTexto(genero));
        const plataforma = normalizarTexto(juego.plataforma);

        return titulo.includes(query)
            || generos.some(genero => genero.includes(query))
            || plataforma.includes(query);
    });

    if (!coincidencia) {
        alert("Juego no encontrado");
        return;
    }

    const ruta = resolverRutaJuego(coincidencia);
    if (ruta) {
        window.location.href = ruta;
    } else {
        window.location.href = "paginas/catalogo/index.html";
    }
}

window.buscarJuego = buscarJuego;

function renderCards(containerId, juegos) {
    const contenedor = document.getElementById(containerId);
    if (!contenedor) return;

    contenedor.innerHTML = "";

    juegos.forEach((juego) => {
        const precioMarkup = juego.descuento
            ? `${juego.precio} <span style="color:#e02121;font-weight:700;margin-left:8px;">${juego.descuento}</span>`
            : juego.precio;

        contenedor.innerHTML += `
            <div class="card" data-precio="${juego.precio || 0}">
                <img src="${juego.imagen}" alt="${juego.titulo}">
                <h3>${juego.titulo}</h3>
                <p>${precioMarkup}</p>
                <button type="button" class="buy-cart" aria-label="Agregar ${juego.titulo} al carrito">🛒</button>
            </div>
        `;
    });
}

/* DESTACADOS */
function renderDestacados() {
    const contenedor = document.getElementById("destacadosGrid");
    if (!contenedor) return; // este contenedor solo existe en index.html

    contenedor.innerHTML = "";

    nombresProductos.forEach((nombre, i) => {
        const precio = preciosProductos[i];
        const imagen = imagenesProductos[i];

        contenedor.innerHTML += `
            <div class="card" data-precio="${precio}">
                <img src="${imagen}" alt="${nombre}">
                <h3>${nombre}</h3>
                <p>S/ ${precio.toFixed(2)}</p>
                <button type="button" class="buy-cart" aria-label="Agregar ${nombre} al carrito">🛒</button>
            </div>
        `;
    });
}

function renderHomeSections() {
    renderCards("ofertasGrid", juegosOferta);
    renderCards("gratisGrid", juegosGratis);
    renderCards("preferenciasGrid", juegosPreferencias);
    renderCards("novedadesGrid", juegosNovedades);
    renderCards("proximosGrid", juegosProximos);
}

/* CUENTAS */
const CUENTAS_KEY = "gamelive-cuentas";
const CUENTAS_USUARIO_KEY = "gamelive-usuarios";

// Usuarios base del sistema: se guardan en la clave compartida para que
// también puedan ser consultados desde la carpeta de usuarios.
const usuariosPorDefecto = [
    {
        nombre: "Admi 1",
        correo: "administradorsideral@gmail.com",
        contrasena: "123456",
        id: "GLC-ADMI1",
        avatar: null,
        tarjetas: [{ tipo: "Visa", numero: "**** 4242", titular: "Admi 1" }]
    },
    {
        nombre: "Admi 2",
        correo: "cosmic@gmail.com",
        contrasena: "weastral",
        id: "GLC-ADMI2",
        avatar: null,
        tarjetas: [{ tipo: "Mastercard", numero: "**** 8181", titular: "Admi 2" }]
    }
];

function obtenerCuentas() {
    const datosGuardados = localStorage.getItem(CUENTAS_USUARIO_KEY) || "[]";
    let cuentas = [];

    try {
        cuentas = JSON.parse(datosGuardados);
    } catch (error) {
        cuentas = [];
    }

    if (!Array.isArray(cuentas)) {
        cuentas = [];
    }

    let huboCambios = false;

    // Verificion si los administradores ya existen por correoS
    usuariosPorDefecto.forEach(admin => {
        const existe = cuentas.some(c => c.correo === admin.correo);
        if (!existe) {
            cuentas.push(admin);
            huboCambios = true;
        }
    });

    // Guardamos de vuelta si tuvimos que registrar algún administrador faltante
    if (huboCambios || !localStorage.getItem(CUENTAS_USUARIO_KEY)) {
        guardarCuentas(cuentas);
    }

    return cuentas;
}

function guardarCuentas(cuentas) {
    // Se guarda la lista de usuarios en la fuente principal.
    // La clave legacy solo se usa para migración, no para duplicar datos.
    localStorage.setItem(CUENTAS_USUARIO_KEY, JSON.stringify(cuentas));
}

function mostrarMensaje(idElemento, texto, tipo) {
    const el = document.getElementById(idElemento);
    if (!el) return;
    el.textContent = texto;
    el.className = "mensaje-auth " + tipo;
}

/* ---------- 3) FORMULARIO: Crear cuenta ---------- */
function registrarCuenta(event) {
    event.preventDefault();

    const nombre = document.getElementById("reg-name").value.trim();
    const correo = document.getElementById("reg-email").value.trim().toLowerCase();
    const contrasena = document.getElementById("reg-password").value;

    if (!nombre || !correo || !contrasena) {
        mostrarMensaje("reg-mensaje", "Completa todos los campos.", "error");
        return;
    }

    if (contrasena.length < 6) {
        mostrarMensaje("reg-mensaje", "La contraseña debe tener al menos 6 caracteres.", "error");
        return;
    }

    const cuentas = obtenerCuentas();
    const yaExiste = cuentas.some(c => c.correo === correo);

    if (yaExiste) {
        mostrarMensaje("reg-mensaje", "Ya existe una cuenta registrada con ese correo.", "error");
        return;
    }

    cuentas.push({
        nombre: nombre,
        correo: correo,
        contrasena: contrasena,
        id: generarIdCuenta(),
        avatar: null,
        tarjetas: []
    });
    guardarCuentas(cuentas);

    mostrarMensaje("reg-mensaje", "¡Cuenta creada correctamente, " + nombre + "! Ya puedes iniciar sesión.", "exito");
    event.target.reset();
}

/* ---------- 4) FORMULARIO: Iniciar sesión ---------- */
// Lógica de inicio de sesión:
// valida correo y contraseña, crea la sesión y redirige al usuario a la home.
function iniciarSesion(event) {
    event.preventDefault();

    const correo = document.getElementById("login-email").value.trim().toLowerCase();
    const contrasena = document.getElementById("login-password").value;

    const cuentas = obtenerCuentas();
    const cuenta = cuentas.find(c => c.correo === correo && c.contrasena === contrasena);

    if (!cuenta) {
        mostrarMensaje("login-mensaje", "Correo o contraseña incorrectos.", "error");
        return;
    }

    // Se guarda la sesión activa del usuario para saber quién está logueado.
    // El correo sirve como identificador principal para buscar al usuario en storage.
    localStorage.setItem("gamelive-sesion", cuenta.correo);
    mostrarMensaje("login-mensaje", "¡Bienvenido de nuevo, " + cuenta.nombre + "!", "exito");
    initPerfilWidget();





  setTimeout(() => {
        window.location.href = "../../index.html"; 
    }, 1500);
}


/* ---------- 5) PERFIL DE CLIENTE ----------
   Icono en el navbar:
   - Sin sesión: ícono genérico (silueta), lleva al login al hacer clic.
   - Con sesión: muestra el avatar del usuario. Al pasar el mouse aparece
     una tarjeta flotante con nombre y correo (parcialmente enmascarado).
     Al hacer clic se abre un modal para cambiar la foto y ver los datos.
------------------------------------------------------------- */
function generarIdCuenta() {
    return "GLC-" + Math.random().toString(16).slice(2, 10).toUpperCase();
}

function avatarPorDefecto() {
    const svg = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">' +
        '<circle cx="50" cy="50" r="50" fill="#1a1a1a"/>' +
        '<circle cx="50" cy="38" r="18" fill="#8a8a8a"/>' +
        '<path d="M20 90c0-22 13-34 30-34s30 12 30 34" fill="#8a8a8a"/>' +
        '</svg>';
    return "data:image/svg+xml;utf8," + encodeURIComponent(svg);
}

/* Enmascara los últimos 5 caracteres de la parte local del correo
   (antes del @), por privacidad al mostrarlo en pantalla. */
function enmascararCorreo(correo) {
    const partes = correo.split("@");
    if (partes.length < 2) return correo;
    const local = partes[0];
    const dominio = partes[1];

    if (local.length <= 5) {
        return "•".repeat(local.length) + "@" + dominio;
    }
    const visible = local.slice(0, local.length - 5);
    return visible + "•••••" + "@" + dominio;
}

/* Enmascara los últimos 5 caracteres del ID de cuenta */
function enmascararId(id) {
    if (!id) return "";
    if (id.length <= 5) return "•".repeat(id.length);
    return id.slice(0, id.length - 5) + "•••••";
}

// Controla el widget de perfil del navbar.
// Si hay sesión activa, muestra datos del usuario; si no, dirige al login.
function initPerfilWidget() {
    let icono = document.getElementById("perfilIcono");
    if (!icono) return; // esta página no tiene el widget de perfil

    // Si ya se había inicializado antes ,
    // reemplazamos el botón por una copia limpia para no duplicar listeners.
    const iconoLimpio = icono.cloneNode(true);
    icono.parentNode.replaceChild(iconoLimpio, icono);
    icono = iconoLimpio;

    const avatarImg = icono.querySelector("#perfilAvatar");
    const defaultIcon = icono.querySelector("#perfilIconoDefault");
    const tooltip = document.getElementById("perfilTooltip");
    const tooltipNombre = document.getElementById("tooltipNombre");
    const tooltipCorreo = document.getElementById("tooltipCorreo");
    const overlay = document.getElementById("perfilModalOverlay");
    const modalCerrar = document.getElementById("perfilModalCerrar");
    const modalAvatar = document.getElementById("modalAvatar");
    const modalNombre = document.getElementById("modalNombre");
    const modalCorreo = document.getElementById("modalCorreo");
    const modalId = document.getElementById("modalId");
    const avatarInput = document.getElementById("perfilAvatarInput");
    const verMasBtn = document.getElementById("perfilVerMas");
    const logoutBtn = document.getElementById("perfilLogout");

    // Ruta al login según la profundidad de la página actual
    const prefijoLogin = location.pathname.includes("/paginas/")
        ? "../login/index.html"
        : "paginas/login/index.html";

    const sesionCorreo = localStorage.getItem("gamelive-sesion");
    const cuentas = obtenerCuentas();
    const cuenta = cuentas.find(c => c.correo === sesionCorreo);

    // ---- Sin sesión: ícono genérico, lleva al login ----
    if (!cuenta) {
        icono.addEventListener("click", () => {
            window.location.href = prefijoLogin;
        });
        return;
    }

    // ---- Con sesión activa ----
    if (!cuenta.id) cuenta.id = generarIdCuenta();
    if (!cuenta.avatar) cuenta.avatar = avatarPorDefecto();

    const listaActualizada = obtenerCuentas();
    const idx = listaActualizada.findIndex(c => c.correo === cuenta.correo);
    if (idx !== -1) {
        listaActualizada[idx] = cuenta;
        guardarCuentas(listaActualizada);
    }

    defaultIcon.style.display = "none";
    avatarImg.style.display = "block";
    avatarImg.src = cuenta.avatar;

    tooltipNombre.textContent = cuenta.nombre;
    tooltipCorreo.textContent = enmascararCorreo(cuenta.correo);

    icono.addEventListener("mouseenter", () => tooltip.classList.add("visible"));
    icono.addEventListener("mouseleave", () => tooltip.classList.remove("visible"));

    icono.addEventListener("click", () => {
        modalAvatar.src = cuenta.avatar;
        modalNombre.textContent = cuenta.nombre;
        modalCorreo.textContent = enmascararCorreo(cuenta.correo);
        modalId.textContent = enmascararId(cuenta.id);
        overlay.classList.add("visible");
    });

    modalCerrar.addEventListener("click", () => overlay.classList.remove("visible"));
    overlay.addEventListener("click", (e) => {
        if (e.target === overlay) overlay.classList.remove("visible");
    });

    avatarInput.addEventListener("change", (e) => {
        const archivo = e.target.files[0];
        if (!archivo) return;

        const lector = new FileReader();
        lector.onload = () => {
            cuenta.avatar = lector.result;
            const lista = obtenerCuentas();
            const i = lista.findIndex(c => c.correo === cuenta.correo);
            if (i !== -1) {
                lista[i] = cuenta;
                guardarCuentas(lista);
            }
            avatarImg.src = cuenta.avatar;
            modalAvatar.src = cuenta.avatar;
        };
        lector.readAsDataURL(archivo);
    });

    // Este botón abre la vista de usuarios desde el modal de perfil.
    verMasBtn.addEventListener("click", () => {
        const rutaUsuarios = location.pathname.includes("/paginas/")
            ? "../../ususario/ususarios.html"
            : "../ususario/ususarios.html";
        window.location.href = rutaUsuarios;
    });

    logoutBtn.addEventListener("click", () => {
        localStorage.removeItem("gamelive-sesion");
        window.location.reload();
    });
}


/* ---------- 6) Arranque ---------- */
document.addEventListener("DOMContentLoaded", () => {
    renderDestacados();
    renderHomeSections();
    initPerfilWidget();

    const inputBusqueda = document.getElementById("buscarJuego");
    if (inputBusqueda) {
        inputBusqueda.addEventListener("keydown", (event) => {
            if (event.key === "Enter") {
                event.preventDefault();
                buscarJuego();
            }
        });
    }

    const formLogin = document.getElementById("form-login");
    if (formLogin) formLogin.addEventListener("submit", iniciarSesion);

    const formRegistro = document.getElementById("form-registro");
    if (formRegistro) formRegistro.addEventListener("submit", registrarCuenta);
});