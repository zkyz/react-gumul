import * as React from 'react'
import {connect} from 'react-redux'
import {createStyleSheet, withStyles} from 'material-ui/styles'

const styles = createStyleSheet('Gumijul', theme => ({
	'table': {
		borderCollapse: 'collapse',
		tableLayout:    'fixed',
		minWidth:       '30px',
		'& > thead':    {
			'& + * > tr > td': {
				border: '2px solid red'
			}
		}
	}
}))

const Gumijul = ({classes, head, body}) => (
	<table className={classes.table}>
		<thead>
		{
			head.map((row, i) =>
				<tr key={i}>
					{
						row.map((col, j) =>
							<th key={j}>{col.content}</th>
						)
					}
				</tr>
			)
		}
		</thead>
		<tbody>
		{
			body.map((row, i) =>
				<tr key={i}>
					{
						row.map((col, j) =>
							<td key={j}>{col.content}</td>
						)
					}
				</tr>
			)
		}
		</tbody>
	</table>
)

const mapStateToProps = state => ({
	...state.gumi
})

const Tag = withStyles(styles)(Gumijul)
export default connect(mapStateToProps)(Tag)