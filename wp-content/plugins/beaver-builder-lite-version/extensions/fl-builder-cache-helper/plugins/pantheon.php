<?php
namespace FLCacheClear;
class Pantheon {

	public $name = 'Pantheon Hosting';
	public $url  = 'https://pantheon.io/';

	public static function run() {
		if ( function_exists( 'pantheon_clear_edge_all' ) ) {
			$ret = pantheon_clear_edge_all();
		}
	}
}
