import * as React from 'react'

const DataCell = ({info, data}) => {

	const dressedInfo = {}

	if (info.hasOwnProperty('name')) {
		dressedInfo.children = data[info.name]
	}

	if (info.hasOwnProperty('rowSpan')) dressedInfo.rowSpan = info.rowSpan
	if (info.hasOwnProperty('colSpan')) dressedInfo.colSpan = info.colSpan


	return (
		<td {...dressedInfo} />
	)
}

export default DataCell