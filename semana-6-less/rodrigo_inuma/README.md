# Ruta Frontend · Guía de Laboratorio Semana 6 (LESS)

Este proyecto implementa la arquitectura modular de estilos con Less, utilizando variables de compilación, mixins paramétricos, guards, nesting controlado e imports.

## Preguntas de metacognición

- **Antes pensaba que un preprocesador servía principalmente para:** escribir CSS más rápido utilizando variables simples y anidación sin restricciones.
- **Ahora distingo entre una variable Less y una custom property CSS porque:** la variable Less se resuelve únicamente durante el tiempo de compilación y no llega al navegador, mientras que la custom property de CSS vive en el runtime y respeta la cascada y herencia del DOM.
- **La decisión de arquitectura que más mejoró la mantenibilidad fue:** la separación explícita de archivos por responsabilidades (tokens, mixins, base, layout, components) importados en un único punto de entrada (`main.less`).
- **El error más útil que diagnostiqué durante el laboratorio fue:** la falla de lectura de un token no declarado al compilar, el cual fue localizado rápidamente mediante los mensajes de error del CLI de Less y verificado con los source maps en DevTools.