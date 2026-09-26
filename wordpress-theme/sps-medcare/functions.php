<?php
/**
 * SPS Medcare theme functions.
 *
 * @package SPS_Medcare
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

define( 'SPS_MEDCARE_VERSION', '1.0.0' );

require_once get_template_directory() . '/inc/helpers.php';
require_once get_template_directory() . '/inc/icons.php';
require_once get_template_directory() . '/inc/post-types.php';
require_once get_template_directory() . '/inc/meta-boxes.php';
require_once get_template_directory() . '/inc/customizer.php';
require_once get_template_directory() . '/inc/enquiry.php';
require_once get_template_directory() . '/inc/demo-content.php';
require_once get_template_directory() . '/inc/seo.php';

/**
 * Theme setup.
 */
function sps_medcare_setup() {
	load_theme_textdomain( 'sps-medcare', get_template_directory() . '/languages' );

	add_theme_support( 'automatic-feed-links' );
	add_theme_support( 'title-tag' );
	add_theme_support( 'post-thumbnails' );
	add_theme_support( 'customize-selective-refresh-widgets' );
	add_theme_support( 'responsive-embeds' );
	add_theme_support( 'align-wide' );
	add_theme_support(
		'html5',
		array( 'search-form', 'comment-form', 'comment-list', 'gallery', 'caption', 'style', 'script' )
	);
	add_theme_support(
		'custom-logo',
		array(
			'height'      => 60,
			'width'       => 240,
			'flex-height' => true,
			'flex-width'  => true,
		)
	);

	add_image_size( 'sps-treatment-card', 720, 450, true );
	add_image_size( 'sps-treatment-hero', 1600, 800, true );

	register_nav_menus(
		array(
			'primary' => __( 'Primary Menu', 'sps-medcare' ),
			'footer'  => __( 'Footer Quick Links', 'sps-medcare' ),
		)
	);
}
add_action( 'after_setup_theme', 'sps_medcare_setup' );

/**
 * Content width.
 */
function sps_medcare_content_width() {
	$GLOBALS['content_width'] = apply_filters( 'sps_medcare_content_width', 820 );
}
add_action( 'after_setup_theme', 'sps_medcare_content_width', 0 );

/**
 * Styles & scripts.
 */
function sps_medcare_assets() {
	// Google Fonts: Outfit (headings) + Plus Jakarta Sans (body).
	wp_enqueue_style(
		'sps-medcare-fonts',
		'https://fonts.googleapis.com/css2?family=Outfit:wght@400;600;700;800&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap',
		array(),
		null
	);

	wp_enqueue_style( 'sps-medcare-style', get_stylesheet_uri(), array( 'sps-medcare-fonts' ), SPS_MEDCARE_VERSION );

	wp_enqueue_script( 'sps-medcare-script', get_template_directory_uri() . '/assets/js/theme.js', array(), SPS_MEDCARE_VERSION, true );
}
add_action( 'wp_enqueue_scripts', 'sps_medcare_assets' );

/**
 * Preconnect to the Google Fonts hosts for faster first paint.
 *
 * @param array  $urls          Resource hints.
 * @param string $relation_type Hint type.
 * @return array
 */
function sps_medcare_resource_hints( $urls, $relation_type ) {
	if ( 'preconnect' === $relation_type ) {
		$urls[] = array(
			'href' => 'https://fonts.gstatic.com',
			'crossorigin',
		);
	}
	return $urls;
}
add_filter( 'wp_resource_hints', 'sps_medcare_resource_hints', 10, 2 );

/**
 * Widget areas (footer column 5 / sidebar for blog).
 */
function sps_medcare_widgets_init() {
	register_sidebar(
		array(
			'name'          => __( 'Blog Sidebar', 'sps-medcare' ),
			'id'            => 'sidebar-1',
			'description'   => __( 'Shown beside blog posts and archives.', 'sps-medcare' ),
			'before_widget' => '<section id="%1$s" class="sps-card sps-widget %2$s"><div class="sps-card__body">',
			'after_widget'  => '</div></section>',
			'before_title'  => '<h3 class="sps-widget__title">',
			'after_title'   => '</h3>',
		)
	);
}
add_action( 'widgets_init', 'sps_medcare_widgets_init' );

/**
 * Body classes.
 *
 * @param array $classes Body classes.
 * @return array
 */
function sps_medcare_body_classes( $classes ) {
	if ( ! is_active_sidebar( 'sidebar-1' ) ) {
		$classes[] = 'no-sidebar';
	}
	if ( is_front_page() ) {
		$classes[] = 'sps-front';
	}
	return $classes;
}
add_filter( 'body_class', 'sps_medcare_body_classes' );

/**
 * Excerpt tweaks.
 */
function sps_medcare_excerpt_length() {
	return 26;
}
add_filter( 'excerpt_length', 'sps_medcare_excerpt_length', 999 );

function sps_medcare_excerpt_more() {
	return '&hellip;';
}
add_filter( 'excerpt_more', 'sps_medcare_excerpt_more' );

/**
 * Add a "Download" style class to nav items so the last item can stand out.
 *
 * @param array  $classes Menu item classes.
 * @param object $item    Menu item.
 * @return array
 */
function sps_medcare_nav_classes( $classes, $item ) {
	if ( ! empty( $item->title ) && false !== stripos( $item->title, 'contact' ) ) {
		$classes[] = 'sps-nav__contact';
	}
	return $classes;
}
add_filter( 'nav_menu_css_class', 'sps_medcare_nav_classes', 10, 2 );
