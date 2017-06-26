import * as React from 'react'
import {style} from 'typestyle'
import {connect} from 'react-redux'
import {actions} from '../modules/TableSizeSetter'

const styles = {
	base:     style({
		border:        '1px solid #ccc',
		borderSpacing: '2px',
		tableLayout:   'fixed',
		'& td':        {
			border: '1px solid #ddd',
			height: '16px',
			width:  '16px'
		}
	}),
	selected: style({
		backgroundColor: '#ccc'
	})
}

const TableSizeSetter = ({enabled, x, y, setX, setY, onStart, onEnd}) => (
	<div>
		<table className={styles.base}
		       onMouseUp={onEnd}>
			<tbody>
			{
				[...Array(x > 10 ? x : 10).keys()].map(i => (
					<tr key={i} onMouseEnter={e => enabled && setY(e, i)}>
						{
							[...Array(y > 10 ? y : 10).keys()].map(j => (<td key={j}
							                                                 onMouseDown={
								                                                 e => {
									                                                 onStart(e)
									                                                 setX(e, j)
									                                                 setY(e, i)
								                                                 }
							                                                 }
							                                                 onMouseEnter={e => enabled && setX(e, j)}
							                                                 className={j <= x && i <= y ? styles.selected : ''}></td>))
						}
					</tr>
				))
			}
			</tbody>
		</table>
	</div>
)


const mapStateToProps = state => ({
	enabled: state.size.enabled,
	x:       state.size.x,
	y:       state.size.y
})

const mapDispatchToProps = (dispatch, ownProps) => ({
	setX:    (e, i) => {
		e.preventDefault()
		dispatch(actions.position({x: i}))
	},
	setY:    (e, i) => {
		e.preventDefault()
		dispatch(actions.position({y: i}))
	},
	onStart: e => {
		e.preventDefault()
		dispatch(actions.enabled(true))
	},
	onEnd:   e => {
		e.preventDefault()
		dispatch(actions.enabled(false))
	},
})

export default connect(mapStateToProps, mapDispatchToProps)(TableSizeSetter)

