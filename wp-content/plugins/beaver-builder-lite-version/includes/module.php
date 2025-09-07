<?php $container_element = ( ! empty( $module->settings->container_element ) ? $module->settings->container_element : 'div' ); ?>
<<?php echo $container_element; ?><?php $module->render_attributes(); ?>>
	<div class="fl-module-content fl-node-content">
		<?php require FL_BUILDER_DIR . 'includes/module-content.php'; ?>
	</div>
</<?php echo $container_element; ?>>
