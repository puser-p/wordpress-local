<?php

class FLBlock {

	static public function register( $key, $config ) {

		$class = new class() extends FLBuilderModule {
			public static $config = null;
			public function __construct() {
				if ( self::$config ) {
					parent::__construct( self::$config );
				}
			}
		};

		$class::$config = array_merge( $config, [
			'slug'            => $key,
			'block_editor'    => true,
			'partial_refresh' => true,
			'include_wrapper' => false,
		] );

		$class_name = str_replace( '-', '', ucwords( $key ) ) . 'Module';
		$anon_name  = get_class( $class );
		$form       = isset( $config['form'] ) ? $config['form'] : [];

		class_alias( $anon_name, $class_name );

		FLBuilder::register_module( $class_name, $form );
	}
}
