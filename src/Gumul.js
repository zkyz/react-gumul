import React from 'react'
import PropTypes from 'prop-types'
import injectTapEventPlugin from 'react-tap-event-plugin'
import MoreHoriz from 'material-ui-icons/MoreHoriz'
import IconButton from 'material-ui/IconButton'
import {withStyles} from 'material-ui/styles'
import Head from './components/Head'
import {actions} from './modules/gumul'
import {connect} from 'react-redux'
import Body from './components/Body'
import axios from 'axios'

// material-ui required
injectTapEventPlugin()

class Gumul extends React.Component {

	componentDidMount() {
		this.props.onCreate()

		if (this.props.uri) {
			axios.get(this.props.uri)
			.then(response => this.props.onLoad(response.data))
		}
	}

	render() {
		const {classes, title, onHideCells} = this.props

		return (
			<div className={classes.base}>
				<table>
					<caption>
						{title}
						<IconButton onClick={onHideCells}><MoreHoriz/></IconButton>
					</caption>
					<Head/>
					<Body/>
				</table>
			</div>
		)
	}
}

Gumul.propTypes = {
	title: PropTypes.string.isRequired,
	head:  PropTypes.element.isRequired,
	body:  PropTypes.element.isRequired
}

const mapDispatchToProps = (dispatch, props) => ({
	onCreate:    () => {
		dispatch(actions.create(
			{
				id:   props.id,
				uri:  props.uri,
				head: props.head,
				body: props.body
			}
		))
	},
	onLoad:      (data) => {
		dispatch(actions.load({
			id: props.id,
			data
		}))
	},
	onHideCells: () => {
		dispatch(actions.header.hideCells(
			{
				id:    props.id,
				cells: [1, 2, 3]
			}
		))
	}
})

export default connect(undefined, mapDispatchToProps)(
	withStyles(theme => ({
		'base': {
			'color':   theme.palette.text.primary,
			'& table': {
				'table-layout':    'fixed',
				'border-collapse': 'collapse',
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
				},
				'& .empty-row':    {
					'text-align': 'center'
				}
			}
		}
	}))(Gumul)
)