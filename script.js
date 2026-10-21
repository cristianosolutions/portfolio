"use strict";

// Configure aqui o endereço que receberá os contatos. Vazio mantém o envio desativado.
const CONTACT_EMAIL = "cristianosolutions@gmail.com";
// Arquivo original do currículo disponível para download.
const RESUME_URL = "assets/cristiano-magno.pdf";
const MOBILE_MENU_QUERY = "(max-width: 640px)";

function updateFooterYear() {
  const year = document.getElementById("ano");
  if (year) year.textContent = String(new Date().getFullYear());
}

function initializeNavigation() {
  const toggle = document.querySelector(".menu-toggle");
  const menu = document.getElementById("menu-principal");
  if (!toggle || !menu) return;

  const mobileViewport = window.matchMedia(MOBILE_MENU_QUERY);
  const setMenuOpen = (open) => {
    toggle.setAttribute("aria-expanded", String(open));
    toggle.setAttribute("aria-label", open ? "Fechar menu" : "Abrir menu");
    menu.hidden = mobileViewport.matches && !open;
  };
  const synchronizeViewport = () => {
    toggle.hidden = !mobileViewport.matches;
    setMenuOpen(false);
  };

  toggle.addEventListener("click", () => {
    setMenuOpen(toggle.getAttribute("aria-expanded") !== "true");
  });
  menu.addEventListener("click", (event) => {
    if (event.target.closest("a")) setMenuOpen(false);
  });
  document.addEventListener("keydown", (event) => {
    if (
      event.key === "Escape" &&
      toggle.getAttribute("aria-expanded") === "true"
    ) {
      setMenuOpen(false);
      toggle.focus();
    }
  });
  document.addEventListener("pointerdown", (event) => {
    if (mobileViewport.matches && toggle.getAttribute("aria-expanded") === "true" &&
        !toggle.contains(event.target) && !menu.contains(event.target)) setMenuOpen(false);
  });
  mobileViewport.addEventListener("change", synchronizeViewport);
  synchronizeViewport();
}

function initializeContactForm() {
  const form = document.getElementById("contact-form");
  const status = document.getElementById("form-status");
  const emailLink = document.getElementById("contact-email");
  const submit = form?.querySelector('button[type="submit"]');
  if (!form || !status || !emailLink || !submit) return;

  const configured = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(CONTACT_EMAIL);
  submit.disabled = !configured;
  if (configured) {
    emailLink.textContent = "Ou escreva para: " + CONTACT_EMAIL;
    emailLink.href = "mailto:" + CONTACT_EMAIL;
    emailLink.hidden = false;
  } else {
    status.textContent =
      "Contato ainda não disponível. O endereço do responsável será adicionado em breve.";
  }

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    if (!configured || !form.reportValidity()) return;
    const data = new FormData(form);
    const name = String(data.get("nome") || "").trim();
    const email = String(data.get("email") || "").trim();
    const message = String(data.get("mensagem") || "").trim();
    if (!name || message.length < 10) {
      status.textContent =
        "Informe seu nome e uma mensagem com pelo menos 10 caracteres sem contar espaços nas extremidades.";
      return;
    }
    const subject = encodeURIComponent("Contato pelo portfólio — " + name);
    const body = encodeURIComponent(
      "Nome: " + name + "\nE-mail: " + email + "\n\n" + message,
    );
    window.location.href =
      "mailto:" + CONTACT_EMAIL + "?subject=" + subject + "&body=" + body;
    status.textContent =
      "A abertura do seu aplicativo de e-mail foi solicitada. Confirme o envio por lá. Se ele não abrir, use o link de e-mail abaixo. Sua mensagem foi mantida neste formulário.";
  });
}

updateFooterYear();
initializeNavigation();
initializeContactForm();

function initializeResume() {
  const link = document.getElementById("resume-download");
  const pending = document.getElementById("resume-pending");
  if (!link || !pending || !RESUME_URL.trim()) return;
  link.href = RESUME_URL;
  link.hidden = false;
  pending.hidden = true;
}
initializeResume();

// Atualiza o menu ativo sem alterar a URL durante a rolagem.
function initializeScrollNavigation() {
  const sections = Array.from(document.querySelectorAll("main section[id]"));
  const links = Array.from(document.querySelectorAll('.nav-links a[href^="#"]'));
  const header = document.querySelector(".site-header");
  if (!sections.length) return;

  let timer;
  function synchronizeSection() {
    const marker = (header?.getBoundingClientRect().height || 0) + 48;
    let current = sections[0];
    for (const section of sections) {
      if (section.getBoundingClientRect().top <= marker) current = section;
      else break;
    }
    const atBottom = window.scrollY > 0 &&
      window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 2;
    if (atBottom) current = sections[sections.length - 1];

    const menuId = current.id;
    for (const link of links) {
      if (link.getAttribute("href") === "#" + menuId) {
        link.setAttribute("aria-current", "location");
      } else {
        link.removeAttribute("aria-current");
      }
    }
  }
  function scheduleUpdate() {
    window.clearTimeout(timer);
    timer = window.setTimeout(synchronizeSection, 150);
  }
  window.addEventListener("scroll", scheduleUpdate, { passive: true });
  window.addEventListener("resize", scheduleUpdate);
  window.addEventListener("hashchange", scheduleUpdate);
  window.addEventListener("load", scheduleUpdate);
  scheduleUpdate();
}
initializeScrollNavigation();
// Navega pelas seções sem alterar o endereço da página.
function initializeSectionLinks() {
  document.addEventListener("click", (event) => {
    if (event.defaultPrevented || event.button !== 0 ||
        event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
    const link = event.target.closest('a[href^="#"]');
    if (!link || link.hasAttribute("download") ||
        (link.target && link.target !== "_self")) return;
    const target = document.getElementById(link.hash.slice(1));
    if (!target) return;
    event.preventDefault();
    if (!target.hasAttribute("tabindex")) {
      target.setAttribute("tabindex", "-1");
      target.addEventListener("blur", () => target.removeAttribute("tabindex"), { once: true });
    }
    target.focus({ preventScroll: true });
    target.scrollIntoView({
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth",
      block: "start"
    });
  });
  function clearInitialHash() {
    if (window.location.hash) {
      window.history.replaceState(window.history.state, "",
        window.location.pathname + window.location.search);
    }
  }
  if (document.readyState === "complete") clearInitialHash();
  else window.addEventListener("load", clearInitialHash, { once: true });
}
initializeSectionLinks();