<?php
/**
 * Theme footer.
 *
 * @package SPS_Medcare
 */

$sps_address_lines = array_values( array_filter( array_map( 'trim', preg_split( '/\r\n|\r|\n/', sps_option( 'address' ) ) ) ) );

$sps_footer_treatments = get_posts(
	array(
		'post_type'      => 'sps_treatment',
		'posts_per_page' => 7,
		'orderby'        => array( 'menu_order' => 'ASC', 'date' => 'ASC' ),
	)
);
?>
	</main><!-- #sps-main -->

	<footer class="sps-footer">
		<div class="sps-container sps-footer__grid">

			<div>
				<?php sps_the_logo(); ?>
				<p style="margin-top:16px;">
					<?php esc_html_e( 'Dedicated to delivering quality and affordable healthcare to patients from around the world — with a free second opinion, medical visa support and a care manager at your side from arrival to recovery.', 'sps-medcare' ); ?>
				</p>
				<span class="sps-footer__cert"><?php echo esc_html( sps_option( 'cert' ) ); ?></span>
			</div>

			<div>
				<h3><?php esc_html_e( 'Quick Links', 'sps-medcare' ); ?></h3>
				<?php
				if ( has_nav_menu( 'footer' ) ) {
					wp_nav_menu(
						array(
							'theme_location' => 'footer',
							'container'      => false,
							'depth'          => 1,
							'fallback_cb'    => false,
						)
					);
				} elseif ( has_nav_menu( 'primary' ) ) {
					wp_nav_menu(
						array(
							'theme_location' => 'primary',
							'container'      => false,
							'depth'          => 1,
							'fallback_cb'    => false,
						)
					);
				} else {
					echo '<ul>';
					wp_list_pages( array( 'title_li' => '', 'depth' => 1 ) );
					echo '</ul>';
				}
				?>
			</div>

			<div>
				<h3><?php esc_html_e( 'Popular Treatments', 'sps-medcare' ); ?></h3>
				<ul>
					<?php if ( $sps_footer_treatments ) : ?>
						<?php foreach ( $sps_footer_treatments as $sps_t ) : ?>
							<li>
								<a href="<?php echo esc_url( get_permalink( $sps_t ) ); ?>">
									<?php echo esc_html( get_the_title( $sps_t ) ); ?>
								</a>
							</li>
						<?php endforeach; ?>
					<?php else : ?>
						<li><a href="<?php echo esc_url( sps_treatments_url() ); ?>"><?php esc_html_e( 'Browse all treatments', 'sps-medcare' ); ?></a></li>
					<?php endif; ?>
				</ul>
			</div>

			<div>
				<h3><?php esc_html_e( 'Contact', 'sps-medcare' ); ?></h3>
				<ul class="sps-footer__contact">
					<li>
						<?php echo sps_icon( 'phone', 17 ); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>
						<a href="<?php echo esc_url( sps_phone_href() ); ?>"><?php echo esc_html( sps_option( 'phone' ) ); ?></a>
					</li>
					<li>
						<?php echo sps_whatsapp_icon( 17 ); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>
						<a href="<?php echo esc_url( sps_whatsapp_href() ); ?>" target="_blank" rel="noopener noreferrer">
							<?php esc_html_e( 'WhatsApp us', 'sps-medcare' ); ?>
						</a>
					</li>
					<?php if ( sps_option( 'landline' ) ) : ?>
						<li>
							<?php echo sps_icon( 'phone-call', 17 ); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>
							<a href="<?php echo esc_url( sps_landline_href() ); ?>"><?php echo esc_html( sps_option( 'landline' ) ); ?></a>
						</li>
					<?php endif; ?>
					<li>
						<?php echo sps_icon( 'mail', 17 ); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>
						<a href="mailto:<?php echo esc_attr( sps_option( 'email' ) ); ?>"><?php echo esc_html( sps_option( 'email' ) ); ?></a>
					</li>
					<li>
						<?php echo sps_icon( 'map-pin', 17 ); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>
						<address>
							<?php foreach ( $sps_address_lines as $sps_line ) : ?>
								<span style="display:block;"><?php echo esc_html( $sps_line ); ?></span>
							<?php endforeach; ?>
						</address>
					</li>
					<li>
						<?php echo sps_icon( 'clock', 17 ); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>
						<?php echo esc_html( sps_option( 'hours' ) ); ?>
					</li>
				</ul>
			</div>
		</div>

		<div class="sps-footer__countries">
			<div class="sps-container">
				<p class="sps-footer__countries-title"><?php esc_html_e( 'Patients we serve', 'sps-medcare' ); ?></p>
				<div class="sps-footer__countries-list">
					<?php foreach ( sps_countries() as $sps_country ) : ?>
						<span>
							<?php if ( $sps_country['flag'] ) : ?>
								<span aria-hidden="true"><?php echo esc_html( $sps_country['flag'] ); ?></span>
							<?php endif; ?>
							<?php echo esc_html( $sps_country['name'] ); ?>
						</span>
					<?php endforeach; ?>
				</div>
			</div>
		</div>

		<div class="sps-footer__bottom">
			<div class="sps-container sps-footer__bottom-inner">
				<p style="margin:0;">
					<?php
					printf(
						/* translators: 1: year, 2: site name */
						esc_html__( '© %1$s %2$s · All rights reserved', 'sps-medcare' ),
						esc_html( gmdate( 'Y' ) ),
						esc_html( get_bloginfo( 'name' ) )
					);
					?>
				</p>
				<p style="margin:0;"><?php esc_html_e( 'Zero facilitation fee · We never mark up hospital bills', 'sps-medcare' ); ?></p>
			</div>
		</div>
	</footer>

	<a
		class="sps-whatsapp-float"
		href="<?php echo esc_url( sps_whatsapp_href() ); ?>"
		target="_blank"
		rel="noopener noreferrer"
		aria-label="<?php esc_attr_e( 'Chat with a coordinator on WhatsApp', 'sps-medcare' ); ?>"
	>
		<?php echo sps_whatsapp_icon( 22 ); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>
		<span><?php esc_html_e( 'Chat with a Coordinator', 'sps-medcare' ); ?></span>
	</a>

</div><!-- #page -->
<?php wp_footer(); ?>
</body>
</html>
