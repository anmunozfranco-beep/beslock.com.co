<?php
/**
 * Beslock Custom Theme – Functions
 * Mobile-first + BEM + GSAP Ready
 *
 * Actualizado: encolado seguro de assets del menú móvil (CSS + JS)
 */

/**
 * Helper utilities to locate assets and templates.
 *
 * Behavior:
 * - Prefer top-level paths when present (root `assets/` or `templates/`) to allow
 *   local overrides.
 * - Otherwise fall back to the `beslock-custom` directory.
 * This keeps deployments that copy only `beslock-custom/` functional while
 * allowing developers to override files in the repo root during development.
 */
if ( ! function_exists( 'beslock_asset_uri' ) ) {
  function beslock_asset_uri( $relative_path ) {
    $root_dir = get_stylesheet_directory();
    $root_uri = get_stylesheet_directory_uri();

    $bc_dir = $root_dir . '/beslock-custom';
    $bc_uri = $root_uri . '/beslock-custom';

    $root_candidate = $root_dir . '/' . ltrim( $relative_path, '/' );
    $bc_candidate = $bc_dir . '/' . ltrim( $relative_path, '/' );

    if ( file_exists( $root_candidate ) ) {
      return $root_uri . '/' . ltrim( $relative_path, '/' );
    }

    if ( file_exists( $bc_candidate ) ) {
      return $bc_uri . '/' . ltrim( $relative_path, '/' );
    }

    // Fallback to root URI even if missing — allows WP to show 404 for missing resource.
    return $root_uri . '/' . ltrim( $relative_path, '/' );
  }
}

if ( ! function_exists( 'beslock_asset_ver' ) ) {
  function beslock_asset_ver( $relative_path ) {
    $root_dir = get_stylesheet_directory();
    $bc_dir = $root_dir . '/beslock-custom';

    $root_candidate = $root_dir . '/' . ltrim( $relative_path, '/' );
    $bc_candidate = $bc_dir . '/' . ltrim( $relative_path, '/' );

    if ( file_exists( $root_candidate ) ) {
      return filemtime( $root_candidate );
    }
    if ( file_exists( $bc_candidate ) ) {
      return filemtime( $bc_candidate );
    }
    return null;
  }
}

add_action( 'wp_enqueue_scripts', function() {

  // If this theme is used as a child theme, ensure the Kadence parent stylesheet
  // is enqueued so the site inherits the parent's layout and e-commerce assets.
  if ( function_exists( 'is_child_theme' ) && is_child_theme() ) {
    wp_enqueue_style( 'kadence-parent-style', get_template_directory_uri() . '/style.css', [], null );
  }


  // Use asset helpers to prefer top-level assets but fall back to beslock-custom
  $ver_main_css = beslock_asset_ver( 'assets/css/main.css' );

  /* -------------------------------
   * CSS PRINCIPAL
   * ------------------------------- */
  wp_enqueue_style(
    'beslock-main-style',
    beslock_asset_uri( 'assets/css/main.css' ),
    [],
    $ver_main_css
  );

  /* -------------------------------
   * Bootstrap Icons (CDN) - GLOBAL
   * Cargado de forma global en frontend para uso en header/menu/modales
   * Versión: 1.13.1 (sin SRI por flujo de desarrollo)
   * ------------------------------- */
  wp_enqueue_style(
    'beslock-bootstrap-icons',
    'https://cdn.jsdelivr.net/npm/bootstrap-icons@1.13.1/font/bootstrap-icons.min.css',
    [],
    '1.13.1'
  );

  /* -------------------------------
   * CSS ESPECÍFICO PARA MENÚ PRODUCTOS MÓVIL
   * Cargado siempre para forzar la versión "mobile-first" en todos los
   * tamaños de pantalla (sin comprobaciones de servidor).
   * ------------------------------- */
  $ver_menu_css = beslock_asset_ver( 'assets/css/menu-products-mobile.css' );

  wp_enqueue_style(
    'beslock-menu-products-mobile',
    beslock_asset_uri( 'assets/css/menu-products-mobile.css' ),
    [ 'beslock-main-style' ],
    $ver_menu_css
  );

  // CSS del componente models (mobile) – también cargado siempre
  $ver_models_css = beslock_asset_ver( 'assets/css/models-mobile.css' );

  wp_enqueue_style(
    'beslock-models-mobile',
    beslock_asset_uri( 'assets/css/models-mobile.css' ),
    [ 'beslock-main-style', 'beslock-menu-products-mobile' ],
    $ver_models_css
  );

  /* -------------------------------
   * GSAP + ScrollTrigger desde CDN
   * ------------------------------- */
  wp_enqueue_script(
    'gsap',
    'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js',
    [],
    null,
    true
  );
  wp_enqueue_script(
    'scrolltrigger',
    'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js',
    [ 'gsap' ],
    null,
    true
  );

  /* -------------------------------
   * JS PRINCIPAL DEL TEMA
   * ------------------------------- */
  $ver_main_js = beslock_asset_ver( 'assets/js/main.js' );

  wp_enqueue_script(
    'beslock-main-js',
    beslock_asset_uri( 'assets/js/main.js' ),
    [ 'scrolltrigger' ], // asegura carga en el orden correcto
    $ver_main_js,
    true
  );

  /* -------------------------------
   * JS ESPECÍFICO PARA MENÚ PRODUCTOS MÓVIL
   * Cargado siempre para usar la versión móvil en todas las resoluciones.
   * Depende de `beslock-main-js` para asegurar orden.
   * ------------------------------- */
  $ver_menu_js = beslock_asset_ver( 'assets/js/menu-products-mobile.js' );

  wp_enqueue_script(
    'beslock-menu-products-mobile-js',
    beslock_asset_uri( 'assets/js/menu-products-mobile.js' ),
    [ 'beslock-main-js' ],
    $ver_menu_js,
    true
  );

  // JS del componente models (mobile) – también cargado siempre
  $ver_models_js = beslock_asset_ver( 'assets/js/models-mobile.js' );

  wp_enqueue_script(
    'beslock-models-mobile-js',
    beslock_asset_uri( 'assets/js/models-mobile.js' ),
    [ 'beslock-main-js', 'beslock-menu-products-mobile-js' ],
    $ver_models_js,
    true
  );

});