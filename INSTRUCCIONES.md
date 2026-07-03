# Integrar el asistente virtual de Porthos en la página web

Les comparto el archivo y los pasos para integrar el asistente virtual **Porthos**
en la página web del restaurante.

## Archivo adjunto

1. **porthos-chat-widget.html** — código del widget (el logo ya va incrustado, no
   hace falta subir ninguna imagen aparte).

## Pasos

1. Abrir **porthos-chat-widget.html** con cualquier editor de texto y copiar **todo**
   su contenido.

2. Pegarlo en el template HTML del sitio, justo antes de la etiqueta de cierre
   `</body>`.

3. Publicar el cambio. El botón del chat aparecerá automáticamente en todas las
   páginas donde esté ese template, abajo a la derecha.

> **Nota:** Si después de la integración el chat no responde, por favor informarme.

---

## Dónde se pega según la plataforma

- **HTML propio:** antes de `</body>` en la plantilla del sitio.
- **WordPress:** Apariencia → Editor de tema → `footer.php` (antes de `</body>`),
  o un plugin tipo "Insert Headers and Footers" (sección Footer).
- **Wix / Squarespace:** un bloque de "Código personalizado / Embed HTML" en el footer.
- **Shopify:** `theme.liquid`, justo antes de `</body>`.

## Ventajas de este widget

- **No requiere subir imágenes** ni reemplazar ninguna URL: el logo va dentro del código.
- **No daña el diseño del sitio:** va aislado (Shadow DOM), no afecta colores, fuentes ni
  estilos de la página.
- **No requiere instalar ni pagar hosting:** el chat se conecta solo al asistente.
