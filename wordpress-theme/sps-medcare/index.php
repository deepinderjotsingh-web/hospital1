<?php
/**
 * Fallback template: blog home, archives, and anything without a more specific template.
 *
 * @package SPS_Medcare
 */

get_header();
?>

<section class="sps-pagehero">
	<div class="sps-container">
		<p class="sps-eyebrow"><?php esc_html_e( 'SPS Medcare', 'sps-medcare' ); ?></p>
		<h1>
			<?php
			if ( is_home() && ! is_front_page() ) {
				single_post_title();
			} elseif ( is_archive() ) {
				the_archive_title();
			} elseif ( is_search() ) {
				/* translators: %s: search query */
				printf( esc_html__( 'Search results for “%s”', 'sps-medcare' ), esc_html( get_search_query() ) );
			} else {
				esc_html_e( 'Patient Guides & Updates', 'sps-medcare' );
			}
			?>
		</h1>
		<?php if ( is_archive() && get_the_archive_description() ) : ?>
			<p class="sps-lede"><?php echo wp_kses_post( get_the_archive_description() ); ?></p>
		<?php else : ?>
			<p class="sps-lede"><?php esc_html_e( 'Treatment explainers, hospital notes and travel guidance for international patients coming to India.', 'sps-medcare' ); ?></p>
		<?php endif; ?>
	</div>
</section>

<section class="sps-section">
	<div class="sps-container">
		<?php if ( have_posts() ) : ?>
			<div class="sps-grid sps-grid--3" style="display:grid;grid-template-columns:repeat(auto-fit,minmax(300px,1fr));gap:24px;">
				<?php
				while ( have_posts() ) :
					the_post();
					?>
					<article <?php post_class( 'sps-card sps-card--hover' ); ?>>
						<a class="sps-tcard__media" href="<?php the_permalink(); ?>">
							<img
								src="<?php echo esc_url( sps_thumbnail_url( 'sps-treatment-card' ) ); ?>"
								alt="<?php echo esc_attr( get_the_title() ); ?>"
								loading="lazy"
							/>
						</a>
						<div class="sps-card__body">
							<p class="sps-eyebrow" style="margin:0 0 6px;"><?php echo esc_html( get_the_date() ); ?></p>
							<h3 style="margin:0 0 10px;"><a href="<?php the_permalink(); ?>"><?php the_title(); ?></a></h3>
							<p style="margin:0 0 16px;"><?php echo esc_html( wp_strip_all_tags( get_the_excerpt() ) ); ?></p>
							<a class="sps-btn sps-btn--outline sps-btn--sm" href="<?php the_permalink(); ?>">
								<?php esc_html_e( 'Read more', 'sps-medcare' ); ?>
							</a>
						</div>
					</article>
					<?php
				endwhile;
				?>
			</div>

			<div class="sps-pagination" style="margin-top:32px;">
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
					<h2><?php esc_html_e( 'Nothing found', 'sps-medcare' ); ?></h2>
					<p><?php esc_html_e( 'Try a different search, or browse our treatments.', 'sps-medcare' ); ?></p>
					<?php get_search_form(); ?>
					<p style="margin-top:16px;">
						<a class="sps-btn sps-btn--primary sps-btn--sm" href="<?php echo esc_url( sps_treatments_url() ); ?>">
							<?php esc_html_e( 'Browse Treatments', 'sps-medcare' ); ?>
						</a>
					</p>
				</div>
			</div>
		<?php endif; ?>
	</div>
</section>

<?php get_footer(); ?>
