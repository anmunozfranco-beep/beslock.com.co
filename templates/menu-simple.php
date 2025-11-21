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
        <button class="mobile-menu__link" id="productsToggle" aria-expanded="false" aria-controls="productsList" role="menuitem">
          <?php esc_html_e('Products', 'beslock'); ?> <span class="chev" aria-hidden="true">›</span>
        </button>
        <ul id="productsList" class="mobile-submenu" hidden role="menu">
          <li class="mobile-submenu__item" role="none">E-Nova</li>
          <li class="mobile-submenu__item" role="none">E-Touch</li>
          <li class="mobile-submenu__item" role="none">SmartLock Exterior</li>
        </ul>
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
