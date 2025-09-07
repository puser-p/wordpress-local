<?php
namespace FLCacheClear;
class Cacheenabler {

	public $name = 'Cache Enabler';
	public $url  = 'https://wordpress.org/plugins/cache-enabler/';

	public static function run() {
		if ( class_exists( '\Cache_Enabler' ) ) {
			if ( ! is_multisite() ) {
				\Cache_Enabler::clear_total_cache();
			} else {
				\Cache_Enabler_Disk::delete_asset( site_url(), 'dir' );
			}
		}
	}
}
