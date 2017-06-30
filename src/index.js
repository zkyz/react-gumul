import React from 'react'
import ReactDOM from 'react-dom'
import {Provider} from 'react-redux'
import {createStore} from 'redux'

import './index.css'

import Gumul from './Gumul'
import reducers from './modules'

//noinspection JSUnresolvedVariable
const extension = window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
const store = createStore(reducers, extension)

ReactDOM.render(
	<Provider store={store}>
		<Gumul id="test"/>
	</Provider>
	,
	document.querySelector('#root')
)
