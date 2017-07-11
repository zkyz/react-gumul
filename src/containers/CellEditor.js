import * as React from 'react'
import {createStyleSheet, withStyles} from 'material-ui/styles'
import FormatBold from 'material-ui-icons/FormatBold'
import FormatColorFill from 'material-ui-icons/FormatColorFill'
import FormatColorText from 'material-ui-icons/FormatColorText'
import FormatItalic from 'material-ui-icons/FormatItalic'
import FormatUnderlined from 'material-ui-icons/FormatUnderlined'

import Button from 'material-ui/Button'
import {CompactPicker} from 'react-color/CompactPicker'

class CellEditor extends React.PureComponent {

	constructor(props) {
		super(props)

		this.state = {
			entered:   '',
			fontColor: '#000',
			fillColor: '#000'
		}

		this.handleColor = this.handleColor.bind(this)
		this.handleEntered = this.handleEntered.bind(this)
		this.handleLeaved = this.handleLeaved.bind(this)
	}

	handleColor(type, color) {
		this.setState({
			...this.state,
			[type + 'Color']: color
		})

		document.execCommand('styleWithCSS', false, true)
		document.execCommand((type === 'fill' ? 'back' : 'fore') + 'Color', false, color)
	}

	handleEntered(type) {
		this.setState({
			...this.state,
			entered: type
		})
	}

	handleLeaved() {
		this.setState({
			entered: null
		})
	}

	render() {
		const {entered, fontColor, fillColor} = this.state
		const classes = this.props.classes

		return (
			<div className={this.props.classes.container}>
				<Button><FormatBold/></Button>
				<Button><FormatUnderlined/></Button>
				<Button><FormatItalic/></Button>
				<Button
					onMouseEnter={e => this.handleEntered('font')}
					onMouseLeave={e => this.handleLeaved()}>
					<FormatColorText color={fontColor}/>
					<div className={classes.ColorPicker + (entered === 'font' ? ' on' : '')}>
						<CompactPicker onChangeComplete={
							color => this.handleColor('font', color.hex)
						}/>
					</div>
				</Button>
				<Button
					onMouseEnter={e => this.handleEntered('fill')}
					onMouseLeave={e => this.handleLeaved()}>
					<FormatColorFill color={fillColor}/>
					<div className={classes.ColorPicker + (entered === 'fill' ? ' on' : '')}>
						<CompactPicker onChangeComplete={
							color => this.handleColor('fill', color.hex)
						}/>
					</div>
				</Button>
			</div>
		)
	}
}

const styleSheet = createStyleSheet('CellEditor', theme => ({
	'ColorPicker': {
		display:             'none',
		position:            'absolute',
		right:               '-40px',
		top:                 '40px',
		zIndex:              1,
		'&.on':              {
			display: 'block'
		},
		'&::before':         {
			borderStyle: 'none solid solid solid',
			borderWidth: '0 7px 7px 7px',
			borderColor: '#fff transparent #fff transparent',
			top:         '-7px',
			content:     '" "',
			right:       '60px',
			position:    'absolute',
			zIndex:      1
		},
		'& .compact-picker': {
			height:   '60px',
			overflow: 'hidden'
		},
	},
	'container':   {
		position:          'relative',
		'&::before':       {
			borderStyle: 'none solid solid solid',
			borderWidth: '0 7px 7px 7px',
			borderColor: '#eee transparent #eee transparent',
			top:         '-7px',
			content:     '" "',
			left:        '10px',
			position:    'absolute'
		},
		'&.upper::before': {
			borderStyle: 'solid solid none solid',
			borderWidth: '7px 7px 0 7px',
			bottom:      '-7px',
			top:         'auto',
		},
		'&>button':        {
			backgroundColor: '#eee',
			minWidth:        0,
			'&:first-child': {
				borderRadius: '7px 0 0 7px'
			},
			'&:last-child':  {
				borderRadius: '0 7px 7px 0'
			}
		}
	}
}))

export default withStyles(styleSheet)(CellEditor)