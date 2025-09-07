<?php

/**
 * Class for running global term queries. This is necessary
 * for term queries to work with field connections since
 * WP_Term_Query is not global like WP_Query.
 *
 * @since 2.9
 */
final class FLBuilderLoopTermQuery {

	/**
	 * @since 2.9
	 * @var array
	 */
	public $terms = [];

	/**
	 * @since 2.9
	 * @var int
	 */
	private $_current_term = -1;

	/**
	 * @since 2.9
	 * @var int
	 */
	private $_term_count = 0;

	/**
	 * @since 2.9
	 * @param array $args
	 */
	public function __construct( $args = [] ) {
		$this->_query( $args );
	}

	/**
	 * @since 2.9
	 * @return bool
	 */
	public function have_terms() {
		if ( $this->_term_count && $this->_current_term + 1 < $this->_term_count ) {
			return true;
		}

		$this->_current_term = -1;
		$this->_term_count   = 0;

		return false;
	}

	/**
	 * @since 2.9
	 * @return WP_Term
	 */
	public function the_term() {
		global $fl_term;

		$this->_current_term++;
		$this->terms = array_values( $this->terms );
		$fl_term     = $this->terms[ $this->_current_term ];

		return $fl_term;
	}

	/**
	 * @since 2.9
	 * @return void
	 */
	public function reset_term_data() {
		$this->_term_count   = is_array( $this->terms ) ? count( $this->terms ) : 0;
		$this->_current_term = -1;
	}

	/**
	 * @since 2.9
	 * @param array $args
	 * @return WP_Term_Query
	 */
	private function _query( $args = [] ) {
		global $fl_term_query;

		$fl_term_query = new WP_Term_Query( $args );

		$this->terms         = $fl_term_query->terms;
		$this->_term_count   = is_array( $this->terms ) ? count( $this->terms ) : 0;
		$this->_current_term = -1;

		return $fl_term_query;
	}
}
