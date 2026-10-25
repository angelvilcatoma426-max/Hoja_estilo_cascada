# Semana 8 · CSS Build Lab (PC2 Integración SASS y LESS)

## Autor
- **Apellidos y nombres:** Vilcatoma Napan Angel Jhoel
- **Código:** U23218298
- **Sección:** 31553

## Entorno reproducible
- **Sistema operativo:** Windows 11
- **Node.js:** v24.20.0
- **npm:** v10.9.0
- **Comando de versiones:** `npm run versions` (sass 1.104.0 / lessc 4.9.1)

## Decisiones justificadas
1. **Diferencia entre `@function` y `@mixin` en Sass:** Se usó `@function space()` para calcular medidas relativas dinámicas en rems mediante retorno de valor, mientras que `@mixin surface()` emite un bloque reutilizable de propiedades CSS asociadas a bordes y fondos.
2. **Uso de Custom Properties vs Tokens:** Los tokens de compilación (`$brand` / `@brand`) estructuran la fuente de diseño, pero alimentan la variable CSS `:root { --brand: ... }` para permitir temas dinámicos en cascada desde la consola del navegador sin re-compilar.

## Matriz de verificación

| Prueba | Resultado | Evidencia u observación |
|---|---|---|
| P1: Mobile 320/360px | Cumple | 1 sola columna, layout fluido sin scroll horizontal. |
| P2: Tablet 600px (36rem) | Cumple | Activa regla intermedia a 2 columnas. |
| P3: Desktop 1280px (48rem)| Cumple | Renderiza a 3 columnas; cuarta tarjeta pasa a nueva fila. |
| P4: Foco visual / Tab | Cumple | `:focus-visible` activa borde de 3px con contraste visible. |
| P5: Zoom 200% | Cumple | Los textos escalan con unidades rem manteniendo legibilidad. |
| P6: Texto extenso | Cumple | `overflow-wrap: anywhere` evita desbordamiento en tarjetas. |
| P7: Cuarto taller | Cumple | `badge--soon` aplica colores amber y `info-panel` reutiliza `surface`. |
| P8: Build dual | Cumple | `npm run build` genera `sass.css`, `less.css` y sus `.map`. |
| P9: DevTools Source Maps | Cumple | Traza reglas a `_components.scss` y `components.less`. |
| P10: Reproducibilidad | Cumple | `npm ci` e instalación limpia compilan sin errores. |