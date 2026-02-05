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
});
