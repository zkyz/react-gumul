import {createAction, handleActions} from 'redux-actions'

export const types = {
	LOAD: 'GUMUL/GUMI/LOAD',
	SIZE: {
		POSITION:  'GUMUL/TABLE_SIZE/POSITION',
		GENERATED: 'GUMUL/TABLE_SIZE/GENERATED'
	}
}

export const actions = {
	load: createAction(types.LOAD),
	size: {
		position: createAction(types.SIZE.POSITION),
		generate: createAction(types.SIZE.GENERATED)
	}
}

export default handleActions({
	[types.LOAD]:           (state, action) => ({
		...state,
		...action.payload
	}),
	[types.SIZE.POSITION]:  (state, action) => ({
		...state,
		...{
			size: {
				...state.size,
			}
		}
	}),
	[types.SIZE.GENERATED]: (state, action) => ({
		size: {
			...state.size,
			generated: action.payload
		},
	})
}, {
	edited: false,
	head:   [[
		{
			colSpan: 1,
			rowSpan: 1,
			content: 'te<br>st'
		},
		{
			colSpan: 1,
			rowSpan: 1,
			content: 'te<br>st'
		}
	]],
	body:   [[{
		colSpan: 1,
		rowSpan: 1,
		content: null
	}]]
})