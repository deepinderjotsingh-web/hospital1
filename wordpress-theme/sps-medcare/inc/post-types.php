<?php
/**
 * Treatments custom post type, Specialty taxonomy and the Enquiries CPT.
 *
 * @package SPS_Medcare
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Register post types and taxonomies.
 */
function sps_register_post_types() {

	register_post_type(
		'sps_treatment',
		array(
			'labels'        => array(
				'name'               => __( 'Treatments', 'sps-medcare' ),
				'singular_name'      => __( 'Treatment', 'sps-medcare' ),
				'add_new'            => __( 'Add New Treatment', 'sps-medcare' ),
				'add_new_item'       => __( 'Add New Treatment', 'sps-medcare' ),
				'edit_item'          => __( 'Edit Treatment', 'sps-medcare' ),
				'new_item'           => __( 'New Treatment', 'sps-medcare' ),
				'view_item'          => __( 'View Treatment', 'sps-medcare' ),
				'search_items'       => __( 'Search Treatments', 'sps-medcare' ),
				'not_found'          => __( 'No treatments found', 'sps-medcare' ),
				'menu_name'          => __( 'Treatments', 'sps-medcare' ),
			),
			'public'        => true,
			'has_archive'   => true,
			'menu_icon'     => 'dashicons-heart',
			'menu_position' => 20,
			'supports'      => array( 'title', 'editor', 'excerpt', 'thumbnail', 'revisions', 'page-attributes' ),
			'rewrite'       => array( 'slug' => 'treatments', 'with_front' => false ),
			'show_in_rest'  => true,
		)
	);

	register_taxonomy(
		'sps_specialty',
		'sps_treatment',
		array(
			'labels'            => array(
				'name'          => __( 'Specialties', 'sps-medcare' ),
				'singular_name' => __( 'Specialty', 'sps-medcare' ),
				'add_new_item'  => __( 'Add New Specialty', 'sps-medcare' ),
				'menu_name'     => __( 'Specialties', 'sps-medcare' ),
			),
			'public'            => true,
			'hierarchical'      => true,
			'show_admin_column' => true,
			'show_in_rest'      => true,
			'rewrite'           => array( 'slug' => 'specialty', 'with_front' => false ),
		)
	);

	register_post_type(
		'sps_enquiry',
		array(
			'labels'          => array(
				'name'          => __( 'Patient Enquiries', 'sps-medcare' ),
				'singular_name' => __( 'Enquiry', 'sps-medcare' ),
				'menu_name'     => __( 'Enquiries', 'sps-medcare' ),
				'edit_item'     => __( 'View Enquiry', 'sps-medcare' ),
				'not_found'     => __( 'No enquiries yet', 'sps-medcare' ),
			),
			'public'          => false,
			'show_ui'         => true,
			'menu_icon'       => 'dashicons-email-alt',
			'menu_position'   => 21,
			'supports'        => array( 'title', 'editor' ),
			'capabilities'    => array( 'create_posts' => 'do_not_allow' ),
			'map_meta_cap'    => true,
		)
	);
}
add_action( 'init', 'sps_register_post_types' );

/**
 * Show treatments ordered by menu order on the archive.
 *
 * @param WP_Query $query Query.
 */
function sps_treatment_archive_order( $query ) {
	if ( is_admin() || ! $query->is_main_query() ) {
		return;
	}

	if ( $query->is_post_type_archive( 'sps_treatment' ) || $query->is_tax( 'sps_specialty' ) ) {
		$query->set( 'orderby', array( 'menu_order' => 'ASC', 'date' => 'ASC' ) );
		$query->set( 'posts_per_page', 12 );
	}
}
add_action( 'pre_get_posts', 'sps_treatment_archive_order' );

/**
 * Enquiry admin columns.
 *
 * @param array $columns Columns.
 * @return array
 */
function sps_enquiry_columns( $columns ) {
	return array(
		'cb'            => isset( $columns['cb'] ) ? $columns['cb'] : '',
		'title'         => __( 'Patient', 'sps-medcare' ),
		'sps_phone'     => __( 'Phone / WhatsApp', 'sps-medcare' ),
		'sps_country'   => __( 'Country', 'sps-medcare' ),
		'sps_treatment' => __( 'Treatment', 'sps-medcare' ),
		'date'          => __( 'Received', 'sps-medcare' ),
	);
}
add_filter( 'manage_sps_enquiry_posts_columns', 'sps_enquiry_columns' );

/**
 * Enquiry admin column values.
 *
 * @param string $column  Column key.
 * @param int    $post_id Post ID.
 */
function sps_enquiry_column_content( $column, $post_id ) {
	$map = array(
		'sps_phone'     => '_sps_enq_phone',
		'sps_country'   => '_sps_enq_country',
		'sps_treatment' => '_sps_enq_treatment',
	);

	if ( isset( $map[ $column ] ) ) {
		echo esc_html( get_post_meta( $post_id, $map[ $column ], true ) );
	}
}
add_action( 'manage_sps_enquiry_posts_custom_column', 'sps_enquiry_column_content', 10, 2 );
