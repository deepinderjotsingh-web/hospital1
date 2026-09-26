<?php
/**
 * Patient enquiry form handling: validation, storage, email notification.
 *
 * @package SPS_Medcare
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Handle the enquiry form POST on init so we can redirect cleanly (no resubmit warning).
 */
function sps_handle_enquiry() {
	if ( empty( $_POST['sps_enquiry_submit'] ) ) {
		return;
	}

	$nonce = isset( $_POST['sps_enquiry_nonce'] ) ? sanitize_text_field( wp_unslash( $_POST['sps_enquiry_nonce'] ) ) : '';
	if ( ! wp_verify_nonce( $nonce, 'sps_enquiry' ) ) {
		sps_enquiry_redirect( 'error' );
	}

	// Simple honeypot — bots fill hidden fields, humans do not.
	if ( ! empty( $_POST['sps_hp'] ) ) {
		sps_enquiry_redirect( 'sent' );
	}

	$name      = isset( $_POST['sps_name'] ) ? sanitize_text_field( wp_unslash( $_POST['sps_name'] ) ) : '';
	$phone     = isset( $_POST['sps_phone'] ) ? sanitize_text_field( wp_unslash( $_POST['sps_phone'] ) ) : '';
	$email     = isset( $_POST['sps_email'] ) ? sanitize_email( wp_unslash( $_POST['sps_email'] ) ) : '';
	$country   = isset( $_POST['sps_country'] ) ? sanitize_text_field( wp_unslash( $_POST['sps_country'] ) ) : '';
	$treatment = isset( $_POST['sps_treatment_name'] ) ? sanitize_text_field( wp_unslash( $_POST['sps_treatment_name'] ) ) : '';
	$message   = isset( $_POST['sps_message'] ) ? sanitize_textarea_field( wp_unslash( $_POST['sps_message'] ) ) : '';

	if ( '' === $name || '' === $phone ) {
		sps_enquiry_redirect( 'invalid' );
	}

	$body = sprintf(
		"Name: %s\nPhone / WhatsApp: %s\nEmail: %s\nCountry: %s\nTreatment: %s\n\nMedical details:\n%s",
		$name,
		$phone,
		$email ? $email : '—',
		$country ? $country : '—',
		$treatment ? $treatment : '—',
		$message ? $message : '—'
	);

	$post_id = wp_insert_post(
		array(
			'post_type'    => 'sps_enquiry',
			'post_status'  => 'publish',
			/* translators: 1: patient name, 2: country */
			'post_title'   => sprintf( __( '%1$s (%2$s)', 'sps-medcare' ), $name, $country ? $country : __( 'country not given', 'sps-medcare' ) ),
			'post_content' => $body,
		)
	);

	if ( is_wp_error( $post_id ) ) {
		sps_enquiry_redirect( 'error' );
	}

	update_post_meta( $post_id, '_sps_enq_name', $name );
	update_post_meta( $post_id, '_sps_enq_phone', $phone );
	update_post_meta( $post_id, '_sps_enq_email', $email );
	update_post_meta( $post_id, '_sps_enq_country', $country );
	update_post_meta( $post_id, '_sps_enq_treatment', $treatment );

	// Email the patient desk.
	$to = get_theme_mod( 'sps_notify_email', sps_option( 'email' ) );
	if ( $to ) {
		$subject = sprintf(
			/* translators: 1: patient name, 2: treatment */
			__( 'New patient enquiry: %1$s — %2$s', 'sps-medcare' ),
			$name,
			$treatment ? $treatment : __( 'general', 'sps-medcare' )
		);

		$headers = array( 'Content-Type: text/plain; charset=UTF-8' );
		if ( $email && is_email( $email ) ) {
			$headers[] = 'Reply-To: ' . $name . ' <' . $email . '>';
		}

		wp_mail( $to, $subject, $body, $headers );
	}

	/**
	 * Fires after an enquiry is stored — hook here for CRM/WhatsApp integrations.
	 *
	 * @param int   $post_id Enquiry post ID.
	 * @param array $data    Submitted data.
	 */
	do_action(
		'sps_enquiry_received',
		$post_id,
		compact( 'name', 'phone', 'email', 'country', 'treatment', 'message' )
	);

	sps_enquiry_redirect( 'sent' );
}
add_action( 'template_redirect', 'sps_handle_enquiry' );

/**
 * Redirect back to the form with a status flag.
 *
 * @param string $status Status slug.
 */
function sps_enquiry_redirect( $status ) {
	$referer = wp_get_referer();
	$target  = $referer ? $referer : sps_contact_url();

	wp_safe_redirect( add_query_arg( 'sps_status', $status, remove_query_arg( 'sps_status', $target ) ) . '#sps-enquiry' );
	exit;
}

/**
 * Print the status notice for the enquiry form.
 */
function sps_enquiry_notice() {
	$status = isset( $_GET['sps_status'] ) ? sanitize_key( wp_unslash( $_GET['sps_status'] ) ) : '';

	if ( '' === $status ) {
		return;
	}

	$messages = array(
		'sent'    => array(
			'success',
			sprintf(
				/* translators: %s: phone number */
				__( 'Thank you — your request has reached our patient desk. A coordinator will reply within 48 hours. For anything urgent, WhatsApp %s.', 'sps-medcare' ),
				sps_option( 'phone' )
			),
		),
		'invalid' => array( 'error', __( 'Please enter your name and a phone number we can reach you on.', 'sps-medcare' ) ),
		'error'   => array(
			'error',
			sprintf(
				/* translators: %s: phone number */
				__( 'Sorry, something went wrong. Please WhatsApp us on %s instead.', 'sps-medcare' ),
				sps_option( 'phone' )
			),
		),
	);

	if ( ! isset( $messages[ $status ] ) ) {
		return;
	}

	printf(
		'<div class="sps-notice sps-notice--%1$s" role="status">%2$s</div>',
		esc_attr( $messages[ $status ][0] ),
		esc_html( $messages[ $status ][1] )
	);
}

/**
 * Render the enquiry form.
 *
 * @param string $treatment Prefilled treatment name.
 */
function sps_enquiry_form( $treatment = '' ) {
	?>
	<div class="sps-card" id="sps-enquiry">
		<div class="sps-card__body">
			<h2><?php esc_html_e( 'Request a Free Opinion', 'sps-medcare' ); ?></h2>
			<p><?php esc_html_e( 'Fill this in and a coordinator will contact you within 48 hours.', 'sps-medcare' ); ?></p>

			<?php sps_enquiry_notice(); ?>

			<form class="sps-form" method="post" action="<?php echo esc_url( sps_contact_url() ); ?>">
				<?php wp_nonce_field( 'sps_enquiry', 'sps_enquiry_nonce' ); ?>
				<input type="hidden" name="sps_enquiry_submit" value="1" />
				<p style="display:none !important;">
					<label for="sps_hp"><?php esc_html_e( 'Leave this field empty', 'sps-medcare' ); ?></label>
					<input type="text" id="sps_hp" name="sps_hp" tabindex="-1" autocomplete="off" />
				</p>

				<div class="sps-field">
					<label for="sps_name"><?php esc_html_e( 'Patient / Your Name *', 'sps-medcare' ); ?></label>
					<input type="text" id="sps_name" name="sps_name" required placeholder="<?php esc_attr_e( 'Full name', 'sps-medcare' ); ?>" />
				</div>

				<div class="sps-field">
					<label for="sps_phone"><?php esc_html_e( 'Phone / WhatsApp *', 'sps-medcare' ); ?></label>
					<input type="tel" id="sps_phone" name="sps_phone" required placeholder="<?php esc_attr_e( 'With country code, e.g. +880 17…', 'sps-medcare' ); ?>" />
				</div>

				<div class="sps-field">
					<label for="sps_email"><?php esc_html_e( 'Email (optional)', 'sps-medcare' ); ?></label>
					<input type="email" id="sps_email" name="sps_email" placeholder="you@example.com" />
				</div>

				<div class="sps-field">
					<label for="sps_country"><?php esc_html_e( 'Country', 'sps-medcare' ); ?></label>
					<select id="sps_country" name="sps_country">
						<option value=""><?php esc_html_e( 'Select your country', 'sps-medcare' ); ?></option>
						<?php foreach ( sps_countries() as $country ) : ?>
							<option value="<?php echo esc_attr( $country['name'] ); ?>">
								<?php echo esc_html( trim( $country['flag'] . ' ' . $country['name'] ) ); ?>
							</option>
						<?php endforeach; ?>
						<option value="Other"><?php esc_html_e( 'Other country', 'sps-medcare' ); ?></option>
					</select>
				</div>

				<div class="sps-field sps-field--full">
					<label for="sps_treatment_name"><?php esc_html_e( 'Treatment Needed (optional)', 'sps-medcare' ); ?></label>
					<input
						type="text"
						id="sps_treatment_name"
						name="sps_treatment_name"
						value="<?php echo esc_attr( $treatment ); ?>"
						placeholder="<?php esc_attr_e( 'e.g. Cardiac Surgery, Liver Transplant, Knee Replacement', 'sps-medcare' ); ?>"
					/>
				</div>

				<div class="sps-field sps-field--full">
					<label for="sps_message"><?php esc_html_e( 'Medical Details', 'sps-medcare' ); ?></label>
					<textarea
						id="sps_message"
						name="sps_message"
						rows="5"
						placeholder="<?php esc_attr_e( 'Describe the diagnosis, patient age, how long the condition has existed, and any treatment already received.', 'sps-medcare' ); ?>"
					></textarea>
				</div>

				<div class="sps-field sps-field--full">
					<button type="submit" class="sps-btn sps-btn--primary sps-btn--lg sps-btn--block">
						<?php echo sps_icon( 'send' ); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>
						<?php esc_html_e( 'Send My Request', 'sps-medcare' ); ?>
					</button>
				</div>

				<p class="sps-form__note">
					<?php esc_html_e( 'Free of charge · No obligation · Your details stay confidential', 'sps-medcare' ); ?>
				</p>
			</form>
		</div>
	</div>
	<?php
}
