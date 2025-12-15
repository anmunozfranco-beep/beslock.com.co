<?php
/**
 * Child theme page.php proxy
 * Delegate rendering to parent theme's page.php so the parent (Kadence)
 * remains responsible for layout and template resolution for pages.
 * This file intentionally does not output custom markup.
 */

// If the parent theme provides a page.php, load it so the parent handles output.
if ( file_exists( get_template_directory() . '/page.php' ) ) {
  load_template( get_template_directory() . '/page.php' );
  return;
}

// Fallback minimal page that respects the loop and uses header/footer from themes.
get_header();
if ( have_posts() ) {
  while ( have_posts() ) {
    the_post();
    the_content();
  }
}
get_footer();
