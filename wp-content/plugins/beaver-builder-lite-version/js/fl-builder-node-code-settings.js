( function( $ ) {

    var CodeSettings = {

        currentNodeId: null,

        init: function() {
            FLBuilder.addHook( 'settings-form-init', CodeSettings.settingsFormInit );
            FLBuilder.addHook( 'didSaveNodeSettingsComplete', CodeSettings.clearPreview );
        },

        clearPreview: function() {
            $( 'style.fl-builder-node-preview' ).remove();
        },

        settingsFormInit: function() {
            var style = $( 'style.fl-builder-node-preview' );
            var form = $( '.fl-builder-settings[data-node]' );
            var cssInput = form.find( 'textarea[name=bb_css_code]' );
            var jsInput = form.find( 'textarea[name=bb_js_code]' );

            if ( cssInput.length > 0 && '' !== cssInput.val() ) {
              form.find('#fl-builder-settings-section-bb_css_code').find('.fl-builder-settings-title').append('<span style="padding-left:5px;color:green!important;">&bull;</span>');
            }

            if ( jsInput.length > 0 && '' !== jsInput.val() ) {
              form.find('#fl-builder-settings-section-bb_js_code').find('.fl-builder-settings-title').append('<span style="padding-left:5px;color:green!important;">&bull;</span>');
            }

            if ( form.length ) {
                CodeSettings.currentNodeId = form.attr( 'data-node' );
                form.find( '.fl-builder-settings-cancel' ).on( 'click', CodeSettings.clearPreview );
            }
            if ( ! style.length ) {
                $( 'head' ).append( '<style class="fl-builder-node-preview"></style>' );
            }
            if ( cssInput.length ) {
                cssInput.on( 'change', CodeSettings.cssChanged );
            }
        },

        cssChanged: function( e ) {
            var prefix = '.fl-node-' + CodeSettings.currentNodeId;
            var css = CSSScoper.scope( $( e.target ).val(), prefix );
            $( 'style.fl-builder-node-preview' ).html( css );
        },
    };

	var CSSScoper = {

        scope: function( rules, className ) {
            var classLen = className.length, char, nextChar, isAt, isIn;

            className += ' ';
            rules = rules.replace( /\/\*(?:(?!\*\/)[\s\S])*\*\/|[\r\n\t]+/g, '' );
            rules = rules.replace( /}(\s*)@/g, '}@' );
            rules = rules.replace( /}(\s*)}/g, '}}' );

            for ( var i = 0; i < rules.length - 2; i++ ) {
                char = rules[ i ];
                nextChar = rules[ i + 1 ];

                if ( char === '@' ) {
                    isAt = true;
                }
                if ( ! isAt && char === '{' ) {
                    isIn = true;
                }
                if ( isIn && char === '}' ) {
                    isIn = false;
                }
                if (
                    !isIn &&
                    nextChar !== '@' &&
                    nextChar !== '}' &&
                    (
                        char === '}' ||
                        char === ',' ||
                        ( ( char === '{' || char === ';' ) && isAt )
                    )
                ) {
                    rules = rules.slice( 0, i + 1 ) + className + rules.slice( i + 1 );
                    i += classLen;
                    isAt = false;
                }
            };

            if ( rules.indexOf( className ) !== 0 && rules.indexOf( '@' ) !== 0 ) {
                rules = className + rules;
            }

            return CSSScoper.fixKeyframes( rules, className );
        },

        fixKeyframes: function( rules, className ) {
            var toRegex = new RegExp( '\\' + className + '\\s?to\\s?\\{', 'g' );
            var fromRegex = new RegExp( '\\' + className + '\\s?from\\s?\\{', 'g' );
            rules = rules.replace( toRegex, 'to {' );
            rules = rules.replace( fromRegex, 'from {' );
            return rules;
        }
    };

    $( CodeSettings.init );

} )( jQuery );
