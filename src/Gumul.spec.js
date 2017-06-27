import React from 'react'
import ReactDOM from 'react-dom'

import Gumul from './Gumul'

it('rendering', () => {
	ReactDOM.render(
		<Gumul>
		</Gumul>,
		document.createElement('div')
	)
})