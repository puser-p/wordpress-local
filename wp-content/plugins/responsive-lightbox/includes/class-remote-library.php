<?php
// exit if accessed directly
if ( ! defined( 'ABSPATH' ) )
	exit;

/**
 * Responsive Lightbox Remote Library class.
 *
 * @class Responsive_Lightbox_Remote_Library
 */
class Responsive_Lightbox_Remote_Library {

	public $providers = [];
	private $image_formats = [
		'bmp'	=> 'image/bmp',
		'gif'	=> 'image/gif',
		'jpe'	=> 'image/jpeg',
		'jpeg'	=> 'image/jpeg',
		'jpg'	=> 'image/jpeg',
		'png'	=> 'image/png',
		'tif'	=> 'image/tiff',
		'tiff'	=> 'image/tiff',
		'webp'	=> 'image/webp'
	];

	/**
	 * Class constructor.
	 *
	 * @return void
	 */
	public function __construct() {
		// is remote library active?
		if ( ! Responsive_Lightbox()->options['remote_library']['active'] )
			return;

		// actions
		add_action( 'wp_ajax_rl_remote_library_query', [ $this, 'ajax_query_media' ] );
		add_action( 'wp_ajax_rl_upload_image', [ $this, 'ajax_upload_image' ] );
		add_action( 'admin_enqueue_scripts', [ $this, 'remote_library_scripts' ] );

		// add filter to send new data to editor
		add_filter( 'image_send_to_editor', [ $this, 'send_image_to_editor' ], 21, 8 );
	}

	/**
	 * Hidden field with response data for gallery preview.
	 *
	 * @param array $args Field arguments
	 * @return string
	 */
	public function remote_library_response_data( $args ) {
		// get main instance
		$rl = Responsive_Lightbox();

		// get active providers
		$providers = $this->get_active_providers();

		$html = '';

		// any providers?
		if ( ! empty( $providers ) ) {
			foreach ( $providers as $provider ) {
				// get provider
				$provider = $rl->providers[$provider];

				// add response data arguments if needed
				if ( ! empty( $provider['response_args'] ) ) {
					$response = $provider['instance']->get_response_data();

					foreach ( $provider['response_args'] as $arg ) {
						if ( array_key_exists( $arg, $response ) ) {
							$html .= '<span id="' . esc_attr( 'rl_' . $args['tab_id'] . '_' . $args['menu_item'] . '_' . $args['field'] . '_' . $provider['slug'] . '_' . $arg ) . '" class="rl-response-data" data-value="' . esc_attr( base64_encode( wp_json_encode( $response[$arg] ) ) ) . '" data-name="' . esc_attr( $arg ) . '" data-provider="' . esc_attr( $provider['slug'] ) . '"></span>';
						}
					}
				}
			}
		}

		return $html;
	}

	/**
	 * Send updated image data to editor.
	 *
	 * @param string $html The image HTML markup to send
	 * @param int $id The attachment ID
	 * @param string $caption The image caption
	 * @param string $title The image title
	 * @param string $align The image alignment
	 * @param string $url The image source URL
	 * @param string|array $size Size of image
	 * @param string $alt The image alternative text.
	 * @return string
	 */
	function send_image_to_editor( $html, $id, $caption, $title, $align, $url, $size, $alt ) {
		if ( $id === Responsive_Lightbox()->galleries->maybe_generate_thumbnail() && isset( $_POST['attachment'] ) && is_array( $_POST['attachment'] ) ) {
			$attachment = wp_unslash( $_POST['attachment'] );

			if ( isset( $attachment['remote_library_image'], $attachment['width'], $attachment['height'] ) ) {
				$html = preg_replace( '/src=(\'|")(.*?)(\'|")/', 'src="' . ( ! empty( $attachment['rl_url'] ) ? esc_url( $attachment['rl_url'] ) : $url ) . '"', $html );
				$html = preg_replace( '/width=(\'|")(.*?)(\'|")/', 'width="' . (int) $attachment['width'] . '"', $html );
				$html = preg_replace( '/height=(\'|")(.*?)(\'|")/', 'height="' . (int) $attachment['height'] . '"', $html );
				$html = preg_replace( '/(\s)?id="attachment_' . (int) $id . '"/', '', $html );
				$html = preg_replace( '/(\s)?wp-image-' . (int) $id . '/', '', $html );
			}
		}

		return $html;
	}

	/**
	 * Get all available providers.
	 *
	 * @return array
	 */
	public function get_providers() {
		return (array) apply_filters( 'rl_get_providers', Responsive_Lightbox()->providers );
	}

	/**
	 * Get all active providers.
	 *
	 * @return array
	 */
	public function get_active_providers() {
		$providers = $this->get_providers();
		$active_providers = [];

		foreach ( $providers as $provider => $data ) {
			if ( Responsive_Lightbox()->options['remote_library'][$provider]['active'] )
				$active_providers[] = $provider;
		}

		return (array) apply_filters( 'rl_get_active_providers', $active_providers );
	}

	/**
	 * Check whether provider is active.
	 *
	 * @param string $provider Media provider
	 * @return bool
	 */
	public function is_active_provider( $provider ) {
		$providers = $this->get_providers();
		$rl = Responsive_Lightbox();

		return (bool) apply_filters( 'rl_is_active_provider', array_key_exists( $provider, $rl->options['remote_library'] ) && $rl->options['remote_library'][$provider]['active'], $provider );
	}

	/**
	 * Scripts and styles for media frame.
	 *
	 * @global string $wp_version
	 * @global string $pagenow
	 *
	 * @return void
	 */
	public function remote_library_scripts() {
		global $wp_version;
		global $pagenow;

		// display only for post edit pages
		if ( ! ( ( $pagenow === 'post.php' || $pagenow === 'post-new.php' ) || ( version_compare( $wp_version, '5.8', '>=' ) && ( $pagenow === 'widgets.php' || $pagenow === 'customize.php' ) ) ) )
			return;

		// get main instance
		$rl = Responsive_Lightbox();

		wp_enqueue_script( 'responsive-lightbox-remote-library-media', RESPONSIVE_LIGHTBOX_URL . '/js/admin-media.js', [ 'jquery', 'media-models', 'underscore' ], $rl->defaults['version'] );

		// prepare script data
		$script_data = [
			'thumbnailID'			=> $rl->galleries->maybe_generate_thumbnail(),
			'postID'				=> get_the_ID(),
			'providers'				=> $this->get_providers(),
			'providersActive'		=> $this->get_active_providers(),
			'allProviders'			=> esc_html__( 'All providers', 'responsive-lightbox' ),
			'uploadAndInsert'		=> esc_html__( 'Upload and Insert', 'responsive-lightbox' ),
			'uploadAndSelect'		=> esc_html__( 'Upload and Select', 'responsive-lightbox' ),
			'filterByremoteLibrary'	=> esc_html__( 'Filter by remote library', 'responsive-lightbox' ),
			'getUploadNonce'		=> wp_create_nonce( 'rl-remote-library-upload-image' )
		];

		wp_add_inline_script( 'responsive-lightbox-remote-library-media', 'var rlRemoteLibraryMedia = ' . wp_json_encode( $script_data ) . ";\n", 'before' );

		// enqueue gallery
		$rl->galleries->enqueue_gallery_scripts_styles();
	}

	/**
	 * AJAX media query action.
	 *
	 * @return void
	 */
	public function ajax_query_media() {
		$data = stripslashes_deep( $_POST );
		$results = [
			'last'		=> false,
			'images'	=> [],
			'data'		=> []
		];

		if ( isset( $data['media_provider'], $data['media_search'], $data['media_page'] ) ) {
			$data['media_provider'] = sanitize_key( $data['media_provider'] );

			if ( $data['media_provider'] === 'all' || $this->is_active_provider( $data['media_provider'] ) ) {
				$data['preview_page'] = (int) $data['media_page'];
				$data['preview_per_page'] = 20;

				// get images
				$results['images'] = $this->get_remote_library_images( $data );

				// get main instance
				$rl = Responsive_Lightbox();

				// single provider?
				if ( $data['media_provider'] !== 'all' ) {
					// get provider
					$provider = $rl->providers[$data['media_provider']];

					// add response data arguments if needed
					if ( ! empty( $provider['response_args'] ) ) {
						$response = $provider['instance']->get_response_data();

						foreach ( $provider['response_args'] as $arg ) {
							if ( array_key_exists( $arg, $response ) )
								$results['data'][$provider['slug']][$arg] = base64_encode( wp_json_encode( $response[$arg] ) );
						}
					}
				} else {
					// get active providers
					$providers = $this->get_active_providers();

					if ( ! empty( $providers ) ) {
						foreach ( $providers as $provider ) {
							// get provider
							$provider = $rl->providers[$provider];

							// add response data arguments if needed
							if ( ! empty( $provider['response_args'] ) ) {
								$response = $provider['instance']->get_response_data();

								foreach ( $provider['response_args'] as $arg ) {
									if ( array_key_exists( $arg, $response ) )
										$results['data'][$provider['slug']][$arg] = base64_encode( wp_json_encode( $response[$arg] ) );
								}
							}
						}
					}
				}

				if ( ! empty( $results['images'] ) ) {
					// create WP compatible attachments
					$results['images'] = $this->create_wp_remote_attachments( $results['images'], $data );

					// handle last page if needed
					$results['last'] = apply_filters( 'rl_remote_library_query_last_page', false, $results, $data );
				} else
					$results['last'] = true;
			}
		}

		// send data
		wp_send_json( $results );
	}

	/**
	 * AJAX upload image action.
	 *
	 * @return void
	 */
	public function ajax_upload_image() {
		// clear post data
		$data = stripslashes_deep( $_POST );

		// default result
		$result = [
			'id'		=> 0,
			'full'		=> [ '', 0, 0, false ],
			'error'		=> false,
			'message'	=> ''
		];

		// verified upload?
		if ( current_user_can( 'upload_files' ) && isset( $data['rlnonce'], $data['image'], $data['post_id'] ) && wp_verify_nonce( $data['rlnonce'], 'rl-remote-library-upload-image' ) ) {
			// include required files if needed
			if ( ! function_exists( 'media_handle_upload' ) )
				require_once( path_join( ABSPATH, 'wp-admin/includes/media.php' ) );

			if ( ! function_exists( 'wp_handle_upload' ) )
				require_once( path_join( ABSPATH, 'wp-admin/includes/file.php' ) );

			// get media provider
			$media_provider = ! empty( $data['image']['media_provider'] ) ? sanitize_key( $data['image']['media_provider'] ) : '';

			// get active providers
			$providers = $this->get_active_providers();

			if ( in_array( $media_provider, $providers, true ) ) {
				// get image formats
				$image_formats = $this->get_allowed_image_formats( $media_provider );

				if ( ! empty( $data['image']['url'] ) && ! empty( $data['image']['mime'] ) && ! empty( $data['image']['subtype'] ) && array_key_exists( $data['image']['subtype'], $image_formats ) ) {
					// get image url
					$image_url = esc_url_raw( $data['image']['url'] );

					// get allowed hosts
					$hosts = $this->get_allowed_hosts( $media_provider );

					if ( ! empty( $hosts ) ) {
						$valid_host = false;

						// get image host
						$image_host = parse_url( $image_url, PHP_URL_HOST );

						// check allowed hosts
						foreach ( $hosts as $host ) {
							// invalid host?
							if ( strpos( $image_host, $host ) !== false ) {
								$valid_host = true;

								// no need to check rest of the hosts
								break;
							}
						}
					} else
						$valid_host = true;

					if ( $valid_host ) {
						// get image as binary data
						$response = wp_safe_remote_get( $image_url );

						// no errors?
						if ( ! is_wp_error( $response ) ) {
							// get sanitized file name
							$file_name = sanitize_file_name( pathinfo( $data['image']['name'], PATHINFO_BASENAME ) );

							// get file extension
							$file_ext = pathinfo( $file_name, PATHINFO_EXTENSION );

							// no extension?
							if ( $file_ext === '' || ! array_key_exists( $file_ext, $image_formats ) ) {
								$file_name .= '.jpg';
								$file_ext = 'jpg';
							}

							// simple mime checking
							$check = wp_check_filetype( $file_name );

							if ( $check['type'] === $data['image']['mime'] && $check['ext'] !== false && array_key_exists( $file_ext, $image_formats ) ) {
								// get image binary data
								$image_bits = wp_remote_retrieve_body( $response );

								// upload image
								$uploaded_image = wp_upload_bits( $file_name, null, $image_bits, current_time( 'Y/m' ) );

								if ( isset( $uploaded_image['error'] ) && $uploaded_image['error'] ) {
									$result['error'] = true;
									$result['message'] = $uploaded_image['error'];
								} else {
									// get file name
									$file_name = pathinfo( $uploaded_image['file'], PATHINFO_BASENAME );

									// simulate upload
									$_FILES['rl-remote-image'] = [
										'error'		=> 0,
										'name'		=> $file_name,
										'tmp_name'	=> $uploaded_image['file'],
										'size'		=> filesize( $uploaded_image['file'] )
									];

									// get post id
									$post_id = isset( $data['post_id'] ) ? (int) $data['post_id'] : 0;

									// more reliable mime type checking
									$check = wp_check_filetype_and_ext( $uploaded_image['file'], $file_name );

									// correct mime type and extension?
									if ( strpos( $data['image']['mime'], 'image/' ) === 0 && $check['type'] === $data['image']['mime'] && $check['ext'] !== false && wp_get_image_mime( $uploaded_image['file'] ) === $check['type'] ) {
										// upload image, wp handle sanitization and validation here
										$attachment_id = media_handle_upload(
											'rl-remote-image',
											$post_id,
											[
												'post_title'	=> empty( $data['image']['title'] ) ? $file_name : $data['image']['title'],
												'post_content'	=> empty( $data['image']['description'] ) ? '' : $data['image']['description'],
												'post_excerpt'	=> empty( $data['image']['caption'] ) ? '' : $data['image']['caption']
											],
											[
												'action'	=> 'rl_remote_library_handle_upload',
												'test_form'	=> false
											]
										);

										// upload success?
										if ( ! is_wp_error( $attachment_id ) ) {
											add_post_meta( $attachment_id, '_wp_attachment_image_alt', empty( $data['image']['alt'] ) ? '' : $data['image']['alt'] );

											$result['id'] = $attachment_id;
											$result['full'] = wp_get_attachment_image_src( $attachment_id, 'full' );
										} else {
											$result['error'] = true;
											$result['message'] = $attachment_id->get_error_message();
										}
									// file still exists?
									} elseif ( file_exists( $uploaded_image['file'] ) ) {
										$result['error'] = true;
										$result['message'] = __( 'Invalid MIME type', 'responsive-lightbox' );

										// delete file
										wp_delete_file( $uploaded_image['file'] );
									}
								}
							} else {
								$result['error'] = true;
								$result['message'] = __( 'Invalid image type', 'responsive-lightbox' );
							}
						} else {
							$result['error'] = true;
							$result['message'] = $response->get_error_message();
						}
					} else {
						$result['error'] = true;
						$result['message'] = __( 'Invalid host', 'responsive-lightbox' );
					}
				} else {
					$result['error'] = true;
					$result['message'] = __( 'Missing or invalid image data', 'responsive-lightbox' );
				}
			} else {
				$result['error'] = true;
				$result['message'] = __( 'Invalid media provider', 'responsive-lightbox' );
			}
		} else {
			$result['error'] = true;
			$result['message'] = __( 'Access denied', 'responsive-lightbox' );
		}

		// send data
		wp_send_json( $result );
	}

	/**
	 * Create WP compatible attachments for JavaScript.
	 *
	 * @param array $results Requested images
	 * @param array $args Additional arguments
	 * @return array
	 */
	public function create_wp_remote_attachments( $results, $args ) {
		// get current user
		$user = wp_get_current_user();

		// copy results
		$copy = $results;

		// get current time
		$time = current_time( 'timestamp' );

		// get date format
		$date_format = get_option( 'date_format' );

		// format date
		$date = date_i18n( __( 'F j Y' ), $time );

		// $result is already sanitized by specific provider sanitize_result function
		foreach ( $results as $no => $result ) {
			// make sure those attributes are strings
			$copy[$no]['caption'] = (string) $result['caption'];
			$copy[$no]['description'] = (string) $result['description'];
			$copy[$no]['title'] = (string) $result['title'];
			$copy[$no]['filename'] = $copy[$no]['name'] = (string) $result['filename'];

			// rest of attributes
			$copy[$no]['id'] = 'rl-attachment-' . ( ( $args['preview_page'] - 1 ) * $args['preview_per_page'] + $no ) . '-' . $args['media_provider'];
			$copy[$no]['remote_library_image'] = true;
			$copy[$no]['author'] = $user->ID;
			$copy[$no]['authorName'] = esc_html( $user->user_login );
			$copy[$no]['can'] = [
				'save' => true,
				'remove' => false
			];
			$copy[$no]['compat'] = '';
			$copy[$no]['date'] = $time;
			$copy[$no]['dateFormatted'] = $date;
			$copy[$no]['delete'] = '';
			$copy[$no]['edit'] = '';
			$copy[$no]['update'] = '';
			$copy[$no]['filesizeHumanReadable'] = '';
			$copy[$no]['filesizeInBytes'] = 0;
			$copy[$no]['icon'] = '';
			$copy[$no]['link'] = $result['url'];
			$copy[$no]['menuOrder'] = 0;
			$copy[$no]['meta'] = false;

			// check extension
			$file_ext = pathinfo( $result['url'], PATHINFO_EXTENSION );

			// get image formats
			$image_formats = $this->get_allowed_image_formats( $args['media_provider'] );

			if ( array_key_exists( $file_ext, $image_formats ) ) {
				$copy[$no]['mime'] = $image_formats[$file_ext];
				$copy[$no]['subtype'] = $file_ext;
			} else {
				$copy[$no]['mime'] = 'image/jpeg';
				$copy[$no]['subtype'] = 'jpg';
			}

			$copy[$no]['modified'] = $time;
			$copy[$no]['nonces'] = [
				'delete'	=> '',
				'edit'		=> '',
				'update'	=> ''
			];
			$copy[$no]['orientation'] = $result['orientation'];
			$copy[$no]['status'] = 'inherit';
			$copy[$no]['type'] = 'image';
			$copy[$no]['uploadedTo'] = 0;
			$copy[$no]['uploadedToLink'] = '';
			$copy[$no]['uploadedToTitle'] = '';
			$copy[$no]['sizes'] = [
				'medium' => [
					'height'		=> $result['thumbnail_height'],
					'width'			=> $result['thumbnail_width'],
					'orientation'	=> $result['thumbnail_orientation'],
					'url'			=> $result['thumbnail_url']
				],
				'full' => [
					'height'		=> $result['height'],
					'width'			=> $result['width'],
					'orientation'	=> $result['orientation'],
					'url'			=> $result['url']
				]
			];
		}

		return (array) apply_filters( 'rl_remote_library_wp_attachments', $copy, $args );
	}

	/**
	 * Remote library media query.
	 *
	 * @param array $args
	 * @return array
	 */
	public function get_remote_library_images( $args ) {
		$args = stripslashes_deep( $args );

		// search phrase
		if ( isset( $args['media_search'] ) )
			$args['media_search'] = strtolower( trim( $args['media_search'] ) );
		else
			$args['media_search'] = '';

		// media provider
		if ( isset( $args['media_provider'] ) )
			$args['media_provider'] = trim( $args['media_provider'] );
		else
			$args['media_provider'] = 'all';

		// page number
		if ( isset( $args['preview_page'] ) )
			$args['preview_page'] = (int) $args['preview_page'];
		else
			$args['preview_page'] = 1;

		// number of images per page
		if ( isset( $args['preview_per_page'] ) )
			$args['preview_per_page'] = (int) $args['preview_per_page'];
		else
			$args['preview_per_page'] = 20;

		// get active providers
		$providers = $this->get_active_providers();

		// prepare valid providers
		$valid_providers = [];

		if ( $args['media_provider'] === 'all' )
			$valid_providers = $providers;
		elseif ( in_array( $args['media_provider'], $providers, true ) )
			$valid_providers[] = $args['media_provider'];

		$results = [];

		// any valid providers?
		if ( ! empty( $valid_providers ) ) {
			// get main instance
			$rl = Responsive_Lightbox();

			foreach ( $valid_providers as $provider_name ) {
				if ( ! empty( $args['response_data'][$provider_name] ) ) {
					// get provider
					$provider = $rl->providers[$provider_name];

					if ( ! empty( $provider['response_args'] ) ) {
						foreach ( $provider['response_args'] as $arg ) {
							if ( array_key_exists( $arg, $args['response_data'][$provider_name] ) ) {
								$base64 = base64_decode( $args['response_data'][$provider_name][$arg] );

								if ( ! empty( $base64 ) )
									$args['response_data'][$provider_name][$arg] = json_decode( $base64, true );
							}
						}
					}
				}

				// get results
				$results = apply_filters( 'rl_remote_library_query', $results, $args['media_search'], $provider_name, $args );

				// number of results
				$nor = count( $results );

				// more than requested images?
				if ( $nor > $args['preview_per_page'] ) {
					// get part of images
					$results = array_slice( $results, 0, $args['preview_per_page'], true );

					break;
				// same amount of images?
				} elseif ( $nor === $args['preview_per_page'] )
					break;
			}
		}

		return $results;
	}

	/**
	 * Get allowed hosts.
	 *
	 * @param string $provider
	 * @return array
	 */
	public function get_allowed_hosts( $provider ) {
		// get active providers
		$providers = $this->get_active_providers();

		if ( in_array( $provider, $providers, true ) ) {
			// get available provider host
			$hosts = Responsive_Lightbox()->providers[$provider]['instance']->get_allowed_hosts();
		} else
			$hosts = [];

		return $hosts;
	}

	/**
	 * Get allowed image formats.
	 *
	 * @param string $provider
	 * @return array
	 */
	public function get_allowed_image_formats( $provider = 'all' ) {
		if ( $provider === 'all' ) {
			$image_formats = $this->image_formats;
		} else {
			// get active providers
			$providers = $this->get_active_providers();

			if ( in_array( $provider, $providers, true ) ) {
				// get available provider image formats
				$image_formats = Responsive_Lightbox()->providers[$provider]['instance']->get_allowed_formats();
			} else
				$image_formats = [];
		}

		return $image_formats;
	}
}
