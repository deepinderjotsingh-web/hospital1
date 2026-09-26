<?php
/**
 * Single treatment: cost comparison, procedures, hospitals, sticky enquiry panel.
 *
 * @package SPS_Medcare
 */

get_header();

while ( have_posts() ) :
	the_post();

	$sps_wa = sps_whatsapp_href(
		sprintf(
			/* translators: %s: treatment name */
			__( 'Hello SPS Medcare, I would like a free opinion and cost estimate for %s in India.', 'sps-medcare' ),
			get_the_title()
		)
	);
	?>

	<!-- Dark hero -->
	<section class="sps-pagehero sps-pagehero--dark">
		<?php if ( has_post_thumbnail() ) : ?>
			<div class="sps-pagehero__bg">
				<img src="<?php echo esc_url( sps_thumbnail_url( 'sps-treatment-hero' ) ); ?>" alt="" />
			</div>
		<?php endif; ?>

		<div class="sps-container">
			<nav class="sps-breadcrumb" aria-label="<?php esc_attr_e( 'Breadcrumb', 'sps-medcare' ); ?>">
				<a href="<?php echo esc_url( home_url( '/' ) ); ?>"><?php esc_html_e( 'Home', 'sps-medcare' ); ?></a>
				<span aria-hidden="true">›</span>
				<a href="<?php echo esc_url( sps_treatments_url() ); ?>"><?php esc_html_e( 'Treatments', 'sps-medcare' ); ?></a>
				<span aria-hidden="true">›</span>
				<span><?php the_title(); ?></span>
			</nav>

			<?php if ( sps_specialty_name() ) : ?>
				<span class="sps-badge sps-badge--glass" style="margin-top:18px;"><?php echo esc_html( sps_specialty_name() ); ?></span>
			<?php endif; ?>

			<h1 style="margin-top:12px;">
				<?php
				/* translators: %s: treatment name */
				printf( esc_html__( '%s in India', 'sps-medcare' ), esc_html( get_the_title() ) );
				?>
			</h1>

			<?php if ( has_excerpt() ) : ?>
				<p class="sps-lede"><?php echo esc_html( wp_strip_all_tags( get_the_excerpt() ) ); ?></p>
			<?php endif; ?>
		</div>
	</section>

	<div class="sps-container sps-single">

		<!-- Main column -->
		<div>
			<?php if ( sps_meta( 'cost_india' ) ) : ?>
				<div class="sps-costgrid">
					<div class="sps-card sps-card--teal">
						<div class="sps-card__body">
							<p class="sps-costcard__label"><?php esc_html_e( 'Cost in India', 'sps-medcare' ); ?></p>
							<span class="sps-costcard__value"><?php echo esc_html( sps_meta( 'cost_india' ) ); ?></span>
						</div>
					</div>

					<?php if ( sps_meta( 'cost_west' ) ) : ?>
						<div class="sps-card sps-costcard--plain">
							<div class="sps-card__body">
								<p class="sps-costcard__label"><?php esc_html_e( 'Cost Abroad', 'sps-medcare' ); ?></p>
								<span class="sps-costcard__value"><?php echo esc_html( sps_meta( 'cost_west' ) ); ?></span>
							</div>
						</div>
					<?php endif; ?>

					<?php if ( sps_meta( 'savings' ) ) : ?>
						<div class="sps-card sps-card--amber sps-costcard--amber">
							<div class="sps-card__body">
								<p class="sps-costcard__label"><?php esc_html_e( 'You Save', 'sps-medcare' ); ?></p>
								<span class="sps-costcard__value">
									<?php echo sps_icon( 'trending', 19 ); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>
									<?php echo esc_html( sps_meta( 'savings' ) ); ?>%
								</span>
							</div>
						</div>
					<?php endif; ?>
				</div>
			<?php endif; ?>

			<?php if ( sps_meta( 'hospital_stay' ) || sps_meta( 'stay_india' ) || sps_meta( 'success_rate' ) ) : ?>
				<div class="sps-metagrid">
					<?php
					$sps_metas = array(
						array( 'bed', __( 'Hospital stay', 'sps-medcare' ), sps_meta( 'hospital_stay' ) ),
						array( 'calendar', __( 'Total days in India', 'sps-medcare' ), sps_meta( 'stay_india' ) ),
						array( 'badge', __( 'Outcomes', 'sps-medcare' ), sps_meta( 'success_rate' ) ),
					);
					foreach ( $sps_metas as $sps_m ) :
						if ( ! $sps_m[2] ) {
							continue;
						}
						?>
						<div class="sps-card sps-metacard">
							<?php echo sps_icon( $sps_m[0], 20 ); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>
							<span>
								<span class="sps-metacard__label"><?php echo esc_html( $sps_m[1] ); ?></span>
								<span class="sps-metacard__value"><?php echo esc_html( $sps_m[2] ); ?></span>
							</span>
						</div>
					<?php endforeach; ?>
				</div>
			<?php endif; ?>

			<div class="sps-block sps-content">
				<h2><?php esc_html_e( 'Overview', 'sps-medcare' ); ?></h2>
				<?php the_content(); ?>
			</div>

			<?php $sps_procedures = sps_meta_list( 'procedures' ); ?>
			<?php if ( $sps_procedures ) : ?>
				<div class="sps-block">
					<h2><?php esc_html_e( 'Procedures Covered', 'sps-medcare' ); ?></h2>
					<ul class="sps-checklist">
						<?php foreach ( $sps_procedures as $sps_p ) : ?>
							<li>
								<span class="sps-check"><?php echo sps_icon( 'check', 13 ); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?></span>
								<?php echo esc_html( $sps_p ); ?>
							</li>
						<?php endforeach; ?>
					</ul>
				</div>
			<?php endif; ?>

			<?php $sps_hospitals = sps_meta_list( 'hospitals' ); ?>
			<?php if ( $sps_hospitals ) : ?>
				<div class="sps-block">
					<h2><?php esc_html_e( 'Leading Hospitals for This Treatment', 'sps-medcare' ); ?></h2>
					<p><?php esc_html_e( 'We work with JCI and NABH accredited hospitals across Delhi, Gurugram and Noida.', 'sps-medcare' ); ?></p>
					<ul class="sps-checklist">
						<?php foreach ( $sps_hospitals as $sps_h ) : ?>
							<li>
								<span class="sps-check"><?php echo sps_icon( 'building', 13 ); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?></span>
								<?php echo esc_html( $sps_h ); ?>
							</li>
						<?php endforeach; ?>
					</ul>
				</div>
			<?php endif; ?>

			<div class="sps-block">
				<h2><?php esc_html_e( 'What SPS Medcare Includes — Free of Charge', 'sps-medcare' ); ?></h2>
				<ul class="sps-checklist sps-checklist--single sps-checklist--bare">
					<?php foreach ( sps_inclusions() as $sps_inc ) : ?>
						<li>
							<span class="sps-check sps-check--green"><?php echo sps_icon( 'check', 13 ); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?></span>
							<?php echo esc_html( $sps_inc ); ?>
						</li>
					<?php endforeach; ?>
				</ul>
			</div>
		</div>

		<!-- Sticky enquiry panel -->
		<aside>
			<div class="sps-sticky">
				<div class="sps-card sps-card--teal">
					<div class="sps-card__body">
						<h2 style="font-size:1.15rem;"><?php esc_html_e( 'Get a Free Opinion & Exact Cost', 'sps-medcare' ); ?></h2>
						<p>
							<?php esc_html_e( 'Send your diagnosis and recent reports. A specialist reviews your case and we reply with a written opinion and itemised estimate within 48 hours — no charge, no obligation.', 'sps-medcare' ); ?>
						</p>

						<div class="sps-sticky__actions">
							<a class="sps-btn sps-btn--whatsapp sps-btn--lg sps-btn--block" href="<?php echo esc_url( $sps_wa ); ?>" target="_blank" rel="noopener noreferrer">
								<?php echo sps_whatsapp_icon( 18 ); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>
								<?php esc_html_e( 'WhatsApp My Reports', 'sps-medcare' ); ?>
							</a>
							<a class="sps-btn sps-btn--outline sps-btn--lg sps-btn--block" href="<?php echo esc_url( sps_phone_href() ); ?>">
								<?php echo sps_icon( 'phone', 17 ); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>
								<?php echo esc_html( sps_option( 'phone' ) ); ?>
							</a>
							<a class="sps-btn sps-btn--dark sps-btn--lg sps-btn--block" href="<?php echo esc_url( add_query_arg( 'treatment', rawurlencode( get_the_title() ), sps_contact_url() ) ); ?>">
								<?php esc_html_e( 'Fill the Enquiry Form', 'sps-medcare' ); ?>
							</a>
						</div>

						<p class="sps-sticky__note"><?php esc_html_e( 'Zero facilitation fee · We never mark up hospital bills', 'sps-medcare' ); ?></p>
					</div>
				</div>
			</div>
		</aside>
	</div>

	<!-- Related -->
	<?php
	$sps_related = new WP_Query(
		array(
			'post_type'      => 'sps_treatment',
			'posts_per_page' => 3,
			'post__not_in'   => array( get_the_ID() ),
			'orderby'        => 'rand',
		)
	);
	?>
	<?php if ( $sps_related->have_posts() ) : ?>
		<section class="sps-section sps-section--white">
			<div class="sps-container">
				<h2><?php esc_html_e( 'Other Treatments We Coordinate', 'sps-medcare' ); ?></h2>
				<div class="sps-grid sps-grid--3" style="margin-top:24px;">
					<?php
					while ( $sps_related->have_posts() ) :
						$sps_related->the_post();
						get_template_part( 'template-parts/treatment-card' );
					endwhile;
					wp_reset_postdata();
					?>
				</div>
			</div>
		</section>
	<?php endif; ?>

<?php endwhile; ?>

<?php get_footer(); ?>
