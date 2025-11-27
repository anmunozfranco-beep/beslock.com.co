<?php
/**
 * Beslock Custom Theme – Functions
 * Mobile-first + BEM + GSAP Ready
 *
 * Actualizado: encolado seguro de assets del menú móvil (CSS + JS)
 */

add_action( 'wp_enqueue_scripts', function() {

  // If this theme is used as a child theme, ensure the Kadence parent stylesheet
  // is enqueued so the site inherits the parent's layout and e-commerce assets.
  if ( function_exists( 'is_child_theme' ) && is_child_theme() ) {
    wp_enqueue_style( 'kadence-parent-style', get_template_directory_uri() . '/style.css', [], null );
  }


  // Helper para versiones basadas en tiempo de modificación (si existe el archivo)
  $theme_dir_uri  = get_stylesheet_directory_uri();
  $theme_dir_path = get_stylesheet_directory();

  // Manual asset bump token to force cache-bust when needed.
  // Update this string when you want clients to reload static assets.
  $BESLOCK_ASSET_BUMP = '20251127.2';

  $ver_main_css = file_exists( $theme_dir_path . '/assets/css/main.css' )
    ? filemtime( $theme_dir_path . '/assets/css/main.css' )
    : null;

  /* -------------------------------
   * CSS PRINCIPAL
   * ------------------------------- */
  wp_enqueue_style(
    'beslock-main-style',
    $theme_dir_uri . '/assets/css/main.css',
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
   * (solo en móvil para optimizar; quita wp_is_mobile() si quieres cargar siempre)
   * ------------------------------- */
  if ( function_exists( 'wp_is_mobile' ) && wp_is_mobile() ) {
    $menu_css_path = $theme_dir_path . '/assets/css/menu-products-mobile.css';
    $ver_menu_css_raw = file_exists( $menu_css_path ) ? filemtime( $menu_css_path ) : null;
    $ver_menu_css = $ver_menu_css_raw ? $ver_menu_css_raw . '.' . $BESLOCK_ASSET_BUMP : $BESLOCK_ASSET_BUMP;

    wp_enqueue_style(
      'beslock-menu-products-mobile',
      $theme_dir_uri . '/assets/css/menu-products-mobile.css',
      [ 'beslock-main-style' ],
      $ver_menu_css
    );

    // CSS del nuevo componente models (mobile)
    $models_css_path = $theme_dir_path . '/assets/css/models-mobile.css';
    $ver_models_css_raw = file_exists( $models_css_path ) ? filemtime( $models_css_path ) : null;
    $ver_models_css = $ver_models_css_raw ? $ver_models_css_raw . '.' . $BESLOCK_ASSET_BUMP : $BESLOCK_ASSET_BUMP;

    wp_enqueue_style(
      'beslock-models-mobile',
      $theme_dir_uri . '/assets/css/models-mobile.css',
      [ 'beslock-main-style', 'beslock-menu-products-mobile' ],
      $ver_models_css
    );
  }

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
  $main_js_path = $theme_dir_path . '/assets/js/main.js';
  $ver_main_js = file_exists( $main_js_path ) ? filemtime( $main_js_path ) : null;

  wp_enqueue_script(
    'beslock-main-js',
    $theme_dir_uri . '/assets/js/main.js',
    [ 'scrolltrigger' ], // asegura carga en el orden correcto
    $ver_main_js,
    true
  );

  /* -------------------------------
   * JS ESPECÍFICO PARA MENÚ PRODUCTOS MÓVIL
   * (encolado sólo en móvil; depende del main JS para asegurar orden)
   * ------------------------------- */
  if ( function_exists( 'wp_is_mobile' ) && wp_is_mobile() ) {
    $menu_js_path = $theme_dir_path . '/assets/js/menu-products-mobile.js';
    $ver_menu_js_raw = file_exists( $menu_js_path ) ? filemtime( $menu_js_path ) : null;
    $ver_menu_js = $ver_menu_js_raw ? $ver_menu_js_raw . '.' . $BESLOCK_ASSET_BUMP : $BESLOCK_ASSET_BUMP;

    wp_enqueue_script(
      'beslock-menu-products-mobile-js',
      $theme_dir_uri . '/assets/js/menu-products-mobile.js',
      [ 'beslock-main-js' ],
      $ver_menu_js,
      true
    );

    // JS del nuevo componente models (manejo de toggle del panel Products)
    $models_js_path = $theme_dir_path . '/assets/js/models-mobile.js';
    $ver_models_js_raw = file_exists( $models_js_path ) ? filemtime( $models_js_path ) : null;
    $ver_models_js = $ver_models_js_raw ? $ver_models_js_raw . '.' . $BESLOCK_ASSET_BUMP : $BESLOCK_ASSET_BUMP;

    wp_enqueue_script(
      'beslock-models-mobile-js',
      $theme_dir_uri . '/assets/js/models-mobile.js',
      [ 'beslock-main-js', 'beslock-menu-products-mobile-js' ],
      $ver_models_js,
      true
    );
  }

});