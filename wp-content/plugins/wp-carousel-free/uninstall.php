<?php
/**
 * Uninstall.php for cleaning plugin database.
 *
 * Trigger the file when plugin is deleted.
 *
 * @see delete_option(), delete_post_meta_key()
 * @since 3.1.0
 * @package WP Carousel
 */

defined( 'WP_UNINSTALL_PLUGIN' ) || exit;

/**
 * Delete plugin data function.
 *
 * @return void
 */
function sp_wpcf_delete_plugin_data() {
	// Fetch all dismiss status keys of Admin offer banner.
	global $wpdb;
	$option_prefix = 'sp_wcf_offer_banner_dismiss_status_';
	$options       = $wpdb->get_results(
		$wpdb->prepare(
			"SELECT option_name FROM {$wpdb->options} WHERE option_name LIKE %s",
			$wpdb->esc_like( $option_prefix ) . '%'
		)
	);

	// Loop through and delete each option.
	if ( ! empty( $options ) ) {
		foreach ( $options as $option ) {
			delete_option( $option->option_name );
			delete_site_option( $option->option_name );
		}
	}

	// Delete plugin option settings.
	$option_name = 'sp_wpcp_settings';
	delete_option( $option_name );
	delete_site_option( $option_name ); // For site options in Multisite.

	// Delete carousel post type.
	$carousel_posts = get_posts(
		array(
			'numberposts' => -1,
			'post_type'   => 'sp_wp_carousel',
			'post_status' => 'any',
		)
	);
	foreach ( $carousel_posts as $post ) {
		wp_delete_post( $post->ID, true );
	}

	// Delete Carousel post meta.
	delete_post_meta_by_key( 'sp_wpcp_upload_options' );
	delete_post_meta_by_key( 'sp_wpcp_shortcode_options' );

	delete_option( 'wpcp_page_data' );
}

// Load WPCP file.
require plugin_dir_path( __FILE__ ) . '/wp-carousel-free.php';
$option_settings  = get_option( 'sp_wpcp_settings' );
$wpcf_plugin_data = isset( $option_settings['wpcf_delete_all_data'] ) ? $option_settings['wpcf_delete_all_data'] : false;

if ( $wpcf_plugin_data ) {
	sp_wpcf_delete_plugin_data();
}
