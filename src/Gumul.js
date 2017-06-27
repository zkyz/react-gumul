import React from 'react'
import PropTypes from 'prop-types'
import {createStore} from 'redux'
import {style} from 'typestyle'
import {Provider} from 'react-redux'

import reducers from './modules/index'
import TableSizeContainer from './containers/TableSizeContainer'
import GumiMenu from './components/GumiMenu'
import {MuiThemeProvider} from 'material-ui'
import injectTapEventPlugin from 'react-tap-event-plugin'


const styles = {
	base: style({
		'':           {
			height:         '100%',
			tableLayout:    'fixed',
			borderCollapse: 'collapse',
			width:          '100%'
		},
		'& th, & td': {
			border: '1px solid #aaa'
		}
	})
}

//noinspection JSUnresolvedVariable
const extension = window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
const store = createStore(reducers, extension)

injectTapEventPlugin()

const Gumul = ({id}) => (
	<Provider store={store}>
		<MuiThemeProvider>
			<div>
				<table id={id} className={styles.base}/>
				<GumiMenu />
				<TableSizeContainer />
			</div>
		</MuiThemeProvider>
	</Provider>
)

Gumul.propTypes = {
	id: PropTypes.string.isRequired
}

export default Gumul