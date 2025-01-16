/**
 * @fileoverview ATS (Applicant Tracking System) page functionality
 * @description Handles all interactive elements on the ATS page including proposal toggles,
 * tab navigation, popups, and mobile menu functionality.
 * @module ATSPage
 */

/**
 * @class ATSPage
 * @description Main class for handling ATS page functionality
 */
class ATSPage {
    /**
     * @constructor
     * @description Initializes the ATS page functionality and binds event handlers
     */
    constructor() {
        // Bind methods to maintain 'this' context
        this.toggleProposal = this.toggleProposal.bind(this);
        this.handleTabClick = this.handleTabClick.bind(this);
        this.toggleMobileMenu = this.toggleMobileMenu.bind(this);
        this.init();
    }

    /**
     * @method init
     * @description Initializes all page functionalities
     * @private
     */
    init() {
        try {
            this.initializeProposalToggles();
            this.initializeTabsNavigation();
            this.initializePopups();
            this.initializeMobileMenu();
            console.log('ATS Page initialized successfully');
        } catch (error) {
            console.error('Error initializing ATS Page:', error);
        }
    }

    /**
     * @method initializeProposalToggles
     * @description Sets up event listeners for proposal text expansion/collapse
     * @private
     */
    initializeProposalToggles() {
        try {
            const proposalButtons = document.querySelectorAll('[data-proposal-toggle]');
            proposalButtons.forEach(button => {
                button.addEventListener('click', () => this.toggleProposal(button));
            });
        } catch (error) {
            console.error('Error initializing proposal toggles:', error);
        }
    }

    /**
     * @method toggleProposal
     * @description Toggles the visibility of full/collapsed proposal text
     * @param {HTMLElement} button - The button element that triggered the toggle
     * @private
     */
    toggleProposal(button) {
        try {
            const proposalText = button.closest('.mt-4').querySelector('.proposal-text');
            const collapsed = proposalText.querySelector('.collapsed');
            const expanded = proposalText.querySelector('.expanded');
            
            if (!collapsed || !expanded) return;

            collapsed.classList.toggle('ats-hidden');
            expanded.classList.toggle('ats-hidden');
            
            button.textContent = collapsed.classList.contains('hidden') ? 'See Less' : 'See More';
        } catch (error) {
            console.error('Error toggling proposal:', error);
        }
    }

    /**
     * @method initializeTabsNavigation
     * @description Sets up event listeners for tab navigation
     * @private
     */
    initializeTabsNavigation() {
        try {
            const tabs = document.querySelectorAll('.cursor-pointer');
            tabs.forEach(tab => {
                tab.addEventListener('click', () => this.handleTabClick(tab));
            });
        } catch (error) {
            console.error('Error initializing tabs:', error);
        }
    }

    /**
     * @method handleTabClick
     * @description Handles the tab selection and updates active state
     * @param {HTMLElement} selectedTab - The tab element that was clicked
     * @private
     */
    handleTabClick(selectedTab) {
        try {
            const allTabs = selectedTab.parentElement.querySelectorAll('.cursor-pointer');
            allTabs.forEach(tab => {
                tab.classList.remove('tab-active');
            });
            selectedTab.classList.add('tab-active');
        } catch (error) {
            console.error('Error handling tab click:', error);
        }
    }

    /**
     * @method initializePopups
     * @description Sets up event listeners for popup triggers and outside clicks
     * @private
     */
    initializePopups() {
        try {
            document.querySelectorAll('[data-popup]').forEach(trigger => {
                trigger.addEventListener('click', (e) => {
                    e.stopPropagation();
                    this.togglePopup(trigger.dataset.popup);
                });
            });

            document.addEventListener('click', (event) => {
                if (!event.target.closest('.popup-content') && !event.target.closest('#notifications-icon')) {
                    document.querySelectorAll('[data-popup]').forEach(popup => popup.classList.add('hidden'));
                    const notifications = document.getElementById('popup-notifications');
                    notifications.classList.add('hidden');
                }
            });
            
        } catch (error) {
            console.error('Error initializing popups:', error);
        }
    }

    /**
     * @method togglePopup
     * @description Toggles the visibility of a specific popup
     * @param {string} popupId - The ID of the popup to toggle
     * @private
     */
    togglePopup(popupId) {
        try {
            const popup = document.getElementById(`popup-${popupId}`);
            if (popup) {
                popup.classList.toggle('hidden');
            }
        } catch (error) {
            console.error('Error toggling popup:', error);
        }
    }

    /**
     * @method closeAllPopups
     * @description Closes all open popups
     * @private
     */
    closeAllPopups() {
        try {
            document.querySelectorAll('[id^="popup-"]').forEach(popup => {
                popup.classList.add('hidden');
            });
        } catch (error) {
            console.error('Error closing popups:', error);
        }
    }

    /**
     * @method initializeMobileMenu
     * @description Sets up event listener for mobile menu toggle
     * @private
     */
    initializeMobileMenu() {
        try {
            const menuButton = document.querySelector('[data-mobile-menu]');
            if (menuButton) {
                menuButton.addEventListener('click', this.toggleMobileMenu);
            }
        } catch (error) {
            console.error('Error initializing mobile menu:', error);
        }
    }

    /**
     * @method toggleMobileMenu
     * @description Toggles the visibility of the mobile menu
     * @private
     */
    toggleMobileMenu() {
        try {
            const mobileMenu = document.getElementById('mobile-menu-ats');
            if (mobileMenu) {
                mobileMenu.classList.toggle('hidden');
            }
        } catch (error) {
            console.error('Error toggling mobile menu:', error);
        }
    }
}
// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new ATSPage();
});


export default ATSPage; 