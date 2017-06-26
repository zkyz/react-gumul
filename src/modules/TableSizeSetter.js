import {createAction, handleActions} from 'redux-actions'
const actionNames = {
	POSITION: 'TABLE_SIZE_SETTER/POSITION',
	ENABLED:  'TABLE_SIZE_SETTER/ENABLED'
}

export const actions = {
	position: createAction(actionNames.POSITION),
	enabled:  createAction(actionNames.ENABLED)
}

export default handleActions({
		[actionNames.POSITION]: (state, action) => {
			return {...state, ...action.payload}
		},
		[actionNames.ENABLED]: (state, action) => {
			return {
				...state,
				enabled: action.payload
			}
		}
	},
	{
		enabled: false,
		x: 0,
		y: 0
	})