<!-- === HERO BESLOCK START (template-part) === -->
<?php /*
  Hero implemented as template-part. Uses theme-relative asset paths under
  `images/hero_develp/clips_hero` and `images/hero_develp/images_hero`.
*/ ?>
<section class="beslock-hero" id="beslockHero" aria-roledescription="carousel" aria-label="Hero carousel">
  <div class="beslock-loader" id="beslockLoader" role="status" aria-live="polite" aria-hidden="false">
    <div class="beslock-loader__bg" aria-hidden="true"></div>
    <!-- Fallback uses the favicon image inside assets/images (white background requested) -->
    <img class="beslock-loader__img" src="<?php echo esc_url( get_stylesheet_directory_uri() . '/assets/images/Favicon_Beslock.png' ); ?>" alt="Beslock" aria-hidden="true" />
    <div class="beslock-loader__pulse" aria-hidden="true"></div>
  </div>

  <div class="hero-viewport" id="heroViewport" tabindex="-1">
    <div class="hero-slides" id="heroSlides">
      <?php
        // Use explicit filenames present in the repo under assets/images/Hero_develp
        $videos = array(
          'e-flex_hero.mp4',
          'e-nova_hero.mp4',
          'e-prime_hero.mp4',
          'e-shield_hero.mp4',
          'e-touch_hero.mp4',
          'e-orbit_hero.mp4',
        );
        $overlays = array(
          'e-flex_hero.png',
          'e-nova_hero.png',
          'e-prime_hero.png',
          'e-shield_hero.png',
          'e-touch_hero.png',
          'e-orbit_hero.png',
        );
        $count = min(count($videos), count($overlays));
        for ($i = 0; $i < $count; $i++):
          $vid = $videos[$i];
          $ov  = $overlays[$i];
      ?>
      <article class="hero-slide" data-index="<?php echo $i; ?>" aria-roledescription="slide" aria-label="Slide <?php echo $i+1; ?>">
        <div class="slide-inner">
          <video class="slide-video" muted playsinline preload="auto" loop src="<?php echo esc_url( get_stylesheet_directory_uri() . '/assets/images/Hero_develp/clips_hero/' . $vid ); ?>"></video>
          <img class="slide-overlay" src="<?php echo esc_url( get_stylesheet_directory_uri() . '/assets/images/Hero_develp/images_hero/' . $ov ); ?>" alt="" aria-hidden="true" />
          <?php if ($i === 5): // Add second orbit overlay image that enters at 3.55s ?>
            <img class="slide-overlay" src="<?php echo esc_url( get_stylesheet_directory_uri() . '/assets/images/Hero_develp/images_hero/e-orbit_2_hero.png' ); ?>" data-start="3.55" alt="" aria-hidden="true" />
          <?php endif; ?>
          <div class="slide-content">
            <h1 class="slide-title"><?php echo esc_html("Title " . ($i+1)); ?></h1>
            <p class="slide-subtitle"><?php echo esc_html("Subtitle " . ($i+1)); ?></p>
          </div>
        </div>
      </article>
      <?php endfor; ?>
    </div>

    <nav class="hero-dots" id="heroDots" aria-label="Carousel navigation" role="tablist">
      <?php for ($i = 1; $i <= 6; $i++): ?>
        <button class="hero-dot" data-index="<?php echo $i-1; ?>" aria-label="Go to slide <?php echo $i; ?>" role="tab"></button>
      <?php endfor; ?>
    </nav>
  </div>
</section>
<!-- === HERO BESLOCK END (template-part) === -->
