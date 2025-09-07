<?php
/**
 * Social NGO functions and definitions
 *
 * @subpackage Social NGO
 * @since 1.0
 */

include get_theme_file_path( 'vendor/wptrt/autoload/src/Social_NGO_Loader.php' );

$Social_NGO_Loader = new \WPTRT\Autoload\Social_NGO_Loader();

$Social_NGO_Loader->social_ngo_add( 'WPTRT\\Customize\\Section', get_theme_file_path( 'vendor/wptrt/customize-section-button/src' ) );

$Social_NGO_Loader->social_ngo_register();

function social_ngo_setup() {
	
	load_theme_textdomain( 'social-ngo', get_template_directory() . '/languages' );
	add_theme_support( 'automatic-feed-links' );
	add_theme_support( 'title-tag' );
	add_theme_support( 'responsive-embeds' );
	add_theme_support( 'html5', array( 'comment-list', 'search-form', 'comment-form', ) );
	add_theme_support( 'woocommerce' );
	add_theme_support( 'post-thumbnails' );
	add_theme_support( 'custom-background', $defaults = array(
	    'default-color'          => '',
	    'default-image'          => '',
	    'default-repeat'         => '',
	    'default-position-x'     => '',
	    'default-attachment'     => '',
	    'wp-head-callback'       => '_custom_background_cb',
	    'admin-head-callback'    => '',
	    'admin-preview-callback' => ''
	));

	$GLOBALS['content_width'] = 525;
	register_nav_menus( array(
		'primary' => __( 'Primary Menu', 'social-ngo' ),
	) );

	// Add theme support for Custom Logo.
	add_theme_support( 'custom-logo', array(
		'width'       => 250,
		'height'      => 250,
		'flex-width'  => true,
	) );

	// Add theme support for selective refresh for widgets.
	add_theme_support( 'customize-selective-refresh-widgets' );

	/*
	 * This theme styles the visual editor to resemble the theme style,
	 * specifically font, colors, and column width.
 	 */
	add_editor_style( array( 'assets/css/editor-style.css' ) );

}
add_action( 'after_setup_theme', 'social_ngo_setup' );

function social_ngo_widgets_init() {
	register_sidebar( array(
		'name'          => __( 'Blog Sidebar', 'social-ngo' ),
		'id'            => 'sidebar-1',
		'description'   => __( 'Add widgets here to appear in your sidebar on blog posts and archive pages.', 'social-ngo' ),
		'before_widget' => '<section id="%1$s" class="widget %2$s">',
		'after_widget'  => '</section>',
		'before_title'  => '<div class="widget_container"><h2 class="widget-title">',
		'after_title'   => '</h2></div>',
	) );

	register_sidebar( array(
		'name'          => __( 'Sidebar 2', 'social-ngo' ),
		'id'            => 'sidebar-2',
		'description'   => __( 'Add widgets here to appear in your pages and posts', 'social-ngo' ),
		'before_widget' => '<section id="%1$s" class="widget %2$s">',
		'after_widget'  => '</section>',
		'before_title'  => '<div class="widget_container"><h2 class="widget-title">',
		'after_title'   => '</h2></div>',
	) );

	register_sidebar( array(
		'name'          => __( 'Sidebar 3', 'social-ngo' ),
		'id'            => 'sidebar-3',
		'description'   => __( 'Add widgets here to appear in your pages and posts', 'social-ngo' ),
		'before_widget' => '<section id="%1$s" class="widget %2$s">',
		'after_widget'  => '</section>',
		'before_title'  => '<div class="widget_container"><h2 class="widget-title">',
		'after_title'   => '</h2></div>',
	) );

	register_sidebar( array(
		'name'          => __( 'Footer 1', 'social-ngo' ),
		'id'            => 'footer-1',
		'description'   => __( 'Add widgets here to appear in your footer.', 'social-ngo' ),
		'before_widget' => '<section id="%1$s" class="widget %2$s">',
		'after_widget'  => '</section>',
		'before_title'  => '<h2 class="widget-title">',
		'after_title'   => '</h2>',
	) );

	register_sidebar( array(
		'name'          => __( 'Footer 2', 'social-ngo' ),
		'id'            => 'footer-2',
		'description'   => __( 'Add widgets here to appear in your footer.', 'social-ngo' ),
		'before_widget' => '<section id="%1$s" class="widget %2$s">',
		'after_widget'  => '</section>',
		'before_title'  => '<h2 class="widget-title">',
		'after_title'   => '</h2>',
	) );

	register_sidebar( array(
		'name'          => __( 'Footer 3', 'social-ngo' ),
		'id'            => 'footer-3',
		'description'   => __( 'Add widgets here to appear in your footer.', 'social-ngo' ),
		'before_widget' => '<section id="%1$s" class="widget %2$s">',
		'after_widget'  => '</section>',
		'before_title'  => '<h2 class="widget-title">',
		'after_title'   => '</h2>',
	) );

	register_sidebar( array(
		'name'          => __( 'Footer 4', 'social-ngo' ),
		'id'            => 'footer-4',
		'description'   => __( 'Add widgets here to appear in your footer.', 'social-ngo' ),
		'before_widget' => '<section id="%1$s" class="widget %2$s">',
		'after_widget'  => '</section>',
		'before_title'  => '<h2 class="widget-title">',
		'after_title'   => '</h2>',
	) );
}
add_action( 'widgets_init', 'social_ngo_widgets_init' );

function social_ngo_fonts_url(){

	$font_families = array(
		
		// 'Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900'
		'Roboto:wght@100;300;400;500;700;900'
		// 'Jost:ital,wght@0,100;0,200;0,400;0,500;0,600;0,700;0,800;0,900'

	);

	$fonts_url = add_query_arg( array(
		'family' => implode( '&family=', $font_families ),
		'display' => 'swap',
	), 'https://fonts.googleapis.com/css2' );

	$contents = wptt_get_webfont_url( esc_url_raw( $fonts_url ) );
	return $contents;
}

function enqueue_google_fonts() {
    wp_enqueue_style('google-fonts', 'https://fonts.googleapis.com/css?family=Jost:400,500,700&display=swap');
}
add_action('wp_enqueue_scripts', 'enqueue_google_fonts');


//Enqueue scripts and styles.
function social_ngo_scripts() {
	// Add custom fonts, used in the main stylesheet.
	wp_enqueue_style( 'social-ngo-fonts', social_ngo_fonts_url(), array(), null );
	
	//Bootstarp 
	wp_enqueue_style( 'bootstrap-css', get_template_directory_uri().'/assets/css/bootstrap.css' );
	
	// Theme stylesheet.
	wp_enqueue_style( 'social-ngo-basic-style', get_stylesheet_uri() );

	// Load the Internet Explorer 9 specific stylesheet, to fix display issues in the Customizer.
	if ( is_customize_preview() ) {
		wp_enqueue_style( 'social-ngo-ie9', get_theme_file_uri( '/assets/css/ie9.css' ), array( 'social-ngo-style' ), '1.0' );
		wp_style_add_data( 'social-ngo-ie9', 'conditional', 'IE 9' );
	}
	// Load the Internet Explorer 8 specific stylesheet.
	wp_enqueue_style( 'social-ngo-ie8', get_theme_file_uri( '/assets/css/ie8.css' ), array( 'social-ngo-style' ), '1.0' );
	wp_style_add_data( 'social-ngo-ie8', 'conditional', 'lt IE 9' );

	//font-awesome
	wp_enqueue_style( 'font-awesome', get_template_directory_uri().'/assets/css/fontawesome.css' );
	wp_enqueue_style( 'font-awesome-css', get_template_directory_uri().'/assets/css/fontawesome-all.css' );

	wp_enqueue_style('custom-animations', get_template_directory_uri() . '/assets/css/animations.css');

	require get_parent_theme_file_path( '/lz-custom-style.php' );
	wp_add_inline_style( 'social-ngo-basic-style',$social_ngo_custom_style );

	wp_enqueue_script( 'social-ngo-navigation-jquery', get_theme_file_uri( '/assets/js/navigation.js' ), array( 'jquery' ), '2.1.2', true );
	wp_enqueue_script( 'bootstrap-js', get_template_directory_uri(). '/assets/js/bootstrap.js', array('jquery') );
	wp_enqueue_script( 'jquery-superfish', get_template_directory_uri(). '/assets/js/jquery.superfish.js', array('jquery') ,'',true);

	if ( is_singular() && comments_open() && get_option( 'thread_comments' ) ) {
		wp_enqueue_script( 'comment-reply' );
	}
}
add_action( 'wp_enqueue_scripts', 'social_ngo_scripts' );

function social_ngo_front_page_template( $template ) {
	return is_home() ? '' : $template;
}
add_filter( 'frontpage_template',  'social_ngo_front_page_template' );

function social_ngo_sanitize_dropdown_pages( $page_id, $setting ) {
	// Ensure $input is an absolute integer.
	$page_id = absint( $page_id );
	// If $page_id is an ID of a published page, return it; otherwise, return the default.
	return ( 'publish' == get_post_status( $page_id ) ? $page_id : $setting->default );
}

function social_ngo_sanitize_choices( $input, $setting ) {
    global $wp_customize; 
    $control = $wp_customize->get_control( $setting->id ); 
    if ( array_key_exists( $input, $control->choices ) ) {
        return $input;
    } else {
        return $setting->default;
    }
}

function social_ngo_sanitize_checkbox( $input ) {
	return ( ( isset( $input ) && true == $input ) ? true : false );
}

function social_ngo_sanitize_phone_number( $phone ) {
	return preg_replace( '/[^\d+]/', '', $phone );
}

function social_ngo_sanitize_float( $input ) {
    return filter_var($input, FILTER_SANITIZE_NUMBER_FLOAT, FILTER_FLAG_ALLOW_FRACTION);
}

/* Excerpt Limit Begin */
function social_ngo_string_limit_words($string, $word_limit) {
	$words = explode(' ', $string, (int)($word_limit) + 1);
	if(count($words) > $word_limit)
	array_pop($words);
	return implode(' ', $words);
}

// Change number or products per row to 3
add_filter('loop_shop_columns', 'social_ngo_loop_columns');
if (!function_exists('social_ngo_loop_columns')) {
	function social_ngo_loop_columns() {
		return 3; // 3 products per row
	}
}

/* Breadcrumb Begin */
function social_ngo_breadcrumb() {
	if (!is_home()) {
		echo '<a href="';
			echo esc_url(home_url());
		echo '">';
			bloginfo('name');
		echo "</a>";
		if (is_category() || is_single()) {
			the_category(', ');
			if (is_single()) {
				echo "<span> ";
					the_title();
				echo "</span>";
			}
		} elseif (is_page()) {
			echo "<span>";
				the_title();
			echo "</span> ";
		}
	}
}

// get youtube video id from url 
function get_youtube_video_id($url) {
	$video_id = '';
	$url_parts = parse_url($url);
  
	if (isset($url_parts['query'])) {
	  parse_str($url_parts['query'], $query_params);
  
	  if (isset($query_params['v'])) {
		$video_id = $query_params['v'];
	  }
	} elseif (isset($url_parts['path'])) {
	  $path_parts = explode('/', trim($url_parts['path'], '/'));
  
	  if (!empty($path_parts)) {
		$video_id = end($path_parts);
	  }
	}
  
	return $video_id;
}


function social_ngo_banner_image( $image_url ){
    global $post;

    if( is_singular() ){
        $image_url      = get_the_post_thumbnail_url( $post->ID, 'full' );
    }
    return $image_url;
}

/* Plugin Activation */
// require get_template_directory() . '/inc/getstart/plugin-activation.php';

/* LMS Plugin Activation */
require get_template_directory() . '/inc/tgm/tgm.php';


require get_parent_theme_file_path( '/inc/custom-header.php' );

require get_parent_theme_file_path( '/inc/template-tags.php' );

require get_parent_theme_file_path( '/inc/template-functions.php' );

require get_parent_theme_file_path( '/inc/customizer.php' );

require get_parent_theme_file_path( '/inc/font-awesome-icons.php' );

require get_parent_theme_file_path( '/inc/wptt-webfont-loader.php' );

add_action('admin_menu', 'social_ngo_reorder_appearance_menu', 999);

function social_ngo_reorder_appearance_menu() {
    global $submenu;

    if (isset($submenu['themes.php'])) {
        $themes_submenu = $submenu['themes.php'];

        // Find and extract the Themes Dashboard item
        foreach ($themes_submenu as $key => $item) {
            if ($item[2] === 'themes-dashboard') {
                $dashboard_item = $item;
                unset($themes_submenu[$key]);
                break;
            }
        }

        // Re-index and add Themes Dashboard at the top
        if (isset($dashboard_item)) {
            $themes_submenu = array_values($themes_submenu); // reindex
            array_unshift($themes_submenu, $dashboard_item);
            $submenu['themes.php'] = $themes_submenu;
        }
    }
}

// Hook into current_screen to detect if we're on our custom page
add_action('current_screen', 'social_ngo_hide_admin_notices_on_custom_page');

function social_ngo_hide_admin_notices_on_custom_page($screen) {
    // Check for our custom page slug
    if ($screen->id === 'appearance_page_themes-dashboard') {
        // Remove all actions that show admin notices
        remove_all_actions('admin_notices');
        remove_all_actions('all_admin_notices');
        remove_all_actions('network_admin_notices');
    }
}

add_action('admin_menu', 'social_ngo_add_themes_dashboard_menu');

function social_ngo_add_themes_dashboard_menu() {
    add_theme_page(
        'Themes Dashboard',
        'Themes Dashboard',
        'manage_options',
        'themes-dashboard',
        'social_ngo_themes_dashboard_page'
    );
}

function social_ngo_themes_dashboard_page() {
    echo social_ngo_render_combined_dashboard();
}

function social_ngo_render_combined_dashboard() {
    $theme = wp_get_theme();
    $theme_name = $theme->get('Name');
    $screenshot = $theme->get_screenshot();
	$theme_description = $theme->get('Description');
    $theme_version = $theme->get('Version');

    $customize_url = admin_url('customize.php');

	// Dashboard file
	$dashboard_url = 'https://raw.githubusercontent.com/LuzukThemes/themes-dashboard/main/dashboard.html';
	$dashboard_response = wp_remote_get($dashboard_url);
	$dashboard_html = '';

	if (!is_wp_error($dashboard_response)) {
		$dashboard_html = wp_remote_retrieve_body($dashboard_response);
	} else {
		$dashboard_html = '<div class="notice notice-error"><p>Unable to load Dashboard content from GitHub.</p></div>';
	}

	// Coupon file
	$coupon_url = 'https://raw.githubusercontent.com/LuzukThemes/themes-dashboard/main/coupon.html';
	$coupon_response = wp_remote_get($coupon_url);
	$coupon_html = '';

	if (!is_wp_error($coupon_response)) {
		$coupon_html = wp_remote_retrieve_body($coupon_response);
	} else {
		$coupon_html = '<div class="notice notice-error"><p>Unable to load Coupon content from GitHub.</p></div>';
	}

    ob_start(); ?>
    <div class="wrap">
        <h1>Themes Dashboard</h1>
        <div style="display: flex; gap: 30px; margin-top: 30px;">

            <!-- Left Column -->
            <div style="flex: 1; background: #fff; padding: 20px; border: 1px solid #ddd; border-radius: 8px;">
                <img src="<?php echo esc_url($screenshot); ?>" alt="Theme Screenshot" style="max-width: 50%; border: 1px solid #ccc; float: left; margin-right: 20px; border-radius: 8px; border-right-color: #ff0000; border-bottom-color: #ff0000;" />
				<div style="background: #fff; padding: 20px; border: 1px solid #ddd; border-radius: 8px;">
					<h2 style="margin: 20px 0 30px;"><?php echo esc_html($theme_name); ?></h2>
					<p><strong>Version:</strong> <?php echo esc_html($theme_version); ?></p>
					<p><?php echo esc_html($theme_description); ?></p>
				</div>
                <div style="margin: 15px 0 50px;">
                    <a href="https://www.luzukdemo.com/demo/social-ngo/" target="_blank" class="button" style="background: orange; color: #fff; margin-right: 10px; padding: 6px 24px; font-size: 16px; font-weight: bold">Live Demo</a>
					<a href="https://www.luzukdemo.com/docs/social-ngo/" target="_blank" class="button" style="background: #006248; color: #fff; margin-right: 10px; padding: 6px 24px; font-size: 16px; font-weight: bold">Pro Documentation</a>
                    <a href="https://wordpress.org/support/theme/social-ngo/" target="_blank" class="button" style="background: #ec407a; color: #fff; margin-right: 10px; padding: 6px 24px; font-size: 16px; font-weight: bold">Need Support</a>
					<a href="https://www.luzuk.com/products/ngo-wp-theme/" target="_blank" class="button" style="background: #0056ff; color: #fff; margin-right: 10px; padding: 6px 24px; font-size: 16px; font-weight: bold">Buy Premium</a>
                </div>

                <?php echo $dashboard_html; ?>

		</div>
          
		<div style="display: flex; gap: 30px; margin-top: 30px; text-align: center;">
			<div style="flex: 2; margin: 20px 0; padding: 20px; background: #f7f7f7; border: 1px dashed #aaa;">
				<?php echo $coupon_html; ?>
				<a href="https://www.luzuk.com/products/ngo-wp-theme/" target="_blank" class="button button-primary" style="display: block; padding: 10px; background: #77b255;font-weight: bold; margin-top: 10px;">UPGRADE NOW</a><br>
			</div>
			<div style="flex: 2; margin: 20px 0; padding: 20px;"></div>
		</div>
    <?php
    return ob_get_clean();
}