import React from 'react'
import PropTypes from 'prop-types'
import injectTapEventPlugin from 'react-tap-event-plugin'
import MoreHoriz from 'material-ui-icons/MoreHoriz'
import IconButton from 'material-ui/IconButton'
import {withStyles} from 'material-ui/styles'
import Header from './components/Header'

const Gumul = ({classes, id, title, head, body}) => (
	<table id={id} className={classes.table}>
		<caption>
			{title}
			<IconButton><MoreHoriz/></IconButton>
		</caption>
		<Header html={head}/>
		{body}
	</table>
)

Gumul.propTypes = {
	id: PropTypes.string.isRequired
}

export default withStyles({
	'table': {
		borderCollapse: 'collapse',
		tableLayout:    'fixed',
		'& caption':    {
			whiteSpace: 'nowrap'
		},
		'& th>a':       {
			bottom:     0,
			display:    'block',
			height:     '100%',
			position:   'absolute',
			right:      -3,
			width:      7,
			'&::after': {
				content: 'xx'
			}
		}
	}
})(Gumul)

// material-ui required
injectTapEventPlugin()
