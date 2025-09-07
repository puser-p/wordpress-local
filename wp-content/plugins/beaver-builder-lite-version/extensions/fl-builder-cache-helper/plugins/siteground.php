<?php
namespace FLCacheClear;
class Siteground {

	public $name = 'SiteGround Hosting';
	public $url  = 'https://wordpress.org/plugins/sg-cachepress/';

	public static function run() {
		if ( function_exists( '\sg_cachepress_purge_cache' ) ) {
			\sg_cachepress_purge_cache();
		}
	}
}
