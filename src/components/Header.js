import * as React from 'react'

export default class Header extends React.Component {

	state = {
		cell: []
	}

	shouldComponentUpdate() {
		console.log('shouldComponentUpdate')
	}

	componentWillMount() {
	}

	render() {
		const cells = [...this.state.cell]

		console.log(cells)

		return (
			<thead>
			{/*{
				cell.map((tr, i) => <tr key={i}>
					{
						tr.map((th, j) => this.renderCell(th, j))
					}
				</tr>)
			}*/}
			</thead>
		)
	}

	renderCell(cells, ) {

	}
}
