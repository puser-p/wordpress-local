<?php

$categories     = FLBuilderModuleBlocks::get_categorized_block_editor_modules();
$enabled_blocks = FLBuilderModuleBlocks::get_enabled_block_editor_modules();

?>
<div id="fl-blocks-form" class="fl-settings-form">
	<h3 class="fl-settings-form-header"><?php _e( 'Enabled Blocks', 'fl-builder' ); ?></h3>

	<form id="blocks-form" action="<?php FLBuilderAdminSettings::render_form_action( 'blocks' ); ?>" method="post">

		<?php if ( FLBuilderAdminSettings::multisite_support() && ! is_network_admin() ) : ?>
		<label>
			<input class="fl-override-ms-cb" type="checkbox" name="fl-override-ms" value="1" <?php echo ( get_option( '_fl_builder_enabled_blocks' ) ) ? 'checked="checked"' : ''; ?> />
			<?php _e( 'Override network settings?', 'fl-builder' ); ?>
		</label>
		<?php endif; ?>

		<div class="fl-settings-form-content">

			<p><?php _e( 'Check or uncheck modules to enable or disable them in the block editor.', 'fl-builder' ); ?></p>

			<label>
				<?php $checked = in_array( 'all', $enabled_blocks ) ? 'checked' : ''; ?>
				<input class="fl-module-all-cb" type="checkbox" name="fl-blocks[]" value="all" <?php echo $checked; ?> />
				<?php _ex( 'All', 'Plugin setup page: Blocks.', 'fl-builder' ); ?>
			</label>

			<?php foreach ( $categories as $title => $modules ) : ?>
				<h3><?php echo $title; ?></h3>
				<?php foreach ( $modules as $module ) : ?>
					<p>
						<label>
							<?php $checked = in_array( $module->slug, $enabled_blocks ) ? 'checked' : ''; ?>
							<input class="fl-module-cb" type="checkbox" name="fl-blocks[]" value="<?php echo $module->slug; ?>"  <?php echo $checked; ?> />
							<?php echo $module->name; ?>
						</label>
					</p>
				<?php endforeach; ?>
			<?php endforeach; ?>

		</div>
		<p class="submit">
			<input type="submit" name="update" class="button-primary" value="<?php esc_attr_e( 'Save Block Settings', 'fl-builder' ); ?>" />
			<?php wp_nonce_field( 'blocks', 'fl-blocks-nonce' ); ?>
		</p>
	</form>
</div>
