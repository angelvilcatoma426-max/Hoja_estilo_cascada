# Semana 5 · CSS Build Lab

## Autor
- Apellidos y nombres: Vilcatoma Napan Angel Jhoel
- Código: U23218298
- Sección: 31553

## Entorno reproducible
- Sistema operativo: Windows 11 Home / Insider Preview
- node --version: v24.20.0
- npm --version: 10.9.0
- npm run check:tools: sass 1.104.0 / lessc 4.9.1 (Less v4.9.1)

## Flujo de compilación
- Fuente Sass: src/scss/main.scss
- Salida Sass: dist/css/main-sass.css
- Fuente Less: src/less/main.less
- Salida Less: dist/css/main-less.css
- Comando completo: npm run build

## Verificación

| Prueba | Resultado | Evidencia u observación |
|---|---|---|
| Instalación local | Correcto | Se creó `node_modules` únicamente con `sass@1.104.0` y `less@4.9.1`. |
| Compilación Sass | Correcto | Generó `dist/css/main-sass.css` y `dist/css/main-sass.css.map`. |
| Compilación Less | Correcto | Generó `dist/css/main-less.css` y `dist/css/main-less.css.map`. |
| Carga de main-sass.css | Correcto | La interfaz mantiene el maquetado y estilos esperados al vincular `main-sass.css`. |
| Carga de main-less.css | Correcto | La interfaz es idéntica al alternar a `main-less.css`. |
| Source map Sass | Correcto | DevTools (Sources) muestra la regla original en `src/scss/main.scss`. |
| Source map Less | Correcto | DevTools (Sources) mapea la regla compilada hacia `src/less/main.less`. |
| Error provocado y corregido | Correcto | Al eliminar una `}` en `main.scss`, la terminal indicó la línea exacta del error. Se corrigió en la fuente `src` y no en `dist`. |

## Comparación razonada
- Coincidencias entre ambas salidas: Ambos compiladores expanden el nesting, evalúan variables pre-calculadas y duplican las reglas de los mixins (`.focus-ring` y `.surface-card`) en los selectores correspondientes.
- Diferencias de sintaxis observadas: Sass/SCSS utiliza `$` para variables y `@mixin` / `@include` para reutilización; Less usa `@` para variables y `.mixin()` con sintaxis similar a funciones/clases CSS.
- Herramienta que elegiría para este proyecto y por qué: Dart Sass. Cuenta con un sistema moderno de módulos (`@use` / `@forward`), mejor soporte activo en la industria y evita la ambigüedad que Less presenta entre selectores de clase y mixins.
- Riesgo de editar dist directamente: Modificar el CSS en `dist` genera una "solución aparente" que se sobrescribe y pierde completamente en el siguiente proceso de construcción (`npm run build`).

## Declaración
- Fuentes y recursos consultados: Guía de laboratorio Semana 5 UTP, documentación oficial de Dart Sass y Less.js.
- Cambios propios realizados: Creación del árbol de carpetas, configuración exacta de scripts en `package.json`, redacción de las fuentes SCSS/LESS y comprobación de trazabilidad mediante DevTools.