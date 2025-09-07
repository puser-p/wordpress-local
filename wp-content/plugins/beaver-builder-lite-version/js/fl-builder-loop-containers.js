( function( $ ) {

	const LoopContainers = {

		// Module types for loop containers
		types: [
			'loop'
		],

		init: () => {
			FLBuilder.addHook( 'didAddModule', LoopContainers.moduleAdded )
			FLBuilder.addHook( 'didMoveNode', LoopContainers.moduleAdded )
			FLBuilder.addHook( 'didAddRow', LoopContainers.rowAdded )
			FLBuilder.addHook( 'didAddColumnGroup', LoopContainers.columnAdded )
			FLBuilder.addHook( 'didSaveNodeSettings', LoopContainers.moduleAdded )
			FLBuilder.addHook( 'didDuplicateModule', LoopContainers.copyModule )
		},

		getLoopContainer: ( nodeId ) => {
			const node = $( `.fl-node-${ nodeId }` )

			for ( var i in LoopContainers.types ) {
				const parent = node.parents( `[data-type="${LoopContainers.types[i]}"]` ).last()
				if ( parent.length ) {
					return parent
				}
			}

			return null
		},

		updateLoopForChild: ( nodeId ) => {
			const loop = LoopContainers.getLoopContainer( nodeId )
			if ( loop ) {
				FLBuilder._updateNode( loop.attr( 'data-node' ) )
			}
		},

		copyModule: ( e, { oldNodeId } ) => {
			LoopContainers.updateLoopForChild( oldNodeId )
		},

		moduleAdded: ( e, { nodeId } ) => {
			LoopContainers.updateLoopForChild( nodeId )
		},

		columnAdded: ( e, colId ) => {
			const column = $( '.fl-node-' + colId )
			const nodeId = column.find( '.fl-col-content' ).find( '.fl-module' ).attr( 'data-node' )
			const moduleCount = $( `.fl-node-${ nodeId }` ).length

			// More than one of this module ID, must be a loop
			if ( moduleCount > 1 ) {
				LoopContainers.updateLoopForChild( nodeId )
			}

		},

		rowAdded: ( e, rowId ) => {
			const row = $( '.fl-node-' + rowId )
			const nodeId = row.find( '.fl-row-content' ).find( '.fl-module' ).attr( 'data-node' )
			const moduleCount = $( `.fl-node-${ nodeId }` ).length

			// More than one of this module ID, must be a loop
			if ( moduleCount > 1 ) {
				LoopContainers.updateLoopForChild( nodeId )
			}
		}
	}

	$( LoopContainers.init )

} )( jQuery );
