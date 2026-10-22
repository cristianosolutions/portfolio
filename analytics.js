"use strict";
// Integração HTML do Vercel Web Analytics; não carrega em prévias locais.
(() => {
  const host = window.location.hostname;
  if (host !== "cristianomagno.vercel.app" && !host.endsWith(".vercel.app")) return;
  window.va = window.va || function () {
    (window.vaq = window.vaq || []).push(arguments);
  };
  const script = document.createElement("script");
  script.defer = true;
  script.src = "/_vercel/insights/script.js";
  document.head.appendChild(script);
})();