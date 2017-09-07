import * as React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import DataCell from './DataCell'
import EmptyRow from './EmptyRow'
import {actions} from '../modules/gumul'

class Body extends React.Component {

	componentWillReceiveProps(props) {
		// if (props.uri) {
		// 	fetch(props.uri)
		// 		.then(response => response.json())
		// 		.then(response => props.onLoad(response))
		// }
	}

	render() {
		const {body, data} = this.props

		console.log('render')

		if (!body) {
			return (<tbody/>)
		}

		return (
			<tbody>
			{
				!data || data.length === 0 ? <EmptyRow {...body}/> :
					body.generated.map((row, i) =>
						<tr key={i}>
							{
								row.map((cell, j) => <DataCell key={j} info={cell} data={data}/>)
							}
						</tr>)
			}
			</tbody>
		)
	}
}

Body.propTypes = {
	pid: PropTypes.string.isRequired
}

const mapStateToProps = (state, props) => ({
	...state.gumul[props.pid]
})

const mapDispatchToProps = (dispatch, props) => ({
	onLoad: (data) => {
		console.log('dispatch')
		dispatch(actions.load({
			id: props.pid,
			data
		}))
	}
})

export default connect(mapStateToProps, mapDispatchToProps)(Body)
