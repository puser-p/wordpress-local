<?php

$block = FLACFBlockModule::get_block_data( $module->node, $settings );
if ( isset( $block ) && ! empty( $block ) ) {
	echo acf_rendered_block( $block, '', true, get_the_ID(), null, $block['_acf_context'] );
	acf_reset_meta( $block['id'] );
} elseif ( FLBuilderModel::is_builder_active() ) {
	// Block doesn't exist!
	/* translators: %s: acf block */
	printf( _x( '%s no longer exists.', '%s stands for acf block.', 'fl-builder' ), $module->name );
}
