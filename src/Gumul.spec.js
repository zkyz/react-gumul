import React from 'react'
import ReactDOM from 'react-dom'

import Gumul from './Gumul'

it('Gumul 그려질거야', () => {
	ReactDOM.render(
		<Gumul />,
		document.createElement('div')
	)
})
