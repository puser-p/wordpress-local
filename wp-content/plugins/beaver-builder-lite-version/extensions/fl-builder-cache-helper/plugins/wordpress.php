<?php
namespace FLCacheClear;
//phpcs:ignore WordPress.WP.CapitalPDangit.MisspelledClassName
class Wordpress {
	public $name = 'Object Caching';

	public static function run() {
		wp_cache_flush();
	}
}
