<?php 

	$social_ngo_custom_style = '';

	// Logo Size
	$social_ngo_logo_top_padding = get_theme_mod('social_ngo_logo_top_padding');
	$social_ngo_logo_bottom_padding = get_theme_mod('social_ngo_logo_bottom_padding');
	$social_ngo_logo_left_padding = get_theme_mod('social_ngo_logo_left_padding');
	$social_ngo_logo_right_padding = get_theme_mod('social_ngo_logo_right_padding');

	if( $social_ngo_logo_top_padding != '' || $social_ngo_logo_bottom_padding != '' || $social_ngo_logo_left_padding != '' || $social_ngo_logo_right_padding != ''){
		$social_ngo_custom_style .=' .logo {';
			$social_ngo_custom_style .=' padding-top: '.esc_attr($social_ngo_logo_top_padding).'px; padding-bottom: '.esc_attr($social_ngo_logo_bottom_padding).'px; padding-left: '.esc_attr($social_ngo_logo_left_padding).'px; padding-right: '.esc_attr($social_ngo_logo_right_padding).'px;';
		$social_ngo_custom_style .=' }';
	}

	$social_ngo_logo_size = get_theme_mod('social_ngo_logo_size');
	if( $social_ngo_logo_size != '') {
		if($social_ngo_logo_size == 100) {
			$social_ngo_custom_style .=' .custom-logo-link img {';
				$social_ngo_custom_style .=' width: 350px;';
			$social_ngo_custom_style .=' }';
		} else if($social_ngo_logo_size >= 10 && $social_ngo_logo_size < 100) {
			$social_ngo_custom_style .=' .custom-logo-link img {';
				$social_ngo_custom_style .=' width: '.esc_attr($social_ngo_logo_size).'%;';
			$social_ngo_custom_style .=' }';
		}
	}

	// Header Image
	$header_image_url = social_ngo_banner_image( $image_url = '' );
	if( $header_image_url != ''){
		$social_ngo_custom_style .=' #inner-pages-header {';
			$social_ngo_custom_style .=' background-image: url('. esc_url( $header_image_url ).'); background-size: cover; background-repeat: no-repeat; background-attachment: fixed;';
		$social_ngo_custom_style .=' }';
	} else {
		$social_ngo_custom_style .=' #inner-pages-header {';
			$social_ngo_custom_style .=' background: radial-gradient(circle at center, rgba(0,0,0,0) 0%, #000000 100%); ';
		$social_ngo_custom_style .=' }';
	}


	//site title tagline
	$social_ngo_site_title_color = get_theme_mod('social_ngo_site_title_color');
	if ( $social_ngo_site_title_color != '') {
		$social_ngo_custom_style .=' h1.site-title a, p.site-title a{';
			$social_ngo_custom_style .=' color:'.esc_attr($social_ngo_site_title_color).';';
		$social_ngo_custom_style .=' }';
	}

	$social_ngo_site_tagline_color = get_theme_mod('social_ngo_site_tagline_color');
	if ( $social_ngo_site_tagline_color != '') {
		$social_ngo_custom_style .=' p.site-description{';
			$social_ngo_custom_style .=' color:'.esc_attr($social_ngo_site_tagline_color).';';
		$social_ngo_custom_style .=' }';
	}

	//layout width
	$social_ngo_boxfull_width = get_theme_mod('social_ngo_boxfull_width');
	if ($social_ngo_boxfull_width !== '') {
		switch ($social_ngo_boxfull_width) {
			case 'container':
				$social_ngo_custom_style .= ' body, #header, .bottom-header {
					max-width: 1140px;
					width: 100%;
					padding-right: 15px;
					padding-left: 15px;
					margin-right: auto;
					margin-left: auto;
					}';
				break;
			case 'container-fluid':
				$social_ngo_custom_style .= ' body, #header, .bottom-header { 
					width: 100%;
					padding-right: 15px;
					padding-left: 15px;
					margin-right: auto;
					margin-left: auto;
					}';
				break;
			case 'none':
				// No specific width specified, so no additional style needed.
				break;
			default:
				// Handle unexpected values.
				break;
		}
	}

	//Menu animation
	$social_ngo_dropdown_anim = get_theme_mod('social_ngo_dropdown_anim');

	if ( $social_ngo_dropdown_anim != '') {
		$social_ngo_custom_style .=' .nav-menu ul ul {';
			$social_ngo_custom_style .=' animation:'.esc_attr($social_ngo_dropdown_anim).' 1s ease;';
		$social_ngo_custom_style .=' }';
	}

	//Header color
	$social_ngo_pmicon_color = get_theme_mod('social_ngo_pmicon_color');
	if ( $social_ngo_pmicon_color != '') {
		$social_ngo_custom_style .=' #header .mail-icon i, #header .phn-icon i{';
			$social_ngo_custom_style .=' color:'.esc_attr($social_ngo_pmicon_color).';';
		$social_ngo_custom_style .=' }';
	}

	$social_ngo_pmtext_color = get_theme_mod('social_ngo_pmtext_color');
	if ( $social_ngo_pmtext_color != '') {
		$social_ngo_custom_style .=' #header .mail-icon a, #header .phn-icon a{';
			$social_ngo_custom_style .=' color:'.esc_attr($social_ngo_pmtext_color).';';
		$social_ngo_custom_style .=' }';
	}

	$social_ngo_social_color = get_theme_mod('social_ngo_social_color');
	if ( $social_ngo_social_color != '') {
		$social_ngo_custom_style .=' #header .social-icons a{';
			$social_ngo_custom_style .=' color:'.esc_attr($social_ngo_social_color).';';
		$social_ngo_custom_style .=' }';
	}

	$social_ngo_btn_color = get_theme_mod('social_ngo_btn_color');
	$social_ngo_btnbg_color = get_theme_mod('social_ngo_btnbg_color');
	if ( $social_ngo_btn_color != '') {
		$social_ngo_custom_style .=' #header .h-btn1 .h-btntxt, #header .h-btn2 .h-btntxt{';
			$social_ngo_custom_style .=' color:'.esc_attr($social_ngo_btn_color).'; background-color:'.esc_attr($social_ngo_btnbg_color).';';
		$social_ngo_custom_style .=' }';
	}

	$social_ngo_bdr_color = get_theme_mod('social_ngo_bdr_color');
	if ( $social_ngo_bdr_color != '') {
		$social_ngo_custom_style .=' #header .h-boder{';
			$social_ngo_custom_style .=' border-color:'.esc_attr($social_ngo_bdr_color).';';
		$social_ngo_custom_style .=' }';
	}

