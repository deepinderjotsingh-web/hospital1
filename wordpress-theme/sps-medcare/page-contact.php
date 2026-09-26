<?php
/**
 * Template Name: Contact / Enquiry
 * Description: Contact channels plus the patient enquiry form.
 *
 * @package SPS_Medcare
 */

get_header();

$sps_address_lines = array_values( array_filter( array_map( 'trim', preg_split( '/\r\n|\r|\n/', sps_option( 'address' ) ) ) ) );
$sps_prefill       = isset( $_GET['treatment'] ) ? sanitize_text_field( wp_unslash( $_GET['treatment'] ) ) : '';
?>

<section class="sps-pagehero">
	<div class="sps-container">
		<p class="sps-eyebrow"><?php esc_html_e( 'Contact Us', 'sps-medcare' ); ?></p>
		<h1><?php the_title(); ?></h1>
		<p class="sps-lede">
			<?php esc_html_e( 'Send us your diagnosis and recent reports — a relevant specialist will review them and we reply with a written opinion and an itemised cost estimate within 48 hours. There is no charge and no obligation.', 'sps-medcare' ); ?>
		</p>
	</div>
</section>

<section class="sps-section">
	<div class="sps-container" style="display:grid;grid-template-columns:0.9fr 1.1fr;gap:40px;" id="sps-contact-grid">

		<!-- Channels -->
		<div style="display:grid;gap:16px;align-content:start;">
			<div class="sps-card sps-contact-card" style="border-color:#a7f3d0;background:rgba(236,253,245,.5);">
				<span class="sps-contact-card__icon" style="background:#d1fae5;color:#128c4a;">
					<?php echo sps_whatsapp_icon( 19 ); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>
				</span>
				<div>
					<h2><?php esc_html_e( 'WhatsApp (fastest)', 'sps-medcare' ); ?></h2>
					<a class="sps-contact-card__value sps-contact-card__value--green" href="<?php echo esc_url( sps_whatsapp_href() ); ?>" target="_blank" rel="noopener noreferrer">
						<?php echo esc_html( sps_option( 'phone' ) ); ?>
					</a>
					<small><?php esc_html_e( 'Send report photos directly · answered 24/7', 'sps-medcare' ); ?></small>
				</div>
			</div>

			<div class="sps-card sps-contact-card">
				<span class="sps-contact-card__icon"><?php echo sps_icon( 'phone', 19 ); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?></span>
				<div>
					<h2><?php esc_html_e( 'Call us', 'sps-medcare' ); ?></h2>
					<a class="sps-contact-card__value" href="<?php echo esc_url( sps_phone_href() ); ?>">
						<?php echo esc_html( sps_option( 'phone' ) ); ?>
					</a>
					<small><?php echo esc_html( sps_option( 'hours' ) ); ?></small>
				</div>
			</div>

			<?php if ( sps_option( 'landline' ) ) : ?>
				<div class="sps-card sps-contact-card">
					<span class="sps-contact-card__icon"><?php echo sps_icon( 'phone-call', 19 ); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?></span>
					<div>
						<h2><?php esc_html_e( 'Office landline', 'sps-medcare' ); ?></h2>
						<a class="sps-contact-card__value sps-contact-card__value--dark" href="<?php echo esc_url( sps_landline_href() ); ?>">
							<?php echo esc_html( sps_option( 'landline' ) ); ?>
						</a>
						<small><?php esc_html_e( 'Delhi office · business hours', 'sps-medcare' ); ?></small>
					</div>
				</div>
			<?php endif; ?>

			<div class="sps-card sps-contact-card">
				<span class="sps-contact-card__icon"><?php echo sps_icon( 'mail', 19 ); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?></span>
				<div>
					<h2><?php esc_html_e( 'Email your reports', 'sps-medcare' ); ?></h2>
					<a class="sps-contact-card__value sps-contact-card__value--dark" href="mailto:<?php echo esc_attr( sps_option( 'email' ) ); ?>">
						<?php echo esc_html( sps_option( 'email' ) ); ?>
					</a>
					<small><?php esc_html_e( 'Attach scans, reports and prescriptions', 'sps-medcare' ); ?></small>
				</div>
			</div>

			<div class="sps-card sps-contact-card">
				<span class="sps-contact-card__icon"><?php echo sps_icon( 'map-pin', 19 ); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?></span>
				<div>
					<h2><?php esc_html_e( 'Our office', 'sps-medcare' ); ?></h2>
					<address>
						<?php foreach ( $sps_address_lines as $sps_line ) : ?>
							<span style="display:block;"><?php echo esc_html( $sps_line ); ?></span>
						<?php endforeach; ?>
					</address>
				</div>
			</div>

			<div class="sps-card">
				<div class="sps-card__body">
					<h3><?php esc_html_e( 'What to send us', 'sps-medcare' ); ?></h3>
					<ul style="margin:10px 0 0;padding-left:18px;font-size:.9375rem;color:#475569;">
						<li><?php esc_html_e( "Your diagnosis or doctor's summary", 'sps-medcare' ); ?></li>
						<li><?php esc_html_e( 'Recent scans and reports (CT, MRI, PET-CT, biopsy, blood work)', 'sps-medcare' ); ?></li>
						<li><?php esc_html_e( 'Patient age and current medication list', 'sps-medcare' ); ?></li>
						<li><?php esc_html_e( 'Your city and country of travel', 'sps-medcare' ); ?></li>
					</ul>
					<p style="margin-top:12px;font-size:.8125rem;color:#64748b;">
						<?php
						/* translators: %s: list of languages */
						printf( esc_html__( 'We speak %s.', 'sps-medcare' ), esc_html( implode( ', ', sps_languages() ) ) );
						?>
					</p>
				</div>
			</div>
		</div>

		<!-- Form -->
		<div>
			<?php
			if ( get_the_content() ) {
				echo '<div class="sps-content" style="margin-bottom:24px;">';
				the_content();
				echo '</div>';
			}

			sps_enquiry_form( $sps_prefill );
			?>
		</div>
	</div>
</section>

<style>
	@media (max-width: 1024px) {
		#sps-contact-grid { grid-template-columns: 1fr !important; }
	}
</style>

<?php get_footer(); ?>
