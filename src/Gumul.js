import React from 'react'
import PropTypes from 'prop-types'
import injectTapEventPlugin from 'react-tap-event-plugin'
import {withStyles} from 'material-ui/styles'
import Head from './components/Head'
import {actions} from './modules/gumul'
import {connect} from 'react-redux'
import Body from './components/Body'

// material-ui required
injectTapEventPlugin()

class Gumul extends React.Component {

	componentWillMount() {
		this.props.onCreate()
	}

	render() {
		const {classes, width, height} = this.props

		return (
			<div className={classes.base} style={{width, height}}>
				<Head/>
				<Body/>
			</div>
		)
	}
}

const mapStateToProps = state => ({
	...state.gumul
})

const mapDispatchToProps = (dispatch, props) => ({
	onCreate: () => {
		dispatch(
			actions.create({
				...props
			})
		)
	}
})

export default connect(mapStateToProps, mapDispatchToProps)(
	withStyles(theme => ({
		'base': {
			'color':      theme.palette.text.primary,
			'height':     300,
			'width':      500,
			'min-height': 150,
			'overflow':   'auto',
			'position':   'relative',
			'& >.head':   {
				'background-color': '#fff',
				'left':             0,
				'overflow':         'auto',
				'position':         'absolute',
				'top':              0,
				'width':            '100%',
				'z-index':          100
			},
			'& >.body':   {
				'left':     0,
				'position': 'relative',
				'overflow': 'auto'
			},
			'& table':    {
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