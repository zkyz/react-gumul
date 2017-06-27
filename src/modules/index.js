import {combineReducers} from 'redux'
import Gumi from './Gumi'
import TableSize from './TableSize'

export default combineReducers({
	gumi: Gumi,
	size: TableSize
})
