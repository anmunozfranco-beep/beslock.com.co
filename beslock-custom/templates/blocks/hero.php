<!-- === HERO BESLOCK START (template-part) === -->
<?php /*
  Hero implemented as template-part. Uses theme-relative asset paths under
  `images/hero_develp/clips_hero` and `images/hero_develp/images_hero`.
*/ ?>
<section class="beslock-hero" id="beslockHero" aria-roledescription="carousel" aria-label="Hero carousel">
  <div class="beslock-loader" id="beslockLoader" role="status" aria-live="polite" aria-hidden="false">
    <div class="beslock-loader__bg" aria-hidden="true"></div>
    <div class="beslock-loader__svg" data-src="<?php echo esc_url( get_stylesheet_directory_uri() ); ?>/assets/icons/beslock-loader.svg" aria-hidden="true"></div>
    <div class="beslock-loader__pulse" aria-hidden="true"></div>
  </div>

  <div class="hero-viewport" id="heroViewport" tabindex="-1">
    <div class="hero-slides" id="heroSlides">
      <?php for ($i = 1; $i <= 6; $i++): ?>
      <article class="hero-slide" data-index="<?php echo $i-1; ?>" aria-roledescription="slide" aria-label="Slide <?php echo $i; ?>">
        <div class="slide-inner">
          <video class="slide-video" muted playsinline preload="auto" loop src="<?php echo esc_url( get_stylesheet_directory_uri() . '/images/hero_develp/clips_hero/clip' . $i . '.mp4' ); ?>"></video>
          <img class="slide-overlay" src="<?php echo esc_url( get_stylesheet_directory_uri() . '/images/hero_develp/images_hero/overlay' . $i . '.png' ); ?>" alt="" aria-hidden="true" />
          <div class="slide-content">
            <h1 class="slide-title"><?php echo esc_html("Title $i"); ?></h1>
            <p class="slide-subtitle"><?php echo esc_html("Subtitle $i"); ?></p>
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
