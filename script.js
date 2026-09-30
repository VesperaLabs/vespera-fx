// This file is JavaScript - it's what makes a page DO things in response to actions,
// instead of just sitting there looking a certain way (that's CSS's job).

// We wait for the whole page to finish loading before running any of this.
// Otherwise the code might try to grab an element that doesn't exist yet.
document.addEventListener('DOMContentLoaded', () => {

  // Grab references to the lightbox pieces we'll need to control.
  // getElementById finds ONE element by its id="" attribute.
  const lightbox = document.getElementById('lightbox');
  const lightboxImage = document.getElementById('lightboxImage');
  const lightboxDownload = document.getElementById('lightboxDownload');
  const lightboxClose = document.getElementById('lightboxClose');
  const lightboxName = document.getElementById('lightboxName');
  const lightboxMeta = document.getElementById('lightboxMeta');

  // querySelectorAll finds EVERY element matching a CSS selector - here, every .card.
  const cards = document.querySelectorAll('.card');
  let lastFocusedCard = null;

  // A card is visually clickable already. These attributes make that action
  // available to keyboard and screen-reader users too.
  cards.forEach(card => {
    const label = card.querySelector('.label').textContent;
    card.setAttribute('role', 'button');
    card.setAttribute('tabindex', '0');
    card.setAttribute('aria-label', `Open ${label} wallpaper`);
  });

  // Lockscreen Preview Elements
  const lockscreenToggle = document.getElementById('lockscreenToggle');
  const lockscreenOverlay = document.getElementById('lockscreenOverlay');
  const lockscreenTime = document.getElementById('lockscreenTime');
  const lockscreenDate = document.getElementById('lockscreenDate');

  function updateLockscreenClock() {
    if (!lockscreenTime || !lockscreenDate) return;
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    lockscreenTime.textContent = `${hours}:${minutes}`;

    const options = { weekday: 'long', month: 'short', day: 'numeric' };
    lockscreenDate.textContent = now.toLocaleDateString('en-US', options);
  }

  if (lockscreenToggle && lockscreenOverlay) {
    updateLockscreenClock();

    lockscreenToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      const isActive = lockscreenOverlay.classList.toggle('active');
      lockscreenToggle.classList.toggle('active', isActive);
      lockscreenToggle.setAttribute('aria-pressed', isActive ? 'true' : 'false');
      const span = lockscreenToggle.querySelector('span');
      if (span) {
        span.textContent = isActive ? 'Hide Lock Screen' : 'Preview Lock Screen';
      }
    });
  }

  function openLightbox(card) {
    // Inside THIS card, find its image and its label text.
    const img = card.querySelector('img');
    const label = card.querySelector('.label').textContent;

    // The card shows a small thumbnail for fast loading, but the lightbox
    // needs the full-resolution original - that's stored in data-full.
    lightboxImage.src = img.dataset.full || img.src;
    updateLockscreenClock();
    lightboxImage.alt = img.alt;

    // Read the resolution and file size we stored on the card itself
    // (data-resolution and data-size attributes - see the HTML for these).
    lightboxName.textContent = label;
    lightboxMeta.textContent = card.dataset.resolution + ' · ' + card.dataset.size;

    // Point the download link at the same image, and give the downloaded
    // file a clean name based on the wallpaper's label instead of a random filename.
    lightboxDownload.href = img.dataset.full || img.src;
    lightboxDownload.setAttribute('download', label.replace(/\s+/g, '-').toLowerCase() + '.jpg');

    // Remember where the visitor came from, so closing the viewer returns
    // keyboard focus to that exact wallpaper card.
    lastFocusedCard = card;
    lightbox.classList.add('open');
    lightbox.setAttribute('aria-hidden', 'false');
    document.body.classList.add('lightbox-open');
    lightboxClose.focus();
  }

  function closeLightbox() {
    if (!lightbox.classList.contains('open')) return;

    lightbox.classList.remove('open');
    lightbox.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('lightbox-open');

    if (lockscreenOverlay) {
      lockscreenOverlay.classList.remove('active');
    }
    if (lockscreenToggle) {
      lockscreenToggle.classList.remove('active');
      lockscreenToggle.setAttribute('aria-pressed', 'false');
      const span = lockscreenToggle.querySelector('span');
      if (span) span.textContent = 'Preview Lock Screen';
    }

    if (lastFocusedCard && document.body.contains(lastFocusedCard)) {
      lastFocusedCard.focus();
    }
  }

  // .forEach runs the same code once for each card found above.
  cards.forEach(card => {
    card.addEventListener('click', () => openLightbox(card));

    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openLightbox(card);
      }
    });
  });

  // Clicking the X button closes the lightbox.
  lightboxClose.addEventListener('click', () => {
    closeLightbox();
  });

  // Clicking the dark background (but NOT the image itself) also closes it.
  // e.target is whatever element was actually clicked - we only close if
  // that's the lightbox background itself, not something inside it.
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) {
      closeLightbox();
    }
  });

  document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('open')) return;

    if (e.key === 'Escape') {
      closeLightbox();
    }

    // Keep Tab and Shift+Tab within the open viewer, rather than letting
    // focus move to controls hidden behind the overlay.
    if (e.key === 'Tab') {
      const focusable = [lightboxClose, lightboxDownload];
      const currentIndex = focusable.indexOf(document.activeElement);

      if (e.shiftKey && currentIndex <= 0) {
        e.preventDefault();
        lightboxDownload.focus();
      } else if (!e.shiftKey && currentIndex === focusable.length - 1) {
        e.preventDefault();
        lightboxClose.focus();
      }
    }
  });

  // --- Enhanced Search Bar & Filter Chips ---
  const searchBox = document.querySelector('.search-box');
  const searchInput = document.querySelector('.search-bar input');
  const searchClearBtn = document.getElementById('searchClear');
  const searchKbd = document.getElementById('searchKbd');
  const noResults = document.querySelector('.no-results');
  const filterChips = document.querySelectorAll('.chip');
  let activeCategory = 'all';

  function updateSearchState() {
    if (!searchBox || !searchInput) return;
    const hasText = searchInput.value.trim().length > 0;
    searchBox.classList.toggle('has-text', hasText);
  }

  function applyFilters() {
    const query = searchInput ? searchInput.value.trim().toLowerCase() : '';
    updateSearchState();
    let visibleCount = 0;

    cards.forEach(card => {
      const cardCategory = card.dataset.category || 'all';
      const label = card.querySelector('.label').textContent.toLowerCase();
      const altText = card.querySelector('img').alt.toLowerCase();

      const matchesCategory = activeCategory === 'all' || cardCategory === activeCategory;
      const matchesSearch = query === '' || label.includes(query) || altText.includes(query);

      const isVisible = matchesCategory && matchesSearch;
      card.style.display = isVisible ? '' : 'none';

      if (isVisible) {
        visibleCount++;
      }
    });

    if (noResults) {
      noResults.style.display = visibleCount === 0 ? 'block' : 'none';
      if (visibleCount === 0 && activeCategory !== 'all') {
        noResults.textContent = 'No wallpapers found in this category matching your search.';
      } else if (visibleCount === 0) {
        noResults.textContent = 'No wallpapers match your search.';
      }
    }
  }

  // Hook up category chips
  filterChips.forEach(chip => {
    chip.addEventListener('click', () => {
      filterChips.forEach(c => {
        c.classList.remove('active');
        c.setAttribute('aria-selected', 'false');
      });
      chip.classList.add('active');
      chip.setAttribute('aria-selected', 'true');
      activeCategory = chip.dataset.filter || 'all';
      applyFilters();
    });
  });

  // Hook up search input events
  if (searchInput) {
    searchInput.addEventListener('input', applyFilters);

    searchInput.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        if (searchInput.value.length > 0) {
          e.preventDefault();
          e.stopPropagation();
          searchInput.value = '';
          applyFilters();
        } else {
          searchInput.blur();
        }
      }
    });
  }

  // Clear button click
  if (searchClearBtn) {
    searchClearBtn.addEventListener('click', () => {
      if (searchInput) {
        searchInput.value = '';
        applyFilters();
        searchInput.focus();
      }
    });
  }

  // Keyboard shortcut badge click
  if (searchKbd) {
    searchKbd.addEventListener('click', () => {
      if (searchInput) {
        searchInput.focus();
      }
    });
  }

  // Global '/' keyboard shortcut to focus search
  document.addEventListener('keydown', (e) => {
    if (e.key === '/' && !lightbox?.classList.contains('open')) {
      const activeTag = document.activeElement ? document.activeElement.tagName.toLowerCase() : '';
      const isEditable = document.activeElement ? document.activeElement.isContentEditable : false;
      if (activeTag !== 'input' && activeTag !== 'textarea' && !isEditable) {
        e.preventDefault();
        if (searchInput) {
          searchInput.focus();
          searchInput.select();
          searchInput.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
      }
    }
  });

});
