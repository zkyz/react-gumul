import * as React from 'react'
import {connect} from 'react-redux'

const Head = ({head}) => (
	<table>
		<colgroup>
			{
				Array.isArray(head[0]) && head[0].map((cell, cellIndex) => (
					<col key={cellIndex}/>
				))
			}
		</colgroup>
		<thead>
		{
			head.map((row, rowIndex) => (
				<tr key={rowIndex}>
					{
						row.map((cell, cellIndex) => (
							cell.merged ? '' :
								<th key={cellIndex}
								    colSpan={cell.colSpan}
								    rowSpan={cell.rowSpan}
								    data-color={cell.color}
								    style={{backgroundColor:cell.color}}
								    dangerouslySetInnerHTML={{__html: cell.content}}/>
						))
					}
				</tr>
			))
		}
		</thead>
	</table>
)

const mapStateToProps = ({spider}) => ({
	head: spider.head
})

export default connect(mapStateToProps)(Head)