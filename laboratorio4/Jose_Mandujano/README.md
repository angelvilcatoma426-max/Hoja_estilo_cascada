# PC1 UTP TechHub

## Autor
- **Apellidos y nombres:** Vilcatoma Napan Angel Jhoel
- **Código:** U23218298
- **Sección:** 31553

## Decisiones de diseño
1. **Base mobile-first:** Se partió de un flujo vertical estándar en 1 sola columna a 320px de ancho, garantizando que todo el contenido fuera visible y operable sin desbordamientos horizontales antes de añadir cualquier media query.
2. **Uso de Flexbox:** Aplicado para elementos unidimensionales como la cabecera, barra de navegación, grupos de botones, etiquetas de tarjetas, detalles de la agenda y el footer. Se hizo uso extensivo de `flex-wrap: wrap` y `gap` para garantizar un reflujo seguro al cambiar de pantalla.
3. **Uso de Grid:** Aplicado en la estructura general (`content-shell` y `hero__layout`) y en la cuadrícula de tarjetas de talleres (`workshop-grid`), la cual usa patrones intrínsecos `repeat(auto-fit, minmax(..., 1fr))` para reordenarse automáticamente sin sobrecargar la hoja de estilos.
4. **Breakpoint 1 (48rem / 768px):** Resuelve el amontonamiento del Hero y la separación lateral de la Agenda respecto a los Talleres, cambiando la disposición de 1 a 2 columnas principales.
5. **Breakpoint 2 (72rem / 1152px):** Ajusta las proporciones relativas de los tracks (`2.5fr 1fr`) para aprovechar mejor la pantalla ancha sin dispersar el contenido de las tarjetas.
6. **Tratamiento de imagen y tipografía responsiva:** Se usó `clamp()` para los encabezados principales y la imagen de Hero fue contenida con `max-width: 100%`, `aspect-ratio: 16/9` y `object-fit: cover`.

## Matriz de pruebas

| Prueba | Resultado | Observación o corrección |
| :--- | :--- | :--- |
| **320 px** | Correcto | Flujo en 1 columna, controles visibles con `wrap`. Sin desbordamiento. |
| **768 px** | Correcto | Transición de Hero y Content Shell a 2 columnas. |
| **1024 px** | Correcto | Distribución fluida de tarjetas en 2-3 columnas según espacio. |
| **1440 px** | Correcto | Ancho contenido a `72rem` centrado mediante márgenes automáticos. |
| **Zoom 200 %** | Correcto | La interfaz refluye dinámicamente regresando a 1 columna sin pérdida de datos. |
| **Solo teclado** | Correcto | El skip-link aparece al dar `Tab` y el anillo de foco (`outline`) permanece visible. |
| **Cadena de 80 caracteres** | Correcto | `overflow-wrap: anywhere` fractura correctamente la palabra evitando *overflow*. |

## Validación
- **HTML:** Validado con Nu HTML Checker sin errores.
- **CSS:** Validado con W3C CSS Validation Service sin errores.
- **Advertencias justificadas:** Ninguna.

## Autoevaluación
- **Criterio mejor logrado:** Integración de Grid intrínseco con Flexbox interno en la tarjetas de talleres, permitiendo que el enlace inferior siempre se mantenga alineado al pie usando `margin-block-start: auto`.
- **Mejora pendiente:** Ampliar la interactividad del buscador/filtros en futuras entregas al integrar JavaScript.
- **Declaración de autoría y recursos consultados:** Trabajo de autoría propia basado en la guía de laboratorio de la Semana 4 de Hojas de Estilo en Cascada Avanzado (UTP) y documentación oficial de MDN Web Docs.