import * as React from 'react'
import * as ReactDOM from 'react-dom'
import Gumi from './Gumi'

it('Table이 만들어 지겠지', () => {

	const wrapper = mount(<Gumi />)

	ReactDOM.render(
		<Gumi></Gumi>,
		document.createElement('div')
	)
})