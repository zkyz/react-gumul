import React from 'react'
import PropTypes from 'prop-types'
import {style} from 'typestyle'
import {MuiThemeProvider} from 'material-ui/styles'
import injectTapEventPlugin from 'react-tap-event-plugin'
import Gumi from './components/Gumi'
import Gumijul from './containers/Gumijul'

const baseStyles = style({
	'> table': {
		borderCollapse: 'collapse',
		tableLayout:    'fixed',
		minWidth:       '30px',
		'& th, & td':   {
			border: '1px solid #aaa',
			height: '1rem'
		}
	}
})

const Gumul = ({id}) => (
	<MuiThemeProvider>
		<div className={baseStyles}>
			<Gumi />
			<Gumijul />
		</div>
	</MuiThemeProvider>
)

Gumul.propTypes = {
	id: PropTypes.string.isRequired
}

// material-ui required
injectTapEventPlugin()

export default Gumul