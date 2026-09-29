<?php
/**
 * Template Name: Services
 * Description: The six patient services plus the step-by-step patient journey.
 *
 * @package SPS_Medcare
 */

get_header();

$sps_services = array(
	array( 'file-text', __( 'Medical Treatment Coordination', 'sps-medcare' ), __( 'Free expert second opinions, written treatment plans and confirmed doctor appointments at premier hospitals including Fortis, Max, Medanta and Apollo. We match your diagnosis to the right specialist — not just the nearest hospital.', 'sps-medcare' ) ),
	array( 'plane', __( 'Medical Visa Assistance', 'sps-medcare' ), __( 'Official medical visa invitation letters issued within 24 hours for both patient and attendant, plus step-by-step guidance for your Indian embassy or e-visa application.', 'sps-medcare' ) ),
	array( 'car', __( 'Airport Transportation', 'sps-medcare' ), __( 'Complimentary airport pickup and drop at Delhi IGI in a patient-ready vehicle with a dedicated driver, plus every hospital transfer during your stay.', 'sps-medcare' ) ),
	array( 'home', __( 'Accommodation Assistance', 'sps-medcare' ), __( 'Hygienic guest houses, serviced apartments with kitchen facilities, or 4/5-star hotels within minutes of your hospital — booked to your budget and family size.', 'sps-medcare' ) ),
	array( 'languages', __( 'Language Interpreter Support', 'sps-medcare' ), __( 'Dedicated interpreters accompany you through consultations, admission and discharge so nothing is lost in translation.', 'sps-medcare' ) ),
	array( 'message', __( '24/7 WhatsApp & Care Support', 'sps-medcare' ), __( 'A named care manager on standby around the clock for medicine refills, follow-up appointments, currency exchange and local SIM cards.', 'sps-medcare' ) ),
);

$sps_journey = array(
	array( '01', __( 'Share your reports', 'sps-medcare' ), __( 'Send your diagnosis, scans and reports on WhatsApp or email. There is no charge and no obligation at any stage.', 'sps-medcare' ) ),
	array( '02', __( 'Free opinion & cost estimate', 'sps-medcare' ), __( 'Within 48 hours you receive a written opinion from a relevant specialist plus an itemised cost estimate.', 'sps-medcare' ) ),
	array( '03', __( 'Medical visa & travel', 'sps-medcare' ), __( 'We issue your visa invitation letter within 24 hours and help you plan flights for patient and attendant.', 'sps-medcare' ) ),
	array( '04', __( 'Arrival & admission', 'sps-medcare' ), __( 'We meet you at Delhi IGI, take you to your accommodation, and handle all hospital admission paperwork.', 'sps-medcare' ) ),
	array( '05', __( 'Treatment & recovery', 'sps-medcare' ), __( 'Your interpreter and care manager stay with you through treatment, discharge and the recovery review.', 'sps-medcare' ) ),
	array( '06', __( 'Follow-up back home', 'sps-medcare' ), __( 'You fly home with a complete discharge summary and medication plan, plus teleconsultation follow-up.', 'sps-medcare' ) ),
);
?>

<section class="sps-pagehero">
	<div class="sps-container">
		<p class="sps-eyebrow"><?php esc_html_e( 'Our Services', 'sps-medcare' ); ?></p>
		<h1><?php the_title(); ?></h1>
		<p class="sps-lede">
			<?php esc_html_e( 'Treatment is only part of the journey. These six services cover everything else — and all of them are included free when you travel through SPS Medcare.', 'sps-medcare' ); ?>
		</p>
	</div>
</section>

<section class="sps-section">
	<div class="sps-container">
		<div class="sps-grid sps-grid--3">
			<?php foreach ( $sps_services as $sps_s ) : ?>
				<div class="sps-card sps-card--hover">
					<div class="sps-card__body">
						<span class="sps-icon-badge"><?php echo sps_icon( $sps_s[0], 19 ); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?></span>
						<h3><?php echo esc_html( $sps_s[1] ); ?></h3>
						<p><?php echo esc_html( $sps_s[2] ); ?></p>
					</div>
				</div>
			<?php endforeach; ?>
		</div>

		<figure class="sps-figure sps-figure--wide" style="margin-top:34px;">
			<img
				src="<?php echo esc_url( get_theme_mod( 'sps_services_image', sps_asset_img( 'airport-pickup.jpg' ) ) ); ?>"
				alt="<?php esc_attr_e( 'Complimentary airport pickup at Delhi IGI for medical travellers', 'sps-medcare' ); ?>"
				loading="lazy"
			/>
			<figcaption><?php esc_html_e( 'We meet every patient at Delhi IGI — day or night.', 'sps-medcare' ); ?></figcaption>
		</figure>
	</div>
</section>

<section class="sps-section sps-section--white">
	<div class="sps-container">
		<p class="sps-eyebrow"><?php esc_html_e( 'How It Works', 'sps-medcare' ); ?></p>
		<h2><?php esc_html_e( 'Your Patient Journey, Step by Step', 'sps-medcare' ); ?></h2>
		<div class="sps-grid sps-grid--3" style="margin-top:30px;">
			<?php foreach ( $sps_journey as $sps_j ) : ?>
				<div class="sps-step">
					<span class="sps-step__num"><?php echo esc_html( $sps_j[0] ); ?></span>
					<h3><?php echo esc_html( $sps_j[1] ); ?></h3>
					<p><?php echo esc_html( $sps_j[2] ); ?></p>
				</div>
			<?php endforeach; ?>
		</div>
	</div>
</section>

<?php if ( trim( (string) get_post_field( 'post_content', get_the_ID() ) ) ) : ?>
	<section class="sps-section">
		<div class="sps-container sps-prose" style="max-width:860px;">
			<?php the_content(); ?>
		</div>
	</section>
<?php endif; ?>

<section class="sps-section sps-section--tight">
	<div class="sps-container">
		<div class="sps-cta">
			<span class="sps-cta__icon"><?php echo sps_icon( 'stethoscope', 24 ); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?></span>
			<h2><?php esc_html_e( 'Every Service Above Is Free', 'sps-medcare' ); ?></h2>
			<p><?php esc_html_e( 'We never charge patients and never mark up hospital bills. Send your reports and we will take it from there.', 'sps-medcare' ); ?></p>
			<div class="sps-cta__actions">
				<a class="sps-btn sps-btn--whatsapp sps-btn--lg" href="<?php echo esc_url( sps_whatsapp_href() ); ?>" target="_blank" rel="noopener noreferrer">
					<?php echo sps_whatsapp_icon( 18 ); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>
					<?php
					/* translators: %s: phone number */
					printf( esc_html__( 'WhatsApp %s', 'sps-medcare' ), esc_html( sps_option( 'phone' ) ) );
					?>
				</a>
				<a class="sps-btn sps-btn--light sps-btn--lg" href="<?php echo esc_url( sps_contact_url() ); ?>">
					<?php esc_html_e( 'Send My Reports', 'sps-medcare' ); ?>
				</a>
			</div>
		</div>
	</div>
</section>

<?php get_footer(); ?>
