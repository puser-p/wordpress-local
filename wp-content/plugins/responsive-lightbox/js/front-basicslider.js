( function( $ ) {

	/**
	 * Hook into doResponsiveLightbox event
	 */
	$( document ).on( 'doResponsiveLightbox', function() {
		$( '.rl-basicslider-gallery' ).each( function( index ) {
			var gallery = $( this );
			var options = window['rlArgsBasicSliderGallery' + ( gallery.data( 'gallery_no' ) + 1 )];

			if ( typeof options !== 'undefined' && typeof options !== false ) {
				var galleryContainer = gallery[0].parentElement;
				
				var splide = new Splide( galleryContainer, options );
				splide.mount();
			}
		} );
	} );

} )( jQuery );