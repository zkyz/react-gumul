import React from 'react'
import PropTypes from 'prop-types'
import {MuiThemeProvider} from 'material-ui/styles'
import injectTapEventPlugin from 'react-tap-event-plugin'

import Gumi from './components/Gumi'

const Gumul = ({id}) => (
	<MuiThemeProvider>
		<div>
			<Gumi/>
		</div>
	</MuiThemeProvider>
)

Gumul.propTypes = {
	id: PropTypes.string.isRequired
}

// material-ui required
injectTapEventPlugin()

export default Gumul