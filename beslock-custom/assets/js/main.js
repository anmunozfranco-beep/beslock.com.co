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
    // Hysteresis thresholds to prevent flicker when user scrolls around the boundary.
    // Enter threshold = when we add the scrolled class; Exit threshold = when we remove it.
    var ENTER_THRESHOLD = 28; // px scrolled before applying shrink state
    var EXIT_THRESHOLD = 12;  // px scrolled below this removes the shrink state
    var isScrolled = header && header.classList.contains('header--scrolled');
    var logoAnchor = document.querySelector('.header__logo a') || document.querySelector('.header__logo');

    function updateHeader() {
      if (!header) return;
      var y = window.scrollY || window.pageYOffset || 0;
      // Only toggle when crossing thresholds to avoid rapid on/off when user
      // is hovering near the trigger point.
      if (!isScrolled && y > ENTER_THRESHOLD) {
        header.classList.add('header--scrolled');
        isScrolled = true;
      } else if (isScrolled && y < EXIT_THRESHOLD) {
        header.classList.remove('header--scrolled');
        isScrolled = false;
      }
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

/* === HERO BESLOCK LOGIC (appended) === */
(function () {
  'use strict';
  var H = {
    slideCount: 6,
    slideDuration: 8000,
    // Start overlay animation immediately at 0s so the overlay fades in smoothly
    // as the video plays (user requested overlay starting at second 0).
    overlayStartAt: 0,
    resistanceFactor: 0.3,
    swipeThreshold: 50
  };

  function $q(sel, ctx){ return (ctx||document).querySelector(sel); }
  function $qa(sel, ctx){ return Array.prototype.slice.call((ctx||document).querySelectorAll(sel)); }

  function HeroInit(selector){
    var root = typeof selector === 'string' ? document.querySelector(selector) : selector;
    if (!root) return null;
    var slides = $qa('.hero-slide', root);
    var dots = $qa('.hero-dot', root);
    var loader = $q('.beslock-loader', root);
    var current = 0, timer = null, isPlaying = false, overlayTimeouts = [];

    // Loader image is handled by template (favicon); no inline SVG injection needed.

    function waitFirst(){
      return new Promise(function(resolve){
        var v = slides[0] && slides[0].querySelector('.slide-video');
        if (!v) return resolve();
        // Prefer waiting until the video is actually playing (frames decoded)
        // because some browsers fire `canplaythrough` early but rendering may
        // not progress until the element receives a real `playing` signal.
        if (v.readyState >= 4) return resolve();
        var t = setTimeout(function(){ cleanup(); resolve(); }, 7000);
        function cleanup(){ try{ v.removeEventListener('playing', onPlaying); v.removeEventListener('canplaythrough', onCanplay); }catch(e){} clearTimeout(t); }
        function onPlaying(){ cleanup(); resolve(); }
        function onCanplay(){
          // try to nudge playback — some engines need a .play() call to start
          try{ v.play().catch(function(){}); }catch(e){}
        }
        v.addEventListener('playing', onPlaying, { once:true });
        v.addEventListener('canplaythrough', onCanplay, { once:true });
        // try an initial play attempt to encourage rendering (muted allows autoplay)
        try{ v.play().catch(function(){}); }catch(e){}
      });
    }

    function showSlide(idx, opts){
      opts = opts||{}; idx = (idx + slides.length) % slides.length; current = idx;
      // clear overlay timers and remove any attached timeupdate listeners
      if (Array.isArray(overlayTimeouts)) {
        overlayTimeouts.forEach(function(t){ try{ clearTimeout(t); }catch(e){} });
        overlayTimeouts = [];
      }
      // remove any per-overlay timeupdate handlers and loop watchers left on previous videos
      slides.forEach(function(s){
        var pv = s.querySelector('.slide-video'); if (!pv) return;
        s.querySelectorAll('.slide-overlay').forEach(function(o){ try{ if (o._ontime) { pv.removeEventListener('timeupdate', o._ontime); delete o._ontime; } }catch(e){} });
        try{ if (pv._loopWatcher) { pv.removeEventListener('timeupdate', pv._loopWatcher); delete pv._loopWatcher; delete pv._lastCurrent; } }catch(e){}
      });
      slides.forEach(function(s,i){
        if (i===idx){ s.classList.add('is-active'); s.setAttribute('aria-hidden','false'); }
        else { s.classList.remove('is-active'); s.setAttribute('aria-hidden','true'); }
      });
      dots.forEach(function(d,i){ d.classList.toggle('is-active', i===idx); d.setAttribute('aria-selected', i===idx? 'true':'false'); });
      // play video for current, pause others. Avoid resetting currentTime for
      // videos that were intentionally set to preload="none" to prevent
      // forcing a download.
      slides.forEach(function(s,i){
        var v = s.querySelector('.slide-video'); if (!v) return;
        if (i === idx) {
          try {
            // ensure sources/metadata are loaded before playing; calling load
            // is safe and helps some browsers to begin decoding frames.
            if (typeof v.readyState === 'number' && v.readyState < 3) {
              try { v.load(); } catch (e) {}
            }
            v.play().catch(function(){
              // if the first play fails, attempt a load then a second play
              try { if (v.readyState < 3) v.load(); v.play().catch(function(){}); } catch (e) {}
            });
          } catch (e) {}
        } else {
          try { v.pause(); if (v.getAttribute('preload') !== 'none') { v.currentTime = 0; } } catch (e) {}
        }
      });
      // overlay show logic - support multiple overlays per slide, each may have a data-start attribute
      var sl = slides[idx];
      // Inject video sources for deferred slides on demand (network-aware)
      function injectSourcesForVideo(v, opts){
        if (!v) return;
        if (v._sourcesInjected) return;
        try{
          var conn = navigator.connection || navigator.mozConnection || navigator.webkitConnection || null;
          var effectiveType = conn && conn.effectiveType;
          var downlink = conn && conn.downlink;
          var slow = (effectiveType && (effectiveType.indexOf('2g') !== -1 || effectiveType === 'slow-2g')) || (downlink && downlink < 1.5);
          var prefer480 = slow || (window.innerWidth && window.innerWidth < 900);
          var res = prefer480 ? '480' : '720';
          // prefer WebM when available
          var webm = v.getAttribute('data-webm-' + res);
          var mp4 = v.getAttribute('data-mp4-' + res) || v.getAttribute('data-mp4');
          // if neither webm nor mp4 for chosen res, try the other res as fallback
          if (!webm && !mp4) {
            var other = (res === '720') ? '480' : '720';
            webm = v.getAttribute('data-webm-' + other) || webm;
            mp4 = v.getAttribute('data-mp4-' + other) || mp4;
          }
          // create source elements in preferred order
          if (webm) {
            var s = document.createElement('source'); s.src = webm; s.type = 'video/webm'; v.appendChild(s);
          }
          if (mp4) {
            var s2 = document.createElement('source'); s2.src = mp4; s2.type = 'video/mp4'; v.appendChild(s2);
          }
          // mark and trigger load only if we actually added sources
          v._sourcesInjected = true;
          // set preload strategy: active slide -> auto, prefetched -> metadata
          if (opts && opts.preload) v.setAttribute('preload', opts.preload);
          try { v.setAttribute('fetchpriority', (opts && opts.priority) || 'auto'); } catch(e){}
          try { v.load(); } catch(e){}
        }catch(e){}
      }
      // helper to activate one overlay and immediately hide the others in the same slide
      function activateOverlay(targetOverlay) {
        try {
          var siblings = Array.prototype.slice.call(sl.querySelectorAll('.slide-overlay'));
          siblings.forEach(function(s){ if (s !== targetOverlay) s.classList.remove('overlay--visible'); });
          targetOverlay.classList.add('overlay--visible');
        } catch (e) {}
      }
      if (sl){
        var vid = sl.querySelector('.slide-video');
        // ensure video sources are injected for current slide
        if (vid) injectSourcesForVideo(vid, { preload: 'auto', priority: 'high' });
        // prefetch next slide's video sources (metadata only)
        try{
          var nextIdx = (idx + 1) % slides.length;
          var nextSlide = slides[nextIdx];
          if (nextSlide){ var nextVid = nextSlide.querySelector('.slide-video'); if (nextVid) injectSourcesForVideo(nextVid, { preload: 'metadata', priority: 'low' }); }
        }catch(e){}
        var ovs = Array.prototype.slice.call(sl.querySelectorAll('.slide-overlay'));
        // Ensure overlays start hidden when (re)showing the slide so transitions run on each loop
        ovs.forEach(function(o){ o.classList.remove('overlay--visible'); });
        if (vid && ovs.length){
          // attach a loop watcher to reset overlays when the video loops internally
          if (!vid._loopWatcher) {
            vid._lastCurrent = typeof vid.currentTime === 'number' ? vid.currentTime : 0;
            vid._loopWatcher = function(){
              try{
                if (typeof vid._lastCurrent === 'number' && vid.currentTime < 0.2 && vid._lastCurrent > vid.currentTime + 0.5) {
                  // video looped: hide overlays and reattach per-overlay listeners
                  var curOvs = Array.prototype.slice.call(sl.querySelectorAll('.slide-overlay'));
                  curOvs.forEach(function(o){ o.classList.remove('overlay--visible'); try{ if (o._ontime) { vid.removeEventListener('timeupdate', o._ontime); delete o._ontime; } }catch(e){} });
                  // re-schedule overlays for the new loop
                  curOvs.forEach(function(o){
                    var startAtLoop = parseFloat(o.getAttribute('data-start'));
                    if (isNaN(startAtLoop)) startAtLoop = H.overlayStartAt;
                    if (vid.currentTime >= startAtLoop) { activateOverlay(o); }
                    else {
                      o._ontime = function(){ if (vid.currentTime >= startAtLoop){ o.classList.add('overlay--visible'); try{ vid.removeEventListener('timeupdate', o._ontime); delete o._ontime; }catch(e){} } };
                      vid.addEventListener('timeupdate', o._ontime, { passive:true });
                      var t2 = setTimeout(function(){ if (!o.classList.contains('overlay--visible')) o.classList.add('overlay--visible'); try{ if (o._ontime) { vid.removeEventListener('timeupdate', o._ontime); delete o._ontime; } }catch(e){} }, Math.max(200, H.slideDuration-1200));
                      overlayTimeouts.push(t2);
                    }
                  });
                }
              }catch(e){}
              vid._lastCurrent = vid.currentTime;
            };
            vid.addEventListener('timeupdate', vid._loopWatcher, { passive:true });
          }

          ovs.forEach(function(ov){
            var startAt = parseFloat(ov.getAttribute('data-start'));
            if (isNaN(startAt)) startAt = H.overlayStartAt;
            // If already past start time, show immediately
            if (vid.currentTime >= startAt) {
              activateOverlay(ov);
            } else {
              // attach a timeupdate listener specific for this overlay
              ov._ontime = function(){
                // debug log to trace timeupdate
                // timeupdate handler
                if (vid.currentTime >= startAt){
                  // overlay activating — hide previous overlay immediately
                  activateOverlay(ov);
                  try{ vid.removeEventListener('timeupdate', ov._ontime); delete ov._ontime; }catch(e){}
                }
              };
              vid.addEventListener('timeupdate', ov._ontime, { passive:true });
              // fallback: ensure overlay becomes visible before slide ends
              var fallbackDelay = Math.max(200, H.slideDuration - 1200);
              var t = setTimeout(function(){ if (!ov.classList.contains('overlay--visible')) activateOverlay(ov); try{ if (ov._ontime) { vid.removeEventListener('timeupdate', ov._ontime); delete ov._ontime; } }catch(e){} }, fallbackDelay);
              overlayTimeouts.push(t);
            }
          });
        }
      }
    }

    function startAutoplay(){ stopAutoplay(); isPlaying=true; timer = setTimeout(nextSlide, H.slideDuration); }
    function stopAutoplay(){ if (timer){ clearTimeout(timer); timer=null; } isPlaying=false; }
    function resetAutoplay(){ stopAutoplay(); setTimeout(function(){ startAutoplay(); }, 120); }
    function nextSlide(){ showSlide(current+1); startAutoplay(); }

    // bind dots
    dots.forEach(function(d){ d.addEventListener('click', function(){ var i=parseInt(d.getAttribute('data-index'),10); showSlide(i); resetAutoplay(); }, { passive:true }); });

    // touch swipe with resistance
    (function(){
      var touch={startX:0,deltaX:0,dragging:false}; var activeInner=null, rafId=null;
      function onStart(e){ if (!e.touches || e.touches.length>1) return; touch.startX=e.touches[0].clientX; touch.deltaX=0; touch.dragging=true; activeInner = slides[current] && slides[current].querySelector('.slide-inner'); stopAutoplay(); }
      function onMove(e){ if (!touch.dragging) return; var x=e.touches[0].clientX; touch.deltaX = x - touch.startX; var moveX = touch.deltaX; if ((current===0 && moveX>0) || (current===slides.length-1 && moveX<0)) moveX = moveX * H.resistanceFactor; if (activeInner){ if (rafId) cancelAnimationFrame(rafId); rafId=requestAnimationFrame(function(){ activeInner.style.transform = 'translateX(' + moveX + 'px)'; }); } }
      function onEnd(e){ if (!touch.dragging) return; touch.dragging=false; var dx = touch.deltaX; if (activeInner){ activeInner.style.transition='transform 260ms cubic-bezier(.22,.9,.41,1)'; activeInner.style.transform=''; setTimeout(function(){ if (activeInner) activeInner.style.transition=''; },300); }
        if (Math.abs(dx) > H.swipeThreshold){ if (dx<0) { showSlide(current+1); } else { showSlide(current-1); } resetAutoplay(); } else { resetAutoplay(); } }
      document.addEventListener('touchstart', onStart, { passive:true }); document.addEventListener('touchmove', onMove, { passive:true }); document.addEventListener('touchend', onEnd, { passive:true }); document.addEventListener('touchcancel', onEnd, { passive:true });
    })();

    // visibility pause
    document.addEventListener('visibilitychange', function(){ if (document.hidden) stopAutoplay(); else startAutoplay(); });

    // wait first video then hide loader and start
    waitFirst().then(function(){ if (loader) loader.setAttribute('aria-hidden','true'); root.classList.add('ready'); showSlide(0, { immediate:true }); startAutoplay(); });

    // expose for debug
    window.__beslockHero = { show: showSlide, next: nextSlide, prev:function(){ showSlide(current-1); }, stop:stopAutoplay, start:startAutoplay };
    return window.__beslockHero;
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', function(){ HeroInit('#beslockHero'); }, { once:true }); else HeroInit('#beslockHero');

})();
