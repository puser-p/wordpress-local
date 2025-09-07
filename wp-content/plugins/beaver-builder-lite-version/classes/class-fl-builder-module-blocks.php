<?php

class FLBuilderModuleBlocks {

	/**
	 * REST namespace for module block requests.
	 *
	 * @var string
	 */
	static private $rest_namespace = 'fl-builder-module-blocks/v1';

	/**
	 * Registry for all registered module blocks.
	 *
	 * @var array
	 */
	static private $blocks = [];

	/**
	 * Queue for blocks that need their instance assets
	 * enqueued on the enqueue_block_assets action.
	 *
	 * @var array
	 */
	static private $block_assets_queue = [];

	/**
	 * Setup hooks and init module blocks.
	 *
	 * @return void
	 */
	static public function init() {
		if ( ! self::should_load() ) {
			return;
		}

		// Classes
		require_once FL_BUILDER_DIR . 'classes/class-fl-block.php';

		// Actions
		add_action( 'rest_api_init', __CLASS__ . '::register_routes' );
		add_action( 'parse_request', __CLASS__ . '::setup_settings_config_query' );
		add_action( 'init', __CLASS__ . '::load_blocks' );
		add_action( 'init', __CLASS__ . '::register_block_types' );
		add_action( 'block_categories_all', __CLASS__ . '::register_category', 10, 2 );
		add_action( 'wp', __CLASS__ . '::pre_render_blocks' );
		add_action( 'enqueue_block_editor_assets', __CLASS__ . '::enqueue_block_editor_assets' );
		add_action( 'enqueue_block_assets', __CLASS__ . '::enqueue_block_assets' );
		add_action( 'wp_print_styles', __CLASS__ . '::render_global_css' );
		add_action( 'wp_print_footer_scripts', __CLASS__ . '::render_global_js' );
		add_action( 'admin_footer', __CLASS__ . '::render_builder_config' );

		// Site Editor Actions
		add_action( 'init', __CLASS__ . '::setup_site_editor_post' );

		// Filters
		add_filter( 'render_block_data', __CLASS__ . '::populate_block_assets_queue' );
		add_filter( 'body_class', __CLASS__ . '::add_builder_content_class' );
		add_filter( 'wp_default_editor', __CLASS__ . '::set_default_text_editor' );
		add_filter( 'fl_builder_register_settings_form', __CLASS__ . '::filter_settings_fields', PHP_INT_MAX, 2 );
		add_filter( 'fl_builder_get_global_settings', __CLASS__ . '::filter_global_settings', 11, 1 );
		add_filter( 'fl_builder_module_attributes', __CLASS__ . '::filter_module_attributes', 11, 2 );
	}

	/**
	 * Checks if module blocks should load.
	 *
	 * @return bool
	 */
	static public function should_load() {
		global $wp_version;

		$enabled = self::get_enabled_block_editor_modules();

		if ( empty( $enabled ) ) {
			return false;
		} elseif ( version_compare( $wp_version, '6.4', '<' ) ) {
			return false;
		}

		return true;
	}

	/**
	 * REST routes for module blocks.
	 *
	 * @return void
	 */
	static public function register_routes() {
		register_rest_route( self::$rest_namespace, '/render-preview',
			[
				'methods'             => WP_REST_Server::CREATABLE,
				'callback'            => __CLASS__ . '::render_preview_request',
				'permission_callback' => function ( $request ) {
					$post_id = $request->get_param( 'post_id' );
					if ( $post_id && is_numeric( $post_id ) ) {
						return current_user_can( 'edit_post', $post_id ); // Post editor
					}
					return current_user_can( 'edit_theme_options' ); // Site editor
				},
			]
		);
	}

	/**
	 * Loads the core builder blocks from the blocks directory.
	 *
	 * @return void
	 */
	static public function load_blocks() {
		return; // Disabled for demo build.

		$paths = glob( FL_BUILDER_DIR . 'blocks/*' );

		foreach ( $paths as $path ) {
			if ( ! is_dir( $path ) ) {
				continue;
			}

			$basename   = basename( $path );
			$block_path = FL_BUILDER_DIR . 'blocks/' . $basename . '/' . $basename . '.php';

			if ( file_exists( $block_path ) ) {
				require_once $block_path;
			}
		}
	}

	/**
	 * Return an array of modules that can be used in the block editor.
	 *
	 * @return array
	 */
	static public function get_block_editor_modules() {
		$modules = [];

		foreach ( FLBuilderModel::$modules as $slug => $module ) {
			if ( $module->block_editor ) {
				$modules[ $slug ] = $module;
			}
		}

		return $modules;
	}

	/**
	 * Return an array of modules that can be used in the block editor,
	 * keyed by category.
	 *
	 * @return array
	 */
	static public function get_categorized_block_editor_modules() {
		$modules     = self::get_block_editor_modules();
		$categorized = [];

		foreach ( $modules as $slug => $module ) {
			if ( ! isset( $categorized[ $module->category ] ) ) {
				$categorized[ $module->category ] = [];
			}

			$categorized[ $module->category ][ $slug ] = $module;
		}

		return $categorized;
	}

	/**
	 * Returns an array of keys for enabled block editor modules.
	 *
	 * @return array
	 */
	static public function get_enabled_block_editor_modules() {
		$setting = FLBuilderModel::get_admin_settings_option( '_fl_builder_enabled_blocks', true );
		$all     = self::get_block_editor_modules();

		if ( ! $setting ) {
			return [];
		} elseif ( in_array( 'all', $setting ) ) {
			return array_merge( array_keys( $all ), $setting );
		}

		return $setting;
	}

	/**
	 * Register modules as block types.
	 *
	 * @return void
	 */
	static public function register_block_types() {
		$modules = self::get_block_editor_modules();

		foreach ( $modules as $slug => $module ) {
			$name    = "fl-builder/$slug";
			$handles = self::register_block_type_assets( $module );

			self::$blocks[ $name ] = [
				'api_version'     => 3,
				'name'            => $name,
				'title'           => $module->name,
				'description'     => $module->description,
				'icon'            => $module->icon,
				'category'        => self::get_category()['slug'],
				'render_callback' => __CLASS__ . '::render_callback',
				'style_handles'   => $handles['styles'],
				'script_handles'  => $handles['scripts'],
				'attributes'      => [
					'settings' => [
						'type' => 'object',
					],
					'version'  => [
						'type' => 'integer',
					],
				],
				'supports'        => [
					'anchor'          => false,
					'customClassName' => false,
					'html'            => false,
				],
			];

			register_block_type( $name, self::$blocks[ $name ] );
		}
	}

	/**
	 * Register styles and scripts for a module block type.
	 *
	 * @param object $module
	 * @return array
	 */
	static public function register_block_type_assets( $module ) {
		$global_settings = FLBuilderModel::get_global_settings();
		$handles         = [
			'styles'  => [],
			'scripts' => [],
		];

		// Module frontend CSS
		if ( fl_builder_filesystem()->file_exists( $module->path( 'css/frontend.css' ) ) ) {
			$handle              = "fl-{$module->slug}-module";
			$handles['styles'][] = $handle;
			wp_register_style( $handle, $module->url( 'css/frontend.css' ), [], FL_BUILDER_VERSION );
		}

		// Module frontend responsive CSS
		if ( fl_builder_filesystem()->file_exists( $module->path( 'css/frontend.responsive.css' ) ) ) {
			$handle              = "fl-{$module->slug}-module-responsive";
			$handles['styles'][] = $handle;
			$media               = "max-width:{$global_settings->responsive_breakpoint}px";
			wp_register_style( $handle, $module->url( 'css/frontend.responsive.css' ), [], FL_BUILDER_VERSION, $media );
		}

		// Module frontend JS
		if ( fl_builder_filesystem()->file_exists( $module->path( 'js/frontend.js' ) ) ) {
			$handle               = "fl-{$module->slug}-module";
			$handles['scripts'][] = $handle;
			wp_register_script( $handle, $module->url( 'js/frontend.js' ), [ 'jquery' ], FL_BUILDER_VERSION );
		}

		// Module CSS dependencies
		foreach ( $module->css as $handle => $args ) {
			$handles['styles'][] = $handle;
			if ( $args[0] ) {
				wp_register_style( $handle, $args[0], $args[1], $args[2], $args[3] );
			}
		}

		// Module JS dependencies
		foreach ( $module->js as $handle => $args ) {
			$handles['scripts'][] = $handle;
			if ( $args[0] ) {
				wp_register_script( $handle, $args[0], $args[1], $args[2], $args[3] );
			}
		}

		return $handles;
	}

	/**
	 * Pre-render blocks on the wp action to capture scripts and styles
	 * before wp_head is fired. This only needs to be done for classic
	 * themes as blocks are rendered before the head in FSE.
	 *
	 * @return void
	 */
	static public function pre_render_blocks() {
		global $post;

		if ( current_theme_supports( 'block-templates' ) ) {
			return;
		} elseif ( ! is_singular() || ! is_object( $post ) ) {
			return;
		}

		do_blocks( $post->post_content );

		FLBuilder::clear_enqueued_global_assets();
	}

	/**
	 * Store single module block instances to enqueue assets on the
	 * enqueue_block_assets action so they render in the block editor
	 * and frontend. This must be done because modules can register
	 * different scripts based on their settings. This is done
	 * on the render_block_data filter to capture blocks when they are
	 * processed while the head renders.
	 *
	 * @param array $block
	 * @return array
	 */
	static public function populate_block_assets_queue( $block ) {
		$name   = $block['blockName'];
		$prefix = 'fl-builder/';

		if ( $name && substr( $name, 0, 11 ) === $prefix && $prefix . 'layout' !== $name ) {
			self::$block_assets_queue[] = $block;
		}

		return $block;
	}

	/**
	 * Enqueue block assets in the frontend AND block editor iframe.
	 *
	 * @return void
	 */
	static public function enqueue_block_assets() {
		$ver     = FL_BUILDER_VERSION;
		$css_url = FLBuilder::plugin_url() . 'css/';
		$js_url  = FLBuilder::plugin_url() . 'js/';

		// Register core layout assets.
		FLBuilder::register_layout_styles_scripts();

		// Enqueue builder UI assets in the block editor iframe only.
		if ( self::is_block_editor() ) {
			wp_enqueue_style( 'dashicons' );
			wp_enqueue_style( 'fl-builder-min', $css_url . 'fl-builder.min.css', [], $ver );
			wp_enqueue_style( 'fl-builder-module-blocks', $css_url . 'build/module-blocks.bundle.css', [], $ver );
			wp_add_inline_style( 'fl-builder-module-blocks', self::render_global_css( true ) );
		}

		// Enqueue instance assets for all modules on the page.
		foreach ( self::$block_assets_queue as $block ) {
			$module = self::get_module_instance( $block['blockName'], null, $block['attrs'] );
			FLBuilder::enqueue_module_layout_styles_scripts( $module );
		}

		// Enqueue instance assets for all modules. We force the builder to be "active"
		// in the block editor so we can enqueue assets for every module, regardless
		// of settings. On the frontend, we only enqueue modules in the layout.
		if ( self::is_block_editor() ) {
			add_filter( 'fl_builder_model_is_builder_active', '__return_true' );

			foreach ( self::$blocks as $type ) {
				$module = self::get_module_instance( $type['name'] );
				FLBuilder::enqueue_module_layout_styles_scripts( $module );
			}

			remove_filter( 'fl_builder_model_is_builder_active', '__return_true' );
		}

		// Enqueue registered fonts.
		FLBuilderFonts::enqueue_google_fonts();
	}

	/**
	 * Enqueue builder scripts in the block editor.
	 *
	 * @return void
	 */
	static public function enqueue_block_editor_assets() {

		if ( ! self::is_block_editor() ) {
			return;
		}

		$ver     = FL_BUILDER_VERSION;
		$css_url = FLBuilder::plugin_url() . 'css/';
		$js_url  = FLBuilder::plugin_url() . 'js/';
		$ext     = FLBuilder::is_debug() ? '.bundle.js' : '.bundle.min.js';

		// Dependency Styles
		wp_enqueue_style( 'foundation-icons' );
		wp_enqueue_style( 'font-awesome-5' );
		wp_enqueue_style( 'dashicons' );
		wp_enqueue_style( 'jquery-autosuggest', $css_url . 'jquery.autoSuggest.min.css', [], $ver );
		wp_enqueue_style( 'fl-jquery-tiptip', $css_url . 'jquery.tiptip.css', [], $ver );
		wp_enqueue_style( 'select2', $css_url . 'select2.min.css', [], $ver );
		FLBuilderIcons::enqueue_all_custom_icons_styles();

		// Dependency Scripts
		wp_enqueue_script( 'jquery-ui-draggable' );
		wp_enqueue_script( 'jquery-ui-resizable' );
		wp_enqueue_script( 'jquery-ui-slider' );
		wp_enqueue_script( 'jquery-throttle' );
		wp_enqueue_script( 'jquery-autosuggest', $js_url . 'jquery.autoSuggest.min.js', [], $ver );
		wp_enqueue_script( 'jquery-validate', $js_url . 'jquery.validate.min.js', [], $ver );
		wp_enqueue_script( 'fl-jquery-tiptip', $js_url . 'jquery.tiptip.min.js', [], $ver );
		wp_enqueue_script( 'select2', $js_url . 'select2.min.js', [], $ver );

		// Builder Styles
		wp_enqueue_style( 'fl-builder-min', $css_url . 'fl-builder.min.css', [], $ver );
		wp_enqueue_style( 'fl-builder-forms', $css_url . 'build/builder-forms.bundle.css', [ 'fl-builder-min', 'fl-controls' ], $ver );

		// Builder Scripts

		// Shared Utils
		wp_enqueue_script( 'fl-builder-utils', $js_url . 'build/builder-utils' . $ext, [ 'jquery' ], $ver );

		// Settings Forms
		$form_deps = [
			'jquery',
			'fl-builder-utils',
			'fl-controls',
			'wp-components',
			'wp-i18n',
			'wp-hooks',
		];
		wp_enqueue_script( 'fl-builder-forms', $js_url . 'build/builder-forms' . $ext, $form_deps, $ver );

		wp_enqueue_script( 'fl-color-picker', $js_url . 'fl-color-picker.js', [], $ver );
		wp_enqueue_script( 'fl-lightbox', $js_url . 'fl-lightbox.js', [], $ver );
		wp_enqueue_script( 'fl-icon-selector', $js_url . 'fl-icon-selector.js', [], $ver );
		wp_enqueue_script( 'fl-stylesheet', $js_url . 'fl-stylesheet.js', [], $ver );
		wp_enqueue_script( 'fl-builder', $js_url . 'fl-builder.js', [ 'jquery', 'fl-builder-utils' ], $ver );
		wp_enqueue_script( 'fl-builder-libs', $js_url . 'fl-builder-libs.js', [ 'fl-builder' ], $ver );
		wp_enqueue_script( 'fl-builder-preview', $js_url . 'fl-builder-preview.js', [], $ver );
		wp_enqueue_script( 'fl-builder-responsive-editing', $js_url . 'fl-builder-responsive-editing.js', [], $ver );
		wp_enqueue_script( 'fl-builder-ui-settings-forms', $js_url . 'fl-builder-ui-settings-forms.js', [], $ver );

		// Themer Styles
		if ( defined( 'FL_THEME_BUILDER_CORE_URL' ) ) {
			$slug = 'fl-theme-builder-field-connections';
			wp_enqueue_style( $slug, FL_THEME_BUILDER_CORE_URL . 'css/' . $slug . '.css', [], $ver );
			wp_enqueue_style( 'tether', FL_THEME_BUILDER_CORE_URL . 'css/tether.min.css', [], $ver );

			// Themer Scripts
			wp_enqueue_script( $slug, FL_THEME_BUILDER_CORE_URL . 'js/' . $slug . '.js', [ 'jquery' ], $ver );
			wp_enqueue_script( 'tether', FL_THEME_BUILDER_CORE_URL . 'js/tether.min.js', [ 'jquery' ], $ver );
		}

		// Module Block Styles
		wp_enqueue_style( 'fl-builder-module-blocks', $css_url . 'build/module-blocks.bundle.css', [], $ver );

		// Module Block Scripts
		wp_enqueue_script( 'fl-builder-module-blocks', $js_url . 'build/module-blocks.bundle.js', [ 'wp-blocks' ], $ver, true );

		// Module Block Config
		$config = [
			'blocks'  => self::$blocks,
			'enabled' => self::get_enabled_block_editor_modules(),
			'rest'    => [
				'url'   => rest_url( self::$rest_namespace ),
				'nonce' => wp_create_nonce( 'wp_rest' ),
			],
		];

		wp_localize_script( 'fl-builder-module-blocks', 'FLBuilderModuleBlocksConfig', $config );

		// Module block.js
		foreach ( FLBuilderModel::$modules as $slug => $module ) {
			if ( $module->block_editor ) {
				if ( $module->is_js_block() ) {
					wp_enqueue_script( "fl-{$module->slug}-block", $module->url( 'js/block.js' ), [], $ver, true );
				}
			}
		}

		// Builder parent frame scripts.
		FLBuilder::enqueue_ui_styles_scripts();

		// Settings Form Config
		FLBuilderUISettingsForms::enqueue_settings_config();

		if ( class_exists( ' FLThemeBuilderFieldConnections' ) ) {
			// Field Connection Scripts
			FLThemeBuilderFieldConnections::enqueue_scripts();
		}
	}

	/**
	 * Render the builder's JS config in the block editor.
	 *
	 * @return void
	 */
	static public function render_builder_config() {
		global $post;

		if ( ! self::is_block_editor() ) {
			return;
		}

		$post_id         = is_object( $post ) ? $post->ID : null;
		$unrestricted    = FLBuilderUserAccess::current_user_can( 'unrestricted_editing' );
		$simple_ui       = ! $unrestricted;
		$global_settings = FLBuilderModel::get_global_settings();

		include FL_BUILDER_DIR . 'includes/ui-extras-editor.php';
		include FL_BUILDER_DIR . 'includes/ui-js-config.php';
		include FL_BUILDER_DIR . 'includes/ui-js-alert-templates.php';

		FLBuilderUISettingsForms::init_js_config();
		FLBuilderUISettingsForms::render_js_templates();
		if ( class_exists( ' FLThemeBuilderFieldConnections' ) ) {
			FLThemeBuilderFieldConnections::js_templates();
		}

		self::render_global_js();
	}

	/**
	 * Renders the global CSS used by all builder blocks.
	 *
	 * @param bool $return
	 * @return void
	 */
	static public function render_global_css( $return_css = false ) {
		if ( ! self::is_block_editor() && empty( self::$block_assets_queue ) ) {
			return;
		}

		$global_settings = FLBuilderModel::get_global_settings( false );
		$css             = '';

		// Base CSS for block editor layouts.
		$css .= fl_builder_filesystem()->file_get_contents( FL_BUILDER_DIR . 'css/fl-builder-layout-block-editor.css' );

		// Base CSS used by all modules.
		$css .= fl_builder_filesystem()->file_get_contents( FL_BUILDER_DIR . 'css/fl-builder-layout-modules.css' );

		// Breakpoint visibility CSS.
		ob_start();
		include FL_BUILDER_DIR . 'includes/breakpoint-visibility-css.php';
		$css .= ob_get_clean();

		// Render all animation CSS for live preview.
		if ( self::is_block_editor() ) {
			$css .= FLBuilder::render_all_animation_css();
		}

		// Global colors.
		$css .= FLBuilderGlobalStyles::generate_global_colors_css();

		// Minify the css.
		$css = FLBuilder::minify_css( $css );

		if ( $return_css ) {
			return $css;
		} else {
			echo "<style id='fl-builder-global-css'>$css</style>";
		}
	}

	/**
	 * Renders the global JS used by all builder blocks.
	 *
	 * @return void
	 */
	static public function render_global_js() {
		if ( ! self::is_block_editor() && empty( self::$block_assets_queue ) ) {
			return;
		}

		$global_settings = FLBuilderModel::get_global_settings();
		$js              = '';

		// Layout config JS.
		ob_start();
		include FL_BUILDER_DIR . 'includes/layout-js-config.php';
		$js .= ob_get_clean();

		// Include layout JS only in the block editor to support builder functions.
		if ( self::is_block_editor() ) {
			$js .= fl_builder_filesystem()->file_get_contents( FL_BUILDER_DIR . 'js/fl-builder-layout.js' );
		}

		// Base JS used by all modules.
		$js .= fl_builder_filesystem()->file_get_contents( FL_BUILDER_DIR . 'js/fl-builder-layout-modules.js' );

		$js = FLBuilder::minify_js( $js );

		echo "<script id='fl-builder-global-js'>$js</script>";
	}

	/**
	 * Filter callback for adding the builder's content class to the body
	 * since module blocks don't get a content wrapper but may use that
	 * class for styling.
	 *
	 * @param array $classes
	 * @return array
	 */
	static public function add_builder_content_class( $classes ) {
		global $post;

		if ( ! empty( self::$block_assets_queue ) ) {
			$classes[] = 'fl-builder-content';
			$classes[] = 'fl-builder-content-primary';
			$classes[] = 'fl-builder-content-' . $post->ID;
		}

		return $classes;
	}

	/**
	 * Filter callback for setting the default text editor to
	 * visual mode so tinymce loads properly.
	 *
	 * @param string $editor
	 * @return string
	 */
	static public function set_default_text_editor( $editor ) {
		return self::is_block_editor() ? 'tinymce' : $editor;
	}

	/**
	 * Filter module form settings to remove anything we don't need.
	 *
	 * @param array $form
	 * @param string $slug
	 * @return array
	 */
	static public function filter_settings_fields( $form, $slug ) {
		$is_block_editor = self::is_block_editor();
		$is_config       = self::is_block_editor_loading_config();

		if ( ! $is_block_editor && ! $is_config ) {
			return $form;
		}

		if ( 'module_advanced' === $slug ) {
			unset( $form['sections']['export_import'] );

			// TODO: Remove code settings for now but get working in the future.
			unset( $form['sections']['bb_css_code'] );
			unset( $form['sections']['bb_js_code'] );

			// TODO: Remove node label for now. Get working with core's block name in the future.
			unset( $form['sections']['css_selectors']['fields']['node_label'] );

			// TODO: Disable conditional logic until we get it working.
			unset( $form['sections']['visibility']['fields']['visibility_display']['options']['logic'] );
			unset( $form['sections']['visibility']['fields']['visibility_display']['toggle']['logic'] );
			unset( $form['sections']['visibility']['fields']['visibility_logic'] );
		}

		return $form;
	}

	/**
	 * Filter the global settings for the block editor.
	 *
	 * @param object $settings
	 * @return object
	 */
	static public function filter_global_settings( $settings ) {
		$is_block_editor = self::is_block_editor();
		$is_config       = self::is_block_editor_loading_config();

		if ( ! $is_block_editor && ! $is_config && empty( self::$block_assets_queue ) ) {
			return $settings;
		}

		$settings->module_margins_top    = 0;
		$settings->module_margins_bottom = 0;
		$settings->module_margins_left   = 0;
		$settings->module_margins_right  = 0;

		return $settings;
	}

	/**
	 * Render a module block on the frontend.
	 *
	 * @param array $attributes
	 * @param string $content
	 * @param object $block
	 * @return string
	 */
	static public function render_callback( $attributes, $content, $block ) {
		$module  = self::get_module_instance( $block->name, null, $attributes, $content );
		$visible = FLBuilderModel::is_node_visible( $module );

		if ( ! $visible ) {
			return '';
		}

		$html = self::render_module( $module, $content );
		$css  = self::render_module_css( $module );
		$js   = self::render_module_js( $module );

		if ( ! empty( $css ) ) {
			$html = "<style id='fl-builder-block-{$module->node}-css'>$css</style>\n$html";
		}
		if ( ! empty( $js ) ) {
			$html = "$html\n<script id='fl-builder-block-{$module->node}-js'>$js</script>";
		}

		return $html;
	}

	/**
	 * Render a module block for the block editor.
	 *
	 * @param object $request
	 * @return array
	 */
	static public function render_preview_request( $request ) {
		global $post;

		$params     = $request->get_params();
		$attributes = isset( $params['attributes'] ) ? $params['attributes'] : [];
		$post       = get_post( $params['post_id'] );

		setup_postdata( $post );

		$module = self::get_module_instance( $params['name'], $params['client_id'], $attributes, '<InnerBlocks />' );

		return [
			'key'  => uniqid(), // Render a fresh key to ensure full React re-renders.
			'html' => self::render_module( $module, '<InnerBlocks />' ),
			'css'  => self::render_module_css( $module ),
			'js'   => self::render_module_js( $module ),
		];
	}

	/**
	 * Render a module block's HTML.
	 *
	 * @param object $module
	 * @param string $content
	 * @return string
	 */
	static public function render_module( $module, $content ) {
		if ( $module->is_js_block() ) {
			return str_replace( '[NODE_ID]', $module->node, $content );
		}

		ob_start();
		FLBuilder::render_module_content( $module );
		return ob_get_clean();
	}

	/**
	 * Render a module block's CSS.
	 *
	 * @param object $module
	 * @return string
	 */
	static public function render_module_css( $module ) {
		$css = FLBuilder::render_module_instance_css( $module );

		return FLBuilder::minify_css( $css );
	}

	/**
	 * Render a module block's JS.
	 *
	 * @param object $module
	 * @return string
	 */
	static public function render_module_js( $module ) {
		$js = FLBuilder::render_module_instance_js( $module );

		return FLBuilder::minify_js( $js );
	}

	/**
	 * Get an instance of a module class.
	 *
	 * @param string $block_name
	 * @param string $client_id
	 * @param array $attributes
	 * @param string $content
	 * @return object
	 */
	static public function get_module_instance( $block_name, $client_id = null, $attributes = [], $content = '' ) {
		$type             = str_replace( 'fl-builder/', '', $block_name );
		$class            = get_class( FLBuilderModel::$modules[ $type ] );
		$module           = new $class();
		$module->type     = 'module';
		$module->node     = $client_id ? $client_id : FLBuilderModel::generate_node_id();
		$module->form     = FLBuilderModel::$modules[ $type ]->form;
		$module->version  = isset( $attributes['version'] ) ? (int) $attributes['version'] : 1;
		$module->is_block = true;

		if ( isset( $attributes['settings'] ) && ! empty( $attributes['settings'] ) ) {
			$settings         = $attributes['settings'];
			$settings         = 'string' === gettype( $settings ) ? json_decode( $settings ) : (object) $settings;
			$settings->type   = $type;
			$module->settings = $settings;
			$module->settings = FLBuilderModel::get_node_settings_with_defaults_merged( $module );
			$module->settings = self::get_filtered_module_settings( $module->settings );
			$module->settings = self::get_connected_module_settings( $module );
		} else {
			$module->settings       = new StdClass();
			$module->settings->type = $type;
			$module->settings       = FLBuilderModel::get_module_defaults( $module );
		}

		if ( $module->accepts_children() ) {
			$module->block_editor_children = $content;
		}

		return $module;
	}

	/**
	 * Filter module settings for logic specific to the block editor.
	 *
	 * @param object $settings
	 * @return object
	 */
	static public function get_filtered_module_settings( $settings ) {

		// The large breakpoint doesn't exist in the block editor. Add it here if desktop is set.
		$settings->responsive_display = str_replace( 'desktop', 'desktop,large', $settings->responsive_display );

		return $settings;
	}

	/**
	 * Filter module attributes for the block editor.
	 *
	 * @param array $attrs
	 * @param object $module
	 * @return array
	 */
	static public function filter_module_attributes( $attrs, $module ) {
		if ( ! $module->is_block ) {
			return $attrs;
		}

		// Add the fl-block class so we can target this module as a
		// block on the frontend if needed.
		array_unshift( $attrs['class'], 'fl-block' );

		return $attrs;
	}

	/**
	 * Connect module settings to field connections.
	 *
	 * @param object $module
	 * @return object
	 */
	static public function get_connected_module_settings( $module ) {

		if ( ! class_exists( ' FLThemeBuilderFieldConnections' ) ) {
			return $module->settings;
		}

		if ( ! did_action( 'fl_page_data_add_properties' ) ) {
			FLPageData::init_properties();
		}

		return FLThemeBuilderFieldConnections::connect_node_settings( $module->settings, $module );
	}

	/**
	 * Register the builder's category for module blocks.
	 *
	 * @param array $categories
	 * @return array
	 */
	static public function register_category( $categories ) {
		$title = FLBuilderModel::get_branding();
		return array_merge( $categories, [ self::get_category() ] );
	}

	/**
	 * Get the builder's category for module blocks.
	 *
	 * @return array
	 */
	static public function get_category() {
		$title = FLBuilderModel::get_branding();
		return [
			'slug'  => sanitize_key( $title ),
			'title' => $title,
		];
	}

	/**
	 * Check if we're in the block editor.
	 *
	 * @return bool
	 */
	static public function is_block_editor() {
		if ( function_exists( 'get_current_screen' ) ) {
			$screen = get_current_screen();
			return $screen instanceof WP_Screen ? $screen->is_block_editor() : false;
		} elseif ( is_admin() && isset( $_GET['post'] ) ) {
			$post_id = absint( $_GET['post'] );
			return use_block_editor_for_post( $post_id );
		}

		return false;
	}

	/**
	 * Check if we're loading builder config for the block editor.
	 * This is necessary because BB loads it's config on the frontend
	 * and makes use of the $post global.
	 *
	 * @return bool
	 */
	static public function is_block_editor_loading_config() {
		if ( isset( $_GET['fl_builder_load_settings_editor_type'] ) ) {
			return 'block' === $_GET['fl_builder_load_settings_editor_type'];
		}

		return false;
	}

	/**
	 * Set the main query post type when loading builder config to handle
	 * auto-draft posts. The builder requires a post to work with, so
	 * we need to be able to query auto-draft posts when loading the config.
	 *
	 * @param object $query
	 * @return void
	 */
	static public function setup_settings_config_query( $query ) {
		if ( isset( $query->query_vars['p'] ) ) {
			$post_id = $query->query_vars['p'];
		} elseif ( isset( $query->query_vars['page_id'] ) ) {
			$post_id = $query->query_vars['page_id'];
		} else {
			return;
		}

		if ( self::is_block_editor_loading_config() ) {
			$meta = get_post_meta( $post_id, '_fl_builder_site_editor_temp', true );
			if ( $meta ) {
				$query->query_vars['post_status'] = 'auto-draft';
			} else {
				$post = get_post( $post_id );
				if ( $post ) {
					$query->query_vars['post_status'] = $post->post_status;
				}
			}
		} elseif ( isset( $_GET['fl_builder'] ) ) {
			$post = get_post( $post_id );
			if ( $post && 'auto-draft' === $post->post_status ) {
				$query->query_vars['post_status'] = 'auto-draft';
			}
		}
	}

	/**
	 * Check if we're in the site editor.
	 *
	 * @return bool
	 */
	static public function is_site_editor() {
		global $pagenow;

		return 'site-editor.php' === $pagenow || 'widgets.php' === $pagenow;
	}

	/**
	 * Create a dummy auto-draft post for the builder to work with when
	 * editing in the site editor.
	 *
	 * @return void
	 */
	static public function setup_site_editor_post() {
		global $wpdb, $post;

		if ( ! self::is_site_editor() ) {
			return;
		}

		$meta_key = '_fl_builder_site_editor_temp';
		$meta     = $wpdb->get_row( $wpdb->prepare( "SELECT * FROM $wpdb->postmeta WHERE meta_key = %s", $meta_key ) );

		if ( $meta ) {
			$post_id = $meta->post_id;
		} else {
			$post_id = wp_insert_post( [
				'post_title'  => $meta_key,
				'post_type'   => 'post',
				'post_status' => 'auto-draft',
			] );
		}

		$post = get_post( $post_id );
		setup_postdata( $post );
		update_post_meta( $post_id, $meta_key, 1 );
	}
}

FLBuilderModuleBlocks::init();
