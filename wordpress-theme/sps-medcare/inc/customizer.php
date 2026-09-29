<?php
/**
 * Customizer: all contact details and hero copy editable without code.
 *
 * @package SPS_Medcare
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Register Customizer settings.
 *
 * @param WP_Customize_Manager $wp_customize Customizer instance.
 */
function sps_customize_register( $wp_customize ) {

	$wp_customize->add_panel(
		'sps_panel',
		array(
			'title'       => __( 'SPS Medcare', 'sps-medcare' ),
			'description' => __( 'Contact details, hero copy and patient-facing content.', 'sps-medcare' ),
			'priority'    => 20,
		)
	);

	/* ---------- Contact details ---------- */
	$wp_customize->add_section(
		'sps_contact',
		array(
			'title' => __( 'Contact Details', 'sps-medcare' ),
			'panel' => 'sps_panel',
		)
	);

	$contact_fields = array(
		'phone'        => array( __( 'Mobile / WhatsApp (display)', 'sps-medcare' ), 'text' ),
		'phone_raw'    => array( __( 'Mobile with country code, digits only', 'sps-medcare' ), 'text' ),
		'landline'     => array( __( 'Office landline (display)', 'sps-medcare' ), 'text' ),
		'landline_raw' => array( __( 'Landline with country code, digits only', 'sps-medcare' ), 'text' ),
		'email'        => array( __( 'Email address', 'sps-medcare' ), 'email' ),
		'address'      => array( __( 'Office address (one line per row)', 'sps-medcare' ), 'textarea' ),
		'hours'        => array( __( 'Opening hours text', 'sps-medcare' ), 'text' ),
		'cert'         => array( __( 'Accreditation line', 'sps-medcare' ), 'text' ),
		'tagline'      => array( __( 'Logo tagline', 'sps-medcare' ), 'text' ),
		'whatsapp_msg' => array( __( 'Prefilled WhatsApp message', 'sps-medcare' ), 'textarea' ),
	);

	foreach ( $contact_fields as $key => $meta ) {
		list( $label, $type ) = $meta;

		$wp_customize->add_setting(
			'sps_' . $key,
			array(
				'default'           => sps_option( $key ),
				'sanitize_callback' => 'email' === $type ? 'sanitize_email' : ( 'textarea' === $type ? 'sanitize_textarea_field' : 'sanitize_text_field' ),
				'transport'         => 'refresh',
			)
		);

		$wp_customize->add_control(
			'sps_' . $key,
			array(
				'label'   => $label,
				'section' => 'sps_contact',
				'type'    => 'textarea' === $type ? 'textarea' : ( 'email' === $type ? 'email' : 'text' ),
			)
		);
	}

	/* ---------- Reach ---------- */
	$wp_customize->add_section(
		'sps_reach',
		array(
			'title'       => __( 'Countries & Languages', 'sps-medcare' ),
			'description' => __( 'Countries use the format: Country Name|flag emoji — one per line.', 'sps-medcare' ),
			'panel'       => 'sps_panel',
		)
	);

	$wp_customize->add_setting(
		'sps_countries',
		array(
			'default'           => sps_option( 'countries' ),
			'sanitize_callback' => 'sanitize_textarea_field',
		)
	);
	$wp_customize->add_control(
		'sps_countries',
		array(
			'label'   => __( 'Countries served', 'sps-medcare' ),
			'section' => 'sps_reach',
			'type'    => 'textarea',
		)
	);

	$wp_customize->add_setting(
		'sps_languages',
		array(
			'default'           => sps_option( 'languages' ),
			'sanitize_callback' => 'sanitize_text_field',
		)
	);
	$wp_customize->add_control(
		'sps_languages',
		array(
			'label'       => __( 'Languages supported', 'sps-medcare' ),
			'description' => __( 'Comma separated.', 'sps-medcare' ),
			'section'     => 'sps_reach',
			'type'        => 'text',
		)
	);

	$wp_customize->add_setting(
		'sps_inclusions',
		array(
			'default'           => implode( "\n", sps_inclusions() ),
			'sanitize_callback' => 'sanitize_textarea_field',
		)
	);
	$wp_customize->add_control(
		'sps_inclusions',
		array(
			'label'       => __( 'What we include free (per treatment)', 'sps-medcare' ),
			'description' => __( 'One item per line. Shown on every treatment page.', 'sps-medcare' ),
			'section'     => 'sps_reach',
			'type'        => 'textarea',
		)
	);

	/* ---------- Hero ---------- */
	$wp_customize->add_section(
		'sps_hero',
		array(
			'title' => __( 'Home Hero', 'sps-medcare' ),
			'panel' => 'sps_panel',
		)
	);

	$hero_fields = array(
		'hero_badge'    => array( __( 'Badge text', 'sps-medcare' ), 'JCI & NABH Accredited Partner Hospitals', 'text' ),
		'hero_title'    => array( __( 'Heading (wrap highlighted words in <em>)', 'sps-medcare' ), 'World-Class Medical Treatment in India — <em>At a Fraction of the Cost</em>', 'textarea' ),
		'hero_text'     => array( __( 'Intro paragraph', 'sps-medcare' ), 'We are dedicated to making your medical journey smooth, safe and stress-free. Trusted by <strong>2,500+ patients</strong> from Bangladesh, Nepal, Sri Lanka, UAE, Nigeria, Afghanistan, Iraq, Maldives, Oman and beyond.', 'textarea' ),
		'hero_note'     => array( __( 'Highlighted note', 'sps-medcare' ), '<strong>Our service is free for patients.</strong> Send your medical reports and receive a written specialist opinion plus an itemised cost estimate within 48 hours — no charge, no obligation.', 'textarea' ),
		'hero_image'    => array( __( 'Hero background image URL (blank = bundled photo)', 'sps-medcare' ), '', 'url' ),
		'hero_image_2'  => array( __( 'Hero side image URL (blank = bundled photo)', 'sps-medcare' ), '', 'url' ),
		'services_image' => array( __( 'Services section image URL (blank = bundled airport photo)', 'sps-medcare' ), '', 'url' ),
		'why_image'      => array( __( 'Why India image URL (blank = bundled operating theatre photo)', 'sps-medcare' ), '', 'url' ),
		'recovery_image' => array( __( 'Recovery section image URL (blank = bundled Taj Mahal photo)', 'sps-medcare' ), '', 'url' ),
	);

	foreach ( $hero_fields as $key => $meta ) {
		list( $label, $default, $type ) = $meta;

		$wp_customize->add_setting(
			'sps_' . $key,
			array(
				'default'           => $default,
				'sanitize_callback' => 'url' === $type ? 'esc_url_raw' : ( 'textarea' === $type ? 'wp_kses_post' : 'sanitize_text_field' ),
			)
		);

		$wp_customize->add_control(
			'sps_' . $key,
			array(
				'label'   => $label,
				'section' => 'sps_hero',
				'type'    => 'textarea' === $type ? 'textarea' : ( 'url' === $type ? 'url' : 'text' ),
			)
		);
	}

	/* ---------- Stats ---------- */
	$wp_customize->add_section(
		'sps_stats',
		array(
			'title'       => __( 'Trust Stats', 'sps-medcare' ),
			'description' => __( 'Four stats shown under the hero.', 'sps-medcare' ),
			'panel'       => 'sps_panel',
		)
	);

	$stat_defaults = array(
		1 => array( '2,500+', 'International patients guided' ),
		2 => array( '12+', 'Countries served' ),
		3 => array( '60–90%', 'Savings vs USA & UK' ),
		4 => array( '24/7', 'Patient desk on WhatsApp' ),
	);

	foreach ( $stat_defaults as $i => $pair ) {
		foreach ( array( 'value', 'label' ) as $n => $part ) {
			$id = 'sps_stat' . $i . '_' . $part;

			$wp_customize->add_setting(
				$id,
				array(
					'default'           => $pair[ $n ],
					'sanitize_callback' => 'sanitize_text_field',
				)
			);
			$wp_customize->add_control(
				$id,
				array(
					/* translators: 1: stat number, 2: field name */
					'label'   => sprintf( __( 'Stat %1$d %2$s', 'sps-medcare' ), $i, $part ),
					'section' => 'sps_stats',
					'type'    => 'text',
				)
			);
		}
	}

	/* ---------- Enquiry notifications ---------- */
	$wp_customize->add_section(
		'sps_notify',
		array(
			'title'       => __( 'Enquiry Notifications', 'sps-medcare' ),
			'description' => __( 'Where patient enquiries are emailed. Enquiries are also saved under Enquiries in the admin menu.', 'sps-medcare' ),
			'panel'       => 'sps_panel',
		)
	);

	$wp_customize->add_setting(
		'sps_notify_email',
		array(
			'default'           => sps_option( 'email' ),
			'sanitize_callback' => 'sanitize_email',
		)
	);
	$wp_customize->add_control(
		'sps_notify_email',
		array(
			'label'   => __( 'Send enquiry notifications to', 'sps-medcare' ),
			'section' => 'sps_notify',
			'type'    => 'email',
		)
	);
}
add_action( 'customize_register', 'sps_customize_register' );

/**
 * Stat accessor.
 *
 * @param int    $index Stat index 1-4.
 * @param string $part  'value' or 'label'.
 * @return string
 */
function sps_stat( $index, $part ) {
	$defaults = array(
		1 => array( 'value' => '2,500+', 'label' => __( 'International patients guided', 'sps-medcare' ) ),
		2 => array( 'value' => '12+', 'label' => __( 'Countries served', 'sps-medcare' ) ),
		3 => array( 'value' => '60–90%', 'label' => __( 'Savings vs USA & UK', 'sps-medcare' ) ),
		4 => array( 'value' => '24/7', 'label' => __( 'Patient desk on WhatsApp', 'sps-medcare' ) ),
	);

	$index   = absint( $index );
	$default = isset( $defaults[ $index ][ $part ] ) ? $defaults[ $index ][ $part ] : '';
	$value   = get_theme_mod( 'sps_stat' . $index . '_' . $part, $default );

	return (string) ( '' === $value ? $default : $value );
}
