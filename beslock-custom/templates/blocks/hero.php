<!-- === HERO BESLOCK START (template-part) === -->
<?php /*
  Hero implemented as template-part. Uses theme-relative asset paths under
  `images/hero_develp/clips_hero` and `images/hero_develp/images_hero`.
*/ ?>
<section class="beslock-hero" id="beslockHero" aria-roledescription="carousel" aria-label="Hero carousel">
  <div class="beslock-loader" id="beslockLoader" role="status" aria-live="polite" aria-hidden="false">
    <div class="beslock-loader__bg" aria-hidden="true"></div>
    <!-- Use transparent logo (logo-white.png) and wrap to allow circular reveal + spinner -->
    <span class="beslock-loader__wrap" aria-hidden="true">
      <img class="beslock-loader__img" src="<?php echo esc_url( get_stylesheet_directory_uri() . '/assets/images/logo-green.png' ); ?>" alt="Beslock" aria-hidden="true" />
    </span>
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
          <?php
            // Use preload="auto" only for the first slide to avoid downloading
            // all clips at once. Use the overlay image as poster to show a static
            // fallback while the clip loads.
            $pre = ($i === 0) ? 'auto' : 'none';
            $poster = esc_url( get_stylesheet_directory_uri() . '/assets/images/Hero_develp/images_hero/' . $ov );
          ?>
          <?php $base = pathinfo($vid, PATHINFO_FILENAME); ?>
          <?php if ($i === 0): // keep full sources for first slide so it preloads normally ?>
            <video class="slide-video" muted playsinline preload="<?php echo $pre; ?>" poster="<?php echo $poster; ?>" loop>
              <source src="<?php echo esc_url( get_stylesheet_directory_uri() . '/assets/images/Hero_develp/clips_hero/' . $base . '.720.webm' ); ?>" type="video/webm" media="(min-width:1024px)">
              <source src="<?php echo esc_url( get_stylesheet_directory_uri() . '/assets/images/Hero_develp/clips_hero/' . $base . '.480.webm' ); ?>" type="video/webm" media="(max-width:1023px)">
              <source src="<?php echo esc_url( get_stylesheet_directory_uri() . '/assets/images/Hero_develp/clips_hero/' . $base . '.720.mp4' ); ?>" type="video/mp4" media="(min-width:1024px)">
              <source src="<?php echo esc_url( get_stylesheet_directory_uri() . '/assets/images/Hero_develp/clips_hero/' . $base . '.480.mp4' ); ?>" type="video/mp4" media="(max-width:1023px)">
              <source src="<?php echo esc_url( get_stylesheet_directory_uri() . '/assets/images/Hero_develp/clips_hero/' . $vid ); ?>" type="video/mp4">
            </video>
          <?php else: // defer loading for non-first slides; store URLs in data-attrs ?>
            <video class="slide-video" muted playsinline preload="none" poster="<?php echo $poster; ?>" loop
              data-webm-720="<?php echo esc_url( get_stylesheet_directory_uri() . '/assets/images/Hero_develp/clips_hero/' . $base . '.720.webm' ); ?>"
              data-webm-480="<?php echo esc_url( get_stylesheet_directory_uri() . '/assets/images/Hero_develp/clips_hero/' . $base . '.480.webm' ); ?>"
              data-mp4-720="<?php echo esc_url( get_stylesheet_directory_uri() . '/assets/images/Hero_develp/clips_hero/' . $base . '.720.mp4' ); ?>"
              data-mp4-480="<?php echo esc_url( get_stylesheet_directory_uri() . '/assets/images/Hero_develp/clips_hero/' . $base . '.480.mp4' ); ?>"
              data-mp4="<?php echo esc_url( get_stylesheet_directory_uri() . '/assets/images/Hero_develp/clips_hero/' . $vid ); ?>">
            </video>
          <?php endif; ?>
          <img class="slide-overlay" src="<?php echo $poster; ?>" alt="" aria-hidden="true" loading="lazy" />
          <?php if ($i === 5): // Add second orbit overlay image that enters at 3.55s ?>
            <img class="slide-overlay" src="<?php echo esc_url( get_stylesheet_directory_uri() . '/assets/images/Hero_develp/images_hero/e-orbit_2_hero.png' ); ?>" data-start="3.55" alt="" aria-hidden="true" />
          <?php endif; ?>
          <div class="slide-content">
            <?php
              // Derive a human-friendly title from the overlay filename.
              $base = pathinfo($ov, PATHINFO_FILENAME); // e-flex_hero
              $title_raw = str_replace('_', ' ', $base); // e-flex hero
              // remove the word "hero" if present and collapse whitespace
              $title_raw = preg_replace('/\bhero\b/i', '', $title_raw);
              $title_raw = trim(preg_replace('/\s+/', ' ', $title_raw));
              // capitalize the character after a hyphen (e.g. e-flex -> e-Flex)
              $pos = strpos($title_raw, '-');
              if ($pos !== false && isset($title_raw[$pos + 1])) {
                $title_raw = substr_replace($title_raw, strtoupper($title_raw[$pos + 1]), $pos + 1, 1);
              }
              $subtitle = ucwords($title_raw);
            ?>
            <h1 class="slide-title"><?php echo esc_html($title_raw); ?></h1>
            <p class="slide-subtitle"><?php echo esc_html($subtitle); ?></p>
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
