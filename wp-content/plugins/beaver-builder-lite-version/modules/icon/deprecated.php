<?php

FLBuilder::register_module_deprecations( 'icon', [
	// v1 is only used to set the next version of the module
	// so we can check it in frontend.css.php instead of
	// deprecating the entire file.
	'v1' => [],
] );
