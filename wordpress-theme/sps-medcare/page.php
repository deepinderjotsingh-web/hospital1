<?php
/**
 * Default page template.
 *
 * @package SPS_Medcare
 */

get_header();

while ( have_posts() ) :
	the_post();
	?>
	<section class="sps-pagehero">
		<div class="sps-container">
			<p class="sps-eyebrow"><?php esc_html_e( 'SPS Medcare', 'sps-medcare' ); ?></p>
			<h1><?php the_title(); ?></h1>
		</div>
	</section>

	<section class="sps-section">
		<div class="sps-container" style="max-width:860px;">
			<article <?php post_class( 'sps-card' ); ?>>
				<div class="sps-card__body sps-prose">
					<?php
					if ( has_post_thumbnail() ) {
						the_post_thumbnail( 'sps-treatment-hero', array( 'style' => 'width:100%;height:auto;border-radius:16px;margin-bottom:24px;' ) );
					}
					the_content();
					wp_link_pages();
					?>
				</div>
			</article>
		</div>
	</section>
	<?php
endwhile;

get_footer();
