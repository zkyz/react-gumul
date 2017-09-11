import * as React from 'react'
import {IconButton} from 'material-ui'
import {MoreHoriz} from 'material-ui-icons'
import {connect} from 'react-redux'
import {actions} from '../modules/gumul'

class Head extends React.Component {

	componentDidMount() {
		setTimeout(() => {
			this.props.onArrange(this.refs.head.offsetHeight)
		})
	}

	render() {
		const {head, title, widths} = this.props

		return (
			<div ref="head" className="head">
				<table width={widths.reduce((i, j) => i + j)}>
					<colgroup>
						{
							widths.map((width, i) => <col width={width} key={i}/>)
						}
					</colgroup>
					<caption>
						{title}
						<IconButton><MoreHoriz/></IconButton>
					</caption>
					<thead>
					{
						head ?
							head.generated.map((row, i) =>
								<tr key={i}>
									{
										row.map((cell, j) => <th key={j} {...cell}/>)
									}
								</tr>) : ''
					}
					</thead>
				</table>
			</div>
		)
	}
}

const mapStateToProps = state => ({
	...state.gumul
})

const mapDispatchToProps = dispatch => ({
	onArrange: (height) => {
		dispatch(
			actions.arrange(height)
		)
	}
})

export default connect(mapStateToProps, mapDispatchToProps)(Head)
