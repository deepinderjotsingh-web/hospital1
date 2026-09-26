<?php
/**
 * Single blog post.
 *
 * @package SPS_Medcare
 */

get_header();

while ( have_posts() ) :
	the_post();
	?>
	<section class="sps-pagehero">
		<div class="sps-container">
			<p class="sps-eyebrow"><?php echo esc_html( get_the_date() ); ?></p>
			<h1><?php the_title(); ?></h1>
		</div>
	</section>

	<section class="sps-section">
		<div class="sps-container" style="display:grid;grid-template-columns:minmax(0,1fr) 320px;gap:32px;">
			<article <?php post_class( 'sps-card' ); ?>>
				<div class="sps-card__body sps-prose">
					<?php
					if ( has_post_thumbnail() ) {
						the_post_thumbnail( 'sps-treatment-hero', array( 'style' => 'width:100%;height:auto;border-radius:16px;margin-bottom:24px;' ) );
					}
					the_content();
					wp_link_pages();
					?>
					<p style="margin-top:28px;">
						<a class="sps-btn sps-btn--primary sps-btn--sm" href="<?php echo esc_url( sps_contact_url() ); ?>">
							<?php esc_html_e( 'Get a free opinion & cost estimate', 'sps-medcare' ); ?>
						</a>
					</p>
				</div>
			</article>
			<?php get_sidebar(); ?>
		</div>
	</section>

	<div class="sps-container" style="padding-bottom:48px;">
		<?php the_post_navigation( array( 'prev_text' => '&larr; %title', 'next_text' => '%title &rarr;' ) ); ?>
	</div>
	<?php
endwhile;

get_footer();
