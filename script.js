/* ==========================================================================
   NEON FORGE — interactividad minima
   1. Menu movil
   2. Header con fondo al hacer scroll
   3. Scroll suave + enlace activo (scroll spy)
   4. Buscador desplegable
   5. Animaciones de aparicion
   6. Variantes de color del hero
   7. Botones de compra
   8. Validacion del formulario de contacto
   ========================================================================== */
(function () {
  'use strict';

  var header  = document.getElementById('siteHeader');
  var nav     = document.getElementById('mainNav');
  var burger  = document.getElementById('burger');
  var links   = Array.prototype.slice.call(document.querySelectorAll('.nav__link'));
  var sections = links
    .map(function (link) { return document.querySelector(link.getAttribute('href')); })
    .filter(Boolean);

  /* ------------------------------------------------ 1. Menu movil ------ */
  function closeMenu() {
    nav.classList.remove('is-open');
    burger.setAttribute('aria-expanded', 'false');
    document.body.classList.remove('is-locked');
  }

  burger.addEventListener('click', function () {
    var open = nav.classList.toggle('is-open');
    burger.setAttribute('aria-expanded', String(open));
    document.body.classList.toggle('is-locked', open);
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closeMenu();
  });

  /* --------------------------- 2 y 3. Header, scroll suave y spy ------- */
  links.forEach(function (link) {
    link.addEventListener('click', function () { closeMenu(); });
  });

  function onScroll() {
    header.classList.toggle('is-stuck', window.scrollY > 40);

    // enlace activo segun la seccion visible
    var offset = window.innerHeight * 0.35;
    var current = sections[0];
    sections.forEach(function (section) {
      if (section.getBoundingClientRect().top <= offset) current = section;
    });
    if (current) {
      links.forEach(function (link) {
        link.classList.toggle('is-active', link.getAttribute('href') === '#' + current.id);
      });
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ------------------------------------------- 4. Buscador ------------- */
  var searchToggle = document.getElementById('searchToggle');
  var searchBar    = document.getElementById('searchBar');
  var searchForm   = document.getElementById('searchForm');
  var searchInput  = document.getElementById('searchInput');
  var searchHint   = document.getElementById('searchHint');

  searchToggle.addEventListener('click', function () {
    var open = searchBar.hidden;
    searchBar.hidden = !open;
    searchToggle.setAttribute('aria-expanded', String(open));
    if (open) searchInput.focus();
  });

  searchForm.addEventListener('submit', function (e) {
    e.preventDefault();
    var term = searchInput.value.trim();
    if (!term) {
      searchHint.textContent = 'Escribe algo para buscar en el catalogo.';
      return;
    }
    searchHint.textContent = 'Mostrando resultados para "' + term + '" en la tienda.';
    document.getElementById('shop').scrollIntoView({ behavior: 'smooth' });
  });

  /* --------------------------------- 5. Animaciones de aparicion ------- */
  var revealables = document.querySelectorAll('.reveal');

  if ('IntersectionObserver' in window) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -60px 0px' });

    revealables.forEach(function (el, i) {
      el.style.transitionDelay = (i % 4) * 90 + 'ms';
      observer.observe(el);
    });
  } else {
    revealables.forEach(function (el) { el.classList.add('is-visible'); });
  }

  /* ------------------------------ 6. Variantes de color del hero ------- */
  var heroHoodie = document.querySelector('.hoodie--hero');
  var swatches   = document.querySelectorAll('[data-neon]');

  swatches.forEach(function (swatch) {
    // el propio thumbnail se pinta con su color
    swatch.style.setProperty('--neon', swatch.dataset.neon);
    swatch.style.setProperty('--neon-2', swatch.dataset.neon2);

    swatch.addEventListener('click', function () {
      heroHoodie.style.setProperty('--neon', swatch.dataset.neon);
      heroHoodie.style.setProperty('--neon-2', swatch.dataset.neon2);
    });
  });

  /* -------------------------------------- 7. Botones de compra --------- */
  var shopNote = document.getElementById('shopNote');
  var cartCount = 0;

  document.querySelectorAll('.js-buy').forEach(function (btn) {
    btn.addEventListener('click', function () {
      cartCount++;
      shopNote.textContent = '"' + btn.dataset.name + '" anadido. Tu carrito tiene ' +
        cartCount + (cartCount === 1 ? ' pieza.' : ' piezas.');
    });
  });

  /* ------------------------------- 8. Formulario de contacto ----------- */
  var form   = document.getElementById('contactForm');
  var status = document.getElementById('formStatus');

  function setError(field, message) {
    var wrapper = field.closest('.field');
    wrapper.classList.add('has-error');
    if (!wrapper.querySelector('.field__error')) {
      var span = document.createElement('span');
      span.className = 'field__error';
      span.textContent = message;
      wrapper.appendChild(span);
    }
  }

  function clearError(field) {
    var wrapper = field.closest('.field');
    wrapper.classList.remove('has-error');
    var span = wrapper.querySelector('.field__error');
    if (span) span.remove();
  }

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    var name    = form.elements.name;
    var email   = form.elements.email;
    var message = form.elements.message;
    var valid   = true;

    [name, email, message].forEach(clearError);

    if (!name.value.trim()) { setError(name, 'Indica tu nombre.'); valid = false; }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email.value.trim())) {
      setError(email, 'Introduce un email valido.');
      valid = false;
    }
    if (message.value.trim().length < 10) {
      setError(message, 'Cuentanos un poco mas (minimo 10 caracteres).');
      valid = false;
    }

    if (!valid) {
      status.textContent = 'Revisa los campos marcados antes de enviar.';
      status.classList.add('is-error');
      return;
    }

    status.classList.remove('is-error');
    status.textContent = 'Gracias, ' + name.value.trim() + '. Te respondemos en menos de 24 h.';
    form.reset();
  });

})();
