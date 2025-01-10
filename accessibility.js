class Accessibility {
  constructor() {
    this.toggleDrawer = this.toggleDrawer.bind(this);
    this.closeDrawer = this.closeDrawer.bind(this);
    this.handleEscapeKey = this.handleEscapeKey.bind(this);
    this.handleCardKeyNavigation = this.handleCardKeyNavigation.bind(this);
    this.initializeCardNavigation = this.initializeCardNavigation.bind(this);
  } 

  initializeCardNavigation(cardSelector = '[id^="card-"]') {
    // Select cards and convert to array
    const cards = Array.from(document.querySelectorAll(cardSelector));

    // If no cards found, return
    if (cards.length === 0) return;

    this.cards = cards;

    // Add unique IDs and attributes to cards if not already present
    cards.forEach((card, index) => {
        // Only add ID if not already present
        if (!card.id) {
            card.id = `card-${index + 1}`;
        }
        
        card.setAttribute('tabindex', '-1');
        card.setAttribute('role', 'button');
        
        // Try to find a title or heading for aria-label
        const titleElement = card.querySelector('h2') || card.querySelector('h1');
        if (titleElement) {
            card.setAttribute('aria-label', `Card: ${titleElement.textContent}`);
        }
    });

    // Automatically focus the first card
    this.currentIndex = 0;
    this.focusCard(this.cards, this.currentIndex);

    // Return cards for potential further manipulation
    return cards;
  }

  handleCardKeyNavigation(event, cardSelector = '[id^="card-"]', drawerSelector = '[id^="drawer-"]') {
    // Ensure we're not in an input field or other interactive element
    if (event.target.tagName === 'INPUT') return;

    // Ensure job cards are initialized
    if (this.cards.length === 0) {
      this.initializeCardNavigation(cardSelector, drawerSelector);
      return;
    }

    // Find current focused card
    const currentCardIndex = this.cards.findIndex(card => card.classList.contains('ring-2'));

    switch(event.key) {
      case 'ArrowDown':
        event.preventDefault();
        const nextIndex = (currentCardIndex + 1) % this.cards.length;
        this.focusCard(this.cards, nextIndex);
        break;
      case 'ArrowUp':
        event.preventDefault();
        const prevIndex = (currentCardIndex - 1 + this.cards.length) % this.cards.length;
        this.focusCard(this.cards, prevIndex);
        break;
      case 'Enter':
        if (currentCardIndex !== -1) {
          const currentCard = this.cards[currentCardIndex];

          // Try different selector patterns for show more button
          const showMoreButton = 
            currentCard.querySelector('[onclick^="toggleDrawer"]') || 
            currentCard.querySelector('[onclick^="toggleJobDrawer"]');
          
          if (showMoreButton) {
            showMoreButton.click();
          }
        }
        break;
    }
  }


  focusCard(cards, index) {
    // Ensure index is valid
    if (index < 0 || index >= cards.length) {
      console.warn(`Invalid card index: ${index}`);
      return;
    }

    // Remove previous focus from all cards
    cards.forEach(card => {
      card.classList.remove('ring-2', 'ring-blue-500');
      card.setAttribute('tabindex', '-1');
    });

    // Add focus to current card
    const currentCard = cards[index];
    if (currentCard) {
      currentCard.classList.add('ring-2', 'ring-blue-500');
      currentCard.setAttribute('tabindex', '0');
      currentCard.focus();
    }
  }

  toggleDrawer(id) {
    const drawer = document.getElementById(`talent-drawer-${id}`);
    if (!drawer) return;
    
    drawer.classList.toggle('translate-x-full');
    drawer.classList.toggle('translate-x-0');
    document.body.classList.toggle('overflow-hidden');

    if (!drawer.classList.contains('translate-x-full')) {
      document.addEventListener('keydown', this.handleEscapeKey);
    } else {
      document.removeEventListener('keydown', this.handleEscapeKey);
    }
  }

  closeDrawer(id) {
    const drawer = document.getElementById(`talent-drawer-${id}`);
    if (!drawer) return;

    drawer.classList.add('translate-x-full');
    drawer.classList.remove('translate-x-0');
    document.body.classList.remove('overflow-hidden');
    document.removeEventListener('keydown', this.handleEscapeKey);
  }

  // Separate function to handle Escape key
  handleEscapeKey(event) {
    if (event.key === 'Escape') {
      // Find the open drawer for both job and talent pages
      const openJobDrawer = document.querySelector('[id^="job-drawer-"]:not(.translate-x-full)');
      const openTalentDrawer = document.querySelector('[id^="talent-drawer-"]:not(.translate-x-full)');
      
      if (openJobDrawer) {
        const drawerId = openJobDrawer.id.split('-')[2];
        this.closeJobDrawer(drawerId);
      }
      
      if (openTalentDrawer) {
        const drawerId = openTalentDrawer.id.split('-')[2];
        this.closeDrawer(drawerId);
      }
    }
  }

  toggleJobDrawer(id) {
    const drawer = document.getElementById(`job-drawer-${id}`);
    if (!drawer) return;
      
    drawer.classList.toggle('translate-x-full');
    drawer.classList.toggle('translate-x-0');

    // Prevent body scrolling when drawer is open
    document.body.classList.toggle('overflow-hidden');
  
     // Add event listener for Escape key
    if (!drawer.classList.contains('translate-x-full')) {
      document.addEventListener('keydown', this.handleEscapeKey);
    } else {
      document.removeEventListener('keydown', this.handleEscapeKey);
    }
  }
  
  closeJobDrawer(id) {
    const drawer = document.getElementById(`job-drawer-${id}`);
    if (!drawer) return;
  
    drawer.classList.add('translate-x-full');
    drawer.classList.remove('translate-x-0');

    // Re-enable body scrolling
    document.body.classList.remove('overflow-hidden');

    // Remove Escape key event listener
    document.removeEventListener('keydown', this.handleEscapeKey);
  }
}

const accessibilityInstance = new Accessibility();
window.toggleDrawer = (id) => accessibilityInstance.toggleDrawer(id);
window.closeDrawer = (id) => accessibilityInstance.closeDrawer(id);
window.toggleJobDrawer = (id) => accessibilityInstance.toggleJobDrawer(id);
window.closeJobDrawer = (id) => accessibilityInstance.closeJobDrawer(id);

export default Accessibility;