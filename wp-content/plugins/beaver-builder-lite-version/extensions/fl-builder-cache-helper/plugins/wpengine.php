<?php
namespace FLCacheClear;
class Wpengine {

	public $name = 'WPEngine Hosting';
	public $url  = 'https://wpengine.com/';

	public static function run() {
		if ( class_exists( '\WpeCommon' ) ) {
			\WpeCommon::purge_memcached();
			\WpeCommon::clear_maxcdn_cache();
			\WpeCommon::purge_varnish_cache();
		}
	}
}
