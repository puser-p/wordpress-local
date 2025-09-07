<?php

$attrs = [
	'class' => [
		'fl-audio',
		'fl-wp-audio',
	],
];

// Display playlist if user selected more than one audio files
if ( ( 'media_library' == $settings->audio_type ) && ( is_array( $settings->audios ) && count( $settings->audios ) > 1 ) ) {

	$playlist_settings  = ( isset( $settings->style ) && $settings->style ) ? ' style="' . $settings->style . '"' : '';
	$playlist_settings .= isset( $settings->tracklist ) ? ' tracklist="' . $settings->tracklist . '"' : '';
	$playlist_settings .= isset( $settings->tracknumbers ) ? ' tracknumbers="' . $settings->tracknumbers . '"' : '';
	$playlist_settings .= isset( $settings->images ) ? ' images="' . $settings->images . '"' : '';
	$playlist_settings .= isset( $settings->artists ) ? ' artists="' . $settings->artists . '"' : '';
	?>
	<div <?php $module->render_attributes( $attrs ); ?>>
		<?php echo '[playlist ids="' . implode( ',', $settings->audios ) . '"' . $playlist_settings . ']'; ?>
	</div>

	<?php

} else {

	?>
	<div
	<?php
	$module->render_attributes( $attrs );
	FLBuilder::print_schema( ' itemscope itemtype="https://schema.org/AudioObject"' );
	?>
	>
		<?php

			$audio_data = $module->get_data();

			$loop     = isset( $settings->loop ) && $settings->loop ? ' loop="yes"' : '';
			$autoplay = isset( $settings->autoplay ) && $settings->autoplay ? ' autoplay="yes"' : '';

		if ( 'media_library' == $settings->audio_type && $audio_data ) {
			$audio_url = $audio_data->url;
		} else {
			$audio_url = $settings->link;
		}
		if ( $audio_url ) {
			echo '<meta itemprop="url" content="' . esc_url( do_shortcode( $audio_url ) ) . '" />';
			echo '[audio src="' . preg_replace( '/\/?\?.*/', '', esc_url( do_shortcode( $audio_url ) ) ) . '"' . $autoplay . $loop . ']';
		} else {
			echo __( 'Please add an audio file', 'fl-builder' );
		}

		?>

	</div>
	<?php
}

if ( FLBuilderModel::is_builder_active() ) {
	wp_underscore_playlist_templates();
}
