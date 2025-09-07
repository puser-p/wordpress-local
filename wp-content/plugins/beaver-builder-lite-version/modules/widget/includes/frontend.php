<div class="fl-widget">
<?php

$widget_class = $module::extract_class( $settings );

if ( isset( $widget_class ) && class_exists( $widget_class ) ) {
	global $wp_widget_factory;

	// Widget instance
	$widget_instance = new $widget_class();

	// Widget settings
	$settings_key    = 'widget-' . $widget_instance->id_base;
	$widget_settings = isset( $settings->$settings_key ) ? (array) $settings->$settings_key : array();

	// Check to see if $widget_class key does not exist and registered it as lowercase instead.
	if ( ! isset( $wp_widget_factory->widgets[ $widget_class ] ) && isset( $wp_widget_factory->widgets[ strtolower( $widget_class ) ] ) ) {
		$widget_class = strtolower( $widget_class );
	}

	/**
	 * Filter $args passed to the_widget()
	 * @since 2.1.6
	 * @see fl_widget_module_args
	 */
	$widget_args = apply_filters( 'fl_widget_module_args', array(
		'widget_id' => 'fl_builder_widget_' . $module->node,
	), $module );

	/**
	 * Is widget output disabled
	 * @see fl_widget_module_output_disabled
	 */
	$disabled = apply_filters( 'fl_widget_module_output_disabled', false, $module, $widget_class );

	if ( false !== $disabled ) {
		echo $disabled;
	} else {
		the_widget( $widget_class, $widget_settings, $widget_args );
	}
} elseif ( isset( $widget_class ) && FLBuilderModel::is_builder_active() ) {

	// Widget doesn't exist!
	/* translators: %s: widget title */
	printf( _x( '%s no longer exists.', '%s stands for widget slug.', 'fl-builder' ), isset( $settings->widget_title ) ? $settings->widget_title : $widget_class );

}

?>
</div>
