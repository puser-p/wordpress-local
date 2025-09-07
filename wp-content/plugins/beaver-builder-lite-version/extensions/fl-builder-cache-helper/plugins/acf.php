<?php
namespace FLCacheClear;
class ACF {
	public $name    = 'Advanced Custom Fields';
	public $url     = 'https://wordpress.org/plugins/advanced-custom-fields/';
	public $actions = array( 'admin_init' );

	public static function run() {
		add_action( 'acf/save_post', function ( $post_id ) {
			if ( is_numeric( $post_id ) ) {
				\FLBuilderModel::delete_all_asset_cache( $post_id );
			} else {
				\FLBuilderModel::delete_asset_cache_for_all_posts();
			}
			// delete partials
			\FLBuilderModel::delete_asset_cache_for_all_posts( '*layout-partial*' );
		});
	}
}
