<?php
/**
 * The template for displaying search results pages
 * 
 * @subpackage Social NGO
 * @since 1.0
 * @version 0.1
 */

get_header(); ?>

<div class="container">
	<header class="page-header">
		<?php if ( have_posts() ) : ?>
			<h2 class="search-title"><?php /* translators: %s: search term */ printf( esc_html__( 'Search Results for: %s','social-ngo'), '<span>' . esc_html( get_search_query() ) . '</span>' ); ?></h2>
		<?php else : ?>
			<h3 class="page-title"><?php esc_html_e( 'Nothing Found', 'social-ngo' ); ?></h3>
		<?php endif; ?>
	</header>

	<div class="content-area">
		<main id="skip-content" class="site-main" role="main">
			<?php $social_ngo_layout_option = get_theme_mod( 'social_ngo_archive_page_sidebar', 'One Column' );
		    if($social_ngo_layout_option == 'Left Sidebar'){ ?>
		    	<div class="row">
			        <div id="sidebar" class="col-lg-4 col-md-4"><?php dynamic_sidebar('sidebar-1'); ?></div>
			        <div class="content_area col-lg-8 col-md-8">
				    	<section id="post_section">
				    		<div class="row">
								<?php
								if ( have_posts() ) : ?>
									<?php
									while ( have_posts() ) : the_post(); ?>
										
										<div class="col-lg-6 col-md-6">
											<?php get_template_part( 'template-parts/post/content' ); ?>
										</div>

									<?php endwhile;

									else : ?>

										<p><?php esc_html_e( 'Sorry, but nothing matched your search terms. Please try again with some different keywords.', 'social-ngo' ); ?></p>
										<?php get_search_form();

									endif; 
								?>
							</div>
							<div class="navigation">
				                <?php
				                    // Previous/next page navigation.
				                    the_posts_pagination( array(
				                        'prev_text'          => __( 'Previous page', 'social-ngo' ),
				                        'next_text'          => __( 'Next page', 'social-ngo' ),
				                        'before_page_number' => '<span class="meta-nav screen-reader-text">' . __( 'Page', 'social-ngo' ) . ' </span>',
				                    ) );
				                ?>
				                <div class="clearfix"></div>
				            </div>
						</section>
					</div>
					<div class="clearfix"></div>
				</div>
			<?php }else if($social_ngo_layout_option == 'Right Sidebar'){ ?>
				<div class="row">
					<div class="content_area col-lg-8 col-md-8">
						<section id="post_section">
							<div class="row">
								<?php
								if ( have_posts() ) : ?>
									<?php
									while ( have_posts() ) : the_post(); ?>
										
										<div class="col-lg-6 col-md-6">
											<?php get_template_part( 'template-parts/post/content' ); ?>
										</div>

									<?php endwhile;

									else : ?>

										<p><?php esc_html_e( 'Sorry, but nothing matched your search terms. Please try again with some different keywords.', 'social-ngo' ); ?></p>
										<?php get_search_form();

									endif; 
								?>
							</div>
							<div class="navigation">
				                <?php
				                    // Previous/next page navigation.
				                    the_posts_pagination( array(
				                        'prev_text'          => __( 'Previous page', 'social-ngo' ),
				                        'next_text'          => __( 'Next page', 'social-ngo' ),
				                        'before_page_number' => '<span class="meta-nav screen-reader-text">' . __( 'Page', 'social-ngo' ) . ' </span>',
				                    ) );
				                ?>
				                <div class="clearfix"></div>
				            </div>
						</section>
					</div>
					<div id="sidebar" class="col-lg-4 col-md-4"><?php dynamic_sidebar('sidebar-2'); ?>						
					</div>
				</div>
			<?php }else if($social_ngo_layout_option == 'One Column'){ ?>
				<div class="content_area">
					<section id="post_section">
						<div class="row">
							<?php
							if ( have_posts() ) : ?>
								<?php
								while ( have_posts() ) : the_post(); ?>
									
									<div class="col-lg-4 col-md-6">
										<?php get_template_part( 'template-parts/post/content' ); ?>
									</div>

								<?php endwhile;

								else : ?>

									<p><?php esc_html_e( 'Sorry, but nothing matched your search terms. Please try again with some different keywords.', 'social-ngo' ); ?></p>
									<?php get_search_form();

								endif; 
							?>
						</div>
						<div class="navigation">
			                <?php
			                    // Previous/next page navigation.
			                    the_posts_pagination( array(
			                        'prev_text'          => __( 'Previous page', 'social-ngo' ),
			                        'next_text'          => __( 'Next page', 'social-ngo' ),
			                        'before_page_number' => '<span class="meta-nav screen-reader-text">' . __( 'Page', 'social-ngo' ) . ' </span>',
			                    ) );
			                ?>
			                <div class="clearfix"></div>
			            </div>
					</section>
				</div>
			<?php }else if($social_ngo_layout_option == 'Grid Layout'){ ?>
		    	<div class="content_area">
					<section id="post_section">
						<div class="row">
							<?php
							if ( have_posts() ) :

								/* Start the Loop */
								while ( have_posts() ) : the_post();

									get_template_part( 'template-parts/post/grid-layout', get_post_format() );

								endwhile;

								else : ?>

								<p><?php esc_html_e( 'Sorry, but nothing matched your search terms. Please try again with some different keywords.', 'social-ngo' ); ?></p>
								<?php
									get_search_form();

							endif;
							?>
						</div>
						<div class="navigation">
			                <?php
			                    // Previous/next page navigation.
			                    the_posts_pagination( array(
			                        'prev_text'          => __( 'Previous page', 'social-ngo' ),
			                        'next_text'          => __( 'Next page', 'social-ngo' ),
			                        'before_page_number' => '<span class="meta-nav screen-reader-text">' . __( 'Page', 'social-ngo' ) . ' </span>',
			                    ) );
			                ?>
			                <div class="clearfix"></div>
			            </div>
					</section>
				</div>
			<?php } else { ?>
				<div class="row">
					<div class="content_area col-lg-8 col-md-8">
						<section id="post_section">
							<div class="row">
								<?php
								if ( have_posts() ) : ?>
									<?php
									while ( have_posts() ) : the_post(); ?>
										
										<div class="col-lg-6 col-md-6">
											<?php get_template_part( 'template-parts/post/content' ); ?>
										</div>

									<?php endwhile;

									else : ?>

										<p><?php esc_html_e( 'Sorry, but nothing matched your search terms. Please try again with some different keywords.', 'social-ngo' ); ?></p>
										<?php get_search_form();

									endif; 
								?>
							</div>
							<div class="navigation">
				                <?php
				                    // Previous/next page navigation.
				                    the_posts_pagination( array(
				                        'prev_text'          => __( 'Previous page', 'social-ngo' ),
				                        'next_text'          => __( 'Next page', 'social-ngo' ),
				                        'before_page_number' => '<span class="meta-nav screen-reader-text">' . __( 'Page', 'social-ngo' ) . ' </span>',
				                    ) );
				                ?>
				                <div class="clearfix"></div>
				            </div>
						</section>
					</div>
					<div id="sidebar" class="col-lg-4 col-md-4"><?php dynamic_sidebar('sidebar-1'); ?>
					</div>
				</div>
			<?php } ?>
		</main>
	</div>
</div>

<?php get_footer();