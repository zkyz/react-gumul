import * as React from 'react'
import {withStyles, createStyleSheet} from 'material-ui/styles'
import Head from './Head'
import Body from './Body'
import CellEditor from './CellEditor'
import TableSizer from './TableSizer'

const Spider = ({classes}) => (
	<div>
		<div className={classes.Spider}>
			<Head/>
			<Body/>
		</div>
		<CellEditor classes={classes}/>
		<TableSizer classes={classes.TableSizer}/>
	</div>
)

const styles = createStyleSheet('Spider', theme => ({
	'Spider':      {
		'& table': {
			borderCollapse: 'collapse',
			tableLayout:    'fixed',
			minWidth:       '30px',
			'& th, & td':   {
				border:       '1px solid #ccc',
				fontSize:     '1rem',
				height:       '1rem',
				outline:      'none',
				'&.selected': {
					backgroundColor: 'rgba(100, 200, 200, .2)',
				}
			}
		}
	},
	'CellEditor':  {
		display:           'none',
		position:          'absolute',
		zIndex:            999,
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
	},
	'ColorPicker': {
		position:                 'absolute',
		right:                    '-20px',
		top:                      '40px',
		zIndex:                   1,
		'&::before':              {
			borderStyle: 'none solid solid solid',
			borderWidth: '0 7px 7px 7px',
			borderColor: '#fff transparent #fff transparent',
			top:         '-7px',
			content:     '" "',
			right:       '40px',
			position:    'absolute',
			zIndex:      1
		},
		'& .compact-picker':      {
			height:   '60px',
			overflow: 'hidden'
		},
		'& .compact-picker.show': {
			display: 'block'
		}
	},
	'TableSizer':  {
		'& table': {
			border:        '1px solid #ccc',
			borderSpacing: '2px',
			tableLayout:   'fixed',
			'& td':        {
				border:      '1px solid #ddd',
				height:      '16px',
				width:       '16px',
				'&.selected': {
					backgroundColor: '#ccc'
				},
				'&.exists':   {
					border: '1px dashed #ddd'
				}
			}
		}
	}
}))

export default withStyles(styles)(Spider)
