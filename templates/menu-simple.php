<?php
// /wp-content/themes/beslock-custom/menu-simple.php
// Partial minimal para drawer móvil — SOLO el drawer (no incluye botón de abrir)
// Asegúrate de que el botón de apertura esté en header.php con id="menuBtn".
?>
<!-- Drawer principal: no incluye botón de apertura (ese está en header.php) -->
<nav id="mobileDrawer" class="mobile-drawer" aria-hidden="true" role="dialog" aria-label="<?php esc_attr_e('Mobile menu', 'beslock'); ?>">
  <div class="mobile-drawer__panel" role="document">
    <!-- Close: usamos Bootstrap Icons para la X y mantenemos texto accesible -->
    <button id="closeDrawer" class="mobile-drawer__close" aria-label="<?php esc_attr_e('Close menu', 'beslock'); ?>">
      <i class="bi bi-x-lg" aria-hidden="true"></i>
      <span class="screen-reader-text"><?php esc_html_e('Close menu', 'beslock'); ?></span>
    </button>

    <ul class="mobile-menu" role="menu">
      <li class="mobile-menu__item" role="none">
        <button class="mobile-menu__link" id="productsToggle" aria-expanded="false" aria-controls="productsPanel" role="menuitem">
          <?php esc_html_e('Products', 'beslock'); ?> <span class="chev" aria-hidden="true">›</span>
        </button>

        <?php
        /**
         * Panel semántico para Products.
         * - Oculto por defecto (aria-hidden="true")
         * - id="productsPanel" enlazado desde aria-controls en el botón
         * - role="region" para describir área del drawer que contiene el contenido de Products
         * - Contenido provisto por template-part: templates/models-mobile.php
         *
         * Nota: la visibilidad se controla con aria-* y clases (.models--hidden / .models--visible).
         */
        ?>
        <div id="productsPanel" class="mobile-products-panel models models--hidden" role="region" aria-hidden="true" aria-labelledby="productsToggle">
          <?php
            // Cargamos el template-part con las tarjetas (models)
            get_template_part( 'templates/models-mobile' );
          ?>
        </div>
      </li>

      <li class="mobile-menu__item" role="none">
        <a class="mobile-menu__link" href="<?php echo esc_url( home_url('/contact') ); ?>" role="menuitem"><?php esc_html_e('Contact', 'beslock'); ?></a>
      </li>
      <li class="mobile-menu__item" role="none">
        <a class="mobile-menu__link" href="<?php echo esc_url( home_url('/about') ); ?>" role="menuitem"><?php esc_html_e('About', 'beslock'); ?></a>
      </li>
    </ul>
  </div>

  <!-- Backdrop para cerrar tocando afuera -->
  <div class="mobile-drawer__backdrop" id="drawerBackdrop" tabindex="-1" aria-hidden="true"></div>
</nav>