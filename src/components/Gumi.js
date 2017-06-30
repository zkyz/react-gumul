import * as React from 'react'
import {connect} from 'react-redux'
import Button from 'material-ui/Button'
import ModeEdit from 'material-ui-icons/ModeEdit'

const arrange = i => [...new Array(i)]

const Gumi = ({edited, head, body}) => (
	<div>
		{
			edited ?
				<Button fab color="primary">
					<ModeEdit />
				</Button>
				: undefined
		}

		
	</div>
)

const mapStateToProps = state => ({
	...state.gumi
})

export default connect(mapStateToProps)(Gumi)