<?php
namespace FLCacheClear;
class Pagely {

	public $name = 'Pagely Hosting';
	public $url  = 'https://pagely.com/plans-pricing/';

	public static function run( $post_id = false ) {

		$templates = array(
			'fl-builder-template',
			'fl-theme-layout',
		);
		if ( class_exists( '\PagelyCachePurge' ) ) {
			$purger = new \PagelyCachePurge();
			if ( $post_id && ! in_array( get_post_type( $post_id ), $templates ) ) {
				$purger->purgePost( $post_id );
			} else {
				$purger->purgeAll();
			}
		}
	}
}
