<?php

$attrs = [
	'class' => [
		'fl-heading',
		'fl-heading-text', // Necessary for live preview/inline editing.
	],
];

?>
<<?php echo esc_attr( $settings->tag ); ?> <?php $module->render_attributes( $attrs ); ?>>
	<?php if ( ! empty( $settings->link ) ) : ?>
	<a href="<?php echo esc_url( do_shortcode( $settings->link ) ); ?>" title="<?php echo esc_attr( wp_strip_all_tags( $settings->heading ) ); ?>" <?php echo ( isset( $settings->link_download ) && 'yes' === $settings->link_download ) ? ' download' : ''; ?> target="<?php echo esc_attr( $settings->link_target ); ?>" <?php echo $module->get_rel(); ?>>
	<?php endif; ?>
		<?php echo $settings->heading; ?>
	<?php if ( ! empty( $settings->link ) ) : ?>
	</a>
	<?php endif; ?>
</<?php echo esc_attr( $settings->tag ); ?>>
