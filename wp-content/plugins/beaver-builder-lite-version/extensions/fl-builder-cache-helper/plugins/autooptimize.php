<?php
namespace FLCacheClear;
class Autooptimize {

	public $name    = 'Autoptimize';
	public $url     = 'https://wordpress.org/plugins/autoptimize/';
	public $filters = array( 'init' );

	public static function run() {
		if ( class_exists( '\autoptimizeCache' ) ) {
			\autoptimizeCache::clearall();
		}
	}

	public function filters() {
		if ( isset( $_GET['fl_builder'] ) ) {
			add_filter( 'autoptimize_filter_noptimize', '__return_true' );
		}
	}
}
