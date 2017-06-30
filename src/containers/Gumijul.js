import * as React from 'react'
import {connect} from 'react-redux'

const Gumijul = ({head, body}) => (
	<table>
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

export default connect(mapStateToProps)(Gumijul)