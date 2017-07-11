import React from 'react'
import {connect} from 'react-redux'
import {createStyleSheet, withStyles} from 'material-ui/styles'
import CellEditor from './CellEditor'

const Spider = ({
									 classes, head, body,
									 onPick, onLeave, onSelect
								 }) => (
	<div>
		<table className={classes.table}>
			<colgroup>{
				head[0].map((col, i) => <col key={i}/>)
			}</colgroup>
			<thead>{head.map((row, i) =>
				<tr key={i}>{row.map((column, j) =>
					<th key={j}
							contentEditable={true}
							onSelect={onSelect}
							onClick={onPick}
							onBlur={onLeave}
							dangerouslySetInnerHTML={{__html: column.content}}
					/>
				)}</tr>
			)}</thead>
		</table>
		<table className={classes.table}>
			<colgroup>{head[0].map((col, i) =>
				<col key={i}/>
			)}</colgroup>
			<tbody>{body.map((row, i) =>
				<tr key={i}>{row.map((column, j) =>
					<td key={j}
							contentEditable={true}
							onSelect={onSelect}
							onClick={onPick}
							onBlur={onLeave}
							dangerouslySetInnerHTML={{__html: column.content}}/>
				)}</tr>
			)}</tbody>
		</table>

		<CellEditor/>
	</div>
)

const withStyledGumijul = withStyles(createStyleSheet('Spider', theme => ({
		'table': {
			borderCollapse: 'collapse',
			tableLayout:    'fixed',
			minWidth:       '30px',
			'& th, & td':   {
				border:       '1px solid #ccc',
				fontSize:     '1rem',
				height:       '1rem',
				outline:      'none',
				'&.selected': {
					backgroundColor: 'rgba(100, 200, 200, .2)',
				}
			}
		}
	})
	)
)(Spider)

export default connect(
	state => ({
		...state.gumi
	}),
	dispatch => ({
		onPick:   e => {
			e.target.className = 'selected'
		},
		onLeave:  e => {
			e.target.className = e.target.className.replace(/selected/, '')
		},
		onSelect: () => {
			if (window.getSelection() && window.getSelection().type === 'Range')
				console.log(window.getSelection().toString())
		}
	})
)(withStyledGumijul)