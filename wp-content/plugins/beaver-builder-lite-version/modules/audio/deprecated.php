<?php

FLBuilder::register_module_deprecations( 'audio', [
	'v1' => [
		'config' => [
			'include_wrapper' => true,
			'element_setting' => true,
		],
		'files'  => [
			'includes/frontend.php',
		],
	],
] );
