import * as React from 'react'
import {style} from 'typestyle'
import {connect} from 'react-redux'
import {actions} from '../modules/gumi'
import XIcon from 'material-ui/svg-icons/image/view-compact'
import {IconButton} from 'material-ui'

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

const arrange = (num, max) =>
	[...new Array(((num || 0) < max ? max : num + 1) + 1).keys()].slice(1)

const TableSizeContainer = ({generated, enabled, x, y, setX, setY, onStart, onEnd, onGenerate}) => (
	<div className={styles.container}>
		<div>
			<input type="number" value={x} onChange={
				e => setX(e, parseInt(e.target.value, 10))
			}/>
			<input type="number" value={y} onChange={
				e => setY(e, parseInt(e.target.value, 10))
			}/>

			<IconButton onClick={onGenerate}>
				<XIcon/>
			</IconButton>
		</div>
		<table className={styles.table}
					 onMouseUp={onEnd}
					 onMouseLeave={onEnd}>
			<tbody>
			{
				arrange(y, 5).map(i => (
						<tr key={i} onMouseEnter={e => enabled && setY(e, i)}>
							{
								arrange(x, 10).map(j => (
										<td key={j}
												onMouseDown={
													e => {
														onStart(e)
														setX(e, j)
														setY(e, i)
													}
												}
												onMouseEnter={e => enabled && setX(e, j)}
												className={j <= x && i <= y ? styles.selected : ''}/>
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
			{
				generated && (
					<table>
						<thead>
						{
							[...new Array(y).keys()].map(i => (
								<tr key={i}>
									{
										[...new Array(x).keys()].map(j => (
											<th key={j}/>
										))
									}
								</tr>
							))
						}
						</thead>
					</table>
				)
			}
		</div>
	</div>
)

const mapStateToProps = state => {
	return ({
		...state.gumi.size
	})
}

const mapDispatchToProps = (dispatch, ownProps) => ({
	setX:       (e, i) => {
		e.preventDefault()
		dispatch(actions.size.position({x: i}))
	},
	setY:       (e, i) => {
		e.preventDefault()
		dispatch(actions.size.position({y: i}))
	},
	onStart:    e => {
		e.preventDefault()
		dispatch(actions.size.position({enabled: true}))
	},
	onEnd:      e => {
		e.preventDefault()
		dispatch(actions.size.position({enabled: false}))
	},
	onGenerate: () => {
		dispatch(actions.size.generate(true))
	}
})

export default connect(mapStateToProps, mapDispatchToProps)(TableSizeContainer)

