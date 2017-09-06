import * as React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import DataCell from './DataCell'
import EmptyRow from './EmptyRow'
import {actions} from '../modules/gumul'

class Body extends React.Component {

	componentDidMount() {
		// TODO fetch and call dispatch as save data
		console.log(this.props)
	}

	render() {
		const {body, data} = this.props

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

const mapStateToProps = (state, props) => {
	const out = {}
	if (state.gumul.hasOwnProperty(props.pid)) {
		Object.assign(out, {
			...state.gumul[props.pid]
		})
	}

	return out
}

const mapDispatchToProps = (dispatch, props) => ({
	onLoad: () => {
		dispatch(actions.load({
			id: props.pid
		}))
	}
})

export default connect(mapStateToProps, mapDispatchToProps)(Body)
