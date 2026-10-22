/**
 * Vercel Web Analytics Integration
 * Official implementation for static HTML sites
 * Automatically tracks page views when deployed to Vercel
 * Does not track in development/localhost
 */
(function() {
  'use strict';
  
  // Only load on production Vercel domains
  const host = window.location.hostname;
  if (host !== "cristianomagno.vercel.app" && !host.endsWith(".vercel.app")) {
    return;
  }
  
  // Initialize the analytics queue
  window.va = window.va || function() {
    (window.vaq = window.vaq || []).push(arguments);
  };
  
  // Load the Vercel Analytics script
  const script = document.createElement('script');
  script.defer = true;
  script.src = '/_vercel/insights/script.js';
  
  // Error handling
  script.onerror = function() {
    console.warn('[Vercel Web Analytics] Failed to load. Ensure Web Analytics is enabled in your Vercel dashboard.');
  };
  
  document.head.appendChild(script);
})();