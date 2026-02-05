document.addEventListener('DOMContentLoaded', function () {
  var menuBtn = document.getElementById('menu-btn');
  var mobileNav = document.getElementById('mobile-nav');

  if (menuBtn && mobileNav) {
    menuBtn.addEventListener('click', function () {
      mobileNav.classList.toggle('open');
    });
  }

  var heroWords = ['Social Events', 'Birthday', 'Anniversary', 'Wedding', 'Retreat', 'Venue Setup'];
  var rotating = document.getElementById('rotating-text');
  var idx = 0;

  if (rotating) {
    setInterval(function () {
      idx = (idx + 1) % heroWords.length;
      rotating.style.opacity = '0';
      rotating.style.transform = 'translateY(8px)';
      setTimeout(function () {
        rotating.textContent = heroWords[idx];
        rotating.style.opacity = '1';
        rotating.style.transform = 'translateY(0)';
      }, 230);
    }, 3000);
  }

  var contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();

      var name = document.getElementById('name').value.trim();
      var email = document.getElementById('email').value.trim();
      var message = document.getElementById('message').value.trim();
      var eventType = document.getElementById('eventType').value.trim();
      var eventDate = document.getElementById('eventDate').value;
      var eventLocation = document.getElementById('eventLocation').value.trim();
      var guestCount = document.getElementById('guestCount').value;
      var phoneEl = document.getElementById('phone');
      var phone = phoneEl ? phoneEl.value.trim() : '';

      if (!name || !email || !message || !eventType || !eventDate || !eventLocation || !guestCount) {
        alert('Please fill in all fields.');
        return;
      }

      var payload = encodeURIComponent(
"Hello CHOPLIFE EVENTS,\n" +
"I'm interested in your event planning services.\n\n" +
"Name: " + name + "\n" +
"Email: " + email + "\n" +
 (phone ? "Phone: " + phone + "\n" : "") +
"Event Type: " + eventType + "\n" +
"Date: " + eventDate + "\n" +
"Location: " + eventLocation + "\n" +
"Guests: " + guestCount + "\n\n" +
message
      );

      window.open('https://api.whatsapp.com/send?phone=+2348112188176&text=' + payload, '_blank');
      contactForm.reset();
    });
  }

  // Gallery: filters + lightbox (only runs on gallery.html)
  var galleryTiles = document.querySelectorAll('.gallery-tile');
  var filterBtns = document.querySelectorAll('[data-filter]');
  var lightbox = document.getElementById('lightbox');
  var lightboxImg = document.getElementById('lightboxImg');
  var lightboxTitle = document.getElementById('lightboxTitle');
  var lightboxCaption = document.getElementById('lightboxCaption');
  var lightboxClose = document.getElementById('lightboxClose');

  function setFilterActive(btn) {
    filterBtns.forEach(function (b) {
      b.classList.remove('active');
      b.setAttribute('aria-selected', 'false');
    });
    btn.classList.add('active');
    btn.setAttribute('aria-selected', 'true');
  }

  function applyFilter(filter) {
    galleryTiles.forEach(function (tile) {
      var cat = tile.getAttribute('data-category') || 'all';
      var show = filter === 'all' || cat === filter;
      if (show) {
        tile.removeAttribute('hidden');
      } else {
        tile.setAttribute('hidden', '');
      }
    });
  }

  if (filterBtns.length && galleryTiles.length) {
    filterBtns.forEach(function (btn) {
      btn.addEventListener('click', function () {
        var filter = btn.getAttribute('data-filter') || 'all';
        setFilterActive(btn);
        applyFilter(filter);
      });
    });
  }

  function openLightbox(tile) {
    if (!lightbox || !lightboxImg) return;

    var src = tile.getAttribute('data-src') || '';
    var title = tile.getAttribute('data-title') || 'Photo';
    var tag = tile.getAttribute('data-tag') || '';

    lightboxImg.src = src;
    lightboxImg.alt = title;
    if (lightboxTitle) lightboxTitle.textContent = title;
    if (lightboxCaption) lightboxCaption.textContent = tag ? ('Category: ' + tag) : '';

    lightbox.classList.add('open');
    lightbox.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    if (!lightbox || !lightboxImg) return;
    lightbox.classList.remove('open');
    lightbox.setAttribute('aria-hidden', 'true');
    lightboxImg.src = '';
    document.body.style.overflow = '';
  }

  if (galleryTiles.length) {
    galleryTiles.forEach(function (tile) {
      tile.addEventListener('click', function () {
        openLightbox(tile);
      });
    });
  }

  if (lightboxClose) {
    lightboxClose.addEventListener('click', closeLightbox);
  }

  if (lightbox) {
    lightbox.addEventListener('click', function (e) {
      if (e.target === lightbox) closeLightbox();
    });
  }

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && lightbox && lightbox.classList.contains('open')) {
      closeLightbox();
    }
  });
});
