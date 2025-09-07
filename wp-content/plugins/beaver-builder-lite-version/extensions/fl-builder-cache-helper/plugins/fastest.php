<?php
namespace FLCacheClear;
class Fastest {

	public $name = 'WP Fastest Cache';
	public $url  = 'https://wordpress.org/plugins/wp-fastest-cache/';

	public static function run() {
		if ( class_exists( '\WpFastestCache' ) ) {
			global $wp_fastest_cache;
			$wp_fastest_cache->deleteCache( true );
		}
	}
}
