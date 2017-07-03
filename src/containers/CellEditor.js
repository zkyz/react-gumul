import * as React from 'react'
import {createStyleSheet, withStyles} from 'material-ui/styles'
import {FormatBold, FormatColorFill, FormatColorText, FormatItalic, FormatStrikethrough} from 'material-ui-icons'
import Button from 'material-ui/Button'
import {CompactPicker} from 'react-color'

class CellEditor extends React.PureComponent {

	constructor(props) {
		super(props)

		this.state = {
			colors: {
				font: '#000',
				fill: ''
			}
		}

		this.handleColor = this.handleColor.bind(this)
	}

	handleColor(type, color) {
		this.setState({
			colors: {
				[type]: color
			}
		})
	}

	render() {
		return (
			<div className={this.props.classes.container}>
				<Button><FormatBold/></Button>
				<Button><FormatItalic/></Button>
				<Button><FormatStrikethrough/></Button>
				<Button>
					<FormatColorText color={this.state.colors.font}/>
					<div className={this.props.classes.ColorPicker}>
						<CompactPicker onChangeComplete={
							color => this.handleColor('font', color.hex)
						}/>
					</div>
				</Button>
				<Button><FormatColorFill/></Button>
			</div>
		)
	}
}

const styleSheet = createStyleSheet('CellEditor', theme => ({
	'ColorPicker': {
		position:            'absolute',
		right:               '-40px',
		top:                 '40px',
		zIndex:              1,
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
		}
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