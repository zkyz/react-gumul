import {createAction, handleActions} from 'redux-actions'

const TABLE = {
	OPEN:  'TABLE_OPEN',
	CLOSE: 'TABLE_CLOSE',
	DRAG:  'TABLE_DRAG',
	CLICK: 'TABLE_CLICK'
}

export const actions = {
	table: {
		open:  createAction(TABLE.OPEN),
		close: createAction(TABLE.CLOSE),
		drag:  createAction(TABLE.DRAG),
		click: createAction(TABLE.CLICK)
	}
}

export default handleActions({
		[TABLE.DRAG]: (state, action) => {
			console.log(action)
			return ({
				...state,
				selecting: action.payload
			})
		}
	},
	{
		selecting: false
	})