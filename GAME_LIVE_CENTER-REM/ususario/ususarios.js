// Clave usada en localStorage para guardar todos los usuarios del sitio.
//  estructura centraliza home, el login
// y la vista de usuarios compartan la misma fuente .
// Almacenamiento principal de usuarios.
// - gamelive-usuarios: fuente activa para la vista de usuarios y autenticación.
// - gamelive-sesion: identifica cuál usuario está activo en la web.
// - tarjeta_<correo>: guarda la tarjeta registrada por cada usuario en forma individual.
const USUARIOS_STORAGE_KEY = 'gamelive-usuarios';
const ADMIN_EMAILS = ['administradorsideral@gmail.com', 'cosmic@gmail.com'];
const TARJETA_STORAGE_PREFIX = 'tarjeta_';

// Usuarios base que siempre deben existir en la lista del sistema y de metodo de reespaldo.
const USUARIOS_POR_DEFECTO = [
    {
        nombre: 'Admi 1',
        correo: 'administradorsideral@gmail.com',
        contrasena: '123456',
        id: 'GLC-ADMI1',
        avatar: null,
        tarjetas: [{ tipo: 'Visa', numero: '**** 4242', titular: 'Admi 1' }]
    },
    {
        nombre: 'Admi 2',
        correo: 'cosmic@gmail.com',
        contrasena: 'weastral',
        id: 'GLC-ADMI2',
        avatar: null,
        tarjetas: [{ tipo: 'Mastercard', numero: '**** 8181', titular: 'Admi 2' }]
    }
];

function normalizarUsuario(usuario) {
    if (!usuario || typeof usuario !== 'object') {
        return { nombre: 'Sin nombre', correo: '', contrasena: '', id: '', avatar: null, tarjetas: [] };
    }

    return {
        ...usuario,
        nombre: usuario.nombre || 'Sin nombre',
        correo: usuario.correo || '',
        contrasena: usuario.contrasena || usuario.contrasena || '',
        id: usuario.id || 'Sin ID',
        avatar: usuario.avatar || null,
        tarjetas: Array.isArray(usuario.tarjetas) ? usuario.tarjetas : []
    };
}

function normalizarUsuarios(usuarios) {
    if (!Array.isArray(usuarios)) return [];
    return usuarios.map(normalizarUsuario);
}

// Sincroniza la lista compartida para que los administradores base siempre estén presentes.
function sincronizarUsuariosCompartidos() {
    const usuariosActuales = leerUsuarios();
    const usuariosFinales = asegurarUsuariosPredeterminados(usuariosActuales);
    guardarUsuarios(usuariosFinales);
    return usuariosFinales;
}

// Asegura que los usuarios predeterminados siempre estén presentes.
// Esto evita que el sistema quede sin los administradores base aunque el usuario
// elimine o reemplace datos en localStorage.
function asegurarUsuariosPredeterminados(usuarios) {
    const copia = normalizarUsuarios(usuarios);

    USUARIOS_POR_DEFECTO.forEach((usuarioPorDefecto) => {
        const existe = copia.some((usuario) => usuario.correo === usuarioPorDefecto.correo);
        if (!existe) {
            copia.push(normalizarUsuario(usuarioPorDefecto));
        }
    });

    return copia;
}

// Lee los usuarios desde localStorage y los prepara para mostrarlos.
function leerUsuarios() {
    try {
        const datos = localStorage.getItem(USUARIOS_STORAGE_KEY);
        const usuarios = datos ? JSON.parse(datos) : [];
        const usuariosAsegurados = asegurarUsuariosPredeterminados(usuarios);
        let huboCambios = false;

        usuariosAsegurados.forEach((usuario, index) => {
            const usuarioSincronizado = sincronizarTarjetasDesdeStorage(usuario);
            if (JSON.stringify(usuarioSincronizado) !== JSON.stringify(usuariosAsegurados[index])) {
                usuariosAsegurados[index] = usuarioSincronizado;
                huboCambios = true;
            }
        });

        if (huboCambios || usuariosAsegurados.length !== (Array.isArray(usuarios) ? usuarios.length : 0)) {
            guardarUsuarios(usuariosAsegurados);
        }

        return usuariosAsegurados;
    } catch (error) {
        return asegurarUsuariosPredeterminados([]);
    }
}

// Guarda la lista de usuarios en la clave activa del sistema.
function guardarUsuarios(usuarios) {
    localStorage.setItem(USUARIOS_STORAGE_KEY, JSON.stringify(usuarios));
}

function sincronizarTarjetasDesdeStorage(usuario) {
    if (!usuario || typeof usuario !== 'object') {
        return normalizarUsuario(usuario);
    }

    const usuarioNormalizado = normalizarUsuario(usuario);
    const correo = usuarioNormalizado.correo;
    if (!correo) return usuarioNormalizado;

    const claveTarjeta = `${TARJETA_STORAGE_PREFIX}${correo}`;
    const datosTarjeta = localStorage.getItem(claveTarjeta);

    if (!datosTarjeta) return usuarioNormalizado;

    try {
        const tarjetaGuardada = JSON.parse(datosTarjeta);
        const nuevaTarjeta = {
            tipo: tarjetaGuardada.banco || tarjetaGuardada.tipo || 'Tarjeta',
            numero: tarjetaGuardada.numero || 'Sin número',
            titular: tarjetaGuardada.titular || usuarioNormalizado.nombre || 'Titular'
        };

        const tarjetasActuales = Array.isArray(usuarioNormalizado.tarjetas) ? usuarioNormalizado.tarjetas : [];
        const yaExiste = tarjetasActuales.some((tarjeta) => tarjeta.numero === nuevaTarjeta.numero);

        if (!yaExiste) {
            usuarioNormalizado.tarjetas = [...tarjetasActuales, nuevaTarjeta];
        }
    } catch (error) {
        console.warn('No se pudieron leer las tarjetas guardadas:', error);
    }

    return usuarioNormalizado;
}

function obtenerUsuarioActual() {
    const sesionCorreo = localStorage.getItem('gamelive-sesion');
    const usuarios = leerUsuarios();
    const usuario = usuarios.find((usuario) => usuario.correo === sesionCorreo) || null;

    if (!usuario) return null;

    const usuarioSincronizado = sincronizarTarjetasDesdeStorage(usuario);
    if (JSON.stringify(usuarioSincronizado) !== JSON.stringify(usuario)) {
        const indice = usuarios.findIndex((item) => item.correo === sesionCorreo);
        if (indice !== -1) {
            usuarios[indice] = usuarioSincronizado;
            guardarUsuarios(usuarios);
        }
    }

    return usuarioSincronizado;
}

function esAdministrador(usuario) {
    return Boolean(usuario && ADMIN_EMAILS.includes(usuario.correo));
}

function renderizarTarjetas(tarjetas) {
    if (!Array.isArray(tarjetas) || tarjetas.length === 0) {
        return '<span class="estado-vacio">Sin tarjetas registradas</span>';
    }

    return tarjetas.map((tarjeta) => `
        <div class="tarjeta-item">
            <strong>${tarjeta.tipo || 'Tarjeta'}</strong>
            <span>${tarjeta.numero || 'Sin número'}</span>
            <small>${tarjeta.titular || 'Sin titular'}</small>
        </div>
    `).join('');
}

// Vista completa para administradores: muestra todos los usuarios registrados
// en una tabla con sus datos principales y tarjetas asociadas.
function renderVistaAdmin(usuarios) {
    const contenedor = document.getElementById('appUsuarios');
    if (!contenedor) return;

    contenedor.innerHTML = `
        <section class="panel-usuarios">
            <div class="panel-header">
                <div>
                    <p class="eyebrow">Panel de administración</p>
                    <h1>Usuarios registrados</h1>
                </div>
                <a class="boton-volver" href="../GAME-LIVE-CENTER/index.html">Volver al inicio</a>
            </div>
            <div class="tabla-wrapper">
                <table>
                    <thead>
                        <tr>
                            <th>Nombre</th>
                            <th>Correo</th>
                            <th>Contraseña</th>
                            <th>ID</th>
                            <th>Tarjetas</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${usuarios.map((usuario) => `
                            <tr>
                                <td>${usuario.nombre}</td>
                                <td>${usuario.correo}</td>
                                <td>${usuario.contrasena}</td>
                                <td>${usuario.id}</td>
                                <td>${renderizarTarjetas(usuario.tarjetas)}</td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            </div>
        </section>
    `;
}

// Vista limitada para usuarios normales: solo muestra su propia información
// para no exponer datos de otros clientes.
function renderVistaUsuario(usuario) {
    const contenedor = document.getElementById('appUsuarios');
    if (!contenedor) return;

    contenedor.innerHTML = `
        <section class="panel-usuario">
            <div class="panel-header">
                <div>
                    <p class="eyebrow">Mi perfil</p>
                    <h1>${usuario.nombre}</h1>
                </div>
                <a class="boton-volver" href="../GAME-LIVE-CENTER/index.html">Volver al inicio</a>
            </div>
            <div class="perfil-card">
                <div class="perfil-dato">
                    <strong>Nombre</strong>
                    <span>${usuario.nombre}</span>
                </div>
                <div class="perfil-dato">
                    <strong>Correo</strong>
                    <span>${usuario.correo}</span>
                </div>
                <div class="perfil-dato">
                    <strong>Contraseña</strong>
                    <span>${usuario.contrasena}</span>
                </div>
                <div class="perfil-dato">
                    <strong>ID</strong>
                    <span>${usuario.id}</span>
                </div>
                <div class="perfil-dato">
                    <strong>Tarjetas</strong>
                    <div class="tarjetas-lista">${renderizarTarjetas(usuario.tarjetas)}</div>
                </div>
            </div>
        </section>
    `;
}

// Lógica de acceso de la vista de usuarios:
// 1) si no hay sesión, se redirige al login;
// 2) si el usuario es administrador, se muestra la lista completa;
// 3) si es un usuario regular, se muestra únicamente su perfil.
function cargarVistaUsuarios() {
    const usuarioActual = obtenerUsuarioActual();

    if (!usuarioActual) {
        window.location.href = '../GAME-LIVE-CENTER/paginas/login/index.html';
        return;
    }

    const usuarios = leerUsuarios();
    if (esAdministrador(usuarioActual)) {
        renderVistaAdmin(usuarios);
    } else {
        renderVistaUsuario(usuarioActual);
    }
}

window.addEventListener('DOMContentLoaded', () => {
    sincronizarUsuariosCompartidos();
    cargarVistaUsuarios();
});
