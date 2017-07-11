import * as React from 'react'
import Button from 'material-ui/Button'
import FormatBold from 'material-ui-icons/FormatBold'
import FormatItalic from 'material-ui-icons/FormatItalic'
import FormatUnderlined from 'material-ui-icons/FormatUnderlined'
import FormatColorText from 'material-ui-icons/FormatColorText'
import FormatColorFill from 'material-ui-icons/FormatColorFill'
import ColorPicker from './ColorPicker'


class CellEditor extends React.PureComponent {

	constructor(props) {
		super(props)

		this.state = {
			classes: props.classes,
			picker:  null,
			color:   {
				font: '#000',
				fill: '#fff'
			}
		}

		this.onPickColor = this.onPickColor.bind(this)
		this.onPicking = this.onPicking.bind(this)
	}

	onPickColor(type) {
		this.setState({
			...this.state,
			picker: type
		})

		console.log(this.state)
	}

	onPicking(color) {
		this.setState({
			...this.state,
			color: {
				...this.state.color,
				[this.state.picker]: color.hex
			}
		})
	}

	render() {
		const {classes, color, picker} = this.state
		return (
			<div className={classes.CellEditor}>
				<Button><FormatBold/></Button>
				<Button><FormatUnderlined/></Button>
				<Button><FormatItalic/></Button>
				<Button onMouseEnter={e => this.onPickColor('font')}
				        onMouseLeave={e => this.onPickColor()}>
					<FormatColorText color={color.font}/>
					<ColorPicker visible={picker === 'font'}
					             classes={classes}
					             onPicking={this.onPicking}/>
				</Button>
				<Button onMouseEnter={e => this.onPickColor('fill')}
				        onMouseLeave={e => this.onPickColor()}>
					<FormatColorFill color={color.fill}/>
					<ColorPicker visible={picker === 'fill'}
					             classes={classes}
					             onPicking={this.onPicking}/>
				</Button>
			</div>
		)
	}
}

export default CellEditor
