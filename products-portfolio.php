<?php
$products = [
  [
    'name'  => 'e-Nova',
    'desc'  => 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Seguridad y diseño premium.',
    'image' => get_stylesheet_directory_uri() . '/assets/images/products/e-nova.webp',
    'link'  => '#'
  ],
  [
    'name'  => 'e-Orbit',
    'desc'  => 'Soluciones avanzadas para acceder a tu espacio con tecnología y estilo. Lorem ipsum.',
    'image' => get_stylesheet_directory_uri() . '/assets/images/products/e-orbit.webp',
    'link'  => '#'
  ],
  [
    'name'  => 'e-Touch',
    'desc'  => 'Sistema inteligente para puertas modernas. Facilidad, protección y control total.',
    'image' => get_stylesheet_directory_uri() . '/assets/images/products/e-touch.webp',
    'link'  => '#'
  ],
  [
    'name'  => 'e-Flex',
    'desc'  => 'Flexibilidad y seguridad en una cerradura inteligente adaptable a cualquier hogar. Lorem ipsum.',
    'image' => get_stylesheet_directory_uri() . '/assets/images/products/e-flex.webp',
    'link'  => '#'
  ],
  [
    'name'  => 'e-Shield',
    'desc'  => 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Seguridad y diseño premium.',
    'image' => get_stylesheet_directory_uri() . '/assets/images/products/e-shield.webp',
    'link'  => '#'
  ],
  [
    'name'  => 'e-Prime',
    'desc'  => 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Seguridad y diseño premium.',
    'image' => get_stylesheet_directory_uri() . '/assets/images/products/e-prime.webp',
    'link'  => '#'
  ],
];

echo '<section class="products-portfolio section reveal"><div class="u-container products-portfolio__grid">';
foreach ($products as $product) {
  set_query_var('product', $product);
  get_template_part('templates/blocks/product-card');
}
echo '</div></section>';
?>