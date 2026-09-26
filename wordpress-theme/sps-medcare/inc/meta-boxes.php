<?php
/**
 * Treatment meta box: cost comparison, stay, procedures, hospitals.
 *
 * @package SPS_Medcare
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Field definitions for the treatment meta box.
 *
 * @return array
 */
function sps_treatment_fields() {
	return array(
		'cost_india'    => array(
			'label' => __( 'Cost in India (USD)', 'sps-medcare' ),
			'type'  => 'text',
			'hint'  => __( 'e.g. $4,200 – $7,000', 'sps-medcare' ),
		),
		'cost_west'     => array(
			'label' => __( 'Cost abroad (USD)', 'sps-medcare' ),
			'type'  => 'text',
			'hint'  => __( 'e.g. $60,000+ (USA)', 'sps-medcare' ),
		),
		'savings'       => array(
			'label' => __( 'Savings (%)', 'sps-medcare' ),
			'type'  => 'number',
			'hint'  => __( 'Whole number, e.g. 88', 'sps-medcare' ),
		),
		'hospital_stay' => array(
			'label' => __( 'Hospital stay', 'sps-medcare' ),
			'type'  => 'text',
			'hint'  => __( 'e.g. 5 – 7 days', 'sps-medcare' ),
		),
		'stay_india'    => array(
			'label' => __( 'Total days in India', 'sps-medcare' ),
			'type'  => 'text',
			'hint'  => __( 'e.g. 12 – 16 days', 'sps-medcare' ),
		),
		'success_rate'  => array(
			'label' => __( 'Outcomes / success rate', 'sps-medcare' ),
			'type'  => 'text',
			'hint'  => __( 'e.g. 98%+ for elective CABG', 'sps-medcare' ),
		),
		'procedures'    => array(
			'label' => __( 'Procedures covered', 'sps-medcare' ),
			'type'  => 'textarea',
			'hint'  => __( 'One procedure per line.', 'sps-medcare' ),
		),
		'hospitals'     => array(
			'label' => __( 'Leading hospitals', 'sps-medcare' ),
			'type'  => 'textarea',
			'hint'  => __( 'One hospital per line.', 'sps-medcare' ),
		),
	);
}

/**
 * Register the meta box.
 */
function sps_add_treatment_meta_box() {
	add_meta_box(
		'sps_treatment_details',
		__( 'Treatment Details (cost, stay, procedures)', 'sps-medcare' ),
		'sps_render_treatment_meta_box',
		'sps_treatment',
		'normal',
		'high'
	);
}
add_action( 'add_meta_boxes', 'sps_add_treatment_meta_box' );

/**
 * Render the meta box.
 *
 * @param WP_Post $post Post object.
 */
function sps_render_treatment_meta_box( $post ) {
	wp_nonce_field( 'sps_save_treatment_' . $post->ID, 'sps_treatment_nonce' );
	?>
	<style>
		.sps-mb { display: grid; grid-template-columns: repeat(2, 1fr); gap: 16px; margin-top: 8px; }
		.sps-mb .sps-mb-field--full { grid-column: 1 / -1; }
		.sps-mb label { display: block; font-weight: 600; margin-bottom: 4px; }
		.sps-mb input[type="text"], .sps-mb input[type="number"], .sps-mb textarea { width: 100%; }
		.sps-mb textarea { min-height: 120px; }
		.sps-mb .sps-mb-hint { color: #646970; font-size: 12px; margin-top: 3px; }
	</style>
	<div class="sps-mb">
		<?php foreach ( sps_treatment_fields() as $key => $field ) : ?>
			<?php
			$value = get_post_meta( $post->ID, '_sps_' . $key, true );
			$class = 'textarea' === $field['type'] ? 'sps-mb-field sps-mb-field--full' : 'sps-mb-field';
			?>
			<div class="<?php echo esc_attr( $class ); ?>">
				<label for="sps_<?php echo esc_attr( $key ); ?>"><?php echo esc_html( $field['label'] ); ?></label>
				<?php if ( 'textarea' === $field['type'] ) : ?>
					<textarea id="sps_<?php echo esc_attr( $key ); ?>" name="sps_<?php echo esc_attr( $key ); ?>" rows="6"><?php echo esc_textarea( $value ); ?></textarea>
				<?php else : ?>
					<input
						type="<?php echo esc_attr( $field['type'] ); ?>"
						id="sps_<?php echo esc_attr( $key ); ?>"
						name="sps_<?php echo esc_attr( $key ); ?>"
						value="<?php echo esc_attr( $value ); ?>"
					/>
				<?php endif; ?>
				<p class="sps-mb-hint"><?php echo esc_html( $field['hint'] ); ?></p>
			</div>
		<?php endforeach; ?>
	</div>
	<?php
}

/**
 * Save the meta box.
 *
 * @param int $post_id Post ID.
 */
function sps_save_treatment_meta( $post_id ) {
	if ( ! isset( $_POST['sps_treatment_nonce'] ) ) {
		return;
	}

	$nonce = sanitize_text_field( wp_unslash( $_POST['sps_treatment_nonce'] ) );
	if ( ! wp_verify_nonce( $nonce, 'sps_save_treatment_' . $post_id ) ) {
		return;
	}

	if ( defined( 'DOING_AUTOSAVE' ) && DOING_AUTOSAVE ) {
		return;
	}

	if ( ! current_user_can( 'edit_post', $post_id ) ) {
		return;
	}

	foreach ( sps_treatment_fields() as $key => $field ) {
		$name = 'sps_' . $key;

		if ( ! isset( $_POST[ $name ] ) ) {
			continue;
		}

		$raw = wp_unslash( $_POST[ $name ] );

		if ( 'textarea' === $field['type'] ) {
			$value = sanitize_textarea_field( $raw );
		} elseif ( 'number' === $field['type'] ) {
			$value = absint( $raw );
		} else {
			$value = sanitize_text_field( $raw );
		}

		update_post_meta( $post_id, '_sps_' . $key, $value );
	}
}
add_action( 'save_post_sps_treatment', 'sps_save_treatment_meta' );
