import React from 'react'
import PropTypes from 'prop-types'
import {createStyleSheet, MuiThemeProvider, withStyles} from 'material-ui/styles'
import injectTapEventPlugin from 'react-tap-event-plugin'

import Gumi from './components/Gumi'
import Gumijul from './containers/Gumijul'

const Gumul = ({id}) => (
	<MuiThemeProvider>
		<div>
			<Gumi />
			<Gumijul />
		</div>
	</MuiThemeProvider>
)

Gumul.propTypes = {
	id:      PropTypes.string.isRequired
}

// material-ui required
injectTapEventPlugin()

export default Gumul