<?php
namespace FLCacheClear;

class Spinupwp {

	public $name = 'SpinupWP';
	public $url  = 'https://spinupwp.com/';

	public static function run() {

		if ( function_exists( 'spinupwp_purge_site' ) ) {
			spinupwp_purge_site();
		}
	}
}
