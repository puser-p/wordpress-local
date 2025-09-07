<?php

FLBlock::register( 'test-block', [
	'name'        => __( 'Test', 'fl-builder' ),
	'description' => __( 'Test block for next-gen module rendering.', 'fl-builder' ),
	'category'    => __( 'Basic', 'fl-builder' ),
	'icon'        => 'layout.svg',
	'url'         => FL_BUILDER_URL . 'blocks/test-block/',
	'dir'         => FL_BUILDER_DIR . 'blocks/test-block/',
	'form'        => [
		'content' => [
			'title'    => __( 'Content', 'fl-builder' ),
			'sections' => [
				'general' => [
					'title'  => '',
					'fields' => [
						'content' => [
							'type'    => 'textarea',
							'label'   => __( 'Content', 'fl-builder' ),
							'preview' => array(
								'type'     => 'text',
								'selector' => '{node}.fl-test-block-content',
							),
						],
						'color'   => [
							'type'       => 'color',
							'label'      => __( 'Color', 'fl-builder' ),
							'show_reset' => true,
							'show_alpha' => true,
							'preview'    => array(
								'type'     => 'css',
								'selector' => '{node}',
								'property' => 'color',
							),
						],
					],
				],
			],
		],
	],
] );
