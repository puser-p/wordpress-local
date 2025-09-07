<?php if ( ! empty( $settings->color ) ) : ?>
.fl-row .fl-col <?php echo $settings->tag; ?>.fl-node-<?php echo $id; ?>,
.fl-row .fl-col <?php echo $settings->tag; ?>.fl-node-<?php echo $id; ?> a,
	<?php echo $settings->tag; ?>.fl-node-<?php echo $id; ?>,
	<?php echo $settings->tag; ?>.fl-node-<?php echo $id; ?> a {
	color: <?php echo FLBuilderColor::hex_or_rgb( $settings->color ); ?>;
}
<?php endif; ?>
<?php

FLBuilderCSS::typography_field_rule( array(
	'settings'     => $settings,
	'setting_name' => 'typography',
	'selector'     => [
		".fl-node-$id.fl-module-heading",
		".fl-node-$id.fl-module-heading :where(a, q, p, span)",
	],
) );
