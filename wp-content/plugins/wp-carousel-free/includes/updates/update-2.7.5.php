<?php
/**
 * Update options for the version 2.7.5
 *
 * @link       https://shapedplugin.com
 *
 * @package    WP_Carousel_free
 * @subpackage WP_Carousel_free/includes/updates
 */

update_option( 'wp_carousel_free_version', '2.7.5' );
update_option( 'wp_carousel_free_db_version', '2.7.5' );

// Clear transient cache for the data of rcommended plugins.
if ( get_transient( 'spwpcp_plugins' ) ) {
	delete_transient( 'spwpcp_plugins' );
}
