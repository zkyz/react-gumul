import {createAction, handleActions} from 'redux-actions'

export const types = {
	CREATE: 'GUMUL@CREATE',
	HEADER: {
		DEFINITION: 'GUMUL@HEADER_DEFINITION',
		GENERATION: 'GUMUL@HEADER_GENERATION',
		HIDE_CELLS: 'GUMUL@HEADER_HIDE_CELLS'
	},
	LOAD:   'GUMUL@LOAD'

}

export const actions = {
	create: createAction(types.CREATE),
	header: {
		definition: createAction(types.HEADER.DEFINITION),
		generation: createAction(types.HEADER.GENERATION),
		hideCells:  createAction(types.HEADER.HIDE_CELLS)
	},
	load:   createAction(types.LOAD)
}

export default handleActions(
	{
		[types.CREATE]:            (state, action) => {
			const {id, uri, head, body} = action.payload

			if (state.hasOwnProperty(id)) {
				throw new Error('id="${id}" already in used.')
			}

			const defined = {
				head: defineElements(head),
				body: defineElements(body, true)
			}

			return {
				...state,
				[id]: {
					uri,
					data:  [],
					width: [],
					head:  {
						defined:   defined.head,
						generated: generateViaDefined(defined.head)
					},
					body:  {
						defined:   defined.body,
						generated: generateViaDefined(defined.body, true)
					}
				}
			}
		},
		[types.HEADER.DEFINITION]: (state, action) => {
		},
		[types.HEADER.GENERATION]: (state, action) => {
		},
		[types.HEADER.HIDE_CELLS]: (state, action) => {
			const result = {...state}

			const {id, cells} = action.payload
			result[id].head.generated = generateViaDefined(result[id].head.defined, cells)

			return result
		},
		[types.LOAD]:              (state, action) => {
			const {id} = action.payload
			return {
				...state
			}
		}
	},
	{})

const defineElements = (html, isDataCell) => {

	let id = 0
	let rowIndex = -1

	const items = []
	const ref = (element, id) =>
		isDataCell ? ({
				id,
				name:   element.props['data-name'],
				type:   element.props['data-type'],
				format: element.props['data-format']
			})
			: ({
				id,
				children: element.props.children
			})

	let rows = html.props.children
	if (!Array.isArray(rows)) {
		rows = [rows]
	}

	rows.forEach(tr => {
		rowIndex++

		if (!items[rowIndex]) {
			items[rowIndex] = []
		}

		let cellIndex = -1

		let cells = tr.props.children
		if (!Array.isArray(cells)) {
			cells = [cells]
		}

		cells.forEach(th => {
			id++
			cellIndex++

			if (th.props.colSpan > 1 && th.props.rowSpan > 1) {
				for (let i = 0; i < th.props.rowSpan; i++) {
					if (!items[rowIndex + i]) {
						items[rowIndex + i] = []
					}

					for (let j = 0; j < th.props.colSpan; j++) {
						while (items[rowIndex + i][cellIndex + j]) {
							cellIndex++
						}

						items[rowIndex + i][cellIndex + j] = ref(th, id)
					}
				}

				cellIndex += th.props.colSpan - 1
			}
			else if (th.props.colSpan > 1) {
				for (let i = 0; i < th.props.colSpan; i++) {
					while (items[rowIndex][cellIndex + i]) {
						cellIndex++
					}

					items[rowIndex][cellIndex + i] = ref(th, id)
				}

				cellIndex += th.props.colSpan - 1
			}
			else if (th.props.rowSpan > 1) {
				for (let i = 0; i < th.props.rowSpan; i++) {
					if (!items[rowIndex + i]) {
						items[rowIndex + i] = []
					}

					while (items[rowIndex + i][cellIndex]) {
						cellIndex++
					}

					items[rowIndex + i][cellIndex] = ref(th, id)
				}
			}
			else {
				if (!items[rowIndex]) {
					items[rowIndex] = []
				}

				while (items[rowIndex][cellIndex]) {
					cellIndex++
				}

				items[rowIndex][cellIndex] = ref(th, id)
			}
		})
	})

	return items
}

const generateViaDefined = (cells, isDataCell) => {

	let cid = -1
	const rows = []

	for (let i = 0; i < cells.length; i++) {

		const row = []

		for (let j = 0; j < cells[i].length; j++) {
			if (cells[i][j].id > cid) {
				cid = cells[i][j].id

				let colSpan = 0

				while (cells[i].length > j + ++colSpan
				&& cid === cells[i][j + colSpan].id) {
					//
				}

				let rowSpan = 0

				while (cells.length > i + ++rowSpan
				&& cid === cells[i + rowSpan][j].id) {
					//
				}

				const cell = {...cells[i][j]}

				cell.children = cells[i][j].children
				if (colSpan > 1) cell.colSpan = colSpan
				if (rowSpan > 1) cell.rowSpan = rowSpan

				row.push(cell)
			}
		}

		rows.push(row)
	}

	return rows
}
