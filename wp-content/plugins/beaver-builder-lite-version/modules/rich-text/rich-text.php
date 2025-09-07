<?php

/**
 * @class FLRichTextModule
 */
class FLRichTextModule extends FLBuilderModule {

	/**
	 * @method __construct
	 */
	public function __construct() {
		parent::__construct(array(
			'name'            => __( 'Text Editor', 'fl-builder' ),
			'description'     => __( 'A WYSIWYG text editor.', 'fl-builder' ),
			'category'        => __( 'Basic', 'fl-builder' ),
			'icon'            => 'text.svg',
			'partial_refresh' => true,
			'include_wrapper' => false,
			'element_setting' => false,
		));
	}
}

/**
 * Register the module and its form settings.
 */
FLBuilder::register_module('FLRichTextModule', array(
	'general' => array( // Tab
		'title'    => __( 'General', 'fl-builder' ), // Tab title
		'sections' => array( // Tab Sections
			'general' => array( // Section
				'title'  => '', // Section Title
				'fields' => array( // Section Fields
					'text' => array(
						'type'        => 'editor',
						'label'       => '',
						'rows'        => 13,
						'wpautop'     => false,
						'preview'     => array(
							'type'     => 'text',
							'selector' => '{node}.fl-rich-text, .fl-rich-text', // Use {node}.class to support v2 markup
						),
						'connections' => array( 'string' ),
					),
				),
			),
		),
	),
	'style'   => array( // Tab
		'title'    => __( 'Style', 'fl-builder' ), // Tab title
		'sections' => array( // Tab Sections
			'style' => array( // Section
				'title'  => '', // Section Title
				'fields' => array( // Section Fields
					'color'      => array(
						'type'        => 'color',
						'connections' => array( 'color' ),
						'label'       => __( 'Color', 'fl-builder' ),
						'show_reset'  => true,
						'show_alpha'  => true,
						'preview'     => array(
							'type'      => 'css',
							'selector'  => '{node} .fl-rich-text, {node} .fl-rich-text *, {node}.fl-module-rich-text.fl-rich-text, {node}.fl-module-rich-text.fl-rich-text *',  // Use {node}.class to support v2 markup
							'property'  => 'color',
						),
					),
					'typography' => array(
						'type'       => 'typography',
						'label'      => __( 'Typography', 'fl-builder' ),
						'responsive' => true,
						'preview'    => array(
							'type'     => 'css',
							'selector' => '.fl-rich-text, .fl-rich-text *:not(b, strong), {node}.fl-module-rich-text.fl-rich-text, {node}.fl-module-rich-text.fl-rich-text *:not(b, strong)',  // Use {node}.class to support v2 markup
						),
					),
				),
			),
		),
	),
));
