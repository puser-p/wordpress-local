<?php

/**
 * Handles undo/redo history for the builder.
 */
final class FLBuilderHistoryManager {

	/**
	 * Initialize hooks.
	 */
	static public function init() {
		if ( ! defined( 'FL_BUILDER_HISTORY_STATES' ) ) {
			define( 'FL_BUILDER_HISTORY_STATES', 20 );
		}

		// Filters
		add_filter( 'fl_builder_ui_js_config', __CLASS__ . '::ui_js_config' );
		add_filter( 'fl_builder_main_menu', __CLASS__ . '::main_menu_config' );

		// Actions
		add_action( 'init', __CLASS__ . '::register_post_type' );
		add_action( 'fl_builder_init_ui', __CLASS__ . '::init_states' );
		add_action( 'template_redirect', __CLASS__ . '::delete_states_for_request' );
	}

	/**
	 * Adds history data to the UI JS config.
	 */
	static public function ui_js_config( $config ) {
		$labels = array(
			// Layout
			'draft_created'           => __( 'Draft Created', 'fl-builder' ),
			'changes_discarded'       => __( 'Changes Discarded', 'fl-builder' ),
			'revision_restored'       => __( 'Revision Restored', 'fl-builder' ),

			// Save settings
			'row_edited'              => esc_attr__( 'Row Edited', 'fl-builder' ),
			'column_edited'           => esc_attr__( 'Column Edited', 'fl-builder' ),
			/* translators: %s: Module name */
			'module_edited'           => esc_attr_x( '%s Edited', 'Module name', 'fl-builder' ),
			'global_settings_edited'  => esc_attr__( 'Global Settings Edited', 'fl-builder' ),
			'layout_settings_edited'  => esc_attr__( 'Layout Settings Edited', 'fl-builder' ),

			// Add nodes
			'row_added'               => esc_attr__( 'Row Added', 'fl-builder' ),
			'columns_added'           => esc_attr__( 'Columns Added', 'fl-builder' ),
			'column_added'            => esc_attr__( 'Column Added', 'fl-builder' ),
			/* translators: %s: Module name */
			'module_added'            => esc_attr_x( '%s Added', 'Module name', 'fl-builder' ),

			// Delete nodes
			'row_deleted'             => esc_attr__( 'Row Deleted', 'fl-builder' ),
			'column_deleted'          => esc_attr__( 'Column Deleted', 'fl-builder' ),
			/* translators: %s: Module name */
			'module_deleted'          => esc_attr_x( '%s Deleted', 'Module name', 'fl-builder' ),

			// Duplicate nodes
			'row_duplicated'          => esc_attr__( 'Row Duplicated', 'fl-builder' ),
			'column_duplicated'       => esc_attr__( 'Column Duplicated', 'fl-builder' ),
			/* translators: %s: Module name */
			'module_duplicated'       => esc_attr_x( '%s Duplicated', 'Module name', 'fl-builder' ),

			// Move nodes
			'row_moved'               => esc_attr__( 'Row Moved', 'fl-builder' ),
			'column_moved'            => esc_attr__( 'Column Moved', 'fl-builder' ),
			/* translators: %s: Module name */
			'module_moved'            => esc_attr_x( '%s Moved', 'Module name', 'fl-builder' ),

			// Resize nodes
			'row_resized'             => esc_attr__( 'Row Resized', 'fl-builder' ),
			'columns_resized'         => esc_attr__( 'Columns Resized', 'fl-builder' ),
			'column_resized'          => esc_attr__( 'Column Resized', 'fl-builder' ),

			// Templates
			'template_applied'        => esc_attr__( 'Template Applied', 'fl-builder' ),
			'row_template_applied'    => esc_attr__( 'Row Template Added', 'fl-builder' ),
			'column_template_applied' => esc_attr__( 'Column Template Added', 'fl-builder' ),
			'module_template_applied' => esc_attr__( 'Module Template Added', 'fl-builder' ),
			'history_disabled'        => __( 'Undo/Redo history is currently disabled.', 'fl-builder' ),
		);

		$hooks = array(
			// Layout
			'didDiscardChanges'              => 'changes_discarded',
			'didRestoreRevisionComplete'     => 'revision_restored',

			// Save settings
			'didSaveRowSettingsComplete'     => 'row_edited',
			'didSaveColumnSettingsComplete'  => 'column_edited',
			'didSaveModuleSettingsComplete'  => 'module_edited',
			'didSaveGlobalSettingsComplete'  => 'global_settings_edited',
			'didSaveLayoutSettingsComplete'  => 'layout_settings_edited',

			// Add nodes
			'didAddRow'                      => 'row_added',
			'didAddColumnGroup'              => 'columns_added',
			'didAddColumn'                   => 'column_added',
			'didAddModule'                   => 'module_added',

			// Delete nodes
			'didDeleteRow'                   => 'row_deleted',
			'didDeleteColumn'                => 'column_deleted',
			'didDeleteModule'                => 'module_deleted',

			// Duplicate nodes
			'didDuplicateRow'                => 'row_duplicated',
			'didDuplicateColumn'             => 'column_duplicated',
			'didDuplicateModule'             => 'module_duplicated',

			// Move nodes
			'didMoveRow'                     => 'row_moved',
			'didMoveColumn'                  => 'column_moved',
			'didMoveModule'                  => 'module_moved',

			// Resize nodes
			'didResizeRow'                   => 'row_resized',
			'didResetRowWidth'               => 'row_resized',
			'didResizeColumn'                => 'column_resized',
			'didResetColumnWidthsComplete'   => 'columns_resized',

			// Templates
			'didApplyTemplateComplete'       => 'template_applied',
			'didApplyRowTemplateComplete'    => 'row_template_applied',
			'didApplyColTemplateComplete'    => 'column_template_applied',
			'didApplyModuleTemplateComplete' => 'module_template_applied',

			// Global Nodes
			'didUnlinkGlobalRow'             => 'global_row_unlinked',
			'didUnlinkGlobalColumn'          => 'global_column_unlinked',
			'didUnlinkGlobalModule'          => 'global_module_unlinked',
		);

		$config['history'] = array(
			'states'   => self::get_states_data(),
			'position' => self::get_position(),
			'hooks'    => $hooks,
			'labels'   => $labels,
			'enabled'  => self::get_states_max() > 0 ? true : false,
		);

		return $config;
	}

	/**
	 * Adds history data to the main menu config.
	 */
	static public function main_menu_config( $config ) {
		$config['main']['items'][36] = array(
			'label' => __( 'History', 'fl-builder' ),
			'type'  => 'view',
			'view'  => 'history',
		);

		$config['history'] = array(
			'name'       => __( 'History', 'fl-builder' ),
			'isShowing'  => false,
			'isRootView' => false,
			'items'      => array(),
		);

		return $config;
	}

	/**
	 * Registers the post type for storing history.
	 */
	static public function register_post_type() {
		register_post_type( 'fl-builder-history', [
			'public'              => false,
			'publicly_queryable'  => false,
			'exclude_from_search' => true,
			'show_in_rest'        => false,
		] );
	}

	/**
	 * Inserts the fl-builder-history post that stores
	 * this layout's history.
	 */
	static private function insert_history_post() {
		$layout_post_id  = FLBuilderModel::get_post_id();
		$history_post_id = wp_insert_post( array(
			'post_title'  => $layout_post_id,
			'post_type'   => 'fl-builder-history',
			'post_status' => 'publish',
		) );

		update_post_meta( $history_post_id, '_fl_builder_layout_post_id', $layout_post_id );

		return $history_post_id;
	}

	/**
	 * Gets the post ID for the fl-builder-history post that
	 * stores this layout's history.
	 */
	static private function get_history_post_id() {
		$layout_post_id = FLBuilderModel::get_post_id();
		$query          = new WP_Query( [
			'post_type'  => 'fl-builder-history',
			'meta_query' => [
				[
					'key'   => '_fl_builder_layout_post_id',
					'value' => $layout_post_id,
				],
			],
		] );

		if ( empty( $query->posts ) ) {
			return self::insert_history_post( $layout_post_id );
		}

		return $query->posts[0]->ID;
	}

	/**
	 * Adds an initial state if no states exist
	 * when the builder is active.
	 */
	static public function init_states() {
		if ( self::get_states_max() > 0 && ! isset( $_GET['nohistory'] ) ) {
			if ( empty( self::get_states_data() ) ) {
				self::save_current_state( 'draft_created' );
			}
		} else {
			self::delete_states();
		}
		self::delete_legacy_states();
	}

	/**
	 * Returns the max states that can be saved.
	 */
	static private function get_states_max() {
		return (int) apply_filters( 'fl_history_states_max', FL_BUILDER_HISTORY_STATES );
	}

	/**
	 * Returns the saved layout for a single state.
	 */
	static public function get_state( $position ) {
		$history_post_id = self::get_history_post_id();
		return get_post_meta( $history_post_id, "_fl_builder_history_state_{$position}", true );
	}

	/**
	 * Saves layout data for a single state.
	 */
	static public function set_state( $state, $position ) {
		$history_post_id = self::get_history_post_id();
		update_post_meta( $history_post_id, "_fl_builder_history_state_{$position}", $state );
	}

	/**
	 * Deletes a history state at the given position.
	 */
	static public function delete_state( $position ) {
		$history_post_id = self::get_history_post_id();
		delete_post_meta( $history_post_id, "_fl_builder_history_state_$position" );
		self::delete_state_data( $position );
		self::renumber_states();
	}

	/**
	 * Deletes all history states for a post.
	 */
	static public function delete_states() {
		global $wpdb;

		$history_post_id = self::get_history_post_id();
		$wpdb->query( $wpdb->prepare( "DELETE FROM {$wpdb->postmeta} WHERE meta_key LIKE %s AND post_id = %d", '%_fl_builder_history_state%', $history_post_id ) );

		self::set_position( 0 );
		self::delete_states_data();
	}

	/**
	 * Deletes old history states that were stored in the layout's
	 * post meta instead of a CPT.
	 */
	static public function delete_legacy_states() {
		global $wpdb;

		$layout_post_id = FLBuilderModel::get_post_id();

		if ( metadata_exists( 'post', $layout_post_id, '_fl_builder_history_position' ) ) {
			$wpdb->query( $wpdb->prepare( "DELETE FROM {$wpdb->postmeta} WHERE meta_key LIKE %s AND post_id = %d", '%_fl_builder_history%', $layout_post_id ) );
		}
	}

	/**
	 * Deletes all history states for a "nohistory" request.
	 */
	static public function delete_states_for_request() {
		if ( FLBuilderModel::is_builder_active() && isset( $_GET['nohistory'] ) && isset( $_GET['delete'] ) ) {
			self::delete_states();
		}
	}

	/**
	 * Renumbers state entries in the database.
	 */
	static public function renumber_states() {
		global $wpdb;

		$history_post_id = self::get_history_post_id();
		$states          = $wpdb->get_results( $wpdb->prepare( "SELECT meta_id FROM {$wpdb->postmeta} WHERE meta_key LIKE %s AND post_id = %d ORDER BY meta_id", '%_fl_builder_history_state%', $history_post_id ) );

		foreach ( $states as $i => $state ) {
			$wpdb->update(
				$wpdb->postmeta,
				[
					'meta_key' => "_fl_builder_history_state_{$i}",
				],
				[
					'post_id' => $history_post_id,
					'meta_id' => $state->meta_id,
				],
				[ '%s' ],
				[ '%d', '%d' ]
			);
		}
	}

	/**
	 * Updates state data for a single state. This is only the data
	 * needed to show states in the UI. Not the layout data.
	 */
	static public function set_state_data( $state, $position ) {
		$history_post_id = self::get_history_post_id();
		$data            = array_slice( self::get_states_data(), 0, $position );

		$data[] = [
			'label'      => $state['label'],
			'moduleType' => isset( $state['module_type'] ) ? $state['module_type'] : null,
		];

		update_post_meta( $history_post_id, '_fl_builder_history_data', $data );
	}

	/**
	 * Deletes the state data for a single state.
	 */
	static public function delete_state_data( $position ) {
		$history_post_id = self::get_history_post_id();
		$data            = self::get_states_data();

		unset( $data[ $position ] );
		update_post_meta( $history_post_id, '_fl_builder_history_data', array_values( $data ) );
	}

	/**
	 * Returns only the data necessary for working with history,
	 * NOT the layout data itself.
	 */
	static public function get_states_data() {
		$history_post_id = self::get_history_post_id();
		$data            = get_post_meta( $history_post_id, '_fl_builder_history_data', true );

		if ( ! $data ) {
			return [];
		}

		return $data;
	}

	/**
	 * Deletes all the states data for this layout.
	 */
	static public function delete_states_data() {
		$history_post_id = self::get_history_post_id();
		update_post_meta( $history_post_id, '_fl_builder_history_data', [] );
	}

	/**
	 * Returns the current history position.
	 */
	static public function get_position() {
		$history_post_id = self::get_history_post_id();
		$position        = get_post_meta( $history_post_id, '_fl_builder_history_position', true );
		return $position ? $position : 0;
	}

	/**
	 * Saves the current history position to post meta.
	 */
	static public function set_position( $position ) {
		$history_post_id = self::get_history_post_id();
		update_post_meta( $history_post_id, '_fl_builder_history_position', $position );
	}

	/**
	 * Appends the current layout state to the builder's
	 * history post meta. Pops off any trailing states if
	 * the last state isn't the current.
	 */
	static public function save_current_state( $label, $module_type = null ) {
		$data     = self::get_states_data();
		$position = count( array_slice( $data, 0, self::get_position() + 1 ) );
		$state    = array(
			'label'       => $label,
			'module_type' => $module_type,
			'nodes'       => FLBuilderModel::get_layout_data( 'draft' ),
			'settings'    => array(
				'global' => FLBuilderModel::get_global_settings(),
				'layout' => FLBuilderModel::get_layout_settings( 'draft' ),
			),
		);

		if ( $position + 1 > self::get_states_max() ) {
			$position -= 1;
			self::delete_state( 0 );
		} elseif ( $position < count( $data ) ) {
			for ( $i = $position; $i < count( $data ); $i++ ) {
				self::delete_state( $i );
			}
		}

		self::set_state( $state, $position );
		self::set_state_data( $state, $position );
		self::set_position( $position );

		return array(
			'states'   => self::get_states_data(),
			'position' => self::get_position(),
		);
	}

	/**
	 * Renders the layout for the state at the given position.
	 */
	static public function render_state( $new_position = 0 ) {
		$position = self::get_position();
		$data     = self::get_states_data();

		if ( 'prev' === $new_position ) {
			$position = $position <= 0 ? 0 : $position - 1;
		} elseif ( 'next' === $new_position ) {
			$position = $position >= count( $data ) - 1 ? count( $data ) - 1 : $position + 1;
		} else {
			$position = $new_position < 0 || ! is_numeric( $new_position ) ? 0 : $new_position;
		}

		$state = self::get_state( $position );

		if ( ! $state ) {
			return array(
				'error' => true,
			);
		}

		self::set_position( $position );
		FLBuilderModel::save_global_settings( (array) $state['settings']['global'] );
		FLBuilderModel::update_layout_settings( (array) $state['settings']['layout'], 'draft' );
		FLBuilderModel::update_layout_data( (array) $state['nodes'], 'draft' );

		return array(
			'position' => $position,
			'config'   => FLBuilderUISettingsForms::get_node_js_config(),
			'layout'   => FLBuilderAJAXLayout::render(),
			'settings' => array(
				'global' => FLBuilderModel::get_global_settings(),
				'layout' => FLBuilderModel::get_layout_settings( 'draft' ),
			),
			'newNodes' => FLBuilderModel::get_layout_data(),
		);
	}
}

FLBuilderHistoryManager::init();
