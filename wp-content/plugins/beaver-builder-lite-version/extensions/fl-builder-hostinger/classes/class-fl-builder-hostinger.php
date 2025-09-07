<?php

class FLBuilderHostinger {

	private $upgrade_url = 'https://www.wpbeaverbuilder.com/hostinger/';

	private $delay = 86400; // show after 1 day

	public function __construct() {
		add_filter( 'fl_builder_upgrade_url', array( $this, 'filter_upgrade_url' ), PHP_INT_MAX );

		$this->register_notice();
	}

	public function filter_upgrade_url( $url ) {
		return str_replace( 'https://www.wpbeaverbuilder.com/?', self::get_upgrade_url() . '?', $url );
	}

	private function get_upgrade_url() {
		return $this->upgrade_url;
	}

	private function register_notice() {

		if ( ! class_exists( 'FLBuilderAdminNotices' ) ) {
			require_once FL_BUILDER_DIR . 'classes/class-fl-builder-admin-notices.php';
		}

		$args = array(
			'content' => $this->render_upgrade_notice(),
			'id'      => 'hostinger-dashboard',
			'class'   => 'updated',
			'only'    => 'index.php',
			'delay'   => $this->delay,
		);
		FLBuilderAdminNotices::register_notice( $args );

		$args = array(
			'content' => $this->render_upgrade_notice(),
			'id'      => 'hostinger-settings',
			'class'   => 'updated',
		);
		FLBuilderAdminNotices::register_notice( $args );
	}

	private function render_upgrade_notice() {
		ob_start();
		include FL_BUILDER_HOSTINGER_DIR . 'includes/upgrade-notice.php';
		return ob_get_clean();
	}
}

new FLBuilderHostinger();
