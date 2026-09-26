<?php
/**
 * Search form.
 *
 * @package SPS_Medcare
 */

?>
<form role="search" method="get" class="sps-searchform" action="<?php echo esc_url( home_url( '/' ) ); ?>">
	<label class="screen-reader-text" for="sps-s-<?php echo esc_attr( wp_unique_id() ); ?>">
		<?php esc_html_e( 'Search this site', 'sps-medcare' ); ?>
	</label>
	<input
		type="search"
		class="sps-input"
		placeholder="<?php esc_attr_e( 'Search treatments, guides…', 'sps-medcare' ); ?>"
		value="<?php echo esc_attr( get_search_query() ); ?>"
		name="s"
	/>
	<button type="submit" class="sps-btn sps-btn--primary sps-btn--sm">
		<?php esc_html_e( 'Search', 'sps-medcare' ); ?>
	</button>
</form>
