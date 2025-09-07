<script type="text/html" id="tmpl-fl-builder-settings-row">
	<#
	const shouldDeferRendering = FL.Builder.settingsForms.canDeferField( data.field, data )
	var connections = false
	if ( 'undefined' !== typeof data.field.connections ) {
		connections = true
	}
	#>
	<# if ( data.isMultiple && data.supportsMultiple && data.template.length ) {
		var origValues = data.value,
			values = origValues,
			button = FLBuilderStrings.addField.replace( '%s', data.field.label ),
			i	   = 0;

		data.name += '[]';

		var limit = 0;
		if ( 'undefined' !== typeof data.field.limit ) {
			limit = data.field.limit
		}

		if ( undefined === origValues.length ) {
			var tempValues = [];
			for ( index in origValues ) {
				tempValues.push( origValues[ index ] );
			}
			values = tempValues;
		}
	#>
	<tbody id="fl-field-{{data.rootName}}" class="fl-field fl-builder-field-multiples" data-limit="{{limit}}" data-type="form" data-preview='{{{data.preview}}}' data-connections="{{{connections}}}">

		<# if ( ! shouldDeferRendering ) { #>

			<# for( ; i < values.length; i++ ) {
				data.index = i;
				data.value = values[ i ];
			#>
			<tr class="fl-builder-field-multiple" data-field="{{data.rootName}}">
				<# var field = FLBuilderSettingsForms.renderField( data ); #>
				{{{field}}}
				<td class="fl-builder-field-actions">
					<i class="fl-builder-field-move fas fa-arrows-alt" title="{{FLBuilderStrings.move}}"></i>
					<i class="fl-builder-field-copy far fa-copy" title="{{FLBuilderStrings.duplicate}}"></i>
					<i class="fl-builder-field-delete fas fa-times" title="{{FLBuilderStrings.delete}}"></i>
				</td>
			</tr>
			<# } #>
			<tr>
				<# if ( ! data.field.label ) { #>
				<td colspan="2">
				<# } else { #>
				<td>&nbsp;</td><td>
				<# } #>
					<a href="javascript:void(0);" onclick="return false;" class="fl-builder-field-add fl-builder-button" data-field="{{data.rootName}}">{{button}}</a>
				</td>
			</tr>
		<# } #>
	</tbody>
	<# } else { #>
	<tr id="fl-field-{{data.name}}" class="fl-field{{data.rowClass}}" data-type="{{data.field.type}}" data-is-style="{{data.field.is_style}}" data-preview='{{{data.preview}}}' data-connections="{{{connections}}}">
		<#
		if ( ! shouldDeferRendering ) {
			var field = FLBuilderSettingsForms.renderField( data );
		#>
			{{{field}}}
		<# } #>
	</tr>
	<# } #>
</script>
