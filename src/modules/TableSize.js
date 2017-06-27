import {createAction, handleActions} from 'redux-actions'

export const types = {
	POSITION: 'GUMUL/TABLE_SIZE/POSITION',
	ENABLED:  'GUMUL/TABLE_SIZE/ENABLED'
}

export const actions = {
	position: createAction(types.POSITION),
	enabled:  createAction(types.ENABLED)
}

export default handleActions(
	{
		[types.POSITION]: (state, action) => {
			console.log(state)
			console.log(action.payload)
			return {
				...state,
				...action.payload
			}
		},
		[types.ENABLED]:  (state, action) => {
			return {
				...state,
				enabled: action.payload
			}
		}
	},
	{
		enabled: false,
		x:       0,
		y:       0
	}
)
