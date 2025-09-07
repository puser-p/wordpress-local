FLBlock.registerTemplate( 'test-block', {
	content: ( props, settings ) => {
		const renderedProps = props( {
			className: 'fl-test-block-content'
		} )
		return `<div ${ renderedProps }>${ settings.content }</div>`
	},
	styles: ( nodeId, settings ) => {
		return `.fl-node-${ nodeId } { color: #${ settings.color } }`
	}
} )
