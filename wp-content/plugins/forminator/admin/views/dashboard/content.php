<?php
/**
 * Template admin/views/dashboard/content.php
 *
 * @package Forminator
 */

$total_modules = forminator_total_forms();
?>
<section class="wpmudev-dashboard-section">
	<?php
	if ( 0 === $total_modules ) {
		$this->template( 'dashboard/widgets/widget-dashboard' );
	} else {
		?>

		<?php $this->template( 'dashboard/widgets/widget-resume' ); ?>

		<div class="sui-row">

			<div class="sui-col-md-6">

				<?php $this->template( 'dashboard/widgets/widget-cform' ); ?>

				<?php $this->template( 'dashboard/widgets/widget-quiz' ); ?>

				<?php
				if ( ! FORMINATOR_PRO ) {
					$this->template( 'dashboard/widgets/widget-poll' );
				}
				?>

			</div>

			<div class="sui-col-md-6">

				<?php
				if ( ! FORMINATOR_PRO ) {
					$this->template( 'dashboard/widgets/widget-upgrade' );
				} else {
					$this->template( 'dashboard/widgets/widget-poll' );
				}
				?>

			</div>

		</div>
		<?php
	}
	$notice_dismissed = get_option( 'forminator_dismiss_feature_1450', false );
	$version_upgraded = get_option( 'forminator_version_upgraded', false );

	// phpcs:ignore WordPress.Security.NonceVerification.Recommended
	$show_popup = ! $notice_dismissed && $version_upgraded && forminator_is_show_documentation_link() && ! isset( $_GET['createnew'] );
	$force      = filter_input( INPUT_GET, 'show-new-feature-notice', FILTER_VALIDATE_BOOLEAN );
	if ( $show_popup || $force ) {
		$this->template( 'dashboard/new-feature-notice' );
	}
	?>

</section>
