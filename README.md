# argOS — Landing

Modernización del sitio de argOS (Linux/Debian OSINT & ciberinteligencia), migrado del
WordPress/PHP original a **Astro + TypeScript + Tailwind CSS v4**, con envío de
formularios listo para conectar a **Supabase**.

Fuente del diseño (prototipos `.dc.html` + handoff completo): `../Landing ArgOs/`.
Grafo de conocimiento del proyecto de diseño: `../Landing ArgOs/graphify-out/graph.html`.

## Stack

- **Astro** (output estático por página, con endpoints `/api/*` server-rendered vía adapter de Node) — elegido porque el sitio es ~95% contenido estático; solo un puñado de islas (terminal animado, contadores, dropdown/menú mobile, 4 formularios) necesitan JS.
- **Tailwind CSS v4** (`@theme` en `src/styles/global.css`) + tokens de diseño originales portados 1:1 en `src/styles/tokens.css` (colores, tipografía Archivo, radios, sombras).
- Sin framework de UI (React/Vue) — las islas usan `<script>` vanilla por componente, bundle mínimo.

## Formularios → Supabase

Los 4 formularios (beta signup, Embajadores, Postularme, Contacto) postean a
`src/pages/api/*.ts`, que delegan en `src/lib/submit.ts`. Hoy esas funciones
**validan y hacen `console.log`** — no hay proyecto Supabase conectado todavía.

Para conectar Supabase cuando haya credenciales:
1. Aplicar `supabase/schema.sql` contra el proyecto.
2. En cada función `insert*` de `src/lib/submit.ts`, reemplazar el `console.log` /
   comentario `TODO(supabase)` por `await supabase.from('<tabla>').insert(row)`.
3. Nada en las páginas ni en los endpoints de API necesita cambiar.

## Comandos

| Comando          | Acción                                      |
| :--------------- | :------------------------------------------- |
| `pnpm dev`        | Servidor de desarrollo en `localhost:4321`   |
| `pnpm build`      | Build de producción a `./dist/`              |
| `pnpm exec astro check` | Chequeo de tipos de archivos `.astro`  |
