import * as React from 'react'
import {connect} from 'react-redux'

const Head = ({head}) => (
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
)

const mapStateToProps = (state, props) => ({
	head: state.gumul.head
})

export default connect(mapStateToProps)(Head)
