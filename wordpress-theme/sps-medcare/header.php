<?php
/**
 * Theme header.
 *
 * @package SPS_Medcare
 */

?>
<!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
	<meta charset="<?php bloginfo( 'charset' ); ?>" />
	<meta name="viewport" content="width=device-width, initial-scale=1" />
	<meta name="theme-color" content="#0d9488" />
	<link rel="profile" href="https://gmpg.org/xfn/11" />
	<?php wp_head(); ?>
</head>

<body <?php body_class(); ?>>
<?php wp_body_open(); ?>

<a class="skip-link screen-reader-text" href="#sps-main"><?php esc_html_e( 'Skip to content', 'sps-medcare' ); ?></a>

<div id="page" class="sps-site">

	<!-- Top bar -->
	<div class="sps-topbar">
		<div class="sps-container sps-topbar__inner">
			<div class="sps-topbar__group">
				<a class="sps-topbar__item" href="<?php echo esc_url( sps_phone_href() ); ?>">
					<?php echo sps_icon( 'phone', 14 ); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>
					<span class="screen-reader-text"><?php esc_html_e( '24/7 patient desk:', 'sps-medcare' ); ?></span>
					<?php echo esc_html( sps_option( 'phone' ) ); ?>
				</a>
				<?php if ( sps_option( 'landline' ) ) : ?>
					<a class="sps-topbar__item" href="<?php echo esc_url( sps_landline_href() ); ?>">
						<?php echo sps_icon( 'phone-call', 14 ); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>
						<?php echo esc_html( sps_option( 'landline' ) ); ?>
					</a>
				<?php endif; ?>
			</div>
			<div class="sps-topbar__group">
				<span class="sps-topbar__item sps-topbar__item--muted">
					<?php echo sps_icon( 'globe', 14 ); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>
					<?php
					printf(
						/* translators: %d: number of countries */
						esc_html__( 'Serving patients from %d+ countries', 'sps-medcare' ),
						count( sps_countries() )
					);
					?>
				</span>
			</div>
		</div>
	</div>

	<!-- Header -->
	<header class="sps-header">
		<div class="sps-container sps-header__inner">
			<?php sps_the_logo(); ?>

			<nav class="sps-nav" aria-label="<?php esc_attr_e( 'Primary navigation', 'sps-medcare' ); ?>">
				<?php
				if ( has_nav_menu( 'primary' ) ) {
					wp_nav_menu(
						array(
							'theme_location' => 'primary',
							'container'      => false,
							'depth'          => 3,
							'fallback_cb'    => false,
						)
					);
				} else {
					echo '<ul>';
					wp_list_pages( array( 'title_li' => '', 'depth' => 1 ) );
					echo '</ul>';
				}
				?>
			</nav>

			<div class="sps-header__actions">
				<a class="sps-btn sps-btn--outline sps-btn--sm" href="<?php echo esc_url( sps_phone_href() ); ?>">
					<?php echo sps_icon( 'phone', 15 ); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>
					<?php echo esc_html( sps_option( 'phone' ) ); ?>
				</a>
				<a class="sps-btn sps-btn--primary sps-btn--sm" href="<?php echo esc_url( sps_contact_url() ); ?>">
					<?php esc_html_e( 'Get Free Opinion', 'sps-medcare' ); ?>
				</a>
				<button
					class="sps-menu-toggle"
					type="button"
					aria-expanded="false"
					aria-controls="sps-mobile-nav"
					aria-label="<?php esc_attr_e( 'Toggle menu', 'sps-medcare' ); ?>"
				>
					<?php echo sps_icon( 'menu', 20 ); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>
				</button>
			</div>
		</div>

		<div class="sps-mobile-nav" id="sps-mobile-nav">
			<div class="sps-container">
				<?php
				if ( has_nav_menu( 'primary' ) ) {
					wp_nav_menu(
						array(
							'theme_location' => 'primary',
							'container'      => false,
							'depth'          => 2,
							'fallback_cb'    => false,
						)
					);
				} else {
					echo '<ul>';
					wp_list_pages( array( 'title_li' => '', 'depth' => 1 ) );
					echo '</ul>';
				}
				?>
				<a class="sps-btn sps-btn--primary sps-btn--block" href="<?php echo esc_url( sps_phone_href() ); ?>">
					<?php echo sps_icon( 'phone', 16 ); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>
					<?php
					/* translators: %s: phone number */
					printf( esc_html__( 'Call %s', 'sps-medcare' ), esc_html( sps_option( 'phone' ) ) );
					?>
				</a>
			</div>
		</div>
	</header>

	<main id="sps-main" class="sps-main">
