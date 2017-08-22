import * as React from 'react'

const Colgroup = ({widths}) => (
	<colgroup>
		{
			widths.forEach(width => <col width={width}/>)
		}
	</colgroup>
)

export default Colgroup