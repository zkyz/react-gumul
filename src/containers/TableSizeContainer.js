import * as React from 'react'
import {style} from 'typestyle'
import {connect} from 'react-redux'
import {actions} from '../modules/TableSize'

const styles = {
	container: style({
		padding: '30px'
	}),
	table:     style({
		border:        '1px solid #ccc',
		borderSpacing: '2px',
		tableLayout:   'fixed',
		'& td':        {
			border: '1px solid #ddd',
			height: '16px',
			width:  '16px'
		}
	}),
	selected:  style({
		backgroundColor: '#ccc'
	})
}

const TableSizeContainer = ({enabled, x, y, setX, setY, onStart, onEnd}) => (
	<div className={styles.container}>
		<div>
			<input type="number" value={x} onChange={
				e => setX(e, parseInt(e.target.value, 10))
			}/>
			<input type="number" value={y} onChange={
				e => setY(e, parseInt(e.target.value, 10))
			}/>
		</div>
		<table className={styles.table}
		       onMouseUp={onEnd}
		       onMouseLeave={onEnd}>
			<tbody>
			{
				[...Array(y >= 4 ? y + 2 : 5).keys()].map(
					i => (
						<tr key={i} onMouseEnter={e => enabled && setY(e, i + 1)}>
							{
								[...Array(x >= 9 ? x + 2 : 10).keys()].map(
									j => (
										<td key={j}
										    onMouseDown={
											    e => {
												    onStart(e)
												    setX(e, j + 1)
												    setY(e, i + 1)
											    }
										    }
										    onMouseEnter={e => enabled && setX(e, j + 1)}
										    className={j <= x && i <= y ? styles.selected : ''}></td>
									)
								)
							}
						</tr>
					)
				)
			}
			</tbody>
		</table>

		<div>

		</div>
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

export default connect(mapStateToProps, mapDispatchToProps)(TableSizeContainer)

