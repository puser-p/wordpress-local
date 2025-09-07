<?php
namespace FLCacheClear;
class W3cache {

	public $name = 'W3 Total Cache';
	public $url  = 'https://wordpress.org/plugins/w3-total-cache/';

	public static function run() {
		if ( function_exists( '\w3tc_pgcache_flush' ) ) {
			\w3tc_pgcache_flush();
		}
	}
}
