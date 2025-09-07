<?php

if ( ! isset( $_SERVER['H_PLATFORM'] ) || 'Hostinger' !== $_SERVER['H_PLATFORM'] ) {
	return;
}

// Defines
define( 'FL_BUILDER_HOSTINGER_DIR', FL_BUILDER_DIR . 'extensions/fl-builder-hostinger/' );
define( 'FL_BUILDER_HOSTINGER_URL', FLBuilder::plugin_url() . 'extensions/fl-builder-hostinger/' );

// Classes
require_once FL_BUILDER_HOSTINGER_DIR . 'classes/class-fl-builder-hostinger.php';
