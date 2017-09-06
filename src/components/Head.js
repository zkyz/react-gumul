import * as React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'

const Head = ({generated}) => (
	<thead>
	{
		generated ?
			generated.map((row, i) =>
				<tr key={i}>
					{
						row.map((cell, j) => <th key={j} {...cell}/>)
					}
				</tr>) : ''
	}
	</thead>
)

Head.propTypes = {
	pid:       PropTypes.string.isRequired
}

const mapStateToProps = (state, props) => {
	const head = {}
	if (state.gumul.hasOwnProperty(props.pid)) {
		Object.assign(head, {
			...state.gumul[props.pid].head
		})
	}

	return head
}

export default connect(mapStateToProps)(Head)
