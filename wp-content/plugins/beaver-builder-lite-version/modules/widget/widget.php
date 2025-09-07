<?php

/**
 * @class FLWidgetModule
 */
class FLWidgetModule extends FLBuilderModule {

	/**
	 * @return void
	 */
	public function __construct() {
		parent::__construct(array(
			'name'            => __( 'Widget', 'fl-builder' ),
			'description'     => __( 'Display a WordPress widget.', 'fl-builder' ),
			'group'           => __( 'WordPress Widgets', 'fl-builder' ),
			'category'        => __( 'WordPress Widgets', 'fl-builder' ),
			'editor_export'   => false,
			'partial_refresh' => true,
		));
	}

	/**
	 * @method extract_class to get the widget class with backward compatibility
	 */
	public static function extract_class( $settings ) {
		// Get builder post data.
		$post_data = FLBuilderModel::get_post_data();
		// Widget slug
		$widget_class = null;
		if ( isset( $settings->widget ) ) {
			$widget_class = $settings->widget;
		} elseif ( isset( $settings->widget_class ) ) {
			$widget_class = $settings->widget_class;
		} elseif ( isset( $post_data['widget'] ) ) {
			$widget_class = $post_data['widget'];
		} elseif ( isset( $post_data['widget_class'] ) ) {
			$widget_class = $post_data['widget_class'];
		}
		return esc_attr( urldecode( $widget_class ) );
	}

	/**
	 * @method check_class validate class variable for backward compatibility
	 */
	public static function check_class( $settings ) {
		if ( isset( $settings->widget ) && class_exists( urldecode( $settings->widget ) ) ) {
			return 'widget';
		} elseif ( isset( $settings->widget_class ) && class_exists( urldecode( $settings->widget_class ) ) ) {
			return 'widget_class';
		} else {
			return false;
		}
	}

	/**
	 * @method filter_raw_settings for checking widget settings compatibility for old pages
	 */
	public function filter_raw_settings( $settings, $defaults ) {
		if ( FLWidgetModule::check_class( $settings ) === 'widget' ) {
			$widget_class           = FLWidgetModule::extract_class( $settings );
			$instance               = new $widget_class();
			$settings->widget_class = $widget_class;
			$settings->widget_title = $instance->name;
			$settings->widget_key   = 'widget-' . $instance->id_base;
		}
		return $settings;
	}

	/**
	 * @method update for accessing widget settings through its related plugin
	 */
	public function update( $settings ) {
		// Make sure we have a widget.
		$class_name = FLWidgetModule::check_class( $settings );
		if ( false === $class_name ) {
			return $settings;
		}
		$widget_class = urldecode( $settings->$class_name );

		// Get the widget instance.
		$instance = new $widget_class();

		// Populate widget information.
		$settings->widget_class = $widget_class;
		$settings->widget_title = $instance->name;
		$settings->widget_key   = 'widget-' . $instance->id_base;

		// Get the widget settings.
		$settings_key    = 'widget-' . $instance->id_base;
		$widget_settings = isset( $settings->$settings_key ) ? (array) $settings->$settings_key : array();

		// Run the widget update method.
		$widget_settings = $instance->update( $widget_settings, array() );

		// Save the widget settings as an object.
		if ( is_array( $widget_settings ) ) {
			$settings->$settings_key = (object) $widget_settings;
		}

		// Delete the WordPress cache for this widget.
		wp_cache_delete( $widget_class, 'widget' );

		$settings->widget_class = urlencode( $widget_class );

		// Return the settings.
		return $settings;
	}

	/**
	 * @since 1.10.6
	 * @param string $class
	 * @param object $instance
	 * @param array $settings
	 * @return void
	 */
	static public function render_form( $class, $instance, $settings ) {
		if ( 'WP_Widget_Text' === $class ) {
			// Render the legacy text form since the one in 4.8 doesn't work in the builder.
			include FL_BUILDER_DIR . 'modules/widget/includes/settings-text-widget.php';
		} else {
			$instance->form( $settings );
		}
	}
}

/**
 * Register the module and its form settings.
 */
FLBuilder::register_module('FLWidgetModule', array(
	'general' => array( // Tab
		'title' => __( 'General', 'fl-builder' ), // Tab title
		'file'  => FL_BUILDER_DIR . 'modules/widget/includes/settings-general.php',
	),
));
