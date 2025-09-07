<?php
namespace FLCacheClear;
class Hummingbird {

	public $name = 'Hummingbird Page Speed Optimization';
	public $url  = 'https://wordpress.org/plugins/hummingbird-performance/';

	public static function run() {
		if ( class_exists( '\WP_Hummingbird_Utils' ) && class_exists( '\WP_Hummingbird' ) ) {
			if ( \WP_Hummingbird_Utils::get_module( 'page_cache' )->is_active() ) {
				\WP_Hummingbird_Utils::get_module( 'page_cache' )->clear_cache();
				\WP_Hummingbird_Module_Page_Cache::log_msg( 'Cache cleared by Beaver Builder.' );
			}
		}
	}
}
