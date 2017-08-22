import React from 'react'
import ReactDOM from 'react-dom'
import {Provider} from 'react-redux'
import {createStore} from 'redux'

import './index.css'

import Gumul from './Gumul'
import reducers from './modules'
import {MuiThemeProvider, createMuiTheme} from 'material-ui/styles'

//noinspection JSUnresolvedVariable
const extension = window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
const store = createStore(reducers, extension)

const theme = createMuiTheme()

ReactDOM.render(
	<Provider store={store}>
		<MuiThemeProvider theme={theme}>
			<Gumul id="test"
						 title="미리해보기"
						 head={
							 <thead>
							 <tr>
								 <th colSpan="3">Persona</th>
								 <th rowSpan="3" data-column="hasOwnCells" data-format="number">cells</th>
								 <th colSpan="2">account</th>
								 <th rowSpan="3">ip</th>
								 <th rowSpan="3" data-format="bool">a u kid?</th>
								 <th rowSpan="3">city</th>
								 <th rowSpan="3">state</th>
								 <th rowSpan="2" colSpan="2">address</th>
								 <th rowSpan="3">words</th>
							 </tr>
							 <tr>
								 <th colSpan="2">name</th>
								 <th rowSpan="2" data-column="birthday" data-format="date" data-pattern="yyyy-MM-dd(HH:mm)">birthday
								 </th>
								 <th rowSpan="2" data-column="id">id</th>
								 <th rowSpan="2">pin</th>
							 </tr>
							 <tr>
								 <th data-column="fname">first</th>
								 <th data-column="lname">last</th>
								 <th>street</th>
								 <th>zip</th>
							 </tr>
							 </thead>
						 }
						 body={
							 <tbody>
							 <tr>
								 <td data-name="fname"/>
								 <td data-name="lname"/>
								 <td data-name="birthday"/>
								 <td data-name="hasOwnCells"/>
								 <td data-name="id"/>
								 <td data-name="pin"/>
								 <td data-name="ip"/>
								 <td data-name="adult"/>
								 <td data-name="city"/>
								 <td data-name="state"/>
								 <td data-name="address.streetAddress"/>
								 <td data-name="address.zip"/>
								 <td data-name="words"/>
							 </tr>
							 </tbody>
						 }
			/>
		</MuiThemeProvider>
	</Provider>
	,
	document.querySelector('#root')
)
