<?php
/**
 * Template admin/views/templates/more-actions.php
 *
 * @package Forminator
 */

if ( ! FORMINATOR_PRO && Forminator_Hub_Connector::hub_connector_logged_in() ) : ?>
<div class="sui-actions-right">
	<div class="sui-dropdown">
		<button class="sui-button-icon sui-dropdown-anchor"
			style="border: 2px solid #DDDDDD;"
			aria-expanded="false"
			aria-label="<?php esc_html_e( 'More options', 'forminator' ); ?>">
			<i class="sui-icon-more" aria-hidden="true"></i>
		</button>

		<ul>
			<li>
				<button data-modal-open="forminator-disconnect-hub-modal">
					<i class="sui-icon-unlink" aria-hidden="true"></i> <?php esc_html_e( 'Disconnect site', 'forminator' ); ?>
				</button>
			</li>
		</ul>
	</div>
</div>
<?php endif; ?>
