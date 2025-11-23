/**
 * assets/js/menu-products-mobile.js
 * Versión ajustada: fuerza clase products-open y hace repaint para que la animación se vea.
 * Reemplaza completamente el archivo en wp-content/themes/beslock-custom/assets/js/
 */
(function () {
  'use strict';

  var SELECTORS = {
    menuBtn: '#menuBtn, button.header__icon.header__icon--menu, .menu-toggle',
    mobileDrawer: '#mobileDrawer, nav.mobile-drawer',
    panel: '.mobile-drawer__panel',
    closeDrawer: '#closeDrawer, .mobile-drawer__close',
    backdrop: '#drawerBackdrop, .mobile-drawer__backdrop',
    productsToggle: '#productsToggle, .mobile-menu__link[id^="products"], .mobile-menu__link--products',
    productsPanel: '#productsPanel, .mobile-products-panel'
  };

  function $(sel) { try { return document.querySelector(sel); } catch (e) { return null; } }
  function find(selList) {
    return selList.split(',').map(function (s) { return s.trim(); }).reduce(function (acc, s) {
      return acc || $(s);
    }, null);
  }

  var menuBtn = find(SELECTORS.menuBtn);
  var mobileDrawer = find(SELECTORS.mobileDrawer);
  var panel = find(SELECTORS.panel);
  var closeDrawer = find(SELECTORS.closeDrawer);
  var backdrop = find(SELECTORS.backdrop);
  var productsToggle = find(SELECTORS.productsToggle);
  var productsPanel = find(SELECTORS.productsPanel);

  if (!mobileDrawer || !panel || !menuBtn || !backdrop) return;

  function prefersReducedMotion() {
    return window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }

  var scrollPos = 0;
  function lockScroll() {
    scrollPos = window.scrollY || document.documentElement.scrollTop || 0;
    document.documentElement.classList.add('has-drawer-open');
    document.body.style.position = 'fixed';
    document.body.style.top = '-' + scrollPos + 'px';
    document.body.style.width = '100%';
  }
  function unlockScroll() {
    document.documentElement.classList.remove('has-drawer-open');
    document.body.style.position = '';
    document.body.style.top = '';
    document.body.style.width = '';
    window.scrollTo(0, scrollPos || 0);
  }

  var focusableSelectors = [
    'a[href]',
    'area[href]',
    'input:not([disabled]):not([type=hidden])',
    'select:not([disabled])',
    'textarea:not([disabled])',
    'button:not([disabled])',
    'iframe',
    '[contenteditable]',
    '[tabindex]:not([tabindex^="-"])'
  ].join(',');

  var previousActiveElement = null;
  var removeFocusTrap = null;
  function trapFocus(container) {
    var nodes = Array.prototype.slice.call(container.querySelectorAll(focusableSelectors));
    if (!nodes.length) return function () {};
    var first = nodes[0], last = nodes[nodes.length - 1];
    function handler(e) {
      if (e.key === 'Tab') {
        if (e.shiftKey) {
          if (document.activeElement === first) {
            e.preventDefault();
            last.focus();
          }
        } else {
          if (document.activeElement === last) {
            e.preventDefault();
            first.focus();
          }
        }
      } else if (e.key === 'Escape' || e.key === 'Esc') {
        e.preventDefault();
        closeDrawerAction();
      }
    }
    container.addEventListener('keydown', handler);
    return function remove() { container.removeEventListener('keydown', handler); };
  }

  function ensurePanelBaseline() {
    try {
      panel.style.position = panel.style.position || 'fixed';
      panel.style.top = panel.style.top || '0';
      panel.style.left = panel.style.left || '0';
      panel.style.right = '';
      panel.style.height = '100vh';
      panel.style.zIndex = panel.style.zIndex || '1301';
      panel.style.willChange = 'transform, opacity';
      if (backdrop) {
        backdrop.style.position = backdrop.style.position || 'fixed';
        backdrop.style.inset = '0';
        backdrop.style.zIndex = backdrop.style.zIndex || '1220';
        backdrop.style.pointerEvents = backdrop.style.pointerEvents || 'none';
      }
    } catch (e) {}
  }

  var observer = null;
  function startObserver() {
    if (!window.MutationObserver) return;
    observer = new MutationObserver(function (mutations) {
      if (!mobileDrawer.classList.contains('is-open')) {
        try {
          var cs = window.getComputedStyle(panel);
          var t = cs && cs.transform ? cs.transform : null;
          if (t && (t === 'none' || t.indexOf('matrix(1, 0, 0, 1, 0, 0)') !== -1 || (t.indexOf('translate') !== -1 && t.indexOf('-') === -1))) {
            panel.style.transform = 'translate3d(-100%, 0, 0)';
          } else if (!t) {
            panel.style.transform = 'translate3d(-100%, 0, 0)';
          }
          if (backdrop) {
            backdrop.style.background = 'rgba(0,0,0,0)';
            backdrop.style.pointerEvents = 'none';
          }
        } catch (e) {}
      }
    });
    observer.observe(panel, { attributes: true, attributeFilter: ['style', 'class'] });
    observer.observe(mobileDrawer, { attributes: true, attributeFilter: ['class', 'aria-hidden'] });
  }
  function stopObserver() { if (observer) { observer.disconnect(); observer = null; } }

  // ---- Close button mode management ----
  function setCloseMode(mode) {
    if (!closeDrawer) return;
    closeDrawer.dataset.mode = mode;
    if (mode === 'back') {
      closeDrawer.innerHTML = '<i class="bi bi-arrow-left" aria-hidden="true"></i><span class="u-visually-hidden">Back</span>';
      closeDrawer.setAttribute('aria-label', 'Back to menu');
    } else {
      closeDrawer.innerHTML = '<i class="bi bi-x-lg" aria-hidden="true"></i><span class="u-visually-hidden">Close menu</span>';
      closeDrawer.setAttribute('aria-label', 'Close menu');
    }
  }

  function productsBackAction() {
    if (!productsPanel || !productsToggle) return;
    try {
      productsToggle.setAttribute('aria-expanded', 'false');
      productsPanel.setAttribute('aria-hidden', 'true');
      productsPanel.classList.remove('models--visible');
      productsPanel.classList.add('models--hidden');
      productsPanel.hidden = true;
    } catch (e) {}
    // show right arrow again
    try {
      var chevron = productsToggle && productsToggle.querySelector('.products-chevron');
      if (chevron) chevron.classList.remove('hidden');
    } catch (e) {}
    // remove sliding class so CSS moves panel out
    try { mobileDrawer.classList.remove('products-open'); } catch (e) {}
    setCloseMode('close');
    try { productsToggle.focus && productsToggle.focus({ preventScroll: true }); } catch (e) { try { menuBtn.focus(); } catch (er) {} }
  }

  // sanitize stray chevrons/text nodes (keeps robust)
  function sanitizeProductsToggle(node) {
    if (!node) return;
    var toRemove = [];
    for (var i = 0; i < node.childNodes.length; i++) {
      var ch = node.childNodes[i];
      if (ch.nodeType === Node.TEXT_NODE) {
        var t = ch.nodeValue.trim();
        if (/^[›»>→]+$/.test(t)) toRemove.push(ch);
      } else if (ch.nodeType === Node.ELEMENT_NODE) {
        var txt = (ch.textContent || '').trim();
        if (/^[›»>→]+$/.test(txt)) toRemove.push(ch);
        var cls = (ch.className || '').toLowerCase();
        if (cls.indexOf('indicator') !== -1 || cls.indexOf('chev') !== -1 || cls.indexOf('chevron') !== -1 || cls.indexOf('caret') !== -1) toRemove.push(ch);
      }
    }
    for (var j = 0; j < toRemove.length; j++) {
      try { toRemove[j].parentNode && toRemove[j].parentNode.removeChild(toRemove[j]); } catch (err) {}
    }
    try { if (node.getAttribute && node.getAttribute('data-indicator')) node.removeAttribute('data-indicator'); } catch (e) {}
  }

  // open/close drawer
  function openDrawer() {
    if (mobileDrawer.classList.contains('is-open')) return;
    previousActiveElement = document.activeElement;
    ensurePanelBaseline();
    menuBtn.setAttribute('aria-expanded', 'true');
    mobileDrawer.setAttribute('aria-hidden', 'false');
    mobileDrawer.classList.add('is-open');
    backdrop.classList.add('backdrop-visible');
    if (!prefersReducedMotion()) lockScroll(); else document.documentElement.classList.add('has-drawer-open');
    setCloseMode('close');
    var focusTarget = panel.querySelector('#closeDrawer') || panel.querySelector(focusableSelectors);
    if (focusTarget) {
      setTimeout(function () { try { focusTarget.focus({ preventScroll: true }); } catch (e) { focusTarget.focus(); } }, 60);
    }
    removeFocusTrap = trapFocus(panel);
    stopObserver();
  }

  function closeDrawerAction() {
    if (!mobileDrawer.classList.contains('is-open')) return;
    mobileDrawer.classList.remove('is-open');
    backdrop.classList.remove('backdrop-visible');
    try { menuBtn.setAttribute('aria-expanded', 'false'); } catch (e) {}
    mobileDrawer.setAttribute('aria-hidden', 'true');
    if (typeof removeFocusTrap === 'function') { removeFocusTrap(); removeFocusTrap = null; }
    var onTransitionEnd = function (ev) {
      if (ev && ev.propertyName && ev.propertyName.indexOf('transform') === -1) return;
      try { panel.removeEventListener('transitionend', onTransitionEnd); } catch (e) {}
      unlockScroll();
      try { if (previousActiveElement && typeof previousActiveElement.focus === 'function') previousActiveElement.focus({ preventScroll: true }); } catch (e) {}
      startObserver();
    };
    panel.addEventListener('transitionend', onTransitionEnd);
    setTimeout(function () {
      try { panel.removeEventListener('transitionend', onTransitionEnd); } catch (e) {}
      unlockScroll();
      try { if (previousActiveElement && typeof previousActiveElement.focus === 'function') previousActiveElement.focus({ preventScroll: true }); } catch (e) {}
      startObserver();
    }, 600);
  }

  // Products toggle init & behavior (slide + scroll)
  function initProductsToggle() {
    if (!productsToggle || !productsPanel) {
      productsToggle = $(SELECTORS.productsToggle);
      productsPanel = $(SELECTORS.productsPanel);
    }
    if (!productsToggle || !productsPanel) return;

    try {
      var hidden = productsPanel.hasAttribute('hidden') || productsPanel.classList.contains('models--hidden');
      productsPanel.hidden = !!hidden;
      productsPanel.setAttribute('aria-hidden', productsPanel.hidden ? 'true' : 'false');
      productsToggle.setAttribute('aria-expanded', productsPanel.hidden ? 'false' : 'true');
    } catch (e) {}

    // sanitize stray decorations
    try { sanitizeProductsToggle(productsToggle); } catch (e) {}

    // ensure right arrow icon we control
    try {
      var chevron = productsToggle.querySelector('.products-chevron');
      if (!chevron) {
        var span = document.createElement('span');
        span.className = 'products-chevron';
        span.innerHTML = '<i class="bi bi-arrow-right" aria-hidden="true"></i>';
        productsToggle.appendChild(span);
        chevron = span;
      }
      if (!productsPanel.hidden) chevron.classList.add('hidden'); else chevron.classList.remove('hidden');
    } catch (e) {}

    // replace node to clear old listeners
    try {
      var clone = productsToggle.cloneNode(true);
      productsToggle.parentNode.replaceChild(clone, productsToggle);
      productsToggle = clone;
    } catch (e) {}

    productsToggle.addEventListener('click', function (ev) {
      ev && ev.preventDefault();
      try {
        var expanded = productsToggle.getAttribute('aria-expanded') === 'true';
        var chev = productsToggle.querySelector('.products-chevron');

        if (expanded) {
          // close products: hide panel with slide-out
          productsToggle.setAttribute('aria-expanded', 'false');
          productsPanel.setAttribute('aria-hidden', 'true');
          productsPanel.classList.remove('models--visible');
          productsPanel.classList.add('models--hidden');
          productsPanel.hidden = true;
          if (chev) chev.classList.remove('hidden');

          // remove class to trigger slide-out
          mobileDrawer.classList.remove('products-open');
          // no need to force repaint when closing; the CSS handles transition
          setCloseMode('close');
        } else {
          // open products: slide panel in
          productsToggle.setAttribute('aria-expanded', 'true');
          productsPanel.setAttribute('aria-hidden', 'false');
          productsPanel.classList.add('models--visible');
          productsPanel.classList.remove('models--hidden');
          productsPanel.hidden = false;
          if (chev) chev.classList.add('hidden');

          // add class to trigger slide-in
          mobileDrawer.classList.add('products-open');

          // Force a small repaint to ensure transition starts reliably across browsers:
          // read layout then write style
          try { void productsPanel.offsetHeight; } catch (e) {}
          setCloseMode('back');

          // ensure productsPanel scrollTop at 0 (optional)
          try { productsPanel.scrollTop = 0; } catch (e) {}
        }
      } catch (e) {
        // fallback simple toggle
        productsPanel.hidden = !productsPanel.hidden;
        if (productsPanel.hidden) {
          mobileDrawer.classList.remove('products-open');
          if (chev) chev && chev.classList.remove('hidden');
          setCloseMode('close');
        } else {
          mobileDrawer.classList.add('products-open');
          if (chev) chev && chev.classList.add('hidden');
          setCloseMode('back');
        }
      }
    }, { passive: false });
  }

  // touch-only helper: blur on touch to avoid focus rectangle
  (function touchBlurHelper() {
    var isTouch = ('ontouchstart' in window) || navigator.maxTouchPoints > 0 || navigator.msMaxTouchPoints > 0;
    if (!isTouch) return;
    document.addEventListener('touchstart', function (ev) {
      try {
        var t = ev.target;
        var inside = t && t.closest && t.closest('#mobileDrawer');
        if (inside) {
          if (document.activeElement && document.activeElement !== document.body) {
            try { document.activeElement.blur && document.activeElement.blur(); } catch (e) {}
          }
          try { t.blur && t.blur(); } catch (e) {}
        }
      } catch (e) {}
    }, { passive: true, capture: true });

    document.addEventListener('click', function (ev) {
      try {
        var t = ev.target;
        var inside = t && t.closest && t.closest('#mobileDrawer');
        if (inside) {
          setTimeout(function () {
            try { if (document.activeElement && document.activeElement !== document.body) document.activeElement.blur(); } catch (e) {}
          }, 0);
        }
      } catch (e) {}
    }, true);
  })();

  // Attach closeDrawer handler (respects mode)
  function attachCloseDrawerHandler() {
    if (!closeDrawer) return;
    try {
      var cloned = closeDrawer.cloneNode(true);
      closeDrawer.parentNode.replaceChild(cloned, closeDrawer);
      closeDrawer = cloned;
    } catch (e) {}
    closeDrawer.addEventListener('click', function (e) {
      e && e.preventDefault && e.preventDefault();
      var mode = closeDrawer.dataset && closeDrawer.dataset.mode ? closeDrawer.dataset.mode : 'close';
      if (mode === 'back') {
        productsBackAction();
      } else {
        closeDrawerAction();
      }
    });
  }

  // Init
  function init() {
    ensurePanelBaseline();
    mobileDrawer.classList.remove('is-open');
    backdrop.classList.remove('backdrop-visible');
    mobileDrawer.setAttribute('aria-hidden', 'true');
    try { menuBtn.setAttribute('aria-expanded', 'false'); } catch (e) {}
    panel.style.transform = panel.style.transform || 'translate3d(-100%, 0, 0)';
    startObserver();

    try {
      var cloneMenu = menuBtn.cloneNode(true);
      menuBtn.parentNode.replaceChild(cloneMenu, menuBtn);
      menuBtn = cloneMenu;
    } catch (e) {}

    closeDrawer = find(SELECTORS.closeDrawer);
    attachCloseDrawerHandler();

    menuBtn.addEventListener('click', function (e) { e && e.preventDefault(); openDrawer(); });
    if (backdrop) backdrop.addEventListener('click', function (e) { e && e.preventDefault(); closeDrawerAction(); });

    window.addEventListener('keydown', function (e) {
      if ((e.key === 'Escape' || e.key === 'Esc') && mobileDrawer.classList.contains('is-open')) {
        e.preventDefault();
        closeDrawerAction();
      }
    });

    window.addEventListener('resize', function () {
      if (mobileDrawer.classList.contains('is-open') && !prefersReducedMotion()) lockScroll();
    });

    setTimeout(function () {
      if (!mobileDrawer.classList.contains('is-open')) {
        panel.style.transform = 'translate3d(-100%, 0, 0)';
        if (backdrop) {
          backdrop.style.background = 'rgba(0,0,0,0)';
          backdrop.style.pointerEvents = 'none';
        }
      }
      initProductsToggle();
      setCloseMode('close');
    }, 60);
  }

  if (document.readyState === 'complete' || document.readyState === 'interactive') {
    setTimeout(init, 30);
  } else {
    document.addEventListener('DOMContentLoaded', function () { setTimeout(init, 30); });
  }

  // Expose API
  window.beslock = window.beslock || {};
  window.beslock.drawer = window.beslock.drawer || {};
  window.beslock.drawer.open = function () { openDrawer(); };
  window.beslock.drawer.close = function () { closeDrawerAction(); };
  window.beslock.drawer.isOpen = function () { return mobileDrawer.classList.contains('is-open'); };

})();