<?php
/**
 * Treatment card partial.
 *
 * Expects the global post to be an sps_treatment.
 *
 * @package SPS_Medcare
 */

$sps_savings = sps_meta( 'savings' );
$sps_wa      = sps_whatsapp_href(
	sprintf(
		/* translators: %s: treatment name */
		__( 'Hello SPS Medcare, I would like a free opinion and cost estimate for %s in India.', 'sps-medcare' ),
		get_the_title()
	)
);
?>
<article class="sps-card sps-card--hover sps-tcard">
	<a class="sps-tcard__media" href="<?php the_permalink(); ?>" aria-label="<?php echo esc_attr( get_the_title() ); ?>">
		<img
			src="<?php echo esc_url( sps_thumbnail_url( 'sps-treatment-card' ) ); ?>"
			alt="<?php echo esc_attr( get_the_title() . ' ' . __( 'in India', 'sps-medcare' ) ); ?>"
			loading="lazy"
		/>
		<?php if ( sps_specialty_name() ) : ?>
			<span class="sps-tcard__specialty"><?php echo esc_html( sps_specialty_name() ); ?></span>
		<?php endif; ?>
		<?php if ( $sps_savings ) : ?>
			<span class="sps-tcard__save">
				<?php
				/* translators: %s: savings percentage */
				printf( esc_html__( 'Save up to %s%%', 'sps-medcare' ), esc_html( $sps_savings ) );
				?>
			</span>
		<?php endif; ?>
	</a>

	<div class="sps-tcard__body">
		<h3><a href="<?php the_permalink(); ?>"><?php the_title(); ?></a></h3>

		<p class="sps-tcard__excerpt"><?php echo esc_html( wp_strip_all_tags( get_the_excerpt() ) ); ?></p>

		<?php if ( sps_meta( 'cost_india' ) ) : ?>
			<div class="sps-tcard__price">
				<span class="sps-tcard__price-label"><?php esc_html_e( 'Cost in India', 'sps-medcare' ); ?></span>
				<span class="sps-tcard__price-value"><?php echo esc_html( sps_meta( 'cost_india' ) ); ?></span>
				<?php if ( sps_meta( 'cost_west' ) ) : ?>
					<span class="sps-tcard__price-compare">
						<?php esc_html_e( 'vs', 'sps-medcare' ); ?> <s><?php echo esc_html( sps_meta( 'cost_west' ) ); ?></s>
					</span>
				<?php endif; ?>
			</div>
		<?php endif; ?>

		<div class="sps-tcard__meta">
			<?php if ( sps_meta( 'hospital_stay' ) ) : ?>
				<span>
					<?php echo sps_icon( 'bed', 15 ); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>
					<?php echo esc_html( sps_meta( 'hospital_stay' ) ); ?>
				</span>
			<?php endif; ?>
			<?php if ( sps_meta( 'stay_india' ) ) : ?>
				<span>
					<?php echo sps_icon( 'calendar', 15 ); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>
					<?php
					/* translators: %s: number of days */
					printf( esc_html__( '%s in India', 'sps-medcare' ), esc_html( sps_meta( 'stay_india' ) ) );
					?>
				</span>
			<?php endif; ?>
		</div>

		<div class="sps-tcard__actions">
			<a class="sps-btn sps-btn--primary sps-btn--sm" href="<?php the_permalink(); ?>">
				<?php esc_html_e( 'View Details', 'sps-medcare' ); ?>
				<?php echo sps_icon( 'arrow-right', 15 ); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>
			</a>
			<a
				class="sps-btn sps-btn--outline sps-btn--sm sps-tcard__icon-btn"
				href="<?php echo esc_url( $sps_wa ); ?>"
				target="_blank"
				rel="noopener noreferrer"
				aria-label="<?php echo esc_attr( sprintf( /* translators: %s: treatment */ __( 'WhatsApp about %s', 'sps-medcare' ), get_the_title() ) ); ?>"
			>
				<?php echo sps_whatsapp_icon( 16 ); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>
			</a>
		</div>
	</div>
</article>
