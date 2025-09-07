<?php

$selectors = array( 'html' );
if ( FLBuilderModel::is_builder_active() ) {
	global $wp_the_query;
	$post_id = $wp_the_query->post->ID;

	$selectors = array(
		"html .fl-builder-content:not(.fl-builder-content-$post_id)",
		"html.fl-responsive-preview-enabled .fl-builder-content-$post_id",
	);
}

?>
@media (min-width: <?php echo $global_settings->large_breakpoint + 1; ?>px) {
<?php foreach ( $selectors as $selector ) : ?>
	<?php echo $selector; ?> .fl-visible-large:not(.fl-visible-desktop),
	<?php echo $selector; ?> .fl-visible-medium:not(.fl-visible-desktop),
	<?php echo $selector; ?> .fl-visible-mobile:not(.fl-visible-desktop) {
		display: none;
	}
<?php endforeach; ?>
}

@media (min-width: <?php echo $global_settings->medium_breakpoint + 1; ?>px) and (max-width: <?php echo $global_settings->large_breakpoint; ?>px) {
<?php foreach ( $selectors as $selector ) : ?>
	<?php echo $selector; ?> .fl-visible-desktop:not(.fl-visible-large),
	<?php echo $selector; ?> .fl-visible-medium:not(.fl-visible-large),
	<?php echo $selector; ?> .fl-visible-mobile:not(.fl-visible-large) {
		display: none;
	}
<?php endforeach; ?>
}

@media (min-width: <?php echo $global_settings->responsive_breakpoint + 1; ?>px) and (max-width: <?php echo $global_settings->medium_breakpoint; ?>px) {
<?php foreach ( $selectors as $selector ) : ?>
	<?php echo $selector; ?> .fl-visible-desktop:not(.fl-visible-medium),
	<?php echo $selector; ?> .fl-visible-large:not(.fl-visible-medium),
	<?php echo $selector; ?> .fl-visible-mobile:not(.fl-visible-medium) {
		display: none;
	}
<?php endforeach; ?>
}

@media (max-width: <?php echo $global_settings->responsive_breakpoint; ?>px) {
<?php foreach ( $selectors as $selector ) : ?>
	<?php echo $selector; ?> .fl-visible-desktop:not(.fl-visible-mobile),
	<?php echo $selector; ?> .fl-visible-large:not(.fl-visible-mobile),
	<?php echo $selector; ?> .fl-visible-medium:not(.fl-visible-mobile) {
		display: none;
	}
<?php endforeach; ?>
}
