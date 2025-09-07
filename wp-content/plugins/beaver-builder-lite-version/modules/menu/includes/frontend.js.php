<?php

	// set defaults
	$type              = isset( $settings->menu_layout ) ? esc_js( $settings->menu_layout ) : 'horizontal';
	$mobile            = isset( $settings->mobile_toggle ) ? esc_js( $settings->mobile_toggle ) : 'expanded';
	$below_row         = 'below' == $settings->mobile_full_width ? 'true' : 'false';
	$flyout_menu       = $module->is_responsive_menu_flyout() ? 'true' : 'false';
	$mobile_breakpoint = isset( $settings->mobile_breakpoint ) ? esc_js( $settings->mobile_breakpoint ) : 'mobile';
	$post_id           = FLBuilderModel::get_post_id();
	$mobile_stacked    = isset( $settings->mobile_stacked ) && 'no' === $settings->mobile_stacked ? 'false' : 'true';
	$submenu_icon      = isset( $settings->submenu_hover_toggle ) ? esc_js( $settings->submenu_hover_toggle ) : 'none';
?>

(function($) {

	$(function() {

		new FLBuilderMenu({
			id: '<?php echo $id; ?>',
			type: '<?php echo $type; ?>',
			mobile: '<?php echo $mobile; ?>',
			mobileBelowRow: <?php echo $below_row; ?>,
			mobileFlyout: <?php echo $flyout_menu; ?>,
			breakPoints: {
				large: <?php echo FLBuilderUtils::sanitize_number( $global_settings->large_breakpoint ); ?>,
				medium: <?php echo FLBuilderUtils::sanitize_number( $global_settings->medium_breakpoint ); ?>,
				small: <?php echo FLBuilderUtils::sanitize_number( $global_settings->responsive_breakpoint ); ?>
			},
			mobileBreakpoint: '<?php echo $mobile_breakpoint; ?>',
			postId : '<?php echo $post_id; ?>',
			mobileStacked: <?php echo $mobile_stacked; ?>,
			submenuIcon: '<?php echo $submenu_icon; ?>',
		});

	});

})(jQuery);
