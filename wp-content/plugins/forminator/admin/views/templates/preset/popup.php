<?php
/**
 * Template admin/views/templates/preset/popup.php
 *
 * @package Forminator
 */

?>
<div class="sui-modal sui-modal-xl">
	<div
		role="dialog"
		id="forminator-modal-template-preview"
		class="sui-modal-content"
		aria-modal="true"
		aria-labelledby="forminator-modal-template-preview__title"
		aria-describedby="forminator-modal-template-preview__description"
	>
		<div class="sui-box">
			<div class="sui-box-header">
				<h3 id="forminator-popup__title" class="sui-box-title">
				</h3>
				<button class="sui-button-icon sui-button-float--right forminator-popup-close" data-modal-close>
					<span class="sui-icon-close sui-md" aria-hidden="true"></span>
					<span class="sui-screen-reader-text"><?php esc_html_e( 'Close', 'forminator' ); ?></span>
				</button>
			</div>
			<div class="sui-box-body sui-content-center forminator-preview-image">
				<img src=""
					alt="<?php esc_html_e( 'Preview template', 'forminator' ); ?>"
					class="sui-image"
					aria-hidden="true"
				/>
			</div>
			<div class="sui-box-footer">
				<button class="sui-button sui-button-ghost" data-modal-close>
					<?php esc_html_e( 'Close', 'forminator' ); ?>
				</button>
				<div class="sui-actions-right"></div>
			</div>
		</div>
	</div><!-- END .sui-modal-content -->
</div><!-- END .sui-modal -->

<!-- Modal for disconnected site -->
<?php if ( ! FORMINATOR_PRO && Forminator_Hub_Connector::hub_connector_logged_in() ) { ?>
<div class="sui-modal sui-modal-sm">
	<div
		role="dialog"
		id="forminator-disconnect-hub-modal"
		class="sui-modal-content"
		aria-modal="true"
		aria-labelledby="forminator-disconnect-hub-title"
		aria-describedby="forminator-disconnect-hub-description"
		data-esc-close="true"
	>
		<div class="sui-box">
			<div class="sui-box-header sui-flatten sui-content-center sui-spacing-top--60">
				<h3 id="forminator-disconnect-hub-title" class="sui-box-title sui-lg">
					<?php esc_html_e( 'Disconnect Site?', 'forminator' ); ?>
				</h3>
				<button type="button" class="sui-button-icon sui-button-float--right" data-modal-close>
					<i aria-hidden="true" class="sui-icon-close sui-md"></i>
					<span class="sui-screen-reader-text"><?php esc_html_e( 'Close this dialog.', 'forminator' ); ?></span>
				</button>
				<p id="forminator-disconnect-hub-description" class="sui-description">
					<?php esc_html_e( 'Do you want to disconnect your site from WPMU DEV?', 'forminator' ); ?>
				</p>
			</div>
			<div class="sui-box-body sui-flatten">
				<div class="sui-notice sui-notice-yellow">
					<div class="sui-notice-content">
						<div class="sui-notice-message">
							<i aria-hidden="true" class="sui-notice-icon sui-md sui-icon-info"></i>
							<p style="color: rgb(136, 136, 136);">
								<?php
								printf(
									/* translators: 1. opening b tag, 2. closing b tag */
									esc_html__( 'Note that disconnecting your site from %1$sWPMU DEV%2$s will disable other services that rely on this connection.', 'forminator' ),
									'<strong>',
									'</strong>'
								);
								?>
							</p>
						</div>
					</div>
				</div>
			</div>
			<div class="sui-box-footer sui-flatten sui-content-center">
				<button type="button" class="sui-button sui-button-ghost" data-modal-close>
					<?php esc_html_e( 'Cancel', 'forminator' ); ?>
				</button>
				<button type="submit" class="sui-button" id="forminator-disconnect-hub">
					<span class="sui-loading-text">
						<i aria-hidden="true" class="sui-icon-plug-disconnected"></i>
						<?php esc_html_e( 'Disconnect site', 'forminator' ); ?>
					</span>
					<i aria-hidden="true" class="sui-icon-loader sui-loading"></i>
				</button>
			</div>
		</div>
	</div>
</div>
<?php } ?>
