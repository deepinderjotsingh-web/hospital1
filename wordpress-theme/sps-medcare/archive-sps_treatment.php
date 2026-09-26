<?php
/**
 * Treatments archive (also used for the sps_specialty taxonomy).
 *
 * @package SPS_Medcare
 */

get_header();

$sps_is_tax = is_tax( 'sps_specialty' );
?>

<section class="sps-pagehero">
	<div class="sps-container">
		<p class="sps-eyebrow"><?php esc_html_e( 'Treatments in India', 'sps-medcare' ); ?></p>
		<h1>
			<?php
			if ( $sps_is_tax ) {
				echo esc_html( single_term_title( '', false ) );
			} else {
				esc_html_e( 'All Treatments & Procedures', 'sps-medcare' );
			}
			?>
		</h1>
		<p class="sps-lede">
			<?php
			if ( $sps_is_tax && term_description() ) {
				echo wp_kses_post( term_description() );
			} else {
				esc_html_e( 'JCI and NABH accredited hospitals, senior surgeons, and transparent package costs — typically 60–80% below US, UK and Gulf prices.', 'sps-medcare' );
			}
			?>
		</p>
	</div>
</section>

<section class="sps-section">
	<div class="sps-container">
		<?php if ( have_posts() ) : ?>
			<div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(300px,1fr));gap:24px;">
				<?php
				while ( have_posts() ) :
					the_post();
					get_template_part( 'template-parts/treatment-card' );
				endwhile;
				?>
			</div>
			<div style="margin-top:32px;">
				<?php
				the_posts_pagination(
					array(
						'mid_size'  => 1,
						'prev_text' => esc_html__( 'Previous', 'sps-medcare' ),
						'next_text' => esc_html__( 'Next', 'sps-medcare' ),
					)
				);
				?>
			</div>
		<?php else : ?>
			<div class="sps-card">
				<div class="sps-card__body">
					<h2><?php esc_html_e( 'No treatments published yet', 'sps-medcare' ); ?></h2>
					<p><?php esc_html_e( 'Import the demo content from Appearance → Import SPS Demo Content, or add treatments under Treatments → Add New.', 'sps-medcare' ); ?></p>
				</div>
			</div>
		<?php endif; ?>
	</div>
</section>

<?php get_footer(); ?>
