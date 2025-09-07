<?php
/**
 * The header for our theme
 *
 * @subpackage Social NGO
 * @since 1.0
 * @version 0.1
 */

?><!DOCTYPE html>
<html <?php language_attributes(); ?> class="no-js no-svg">
<head>
	<meta charset="<?php bloginfo( 'charset' ); ?>">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<?php wp_head(); ?>
</head>

<body <?php body_class(); ?>>

<?php if ( function_exists( 'wp_body_open' ) ) {
    wp_body_open();
} else {
    do_action( 'wp_body_open' );
}?>

<a class="screen-reader-text skip-link" href="#skip-content"><?php esc_html_e( 'Skip to content', 'social-ngo' ); ?></a>

<div id="header">
	<div class="container">
		<div class="main-header">
			<div class="tophead ">
				<div class=" row m-0">
					<div class="col-lg-4 col-md-12 col-sm-12">
						<div class="phn-icon">
							<i class="fa fa-phone" aria-hidden="true"></i>
							<a href="<?php echo esc_html(get_theme_mod('social_ngo_phoneno')); ?>" ><?php echo esc_html(get_theme_mod('social_ngo_phoneno')); ?></a>
						</div>	
					</div>
					<div class="col-lg-4 col-md-12 col-sm-12 logobx">
						<div class="logo ">
							<?php if ( has_custom_logo() ) : ?>
								<?php the_custom_logo(); ?>
							<?php endif; ?>
							<?php if (get_theme_mod('social_ngo_show_site_title',true)) {?>
								<?php $blog_info = get_bloginfo( 'name' ); ?>
								<?php if ( ! empty( $blog_info ) ) : ?>
									<?php if ( is_front_page() && is_home() ) : ?>
										<h1 class="site-title"><a href="<?php echo esc_url( home_url( '/' ) ); ?>" rel="home"><?php bloginfo( 'name' ); ?></a></h1>
									<?php else : ?>
										<p class="site-title"><a href="<?php echo esc_url( home_url( '/' ) ); ?>" rel="home"><?php bloginfo( 'name' ); ?></a></p>
									<?php endif; ?>
								<?php endif; ?>
							<?php }?>
							<?php if (get_theme_mod('social_ngo_show_tagline',true)) {?>
								<?php $description = get_bloginfo( 'description', 'display' );
								if ( $description || is_customize_preview() ) : ?>
									<p class="site-description"><?php echo esc_html($description); ?></p>
								<?php endif; ?>
							<?php }?>
												</div>
					</div>
					<div class="col-lg-4 col-md-12 col-sm-12">
						<div class="mail-icon">
							<i class="fa fa-envelope" aria-hidden="true"></i>
							<a href="<?php echo esc_html(get_theme_mod('social_ngo_mail')); ?>" ><?php echo esc_html(get_theme_mod('social_ngo_mail')); ?></a>
						</div>
					</div>
				</div>
				<div class="h-boder"></div>
			</div>
			
			<div class="clearfix"></div>
			<div class="bottomhead ">
				<div class="row m-0">
					<div class="col-lg-7 col-md-2 col-2">
						<div class="menu-bar">
							<div class="toggle-menu responsive-menu text-md-left text-center">
								<?php if(has_nav_menu('primary')){ ?>
									<button onclick="social_ngo_open()" role="tab" class="mobile-menu"><i class="fas fa-bars"></i><span class="screen-reader-text"><?php esc_html_e('Open Menu','social-ngo'); ?></span></button>
								<?php }?>
							</div>
							<div id="sidelong-menu" class="nav sidenav">
								<nav id="primary-site-navigation" class="nav-menu" role="navigation" aria-label="<?php esc_attr_e( 'Top Menu', 'social-ngo' ); ?>">
									<?php if(has_nav_menu('primary')){
										wp_nav_menu( array( 
											'theme_location' => 'primary',
											'container_class' => 'main-menu-navigation clearfix' ,
											'menu_class' => 'clearfix',
											'items_wrap' => '<ul id="%1$s" class="%2$s mobile_nav">%3$s</ul>',
											'fallback_cb' => 'wp_page_menu',
										) ); 
									} ?>
									<a href="javascript:void(0)" class="closebtn responsive-menu" onclick="social_ngo_close()"><i class="fas fa-times"></i><span class="screen-reader-text"><?php esc_html_e('Close Menu','social-ngo'); ?></span></a>
								</nav>
								
							</div>
						</div>
					</div>
					<div class="col-lg-5 col-md-10 col-10 pd-0">
						<div class="h-right">
							<li>
							<?php if(get_theme_mod('social_ngo_facebook_url') != '' || get_theme_mod('social_ngo_twitter_url') != '' || get_theme_mod('social_ngo_instagram_url') != ''){ ?>
							
								<div class="social-icons ">
									<?php if(get_theme_mod('social_ngo_facebook_url') != ''){?>
										<a href="<?php echo esc_url(get_theme_mod('social_ngo_facebook_url')) ?>"><i class="fab fa-facebook-f"></i><span class="screen-reader-text"><?php echo esc_html_e('Facebook', 'social-ngo'); ?></span></a>
									<?php }?>
									<?php if(get_theme_mod('social_ngo_twitter_url') != ''){?>
										<a href="<?php echo esc_url(get_theme_mod('social_ngo_twitter_url')) ?>"><i class="fab fa-twitter"></i><span class="screen-reader-text"><?php echo esc_html_e('Twitter', 'social-ngo'); ?></span></a>
									<?php }?>
									<?php if(get_theme_mod('social_ngo_instagram_url') != ''){?>
										<a href="<?php echo esc_url(get_theme_mod('social_ngo_instagram_url')) ?>"><i class="fab fa-instagram"></i><span class="screen-reader-text"><?php echo esc_html_e('Instagram', 'social-ngo'); ?></span></a>
									<?php }?>				
								</div>
							
							<?php }?>
							</li>
						<!-- </div>
						<div class="col-lg-3 col-md-3 col-sm-12"> -->
							<li>
								<!-- <div class="button"> -->
									<!-- <div class="col-lg-6 col-md-6 col-sm-12"> -->
										<div class="h-btn1">
											<a href="<?php echo esc_url(get_theme_mod('social_ngo_headerbtnlink1')) ?>"><div class="h-btntxt"><?php echo esc_html(get_theme_mod('social_ngo_headerbtn_text1')); ?></div>
											</a>
										</div>
									</li>
									<!-- </div> -->
									<!-- <div class="col-lg-6 col-md-6 col-sm-12"> -->
									<li>
										<div class="h-btn2">
											<a href="<?php echo esc_url(get_theme_mod('social_ngo_headerbtnlink2')) ?>"><div class="h-btntxt"><?php echo esc_html(get_theme_mod('social_ngo_headerbtn_text2')); ?></div>
											</a>
										</div>
									<!-- </div> -->
								<!-- </div> -->
							</li>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>

<?php if(is_singular()) {?>
	<div id="inner-pages-header">
		<div class="header-overlay"></div>
	    <div class="header-content">
		    <div class="container"> 
		      	<h1><?php single_post_title(); ?></h1>
		      	<div class="innheader-border"></div>
		      	<div class="theme-breadcrumb mt-2">
					<?php social_ngo_breadcrumb();?>
				</div>
		    </div>
		</div>
	</div>
<?php } ?>