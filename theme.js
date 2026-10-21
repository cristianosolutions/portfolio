"use strict";
// Executado antes dos estilos para restaurar a preferência sem piscar o tema.
(() => {
  const root = document.documentElement;
  const storageKey = "portfolio-theme";
  let theme = window.matchMedia?.("(prefers-color-scheme: light)").matches ? "light" : "dark";
  try {
    const saved = localStorage.getItem(storageKey);
    if (saved === "light" || saved === "dark") theme = saved;
  } catch { /* O tema continua funcionando quando o armazenamento é bloqueado. */ }

  function applyTheme(value) {
    root.dataset.theme = value;
    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.content = value === "light" ? "#faf8f5" : "#182329";
    const button = document.getElementById("theme-toggle");
    if (button) {
      const label = value === "light" ? "Ativar tema escuro" : "Ativar tema claro";
      button.setAttribute("aria-label", label);
      button.title = label;
      button.hidden = false;
    }
  }

  applyTheme(theme);
  document.addEventListener("DOMContentLoaded", () => {
    applyTheme(theme);
    document.getElementById("theme-toggle")?.addEventListener("click", () => {
      theme = root.dataset.theme === "light" ? "dark" : "light";
      applyTheme(theme);
      try { localStorage.setItem(storageKey, theme); } catch { /* Preferência apenas nesta visita. */ }
    });
  });
})();