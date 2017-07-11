import React from 'react'
import PropTypes from 'prop-types'
import {MuiThemeProvider} from 'material-ui/styles'
import injectTapEventPlugin from 'react-tap-event-plugin'

import Spider from './components/Spider'

const Gumul = ({id}) => (
	<MuiThemeProvider>
		<div>
			<Spider/>
		</div>
	</MuiThemeProvider>
)

Gumul.propTypes = {
	id: PropTypes.string.isRequired
}

// material-ui required
injectTapEventPlugin()

export default Gumul