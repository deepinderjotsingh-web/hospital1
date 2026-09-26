/**
 * SPS Medcare theme scripts: mobile nav toggle, smooth anchor scroll,
 * sticky-header shadow and simple reveal-on-scroll animations.
 */
(function () {
	'use strict';

	document.addEventListener('DOMContentLoaded', function () {
		/* Mobile navigation */
		var toggle = document.querySelector('.sps-menu-toggle');
		var nav = document.getElementById('sps-mobile-nav');

		if (toggle && nav) {
			toggle.addEventListener('click', function () {
				var open = nav.classList.toggle('is-open');
				toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
			});

			nav.addEventListener('click', function (e) {
				if (e.target.tagName === 'A') {
					nav.classList.remove('is-open');
					toggle.setAttribute('aria-expanded', 'false');
				}
			});
		}

		/* Sticky header shadow */
		var header = document.querySelector('.sps-header');
		if (header) {
			var onScroll = function () {
				if (window.scrollY > 8) {
					header.classList.add('is-stuck');
				} else {
					header.classList.remove('is-stuck');
				}
			};
			window.addEventListener('scroll', onScroll, { passive: true });
			onScroll();
		}

		/* Reveal on scroll */
		var targets = document.querySelectorAll('.sps-card, .sps-section > .sps-container > h2');
		if ('IntersectionObserver' in window && targets.length) {
			var observer = new IntersectionObserver(
				function (entries) {
					entries.forEach(function (entry) {
						if (entry.isIntersecting) {
							entry.target.classList.add('is-visible');
							observer.unobserve(entry.target);
						}
					});
				},
				{ rootMargin: '0px 0px -40px 0px', threshold: 0.08 }
			);
			Array.prototype.forEach.call(targets, function (el) {
				el.classList.add('sps-reveal');
				observer.observe(el);
			});
		}

		/* Smooth scroll for in-page anchors (e.g. #sps-enquiry) */
		document.addEventListener('click', function (e) {
			var link = e.target.closest ? e.target.closest('a[href^="#"]') : null;
			if (!link) {
				return;
			}
			var id = link.getAttribute('href');
			if (!id || id === '#' || id.length < 2) {
				return;
			}
			var el = document.querySelector(id);
			if (el) {
				e.preventDefault();
				el.scrollIntoView({ behavior: 'smooth', block: 'start' });
			}
		});
	});
})();
