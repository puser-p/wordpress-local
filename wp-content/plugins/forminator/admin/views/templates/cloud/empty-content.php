<?php
/**
 * Template admin/views/templates/cloud/empty-content.php
 *
 * @package Forminator
 */

?>
<div class="sui-box sui-message sui-message-lg" id="no-templates" style="display: none;">
	<img src="<?php echo esc_url( forminator_plugin_url() . 'assets/images/forminator-no-result.png' ); ?>"
		srcset="<?php echo esc_url( forminator_plugin_url() . 'assets/images/forminator-no-result.png' ); ?> 1x, <?php echo esc_url( forminator_plugin_url() . 'assets/images/forminator-no-result@2x.png' ); ?> 2x"
		alt="<?php esc_attr_e( 'Forminator no result', 'forminator' ); ?>"
		class="sui-image sui-image-center fui-image">
	<div class="sui-message-content">
		<h2><?php esc_html_e( 'No saved templates yet', 'forminator' ); ?></h2>
		<p>
			<?php
			esc_html_e( 'Save any of your forms as cloud templates to reuse them across your sites connected to the Hub – no need to start from scratch. Your saved templates will appear here. ', 'forminator' );
			?>
			<br/>
			<?php
			printf(
				/* translators: %1$s - opening anchor tag, %2$s - closing anchor tag */
				esc_html__( '%1$sLearn how to save forms as cloud template%2$s.', 'forminator' ),
				'<a href="https://wpmudev.com/docs/wpmu-dev-plugins/forminator/#templates" target="_blank">',
				'</a>'
			);
			?>
		</p>
		<?php if ( ! FORMINATOR_PRO && Forminator_Hub_Connector::hub_connector_logged_in() ) : ?>
		<div class="sui-message-footer" style="margin-top: 150px;">
			<span class="sui-button sui-button-ghost" data-modal-open="forminator-disconnect-hub-modal">
				<?php esc_html_e( 'Disconnect site', 'forminator' ); ?>
			</span>
		</div>
		<?php endif; ?>
	</div>
</div>
