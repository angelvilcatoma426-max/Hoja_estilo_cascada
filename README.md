# Hoja_estilo_casacada



# GAME LIVE CENTER - LESS (proyecto completo)

## Configuración
    npm install
    npm run build         # compila las 11 páginas desde LESS a /css
    npm run watch:style    # recompila style.less al guardar

## Archivos fuente (/less) — las 11 páginas

- Páginas de producto (plantilla compartida vía mixin
  `.plantilla-producto()`): `variables.less`, `mixins.less`,
  `mortalkombat11.less`, `marvel-spiderman-remastered.less`,
  `pragmata.less`, `no-mans-sky.less`, `terraria.less`
- Catálogo, login y registro: `variables-catalogo.less`,
  `catalogo.less`, `login.less`, `registrar-tarjeta.less`
- Núcleo del sitio: `variables-core.less`, `mixins-core.less`,
  `style.less`, `soporte.less`, `nosotros.less`

## Notas

Los `.css` de `/css` son generados: edita siempre los archivos de
`/less`, nunca el `.css` directamente, y vuelve a correr
`npm run build`.

