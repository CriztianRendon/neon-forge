# NEON FORGE

Landing page de una sola página (single page) para una marca ficticia de ropa técnica luminosa.
Construida sin frameworks: HTML5 semántico, CSS puro y JavaScript vanilla.

**Demo en vivo:** https://neon-forge-v0.vercel.app/

---

## Características

- **Single page con navegación por anclas.** Seis secciones (`#home`, `#history`, `#collection`, `#shop`, `#about`, `#contact`) enlazadas con scroll suave. Sin redirecciones ni recargas.
- **Sin imágenes externas.** Las prendas son un `<symbol>` SVG dibujado a mano y reutilizado mediante `<use>`. Cada instancia se recolorea con variables CSS (`--neon`, `--neon-2`), así que nueve prendas distintas pesan lo que una.
- **Diseño responsive** con breakpoints en 1200 / 1024 / 820 / 620 px y menú hamburguesa por debajo de 1024 px.
- **Accesibilidad:** HTML semántico, `aria-expanded` en los controles desplegables, textos alternativos en los SVG y respeto por `prefers-reduced-motion`.

### Interactividad

| Función | Descripción |
|---|---|
| Menú móvil | Hamburguesa con bloqueo de scroll y cierre con `Escape` |
| Header adherente | Cambia de fondo al superar los 40 px de scroll |
| Scroll spy | Resalta el enlace del menú según la sección visible |
| Buscador | Barra desplegable con validación y salto a la tienda |
| Animaciones de entrada | `IntersectionObserver` con retardo escalonado |
| Selector de color | Cambia los neones de la prenda del hero en vivo |
| Carrito | Contador de piezas añadidas desde las tarjetas de producto |
| Formulario | Validación de nombre, email y mensaje con errores en línea |

---

## Estructura

```
.
├── index.html    # Marcado y sprite SVG de las prendas
├── styles.css    # Estilos en 8 bloques numerados
├── script.js     # Interactividad en un IIFE, 8 bloques numerados
└── README.md
```

Tres archivos, sin dependencias, sin proceso de build.

---

## Tecnologías

- **HTML5** semántico
- **CSS puro** — custom properties, Grid, Flexbox, `clamp()`, `color-mix()`, `backdrop-filter`
- **JavaScript** vanilla (ES5, sin transpilación)
- **Google Fonts** — Orbitron (títulos) y Chakra Petch (texto)

---

## Uso en local

No requiere servidor ni instalación. Basta con abrir `index.html` en el navegador.

Si prefieres servirlo por HTTP (recomendable para que las rutas se comporten igual que en producción):

```bash
npx serve .
```

---

## Despliegue

Desplegado en **Vercel** con integración de GitHub: cada `push` a la rama `main` publica automáticamente. Al ser un sitio estático no hay comando de build ni configuración adicional.

```bash
git add .
git commit -m "descripción del cambio"
git push
```

---

## Licencia

Proyecto de práctica. NEON FORGE es una marca ficticia; los nombres de producto y precios son inventados.
