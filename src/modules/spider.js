import {createAction, handleActions} from 'redux-actions'

export const spider = {
	types: {
		LOAD:   'GUMUL@SPIDER-LOAD',
		EDITOR: 'GUMUL@SPIDER-EDITOR',
		SIZE:   {
			CHANGE:     'GUMUL@SPIDER-SIZE_CHANGE',
			DRAG_START: 'GUMUL@SPIDER-SIZE_DRAG_START',
			DRAGGING:   'GUMUL@SPIDER-SIZE_DRAGGING',
		},
	}
}

spider.actions = {
	load:   createAction(spider.types.LOAD),
	editor: createAction(spider.types.EDITOR),
	size:   {
		change:    createAction(spider.types.SIZE.CHANGE),
		dragStart: createAction(spider.types.SIZE.DRAG_START),
		dragging:  createAction(spider.types.SIZE.DRAGGING)
	}
}

export default handleActions({
		[spider.types.LOAD]:            (state, action) => ({
			...state,
			...action.payload
		}),
		[spider.types.EDITOR]:          (state, action) => ({
			...state
		}),
		[spider.types.SIZE.CHANGE]:     (state, action) => ({
			...state,
			...{
				size: {...state.size, ...action.payload}
			}
		}),
		[spider.types.SIZE.DRAG_START]: state => ({
			...state,
			...{
				size: {
					...state.size,
					active: true
				}
			}
		})
	}
	,
	{
		head: [
			[
				{
					merged:  false,
					colSpan: 1,
					rowSpan: 1,
					content: 'te<br>st',
					color:   '#fff'
				},
				{
					merged:  false,
					colSpan: 1,
					rowSpan: 1,
					content: 'te<br>st',
					color:   '#fff'
				}
			]
		],
		body: [
			[{
				colSpan: 1,
				rowSpan: 1,
				content: null,
				color:   '#fff'
			}]
		],
		size: {
			x:      1,
			y:      1,
			active: false
		}
	}
)