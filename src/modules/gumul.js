import {createActions, handleActions} from 'redux-actions'

export const types = {
	DEFINITION: 'GUMUL@HEADER-DEFINITION',
	GENERATION: 'GUMUL@HEADER-GENERATION'
}

export const actions = {
	definition: createActions(types.DEFINITION),
	generation: createActions(types.GENERATION)
}

export default handleActions({
		[types.DEFINITION]: (state, action) => ({}),
		[types.GENERATION]: (state, action) => ({})
	},
	{})