import * as React from 'react'
import {connect} from 'react-redux'
import {actions} from '../modules/Gumi'

const Column = ({
	                rowSpan, colSpan, format, pattern,
	                children, selecting,
	                onMouseDown, onMouseUp
                }) => (
	<th rowSpan={rowSpan}
	    colSpan={colSpan}
	    onMouseEnter={
		    (e) => {
			    if (selecting)
				    e.target.style.backgroundColor = '#eee'
		    }
	    }
	    onMouseLeave={
		    (e) => {
			    if (!selecting)
				    e.target.style.backgroundColor = null
		    }
	    }
	    onMouseDown={onMouseDown}
	    onMouseUp={onMouseUp}
	>{children}</th>
)

const mapStateToProps = state => ({
	selecting: state.gumi.selecting
})

const mapDispatchToProps = dispatch => ({
	onMouseDown: e => {
		e.preventDefault()
		dispatch(actions.table.drag(true))
	},
	onMouseUp:   e => {
		dispatch(actions.table.drag(false))
	}
})

export default connect(mapStateToProps, mapDispatchToProps)(Column)