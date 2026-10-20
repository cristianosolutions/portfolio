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
    toggle.textContent = open ? "Fechar menu" : "Menu";
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
