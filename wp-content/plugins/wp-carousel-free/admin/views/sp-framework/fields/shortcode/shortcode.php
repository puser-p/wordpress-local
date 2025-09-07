<?php
/**
 * Framework shortcode field.
 *
 * @link       https://shapedplugin.com
 * @since      3.0.0
 *
 * @package    WP_Carousel_Pro
 * @subpackage WP_Carousel_Pro/admin/views
 */

if ( ! defined( 'ABSPATH' ) ) {
	die;
} // Cannot access directly.

if ( ! class_exists( ' SP_WPCF_Field_shortcode' ) ) {
	/**
	 *
	 * Field: shortcode
	 *
	 * @since 1.0.0
	 * @version 1.0.0
	 */
	class SP_WPCF_Field_shortcode extends SP_WPCF_Fields {

		/**
		 * Render method.
		 *
		 * @return void
		 */
		public function render() {
			// Get the Post ID.
			$post_id = get_the_ID();
			if ( ! empty( $this->field['shortcode'] ) && 'shortcode' === $this->field['shortcode'] ) {
				echo ( ! empty( $post_id ) ) ? '<div class="wpcp-scode-wrap-side"><p>To display your carousel, slider or gallery, add the following shortcode into your post, custom post types, page, widget or block editor. If adding the slider to your theme files, additionally include the surrounding PHP code, <a href="https://docs.shapedplugin.com/docs/wordpress-carousel-pro/faqs/#template-include" target="_blank">see how</a>.</p><span class="wpcf-shortcode-selectable">[sp_wpcarousel id="' . esc_attr( $post_id ) . '"]</span></div><div class="spwpc-after-copy-text"><i class="fa fa-check-circle"></i> Shortcode Copied to Clipboard! </div>' : '';
			} elseif ( ! empty( $this->field['shortcode'] ) && 'pro_notice' === $this->field['shortcode'] ) {
				if ( ! empty( $post_id ) ) {
					echo '<div class="sp_wpcp_shortcode-area sp_wpcp-notice-wrapper">';
					echo '<div class="sp_wpcp-notice-heading">' . sprintf(
						/* translators: 1: start span tag, 2: close tag. */
						esc_html__( 'Unlock More Power with %1$sPRO%2$s', 'wp-carousel-free' ),
						'<span>',
						'</span>'
					) . '</div>';

					echo '<p class="sp_wpcp-notice-desc">' . sprintf(
						/* translators: 1: start bold tag, 2: close tag. */
						esc_html__( 'Boost Conversions with Premium Carousels, Sliders, and Galleries by Pro!', 'wp-carousel-free' ),
						'<b>',
						'</b>'
					) . '</p>';

					echo '<ul>';
					echo '<li><i class="wpcf-icon-check-icon"></i> ' . esc_html__( '25+ Carousel & Gallery Layouts', 'wp-carousel-free' ) . '</li>';
					echo '<li><i class="wpcf-icon-check-icon"></i> ' . esc_html__( 'Advanced Query Builder', 'wp-carousel-free' ) . '</li>';
					echo '<li><i class="wpcf-icon-check-icon"></i> ' . esc_html__( 'Custom Post Types', 'wp-carousel-free' ) . '</li>';
					echo '<li><i class="wpcf-icon-check-icon"></i> ' . esc_html__( '10+ Video and Audio Vendors', 'wp-carousel-free' ) . '</li>';
					echo '<li><i class="wpcf-icon-check-icon"></i> ' . esc_html__( 'Product Carousels & Galleries', 'wp-carousel-free' ) . '</li>';
					echo '<li><i class="wpcf-icon-check-icon"></i> ' . esc_html__( 'Full-Featured Zoom & Lightbox', 'wp-carousel-free' ) . '</li>';
					echo '<li><i class="wpcf-icon-check-icon"></i> ' . esc_html__( 'Watermark & Password Protection', 'wp-carousel-free' ) . '</li>';
					echo '<li><i class="wpcf-icon-check-icon"></i> ' . esc_html__( 'Stylish Interaction Effects', 'wp-carousel-free' ) . '</li>';
					echo '<li><i class="wpcf-icon-check-icon"></i> ' . esc_html__( '200+ Customizations and More', 'wp-carousel-free' ) . '</li>';
					echo '</ul>';

					echo '<div class="sp_wpcp-notice-button">';
					echo '<a class="sp_wpcp-open-live-demo" href="https://wpcarousel.io/pricing/?ref=1" target="_blank">';
					echo esc_html__( 'Upgrade to Pro Now', 'wp-carousel-free' ) . ' <i class="wpcf-icon-shuttle_2285485-1"></i>';
					echo '</a>';
					echo '</div>';
					echo '</div>';
				}
			} else {
				echo ( ! empty( $post_id ) ) ? '<div class="wpcp-scode-wrap-side"><p>WP Carousel has seamless integration with Gutenberg, Classic Editor, <strong>Elementor,</strong> Divi, Bricks, Beaver, Oxygen, WPBakery Builder, etc.</p></div>' : '';
			}
		}
	}
}
