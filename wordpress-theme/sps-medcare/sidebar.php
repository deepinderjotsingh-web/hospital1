<?php
/**
 * Blog sidebar.
 *
 * @package SPS_Medcare
 */

?>
<aside class="sps-sidebar" style="display:grid;gap:20px;align-content:start;">
	<?php if ( is_active_sidebar( 'sidebar-1' ) ) : ?>
		<?php dynamic_sidebar( 'sidebar-1' ); ?>
	<?php endif; ?>

	<section class="sps-card">
		<div class="sps-card__body">
			<h3 class="sps-widget__title"><?php esc_html_e( 'Free medical opinion', 'sps-medcare' ); ?></h3>
			<p><?php esc_html_e( 'Send your reports and get a written opinion plus an itemised cost estimate within 48 hours.', 'sps-medcare' ); ?></p>
			<a class="sps-btn sps-btn--primary sps-btn--sm" href="<?php echo esc_url( sps_contact_url() ); ?>">
				<?php esc_html_e( 'Send Reports', 'sps-medcare' ); ?>
			</a>
			<p style="margin:14px 0 0;">
				<a href="<?php echo esc_url( sps_phone_href() ); ?>"><?php echo esc_html( sps_option( 'phone' ) ); ?></a>
			</p>
		</div>
	</section>

	<section class="sps-card">
		<div class="sps-card__body">
			<h3 class="sps-widget__title"><?php esc_html_e( 'Search', 'sps-medcare' ); ?></h3>
			<?php get_search_form(); ?>
		</div>
	</section>
</aside>
