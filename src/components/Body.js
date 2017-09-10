import * as React from 'react'
import {connect} from 'react-redux'
import {actions} from '../modules/gumul'
import DataCell from './DataCell'

const Body = ({body, data}) => {

	if (!body || data.length === 0) {
		return (<tbody/>)
	}

	const draw = (item) => (
		body.generated.map((row, i) =>
			<tr key={i}>
				{
					row.map((cell, j) => <DataCell key={j} info={cell} data={item}/>)
				}
			</tr>
		)
	)

	return (
		<tbody>
		{
			data.map((item, i) => draw(item))
		}
		</tbody>
	)
}


const mapStateToProps = (state, props) => ({
	body: state.gumul.body,
	data: state.gumul.data
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
