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
  }
  
}

export default Navigation;
