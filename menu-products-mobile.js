/* Enhanced mobile menu (drawer)
   - focus trap
   - body scroll lock via class .drawer-no-scroll
   - swipe-to-close (touch)
   - robust init (DOMContentLoaded)
*/
(function () {
  'use strict';

  // Small util to get theme base (from wp_localize_script or data attribute)
  function themeBase() {
    try {
      if (window.beslockTheme && beslockTheme.themeBase) return beslockTheme.themeBase.replace(/\/$/, '');
      var drawer = document.getElementById('mobileDrawer');
      if (drawer && drawer.getAttribute('data-theme-base')) return drawer.getAttribute('data-theme-base').replace(/\/$/, '');
    } catch (e) {}
    return window.location.origin + '/wp-content/themes/beslock-custom';
  }

  function trapFocus(container) {
    var focusable = container.querySelectorAll('a, button, input, textarea, [tabindex]:not([tabindex="-1"])');
    if (!focusable.length) return function () {};
    var first = focusable[0], last = focusable[focusable.length - 1];
    function handle(e) {
      if (e.key !== 'Tab') return;
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
    }
    document.addEventListener('keydown', handle);
    return function () { document.removeEventListener('keydown', handle); };
  }

  function init() {
    var menuBtn = document.getElementById('menuBtn');
    var mobileDrawer = document.getElementById('mobileDrawer');
    var closeDrawer = document.getElementById('closeDrawer');
    var drawerBackdrop = document.getElementById('drawerBackdrop');

    if (!mobileDrawer) {
      console.warn('menu-products-mobile: #mobileDrawer not found — abort init');
      return;
    }

    var productsToggle = document.getElementById('productsToggle'); // may be null
    var productsPanel = document.getElementById('productsPanel'); // optional panel
    var productsList = document.getElementById('productsList'); // optional list

    // Ensure panel hidden by default
    if (productsPanel && !productsPanel.hasAttribute('hidden')) {
      productsPanel.setAttribute('hidden', 'true');
      productsPanel.setAttribute('aria-hidden', 'true');
    }

    var releaseTrap = function () {};
    var releaseTrapProducts = function () {};

    // Open / close
    function openDrawer() {
      mobileDrawer.classList.add('open');
      mobileDrawer.setAttribute('aria-hidden', 'false');
      document.body.classList.add('drawer-no-scroll');
      if (menuBtn) menuBtn.setAttribute('aria-expanded', 'true');
      if (closeDrawer) closeDrawer.focus();
      releaseTrap = trapFocus(mobileDrawer);
      // small aria announce
      mobileDrawer.setAttribute('data-opened-at', Date.now());
      console.log('menu-products-mobile: drawer opened');
    }

    function closeDrawerFn() {
      mobileDrawer.classList.remove('open');
      mobileDrawer.setAttribute('aria-hidden', 'true');
      document.body.classList.remove('drawer-no-scroll');
      if (menuBtn) menuBtn.setAttribute('aria-expanded', 'false');
      try { if (menuBtn) menuBtn.focus(); } catch (e) {}
      if (typeof releaseTrap === 'function') releaseTrap();
      // if products panel open, hide it
      if (productsPanel && !productsPanel.hasAttribute('hidden')) {
        hideProductsPanel(true);
      }
      console.log('menu-products-mobile: drawer closed');
    }

    if (menuBtn) menuBtn.addEventListener('click', function (e) {
      e.preventDefault();
      if (mobileDrawer.classList.contains('open')) closeDrawerFn(); else openDrawer();
    });

    if (closeDrawer) closeDrawer.addEventListener('click', function (e) { e.preventDefault(); closeDrawerFn(); });
    if (drawerBackdrop) drawerBackdrop.addEventListener('click', function () { closeDrawerFn(); });

    // ESC to close drawer or products panel
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') {
        if (productsPanel && !productsPanel.hasAttribute('hidden')) {
          hideProductsPanel();
        } else if (mobileDrawer && mobileDrawer.classList.contains('open')) {
          closeDrawerFn();
        }
      }
    });

    // Close drawer when clicking normal links inside menu (but not when clicking product links that will navigate after panel hides)
    (function linkClose() {
      var links = mobileDrawer.querySelectorAll('a.mobile-menu__link, a.product-card');
      links.forEach(function (lnk) {
        lnk.addEventListener('click', function (ev) {
          // if clicking inside productsPanel, ignore (we handle product clicks separately)
          if (ev.target && ev.target.closest && ev.target.closest('#productsPanel')) return;
          // allow navigation but close drawer immediately
          closeDrawerFn();
        });
      });
    })();

    // Products panel show/hide (if present)
    function showProductsPanel() {
      if (!productsPanel) return;
      // hide main menu content if exists
      var menuContent = document.getElementById('menuContent');
      if (menuContent) { menuContent.setAttribute('aria-hidden', 'true'); menuContent.style.display = 'none'; }
      productsPanel.removeAttribute('hidden');
      productsPanel.setAttribute('aria-hidden', 'false');
      if (!mobileDrawer.classList.contains('open')) openDrawer();
      if (productsPanel) productsPanel.scrollTop = 0;
      releaseTrapProducts = trapFocus(productsPanel);
      document.body.classList.add('drawer-no-scroll');
      console.log('menu-products-mobile: products panel shown');
    }

    function hideProductsPanel(forceHide, cb) {
      if (!productsPanel) { if (typeof cb === 'function') cb(); return; }
      productsPanel.setAttribute('hidden', 'true');
      productsPanel.setAttribute('aria-hidden', 'true');

      var menuContent = document.getElementById('menuContent');
      if (menuContent) { menuContent.removeAttribute('aria-hidden'); menuContent.style.display = ''; }

      if (typeof releaseTrapProducts === 'function') releaseTrapProducts();
      if (productsToggle) productsToggle.focus();
      if (forceHide) {
        if (typeof cb === 'function') setTimeout(cb, 160);
      }
      console.log('menu-products-mobile: products panel hidden');
    }

    if (productsToggle) {
      productsToggle.addEventListener('click', function (e) {
        e.preventDefault();
        var expanded = productsToggle.getAttribute('aria-expanded') === 'true';
        if (expanded) { productsToggle.setAttribute('aria-expanded', 'false'); hideProductsPanel(); }
        else { productsToggle.setAttribute('aria-expanded', 'true'); showProductsPanel(); }
      });
    }

    // Touch handling: swipe left to close (when panel open)
    (function addSwipeToClose() {
      var panel = mobileDrawer.querySelector('.mobile-drawer__panel');
      if (!panel) return;
      var startX = 0, startY = 0, now = 0, deltaX = 0, deltaY = 0, tracking = false;

      panel.addEventListener('touchstart', function (ev) {
        if (!mobileDrawer.classList.contains('open')) return;
        if (!ev.touches || !ev.touches.length) return;
        startX = ev.touches[0].clientX;
        startY = ev.touches[0].clientY;
        tracking = true;
      }, { passive: true });

      panel.addEventListener('touchmove', function (ev) {
        if (!tracking) return;
        if (!ev.touches || !ev.touches.length) return;
        deltaX = ev.touches[0].clientX - startX;
        deltaY = ev.touches[0].clientY - startY;
        // if user primarily scrolling vertically, bail out
        if (Math.abs(deltaY) > Math.abs(deltaX)) { tracking = false; return; }
      }, { passive: true });

      panel.addEventListener('touchend', function () {
        if (!tracking) return;
        tracking = false;
        // if swipe left beyond threshold (negative deltaX)
        var threshold = 60; // px
        if (deltaX < -threshold) {
          closeDrawerFn();
        }
        deltaX = 0; deltaY = 0;
      });
    })();

    // Debug log
    console.log('menu-products-mobile: init complete. themeBase=', themeBase());
  } // end init

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init, { once: true });
  } else {
    init();
  }

})();