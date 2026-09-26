<?php
/**
 * Template Name: Treatments Listing
 * Description: Grid of all treatments with specialty filter pills.
 *
 * @package SPS_Medcare
 */

get_header();

$sps_active     = isset( $_GET['specialty'] ) ? sanitize_title( wp_unslash( $_GET['specialty'] ) ) : '';
$sps_search     = isset( $_GET['tq'] ) ? sanitize_text_field( wp_unslash( $_GET['tq'] ) ) : '';
$sps_paged      = max( 1, get_query_var( 'paged' ), get_query_var( 'page' ) );
$sps_specialties = get_terms(
	array(
		'taxonomy'   => 'sps_specialty',
		'hide_empty' => true,
	)
);

$sps_args = array(
	'post_type'      => 'sps_treatment',
	'posts_per_page' => 12,
	'paged'          => $sps_paged,
	'orderby'        => array( 'menu_order' => 'ASC', 'date' => 'ASC' ),
);

if ( $sps_active ) {
	$sps_args['tax_query'] = array(
		array(
			'taxonomy' => 'sps_specialty',
			'field'    => 'slug',
			'terms'    => $sps_active,
		),
	);
}

if ( $sps_search ) {
	$sps_args['s'] = $sps_search;
}

$sps_query = new WP_Query( $sps_args );
$sps_term  = $sps_active ? get_term_by( 'slug', $sps_active, 'sps_specialty' ) : null;
?>

<section class="sps-pagehero">
	<div class="sps-container">
		<p class="sps-eyebrow"><?php esc_html_e( 'Treatments & Costs', 'sps-medcare' ); ?></p>
		<h1>
			<?php
			if ( $sps_term && ! is_wp_error( $sps_term ) ) {
				/* translators: %s: specialty name */
				printf( esc_html__( '%s Treatment in India', 'sps-medcare' ), esc_html( $sps_term->name ) );
			} else {
				the_title();
			}
			?>
		</h1>
		<p class="sps-lede">
			<?php
			if ( get_the_content() ) {
				echo esc_html( wp_strip_all_tags( get_the_content() ) );
			} else {
				esc_html_e( 'Transparent USD estimates, expected hospital stay and total days in India for every major specialty. Costs shown are indicative package ranges at our partner hospitals and are confirmed in writing after a specialist reviews your reports — free of charge.', 'sps-medcare' );
			}
			?>
		</p>
	</div>
</section>

<section class="sps-section">
	<div class="sps-container">

		<div class="sps-toolbar">
			<form class="sps-search" method="get" action="<?php echo esc_url( get_permalink() ); ?>" role="search">
				<label class="screen-reader-text" for="sps-tq"><?php esc_html_e( 'Search treatments', 'sps-medcare' ); ?></label>
				<input
					type="search"
					id="sps-tq"
					name="tq"
					value="<?php echo esc_attr( $sps_search ); ?>"
					placeholder="<?php esc_attr_e( 'Search cancer, heart, knee, transplant, IVF…', 'sps-medcare' ); ?>"
				/>
				<button class="sps-btn sps-btn--primary" type="submit">
					<?php echo sps_icon( 'search', 16 ); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>
					<span class="screen-reader-text"><?php esc_html_e( 'Search', 'sps-medcare' ); ?></span>
				</button>
			</form>

			<?php if ( ! empty( $sps_specialties ) && ! is_wp_error( $sps_specialties ) ) : ?>
				<div class="sps-pills">
					<a class="sps-pill <?php echo '' === $sps_active ? 'is-active' : ''; ?>" href="<?php echo esc_url( get_permalink() ); ?>">
						<?php esc_html_e( 'All', 'sps-medcare' ); ?>
					</a>
					<?php foreach ( $sps_specialties as $sps_sp ) : ?>
						<a
							class="sps-pill <?php echo $sps_active === $sps_sp->slug ? 'is-active' : ''; ?>"
							href="<?php echo esc_url( add_query_arg( 'specialty', $sps_sp->slug, get_permalink() ) ); ?>"
						>
							<?php echo esc_html( $sps_sp->name ); ?>
						</a>
					<?php endforeach; ?>
				</div>
			<?php endif; ?>
		</div>

		<?php if ( $sps_query->have_posts() ) : ?>
			<div class="sps-grid sps-grid--3">
				<?php
				while ( $sps_query->have_posts() ) :
					$sps_query->the_post();
					get_template_part( 'template-parts/treatment-card' );
				endwhile;
				?>
			</div>

			<?php
			$sps_links = paginate_links(
				array(
					'total'   => $sps_query->max_num_pages,
					'current' => $sps_paged,
					'type'    => 'array',
				)
			);

			if ( $sps_links ) :
				?>
				<nav class="sps-pagination" aria-label="<?php esc_attr_e( 'Treatments pagination', 'sps-medcare' ); ?>">
					<?php foreach ( $sps_links as $sps_link ) : ?>
						<?php echo wp_kses_post( $sps_link ); ?>
					<?php endforeach; ?>
				</nav>
			<?php endif; ?>

			<?php wp_reset_postdata(); ?>

		<?php else : ?>
			<div class="sps-card" style="text-align:center;padding:40px 20px;">
				<h2><?php esc_html_e( 'No treatment matched your search', 'sps-medcare' ); ?></h2>
				<p style="max-width:460px;margin:8px auto 20px;">
					<?php esc_html_e( 'We coordinate care across every major specialty. Tell us your diagnosis on WhatsApp and we will find the right specialist for you.', 'sps-medcare' ); ?>
				</p>
				<a class="sps-btn sps-btn--whatsapp" href="<?php echo esc_url( sps_whatsapp_href() ); ?>" target="_blank" rel="noopener noreferrer">
					<?php echo sps_whatsapp_icon( 18 ); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>
					<?php
					/* translators: %s: phone number */
					printf( esc_html__( 'WhatsApp %s', 'sps-medcare' ), esc_html( sps_option( 'phone' ) ) );
					?>
				</a>
			</div>
		<?php endif; ?>
	</div>
</section>

<?php get_footer(); ?>
