<?php
/**
 * One-click demo content: creates the pages, specialties and 10 treatments
 * so the site looks complete immediately after activating the theme.
 *
 * Appearance > Setup SPS Medcare
 *
 * @package SPS_Medcare
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * The 10 treatments shipped with the theme.
 *
 * @return array
 */
function sps_demo_treatments() {
	return array(
		array(
			'title'     => 'Cancer & Oncology Treatment',
			'slug'      => 'cancer-treatment-in-india',
			'specialty' => 'Oncology',
			'excerpt'   => 'Advanced CyberKnife, immunotherapy, PET-CT guided precision radiation and surgical oncology by internationally trained specialists.',
			'content'   => "India's leading cancer centres combine PET-CT and MRI-guided planning with CyberKnife and IMRT radiation, robotic surgical oncology, targeted therapy and immunotherapy — the same protocols followed in the US and Europe, at a fraction of the cost. SPS Medcare arranges your free expert second opinion, tumour board review, medical visa and complete stay so treatment can begin within days of your arrival rather than months on a waiting list.",
			'meta'      => array(
				'cost_india'    => '$3,500 – $8,500',
				'cost_west'     => '$45,000 – $90,000 (USA)',
				'savings'       => 85,
				'hospital_stay' => '3 – 7 days',
				'stay_india'    => '14 – 21 days',
				'success_rate'  => '5-year survival on par with US centres',
				'procedures'    => "CyberKnife & IMRT precision radiotherapy\nRobotic and open surgical oncology\nChemotherapy and targeted therapy cycles\nImmunotherapy (checkpoint inhibitors)\nPET-CT staging and tumour board review",
				'hospitals'     => "Apollo Cancer Centre, Delhi NCR\nFortis Memorial Research Institute, Gurugram\nMedanta – The Medicity, Gurugram\nMax Super Speciality Hospital, Saket",
			),
		),
		array(
			'title'     => 'Cardiac Surgery & Cardiology',
			'slug'      => 'cardiac-treatment-in-india',
			'specialty' => 'Cardiology',
			'excerpt'   => 'Minimally invasive bypass (CABG), valve replacement, TAVI, angioplasty and paediatric heart surgery with world-class outcomes.',
			'content'   => 'Indian cardiac surgeons are among the highest-volume operators in the world, and that experience shows in outcomes: success rates for bypass and valve surgery match or exceed Western benchmarks. From beating-heart minimally invasive CABG and TAVI to complex paediatric heart repair, SPS Medcare connects you to the right surgeon, arranges the medical visa for patient and attendant, and coordinates every step from the airport to your discharge summary.',
			'meta'      => array(
				'cost_india'    => '$4,200 – $7,000',
				'cost_west'     => '$60,000+ (USA)',
				'savings'       => 88,
				'hospital_stay' => '5 – 7 days',
				'stay_india'    => '12 – 16 days',
				'success_rate'  => '98%+ for elective CABG at partner centres',
				'procedures'    => "Minimally invasive & beating-heart CABG (bypass)\nHeart valve repair and replacement\nTAVI / TAVR transcatheter valve implantation\nAngioplasty and stenting\nPaediatric and congenital heart surgery\nPacemaker and ICD implantation",
				'hospitals'     => "Medanta Heart Institute, Gurugram\nFortis Escorts Heart Institute, Delhi\nApollo Hospitals, Delhi NCR\nMax Heart & Vascular Institute, Saket",
			),
		),
		array(
			'title'     => 'Orthopedics & Joint Replacement',
			'slug'      => 'joint-replacement-in-india',
			'specialty' => 'Orthopedics',
			'excerpt'   => 'Robotic total knee and hip replacement, spine fusion and arthroscopic ligament reconstruction with rapid rehabilitation.',
			'content'   => 'Robotic-assisted knee and hip replacement in India uses the same Stryker Mako and CUVIS platforms found in leading US hospitals, with implants from Zimmer, DePuy and Smith & Nephew. Most patients walk within 24 hours and fly home in under two weeks. SPS Medcare arranges your surgeon opinion from your X-rays and MRI before you travel, so you arrive with a confirmed plan, implant choice and fixed cost estimate.',
			'meta'      => array(
				'cost_india'    => '$4,000 – $6,500',
				'cost_west'     => '$40,000+ (USA/UK)',
				'savings'       => 85,
				'hospital_stay' => '3 – 5 days',
				'stay_india'    => '10 – 14 days',
				'success_rate'  => '97%+ implant survival at 10 years',
				'procedures'    => "Robotic total knee replacement (TKR)\nTotal hip replacement (THR) — cemented & uncemented\nPartial / unicompartmental knee replacement\nSpine fusion and endoscopic discectomy\nArthroscopic ACL / PCL reconstruction\nShoulder replacement and rotator cuff repair",
				'hospitals'     => "Medanta Bone & Joint Institute, Gurugram\nFortis Memorial Research Institute, Gurugram\nMax Institute of Musculoskeletal Sciences, Delhi\nIndian Spinal Injuries Centre, Delhi",
			),
		),
		array(
			'title'     => 'Organ Transplants (Liver & Kidney)',
			'slug'      => 'organ-transplant-in-india',
			'specialty' => 'Transplants',
			'excerpt'   => "High-success living-donor liver and kidney transplants in dedicated transplant ICUs, fully compliant with India's NOTTO legal framework.",
			'content'   => "India performs more living-donor liver transplants than almost any country, with graft survival rates above 90% at leading centres. Transplants for foreign nationals require a related donor and formal approval under India's NOTTO/THOA regulations — SPS Medcare guides you and your donor through every document, embassy attestation and hospital committee step, then coordinates the extended recovery stay and follow-up your case needs.",
			'meta'      => array(
				'cost_india'    => '$12,000 – $28,000',
				'cost_west'     => '$150,000 – $300,000 (USA)',
				'savings'       => 90,
				'hospital_stay' => '10 – 14 days',
				'stay_india'    => '30 – 45 days',
				'success_rate'  => '90%+ one-year graft survival',
				'procedures'    => "Living-donor liver transplant (LDLT)\nLiving-donor kidney transplant\nPaediatric liver transplant\nABO-incompatible and swap transplants\nPre-transplant workup and donor evaluation",
				'hospitals'     => "Medanta Institute of Liver Transplantation, Gurugram\nApollo Hospitals Transplant Institute, Delhi\nFortis Organ Retrieval & Transplant, Gurugram\nMax Super Speciality Hospital, Saket",
			),
		),
		array(
			'title'     => 'Neurosurgery & Spine Care',
			'slug'      => 'neurosurgery-in-india',
			'specialty' => 'Neurology & Spine',
			'excerpt'   => 'Brain tumour excision, deep brain stimulation, endoscopic spine surgery and aneurysm clipping with intraoperative MRI.',
			'content'   => "Delhi NCR's neurosurgical centres operate with intraoperative MRI, neuronavigation, awake craniotomy protocols and Gamma Knife radiosurgery. Whether it is a brain tumour, an aneurysm, epilepsy surgery or deep brain stimulation for Parkinson's, SPS Medcare arranges a written surgical opinion from your existing MRI before you spend anything on travel.",
			'meta'      => array(
				'cost_india'    => '$5,000 – $9,000',
				'cost_west'     => '$55,000+ (USA)',
				'savings'       => 85,
				'hospital_stay' => '4 – 8 days',
				'stay_india'    => '14 – 18 days',
				'success_rate'  => 'Outcome parity with leading Western centres',
				'procedures'    => "Brain tumour excision (awake & navigated craniotomy)\nGamma Knife / stereotactic radiosurgery\nDeep brain stimulation (DBS) for Parkinson's\nAneurysm clipping and coiling\nEndoscopic and minimally invasive spine surgery\nEpilepsy surgery",
				'hospitals'     => "Medanta Institute of Neurosciences, Gurugram\nFortis Memorial Research Institute, Gurugram\nApollo Institute of Neurosciences, Delhi\nIndian Spinal Injuries Centre, Delhi",
			),
		),
		array(
			'title'     => 'Bone Marrow Transplant (BMT)',
			'slug'      => 'bone-marrow-transplant-in-india',
			'specialty' => 'Hematology',
			'excerpt'   => 'Autologous and allogeneic BMT for leukaemia, thalassemia and lymphoma in HEPA-filtered clean-room units.',
			'content'   => 'Bone marrow transplant for thalassemia, leukaemia, aplastic anaemia and lymphoma is one of the strongest reasons families travel to India — outcomes at leading Indian BMT units rival any in the world, at roughly a tenth of US pricing. Treatment needs a long, carefully managed stay; SPS Medcare handles HLA-matching coordination, the extended visa, long-stay accommodation for the family and a care manager throughout the isolation period.',
			'meta'      => array(
				'cost_india'    => '$15,000 – $25,000',
				'cost_west'     => '$180,000+ (USA)',
				'savings'       => 88,
				'hospital_stay' => '15 – 25 days',
				'stay_india'    => '45 – 60 days',
				'success_rate'  => '80–90% cure in matched-sibling thalassemia BMT',
				'procedures'    => "Allogeneic BMT (matched sibling / haploidentical)\nAutologous stem cell transplant\nThalassemia and sickle-cell BMT\nLeukaemia and lymphoma transplant protocols\nHLA typing and donor matching",
				'hospitals'     => "Apollo BMT Centre, Delhi\nFortis Memorial Research Institute, Gurugram\nMedanta Cancer Institute, Gurugram\nMax Institute of Haematology & BMT, Delhi",
			),
		),
		array(
			'title'     => 'Cosmetic & Plastic Surgery',
			'slug'      => 'cosmetic-surgery-in-india',
			'specialty' => 'Cosmetic Surgery',
			'excerpt'   => 'Rhinoplasty, liposuction, breast surgery, hair transplantation and mommy makeovers by board-certified plastic surgeons.',
			'content'   => "India's board-certified plastic surgeons deliver aesthetic results at Western standards for a quarter of the price, with the discretion international patients expect. Most cosmetic procedures are day-care or single-night stays, so you can combine your procedure with a recovery stay in a comfortable serviced apartment — SPS Medcare arranges both, plus a follow-up review before you fly home.",
			'meta'      => array(
				'cost_india'    => '$1,800 – $4,500',
				'cost_west'     => '$12,000 – $25,000 (USA)',
				'savings'       => 82,
				'hospital_stay' => '1 – 2 days',
				'stay_india'    => '7 – 10 days',
				'success_rate'  => 'High patient-satisfaction scores at partner centres',
				'procedures'    => "Rhinoplasty (nose reshaping)\nLiposuction and body contouring\nBreast augmentation, reduction and lift\nFUE / FUT hair transplantation\nTummy tuck (abdominoplasty) and mommy makeover\nFacelift and blepharoplasty",
				'hospitals'     => "Fortis Memorial Research Institute, Gurugram\nApollo Cosmetic Clinics, Delhi\nMax Super Speciality Hospital, Saket\nMedanta Institute of Plastic Surgery, Gurugram",
			),
		),
		array(
			'title'     => 'Urology & Nephrology',
			'slug'      => 'urology-treatment-in-india',
			'specialty' => 'Urology',
			'excerpt'   => 'Robotic prostatectomy, laser kidney-stone removal (RIRS/PCNL), dialysis support and reconstructive urology.',
			'content'   => "From laser stone clearance that gets you home in a week to robotic prostatectomy and complex urinary reconstruction, India's urology units combine da Vinci robotic platforms with very high procedural volumes. SPS Medcare arranges pre-travel review of your CT/ultrasound reports so the surgical plan — and its cost — is fixed before you book a flight.",
			'meta'      => array(
				'cost_india'    => '$2,200 – $5,000',
				'cost_west'     => '$22,000+ (USA)',
				'savings'       => 80,
				'hospital_stay' => '2 – 4 days',
				'stay_india'    => '7 – 10 days',
				'success_rate'  => '95%+ stone-free rates for RIRS/PCNL',
				'procedures'    => "Robotic radical prostatectomy\nRIRS and PCNL laser kidney-stone removal\nTURP for enlarged prostate (BPH)\nReconstructive and paediatric urology\nDialysis and nephrology management",
				'hospitals'     => "Medanta Kidney & Urology Institute, Gurugram\nApollo Institute of Urology, Delhi\nFortis Memorial Research Institute, Gurugram\nMax Institute of Urology, Saket",
			),
		),
		array(
			'title'     => 'IVF & Fertility Treatment',
			'slug'      => 'ivf-treatment-in-india',
			'specialty' => 'Fertility & IVF',
			'excerpt'   => 'ICSI, IMSI, pre-implantation genetic screening, donor programs and advanced embryology labs with strong take-home baby rates.',
			'content'   => "India's fertility clinics offer IVF, ICSI and genetic screening at a fraction of Western pricing, with ART regulation under the 2021 ART Act giving couples a clear legal framework. A full cycle typically needs two to three weeks in India; SPS Medcare arranges the clinic, the couple's medical visa, comfortable accommodation and privacy throughout the cycle.",
			'meta'      => array(
				'cost_india'    => '$2,500 – $4,200',
				'cost_west'     => '$18,000 – $30,000 (USA)',
				'savings'       => 85,
				'hospital_stay' => 'Day care / outpatient',
				'stay_india'    => '14 – 21 days',
				'success_rate'  => '40–55% per cycle (age dependent)',
				'procedures'    => "IVF with ICSI / IMSI\nPre-implantation genetic testing (PGT-A / PGS)\nFrozen embryo transfer (FET)\nEgg and sperm donor programs\nIUI and fertility preservation (egg/sperm freezing)",
				'hospitals'     => "Apollo Fertility, Delhi NCR\nFortis La Femme, Delhi\nMedanta Institute of Reproductive Medicine, Gurugram\nMax Institute of Reproductive Medicine, Delhi",
			),
		),
		array(
			'title'     => 'General & Laparoscopic Surgery',
			'slug'      => 'general-surgery-in-india',
			'specialty' => 'General Surgery',
			'excerpt'   => 'Gallbladder removal, hernia repair, bariatric weight-loss surgery and gastrointestinal procedures — mostly keyhole, quick recovery.',
			'content'   => "Routine but life-changing surgery — gallstones, hernia, piles, bariatric sleeve — done laparoscopically with one- to three-day stays and a one-week recovery before flying. These are the procedures where waiting lists abroad hurt most, and where India's combination of speed and price is hardest to beat. SPS Medcare fixes your date, surgeon and package cost before you travel.",
			'meta'      => array(
				'cost_india'    => '$2,000 – $4,800',
				'cost_west'     => '$16,000 – $30,000 (USA)',
				'savings'       => 82,
				'hospital_stay' => '2 – 3 days',
				'stay_india'    => '7 – 10 days',
				'success_rate'  => '99%+ for elective laparoscopic procedures',
				'procedures'    => "Laparoscopic gallbladder removal (cholecystectomy)\nHernia repair (inguinal, umbilical, incisional)\nBariatric sleeve gastrectomy and gastric bypass\nPiles, fissure and fistula surgery (laser)\nAppendectomy and GI reconstructive surgery",
				'hospitals'     => "Apollo Hospitals, Delhi NCR\nFortis Memorial Research Institute, Gurugram\nMax Super Speciality Hospital, Saket\nMedanta – The Medicity, Gurugram",
			),
		),
	);
}

/**
 * Pages created by the setup routine: slug => array( title, template ).
 *
 * @return array
 */
function sps_demo_pages() {
	return array(
		'home'       => array( 'Home', 'front-page.php', '' ),
		'treatments' => array( 'Treatments', 'page-treatments.php', '' ),
		'services'   => array( 'Services', 'page-services.php', '' ),
		'about'      => array(
			'About Us',
			'',
			"<!-- wp:paragraph --><p>SPS Medcare was founded in 2011 to solve a problem we watched families face again and again: excellent, affordable treatment existed in India, but reaching it from abroad meant navigating hospitals, visas, language, travel and accommodation entirely alone.</p><!-- /wp:paragraph -->\n<!-- wp:paragraph --><p>Since then we have guided more than <strong>2,500 international patients</strong> from over <strong>12 countries</strong> through treatment in Delhi NCR — from routine laparoscopic surgery to liver transplants and paediatric bone marrow transplants.</p><!-- /wp:paragraph -->\n<!-- wp:heading --><h2>Our Promise</h2><!-- /wp:heading -->\n<!-- wp:list --><ul><li><strong>Zero facilitation fee</strong> — our service to patients is free; we never mark up hospital bills</li><li><strong>Honest opinions</strong> — if travelling to India is not right for your case, we tell you</li><li><strong>Accredited hospitals only</strong> — JCI and NABH accredited partners with published outcomes</li><li><strong>One named coordinator</strong> from your first message until you land back home</li></ul><!-- /wp:list -->",
		),
		'contact'    => array( 'Contact Us', 'page-contact.php', '' ),
	);
}

/**
 * Admin page under Appearance.
 */
function sps_demo_menu() {
	add_theme_page(
		__( 'Setup SPS Medcare', 'sps-medcare' ),
		__( 'Setup SPS Medcare', 'sps-medcare' ),
		'edit_theme_options',
		'sps-setup',
		'sps_demo_page'
	);
}
add_action( 'admin_menu', 'sps_demo_menu' );

/**
 * Render the setup page.
 */
function sps_demo_page() {
	$done = isset( $_GET['sps_seeded'] ) ? absint( $_GET['sps_seeded'] ) : 0;
	?>
	<div class="wrap">
		<h1><?php esc_html_e( 'Setup SPS Medcare', 'sps-medcare' ); ?></h1>

		<?php if ( $done ) : ?>
			<div class="notice notice-success">
				<p>
					<?php esc_html_e( 'Done! Pages, specialties and 10 treatments were created, the menu was built and the home page was set. Visit your site to see it.', 'sps-medcare' ); ?>
				</p>
			</div>
		<?php endif; ?>

		<p><?php esc_html_e( 'One click creates everything you need for a complete website:', 'sps-medcare' ); ?></p>
		<ul class="ul-disc">
			<li><?php esc_html_e( '5 pages — Home, Treatments, Services, About Us, Contact Us (with the right templates)', 'sps-medcare' ); ?></li>
			<li><?php esc_html_e( '10 specialties and 10 treatments with cost comparisons, procedures and hospitals', 'sps-medcare' ); ?></li>
			<li><?php esc_html_e( 'A primary navigation menu, and Home set as the front page', 'sps-medcare' ); ?></li>
		</ul>
		<p><em><?php esc_html_e( 'Safe to run more than once — existing items are updated, never duplicated. Your own edits to page content are preserved.', 'sps-medcare' ); ?></em></p>

		<form method="post" action="<?php echo esc_url( admin_url( 'themes.php?page=sps-setup' ) ); ?>">
			<?php wp_nonce_field( 'sps_seed_demo', 'sps_seed_nonce' ); ?>
			<p>
				<button type="submit" name="sps_seed" value="1" class="button button-primary button-hero">
					<?php esc_html_e( 'Create demo content now', 'sps-medcare' ); ?>
				</button>
			</p>
		</form>

		<hr />
		<h2><?php esc_html_e( 'Next steps', 'sps-medcare' ); ?></h2>
		<ol>
			<li><?php esc_html_e( 'Appearance → Customize → SPS Medcare: set your phone, landline, email and address.', 'sps-medcare' ); ?></li>
			<li><?php esc_html_e( 'Treatments → add a featured image to each treatment (recommended 1600×800).', 'sps-medcare' ); ?></li>
			<li><?php esc_html_e( 'Patient enquiries arrive under Enquiries and are emailed to the address set in the Customizer.', 'sps-medcare' ); ?></li>
		</ol>
	</div>
	<?php
}

/**
 * Run the seeder when the button is pressed.
 */
function sps_maybe_seed_demo() {
	if ( empty( $_POST['sps_seed'] ) || ! current_user_can( 'edit_theme_options' ) ) {
		return;
	}

	$nonce = isset( $_POST['sps_seed_nonce'] ) ? sanitize_text_field( wp_unslash( $_POST['sps_seed_nonce'] ) ) : '';
	if ( ! wp_verify_nonce( $nonce, 'sps_seed_demo' ) ) {
		return;
	}

	sps_seed_demo_content();

	wp_safe_redirect( admin_url( 'themes.php?page=sps-setup&sps_seeded=1' ) );
	exit;
}
add_action( 'admin_init', 'sps_maybe_seed_demo' );

/**
 * Create pages, specialties, treatments and the menu.
 */
function sps_seed_demo_content() {
	$page_ids = array();

	// Pages.
	foreach ( sps_demo_pages() as $slug => $data ) {
		list( $title, $template, $content ) = $data;

		$existing = get_page_by_path( $slug );

		if ( $existing ) {
			$page_id = $existing->ID;
		} else {
			$page_id = wp_insert_post(
				array(
					'post_type'    => 'page',
					'post_status'  => 'publish',
					'post_title'   => $title,
					'post_name'    => $slug,
					'post_content' => $content,
				)
			);
		}

		if ( $page_id && ! is_wp_error( $page_id ) ) {
			if ( $template ) {
				update_post_meta( $page_id, '_wp_page_template', $template );
			}
			$page_ids[ $slug ] = $page_id;
		}
	}

	// Front page.
	if ( ! empty( $page_ids['home'] ) ) {
		update_option( 'show_on_front', 'page' );
		update_option( 'page_on_front', $page_ids['home'] );
	}

	// Treatments + specialties.
	foreach ( sps_demo_treatments() as $index => $treatment ) {
		$existing = get_posts(
			array(
				'post_type'      => 'sps_treatment',
				'name'           => $treatment['slug'],
				'posts_per_page' => 1,
				'post_status'    => 'any',
				'fields'         => 'ids',
			)
		);

		$args = array(
			'post_type'    => 'sps_treatment',
			'post_status'  => 'publish',
			'post_title'   => $treatment['title'],
			'post_name'    => $treatment['slug'],
			'post_content' => $treatment['content'],
			'post_excerpt' => $treatment['excerpt'],
			'menu_order'   => $index + 1,
		);

		if ( ! empty( $existing ) ) {
			$args['ID'] = $existing[0];
			$post_id    = wp_update_post( $args );
		} else {
			$post_id = wp_insert_post( $args );
		}

		if ( ! $post_id || is_wp_error( $post_id ) ) {
			continue;
		}

		wp_set_object_terms( $post_id, $treatment['specialty'], 'sps_specialty', false );

		foreach ( $treatment['meta'] as $key => $value ) {
			update_post_meta( $post_id, '_sps_' . $key, $value );
		}
	}

	// Primary menu.
	$menu_name = __( 'Primary Menu', 'sps-medcare' );
	$menu      = wp_get_nav_menu_object( $menu_name );

	if ( ! $menu ) {
		$menu_id = wp_create_nav_menu( $menu_name );
	} else {
		$menu_id = $menu->term_id;
	}

	if ( ! is_wp_error( $menu_id ) ) {
		$items = wp_get_nav_menu_items( $menu_id );

		if ( empty( $items ) ) {
			foreach ( array( 'home', 'treatments', 'services', 'about', 'contact' ) as $order => $slug ) {
				if ( empty( $page_ids[ $slug ] ) ) {
					continue;
				}

				wp_update_nav_menu_item(
					$menu_id,
					0,
					array(
						'menu-item-title'     => get_the_title( $page_ids[ $slug ] ),
						'menu-item-object'    => 'page',
						'menu-item-object-id' => $page_ids[ $slug ],
						'menu-item-type'      => 'post_type',
						'menu-item-status'    => 'publish',
						'menu-item-position'  => $order + 1,
					)
				);
			}
		}

		$locations            = get_theme_mod( 'nav_menu_locations', array() );
		$locations['primary'] = $menu_id;
		set_theme_mod( 'nav_menu_locations', $locations );
	}

	flush_rewrite_rules();
}

/**
 * Nudge the admin towards the setup screen right after activation.
 */
function sps_activation_notice() {
	if ( ! current_user_can( 'edit_theme_options' ) ) {
		return;
	}

	$screen = get_current_screen();
	if ( ! $screen || 'themes' !== $screen->id ) {
		return;
	}

	$has_treatments = get_posts(
		array(
			'post_type'      => 'sps_treatment',
			'posts_per_page' => 1,
			'fields'         => 'ids',
			'post_status'    => 'any',
		)
	);

	if ( ! empty( $has_treatments ) ) {
		return;
	}
	?>
	<div class="notice notice-info is-dismissible">
		<p>
			<strong><?php esc_html_e( 'SPS Medcare theme activated.', 'sps-medcare' ); ?></strong>
			<?php esc_html_e( 'Create the pages and 10 treatments in one click:', 'sps-medcare' ); ?>
			<a class="button button-primary" href="<?php echo esc_url( admin_url( 'themes.php?page=sps-setup' ) ); ?>">
				<?php esc_html_e( 'Run setup', 'sps-medcare' ); ?>
			</a>
		</p>
	</div>
	<?php
}
add_action( 'admin_notices', 'sps_activation_notice' );
