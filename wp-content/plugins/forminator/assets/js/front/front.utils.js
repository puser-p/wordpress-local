/**********
 * Common functions
 *
 ***********/
class forminatorFrontUtils {

	constructor() {}

	field_is_checkbox($element) {
		var is_checkbox = false;
		$element.each(function () {
			if (jQuery(this).attr('type') === 'checkbox') {
				is_checkbox = true;
				//break
				return false;
			}
		});

		return is_checkbox;
	}

	field_is_radio($element) {
		var is_radio = false;
		$element.each(function () {
			if (jQuery(this).attr('type') === 'radio') {
				is_radio = true;
				//break
				return false;
			}
		});

		return is_radio;
	}

	field_is_select($element) {
		return $element.is('select');
	}

	field_has_inputMask( $element ) {
		var hasMask = false;

		$element.each(function () {
			if ( undefined !== jQuery( this ).attr( 'data-inputmask' ) ) {
				hasMask = true;
				//break
				return false;
			}
		});

		return hasMask;
	}

	get_field_value( $element ) {
		var value       = 0;
		var calculation = 0;
		var checked     = null;

		if (this.field_is_radio($element)) {
			checked = $element.filter(":checked");
			if (checked.length) {
				calculation = checked.data('calculation');
				if (calculation !== undefined) {
					value = Number(calculation);
				}
			}
		} else if (this.field_is_checkbox($element)) {
			$element.each(function () {
				if (jQuery(this).is(':checked')) {
					calculation = jQuery(this).data('calculation');
					if (calculation !== undefined) {
						value += Number(calculation);
					}
				}
			});

		} else if (this.field_is_select($element)) {
			checked = $element.find("option").filter(':selected');
			if (checked.length) {
				calculation = checked.data('calculation');
				if (calculation !== undefined) {
					value = Number(calculation);
				}
			}
		} else if ( this.field_has_inputMask( $element ) ) {
			value = parseFloat( $element.inputmask('unmaskedvalue').replace(',','.') );
		} else if ( $element.length ) {
			var number = $element.val();
			value = parseFloat( number.replace(',','.') );
		}

		return isNaN(value) ? 0 : value;
	}

	show_hide_custom_input( selector, field_type ) {
		if( ! selector ) {
			return;
		}
		let $elements = null;
		if( field_type === 'select2' || field_type === 'select' ) {
			$elements = jQuery( selector );
		} else {
			$elements = jQuery( selector ).closest( '.forminator-field' ).find( 'input[type="checkbox"]:checked, input[type="radio"]:checked' );
		}

		if( ! $elements.length ) {
			// If no elements found, hide all custom inputs.
			jQuery( selector ).closest( '.forminator-field' ).find( '.forminator-custom-input' ).hide();
			return;
		}

		$elements.each( function() {
			if( jQuery( this ).val() && jQuery( this ).val().includes( 'custom_option' ) ) {
				// Display custom option input.
				jQuery( this ).closest( '.forminator-field' ).find( '.forminator-custom-input' ).show();
			} else {
				// Hide custom option input.
				jQuery( this ).closest( '.forminator-field' ).find( '.forminator-custom-input' ).hide();
			}
		});
	}
}

if (window['forminatorUtils'] === undefined) {
	window.forminatorUtils = function () {
		return new forminatorFrontUtils();
	}
}