<!-- === HERO BESLOCK START (template-part) === -->
<?php /*
  Hero carousel (mobile-first) — uses assets already present in the theme:
  Videos: assets/images/Hero_develp/clips_hero/*.mp4
  Overlays (mobile): assets/images/Hero_develp/images_hero/*.png
  Overlays (desktop): assets/images/Hero_develp/images_hero/images_hero_d/*_d.png
  Loader icon: assets/icons/beslock-loader.svg
*/ ?>
<section class="hero-carousel" id="heroCarousel" aria-roledescription="carousel" aria-label="Hero carousel">

  <!-- Loader -->
  <div id="heroLoader" class="beslock-loader" role="status" aria-hidden="false">
    <div class="loader-inner">
      <img class="loader-icon" src="<?php echo esc_url( get_stylesheet_directory_uri() . '/assets/icons/beslock-loader.svg' ); ?>" alt="BESLOCK" />
      <p class="loader-cta-text" aria-hidden="true"></p>
    </div>
  </div>

  <div class="hero-slides" id="heroSlides">
    <?php
      $models = array('e-flex', 'e-nova', 'e-orbit', 'e-prime', 'e-shield', 'e-touch');
      foreach ($models as $idx => $m):
        $mp4 = $m . '_hero.mp4';
        $ov_mobile = $m . '_hero.png';
        // desktop overlay naming: e.g. e-flex_d.png inside images_hero_d
        $ov_desktop = $m . '_d.png';
        $is_active = $idx === 0 ? ' active' : '';
    ?>
    <div class="slide<?php echo $is_active ? ' active' : ''; ?>" data-model="<?php echo esc_attr($m); ?>" data-index="<?php echo $idx; ?>">
      <div class="slide-inner">
        <video class="slide-video" muted playsinline preload="auto" loop>
          <source src="<?php echo esc_url( get_stylesheet_directory_uri() . '/assets/images/Hero_develp/clips_hero/' . $mp4 ); ?>" type="video/mp4">
        </video>

        <picture class="slide-overlay">
          <source srcset="<?php echo esc_url( get_stylesheet_directory_uri() . '/assets/images/Hero_develp/images_hero/images_hero_d/' . $ov_desktop ); ?>" media="(min-width: 900px)">
          <img src="<?php echo esc_url( get_stylesheet_directory_uri() . '/assets/images/Hero_develp/images_hero/' . $ov_mobile ); ?>" alt="BESLOCK <?php echo esc_attr( $m ); ?>" />
        </picture>

        <div class="slide-text">
          <h2 class="slide-title">Lorem ipsum hero title</h2>
          <p class="slide-subtitle">Lorem ipsum subtitle for BESLOCK model.</p>
        </div>
      </div>
    </div>
    <?php endforeach; ?>
  </div>

  <div class="carousel-dots" id="carouselDots" role="tablist" aria-label="Carousel navigation">
    <?php for ($i=0;$i<6;$i++): ?>
      <div class="carousel-dot<?php echo $i===0? ' active' : ''; ?>" data-slide="<?php echo $i; ?>" role="tab" aria-label="Go to slide <?php echo $i+1; ?>"></div>
    <?php endfor; ?>
  </div>

</section>
<!-- === HERO BESLOCK END (template-part) === -->
