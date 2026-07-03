/*!
 * Porthos Web Chat · widget embebible
 * Uso:  <script src="https://TU-DOMINIO/porthos-chat.js" defer></script>
 * No requiere configuración. Se inyecta solo y no altera el diseño de la página.
 */
(function () {
  if (window.__porthosChatLoaded) return;
  window.__porthosChatLoaded = true;

  var WEBHOOK = "https://the-turing-proyect-n8n.auk0rd.easypanel.host/webhook/porthos-web-chat/chat";

  // Ubicación del propio script → para cargar el logo que está a su lado
  var thisScript = document.currentScript;
  var IMG;
  try { IMG = new URL("porthos-mark.png", thisScript.src).href; }
  catch (e) { IMG = "porthos-mark.png"; }

  var CSS = ''
    + '#porthos-launcher,#porthos-chat{'
    +   '--pc-charcoal:#1b1b18;--pc-charcoal-soft:#20211f;--pc-green:#6e7b3c;--pc-green-dark:#5b6731;'
    +   '--pc-cream:#eae6d3;--pc-panel:#f4f1e6;--pc-bot:#ece8d8;--pc-ink:#26261f;--pc-shadow:0 18px 50px rgba(0,0,0,.38);'
    +   'box-sizing:border-box;'
    + '}'
    + '#porthos-chat *{box-sizing:border-box}'
    + '#porthos-launcher{'
    +   'position:fixed;right:26px;bottom:26px;z-index:2147483000;width:66px;height:66px;border-radius:50%;'
    +   'border:2px solid var(--pc-green);background:var(--pc-charcoal-soft) center/86% no-repeat;'
    +   'background-image:url("' + IMG + '");cursor:pointer;box-shadow:var(--pc-shadow);'
    +   'transition:transform .18s ease,box-shadow .18s ease;-webkit-tap-highlight-color:transparent;'
    + '}'
    + '#porthos-launcher:hover{transform:scale(1.06);box-shadow:0 20px 55px rgba(0,0,0,.5)}'
    + '#porthos-launcher::after{content:"";position:absolute;inset:-2px;border-radius:50%;'
    +   'box-shadow:0 0 0 0 rgba(110,123,60,.55);animation:porthos-pulse 2.6s infinite}'
    + '@keyframes porthos-pulse{0%{box-shadow:0 0 0 0 rgba(110,123,60,.5)}'
    +   '70%{box-shadow:0 0 0 16px rgba(110,123,60,0)}100%{box-shadow:0 0 0 0 rgba(110,123,60,0)}}'
    + '#porthos-launcher.open::after{animation:none}'
    + '#porthos-chat{'
    +   'position:fixed;right:26px;bottom:104px;z-index:2147483000;width:380px;max-width:calc(100vw - 36px);'
    +   'height:564px;max-height:calc(100vh - 130px);background:var(--pc-panel);border-radius:20px;overflow:hidden;'
    +   'display:flex;flex-direction:column;box-shadow:var(--pc-shadow);'
    +   'font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Helvetica,Arial,sans-serif;'
    +   'color:var(--pc-ink);opacity:0;transform:translateY(16px) scale(.98);pointer-events:none;'
    +   'transition:opacity .22s ease,transform .22s ease;'
    + '}'
    + '#porthos-chat.open{opacity:1;transform:translateY(0) scale(1);pointer-events:auto}'
    + '#porthos-chat .pc-header{background:var(--pc-charcoal);color:var(--pc-cream);padding:14px 16px;'
    +   'display:flex;align-items:center;gap:12px;border-bottom:2px solid var(--pc-green)}'
    + '#porthos-chat .pc-header .logo{width:42px;height:42px;border-radius:50%;'
    +   'background:var(--pc-charcoal-soft) center/84% no-repeat;background-image:url("' + IMG + '");'
    +   'border:1.5px solid var(--pc-green);flex:0 0 auto}'
    + '#porthos-chat .pc-header .titles{flex:1;line-height:1.15}'
    + '#porthos-chat .pc-header .titles .t{font-size:16px;font-weight:700;letter-spacing:.5px}'
    + '#porthos-chat .pc-header .status{font-size:11px;color:#b9c089;display:flex;align-items:center;gap:5px;margin-top:2px}'
    + '#porthos-chat .pc-header .status .dot{width:7px;height:7px;border-radius:50%;background:#8aa04a;box-shadow:0 0 0 3px rgba(138,160,74,.25)}'
    + '#porthos-chat .pc-close{background:transparent;border:0;color:var(--pc-cream);font-size:22px;cursor:pointer;'
    +   'opacity:.75;padding:4px 6px;line-height:1;border-radius:8px}'
    + '#porthos-chat .pc-close:hover{opacity:1;background:rgba(255,255,255,.08)}'
    + '#porthos-chat .pc-body{flex:1;overflow-y:auto;padding:18px 14px;display:flex;flex-direction:column;gap:10px}'
    + '#porthos-chat .pc-body::-webkit-scrollbar{width:8px}'
    + '#porthos-chat .pc-body::-webkit-scrollbar-thumb{background:#d8d2bd;border-radius:8px}'
    + '#porthos-chat .msg{max-width:80%;padding:10px 13px;border-radius:14px;font-size:14px;line-height:1.45;'
    +   'white-space:pre-wrap;word-wrap:break-word;animation:porthos-rise .2s ease}'
    + '@keyframes porthos-rise{from{opacity:0;transform:translateY(6px)}to{opacity:1;transform:none}}'
    + '#porthos-chat .msg.bot{align-self:flex-start;background:var(--pc-bot);color:var(--pc-ink);border-bottom-left-radius:4px}'
    + '#porthos-chat .msg.user{align-self:flex-end;background:var(--pc-green);color:#f6f3e7;border-bottom-right-radius:4px}'
    + '#porthos-chat .typing{align-self:flex-start;background:var(--pc-bot);padding:12px 14px;border-radius:14px;'
    +   'border-bottom-left-radius:4px;display:none}'
    + '#porthos-chat .typing.show{display:flex;gap:4px}'
    + '#porthos-chat .typing span{width:7px;height:7px;border-radius:50%;background:#9a9580;animation:porthos-blink 1.2s infinite}'
    + '#porthos-chat .typing span:nth-child(2){animation-delay:.2s}'
    + '#porthos-chat .typing span:nth-child(3){animation-delay:.4s}'
    + '@keyframes porthos-blink{0%,60%,100%{opacity:.25}30%{opacity:1}}'
    + '#porthos-chat .pc-input{display:flex;align-items:flex-end;gap:8px;padding:10px 12px;background:#fff;border-top:1px solid #e2dcc8}'
    + '#porthos-chat .pc-input textarea{flex:1;resize:none;border:1px solid #ddd6c2;border-radius:12px;padding:10px 12px;'
    +   'font-size:14px;font-family:inherit;max-height:96px;outline:none;color:var(--pc-ink);overflow-y:auto}'
    + '#porthos-chat .pc-input textarea::-webkit-scrollbar{width:0;height:0}'
    + '#porthos-chat .pc-input textarea:focus{border-color:var(--pc-green)}'
    + '#porthos-chat .pc-send{flex:0 0 auto;width:42px;height:42px;border-radius:50%;border:0;background:var(--pc-green);'
    +   'color:#f6f3e7;cursor:pointer;font-size:18px;display:flex;align-items:center;justify-content:center;transition:background .15s}'
    + '#porthos-chat .pc-send:hover{background:var(--pc-green-dark)}'
    + '#porthos-chat .pc-send:disabled{opacity:.5;cursor:default}'
    + '#porthos-chat .pc-foot{text-align:center;font-size:10px;color:#a39f8c;padding:6px 0 9px;background:#fff;letter-spacing:.3px}';

  var MARKUP = ''
    + '<div id="porthos-launcher" title="Hablar con Porthos" aria-label="Abrir chat"></div>'
    + '<div id="porthos-chat" role="dialog" aria-label="Chat de soporte Porthos">'
    +   '<div class="pc-header">'
    +     '<div class="logo"></div>'
    +     '<div class="titles"><div class="t">Porthos</div>'
    +       '<div class="status"><span class="dot"></span> En línea</div></div>'
    +     '<button class="pc-close" id="pc-close" aria-label="Cerrar">&times;</button>'
    +   '</div>'
    +   '<div class="pc-body" id="pc-body">'
    +     '<div class="typing" id="pc-typing"><span></span><span></span><span></span></div>'
    +   '</div>'
    +   '<div class="pc-input">'
    +     '<textarea id="pc-text" rows="1" placeholder="Escribe tu mensaje…"></textarea>'
    +     '<button class="pc-send" id="pc-send" aria-label="Enviar">&#10148;</button>'
    +   '</div>'
    +   '<div class="pc-foot">Estamos para ayudarte · Porthos Steakhouse &amp; Pub</div>'
    + '</div>';

  function init() {
    // Shadow DOM: aísla el widget del CSS del sitio del cliente (en ambos sentidos)
    var host = document.createElement("div");
    host.id = "porthos-chat-widget";
    var root = host.attachShadow ? host.attachShadow({ mode: "open" }) : host;
    root.innerHTML = "<style>" + CSS + "</style>" + MARKUP;
    document.body.appendChild(host);

    var $ = function (id) { return root.getElementById ? root.getElementById(id) : document.getElementById(id); };
    var launcher = $("porthos-launcher");
    var chat     = $("porthos-chat");
    var body     = $("pc-body");
    var typing   = $("pc-typing");
    var input    = $("pc-text");
    var sendBtn  = $("pc-send");
    var closeBtn = $("pc-close");

    function uuid() {
      return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, function (c) {
        return (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16);
      });
    }
    var sessionId = localStorage.getItem("porthos_web_session");
    if (!sessionId) { sessionId = uuid(); localStorage.setItem("porthos_web_session", sessionId); }

    var HKEY = "porthos_web_history";
    var LKEY = "porthos_web_last";
    var RESET_MS = 24 * 60 * 60 * 1000;

    var history = [];
    try { history = JSON.parse(localStorage.getItem(HKEY) || "[]"); } catch (e) { history = []; }

    var lastActivity = parseInt(localStorage.getItem(LKEY) || "0", 10);
    if (lastActivity && (Date.now() - lastActivity) > RESET_MS) {
      history = [];
      localStorage.removeItem(HKEY);
    }

    function saveHistory() { localStorage.setItem(HKEY, JSON.stringify(history.slice(-50))); }
    function touch() { localStorage.setItem(LKEY, String(Date.now())); }

    function addBubble(text, who) {
      var el = document.createElement("div");
      el.className = "msg " + who;
      el.textContent = text;
      body.insertBefore(el, typing);
      body.scrollTop = body.scrollHeight;
      return el;
    }

    (function renderHistory() {
      history.forEach(function (m) { addBubble(m.text, m.who); });
      if (history.length === 0) {
        addBubble("¡Hola! 👋 Bienvenido a Porthos. Cuéntame, ¿en qué te puedo ayudar?", "bot");
      }
    })();

    function showTyping(s) { typing.classList.toggle("show", s); if (s) body.scrollTop = body.scrollHeight; }

    var busy = false;
    function send(text) {
      text = (text || "").trim();
      if (!text || busy) return;
      busy = true; sendBtn.disabled = true;
      addBubble(text, "user");
      history.push({ text: text, who: "user" }); saveHistory(); touch();
      input.value = ""; autoGrow();
      showTyping(true);
      fetch(WEBHOOK, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "sendMessage", sessionId: sessionId, chatInput: text })
      }).then(function (res) { return res.json(); })
        .then(function (data) {
          var out = (data && (data.output || data.text || data.message)) || "Lo siento, no pude responder en este momento.";
          showTyping(false);
          addBubble(out, "bot");
          history.push({ text: out, who: "bot" }); saveHistory(); touch();
        })
        .catch(function () {
          showTyping(false);
          addBubble("Uy, tuve un problema de conexión. ¿Puedes intentarlo de nuevo en un momento?", "bot");
        })
        .then(function () { busy = false; sendBtn.disabled = false; input.focus(); });
    }

    function openChat() { chat.classList.add("open"); launcher.classList.add("open"); setTimeout(function () { input.focus(); }, 200); }
    function closeChat() { chat.classList.remove("open"); launcher.classList.remove("open"); }
    launcher.addEventListener("click", function () { chat.classList.contains("open") ? closeChat() : openChat(); });
    closeBtn.addEventListener("click", closeChat);

    function autoGrow() { input.style.height = "auto"; input.style.height = Math.min(input.scrollHeight, 96) + "px"; }
    input.addEventListener("input", autoGrow);
    input.addEventListener("keydown", function (e) {
      if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); send(input.value); }
    });
    sendBtn.addEventListener("click", function () { send(input.value); });
  }

  if (document.body) init();
  else document.addEventListener("DOMContentLoaded", init);
})();
