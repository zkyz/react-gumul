import {actions, types} from './TableSize'

it('POSITION 이 조절될꺼야', () => {
	const given = {
		type:    types.POSITION,
		payload: {
			x: 3,
			y: 4
		}
	}

	const when = actions.position({
		x: 3,
		y: 4
	})

	// then
	expect(when).toEqual(given)
})

it('ENABLE 을 바꿀 수 있을껄', () => {
	const given = {
		type: types.ENABLED,
		payload: true
	}

	const when = actions.enabled(true)

	// then
	expect(when).toEqual(given)
})