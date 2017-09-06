import * as React from 'react'

export default class EmptyRow extends React.Component {

	shouldComponentUpdate(props) {
		this.colSpan = 1
		props.generated[0].forEach(element => {
			this.colSpan += (element.colSpan || 1)
		})

		return true
	}

	render() {
		return (
			<tr className="empty-row">
				<td colSpan={this.colSpan}>No has data.</td>
			</tr>
		)
	}
}
