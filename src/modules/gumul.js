import {createAction, handleActions} from 'redux-actions'

export const types = {
	CREATE: 'GUMUL@CREATE',
	HEADER: {
		DEFINITION: 'GUMUL@HEADER_DEFINITION',
		GENERATION: 'GUMUL@HEADER_GENERATION',
		HIDE_CELLS: 'GUMUL@HEADER_HIDE_CELLS'
	}
}

export const actions = {
	create: createAction(types.CREATE),
	header: {
		definition: createAction(types.HEADER.DEFINITION),
		generation: createAction(types.HEADER.GENERATION),
		hideCells:  createAction(types.HEADER.HIDE_CELLS)
	}
}

export default handleActions(
	{
		[types.CREATE]:            (state, action) => {
			const {id, head} = action.payload

			if (state.hasOwnProperty(id)) {
				throw new Error('id="${id}" already in used.')
			}

			const definedHeader = defineHeaderElements(head)
			return {
				...state,
				[id]: {
					width:  [],
					header: {
						defined:   definedHeader,
						generated: generateViaDefined(definedHeader)
					},
					body:   {
						defined:   [],
						generated: []
					}
				}
			}
		},
		[types.HEADER.DEFINITION]: (state, action) => {
		},
		[types.HEADER.GENERATION]: (state, action) => {
		},
		[types.HEADER.HIDE_CELLS]: (state, action) => {
			const {id, cells} = action.payload

			const result = {...state}
			const {header} = result[id]

			header.generated = generateViaDefined(header.defined, cells)

			return result
		}
	},
	{})

const defineHeaderElements = html => {

	let id = 0
	let rowIndex = -1

	const items = []
	const ref = (element, id) => ({
		text: element.props.children,
		id
	})

	html.props.children.forEach(tr => {
		rowIndex++

		if (!items[rowIndex]) {
			items[rowIndex] = []
		}

		let cellIndex = -1
		tr.props.children.forEach(th => {
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

const generateViaDefined = (rawCells, hiddenIndex) => {

	let cells = []

	if (!hiddenIndex) {
		cells = [...rawCells]
	}
	else {

		let indexes = null

		if (Array.isArray(hiddenIndex)) {
			indexes = hiddenIndex.sort((a, b) => b - a)
		}
		else if (Number.isInteger(hiddenIndex)) {
			indexes = [hiddenIndex]
		}

		if (indexes) {
			rawCells.forEach(_row => {

				let row = [..._row]

				indexes.forEach(i => {
					row = row.slice(0, i).concat(row.slice(i + 1))
				})

				cells.push(row)
			})
		}
	}

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
				}

				let rowSpan = 0

				while (cells.length > i + ++rowSpan
				&& cid === cells[i + rowSpan][j].id) {
				}

				const cell = {children: cells[i][j].text}

				if (colSpan > 1) cell.colSpan = colSpan
				if (rowSpan > 1) cell.rowSpan = rowSpan

				row.push(cell)
			}
		}

		rows.push(row)
	}

	return rows
}
