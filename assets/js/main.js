/**
 * Beslock – Main JS (complete, improved mobile menu)
 *
 * Integrates:
 * - GSAP reveal
 * - IntersectionObserver lazy images
 * - Header behaviors (scrollRestoration control, pageshow, logo click)
 * - Mobile menu (idempotent handlers, focus-trap, scroll lock, swipe)
 * - Products panel
 *
 * Replace your existing /assets/js/main.js with this file (backup first).
 */
(function () {
  'use strict';

  // ===== Utilities =====
  var $ = function (sel, ctx) { return (ctx || document).querySelector(sel); };
  var $$ = function (sel, ctx) { return Array.prototype.slice.call((ctx || document).querySelectorAll(sel)); };
  var on = function (el, ev, fn, opts) { if (!el) return; el.addEventListener(ev, fn, opts || false); };
  var off = function (el, ev, fn, opts) { if (!el || !fn) return; el.removeEventListener(ev, fn, opts || false); };
  var once = function (el, ev, fn, opts) { if (!el) return; el.addEventListener(ev, fn, Object.assign({ once: true }, opts || {})); };

  // ===== Header behaviors =====
  function headerBehaviorsInit() {
    var SCROLL_THRESHOLD = 10;
    var header = $('.header');
    var logoAnchor = document.querySelector('.header__logo a') || document.querySelector('.header__logo');

    function updateHeader() {
      if (!header) return;
      if (window.scrollY > SCROLL_THRESHOLD) header.classList.add('header--scrolled');
      else header.classList.remove('header--scrolled');
    }

    function setScrollRestorationManualIfReload() {
      try {
        var navType = null;
        if (performance && performance.getEntriesByType) {
          var entries = performance.getEntriesByType('navigation');
          if (entries && entries[0] && entries[0].type) navType = entries[0].type;
        }
        if (navType === null && performance && performance.navigation) {
          navType = performance.navigation.type === 1 ? 'reload' : (performance.navigation.type === 2 ? 'back_forward' : 'navigate');
        }
        if (navType === 'reload' && 'scrollRestoration' in history) {
          history.scrollRestoration = 'manual';
        }
      } catch (e) {}
      window.scrollTo(0, 0);
    }

    function closeDrawerIfOpen() {
      var mobileDrawer = document.getElementById('mobileDrawer');
      var menuBtn = document.getElementById('menuBtn');
      if (!mobileDrawer) return;
      if (mobileDrawer.classList.contains('open')) {
        mobileDrawer.classList.remove('open');
        mobileDrawer.setAttribute('aria-hidden', 'true');
        document.body.classList.remove('drawer-no-scroll');
        if (menuBtn) menuBtn.setAttribute('aria-expanded', 'false');
        try { if (menuBtn) menuBtn.focus(); } catch (e) {}
      }
    }

    function hookLogo() {
      if (!logoAnchor) return;
      // remove previous if any
      if (logoAnchor._beslockLogoHandler) {
        off(logoAnchor, 'click', logoAnchor._beslockLogoHandler);
        delete logoAnchor._beslockLogoHandler;
      }
      logoAnchor._beslockLogoHandler = function (ev) {
        try { ev.preventDefault(); } catch (e) {}
        closeDrawerIfOpen();
        window.scrollTo(0, 0);
        updateHeader();
        var href = logoAnchor.getAttribute ? (logoAnchor.getAttribute('href') || logoAnchor.href) : (logoAnchor.href || '/');
        if (!href || href === '#' || href === window.location.href || href === window.location.pathname) {
          history.replaceState(null, '', window.location.pathname);
          return;
        }
        setTimeout(function () { window.location.href = href; }, 80);
      };
      on(logoAnchor, 'click', logoAnchor._beslockLogoHandler, { passive: true });
    }

    function onPageShow(e) {
      if (e && e.persisted) {
        window.scrollTo(0, 0);
      }
      updateHeader();
    }

    setScrollRestorationManualIfReload();
    updateHeader();
    on(window, 'scroll', function () { window.requestAnimationFrame(updateHeader); }, { passive: true });
    on(window, 'pageshow', onPageShow);
    hookLogo();
    on(window, 'beforeunload', function () {
      try { if ('scrollRestoration' in history) history.scrollRestoration = 'auto'; } catch (e) {}
    });
    console.log('main.js: header behaviors initialized');
  }

  // ===== Lazy images =====
  function initLazyImages() {
    var selector = 'img.lazyload, img[data-src]';
    var imgs = $$(selector);
    if (!imgs.length) return;

    function loadImage(img) {
      var dataSrcset = img.getAttribute('data-srcset');
      var dataSrc = img.getAttribute('data-src');
      if (dataSrcset) img.setAttribute('srcset', dataSrcset);
      if (dataSrc) img.setAttribute('src', dataSrc);
      img.classList.remove('lazyload');
    }

    if ('IntersectionObserver' in window) {
      var io = new IntersectionObserver(function (entries, observer) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            var img = entry.target;
            loadImage(img);
            observer.unobserve(img);
          }
        });
      }, { rootMargin: '200px 0px', threshold: 0.01 });

      imgs.forEach(function (i) { io.observe(i); });
    } else {
      imgs.forEach(function (img) { loadImage(img); });
    }
    console.log('main.js: lazy images init');
  }

  // ===== GSAP reveals =====
  function initGsapReveals() {
    if (window.gsap && window.ScrollTrigger) {
      try {
        gsap.registerPlugin(ScrollTrigger);
        gsap.utils.toArray('.reveal').forEach(function (el) {
          gsap.fromTo(el, { opacity: 0, y: 50 }, {
            opacity: 1, y: 0, duration: 1, ease: "power3.out",
            scrollTrigger: { trigger: el, start: "top 85%", toggleActions: "play none none reverse" }
          });
        });
        console.log('main.js: GSAP reveals initialized');
        return;
      } catch (e) {
        console.warn('main.js: GSAP failed, falling back', e);
      }
    }
    $$('.reveal').forEach(function (el) { el.style.opacity = 1; });
    console.log('main.js: GSAP not available, reveal fallback applied');
  }

  // ===== Mobile menu (idempotent) =====
  function mobileMenuInit() {
    // If another menu script is present (menu-products-mobile.js), skip init to avoid double handlers.
    if (document.querySelector('script[src*="menu-products-mobile"]') && !window.__beslock_force_main_menu_init) {
      console.log('mobileMenuInit: menu-products-mobile script present — skipping main menu init.');
      return;
    }

    var menuBtn = document.getElementById('menuBtn');
    var mobileDrawer = document.getElementById('mobileDrawer');
    var closeDrawer = document.getElementById('closeDrawer');
    var drawerBackdrop = document.getElementById('drawerBackdrop');

    if (!mobileDrawer || !menuBtn) {
      console.warn('main.js: mobileMenuInit aborted, #mobileDrawer or #menuBtn not found.');
      return;
    }

    // Mark that main.js initialized the menu to avoid re-init by other scripts.
    window.__beslock_menu_initialized = window.__beslock_menu_initialized || 'main';

    // cleanup previous handlers if any (idempotent)
    function removeStoredHandler(el, propName) {
      if (!el || !propName) return;
      var h = el[propName];
      if (h && typeof h === 'function') {
        try { off(el, h._evType || 'click', h); } catch (e) {}
        delete el[propName];
      }
    }

    // store multiple handlers mapping on element._beslockHandlers
    function storeHandler(el, key, evType, fn) {
      if (!el) return;
      // remove existing
      if (el._beslockHandlers && el._beslockHandlers[key]) {
        try { off(el, el._beslockHandlers[key]._evType || evType, el._beslockHandlers[key]); } catch (e) {}
      } else {
        el._beslockHandlers = el._beslockHandlers || {};
      }
      fn._evType = evType;
      el._beslockHandlers[key] = fn;
      on(el, evType, fn);
    }

    // focus trap helper
    function trapFocus(container) {
      var focusable = container.querySelectorAll('a, button, input, textarea, [tabindex]:not([tabindex="-1"])');
      if (!focusable || !focusable.length) return function () {};
      var first = focusable[0], last = focusable[focusable.length - 1];
      function handle(e) {
        if (e.key !== 'Tab') return;
        if (e.shiftKey) {
          if (document.activeElement === first) { e.preventDefault(); last.focus(); }
        } else {
          if (document.activeElement === last) { e.preventDefault(); first.focus(); }
        }
      }
      document.addEventListener('keydown', handle);
      return function () { document.removeEventListener('keydown', handle); };
    }

    var releaseTrap = function () {};
    var releaseTrapProducts = function () {};

    function openDrawer() {
      mobileDrawer.classList.add('open');
      mobileDrawer.setAttribute('aria-hidden', 'false');
      document.body.classList.add('drawer-no-scroll');
      if (menuBtn) menuBtn.setAttribute('aria-expanded', 'true');
      if (closeDrawer) try { closeDrawer.focus(); } catch (e) {}
      releaseTrap = trapFocus(mobileDrawer);
      console.log('main.js: mobile menu opened');
    }

    function closeDrawerFn() {
      mobileDrawer.classList.remove('open');
      mobileDrawer.setAttribute('aria-hidden', 'true');
      document.body.classList.remove('drawer-no-scroll');
      if (menuBtn) menuBtn.setAttribute('aria-expanded', 'false');
      try { if (menuBtn) menuBtn.focus(); } catch (e) {}
      if (typeof releaseTrap === 'function') releaseTrap();
      console.log('main.js: mobile menu closed');
    }

    // attach idempotent handlers with a small debounce to avoid touch->click double-fire
    var lastToggle = 0;
    var MIN_INTERVAL = 300;
    storeHandler(menuBtn, 'toggle', 'click', function (e) {
      e && e.preventDefault && e.preventDefault();
      var now = Date.now();
      if (now - lastToggle < MIN_INTERVAL) {
        return;
      }
      lastToggle = now;
      (mobileDrawer.classList.contains('open') ? closeDrawerFn() : openDrawer());
    });

    if (closeDrawer) {
      storeHandler(closeDrawer, 'close', 'click', function (e) { e && e.preventDefault && e.preventDefault(); closeDrawerFn(); });
    }
    if (drawerBackdrop) {
      storeHandler(drawerBackdrop, 'backdrop', 'click', function () { closeDrawerFn(); });
    }

    // ESC (idempotent)
    if (document._beslockEscHandler) {
      try { off(document, 'keydown', document._beslockEscHandler); } catch (e) {}
      delete document._beslockEscHandler;
    }
    document._beslockEscHandler = function (e) { if (e.key === 'Escape' && mobileDrawer.classList.contains('open')) closeDrawerFn(); };
    on(document, 'keydown', document._beslockEscHandler);

    // close when clicking normal links inside drawer (except inside #productsPanel)
    // remove previous link handlers
    if (mobileDrawer._linkHandlers && Array.isArray(mobileDrawer._linkHandlers)) {
      mobileDrawer._linkHandlers.forEach(function (obj) {
        try { off(obj.el, obj.ev, obj.fn); } catch (e) {}
      });
    }
    mobileDrawer._linkHandlers = [];
    mobileDrawer.querySelectorAll('a.mobile-menu__link, a.product-card').forEach(function (lnk) {
      var fn = function (ev) {
        if (ev.target && ev.target.closest && ev.target.closest('#productsPanel')) return;
        closeDrawerFn();
      };
      mobileDrawer._linkHandlers.push({ el: lnk, ev: 'click', fn: fn });
      on(lnk, 'click', fn);
    });

    // swipe-to-close (idempotent attach)
    // remove old handlers if present
    if (mobileDrawer._swipeHandlersAttached) {
      // nothing needed, handlers are passive; we'll reattach safely
    }
    (function () {
      var panel = mobileDrawer.querySelector('.mobile-drawer__panel');
      if (!panel) return;
      var startX = 0, startY = 0, tracking = false, deltaX = 0, deltaY = 0;
      // Remove old ones if stored
      if (panel._beslockTouchStart) {
        try { off(panel, 'touchstart', panel._beslockTouchStart); off(panel, 'touchmove', panel._beslockTouchMove); off(panel, 'touchend', panel._beslockTouchEnd); } catch (e) {}
      }
      panel._beslockTouchStart = function (ev) {
        if (!mobileDrawer.classList.contains('open')) return;
        if (!ev.touches || !ev.touches.length) return;
        startX = ev.touches[0].clientX;
        startY = ev.touches[0].clientY;
        tracking = true;
      };
      panel._beslockTouchMove = function (ev) {
        if (!tracking) return;
        if (!ev.touches || !ev.touches.length) return;
        deltaX = ev.touches[0].clientX - startX;
        deltaY = ev.touches[0].clientY - startY;
        if (Math.abs(deltaY) > Math.abs(deltaX)) { tracking = false; return; }
      };
      panel._beslockTouchEnd = function () {
        if (!tracking) return;
        tracking = false;
        var threshold = 60;
        if (deltaX < -threshold) closeDrawerFn();
        deltaX = 0; deltaY = 0;
      };
      on(panel, 'touchstart', panel._beslockTouchStart, { passive: true });
      on(panel, 'touchmove', panel._beslockTouchMove, { passive: true });
      on(panel, 'touchend', panel._beslockTouchEnd, { passive: true });
      mobileDrawer._swipeHandlersAttached = true;
    })();

    console.log('main.js: mobile menu initialized (idempotent)');
  }

  // ===== Products panel =====
  function productsPanelInit() {
    var productsToggle = document.getElementById('productsToggle');
    var productsPanel = document.getElementById('productsPanel');
    var productsBack = document.getElementById('productsBack');
    var productsClose = document.getElementById('productsClose');

    if (!productsToggle || !productsPanel) return;

    if (!productsPanel.hasAttribute('hidden')) {
      productsPanel.setAttribute('hidden', 'true');
      productsPanel.setAttribute('aria-hidden', 'true');
    }

    function show() {
      var menuContent = document.getElementById('menuContent');
      if (menuContent) { menuContent.setAttribute('aria-hidden', 'true'); menuContent.style.display = 'none'; }
      productsPanel.removeAttribute('hidden'); productsPanel.setAttribute('aria-hidden', 'false');
      if (productsBack) productsBack.focus();
      document.body.classList.add('drawer-no-scroll');
    }
    function hide() {
      productsPanel.setAttribute('hidden', 'true'); productsPanel.setAttribute('aria-hidden', 'true');
      var menuContent = document.getElementById('menuContent');
      if (menuContent) { menuContent.removeAttribute('aria-hidden'); menuContent.style.display = ''; }
      if (productsToggle) productsToggle.focus();
      document.body.classList.remove('drawer-no-scroll');
    }

    on(productsToggle, 'click', function (e) {
      e.preventDefault();
      var expanded = productsToggle.getAttribute('aria-expanded') === 'true';
      if (expanded) { productsToggle.setAttribute('aria-expanded', 'false'); hide(); }
      else { productsToggle.setAttribute('aria-expanded', 'true'); show(); }
    });
    if (productsBack) on(productsBack, 'click', hide);
    if (productsClose) on(productsClose, 'click', hide);

    console.log('main.js: products panel init (lightweight)');
  }

  // ===== Init sequence =====
  function initAll() {
    try { initGsapReveals(); } catch (e) { console.warn(e); }
    if ('requestIdleCallback' in window) requestIdleCallback(initLazyImages, { timeout: 1000 }); else setTimeout(initLazyImages, 300);
    try { headerBehaviorsInit(); } catch (e) { console.warn('header behaviors error', e); }
    try { mobileMenuInit(); } catch (e) { console.warn('mobile menu error', e); }
    try { productsPanelInit(); } catch (e) { console.warn('products panel error', e); }
    console.log('main.js: all modules initialized');
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () { setTimeout(initAll, 60); }, { once: true });
  } else {
    setTimeout(initAll, 60);
  }

})();
