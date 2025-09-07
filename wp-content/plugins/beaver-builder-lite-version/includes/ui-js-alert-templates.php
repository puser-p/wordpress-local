<script type="text/html" id="tmpl-fl-alert-lightbox">
	<div class="fl-lightbox-message">{{{data.message}}}</div>
	<div class="fl-lightbox-footer">
		<span class="fl-builder-alert-close fl-builder-button fl-builder-button-large fl-builder-button-primary" href="javascript:void(0);"><?php _e( 'OK', 'fl-builder' ); ?></span>
	</div>
</script>
<!-- #tmpl-fl-alert-lightbox -->

<script type="text/html" id="tmpl-fl-confirm-lightbox">
	<div class="fl-lightbox-message">{{{data.message}}}</div>
	<div class="fl-lightbox-footer">
		<span class="fl-builder-confirm-cancel fl-builder-alert-close fl-builder-button fl-builder-button-large" href="javascript:void(0);">{{data.strings.cancel}}</span>
		<span class="fl-builder-confirm-ok fl-builder-alert-close fl-builder-button fl-builder-button-large fl-builder-button-primary" href="javascript:void(0);">{{data.strings.ok}}</span>
	</div>
</script>
<!-- #tmpl-fl-confirm-lightbox -->

<script type="text/html" id="tmpl-fl-actions-lightbox">
	<div class="fl-builder-actions {{data.className}}">
		<span class="fl-builder-actions-title">{{data.title}}</span>
		<# for( var i in data.buttons ) { #>
		<span class="fl-builder-{{data.buttons[ i ].key}}-button fl-builder-button fl-builder-button-large">{{data.buttons[ i ].label}}</span>
		<# } #>
		<span class="fl-builder-cancel-button fl-builder-button fl-builder-button-primary fl-builder-button-large"><?php _e( 'Cancel', 'fl-builder' ); ?></span>
	</div>
</script>
<!-- #tmpl-fl-actions-lightbox -->
