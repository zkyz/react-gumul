import {combineReducers} from 'redux'
import Gumi from './Gumi'
import TableSizeSetter from './TableSizeSetter'


export default combineReducers({
	gumi: Gumi,
	size: TableSizeSetter
})
