import {createAction, handleActions} from 'redux-actions'

export const types = {
	CREATE: 'GUMUL@CREATE',
	HEADER: {
		DEFINITION: 'GUMUL@HEADER_DEFINITION',
		GENERATION: 'GUMUL@HEADER_GENERATION'
	}
}

export const actions = {
	create: createAction(types.CREATE),
	header: {
		definition: createAction(types.HEADER.DEFINITION),
		generation: createAction(types.HEADER.GENERATION)
	}
}

export default handleActions(
	{
		[types.CREATE]:            (state, action) => {
			const {id, head} = action.payload

			if (state.hasOwnProperty(id)) {
				throw new Error('id="${id}" already in used.')
			}

			return {
				...state,
				[id]: {
					width:  [],
					header: {
						defined:   definition(head),
						generated: []
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
		}
	},
	{})

const definition = html => {

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