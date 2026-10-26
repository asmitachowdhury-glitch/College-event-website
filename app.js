/* ==========================================================
   Innovación 2026 - IEM Kolkata JavaScript Interactivity
   ========================================================== */

document.addEventListener('DOMContentLoaded', () => {

  // Feature 1 & 2: Dynamic Event Category Filter & Search Box
  const searchInput = document.getElementById('eventSearch');
  const filterBtns = document.querySelectorAll('.filter-btn');
  const eventCards = document.querySelectorAll('.event-card');
  const noEventsMsg = document.getElementById('noEventsMsg');

  let activeCategory = 'all';
  let searchQuery = '';

  function filterEvents() {
    let visibleCount = 0;

    eventCards.forEach(card => {
      const category = card.getAttribute('data-category');
      const title = card.querySelector('h3').textContent.toLowerCase();
      const desc = card.querySelector('.event-desc').textContent.toLowerCase();

      const matchesCategory = (activeCategory === 'all' || category === activeCategory);
      const matchesSearch = title.includes(searchQuery) || desc.includes(searchQuery);

      if (matchesCategory && matchesSearch) {
        card.classList.remove('hidden');
        visibleCount++;
      } else {
        card.classList.add('hidden');
      }
    });

    if (visibleCount === 0) {
      noEventsMsg.classList.remove('hidden');
    } else {
      noEventsMsg.classList.add('hidden');
    }
  }

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      activeCategory = btn.getAttribute('data-filter');
      filterEvents();
    });
  });

  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      searchQuery = e.target.value.toLowerCase().trim();
      filterEvents();
    });
  }


  // Feature 3: Student Registration Form & Dynamic Pass Generator
  const regForm = document.getElementById('registrationForm');
  const ticketModal = document.getElementById('ticketModal');
  const closeTicketModal = document.getElementById('closeTicketModal');
  const ticketDetails = document.getElementById('ticketDetails');
  const eventSelect = document.getElementById('eventSelect');

  // Autofill event when clicking "Register" button on event cards
  const eventRegBtns = document.querySelectorAll('.event-reg-btn');
  eventRegBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const eventName = btn.getAttribute('data-event');
      if (eventName && eventSelect) {
        eventSelect.value = eventName;
      }
    });
  });

  if (regForm) {
    regForm.addEventListener('submit', (e) => {
      e.preventDefault();

      // Reset errors
      document.querySelectorAll('.error-text').forEach(el => el.textContent = '');

      const fullName = document.getElementById('fullName').value.trim();
      const studentId = document.getElementById('studentId').value.trim();
      const email = document.getElementById('email').value.trim();
      const department = document.getElementById('department').value;
      const selectedEvent = eventSelect.value;
      const terms = document.getElementById('termsCheck').checked;

      let isValid = true;

      if (!fullName) {
        document.getElementById('nameError').textContent = 'Name is required.';
        isValid = false;
      }

      if (!studentId) {
        document.getElementById('idError').textContent = 'Roll/Enrollment No is required.';
        isValid = false;
      }

      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!email || !emailPattern.test(email)) {
        document.getElementById('emailError').textContent = 'Enter a valid email address.';
        isValid = false;
      }

      if (!department) {
        document.getElementById('deptError').textContent = 'Please select department.';
        isValid = false;
      }

      if (!selectedEvent) {
        document.getElementById('eventError').textContent = 'Please select an event.';
        isValid = false;
      }

      if (!terms) {
        document.getElementById('termsError').textContent = 'Please accept campus rules.';
        isValid = false;
      }

      if (isValid) {
        const passId = 'INNO-' + Math.floor(100000 + Math.random() * 900000);
        
        ticketDetails.innerHTML = `
          <div class="ticket-row">
            <span class="ticket-label">Pass ID:</span>
            <span class="ticket-value">${passId}</span>
          </div>
          <div class="ticket-row">
            <span class="ticket-label">Student Name:</span>
            <span class="ticket-value">${fullName}</span>
          </div>
          <div class="ticket-row">
            <span class="ticket-label">Roll/ID:</span>
            <span class="ticket-value">${studentId}</span>
          </div>
          <div class="ticket-row">
            <span class="ticket-label">Dept/College:</span>
            <span class="ticket-value">${department}</span>
          </div>
          <div class="ticket-row">
            <span class="ticket-label">Event:</span>
            <span class="ticket-value">${selectedEvent}</span>
          </div>
          <div class="ticket-row">
            <span class="ticket-label">Venue:</span>
            <span class="ticket-value">IEM Kolkata Campus</span>
          </div>
        `;

        ticketModal.classList.add('open');
        regForm.reset();
      }
    });
  }

  if (closeTicketModal) {
    closeTicketModal.addEventListener('click', () => {
      ticketModal.classList.remove('open');
    });
  }


  // Feature 4: Gallery Lightbox Viewer
  const galleryItems = document.querySelectorAll('.gallery-item');
  const galleryModal = document.getElementById('galleryModal');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxCaption = document.getElementById('lightboxCaption');
  const closeGalleryModal = document.getElementById('closeGalleryModal');

  galleryItems.forEach(item => {
    item.addEventListener('click', () => {
      const img = item.querySelector('img');
      const caption = item.getAttribute('data-caption');

      if (img && galleryModal) {
        lightboxImg.src = img.src;
        lightboxCaption.textContent = caption || 'IEM Fest Photo';
        galleryModal.classList.add('open');
      }
    });
  });

  if (closeGalleryModal) {
    closeGalleryModal.addEventListener('click', () => {
      galleryModal.classList.remove('open');
    });
  }


  // Feature 5: FAQ Accordion System
  const faqHeaders = document.querySelectorAll('.faq-header');

  faqHeaders.forEach(header => {
    header.addEventListener('click', () => {
      const faqItem = header.parentElement;
      const isOpen = faqItem.classList.contains('active');

      document.querySelectorAll('.faq-item').forEach(item => item.classList.remove('active'));

      if (!isOpen) {
        faqItem.classList.add('active');
      }
    });
  });


  // Feature 6: Mobile Menu & Scrollspy Highlighting
  const mobileToggle = document.getElementById('mobileToggle');
  const navLinks = document.getElementById('navLinks');
  const navItems = document.querySelectorAll('.nav-item');
  const sections = document.querySelectorAll('section');

  if (mobileToggle) {
    mobileToggle.addEventListener('click', () => {
      navLinks.classList.toggle('open');
    });
  }

  navItems.forEach(item => {
    item.addEventListener('click', () => {
      if (navLinks.classList.contains('open')) {
        navLinks.classList.remove('open');
      }
    });
  });

  window.addEventListener('scroll', () => {
    let currentSectionId = '';

    sections.forEach(section => {
      const sectionTop = section.offsetTop - 120;
      const sectionHeight = section.offsetHeight;

      if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
        currentSectionId = section.getAttribute('id');
      }
    });

    navItems.forEach(item => {
      item.classList.remove('active');
      if (item.getAttribute('href') === `#${currentSectionId}`) {
        item.classList.add('active');
      }
    });
  });

  window.addEventListener('click', (e) => {
    if (e.target === ticketModal) ticketModal.classList.remove('open');
    if (e.target === galleryModal) galleryModal.classList.remove('open');
  });

});