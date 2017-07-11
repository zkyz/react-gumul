import * as React from 'react'
import {CompactPicker} from 'react-color'

const ColorPicker = ({visible, classes, onPicking}) => {
	return visible ?
		<div className={classes.ColorPicker}>
			<CompactPicker onChangeComplete={color => onPicking(color)}/>
		</div>
		: <div/>
}

export default ColorPicker