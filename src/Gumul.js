import React from 'react'
import PropTypes from 'prop-types'
import injectTapEventPlugin from 'react-tap-event-plugin'
import MoreHoriz from 'material-ui-icons/MoreHoriz'
import IconButton from 'material-ui/IconButton'
import {withStyles} from 'material-ui/styles'
import Header from './components/Header'
import {actions} from './modules/gumul'
import {connect} from 'react-redux'

// material-ui required
injectTapEventPlugin()

class Gumul extends React.Component {

	componentDidMount() {
		this.props.onCreate()
	}

	render() {
		const {classes, id, title, head} = this.props

		return (
			<div id={id} className={classes.base}>
				<table>
					<caption>
						{title}
						<IconButton><MoreHoriz/></IconButton>
					</caption>
					<Header html={head}/>
				</table>
			</div>
		)
	}
}

Gumul.propTypes = {
	id: PropTypes.string.isRequired
}

const withStyle = withStyles(theme => ({
	'base': {
		'color':       theme.palette.text.primary,
		'font-family': ['Roboto', 'NanumSquare', 'sans-serif'],
		'font-weight': 300,
		'& table':     {
			'border-collapse': 'collapse',
			'table-layout':    'fixed',
			'& caption':       {
				'height':     '42px',
				'font-size':  '1.5rem',
				'padding':    '0 1rem',
				'text-align': 'left',
				'& >button':  {
					'vertical-align': 'middle'
				}
			},
			'& th':            {
				'position':       'relative',
				'vertical-align': 'bottom'
			},
			'& th,td':         {
				'border-color':  theme.palette.grey.A100,
				'border-style':  'solid',
				'border-width':  '0 0 1px',
				'font-weight':   300,
				'height':        27,
				'overflow':      'hidden',
				'padding':       '0 6px',
				'text-overflow': 'ellipsis',
				'white-space':   'nowrap',
				'width':         30
			}
		}
	}
}))(Gumul)

const mapDispatchToProps = (dispatch, state) => {
	return ({
		onCreate: () => {
			dispatch(actions.create(
				{
					id:   state.id,
					head: state.head
				}
			))
		}
	})
}

export default connect(null, mapDispatchToProps)(withStyle)