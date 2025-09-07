<?php

$widget_class = FLWidgetModule::extract_class( $settings );

if ( isset( $widget_class ) && class_exists( $widget_class ) ) {

	// Widget instance
	$widget_instance = new $widget_class();

	// Widget settings
	$settings_key    = 'widget-' . $widget_instance->id_base;
	$widget_settings = isset( $settings->$settings_key ) ? (array) $settings->$settings_key : array();

	// Widget title
	$widget_title = $widget_instance->name;

	// Widget form
	ob_start();
	FLWidgetModule::render_form( $widget_class, $widget_instance, $widget_settings );
	echo '<input type="hidden" name="widget_class" value="' . $widget_class . '" />';
	echo '<input type="hidden" name="widget_title" value="' . $widget_title . '" />';
	echo '<input type="hidden" name="widget_key" value="' . $settings_key . '" />';
	$widget_form = ob_get_clean();

} else {

	$widget_class = ( isset( $widget_class ) ) ? $widget_class : __( 'Widget', 'fl-builder' );

	// Widget doesn't exist!
	$widget_title = isset( $settings->widget_title ) ? $settings->widget_title : __( 'Widget', 'fl-builder' );

	// Widget form
	ob_start();
	echo '<div class="fl-builder-widget-missing">';
	/* translators: %s: widget title */
	printf( _x( '%s no longer exists.', '%s stands for widget slug.', 'fl-builder' ), isset( $settings->widget_title ) ? $settings->widget_title : $widget_class );
	echo '</div>';
	$widget_form = ob_get_clean();
}
?>
<h3 class="fl-builder-settings-title">
	<span class="fl-builder-settings-title-text-wrap"><?php echo $widget_title; ?></span>
</h3>
<table class="fl-form-table">
	<tbody>
		<tr class="fl-field" data-preview='{"type":"widget"}'>
			<td class="fl-field-control">
				<div class="fl-field-control-wrapper">
					<?php echo $widget_form; ?>
				</div>
			</td>
		</tr>
	</tbody>
</table>
