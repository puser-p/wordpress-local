<?php
namespace FLCacheClear;
class Defines {

	public $actions = array(
		'fl_builder_init_ui',
	);

	public static function run() {
		\FLCacheClear\Plugin::define( 'DONOTMINIFY' );
		\FLCacheClear\Plugin::define( 'DONOTCACHEPAGE' );
	}
}
