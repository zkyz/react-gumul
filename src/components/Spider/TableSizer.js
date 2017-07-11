import * as React from 'react'
import {connect} from 'react-redux'

import {spider} from '../../modules/spider'
import TextField from 'material-ui/TextField'

const TableSizer = ({classes, size, existsSize, onChangeSize, onDragCells}) => (
	<div className={classes}>
		<div>
			<TextField label="가로" type="number" value={size.x} onChange={e => onChangeSize(e, 'x')}/>
			<TextField label="세로" type="number" value={size.y} onChange={e => onChangeSize(e, 'y')}/>
		</div>
		<table>
			<Row size={size} existsSize={existsSize} onDragCells={onDragCells}/>
		</table>
	</div>
)

const mapStateToProps = state => ({
	size: state.spider.size,
	existsSize: {
		x: state.spider.head[0].length,
		y: state.spider.head.length
	}
})

const mapStateToDispatch = (dispatch, prevProps) => ({
	onChangeSize: (e, type) => {
		dispatch(spider.actions.size.change({
			[type]: parseInt(e.target.value, 10)
		}))
	},
	onDragStart: (x, y) => {
		dispatch(spider.actions.size.dragStart())
	}
})

export default connect(mapStateToProps, mapStateToDispatch)(TableSizer)

const Row = ({size, existsSize, active, onDragStart}) => {
	console.log(existsSize)
	return (
		<tbody>
		{
			[...new Array(size.y || 0)].map(
				(item, i) => (
					<tr key={i}>
						{
							[...new Array(size.x || 0)].map(
								(item, j) => (
									<td key={j}
									    className={
										    (i < existsSize.y && j < existsSize.x ? 'exists' : '') +
										    (active && i < size.y && j < size.x ? ' selected' : '')
									    }
									    onMouseDown={
									    	e => {
									    		e.preventDefault()
									    		onDragStart()
										    }
									    }
									></td>
								))
						}
					</tr>
				)
			)
		}
		</tbody>
	)
}
