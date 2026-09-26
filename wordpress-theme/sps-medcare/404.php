<?php
/**
 * 404 page.
 *
 * @package SPS_Medcare
 */

get_header();
?>

<section class="sps-pagehero">
	<div class="sps-container">
		<p class="sps-eyebrow">404</p>
		<h1><?php esc_html_e( 'That page has moved or never existed', 'sps-medcare' ); ?></h1>
		<p class="sps-lede"><?php esc_html_e( 'Let us get you back on track — browse treatments or talk to a patient coordinator now.', 'sps-medcare' ); ?></p>
	</div>
</section>

<section class="sps-section">
	<div class="sps-container" style="max-width:720px;">
		<div class="sps-card">
			<div class="sps-card__body">
				<?php get_search_form(); ?>
				<div style="display:flex;flex-wrap:wrap;gap:12px;margin-top:20px;">
					<a class="sps-btn sps-btn--primary sps-btn--sm" href="<?php echo esc_url( home_url( '/' ) ); ?>">
						<?php esc_html_e( 'Go to Homepage', 'sps-medcare' ); ?>
					</a>
					<a class="sps-btn sps-btn--outline sps-btn--sm" href="<?php echo esc_url( sps_treatments_url() ); ?>">
						<?php esc_html_e( 'All Treatments', 'sps-medcare' ); ?>
					</a>
					<a class="sps-btn sps-btn--outline sps-btn--sm" href="<?php echo esc_url( sps_contact_url() ); ?>">
						<?php esc_html_e( 'Contact Us', 'sps-medcare' ); ?>
					</a>
				</div>
			</div>
		</div>
	</div>
</section>

<?php get_footer(); ?>
