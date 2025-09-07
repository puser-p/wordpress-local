<?php

class FLBuilderModuleDeprecations {

	/**
	 * An array of registered module deprecations.
	 *
	 * @since 2.9
	 * @var array $deprecations
	 */
	static private $deprecations = [];

	/**
	 * @since 2.9
	 * @return void
	 */
	static public function init() {
		add_filter( 'fl_builder_before_update_layout_data', __CLASS__ . '::update_layout_data_version', 10, 3 );
		add_filter( 'fl_builder_module_defaults', __CLASS__ . '::get_updated_module_defaults', 1, 2 );
		add_filter( 'fl_builder_layout_data', __CLASS__ . '::force_node_wrappers' );
	}

	/**
	 * Register deprecations for a module allowing you to deprecate config,
	 * defaults, and files.
	 *
	 * @since 2.9
	 * @param string $slug The module slug.
	 * @param array $deprecations An array of config for each deprecation.
	 * @return void
	 */
	static public function register( $slug, $deprecations = [] ) {
		if ( ! isset( FLBuilderModel::$modules[ $slug ] ) ) {
			/* translators: %s module slug */
			error_log( sprintf( _x( 'A module with the slug %s does not exist for registering deprecations.', '%s module slug', 'fl-builder' ), $slug ) );
		}

		self::$deprecations[ $slug ] = $deprecations;
	}

	/**
	 * Return the registered deprecations for a module.
	 *
	 * @since 2.9
	 * @param string $slug The module slug.
	 * @return array
	 */
	static public function get_deprecations( $slug ) {
		return isset( self::$deprecations[ $slug ] ) ? self::$deprecations[ $slug ] : [];
	}

	/**
	 * Return all registered deprecations.
	 *
	 * @since 2.9
	 * @return array
	 */
	static public function get_all_deprecations() {
		return self::$deprecations;
	}

	/**
	 * Adds a version to new modules in the layout data before
	 * it is saved to the database.
	 *
	 * @since 2.9
	 * @param array $data Layout data before it is saved.
	 * @param string $status Either published or draft.
	 * @param int $post_id The ID of the post being updated.
	 * @return array
	 */
	static public function update_layout_data_version( $data, $status, $post_id ) {
		if ( 'draft' === $status ) {
			$previous = FLBuilderModel::get_layout_data( 'draft', $post_id );

			foreach ( $data as $node_id => $node ) {
				if ( 'module' === $node->type && ! isset( $node->version ) && ! isset( $previous[ $node_id ] ) ) {
					$data[ $node_id ]->version = self::get_module_version( $node->settings->type );
				}
			}
		}

		return $data;
	}

	/**
	 * Sets the version to 1 in template modules with no version
	 * number. This ensures modules render as they were intended
	 * when the template was created.
	 *
	 * @since 2.9
	 * @param array $nodes
	 * @return array
	 */
	static public function update_template_data_version( $nodes ) {
		foreach ( $nodes as $node ) {
			if ( 'module' === $node->type && ! isset( $node->version ) ) {
				$node->version = 1;
			}
		}

		return $nodes;
	}

	/**
	 * Forces the builder to render the version of nodes with their wrapper
	 * divs if the wrapper div was originally enabled but deprecated.
	 *
	 * @since 2.9
	 * @param array $data
	 * @return array
	 */
	static public function force_node_wrappers( $data ) {
		$force = apply_filters( 'fl_builder_force_module_wrappers', false || isset( $_GET['safemode'] ) );

		if ( $force ) {
			foreach ( $data as $node_id => $node ) {
				if ( 'module' !== $node->type ) {
					continue;
				}

				$deprecations = self::get_deprecations( $node->settings->type );

				if ( 0 === count( $deprecations ) ) {
					continue;
				}

				foreach ( $deprecations as $version => $deprecation ) {
					if ( isset( $deprecation['config'] ) && isset( $deprecation['config']['include_wrapper'] ) ) {
						if ( $deprecation['config']['include_wrapper'] ) {
							$data[ $node_id ]->version = str_replace( 'v', '', $version );
						}
					}
				}
			}
		}

		return $data;
	}

	/**
	 * Return the version for a node.
	 *
	 * @since 2.9
	 * @param object|string $node
	 * @return int
	 */
	static public function get_node_version( $node ) {
		$node    = is_object( $node ) ? $node : FLBuilderModel::get_node( $node );
		$version = 1;

		if ( $node && property_exists( $node, 'version' ) ) {
			if ( null === $node->version ) {
				/**
				 * If the version is set and is null, this is a default module
				 * instance that should be on the latest version.
				 */
				$version = self::get_module_version( $node->slug );
			} else {
				$version = $node->version;
			}
		}

		return (int) $version;
	}

	/**
	 * Return the version for a module type.
	 *
	 * @since 2.9
	 * @param string $slug
	 * @return int
	 */
	static public function get_module_version( $slug ) {
		$deprecations = self::get_deprecations( $slug );
		$version      = count( $deprecations ) + 1;

		return $version;
	}

	/**
	 * Returns the path for a module file taking
	 * deprecations into account.
	 *
	 * @since 2.9
	 * @param string $base
	 * @return string
	 */
	static public function get_module_path( $module, $base ) {
		$deprecations = self::get_deprecations( $module->slug );
		$version      = 'v' . self::get_node_version( $module );
		$path         = $module->dir;

		if ( empty( $deprecations ) || ! isset( $deprecations[ $version ] ) ) {
			$path .= $base;
		} else {
			$deprecation = $deprecations[ $version ];

			if ( isset( $deprecation['files'] ) && in_array( $base, $deprecation['files'] ) ) {
				$path .= "deprecated/{$version}/{$base}";
			} else {
				$path .= $base;
			}
		}

		return $path;
	}

	/**
	 * Returns a single config value for a module taking
	 * deprecations into account.
	 *
	 * @since 2.9
	 * @param string $key
	 * @return mixed
	 */
	static public function get_module_config( $module, $key ) {
		$deprecations = self::get_deprecations( $module->slug );
		$version      = 'v' . self::get_node_version( $module );
		$value        = null;
		$whitelist    = [
			'include_wrapper',
		];

		if ( ! in_array( $key, $whitelist ) ) {
			$value = $module->$key;
		} elseif ( empty( $deprecations ) || ! isset( $deprecations[ $version ] ) ) {
			$value = $module->$key;
		} else {
			$deprecation = $deprecations[ $version ];

			if ( isset( $deprecation['config'] ) && in_array( $key, $deprecation['config'] ) ) {
				$value = $deprecation['config'][ $key ];
			} else {
				$value = $module->$key;
			}
		}

		return $value;
	}

	/**
	 * Filter callback that returns module defaults taking
	 * deprecations into account.
	 *
	 * @since 2.9
	 * @param object $defaults
	 * @param object $node
	 * @return object
	 */
	static public function get_updated_module_defaults( $defaults, $node = null ) {
		if ( ! $node ) {
			return $defaults; // We're only getting defaults for a type definition.
		}

		$deprecations = self::get_deprecations( $node->settings->type );
		$version      = 'v' . self::get_node_version( $node );

		if ( isset( $deprecations[ $version ] ) && isset( $deprecations[ $version ]['defaults'] ) ) {
			$deprecation = $deprecations[ $version ]['defaults'];
			$defaults    = clone $defaults;
			$form        = FLBuilderModel::$modules[ $node->settings->type ]->form;
			$fields      = FLBuilderModel::get_settings_form_fields( $form, 'module' );

			foreach ( $deprecation as $key => $value ) {
				if ( isset( $fields[ $key ] ) && isset( $fields[ $key ]['form'] ) ) {
					if ( ! is_array( $value ) ) {
						continue;
					} elseif ( isset( $fields[ $key ]['multiple'] ) ) {
						$defaults->$key[0] = (object) array_merge( (array) $defaults->$key[0], $value );
					} else {
						$defaults->$key = (object) array_merge( (array) $defaults->$key, $value );
					}
				} elseif ( isset( $defaults->$key ) ) {
					$defaults->$key = $value;
				}
			}
		}

		return $defaults;
	}
}

FLBuilderModuleDeprecations::init();
