import React from 'react'
import PropTypes from 'prop-types'
import injectTapEventPlugin from 'react-tap-event-plugin'
import MoreHoriz from 'material-ui-icons/MoreHoriz'
import IconButton from 'material-ui/IconButton'
import {withStyles} from 'material-ui/styles'

// material-ui required
injectTapEventPlugin()

const Gumul = ({classes, id, title, head}) => {
	const headerCells = generateFromHtml(head)

	console.log(headerCells)

	return (
		<div id={id} className={classes.base}>
			<table>
				<caption>
					{title}
					<IconButton><MoreHoriz/></IconButton>
				</caption>
			</table>
		</div>
	)
}

Gumul.propTypes = {
	id: PropTypes.string.isRequired
}

const generateFromHtml = html => {
	const cell = {
		cell: []
	}

	let id = 0
	let rowIndex = -1
	html.props.children.forEach(tr => {
		rowIndex++

		if (!cell[rowIndex]) {
			cell[rowIndex] = []
		}

		let cellIndex = -1
		tr.props.children.forEach(th => {
			id++
			cellIndex++

			if (th.props.colSpan > 1 && th.props.rowSpan > 1) {
				for (let i = 0; i < th.props.rowSpan; i++) {
					if (!cell[rowIndex + i]) {
						cell[rowIndex + i] = []
					}

					for (let j = 0; j < th.props.colSpan; j++) {
						while (cell[rowIndex + i][cellIndex + j]) {
							cellIndex++
						}

						cell[rowIndex + i][cellIndex + j] = {
							text: th.props.children,
							id
						}
					}
				}

				cellIndex += th.props.colSpan - 1
			}
			else if (th.props.colSpan > 1) {
				for (let i = 0; i < th.props.colSpan; i++) {
					while (cell[rowIndex][cellIndex + i]) {
						cellIndex++
					}

					cell[rowIndex][cellIndex + i] = {
						text: th.props.children,
						id
					}
				}

				cellIndex += th.props.colSpan - 1
			}
			else if (th.props.rowSpan > 1) {
				for (let i = 0; i < th.props.rowSpan; i++) {
					if (!cell[rowIndex + i]) {
						cell[rowIndex + i] = []
					}

					while (cell[rowIndex + i][cellIndex]) {
						cellIndex++
					}

					cell[rowIndex + i][cellIndex] = {
						text: th.props.children,
						id
					}
				}
			}
			else {
				if (!cell[rowIndex]) {
					cell[rowIndex] = []
				}

				while (cell[rowIndex][cellIndex]) {
					cellIndex++
				}

				cell[rowIndex][cellIndex] = {
					text: th.props.children,
					id
				}
			}
		})
	})

	return cell
}

export default withStyles(theme => ({
	'base': {
		'color':       theme.palette.text.primary,
		'font-family': ['Roboto', 'NanumSquare', 'sans-serif'],
		'font-weight': 300,
		'& table':     {
			'border-collapse': 'collapse',
			'table-layout':    'fixed',
			'& caption':       {
				'height':      '42px',
				'font-size':   '1.6rem',
				'font-weight': 300,
				'line-height': 42,
				'padding':     '0 1rem',
				'text-align':  'left',
				'& >button':   {
					'vertical-align': 'middle'
				}
			},
			'& th,td':         {
				'border-color':  theme.palette.grey.A100,
				'border-style':  'solid',
				'border-width':  '1px 0',
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