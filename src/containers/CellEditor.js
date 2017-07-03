import * as React from 'react'
import {createStyleSheet, withStyles} from 'material-ui/styles'
import {FormatBold, FormatColorFill, FormatColorText, FormatItalic, FormatStrikethrough} from 'material-ui-icons'
import {Button} from 'material-ui'

const CellEditor = ({classes}) => (
	<div className={classes.CellEditor}>
		<Button><FormatBold/></Button>
		<Button><FormatItalic/></Button>
		<Button><FormatStrikethrough/></Button>
		<Button><FormatColorText/></Button>
		<Button><FormatColorFill/></Button>
	</div>
)

const styleSheet = createStyleSheet('CellEditor', theme => ({
	'CellEditor': {
		position:    'relative',
		'&::before': {
			borderColor: '#eee transparent #eee transparent',
			borderStyle: 'solid solid none solid',
			borderWidth: '7px 7px 0 7px',
			bottom:      '-7px',
			content:     '" "',
			left:        '10px',
			position:    'absolute'
		},
		'&>button':  {
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