import * as React from 'react'
import {connect} from 'react-redux'
import axios from 'axios'
import DataCell from './DataCell'

class Body extends React.Component {

	componentDidMount() {
		if (this.props.uri) {
			axios.get(this.props.uri)
			.then(response => {
				this.setState({
					data: response.data
				})
			})
		}
	}

	draw(body, item) {
		return (
			body.generated.map((row, i) =>
				<tr key={i}>
					{
						row.map((cell, j) => <DataCell key={j} info={cell} data={item}/>)
					}
				</tr>
			)
		)
	}

	render() {

		const {body, widths, onScrollX} = this.props

		return (
			<div className="body" style={body.css} onScroll={onScrollX}>
				<table width={widths.reduce((i, j) => i + j)}>
					<colgroup>
						{
							widths.map((width, i) => <col width={width} key={i}/>)
						}
					</colgroup>
					<tbody>
					{
						this.state && this.state.data.map(item => this.draw(body, item))
					}
					</tbody>
				</table>
			</div>
		)
	}
}


const mapStateToProps = state => ({
	...state.gumul
})

const mapDispatchToProps = (dispatch, props) => ({
	onScrollX: (e) => {
		console.log(e.target)
	}
})

export default connect(mapStateToProps, mapDispatchToProps)(Body)
