const navToggle = document.querySelector(".nav-toggle");
const siteNav = document.querySelector(".site-nav");
const header = document.querySelector(".site-header");
const themeStorageKey = "matchadda-theme";

function applyTheme(theme) {
  document.documentElement.setAttribute("data-theme", theme);
}

function getPreferredTheme() {
  const savedTheme = localStorage.getItem(themeStorageKey);
  if (savedTheme === "light" || savedTheme === "dark") {
    return savedTheme;
  }

  return window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark";
}

applyTheme(getPreferredTheme());

if (header) {
  const themeToggle = document.createElement("button");
  themeToggle.className = "theme-toggle";
  themeToggle.type = "button";

  const mobileThemeToggle = document.createElement("button");
  mobileThemeToggle.className = "theme-toggle theme-toggle-mobile";
  mobileThemeToggle.type = "button";

  const syncThemeToggle = () => {
    const currentTheme = document.documentElement.getAttribute("data-theme") || "dark";
    const nextTheme = currentTheme === "dark" ? "light" : "dark";
    themeToggle.textContent = nextTheme === "light" ? "Light" : "Night";
    themeToggle.setAttribute("aria-label", nextTheme === "light" ? "Switch to light mode" : "Switch to night mode");
    themeToggle.title = nextTheme === "light" ? "Switch to light mode" : "Switch to night mode";
    mobileThemeToggle.textContent = nextTheme === "light" ? "Light Mode" : "Night Mode";
    mobileThemeToggle.setAttribute("aria-label", nextTheme === "light" ? "Switch to light mode" : "Switch to night mode");
    mobileThemeToggle.title = nextTheme === "light" ? "Switch to light mode" : "Switch to night mode";
  };

  const handleThemeToggle = () => {
    const currentTheme = document.documentElement.getAttribute("data-theme") || "dark";
    const nextTheme = currentTheme === "dark" ? "light" : "dark";
    applyTheme(nextTheme);
    localStorage.setItem(themeStorageKey, nextTheme);
    syncThemeToggle();
  };

  themeToggle.addEventListener("click", handleThemeToggle);
  mobileThemeToggle.addEventListener("click", handleThemeToggle);

  header.insertBefore(themeToggle, navToggle || siteNav || null);
  if (siteNav) {
    siteNav.appendChild(mobileThemeToggle);
  }
  syncThemeToggle();
}

if (navToggle && siteNav) {
  navToggle.addEventListener("click", () => {
    const isOpen = siteNav.classList.toggle("open");
    navToggle.setAttribute("aria-expanded", String(isOpen));
  });
}

// Progressive Web App - Service Worker Registration
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/service-worker.js')
      .then(registration => {
        console.log('[App] Service Worker registered successfully:', registration.scope);
        
        // Check for updates periodically
        setInterval(() => {
          registration.update();
        }, 60000); // Check every minute
      })
      .catch(error => {
        console.log('[App] Service Worker registration failed:', error);
      });
  });
}

// Install prompt handler for app installation
let deferredPrompt;
window.addEventListener('beforeinstallprompt', event => {
  event.preventDefault();
  deferredPrompt = event;
  console.log('[App] Install prompt available');
});

// Optional: You can trigger install with a custom button
// Example: document.getElementById('install-button')?.addEventListener('click', async () => {
//   if (deferredPrompt) {
//     deferredPrompt.prompt();
//     const { outcome } = await deferredPrompt.userChoice;
//     console.log(`User response to the install prompt: ${outcome}`);
//     deferredPrompt = null;
//   }
// });
