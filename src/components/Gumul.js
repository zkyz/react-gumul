import React from 'react'
import {createStore} from 'redux'
import {style} from 'typestyle'
import {Provider} from 'react-redux'

import reducers from '../modules'
import TableSizeSetter from './TableSizeSetter'

const styles = {
	base: style({
		'':           {
			height:         '100%',
			tableLayout:    'fixed',
			borderCollapse: 'collapse',
			width:          '100%'
		},
		'& th, & td': {
			border: '1px solid #aaa'
		}
	})
}

//noinspection JSUnresolvedVariable
const exts = window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
const store = createStore(reducers, exts)

const Gumul = ({head}) => (
	<Provider store={store}>
		<div>
			<table className={styles.base}>
				<caption></caption>
				<colgroup>
				</colgroup>
				{head}
			</table>
			<TableSizeSetter />
		</div>
	</Provider>
)

export default Gumul