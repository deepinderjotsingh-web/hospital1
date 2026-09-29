<?php
/**
 * Front page: hero, stats, countries, services, treatments, why India, journey, CTA.
 *
 * @package SPS_Medcare
 */

get_header();

$sps_hero_img  = get_theme_mod( 'sps_hero_image' );
$sps_hero_img2 = get_theme_mod( 'sps_hero_image_2' );

// Fall back to the photos bundled with the theme so the home page is never blank.
if ( ! $sps_hero_img ) {
	$sps_hero_img = sps_asset_img( 'hero-consultation.jpg' );
}
if ( ! $sps_hero_img2 ) {
	$sps_hero_img2 = sps_asset_img( 'doctor-patient.jpg' );
}

$sps_services = array(
	array( 'file-text', __( 'Medical Treatment Coordination', 'sps-medcare' ), __( 'Free expert second opinions, written treatment plans and confirmed appointments at JCI & NABH accredited hospitals.', 'sps-medcare' ) ),
	array( 'plane', __( 'Medical Visa Assistance', 'sps-medcare' ), __( 'Visa invitation letters issued within 24 hours for both patient and attendant, with embassy guidance.', 'sps-medcare' ) ),
	array( 'car', __( 'Airport Transportation', 'sps-medcare' ), __( 'Complimentary pickup and drop at Delhi IGI in a patient-ready vehicle, plus all hospital transfers.', 'sps-medcare' ) ),
	array( 'home', __( 'Accommodation Assistance', 'sps-medcare' ), __( 'Guest houses, serviced apartments or 4/5-star hotels minutes from your hospital, booked to your budget.', 'sps-medcare' ) ),
	array( 'languages', __( 'Interpreter Support', 'sps-medcare' ), __( 'Interpreters fluent in Arabic, Bengali, Dari, Pashto, French, Russian and Swahili throughout your stay.', 'sps-medcare' ) ),
	array( 'message', __( '24/7 Assistance', 'sps-medcare' ), __( 'A named care manager on WhatsApp for medicine refills, follow-ups, currency exchange and SIM cards.', 'sps-medcare' ) ),
);

$sps_reasons = array(
	array( __( 'Save 60–90% on treatment', 'sps-medcare' ), __( 'A cardiac bypass costing $60,000 in the USA is $4,200–$7,000 in India — with outcomes at the same benchmarks.', 'sps-medcare' ) ),
	array( __( 'No waiting lists', 'sps-medcare' ), __( 'Most treatments begin within days of arrival instead of months on a public waiting list.', 'sps-medcare' ) ),
	array( __( 'JCI & NABH accredited hospitals', 'sps-medcare' ), __( 'Internationally trained, English-speaking doctors, many with US, UK or European fellowships.', 'sps-medcare' ) ),
	array( __( 'Easy medical visa', 'sps-medcare' ), __( 'India grants medical visas for the patient plus attendants, with e-visa options for many countries.', 'sps-medcare' ) ),
);

$sps_journey = array(
	array( '01', __( 'Share your reports', 'sps-medcare' ), __( 'Send your diagnosis and scans on WhatsApp — free, no obligation.', 'sps-medcare' ) ),
	array( '02', __( 'Free opinion & quote', 'sps-medcare' ), __( 'A specialist opinion and itemised estimate within 48 hours.', 'sps-medcare' ) ),
	array( '03', __( 'Visa & travel', 'sps-medcare' ), __( 'Visa invitation letter in 24 hours; we help plan your flights.', 'sps-medcare' ) ),
	array( '04', __( 'Arrival & admission', 'sps-medcare' ), __( 'We meet you at Delhi IGI and handle hospital admission.', 'sps-medcare' ) ),
	array( '05', __( 'Treatment & recovery', 'sps-medcare' ), __( 'Interpreter and care manager with you throughout.', 'sps-medcare' ) ),
	array( '06', __( 'Follow-up at home', 'sps-medcare' ), __( 'Discharge summary, medication plan and teleconsultations.', 'sps-medcare' ) ),
);

$sps_quotes = array(
	array( __( 'My father needed a liver transplant and we had no idea where to start. SPS Medcare arranged the donor workup, the visa for four of us, and an apartment near the hospital. He is home and well.', 'sps-medcare' ), 'Rahim H.', __( 'Bangladesh · Liver Transplant', 'sps-medcare' ) ),
	array( __( 'I compared bypass surgery costs in the UK and India. SPS Medcare got me a written opinion in two days, and the total cost including flights was still a fraction of the UK price.', 'sps-medcare' ), 'Joseph A.', __( 'Nigeria · Cardiac Bypass', 'sps-medcare' ) ),
	array( __( 'The interpreter made all the difference — my mother speaks only Arabic and never felt lost. Airport pickup, hotel, hospital appointments, everything was already arranged.', 'sps-medcare' ), 'Fatima M.', __( 'Iraq · Knee Replacement', 'sps-medcare' ) ),
);
?>

<!-- ============ HERO ============ -->
<section class="sps-hero">
	<?php if ( $sps_hero_img ) : ?>
		<div class="sps-hero__bg">
			<img src="<?php echo esc_url( $sps_hero_img ); ?>" alt="" />
		</div>
	<?php endif; ?>

	<div class="sps-container sps-hero__inner">
		<div class="sps-fade-up">
			<?php if ( get_theme_mod( 'sps_hero_badge', 'JCI & NABH Accredited Partner Hospitals' ) ) : ?>
				<span class="sps-badge sps-badge--glass">
					<?php echo sps_icon( 'shield', 15 ); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>
					<?php echo esc_html( get_theme_mod( 'sps_hero_badge', 'JCI & NABH Accredited Partner Hospitals' ) ); ?>
				</span>
			<?php endif; ?>

			<h1><?php echo wp_kses_post( get_theme_mod( 'sps_hero_title', 'World-Class Medical Treatment in India — <em>At a Fraction of the Cost</em>' ) ); ?></h1>

			<p class="sps-hero__text">
				<?php echo wp_kses_post( get_theme_mod( 'sps_hero_text', 'We are dedicated to making your medical journey smooth, safe and stress-free. Trusted by <strong>2,500+ patients</strong> from Bangladesh, Nepal, Sri Lanka, UAE, Nigeria, Afghanistan, Iraq, Maldives, Oman and beyond.' ) ); ?>
			</p>

			<?php if ( get_theme_mod( 'sps_hero_note', '1' ) ) : ?>
				<p class="sps-hero__note">
					<?php echo wp_kses_post( get_theme_mod( 'sps_hero_note', '<strong>Our service is free for patients.</strong> Send your medical reports and receive a written specialist opinion plus an itemised cost estimate within 48 hours — no charge, no obligation.' ) ); ?>
				</p>
			<?php endif; ?>

			<div class="sps-hero__actions">
				<a class="sps-btn sps-btn--whatsapp sps-btn--lg" href="<?php echo esc_url( sps_whatsapp_href() ); ?>" target="_blank" rel="noopener noreferrer">
					<?php echo sps_whatsapp_icon( 18 ); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>
					<?php esc_html_e( 'Get Free Opinion on WhatsApp', 'sps-medcare' ); ?>
				</a>
				<a class="sps-btn sps-btn--light sps-btn--lg" href="<?php echo esc_url( sps_phone_href() ); ?>">
					<?php echo sps_icon( 'phone', 17 ); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>
					<?php echo esc_html( sps_option( 'phone' ) ); ?>
				</a>
				<a class="sps-hero__link" href="<?php echo esc_url( sps_treatments_url() ); ?>">
					<?php esc_html_e( 'Browse treatments & costs', 'sps-medcare' ); ?>
					<?php echo sps_icon( 'arrow-right', 16 ); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>
				</a>
			</div>
		</div>

		<?php if ( $sps_hero_img2 ) : ?>
			<div class="sps-hero__media">
				<img src="<?php echo esc_url( $sps_hero_img2 ); ?>" alt="<?php esc_attr_e( 'Specialist doctor with an international patient in India', 'sps-medcare' ); ?>" />
				<div class="sps-floatcard sps-floatcard--bl">
					<span class="sps-floatcard__icon"><?php echo sps_icon( 'trending', 19 ); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?></span>
					<span>
						<span class="sps-floatcard__value">60–90%</span>
						<span class="sps-floatcard__label"><?php esc_html_e( 'Lower than USA & UK costs', 'sps-medcare' ); ?></span>
					</span>
				</div>
				<div class="sps-floatcard sps-floatcard--tr">
					<span class="sps-floatcard__icon"><?php echo sps_icon( 'badge', 19 ); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?></span>
					<span>
						<span class="sps-floatcard__value">48 hrs</span>
						<span class="sps-floatcard__label"><?php esc_html_e( 'Free written opinion', 'sps-medcare' ); ?></span>
					</span>
				</div>
			</div>
		<?php endif; ?>
	</div>
</section>

<!-- ============ STATS ============ -->
<section class="sps-stats">
	<div class="sps-container">
		<div class="sps-stats__grid">
			<?php
			$sps_stat_icons = array( 'users', 'globe', 'trending', 'headset' );
			for ( $i = 1; $i <= 4; $i++ ) :
				if ( ! sps_stat( $i, 'value' ) ) {
					continue;
				}
				?>
				<div class="sps-stat">
					<span class="sps-stat__icon">
						<?php echo sps_icon( $sps_stat_icons[ $i - 1 ], 19 ); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>
					</span>
					<span>
						<span class="sps-stat__value"><?php echo esc_html( sps_stat( $i, 'value' ) ); ?></span>
						<span class="sps-stat__label"><?php echo esc_html( sps_stat( $i, 'label' ) ); ?></span>
					</span>
				</div>
			<?php endfor; ?>
		</div>
	</div>
</section>

<!-- ============ COUNTRIES MARQUEE ============ -->
<?php $sps_countries = sps_countries(); ?>
<?php if ( $sps_countries ) : ?>
	<section class="sps-marquee">
		<div class="sps-container">
			<p class="sps-marquee__title"><?php esc_html_e( 'Patients travel to us from', 'sps-medcare' ); ?></p>
		</div>
		<div class="sps-marquee__track">
			<?php for ( $sps_loop = 0; $sps_loop < 2; $sps_loop++ ) : ?>
				<?php foreach ( $sps_countries as $sps_c ) : ?>
					<span class="sps-marquee__item">
						<?php if ( $sps_c['flag'] ) : ?>
							<span class="sps-marquee__flag" aria-hidden="true"><?php echo esc_html( $sps_c['flag'] ); ?></span>
						<?php endif; ?>
						<?php echo esc_html( $sps_c['name'] ); ?>
					</span>
				<?php endforeach; ?>
			<?php endfor; ?>
		</div>
	</section>
<?php endif; ?>

<!-- ============ SERVICES ============ -->
<section class="sps-section">
	<div class="sps-container">
		<p class="sps-eyebrow"><?php esc_html_e( 'Our Services', 'sps-medcare' ); ?></p>
		<h2><?php esc_html_e( 'Complete Support for Your Health Journey', 'sps-medcare' ); ?></h2>
		<p class="sps-lede"><?php esc_html_e( 'Treatment is only part of the journey. Everything around it — visa, travel, stay, language, daily care — is arranged by us, free of charge.', 'sps-medcare' ); ?></p>

		<div class="sps-grid sps-grid--3" style="margin-top:30px;">
			<?php foreach ( $sps_services as $sps_s ) : ?>
				<div class="sps-card sps-card--hover">
					<div class="sps-card__body">
						<span class="sps-icon-badge"><?php echo sps_icon( $sps_s[0], 19 ); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?></span>
						<h3><?php echo esc_html( $sps_s[1] ); ?></h3>
						<p><?php echo esc_html( $sps_s[2] ); ?></p>
					</div>
				</div>
			<?php endforeach; ?>
		</div>

		<figure class="sps-figure sps-figure--wide" style="margin-top:34px;">
			<img
				src="<?php echo esc_url( get_theme_mod( 'sps_services_image', sps_asset_img( 'airport-pickup.jpg' ) ) ); ?>"
				alt="<?php esc_attr_e( 'Complimentary airport pickup and drop at Delhi IGI for medical travellers', 'sps-medcare' ); ?>"
				loading="lazy"
			/>
			<figcaption><?php esc_html_e( 'Complimentary airport pickup and drop at Delhi IGI — in a patient-ready vehicle with a dedicated driver.', 'sps-medcare' ); ?></figcaption>
		</figure>
	</div>
</section>
<?php
$sps_treatments = new WP_Query(
	array(
		'post_type'      => 'sps_treatment',
		'posts_per_page' => 6,
		'orderby'        => array( 'menu_order' => 'ASC', 'date' => 'ASC' ),
	)
);
?>
<?php if ( $sps_treatments->have_posts() ) : ?>
	<section class="sps-section sps-section--white">
		<div class="sps-container">
			<div class="sps-section__head">
				<div>
					<p class="sps-eyebrow"><?php esc_html_e( 'Popular Treatments', 'sps-medcare' ); ?></p>
					<h2><?php esc_html_e( 'Most Requested Medical Treatments in India', 'sps-medcare' ); ?></h2>
					<p class="sps-lede"><?php esc_html_e( 'Transparent USD estimates, expected hospital stay and total days in India — confirmed in writing after a specialist reviews your reports.', 'sps-medcare' ); ?></p>
				</div>
				<a class="sps-section__link" href="<?php echo esc_url( sps_treatments_url() ); ?>">
					<?php esc_html_e( 'View all treatments →', 'sps-medcare' ); ?>
				</a>
			</div>

			<div class="sps-grid sps-grid--3">
				<?php
				while ( $sps_treatments->have_posts() ) :
					$sps_treatments->the_post();
					get_template_part( 'template-parts/treatment-card' );
				endwhile;
				wp_reset_postdata();
				?>
			</div>
		</div>
	</section>
<?php endif; ?>

<!-- ============ WHY INDIA ============ -->
<section class="sps-section">
	<div class="sps-container sps-split">
		<div>
			<p class="sps-eyebrow"><?php esc_html_e( 'Why India', 'sps-medcare' ); ?></p>
			<h2><?php esc_html_e( 'Why Patients Fly to India for Treatment', 'sps-medcare' ); ?></h2>
			<div class="sps-reasons">
				<?php foreach ( $sps_reasons as $sps_r ) : ?>
					<div class="sps-reason">
						<span class="sps-reason__icon"><?php echo sps_icon( 'check', 15 ); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?></span>
						<div>
							<h3><?php echo esc_html( $sps_r[0] ); ?></h3>
							<p><?php echo esc_html( $sps_r[1] ); ?></p>
						</div>
					</div>
				<?php endforeach; ?>
			</div>
		</div>
		<div>
			<figure class="sps-figure">
				<img
					src="<?php echo esc_url( get_theme_mod( 'sps_why_image', sps_asset_img( 'operating-room.jpg' ) ) ); ?>"
					alt="<?php esc_attr_e( 'Surgical team in a JCI accredited operating theatre in India', 'sps-medcare' ); ?>"
					loading="lazy"
				/>
			</figure>

			<div class="sps-card sps-card--teal" style="margin-top:20px;">
				<div class="sps-card__body">
					<span class="sps-icon-badge"><?php echo sps_icon( 'languages', 19 ); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?></span>
					<h3><?php esc_html_e( 'Interpreters available in', 'sps-medcare' ); ?></h3>
					<div class="sps-chips" style="margin-top:14px;">
						<?php foreach ( sps_languages() as $sps_lang ) : ?>
							<span class="sps-chip sps-chip--teal"><?php echo esc_html( $sps_lang ); ?></span>
						<?php endforeach; ?>
					</div>
					<p style="margin-top:18px;">
						<?php esc_html_e( 'Your interpreter accompanies you through consultations, admission and discharge so nothing is lost in translation.', 'sps-medcare' ); ?>
					</p>
					<a class="sps-btn sps-btn--primary" style="margin-top:8px;" href="<?php echo esc_url( sps_contact_url() ); ?>">
						<?php esc_html_e( 'Request a Free Opinion', 'sps-medcare' ); ?>
					</a>
				</div>
			</div>
		</div>
	</div>
</section>

<!-- ============ JOURNEY ============ -->
<section class="sps-section sps-section--white">
	<div class="sps-container">
		<p class="sps-eyebrow"><?php esc_html_e( 'How It Works', 'sps-medcare' ); ?></p>
		<h2><?php esc_html_e( 'Your Journey, Step by Step', 'sps-medcare' ); ?></h2>
		<div class="sps-grid sps-grid--3" style="margin-top:30px;">
			<?php foreach ( $sps_journey as $sps_j ) : ?>
				<div class="sps-step">
					<span class="sps-step__num"><?php echo esc_html( $sps_j[0] ); ?></span>
					<h3><?php echo esc_html( $sps_j[1] ); ?></h3>
					<p><?php echo esc_html( $sps_j[2] ); ?></p>
				</div>
			<?php endforeach; ?>
		</div>
	</div>
</section>

<!-- ============ TESTIMONIALS ============ -->
<section class="sps-section">
	<div class="sps-container">
		<p class="sps-eyebrow"><?php esc_html_e( 'Patient Stories', 'sps-medcare' ); ?></p>
		<h2><?php esc_html_e( 'Trusted by Families Across the World', 'sps-medcare' ); ?></h2>
		<div class="sps-grid sps-grid--3" style="margin-top:30px;">
			<?php foreach ( $sps_quotes as $sps_q ) : ?>
				<div class="sps-card sps-quote">
					<div class="sps-card__body">
						<?php echo sps_icon( 'quote', 26 ); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>
						<p><?php echo esc_html( $sps_q[0] ); ?></p>
						<span class="sps-quote__name"><?php echo esc_html( $sps_q[1] ); ?></span>
						<span class="sps-quote__role"><?php echo esc_html( $sps_q[2] ); ?></span>
					</div>
				</div>
			<?php endforeach; ?>
		</div>
	</div>
</section>

<!-- ============ RECOVERY / INDIA ============ -->
<section class="sps-section sps-section--white">
	<div class="sps-container sps-split">
		<div>
			<p class="sps-eyebrow"><?php esc_html_e( 'Recovery in India', 'sps-medcare' ); ?></p>
			<h2><?php esc_html_e( 'Rest, Recover — and See a Little of India', 'sps-medcare' ); ?></h2>
			<p class="sps-lede">
				<?php esc_html_e( 'Once your surgeon clears you, many families use the waiting days before the flight home for a short, gentle trip — the Taj Mahal in Agra is a three-hour drive from Delhi. Your care manager arranges the car, the tickets and a wheelchair if you need one.', 'sps-medcare' ); ?>
			</p>
			<a class="sps-btn sps-btn--outline" href="<?php echo esc_url( sps_contact_url() ); ?>">
				<?php esc_html_e( 'Plan My Trip', 'sps-medcare' ); ?>
			</a>
		</div>
		<figure class="sps-figure">
			<img
				src="<?php echo esc_url( get_theme_mod( 'sps_recovery_image', sps_asset_img( 'taj-mahal.jpg' ) ) ); ?>"
				alt="<?php esc_attr_e( 'Taj Mahal, Agra — a short trip from Delhi during recovery', 'sps-medcare' ); ?>"
				loading="lazy"
			/>
		</figure>
	</div>
</section>

<!-- ============ CTA ============ -->
<section class="sps-section sps-section--tight">
	<div class="sps-container">
		<div class="sps-cta">
			<span class="sps-cta__icon"><?php echo sps_icon( 'stethoscope', 24 ); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?></span>
			<h2><?php esc_html_e( 'Get a Free Medical Opinion Today', 'sps-medcare' ); ?></h2>
			<p><?php esc_html_e( 'Send your diagnosis and reports on WhatsApp. A specialist reviews your case and we reply with a written opinion and itemised estimate within 48 hours — free of charge.', 'sps-medcare' ); ?></p>
			<div class="sps-cta__actions">
				<a class="sps-btn sps-btn--whatsapp sps-btn--lg" href="<?php echo esc_url( sps_whatsapp_href() ); ?>" target="_blank" rel="noopener noreferrer">
					<?php echo sps_whatsapp_icon( 18 ); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>
					<?php
					/* translators: %s: phone number */
					printf( esc_html__( 'WhatsApp %s', 'sps-medcare' ), esc_html( sps_option( 'phone' ) ) );
					?>
				</a>
				<a class="sps-btn sps-btn--light sps-btn--lg" href="<?php echo esc_url( sps_contact_url() ); ?>">
					<?php esc_html_e( 'Send My Reports', 'sps-medcare' ); ?>
				</a>
			</div>
		</div>
	</div>
</section>

<?php get_footer(); ?>
