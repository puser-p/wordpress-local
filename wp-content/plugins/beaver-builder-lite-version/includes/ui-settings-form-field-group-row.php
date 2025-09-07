<script type="text/html" id="tmpl-fl-builder-settings-field-group-row">
	<#
	const shouldDeferRendering = FL.Builder.settingsForms.canDeferField( data.field, data )
	var connections = 'undefined' !== typeof data.field.connections
	#>
	<div id="fl-field-{{data.name}}" class="fl-field{{data.rowClass}}" data-type="{{data.field.type}}" data-is-style="{{data.field.is_style}}" data-preview='{{{data.preview}}}' data-connections="{{{connections}}}">
		<div>
			<label for="{{data.name}}">
				<span>{{{data.field.label}}}</span>

				<span style="display: flex; align-items: center;">
					<# if ( data.responsive ) { #>
					<i class="fl-field-responsive-toggle dashicons dashicons-desktop" data-mode="default"></i>
					<# } #>

					<# if ( data.field.help ) { #>
					<span class="fl-help-tooltip">
						<span class="fl-help-tooltip-icon">
							<svg width="12" height="12">
								<use href="#fl-question-mark" />
							</svg>
						</span>
						<span class="fl-help-tooltip-text">{{{data.field.help}}}</span>
					</span>
					<# } #>
				</span>
			</label>
		</div>
		<div class="fl-field-control-wrapper">
			<# if ( data.template.length ) {
				var template = wp.template( 'fl-builder-field-' + data.field.type ),
					before   = data.field.html_before ? data.field.html_before : '',
					after    = data.field.html_after ? data.field.html_after : '';

				// Allow module helper to filter the field template function
				if ( data.node ) {
					const helper = FLBuilder._moduleHelpers[data.node.type];
					if ( helper && 'filterFieldTemplate' in helper ) {
						template = helper.filterFieldTemplate( data.field, template )
					}
				}

				const field = template( data );
			#>
			{{{before}}}{{{field}}}{{{after}}}
			<# } #>
		</div>
	</div>
</script>
