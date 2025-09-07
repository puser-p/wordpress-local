<?php
namespace FLCacheClear;

class Pressidium {

	public $name = 'Pressidium Hosting';
	public $url  = 'https://pressidium.com/';

	public static function run() {
		if ( defined( 'WP_NINUKIS_WP_NAME' ) && class_exists( '\NinukisCaching' ) ) {
			\NinukisCaching::get_instance()->purgeAllCaches();
		}
	}
}
