<?php
/**
 * Template Name: Custom Home
 */

get_header(); ?>

<main id="skip-content" role="main">

	<?php do_action( 'social_ngo_above_slider' ); ?>
	
		<?php
			$social_ngo_slider_shortcode = get_theme_mod('social_ngo_slider_shortcode');
		?>

		<?php if($social_ngo_slider_shortcode){ ?> 
			<?php echo do_shortcode($social_ngo_slider_shortcode);?>
		<?php } else {
			echo '<p class="shortcerror">To add a slider to this theme, install and activate the Luzuk Multi Slider plugin. Once activated, you can add the slider shortcode anywhere you like. The plugin offers various slider options to choose from.</p>';
		} ?> 

	<?php do_action('social_ngo_below_slider'); ?>

	<?php if( get_theme_mod('social_ngo_ourcauses_category_setting') != '' ){?>
		
		<section id="ourcauses-section" class="py-5">
			<div class="container"> 
				<div class="ourcauses-heading sec-head ">
					<div class="sh-brd"></div>
					<div class="row m-0">
						<div class="col-lg-9 col-md-10 col-sm-12 pd-0">
							<?php if(get_theme_mod('social_ngo_ourcausesheading') != ''){ ?>
								<h3><?php echo esc_html(get_theme_mod('social_ngo_ourcausesheading')); ?></h3>
								
							<?php }?>
							<?php if(get_theme_mod('social_ngo_ourcausessubheading') != ''){ ?>
								<p><?php echo esc_html(get_theme_mod('social_ngo_ourcausessubheading')); ?></p>
							<?php }?>
						</div>
						<div class="col-lg-3 col-md-2 col-sm-12 pd-0">
							<div class="sbtn1">
								<a class="read-btn " href="<?php echo esc_url(get_theme_mod('social_ngo_ourcausessbtnlink')) ?>" >
									<span><?php echo esc_html_e('ALL CAUSES','social-ngo'); ?></span>
								</a>
							</div>
						</div>
					</div>
				</div>

				<div class="row ">  
					<?php $social_ngo_catData1 =  get_theme_mod('social_ngo_ourcauses_category_setting');
					if($social_ngo_catData1){ 
						$args = array(
							'post_type' => 'post',
							'category_name' => $social_ngo_catData1,
							'posts_per_page' => get_theme_mod('social_ngo_ourcauses_number',3)
						);
						$i=1; ?>
						<?php $query = new WP_Query( $args );
						if ( $query->have_posts() ) :
							while( $query->have_posts() ) : $query->the_post(); ?>
								<div class="col-lg-4 col-md-6 single-ourcauses-bx">
									<div class="ourcauses-box">
										<div class="img-box">
											<a href="<?php the_permalink(); ?>"><?php the_post_thumbnail(); ?></a>
										</div>	
										<div class="ourcauses-content">
											<a href="<?php the_permalink(); ?>"><h4><?php the_title_attribute(); ?></h4></a>
											<p ><?php $social_ngo_excerpt = get_the_excerpt(); echo esc_html( social_ngo_string_limit_words( $social_ngo_excerpt,30 ) ); ?></p>
											<div class="cses">
												<a href="<?php the_permalink(); ?>" class="read-btn"><span><?php echo esc_html_e('Donate Now','social-ngo'); ?></span></a>
											</div>
										</div>
										<div class="clearfix"></div>
									</div>
								</div>
							<?php $i++; endwhile; 
							wp_reset_postdata(); ?>
						<?php else : ?>
							<div class="no-postfound"></div>
						<?php endif; ?>
					<?php }?>
				</div>
			</div>
		</section>
	<?php }?>

	<?php do_action('social_ngo_below_ourcauses_section'); ?>

	<?php if( get_theme_mod('social_ngo_newsandupdates_category_setting') != '' ){?>
		<section id="newsandupdates-section" class="py-5">
			<div class="container"> 
				<div class="newsandupdates-heading sec-head ">
					<div class="sh-brd"></div>
					<div class="row m-0">
						<div class="col-lg-9 col-md-10 col-sm-12 pd-0">
							<?php if(get_theme_mod('social_ngo_newsandupdatesheading') != ''){ ?>
								<h3><?php echo esc_html(get_theme_mod('social_ngo_newsandupdatesheading')); ?></h3>
								
							<?php }?>
							<?php if(get_theme_mod('social_ngo_newsandupdatessubheading') != ''){ ?>
								<p><?php echo esc_html(get_theme_mod('social_ngo_newsandupdatessubheading')); ?></p>
							<?php }?>
						</div>
						<div class="col-lg-3 col-md-2 col-sm-12 pd-0">
							<div class="sbtn1">
								<a class="read-btn " href="<?php echo esc_url(get_theme_mod('social_ngo_newsandupdatessbtnlink')) ?>" >
									<span><?php echo esc_html_e('ALL UPDATES','social-ngo'); ?></span>
								</a>
							</div>
						</div>
					</div>
				</div>

				<div class="row m-0">  
					<?php $social_ngo_catData1 =  get_theme_mod('social_ngo_newsandupdates_category_setting');
					if($social_ngo_catData1){ 
						$args = array(
							'post_type' => 'post',
							'category_name' => $social_ngo_catData1,
							'posts_per_page' => get_theme_mod('social_ngo_newsandupdates_number',3)
						);
						$i=1; ?>
						<?php $query = new WP_Query( $args );
						if ( $query->have_posts() ) :
							while( $query->have_posts() ) : $query->the_post(); ?>
								<div class="col-lg-4 col-md-6 single-newsandupdates-bx">
									<div class="newsandupdates-box">
										<div class="bimg-box">
											<a href="<?php the_permalink(); ?>"><?php the_post_thumbnail(); ?></a>
										</div>
										<div class="newsandupdates-content">
											<div class="box-admin">
												<li class="ath"><a href="<?php echo esc_url( get_permalink() ); ?>"><?php echo get_the_date( 'j' ); ?> <?php echo get_the_date( 'M' ); ?><?php echo get_the_date( 'Y' ); ?></a> </li>

												<li class="comm"><a href="<?php echo esc_url( get_permalink() ); ?>"><i class="far fa-comments"></i> <?php echo esc_html(get_comments_number($post->ID)) ; ?>  Comments</a> </li>	
											</div>

											<a href="<?php the_permalink(); ?>"><h4><?php the_title_attribute(); ?></h4></a>
											<p ><?php $social_ngo_excerpt = get_the_excerpt(); echo esc_html( social_ngo_string_limit_words( $social_ngo_excerpt,30 ) ); ?></p>
										</div>
										<div class="clearfix"></div>
									</div>
								</div>
							<?php $i++; endwhile; 
							wp_reset_postdata(); ?>
						<?php else : ?>
							<div class="no-postfound"></div>
						<?php endif; ?>
					<?php }?>
				</div>
			</div>
		</section>
	<?php }?>

	<?php do_action('social_ngo_below_newsandupdates_section'); ?>


	<div class="container">
	  	<?php while ( have_posts() ) : the_post(); ?>
	  		<div class="lz-content">
	        	<?php the_content(); ?>
	        </div>
	    <?php endwhile; // end of the loop. ?>
	</div>
</main>

<?php get_footer(); ?>