import React from 'react'
import ReactDOM from 'react-dom'

import Gumul from '../Gumul'

test('rendering', () => {
	ReactDOM.render(
		<Gumul>
		</Gumul>,
		document.createElement('div')
	)
})