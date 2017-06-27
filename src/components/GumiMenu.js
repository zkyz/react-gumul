import * as React from 'react'
import TableSizeIcon from 'material-ui/svg-icons/editor/border-outer'
import {IconButton} from 'material-ui'

const styles = {
	medium: {
		btn:  {
			height:  '52px',
			width:   '52px',
			padding: '10px'
		},
		icon: {
			height: '32px',
			width:  '32px'
		}
	}
}

const GumiMenu = () => (
	<div>
		<IconButton tooltip="크기정하기" style={styles.medium.btn} iconStyle={styles.medium.icon}>
			<TableSizeIcon />
		</IconButton>
	</div>
)

export default GumiMenu