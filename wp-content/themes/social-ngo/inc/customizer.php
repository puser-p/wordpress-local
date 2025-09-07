<?php
/**
 * Social NGO: Customizer
 *
 * @subpackage Social NGO
 * @since 1.0
 */

use WPTRT\Customize\Section\Social_NGO_Button;

add_action( 'customize_register', function( $manager ) {

	$manager->register_section_type( Social_NGO_Button::class );

	$manager->add_section(
		new Social_NGO_Button( $manager, 'social_ngo_pro', [
			'title' => __( 'Social NGO Pro', 'social-ngo' ),
			'priority' => 0,
			'button_text' => __( 'Go Pro', 'social-ngo' ),
			'button_url'  => esc_url( 'https://www.luzuk.com/products/ngo-wp-theme', 'social-ngo')
		] )
	);

} );

// Load the JS and CSS.
add_action( 'customize_controls_enqueue_scripts', function() {

	$version = wp_get_theme()->get( 'Version' );

	wp_enqueue_script(
		'social-ngo-customize-section-button',
		get_theme_file_uri( 'vendor/wptrt/customize-section-button/public/js/customize-controls.js' ),
		[ 'customize-controls' ],
		$version,
		true
	);

	wp_enqueue_style(
		'social-ngo-customize-section-button',
		get_theme_file_uri( 'vendor/wptrt/customize-section-button/public/css/customize-controls.css' ),
		[ 'customize-controls' ],
 		$version
	);

} );

function social_ngo_customize_register( $wp_customize ) {

	$wp_customize->add_setting('social_ngo_logo_size',array(
		'sanitize_callback'	=> 'social_ngo_sanitize_float'
	));
	$wp_customize->add_control('social_ngo_logo_size',array(
		'label' => __('Logo Size','social-ngo'),
		'type'	=> 'range',
		'section' => 'title_tagline'
	));

	$wp_customize->add_setting('social_ngo_logo_padding',array(
		'sanitize_callback'	=> 'esc_html'
	));
	$wp_customize->add_control('social_ngo_logo_padding',array(
		'label' => __('Logo Margin','social-ngo'),
		'section' => 'title_tagline'
	));

	$wp_customize->add_setting('social_ngo_logo_top_padding',array(
		'default' => '',
		'sanitize_callback'	=> 'social_ngo_sanitize_float'
	));
	$wp_customize->add_control('social_ngo_logo_top_padding',array(
		'type' => 'number',
		'description' => __('Top','social-ngo'),
		'section' => 'title_tagline',
	));

	$wp_customize->add_setting('social_ngo_logo_bottom_padding',array(
		'default' => '',
		'sanitize_callback'	=> 'social_ngo_sanitize_float'
	));
	$wp_customize->add_control('social_ngo_logo_bottom_padding',array(
		'type' => 'number',
		'description' => __('Bottom','social-ngo'),
		'section' => 'title_tagline',
	));

	$wp_customize->add_setting('social_ngo_logo_left_padding',array(
		'default' => '',
		'sanitize_callback'	=> 'social_ngo_sanitize_float'
	));
	$wp_customize->add_control('social_ngo_logo_left_padding',array(
		'type' => 'number',
		'description' => __('Left','social-ngo'),
		'section' => 'title_tagline',
	));

	$wp_customize->add_setting('social_ngo_logo_right_padding',array(
		'default' => '',
		'sanitize_callback'	=> 'social_ngo_sanitize_float'
 	));
 	$wp_customize->add_control('social_ngo_logo_right_padding',array(
		'type' => 'number',
		'description' => __('Right','social-ngo'),
		'section' => 'title_tagline',
    ));

	$wp_customize->add_setting('social_ngo_show_site_title',array(
		'default' => true,
		'sanitize_callback'	=> 'social_ngo_sanitize_checkbox'
	));
	$wp_customize->add_control('social_ngo_show_site_title',array(
		'type' => 'checkbox',
		'label' => __('Show / Hide Site Title','social-ngo'),
		'section' => 'title_tagline'
	));

	$wp_customize->add_setting( 'social_ngo_site_title_color', array(
		'default' => '',
		'sanitize_callback' => 'sanitize_hex_color'
	));
	$wp_customize->add_control( new WP_Customize_Color_Control( $wp_customize, 'social_ngo_site_title_color', array(
		'label' => 'Title Color',
		'section' => 'title_tagline',
	)));

	$wp_customize->add_setting('social_ngo_show_tagline',array(
		'default' => true,
		'sanitize_callback'	=> 'social_ngo_sanitize_checkbox'
	));
	$wp_customize->add_control('social_ngo_show_tagline',array(
		'type' => 'checkbox',
		'label' => __('Show / Hide Site Tagline','social-ngo'),
		'section' => 'title_tagline'
	));

	$wp_customize->add_setting( 'social_ngo_site_tagline_color', array(
		'default' => '',
		'sanitize_callback' => 'sanitize_hex_color'
	));
	$wp_customize->add_control( new WP_Customize_Color_Control( $wp_customize, 'social_ngo_site_tagline_color', array(
		'label' => 'Tagline Color',
		'section' => 'title_tagline',
	)));

	$wp_customize->add_panel( 'social_ngo_panel_id', array(
		'priority' => 10,
		'capability' => 'edit_theme_options',
		'theme_supports' => '',
		'title' => __( 'Theme Settings', 'social-ngo' ),
		'description' => __( 'Description of what this panel does.', 'social-ngo' ),
	) );

	$wp_customize->add_section( 'social_ngo_theme_options_section', array(
    	'title'      => __( 'General Settings', 'social-ngo' ),
		'priority'   => 30,
		'panel' => 'social_ngo_panel_id'
	) );

	$wp_customize->add_setting('social_ngo_theme_options',array(
		'default' => 'One Column',
		'sanitize_callback' => 'social_ngo_sanitize_choices'
	));
	$wp_customize->add_control('social_ngo_theme_options',array(
		'type' => 'select',
		'label' => __('Blog Page Sidebar Layout','social-ngo'),
		'section' => 'social_ngo_theme_options_section',
		'choices' => array(
		   'Left Sidebar' => __('Left Sidebar','social-ngo'),
		   'Right Sidebar' => __('Right Sidebar','social-ngo'),
		   'One Column' => __('One Column','social-ngo'),
		   'Grid Layout' => __('Grid Layout','social-ngo')
		),
	));

	$wp_customize->add_setting('social_ngo_single_post_sidebar',array(
		'default' => 'Right Sidebar',
		'sanitize_callback' => 'social_ngo_sanitize_choices'
	));
	$wp_customize->add_control('social_ngo_single_post_sidebar',array(
        'type' => 'select',
        'label' => __('Single Post Sidebar Layout','social-ngo'),
        'section' => 'social_ngo_theme_options_section',
        'choices' => array(
            'Left Sidebar' => __('Left Sidebar','social-ngo'),
            'Right Sidebar' => __('Right Sidebar','social-ngo'),
            'One Column' => __('One Column','social-ngo')
        ),
	));

	$wp_customize->add_setting('social_ngo_page_sidebar',array(
		'default' => 'One Column',
		'sanitize_callback' => 'social_ngo_sanitize_choices'
	));
	$wp_customize->add_control('social_ngo_page_sidebar',array(
        'type' => 'select',
        'label' => __('Page Sidebar Layout','social-ngo'),
        'section' => 'social_ngo_theme_options_section',
        'choices' => array(
            'Left Sidebar' => __('Left Sidebar','social-ngo'),
            'Right Sidebar' => __('Right Sidebar','social-ngo'),
            'One Column' => __('One Column','social-ngo')
        ),
	));

	$wp_customize->add_setting('social_ngo_archive_page_sidebar',array(
		'default' => 'One Column',
		'sanitize_callback' => 'social_ngo_sanitize_choices'
	));
	$wp_customize->add_control('social_ngo_archive_page_sidebar',array(
        'type' => 'select',
        'label' => __('Archive & Search Page Sidebar Layout','social-ngo'),
        'section' => 'social_ngo_theme_options_section',
        'choices' => array(
            'Left Sidebar' => __('Left Sidebar','social-ngo'),
            'Right Sidebar' => __('Right Sidebar','social-ngo'),
            'One Column' => __('One Column','social-ngo'),
            'Grid Layout' => __('Grid Layout','social-ngo')
        ),
	));

	$wp_customize->add_setting( 'social_ngo_boxfull_width', array(
		'default'           => '',
		'sanitize_callback' => 'social_ngo_sanitize_choices'
	));
	
	$wp_customize->add_control( 'social_ngo_boxfull_width', array(
		'label'    => __( 'Section Width', 'social-ngo' ),
		'section'  => 'social_ngo_theme_options_section',
		'type'     => 'select',
		'choices'  => array(
			'container'  => __('Box Width', 'social-ngo'),
			'container-fluid' => __('Full Width', 'social-ngo'),
			'none' => __('None', 'social-ngo')
		),
	));

	$wp_customize->add_setting( 'social_ngo_dropdown_anim', array(
		'default'           => 'None',
		'sanitize_callback' => 'social_ngo_sanitize_choices'
	));
	$wp_customize->add_control( 'social_ngo_dropdown_anim', array(
		'label'    => __( 'Menu Dropdown Animations', 'social-ngo' ),
		'section'  => 'social_ngo_theme_options_section',
		'type'     => 'select',
		'choices'  => array(
			'bounceInUp'  => __('bounceInUp', 'social-ngo'),
			'fadeInUp' => __('fadeInUp', 'social-ngo'),
			'zoomIn'    => __('zoomIn', 'social-ngo'),
			'None'    => __('None', 'social-ngo')
		),
	));

	//Header
	$wp_customize->add_section( 'social_ngo_header' , array(
    	'title'    => __( 'Header Section', 'social-ngo' ),
		'priority' => null,
		'panel' => 'social_ngo_panel_id'
	) );

	$wp_customize->add_setting('social_ngo_phoneno',array(
    	'default' => '',
    	'sanitize_callback'	=> 'sanitize_text_field'
	));
	$wp_customize->add_control('social_ngo_phoneno',array(
	   	'type' => 'text',
	   	'label' => __('Phone Number','social-ngo'),
	   	'section' => 'social_ngo_header',
	));

	$wp_customize->add_setting('social_ngo_mail',array(
    	'default' => '',
    	'sanitize_callback'	=> 'sanitize_text_field'
	));
	$wp_customize->add_control('social_ngo_mail',array(
	   	'type' => 'text',
	   	'label' => __('Mail Number','social-ngo'),
	   	'section' => 'social_ngo_header',
	));

	$wp_customize->add_setting( 'social_ngo_pmicon_color', array(
		'default' => '',
		'sanitize_callback' => 'sanitize_hex_color'
	));
	$wp_customize->add_control( new WP_Customize_Color_Control( $wp_customize, 'social_ngo_pmicon_color', array(
		'label' => 'Phone/Mail Icon Color',
		'section' => 'social_ngo_header',
	)));

	$wp_customize->add_setting( 'social_ngo_pmtext_color', array(
		'default' => '',
		'sanitize_callback' => 'sanitize_hex_color'
	));
	$wp_customize->add_control( new WP_Customize_Color_Control( $wp_customize, 'social_ngo_pmtext_color', array(
		'label' => 'Phone/Mail Text Color',
		'section' => 'social_ngo_header',
	)));

	$wp_customize->add_setting('social_ngo_facebook_url',array(
    	'default' => '',
    	'sanitize_callback'	=> 'esc_url_raw'
	));
	$wp_customize->add_control('social_ngo_facebook_url',array(
	   	'type' => 'url',
	   	'label' => __('Add Facebook URL','social-ngo'),
	   	'section' => 'social_ngo_header',
	));

	$wp_customize->add_setting('social_ngo_twitter_url',array(
    	'default' => '',
    	'sanitize_callback'	=> 'esc_url_raw'
	));
	$wp_customize->add_control('social_ngo_twitter_url',array(
	   	'type' => 'url',
	   	'label' => __('Add Twitter URL','social-ngo'),
	   	'section' => 'social_ngo_header',
	));

	$wp_customize->add_setting('social_ngo_instagram_url',array(
    	'default' => '',
    	'sanitize_callback'	=> 'esc_url_raw'
	));
	$wp_customize->add_control('social_ngo_instagram_url',array(
	   	'type' => 'url',
	   	'label' => __('Add Instagram URL','social-ngo'),
	   	'section' => 'social_ngo_header',
	));

	$wp_customize->add_setting( 'social_ngo_social_color', array(
		'default' => '',
		'sanitize_callback' => 'sanitize_hex_color'
	));
	$wp_customize->add_control( new WP_Customize_Color_Control( $wp_customize, 'social_ngo_social_color', array(
		'label' => 'Social Icon Color',
		'section' => 'social_ngo_header',
	)));
	
	$wp_customize->add_setting('social_ngo_headerbtn_text1',array(
    	'default' => '',
    	'sanitize_callback'	=> 'sanitize_text_field'
	));
	$wp_customize->add_control('social_ngo_headerbtn_text1',array(
	   	'type' => 'text',
	   	'label' => __('Button 1 Text','social-ngo'),
	   	'section' => 'social_ngo_header',
	));

	$wp_customize->add_setting('social_ngo_headerbtnlink1',array(
    	'default' => '',
    	'sanitize_callback'	=> 'sanitize_text_field'
	));
	$wp_customize->add_control('social_ngo_headerbtnlink1',array(
	   	'type' => 'url',
	   	'label' => __('Button 1 Link','social-ngo'),
	   	'section' => 'social_ngo_header',
	));

	$wp_customize->add_setting('social_ngo_headerbtn_text2',array(
    	'default' => '',
    	'sanitize_callback'	=> 'sanitize_text_field'
	));
	$wp_customize->add_control('social_ngo_headerbtn_text2',array(
	   	'type' => 'text',
	   	'label' => __('Button 2 Text','social-ngo'),
	   	'section' => 'social_ngo_header',
	));

	$wp_customize->add_setting('social_ngo_headerbtnlink2',array(
    	'default' => '',
    	'sanitize_callback'	=> 'sanitize_text_field'
	));
	$wp_customize->add_control('social_ngo_headerbtnlink2',array(
	   	'type' => 'url',
	   	'label' => __('Button 2 Link','social-ngo'),
	   	'section' => 'social_ngo_header',
	));

	$wp_customize->add_setting( 'social_ngo_btn_color', array(
		'default' => '',
		'sanitize_callback' => 'sanitize_hex_color'
	));
	$wp_customize->add_control( new WP_Customize_Color_Control( $wp_customize, 'social_ngo_btn_color', array(
		'label' => 'Button Text Color',
		'section' => 'social_ngo_header',
	)));

	$wp_customize->add_setting( 'social_ngo_btnbg_color', array(
		'default' => '',
		'sanitize_callback' => 'sanitize_hex_color'
	));
	$wp_customize->add_control( new WP_Customize_Color_Control( $wp_customize, 'social_ngo_btnbg_color', array(
		'label' => 'Button Bg Color',
		'section' => 'social_ngo_header',
	)));

	$wp_customize->add_setting( 'social_ngo_bdr_color', array(
		'default' => '',
		'sanitize_callback' => 'sanitize_hex_color'
	));
	$wp_customize->add_control( new WP_Customize_Color_Control( $wp_customize, 'social_ngo_bdr_color', array(
		'label' => 'Border Color',
		'section' => 'social_ngo_header',
	)));

	//home page slider
	$wp_customize->add_section( 'social_ngo_slider_section' , array(
    	'title'    => __( 'Slider Settings', 'social-ngo' ),
		'priority' => null,
		'panel' => 'social_ngo_panel_id'
	) );


	$wp_customize->add_setting('social_ngo_slider_shortcode',array(
		'default' => '',
    	'sanitize_callback'	=> 'sanitize_text_field'
	));
	$wp_customize->add_control('social_ngo_slider_shortcode',array(
	   	'type' => 'text',
	   	'label' => __('Add Slider shortcode','social-ngo'),
	   	'section' => 'social_ngo_slider_section',
	));

	// Add description text to the slider section
	$wp_customize->add_setting('luzuk_social_ngo_slider_description', array(
		'sanitize_callback' => 'wp_kses_post',
	));

	$wp_customize->add_control(new WP_Customize_Control(
		$wp_customize,
		'luzuk_social_ngo_slider_description',
		array(
			'type'     => 'hidden',
			'section'  => 'social_ngo_slider_section',
			'description' => __(
				'To add a slider to this theme, please install and activate the <b>Luzuk Multi Slider</b> plugin. This plugin offers various slider options, allowing you to set up a slider as per your preference.<br><br>
				
				<b>Steps to Add a Slider After Plugin Activation:</b><br>
				1. Navigate to the <b>Luzuk Multi Slider</b> plugin, which will appear in the side panel.<br>
				2. Go to <b>"Add New Post"</b> inside the plugin, add the slider content, and publish it. You can add multiple sliders this way.<br>
				3. Open the plugin <b>Dashboard</b> and choose a slider design.<br>
				4. Copy the shortcode of your preferred design and paste it into a post, page, or the slider shortcode setting in the Customizer.<br><br>
				Note: If the slider does not change, please refresh the page after adding the shortcode.',
				'social-ngo'
			),
		)
	));
	

	//ourcauses Section
	$wp_customize->add_section('social_ngo_ourcauses_section',array(
		'title'	=> __('Our Causes Section','social-ngo'),
		'description'=> __('<b>Note :</b> This section will appear below the slider.','social-ngo'),
		'panel' => 'social_ngo_panel_id',
	));

	$wp_customize->add_setting('social_ngo_ourcausesheading',array(
    	'default' => '',
    	'sanitize_callback'	=> 'sanitize_text_field'
	));
	$wp_customize->add_control('social_ngo_ourcausesheading',array(
	   	'type' => 'text',
	   	'label' => __('Heading','social-ngo'),
	   	'section' => 'social_ngo_ourcauses_section',
	));

	$wp_customize->add_setting('social_ngo_ourcausessubheading',array(
    	'default' => '',
    	'sanitize_callback'	=> 'sanitize_text_field'
	));
	$wp_customize->add_control('social_ngo_ourcausessubheading',array(
	   	'type' => 'text',
	   	'label' => __('Sub Heading Text','social-ngo'),
	   	'section' => 'social_ngo_ourcauses_section',
	));

	$wp_customize->add_setting('social_ngo_ourcausessbtnlink',array(
    	'default' => '',
    	'sanitize_callback'	=> 'sanitize_text_field'
	));

	$wp_customize->add_control('social_ngo_ourcausessbtnlink',array(
	   	'type' => 'url',
	   	'label' => __('All Causes Button Link','social-ngo'),
	   	'section' => 'social_ngo_ourcauses_section',
	));


	$categories = get_categories();
	$cats = array();
	$i = 0;
	$cat_pst[]= 'select';
	foreach($categories as $category){
		if($i==0){
			$default = $category->slug;
			$i++;
		}
		$cat_pst[$category->slug] = $category->name;
	}

	$wp_customize->add_setting('social_ngo_ourcauses_category_setting',array(
		'default' => 'select',
		'sanitize_callback' => 'social_ngo_sanitize_choices',
	));
	$wp_customize->add_control('social_ngo_ourcauses_category_setting',array(
		'type' => 'select',
		'choices' => $cat_pst,
		'label' => __('Select Category To Display Post','social-ngo'),
		'section' => 'social_ngo_ourcauses_section',
	));


	$wp_customize->add_setting('social_ngo_ourcauses_number',array(
		'default'	=> '3',
		'sanitize_callback'	=> 'sanitize_text_field',
	));
	$wp_customize->add_control('social_ngo_ourcauses_number',array(
		'label'	=> __('Number Of Posts To Show In A Category','social-ngo'),
		'section' => 'social_ngo_ourcauses_section',
		'type'	  => 'number'
	));


	


	//newsandupdates Section
	$wp_customize->add_section('social_ngo_newsandupdates_section',array(
		'title'	=> __('News & Updates Section','social-ngo'),
		'description'=> __('<b>Note :</b> This section will appear below the slider.','social-ngo'),
		'panel' => 'social_ngo_panel_id',
	));

	$wp_customize->add_setting('social_ngo_newsandupdatesheading',array(
    	'default' => '',
    	'sanitize_callback'	=> 'sanitize_text_field'
	));
	$wp_customize->add_control('social_ngo_newsandupdatesheading',array(
	   	'type' => 'text',
	   	'label' => __('Heading','social-ngo'),
	   	'section' => 'social_ngo_newsandupdates_section',
	));

	$wp_customize->add_setting('social_ngo_newsandupdatessubheading',array(
    	'default' => '',
    	'sanitize_callback'	=> 'sanitize_text_field'
	));
	$wp_customize->add_control('social_ngo_newsandupdatessubheading',array(
	   	'type' => 'text',
	   	'label' => __('Sub Heading Text','social-ngo'),
	   	'section' => 'social_ngo_newsandupdates_section',
	));

	$wp_customize->add_setting('social_ngo_newsandupdatessbtnlink',array(
    	'default' => '',
    	'sanitize_callback'	=> 'sanitize_text_field'
	));

	$wp_customize->add_control('social_ngo_newsandupdatessbtnlink',array(
	   	'type' => 'url',
	   	'label' => __('All Updates Button Link','social-ngo'),
	   	'section' => 'social_ngo_newsandupdates_section',
	));

	$categories = get_categories();
	$cats = array();
	$i = 0;
	$cat_pst[]= 'select';
	foreach($categories as $category){
		if($i==0){
			$default = $category->slug;
			$i++;
		}
		$cat_pst[$category->slug] = $category->name;
	}

	$wp_customize->add_setting('social_ngo_newsandupdates_category_setting',array(
		'default' => 'select',
		'sanitize_callback' => 'social_ngo_sanitize_choices',
	));
	$wp_customize->add_control('social_ngo_newsandupdates_category_setting',array(
		'type' => 'select',
		'choices' => $cat_pst,
		'label' => __('Select Category To Display Post','social-ngo'),
		'section' => 'social_ngo_newsandupdates_section',
	));

	$wp_customize->add_setting('social_ngo_newsandupdates_number',array(
		'default'	=> '3',
		'sanitize_callback'	=> 'sanitize_text_field',
	));
	$wp_customize->add_control('social_ngo_newsandupdates_number',array(
		'label'	=> __('Number Of Posts To Show In A Category','social-ngo'),
		'section' => 'social_ngo_newsandupdates_section',
		'type'	  => 'number'
	));
	


	//Footer
    $wp_customize->add_section( 'social_ngo_footer', array(
    	'title'  => __( 'Footer Settings', 'social-ngo' ),
		'priority' => null,
		'panel' => 'social_ngo_panel_id'
	) );

	$wp_customize->add_setting('social_ngo_show_back_totop',array(
       'default' => true,
       'sanitize_callback'	=> 'social_ngo_sanitize_checkbox'
    ));
    $wp_customize->add_control('social_ngo_show_back_totop',array(
       'type' => 'checkbox',
       'label' => __('Show / Hide Back to Top','social-ngo'),
       'section' => 'social_ngo_footer'
    ));

    $wp_customize->add_setting('social_ngo_footer_copy',array(
		'default' => '',
		'sanitize_callback'	=> 'sanitize_text_field'
	));	
	$wp_customize->add_control('social_ngo_footer_copy',array(
		'label'	=> __('Copyright Text','social-ngo'),
		'section' => 'social_ngo_footer',
		'setting' => 'social_ngo_footer_copy',
		'type' => 'text'
	));
	

	$wp_customize->get_setting( 'blogname' )->transport          = 'postMessage';
	$wp_customize->get_setting( 'blogdescription' )->transport   = 'postMessage';
	$wp_customize->get_setting( 'header_textcolor' )->transport  = 'postMessage';

	$wp_customize->selective_refresh->add_partial( 'blogname', array(
		'selector' => '.site-title a',
		'render_callback' => 'social_ngo_customize_partial_blogname',
	) );
	$wp_customize->selective_refresh->add_partial( 'blogdescription', array(
		'selector' => '.site-description',
		'render_callback' => 'social_ngo_customize_partial_blogdescription',
	) );
}
add_action( 'customize_register', 'social_ngo_customize_register' );

function social_ngo_customize_partial_blogname() {
	bloginfo( 'name' );
}

function social_ngo_customize_partial_blogdescription() {
	bloginfo( 'description' );
}

if (class_exists('WP_Customize_Control')) {

   	class Social_NGO_Fontawesome_Icon_Chooser extends WP_Customize_Control {

      	public $type = 'icon';

      	public function render_content() { ?>
	     	<label>
	            <span class="customize-control-title">
	               <?php echo esc_html($this->label); ?>
	            </span>

	            <?php if ($this->description) { ?>
	                <span class="description customize-control-description">
	                   <?php echo wp_kses_post($this->description); ?>
	                </span>
	            <?php } ?>

	            <div class="social-ngo-selected-icon">
	                <i class="fa <?php echo esc_attr($this->value()); ?>"></i>
	                <span><i class="fa fa-angle-down"></i></span>
	            </div>

	            <ul class="social-ngo-icon-list clearfix">
	                <?php
	                $social_ngo_font_awesome_icon_array = social_ngo_font_awesome_icon_array();
	                foreach ($social_ngo_font_awesome_icon_array as $social_ngo_font_awesome_icon) {
	                   $icon_class = $this->value() == $social_ngo_font_awesome_icon ? 'icon-active' : '';
	                   echo '<li class=' . esc_attr($icon_class) . '><i class="' . esc_attr($social_ngo_font_awesome_icon) . '"></i></li>';
	                }
	                ?>
	            </ul>
	            <input type="hidden" value="<?php $this->value(); ?>" <?php $this->link(); ?> />
	        </label>
	        <?php
      	}
  	}
}
function social_ngo_customizer_script() {
   wp_enqueue_style( 'font-awesome-1', esc_url(get_template_directory_uri()).'/assets/css/fontawesome-all.css');
}
add_action( 'customize_controls_enqueue_scripts', 'social_ngo_customizer_script' );