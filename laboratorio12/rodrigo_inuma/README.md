# CampusMotion — PC3 Semana 12 (Animaciones CSS)

## Qué es
Agenda de 3 talleres con entrada escalonada, un indicador decorativo y
respuestas al foco/puntero, con controles para activar, pausar y
detener el movimiento.

## Cómo abrirlo
Abre `index.html` directamente en el navegador, o usa Live Server
desde VS Code. No requiere instalación ni JavaScript.

## Controles
- **Activar animaciones**: dispara la entrada escalonada de las tres
  tarjetas (retrasos de 0, 120 y 240ms) y el pulso del punto
  decorativo (ida y vuelta cada 1200ms, infinito).
- **Pausar animaciones**: congela ambas secuencias en el punto donde
  se encuentren, sin reiniciarlas.
- Desmarcar **Activar** retira las animaciones y vuelve a la
  presentación estática.
- Pasar el foco (Tab) o el puntero por una tarjeta la eleva y
  amplía levemente (`translateY(-0.25rem) scale(1.02)`), de forma
  independiente a los controles anteriores.

## Decisiones de movimiento
- Las animaciones solo se habilitan dentro de
  `@media (prefers-reduced-motion: no-preference)`. Con `reduce`
  activo, el contenido permanece estático en cualquier estado de las
  casillas; el cambio de color por foco sigue siendo inmediato porque
  vive fuera de esa condición.
- La regla de pausa (`animation-play-state: paused`) se escribió
  después de los `animation` abreviados de activación, para que no
  quede sobrescrita por el valor `running` implícito del shorthand.
- `animation-fill-mode: backwards` conserva el primer fotograma de la
  entrada durante el retraso, sin ocultar el texto de la tarjeta.
- El layout en columnas usa `@supports (display: grid)`: 1 columna
  por defecto, 2 desde 40rem y 3 desde 64rem. Sin soporte de Grid, el
  catálogo se mantiene en una columna (bloque base).

## Estructura
```
campusmotion12/
├── index.html
├── css/
│   └── styles.css
├── README.md
└── pruebas.md
```
