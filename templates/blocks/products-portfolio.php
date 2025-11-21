<?php
$products = [
  [
    'name'  => 'e-Nova',
    'desc'  => 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Seguridad y diseño premium.',
    'image' => get_stylesheet_directory_uri() . '/assets/images/products/e-nova_.webp',
    'link'  => '#'
  ],
  [
    'name'  => 'e-Orbit',
    'desc'  => 'Soluciones avanzadas para acceder a tu espacio con tecnología y estilo. Lorem ipsum.',
    'image' => get_stylesheet_directory_uri() . '/assets/images/products/e-orbit_.webp',
    'link'  => '#'
  ],
  [
    'name'  => 'e-Touch',
    'desc'  => 'Sistema inteligente para puertas modernas. Facilidad, protección y control total.',
    'image' => get_stylesheet_directory_uri() . '/assets/images/products/e-touch_.webp',
    'link'  => '#'
  ],
  [
    'name'  => 'e-Flex',
    'desc'  => 'Flexibilidad y seguridad en una cerradura inteligente adaptable a cualquier hogar. Lorem ipsum.',
    'image' => get_stylesheet_directory_uri() . '/assets/images/products/e-flex_.webp',
    'link'  => '#'
  ],
  [
    'name'  => 'e-Shield',
    'desc'  => 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Seguridad y diseño premium.',
    'image' => get_stylesheet_directory_uri() . '/assets/images/products/e-shield_.webp',
    'link'  => '#'
  ],
  [
    'name'  => 'e-Prime',
    'desc'  => 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Seguridad y diseño premium.',
    'image' => get_stylesheet_directory_uri() . '/assets/images/products/e-prime_.webp',
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
