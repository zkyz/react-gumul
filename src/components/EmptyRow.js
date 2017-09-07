import * as React from 'react'

const EmptyRow = ({generated}) => {

	let colSpan = 1

	generated[0].forEach(element => {
		colSpan += (element.colSpan || 1)
	})

	return (
		<tr className="empty-row">
			<td colSpan={colSpan}>No has data.</td>
		</tr>
	)
}

export default EmptyRow
