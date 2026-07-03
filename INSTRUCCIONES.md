# Instalar el chat de Porthos en tu página web

El chat aparece como un botón flotante abajo a la derecha. No requiere servidor,
no afecta el diseño de tu web y funciona en cualquier plataforma (HTML, WordPress,
Wix, Squarespace, Shopify, etc.).

**Solo hay que pegar el código justo antes de la etiqueta `</body>` de tu página.**

---

## Opción A — Una sola línea (recomendada)

Pega esta línea antes de `</body>`:

```html
<script src="https://porthos-web.vercel.app/porthos-chat.js" defer></script>
```

> Reemplaza `porthos-web.vercel.app` por el dominio donde está publicado el archivo
> `porthos-chat.js`, si es distinto.

Ventaja: si más adelante se mejora el chat, se actualiza solo sin volver a tocar la web.

---

## Opción B — Bloque completo (sin depender de nada externo)

Si prefieres no enlazar a un archivo externo, abre `porthos-chat-embed.html`,
copia **todo** su contenido y pégalo antes de `</body>`. Ya trae el logo incrustado,
así que no necesita subir ninguna imagen aparte.

---

## ¿Dónde lo pego según mi plataforma?

- **HTML propio:** antes de `</body>` en tu plantilla/página.
- **WordPress:** Apariencia → Editor de tema → `footer.php` (antes de `</body>`),
  o un plugin tipo "Insert Headers and Footers" (sección Footer).
- **Wix / Squarespace:** agrega un bloque de "Código personalizado / Embed HTML"
  en el footer del sitio.
- **Shopify:** `theme.liquid`, justo antes de `</body>`.

---

## Notas

- No pide instalar nada ni pagar hosting; el chat se conecta solo.
- No modifica los estilos ni el contenido de tu página (va aislado).
- Para probar: guarda, recarga la web y haz clic en el botón de abajo a la derecha.
