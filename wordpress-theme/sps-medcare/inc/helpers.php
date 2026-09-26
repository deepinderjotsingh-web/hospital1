<?php
/**
 * Helper functions: contact details, formatting, treatment meta accessors.
 *
 * @package SPS_Medcare
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Theme option with a sensible default.
 *
 * All contact details are editable under Appearance > Customize > SPS Medcare.
 *
 * @param string $key Option key.
 * @return string
 */
function sps_option( $key ) {
	$defaults = array(
		'phone'        => '+91 99202 22362',
		'phone_raw'    => '919920222362',
		'landline'     => '011 41000493',
		'landline_raw' => '911141000493',
		'email'        => 'info@spsattestation.com',
		'address'      => "#123, 1st Floor, Vishal Tower\nJanakpuri District Centre\nNear Janakpuri West Metro\nNew Delhi - 110058, India",
		'hours'        => '24/7 international patient desk',
		'cert'         => 'JCI & NABH Accredited Partner Hospitals',
		'tagline'      => 'Medical Tourism · India',
		'countries'    => "Bangladesh|🇧🇩\nNepal|🇳🇵\nSri Lanka|🇱🇰\nUnited Arab Emirates|🇦🇪\nNigeria|🇳🇬\nAfghanistan|🇦🇫\nIraq|🇮🇶\nMaldives|🇲🇻\nOman|🇴🇲\nKenya|🇰🇪\nYemen|🇾🇪\nTanzania|🇹🇿",
		'languages'    => 'English, Arabic, Bengali, Dari / Pashto, French, Russian, Swahili',
		'whatsapp_msg' => 'Hello SPS Medcare, I would like a free medical opinion and cost estimate.',
	);

	$default = isset( $defaults[ $key ] ) ? $defaults[ $key ] : '';
	$value   = get_theme_mod( 'sps_' . $key, $default );

	return '' === $value ? $default : $value;
}

/**
 * tel: link for the mobile number.
 *
 * @return string
 */
function sps_phone_href() {
	return 'tel:+' . preg_replace( '/[^0-9]/', '', sps_option( 'phone_raw' ) );
}

/**
 * tel: link for the landline.
 *
 * @return string
 */
function sps_landline_href() {
	return 'tel:+' . preg_replace( '/[^0-9]/', '', sps_option( 'landline_raw' ) );
}

/**
 * WhatsApp deep link, optionally with a prefilled message.
 *
 * @param string $message Optional message.
 * @return string
 */
function sps_whatsapp_href( $message = '' ) {
	$number = preg_replace( '/[^0-9]/', '', sps_option( 'phone_raw' ) );
	$text   = '' !== $message ? $message : sps_option( 'whatsapp_msg' );

	return 'https://wa.me/' . $number . '?text=' . rawurlencode( $text );
}

/**
 * Countries served, parsed from the "Name|flag" option lines.
 *
 * @return array List of array( 'name' => ..., 'flag' => ... ).
 */
function sps_countries() {
	$out   = array();
	$lines = preg_split( '/\r\n|\r|\n/', (string) sps_option( 'countries' ) );

	foreach ( $lines as $line ) {
		$line = trim( $line );
		if ( '' === $line ) {
			continue;
		}
		$parts = explode( '|', $line );
		$out[] = array(
			'name' => trim( $parts[0] ),
			'flag' => isset( $parts[1] ) ? trim( $parts[1] ) : '',
		);
	}

	return $out;
}

/**
 * Languages served as an array.
 *
 * @return array
 */
function sps_languages() {
	return array_filter( array_map( 'trim', explode( ',', (string) sps_option( 'languages' ) ) ) );
}

/**
 * Print the site logo (custom logo if set, else the text lockup).
 */
function sps_the_logo() {
	if ( has_custom_logo() ) {
		the_custom_logo();
		return;
	}
	?>
	<a class="sps-logo" href="<?php echo esc_url( home_url( '/' ) ); ?>" rel="home">
		<span class="sps-logo__mark" aria-hidden="true">+</span>
		<span>
			<span class="sps-logo__name"><?php bloginfo( 'name' ); ?></span>
			<span class="sps-logo__tag"><?php echo esc_html( sps_option( 'tagline' ) ); ?></span>
		</span>
	</a>
	<?php
}

/**
 * Treatment meta value.
 *
 * @param string   $key     Meta key without the _sps_ prefix.
 * @param int|null $post_id Post ID.
 * @return string
 */
function sps_meta( $key, $post_id = null ) {
	$post_id = $post_id ? $post_id : get_the_ID();
	return (string) get_post_meta( $post_id, '_sps_' . $key, true );
}

/**
 * Treatment meta value split into a clean list (one item per line).
 *
 * @param string   $key     Meta key without the _sps_ prefix.
 * @param int|null $post_id Post ID.
 * @return array
 */
function sps_meta_list( $key, $post_id = null ) {
	$raw = sps_meta( $key, $post_id );
	if ( '' === $raw ) {
		return array();
	}
	$lines = preg_split( '/\r\n|\r|\n/', $raw );

	return array_values( array_filter( array_map( 'trim', $lines ) ) );
}

/**
 * The inclusions list shown on every treatment (editable in the Customizer).
 *
 * @return array
 */
function sps_inclusions() {
	$default = "Free expert second opinion and written treatment plan\nMedical visa invitation letter within 24 hours\nComplimentary airport pickup and drop at Delhi IGI\nAccommodation booking near your hospital\nDedicated language interpreter during your stay\n24/7 WhatsApp care manager on " . sps_option( 'phone' );

	$raw   = get_theme_mod( 'sps_inclusions', $default );
	$raw   = '' === $raw ? $default : $raw;
	$lines = preg_split( '/\r\n|\r|\n/', $raw );

	return array_values( array_filter( array_map( 'trim', $lines ) ) );
}

/**
 * Specialty name for a treatment (first term of the sps_specialty taxonomy).
 *
 * @param int|null $post_id Post ID.
 * @return string
 */
function sps_specialty_name( $post_id = null ) {
	$post_id = $post_id ? $post_id : get_the_ID();
	$terms   = get_the_terms( $post_id, 'sps_specialty' );

	if ( is_wp_error( $terms ) || empty( $terms ) ) {
		return '';
	}

	return $terms[0]->name;
}

/**
 * Fallback image URL when a treatment has no featured image.
 *
 * @return string
 */
function sps_placeholder_image() {
	return get_template_directory_uri() . '/assets/img/placeholder.svg';
}

/**
 * Featured image URL with graceful fallback.
 *
 * @param string   $size    Image size.
 * @param int|null $post_id Post ID.
 * @return string
 */
function sps_thumbnail_url( $size = 'sps-treatment-card', $post_id = null ) {
	$post_id = $post_id ? $post_id : get_the_ID();
	$url     = get_the_post_thumbnail_url( $post_id, $size );

	return $url ? $url : sps_placeholder_image();
}

/**
 * The treatments archive URL (uses the page with the Treatments template if present).
 *
 * @return string
 */
function sps_treatments_url() {
	$pages = get_posts(
		array(
			'post_type'      => 'page',
			'posts_per_page' => 1,
			'meta_key'       => '_wp_page_template',
			'meta_value'     => 'page-treatments.php',
			'fields'         => 'ids',
		)
	);

	if ( ! empty( $pages ) ) {
		return get_permalink( $pages[0] );
	}

	return get_post_type_archive_link( 'sps_treatment' );
}

/**
 * The contact page URL (page using the Contact template, else /contact/).
 *
 * @return string
 */
function sps_contact_url() {
	$pages = get_posts(
		array(
			'post_type'      => 'page',
			'posts_per_page' => 1,
			'meta_key'       => '_wp_page_template',
			'meta_value'     => 'page-contact.php',
			'fields'         => 'ids',
		)
	);

	if ( ! empty( $pages ) ) {
		return get_permalink( $pages[0] );
	}

	$page = get_page_by_path( 'contact' );

	return $page ? get_permalink( $page ) : home_url( '/contact/' );
}
