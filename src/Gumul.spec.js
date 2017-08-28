import React from 'react'
import ReactDOM from 'react-dom'

import Gumul from './Gumul'

beforeEach(() => {
	global.fetch = jest.fn().mockImplementation(() => {
		return new Promise((resolve, reject) => {
			resolve({
				width:  [1, 2, 3, 4, 5],
				header: {},
				body:   {}
			})
		})
	})
})

it('Gumul 그려질거야', () => {
	ReactDOM.render(
		<Gumul/>,
		document.createElement('div')
	)
})

it('Header 설정 json 을 읽을거야', () => {
	fetch('')
	.then(response => {
		expect(response.width[0]).toBe(1)
	})

})
