import * as React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'

const Header = ({generated}) => (
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

Header.propTypes = {
	pid: PropTypes.string.isRequired
}

const mapStateToProps = (state, props) => {
	const header = {}
	if (state.gumul.hasOwnProperty(props.pid)) {
		Object.assign(header, {
			...state.gumul[props.pid].header
		})
	}

	return header
}

export default connect(mapStateToProps)(Header)
