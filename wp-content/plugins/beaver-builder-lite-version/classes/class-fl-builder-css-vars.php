<?php

/**
 * Handles working with CSS variables.
 *
 * @since 2.9
 */
final class FLBuilderCSSVars {

	/**
	 * An array of registered CSS vars to output.
	 *
	 * @since 2.9
	 * @var array $registry
	 */
	static private $registry = [];

	/**
	 * Initialize hooks.
	 *
	 * @since 2.9
	 * @return void
	 */
	static public function init() {
		add_action( 'wp_head', __CLASS__ . '::render' );
	}

	/**
	 * Render CSS vars into the head tag.
	 *
	 * @since 2.9
	 * @return void
	 */
	static public function render() {
		$output = '';

		if ( empty( self::$registry ) ) {
			return;
		}

		foreach ( self::$registry as $key => $value ) {
			$output .= "\t$key: $value;\n";
		}

		echo "<style>\n:root {\n{$output}}\n</style>";
	}

	/**
	 * Add a CSS var to the registry.
	 *
	 * @since 2.9
	 * @param string $key
	 * @param string $value
	 * @return void
	 */
	static public function register( $key, $value ) {
		if ( ! isset( self::$registry[ $key ] ) ) {
			self::$registry[ $key ] = $value;
		}
	}
}

FLBuilderCSSVars::init();
