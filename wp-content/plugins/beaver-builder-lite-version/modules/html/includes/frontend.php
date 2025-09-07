<?php

$attrs = [
	'class' => [
		'fl-html', // Necessary for live preview
	],
];

?>
<div <?php $module->render_attributes( $attrs ); ?>>
	<?php echo $settings->html; ?>
</div>
