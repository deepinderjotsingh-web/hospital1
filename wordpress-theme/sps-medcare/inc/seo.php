<?php
/**
 * SEO output: meta description, Open Graph, and schema.org JSON-LD.
 *
 * Kept deliberately light so it does not fight Yoast or Rank Math — if either
 * plugin is active, the theme steps aside and lets the plugin own the tags.
 *
 * @package SPS_Medcare
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Whether a dedicated SEO plugin is handling meta output.
 *
 * @return bool
 */
function sps_seo_plugin_active() {
	return defined( 'WPSEO_VERSION' ) || defined( 'RANK_MATH_VERSION' ) || class_exists( 'All_in_One_SEO_Pack' );
}

/**
 * A clean description for the current view.
 *
 * @return string
 */
function sps_meta_description() {
	if ( is_singular() ) {
		$excerpt = has_excerpt() ? get_the_excerpt() : wp_trim_words( wp_strip_all_tags( get_the_content() ), 30, '' );
		if ( $excerpt ) {
			return $excerpt;
		}
	}

	if ( is_tax( 'sps_specialty' ) ) {
		$term = get_queried_object();
		if ( $term && ! empty( $term->description ) ) {
			return $term->description;
		}
	}

	return get_bloginfo( 'description' );
}

/**
 * Output meta description + Open Graph tags.
 */
function sps_head_meta() {
	if ( sps_seo_plugin_active() ) {
		return;
	}

	$description = wp_strip_all_tags( sps_meta_description() );
	$title       = wp_get_document_title();
	$url         = is_singular() ? get_permalink() : home_url( add_query_arg( array() ) );
	$image       = '';

	if ( is_singular() && has_post_thumbnail() ) {
		$image = get_the_post_thumbnail_url( get_the_ID(), 'sps-treatment-hero' );
	} elseif ( get_theme_mod( 'sps_hero_image' ) ) {
		$image = get_theme_mod( 'sps_hero_image' );
	}

	printf( '<meta name="description" content="%s" />' . "\n", esc_attr( $description ) );
	printf( '<link rel="canonical" href="%s" />' . "\n", esc_url( $url ) );
	printf( '<meta property="og:type" content="%s" />' . "\n", is_singular() ? 'article' : 'website' );
	printf( '<meta property="og:site_name" content="%s" />' . "\n", esc_attr( get_bloginfo( 'name' ) ) );
	printf( '<meta property="og:title" content="%s" />' . "\n", esc_attr( $title ) );
	printf( '<meta property="og:description" content="%s" />' . "\n", esc_attr( $description ) );
	printf( '<meta property="og:url" content="%s" />' . "\n", esc_url( $url ) );

	if ( $image ) {
		printf( '<meta property="og:image" content="%s" />' . "\n", esc_url( $image ) );
		echo '<meta name="twitter:card" content="summary_large_image" />' . "\n";
	}

	printf( '<meta name="twitter:title" content="%s" />' . "\n", esc_attr( $title ) );
	printf( '<meta name="twitter:description" content="%s" />' . "\n", esc_attr( $description ) );
}
add_action( 'wp_head', 'sps_head_meta', 2 );

/**
 * Output schema.org JSON-LD: MedicalBusiness site-wide, MedicalProcedure on treatments.
 */
function sps_json_ld() {
	$countries = wp_list_pluck( sps_countries(), 'name' );
	$address   = array_values( array_filter( array_map( 'trim', preg_split( '/\r\n|\r|\n/', sps_option( 'address' ) ) ) ) );

	$business = array(
		'@context'          => 'https://schema.org',
		'@type'             => 'MedicalBusiness',
		'name'              => get_bloginfo( 'name' ),
		'url'               => home_url( '/' ),
		'telephone'         => sps_option( 'phone' ),
		'email'             => sps_option( 'email' ),
		'description'       => get_bloginfo( 'description' ),
		'priceRange'        => '$$',
		'address'           => array(
			'@type'          => 'PostalAddress',
			'streetAddress'  => implode( ', ', array_slice( $address, 0, 2 ) ),
			'addressLocality'=> 'New Delhi',
			'addressRegion'  => 'Delhi',
			'addressCountry' => 'IN',
		),
		'areaServed'        => $countries,
		'availableLanguage' => sps_languages(),
	);

	echo '<script type="application/ld+json">' . wp_json_encode( $business ) . '</script>' . "\n";

	if ( is_singular( 'sps_treatment' ) ) {
		$procedure = array(
			'@context'    => 'https://schema.org',
			'@type'       => 'MedicalProcedure',
			'name'        => get_the_title(),
			'description' => wp_strip_all_tags( sps_meta_description() ),
			'category'    => sps_specialty_name(),
			'url'         => get_permalink(),
			'provider'    => array(
				'@type'     => 'MedicalBusiness',
				'name'      => get_bloginfo( 'name' ),
				'telephone' => sps_option( 'phone' ),
				'url'       => home_url( '/' ),
			),
		);

		if ( has_post_thumbnail() ) {
			$procedure['image'] = array( get_the_post_thumbnail_url( get_the_ID(), 'sps-treatment-hero' ) );
		}

		echo '<script type="application/ld+json">' . wp_json_encode( $procedure ) . '</script>' . "\n";
	}
}
add_action( 'wp_head', 'sps_json_ld', 20 );
