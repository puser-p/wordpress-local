<?php

require get_template_directory() . '/inc/tgm/class-tgm-plugin-activation.php';
/**
 * Recommended plugins.
 */
function social_ngo_register_recommended_plugins() {
	$plugins = array(
		array(
			'name'             => __( 'Luzuk Multi Slider', 'social-ngo' ),
			'slug'             => 'luzuk-wp-multi-slider',
			'source'           => '',
			'required'         => false,
			'force_activation' => false,
		)
	);
	$config = array();
	tgmpa( $plugins, $config );
}
add_action( 'tgmpa_register', 'social_ngo_register_recommended_plugins' );