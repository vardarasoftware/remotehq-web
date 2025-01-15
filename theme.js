// Wrap the entire script in a self-invoking function to create a global scope
(function() {
    // Utility Functions
    function toggleAccordion(id) {
        const content = document.getElementById(`content-${id}`);
        const icon = document.getElementById(`icon-${id}`);
        const isHidden = content.classList.contains("hidden");

        content.classList.toggle("hidden", !isHidden);
        icon.classList.toggle("rotate-180", isHidden);

        // Update aria-expanded
        const button = document.getElementById(`button-${id}`);
        button.setAttribute("aria-expanded", isHidden ? "true" : "false");
    }

    function toggleMenu() {
        const menu = document.getElementById('mobile-menu');
        menu.classList.toggle('hidden');
    }

    // Event Listeners
    document.addEventListener('click', (event) => {
        const notifications = document.getElementById('popup-notifications');
        const accountInfo = document.getElementById('popup-account-info');

        if (!event.target.closest('#notifications-icon')) {
            notifications.classList.add('hidden');
        }

        if (!event.target.closest('#account-info-icon')) {
            accountInfo.classList.add('hidden');
        }

    });

})();
