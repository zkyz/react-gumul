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

const theme = createMuiTheme({
	typography: {
		fontFamily: ['Roboto', 'NanumSquare', 'sans-serif'],
		fontWeightLight: 100,
		fontWeightRegular: 300,
		fontWeightMedium: 400
	}
})

ReactDOM.render(
	<Provider store={store}>
		<MuiThemeProvider theme={theme}>
			<Gumul title="미리해보기"
						 uri="http://www.filltext.com/?rows=10&fname={firstName}&lname={lastName}&tel={phone|format}&address={addressObject}&city={city}&state={usState}&hasOwnCells={numberRange|10000,999999}&words={lorem|50}&id={username}&pin={password}&adult={bool}&ip={ip}&birthday={date}"
						 height={400}
						 width={550}
						 widths={[60, 90, 100, 70, 90, 90, 120, 60, 80, 100, 50, 40, 200]}
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
								 <td rowSpan="2" data-name="fname"/>
								 <td rowSpan="2" data-name="lname"/>
								 <td rowSpan="2" data-name="birthday"/>
								 <td rowSpan="2" data-name="hasOwnCells"/>
								 <td rowSpan="2" data-name="id"/>
								 <td rowSpan="2" data-name="pin"/>
								 <td rowSpan="2" data-name="ip"/>
								 <td rowSpan="2" data-name="adult"/>
								 <td rowSpan="2" data-name="city"/>
								 <td data-name="state"/>
								 <td rowSpan="2" data-name="address.streetAddress"/>
								 <td rowSpan="2" data-name="address.zip"/>
								 <td rowSpan="2" data-name="words"/>
							 </tr>
							 <tr>
								 <td data-name="address.state"></td>
							 </tr>
							 </tbody>
						 }
			/>
		</MuiThemeProvider>
	</Provider>
	,
	document.querySelector('#root')
)
