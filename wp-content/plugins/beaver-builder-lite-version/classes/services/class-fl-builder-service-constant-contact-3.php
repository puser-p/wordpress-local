<?php

/**
 * Helper class for the Constant Contact API.
 *
 * @since 1.5.4
 */
final class FLBuilderServiceConstantContact3 extends FLBuilderService {

	/**
	 * The ID for this service.
	 *
	 * @since 1.5.4
	 * @var string $id
	 */
	public $id = 'constant-contact-3';

	/**
	 * The api url for this service.
	 *
	 * @since 1.5.4
	 * @var string $api_url
	 */
	public $api_url = 'https://api.cc.email/v3/';

	/**
	 * Test the API connection.
	 *
	 * @since 1.5.4
	 * @param array $fields {
	 *      @type string $api_key A valid API key.
	 *      @type string $access_token A valid access token.
	 * }
	 * @return array{
	 *      @type bool|string $error The error message or false if no error.
	 *      @type array $data An array of data used to make the connection.
	 * }
	 */
	public function connect( $fields = array() ) {
		$response = array(
			'error' => false,
			'data'  => array(),
		);

		// Make sure we have an API key.
		if ( ! isset( $fields['access_token'] ) || empty( $fields['access_token'] ) ) {
			$response['error'] = __( 'Error: You must provide an Access Token.', 'fl-builder' );
		} elseif ( ! isset( $fields['refresh_token'] ) || empty( $fields['refresh_token'] ) ) {
			$response['error'] = __( 'Error: You must provide a Refresh Token.', 'fl-builder' );
		} elseif ( ! isset( $fields['client_id'] ) || empty( $fields['client_id'] ) ) {
			$response['error'] = __( 'Error: You must provide a Client ID.', 'fl-builder' );
		} elseif ( ! isset( $fields['client_secret'] ) || empty( $fields['client_secret'] ) ) {
			$response['error'] = __( 'Error: You must provide a Client Secret.', 'fl-builder' );
		} else { // Try to connect and store the connection data.

			$url     = $this->api_url . 'contact_lists?include_count=true&status=active&include_membership_count=all';
			$args    = array(
				'headers' => array(
					'Content-Type'  => 'application/json',
					'Authorization' => 'Bearer ' . $fields['access_token'],
				),
			);
			$request = json_decode( wp_remote_retrieve_body( wp_remote_get( $url, $args ) ) );

			if ( is_array( $request ) && isset( $request[0] ) && isset( $request[0]->error_message ) ) {
				/* translators: %s: error */
				$response['error'] = sprintf( __( 'Error: Could not connect to Constant Contact. %s', 'fl-builder' ), $request[0]->error_message );
			} else {
				$response['data'] = array(
					'client_id'     => $fields['client_id'],
					'client_secret' => $fields['client_secret'],
					'access_token'  => $fields['access_token'],
					'refresh_token' => $fields['refresh_token'],
				);
			}
		}

		return $response;
	}

	/**
	 * Renders the markup for the connection settings.
	 *
	 * @since 1.5.4
	 * @return string The connection settings markup.
	 */
	public function render_connect_settings() {
		ob_start();

		FLBuilder::render_settings_field( 'client_id', array(
			'row_class' => 'fl-builder-service-connect-row',
			'class'     => 'fl-builder-service-connect-input',
			'type'      => 'text',
			'label'     => __( 'Client ID', 'fl-builder' ),
			'help'      => __( 'Your Client ID.', 'fl-builder' ),
			'preview'   => array(
				'type' => 'none',
			),
		));

		FLBuilder::render_settings_field( 'client_secret', array(
			'row_class' => 'fl-builder-service-connect-row',
			'class'     => 'fl-builder-service-connect-input',
			'type'      => 'text',
			'label'     => __( 'Client Secret', 'fl-builder' ),
			'help'      => __( 'Your Client Secret.', 'fl-builder' ),
			'preview'   => array(
				'type' => 'none',
			),
		));

		FLBuilder::render_settings_field( 'access_token', array(
			'row_class' => 'fl-builder-service-connect-row',
			'class'     => 'fl-builder-service-connect-input',
			'type'      => 'textarea',
			'rows'      => 6,
			'label'     => __( 'Access Token', 'fl-builder' ),
			'help'      => __( 'Your generated Access Token.', 'fl-builder' ),
			'preview'   => array(
				'type' => 'none',
			),
		));

		FLBuilder::render_settings_field( 'refresh_token', array(
			'row_class'   => 'fl-builder-service-connect-row',
			'class'       => 'fl-builder-service-connect-input',
			'type'        => 'text',
			'label'       => __( 'Refresh Token', 'fl-builder' ),
			'help'        => __( 'Your generated Refresh Token.', 'fl-builder' ),
			'description' => sprintf(
				/* translators: 1: account link: 2: api key link: 3: line break*/
				__( 'You must create an Application and generate access keys to use this service. %3$s 1. Create the application %1$s. %3$s 2. Generate access keys using this %2$s.', 'fl-builder' ),
				sprintf( '<a target="_blank" href="https://app.constantcontact.com/pages/dma/portal/">%s</a>', __( 'on the portal', 'fl-builder' ) ),
				sprintf( '<a target="_blank" href="https://www.wpbeaverbuilder.com/constant-contact-auth/">%s</a>', __( 'Code Generator', 'fl-builder' ) ),
				'<br />'
			),
			'preview'     => array(
				'type' => 'none',
			),
		));

		return ob_get_clean();
	}

	/**
	 * Render the markup for service specific fields.
	 *
	 * @since 1.5.4
	 * @param string $account The name of the saved account.
	 * @param object $settings Saved module settings.
	 * @return array {
	 *      @type bool|string $error The error message or false if no error.
	 *      @type string $html The field markup.
	 * }
	 */
	public function render_fields( $account, $settings ) {
		$account_data  = $this->get_account_data( $account );
		$refresh_token = $account_data['refresh_token'];
		$access_token  = $account_data['access_token'];
		$url           = $this->api_url . 'contact_lists?include_count=true&status=active&include_membership_count=all';
		$args          = array(
			'headers' => array(
				'Content-Type'  => 'application/json',
				'Authorization' => 'Bearer ' . $access_token,
			),
		);
		$request       = json_decode( wp_remote_retrieve_body( wp_remote_get( $url, $args ) ) );
		$response      = array(
			'error' => false,
			'html'  => '',
		);

		if ( is_array( $request ) && isset( $request[0] ) && isset( $request[0]->error_message ) ) {
			/* translators: %s: error */
			$response['error'] = sprintf( __( 'Error: Could not connect to Constant Contact. %s', 'fl-builder' ), $request[0]->error_message );
		} else {
			$response['html'] = $this->render_list_field( $request, $settings );
		}

		return $response;
	}

	/**
	 * Render markup for the list field.
	 *
	 * @since 1.5.4
	 * @param array $lists List data from the API.
	 * @param object $settings Saved module settings.
	 * @return string The markup for the list field.
	 * @access private
	 */
	private function render_list_field( $lists, $settings ) {
		ob_start();

		$options = array(
			'' => __( 'Choose...', 'fl-builder' ),
		);

		foreach ( $lists->lists as $list ) {
			$options[ $list->list_id ] = esc_attr( $list->name );
		}

		FLBuilder::render_settings_field( 'list_id', array(
			'row_class' => 'fl-builder-service-field-row',
			'class'     => 'fl-builder-service-list-select',
			'type'      => 'select',
			'label'     => _x( 'List', 'An email list from a third party provider.', 'fl-builder' ),
			'options'   => $options,
			'preview'   => array(
				'type' => 'none',
			),
		), $settings);

		return ob_get_clean();
	}

	/**
	 * Subscribe an email address to Constant Contact.
	 *
	 * @since 1.5.4
	 * @param object $settings A module settings object.
	 * @param string $email The email to subscribe.
	 * @param string $name Optional. The full name of the person subscribing.
	 * @return array {
	 *      @type bool|string $error The error message or false if no error.
	 * }
	 */
	public function subscribe( $settings, $email, $name = false ) {
		$account_data = $this->get_account_data( $settings->service_account );
		$response     = array(
			'error' => false,
		);

		if ( ! $account_data ) {
			$response['error'] = __( 'There was an error subscribing to Constant Contact. The account is no longer connected.', 'fl-builder' );
		} else {

			$refresh_token = $account_data['refresh_token'];
			$access_token  = $account_data['access_token'];
			$url           = $this->api_url . 'contacts';

			$args = array(
				'data_format' => 'body',
				'headers'     => array(
					'Content-Type'  => 'application/json',
					'Authorization' => 'Bearer ' . $access_token,
				),
				'body'        => array(
					'email_address'    => array(
						'address'            => $email,
						'permission_to_send' => 'implicit',
					),
					'list_memberships' => [ $settings->list_id ],
					'create_source'    => 'Account',
				),
			);
			if ( $name ) {

				$names = explode( ' ', $name );

				if ( isset( $names[0] ) ) {
					$args['body']['first_name'] = $names[0];
				}
				if ( isset( $names[1] ) ) {
					$args['body']['last_name'] = $names[1];
				}
			}
			$args['body']  = json_encode( $args['body'] );
			$request       = wp_remote_post( $url, $args );
			$response_code = wp_remote_retrieve_response_code( $request );

			switch ( $response_code ) {
				case 201: // 201 = subscribed
					break;
				case 401:
					// access token invalid!
					$this->update_tokens( $settings );
					$response['error'] = __( 'Please try again', 'fl-builder' );
					break;
				case 409:
					$response['error'] = __( 'You are either already subscribed to this list or you have unsubscribed in the past', 'fl-builder' );
					break;
				default:
					$response['error'] = __( 'An unknown error has occurred', 'fl-builder' );
					break;
			}
		}

		return $response;
	}

	private function update_tokens( $settings ) {

		$account_data  = $this->get_account_data( $settings->service_account );
		$services      = get_option( '_fl_builder_services' );
		$refresh_token = $account_data['refresh_token'];
		$access_token  = $account_data['access_token'];
		$client_id     = $account_data['client_id'];
		$client_secret = $account_data['client_secret'];

		$url           = sprintf( 'https://authz.constantcontact.com/oauth2/default/v1/token?refresh_token=%s&grant_type=refresh_token', $refresh_token );
		$args          = array(
			'headers' => array(
				'Content-Type'  => 'application/x-www-form-urlencoded',
				'Authorization' => 'Basic ' . base64_encode( sprintf( '%s:%s', $client_id, $client_secret ) ),
			),
		);
		$request       = wp_remote_post( $url, $args );
		$response_code = wp_remote_retrieve_response_code( $request );
		if ( 200 === $response_code ) {
			$body = json_decode( wp_remote_retrieve_body( $request ) );
			$services[ $this->id ][ $settings->service_account ]['access_token']  = $body->access_token;
			$services[ $this->id ][ $settings->service_account ]['refresh_token'] = $body->refresh_token;
			update_option( '_fl_builder_services', $services );
		}
	}
}
