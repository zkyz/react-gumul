import {createAction, handleActions} from 'redux-actions'

export const types = {
	size: {
		POSITION:  'GUMUL/TABLE_SIZE/POSITION',
		GENERATED: 'GUMUL/TABLE_SIZE/GENERATED'
	}
}

export const actions = {
	size: {
		position: createAction(types.size.POSITION),
		generate: createAction(types.size.GENERATED)
	}
}

export default handleActions({
	[types.size.POSITION]:  (state, action) => ({
		size: {
			...state.size,
			...action.payload
		}
	}),
	[types.size.GENERATED]: (state, action) => ({
		size: {
			...state.size,
			generated: action.payload
		},
	})
}, {
	size: {
		generated: false,
		enabled:   false,
		x:         0,
		y:         0
	}
})