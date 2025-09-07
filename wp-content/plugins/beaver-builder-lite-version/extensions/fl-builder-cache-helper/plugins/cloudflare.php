<?php
namespace FLCacheClear;
class Cloudflare {

	public $name    = 'Cloudflare';
	public $url     = 'https://wordpress.org/plugins/cloudflare/';
	public $filters = array( 'init' );

	public static function run() {
		// nothing to do here.
	}

	public function filters() {
		add_filter( 'cloudflare_purge_everything_actions', function ( $actions ) {
			$actions[] = 'fl_builder_cache_cleared';
			return $actions;
		});

		add_filter( 'cloudflare_purge_url_actions', function ( $actions ) {
			$actions[] = 'fl_builder_after_save_layout';
			$actions[] = 'fl_builder_after_save_user_template';
			return $actions;
		});
	}
}
