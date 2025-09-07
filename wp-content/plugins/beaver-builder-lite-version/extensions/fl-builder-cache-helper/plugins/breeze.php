<?php
namespace FLCacheClear;
class Breeze {

	public $name = 'Breeze';
	public $url  = 'https://wordpress.org/plugins/breeze/';

	public static function run() {
		if ( class_exists( '\Breeze_PurgeCache' ) ) {
			\Breeze_PurgeCache::breeze_cache_flush();
		}
	}
}
