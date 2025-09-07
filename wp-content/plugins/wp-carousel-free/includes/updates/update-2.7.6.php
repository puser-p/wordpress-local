<?php
/**
 * Update options for the version 2.7.6
 *
 * @link       https://shapedplugin.com
 *
 * @package    WP_Carousel_free
 * @subpackage WP_Carousel_free/includes/updates
 */

update_option( 'wp_carousel_free_version', '2.7.6' );
update_option( 'wp_carousel_free_db_version', '2.7.6' );

// Delete old options related to page ID.
global $wpdb;
$wp_sitemeta = $wpdb->prefix . 'sitemeta';
$wp_options  = $wpdb->prefix . 'options';
if ( is_multisite() ) {
	$wpdb->query( "DELETE FROM {$wp_sitemeta} WHERE meta_key LIKE 'sp_wp_carousel_page_id%';" );
} else {
	$wpdb->query( "DELETE FROM {$wp_options} WHERE option_name LIKE 'sp_wp_carousel_page_id%';" );
}