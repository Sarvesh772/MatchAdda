const isMaintenancePage = document.body?.dataset.page === "maintenance";

if (!isMaintenancePage) {
  const maintenanceTarget = new URL("maintenance.html", window.location.href);
  const currentPage = window.location.pathname.split("/").pop() || "index.html";

  if (currentPage !== "maintenance.html") {
    maintenanceTarget.searchParams.set("from", currentPage);
    window.location.replace(maintenanceTarget.toString());
  }
}

const navToggle = document.querySelector(".nav-toggle");
const siteNav = document.querySelector(".site-nav");

if (navToggle && siteNav) {
  navToggle.addEventListener("click", () => {
    const isOpen = siteNav.classList.toggle("open");
    navToggle.setAttribute("aria-expanded", String(isOpen));
  });
}
