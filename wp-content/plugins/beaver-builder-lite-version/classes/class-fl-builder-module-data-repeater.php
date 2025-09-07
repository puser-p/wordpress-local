<?php

/**
 * Helper class for module data repeater.
 *
 * @since 2.9
 */
final class FLBuilderModuleDataRepeater {

	/**
	 * The data source for retrieving information
	 *
	 * @since 2.9
	 * @access private
	 * @var string
	 */
	private $data_source;

	/**
	 * Module Settings.
	 *
	 * @since 2.9
	 * @access private
	 * @var array $settings
	 */
	private $settings;

	/**
	 * Query data associated with data source
	 *
	 * @since 2.9
	 * @access private
	 * @var object $query
	 */
	private $query;

	/**
	 * The initial global post for this page before the
	 * query is run. Used to reset the post on cleanup.
	 *
	 * @since 2.9
	 * @access private
	 * @var object $initial_post
	 */
	private $initial_post;

	/**
	 * Repeater constructor for initializing the class instance with settings.
	 *
	 * @since 2.9
	 * @param array $settings An array of settings for this instance.
	 * @return void
	 */
	public function __construct( $settings ) {

		$this->settings = $settings;
		$this->_set_data_source();
		$this->_load_data();
	}

	/**
	 * Set the data source based on selected settings and ACF availability.
	 *
	 * @since 2.9
	 * @return void
	 */
	private function _set_data_source() {

		if ( ! isset( $this->settings->data_source ) ) {
			$this->data_source = 'custom_query';
		} elseif ( 'acf_repeater' === $this->settings->data_source && ! function_exists( 'the_field' ) ) {
			$this->data_source = 'custom_query';
		} elseif ( 'acf_relationship' === $this->settings->data_source ) {
			$this->data_source = 'custom_query';
		} else {
			$this->data_source = $this->settings->data_source;
		}
		$this->data_source = apply_filters( 'fl_builder_module_data_repeater_data_source', $this->data_source, $this->settings );
	}

	/**
	 * Load data based on the specified data source.
	 *
	 * @since 2.9
	 * @access private
	 * @return void
	 */
	private function _load_data() {
		global $post;
		switch ( $this->data_source ) {
			case 'custom_query':
			case 'main_query':
				$this->initial_post = $post;
				$this->query        = FLBuilderLoop::query( $this->settings );
				do_action( 'fl_builder_module_data_repeater_before_posts', $this );
				break;
			case 'taxonomy_query':
				$this->query = FLBuilderLoop::query( $this->settings );
				break;
			default:
				$this->query = apply_filters( 'fl_builder_module_data_repeater_query', $this->query, $this->settings );
				break;
		}
	}

	/**
	 * Check if the current data source has items.
	 *
	 * @since 2.9
	 * @return bool True if items exist, false otherwise.
	 */
	public function has_items() {

		switch ( $this->data_source ) {
			case 'custom_query':
			case 'main_query':
				return $this->query->have_posts();
			break;

			case 'taxonomy_query':
				return $this->query->have_terms();
			break;

			case 'acf_repeater':
				return have_rows( $this->settings->acf_repeater_key );
			break;
		}
	}

	/**
	 * Setup the current item based on the data source.
	 *
	 * @since 2.9
	 * @return void
	 */
	public function setup_item() {

		switch ( $this->data_source ) {

			case 'custom_query':
			case 'main_query':
				$this->query->the_post();
				break;

			case 'taxonomy_query':
				$this->query->the_term();
				break;

			case 'acf_repeater':
				the_row();
				break;
		}
	}

	/**
	 * Checks if the current data source supports pagination.
	 *
	 * @since 2.9
	 * @return bool Whether pagination is supported for the current data source.
	 */
	public function can_paginate() {

		switch ( $this->data_source ) {
			case 'custom_query':
			case 'main_query':
				return $this->has_pages();
			break;
		}
		return false;
	}

	/**
	 * Handle pagination based on the selected data source.
	 *
	 * @since 2.9
	 * @return void
	 */
	public function pagination() {

		switch ( $this->data_source ) {
			case 'custom_query':
			case 'main_query':
				FLBuilderLoop::pagination( $this->query );
				break;
		}
	}

	/**
	 * Checks if the query has more than one page.
	 *
	 * @since 2.10
	 * @return bool
	 */
	public function has_pages() {

		return isset( $this->query->max_num_pages ) && $this->query->max_num_pages > 1;
	}

	/**
	 * Cleanup function to reset post data after custom or main query.
	 *
	 * @since 2.9
	 * @return void
	 */
	public function cleanup() {

		switch ( $this->data_source ) {
			case 'custom_query':
			case 'main_query':
				wp_reset_postdata();
				setup_postdata( $this->initial_post );
				do_action( 'fl_builder_module_data_repeater_after_posts', $this );
				break;
			case 'taxonomy_query':
				$this->query->reset_term_data();
				break;
		}
	}
}
