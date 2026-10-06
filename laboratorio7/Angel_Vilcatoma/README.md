# FrontLab · Guía de Laboratorio Semana 7 (Sass)

Este proyecto implementa la arquitectura modular de estilos con Sass moderno (Dart Sass 1.104.1), utilizando el sistema de módulos con `@use` y `@forward`, parciales, mixins con `@content`, funciones personalizadas y módulos incorporados (`sass:map`, `sass:color`).

## Preguntas de metacognición

- **¿Qué mejora aporta `@use` frente a un espacio global de variables y mixins?:** Evita colisiones de nombres al encapsular los miembros en un *namespace* explícito, impide la ejecución múltiple del mismo código y elimina el ámbito global opaco del antiguo `@import`.
- **¿Qué valor debería permanecer como custom property CSS en lugar de convertirse en una variable Sass?:** Los valores que necesitan cambiar dinámicamente en el *runtime* del navegador (por ejemplo, mediante media queries, temas claro/oscuro o manipulación con JavaScript).
- **¿En qué caso elegirías un mixin y en qué caso una función?:** Elijo un *mixin* cuando necesito encapsular un grupo repetitivo de declaraciones CSS (que emiten código). Elijo una *función* cuando necesito transformar o calcular un valor específico y retornar un resultado numérico o de cadena.
- **¿Qué dependencia de tu proyecto sería difícil de localizar si eliminaras los namespaces?:** La procedencia de los tokens de espacio (como `a.space(4)`) y colores (como `a.$color-primary`), ya que sería ambiguo saber si provinieron de `_tokens.scss` o de un helper global.
- **¿Qué parte del CSS generado revisarías para detectar una abstracción Sass excesiva?:** Revisaría el tamaño total del archivo compilado, la profundidad de los selectores anidados (evitando el *nesting hell*) y la duplicación inútil de bloques CSS por el uso indebido de mixins voluminosos.
- **Después de comparar Less y Sass, ¿qué criterios técnicos usarías para elegir una herramienta en un proyecto real?:** Evaluaría el ecosistema y soporte del equipo, la necesidad de un sistema estricto de módulos explícitos (`@use`/`@forward` en Sass), el rendimiento del compilador en pipelines CI/CD y la interoperabilidad con otras librerías de componentes UI.

## Reto de extensión: Variante de tarjeta destacada (`.card--featured`)

Se implementó el modificador `.card--featured` en `src/scss/components/_card.scss`. Reutiliza el mixin `@include a.surface-card`, los tokens públicos `$color-primary` y `$color-surface-soft`, y añade un borde superior distintivo de acento sin duplicar propiedades base ni romper el sistema BEM.