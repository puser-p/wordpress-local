<?php
/**
 * The Events class.
 *
 * @package Forminator
 */

/**
 * Abstract class for Mixpanel Events.
 */
abstract class Events {

	/**
	 * Initialize class.
	 *
	 * @since 1.27.0
	 */
	public static function init() {
	}

	/**
	 * Get mixpanel instance.
	 *
	 * @return Mixpanel
	 *
	 * @since 1.27.0
	 */
	protected static function tracker() {
		return Forminator_Mixpanel::get_instance()->tracker();
	}

	/**
	 * Tracking event
	 *
	 * @param string $event Event.
	 * @param array  $properties Properties.
	 *
	 * @return void
	 *
	 * @since 1.27.0
	 */
	public static function track_event( $event, $properties ) {
		self::tracker()->track(
			$event,
			$properties
		);
	}

	/**
	 * Fetch Settings value
	 *
	 * @param array  $settings Settings.
	 * @param string $key Key name.
	 * @param string $value Value.
	 *
	 * @return string|void
	 * @since 1.27.0
	 */
	protected static function settings_value( $settings, $key, $value = '' ) {
		if ( empty( $settings ) ) {
			return;
		}

		if ( ! empty( $settings[ $key ] ) ) {
			return esc_html( $settings[ $key ] );
		}

		return $value;
	}
}
