<?php
namespace FLCacheClear;
class Swift {

	public $name = 'Swift Performance';
	public $url  = 'https://wordpress.org/plugins/swift-performance-lite/';

	public static function run() {
		if ( class_exists( '\Swift_Performance_Cache' ) ) {
			\Swift_Performance_Cache::clear_all_cache();
		}
	}
}
