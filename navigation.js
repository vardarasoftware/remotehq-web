class Navigation {
  toggleAccordion(id) {
    const content = document.getElementById(`content-${id}`);
    const icon = document.getElementById(`icon-${id}`);
    const isHidden = content.classList.contains("hidden");

    content.classList.toggle("hidden", !isHidden);
    icon.classList.toggle("rotate-180", isHidden);

    // Update aria-expanded
    const button = document.getElementById(`button-${id}`);
    button.setAttribute("aria-expanded", isHidden ? "true" : "false");
  }

  toggleMenu() {
    const menu = document.getElementById("mobile-menu");
    menu.classList.toggle("hidden");
  }

  togglePopup(id) {
    const popup = document.getElementById(`popup-${id}`);
    popup.classList.toggle("hidden");
  }

  toggleJobDrawer(id) {
    const drawer = document.getElementById(`job-drawer-${id}`);
    drawer.classList.toggle("translate-x-full");
    drawer.classList.toggle("translate-x-0");

    // Prevent body scrolling when drawer is open
    document.body.classList.toggle("overflow-hidden");

    // Add event listener for Escape key
    if (!drawer.classList.contains("translate-x-full")) {
      document.addEventListener("keydown", handleEscapeKey);
    } else {
      document.removeEventListener("keydown", handleEscapeKey);
    }
  }

  setupEventListeners() {
    document.addEventListener("click", (event) => {
      const notifications = document.getElementById("popup-notifications");
      const accountInfo = document.getElementById("popup-account-info");

      if (!event.target.closest("#notifications-icon")) {
        notifications.classList.add("hidden");
      }

      if (!event.target.closest("#account-info-icon")) {
        accountInfo.classList.add("hidden");
      }
    });

    window.toggleAccordion = this.toggleAccordion;
    window.toggleMenu = this.toggleMenu;
    window.togglePopup = this.togglePopup;
    window.toggleJobDrawer = this.toggleJobDrawer;
  }
  
}

export default Navigation;
