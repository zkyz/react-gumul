import * as React from 'react'

export default class Header extends React.Component {

	state = {
		cell: []
	}

	shouldComponentUpdate() {
		console.log('shouldComponentUpdate')
	}


	componentWillMount() {
		const {html} = this.props
		const {cell} = this.state

		let rowIndex = -1
		html.props.children.forEach(tr => {
			rowIndex++

			if (!cell[rowIndex]) {
				cell[rowIndex] = []
			}

			let cellIndex = -1
			tr.props.children.forEach(th => {
				cellIndex++

				if (th.props.colSpan > 1 && th.props.rowSpan > 1) {
					for (let i = 0; i < th.props.rowSpan; i++) {
						if (!cell[rowIndex + i]) {
							cell[rowIndex + i] = []
						}

						for (let j = 0; j < th.props.colSpan; j++) {
							while (cell[rowIndex + i][cellIndex + j]) {
								cellIndex++
							}

							cell[rowIndex + i][cellIndex + j] = {
								element:    th,
								duplicated: i > 0 || j > 0
							}
						}
					}

					cellIndex += th.props.colSpan - 1;
				}
				else if (th.props.colSpan > 1) {
					for (let i = 0; i < th.props.colSpan; i++) {
						while (cell[rowIndex][cellIndex + i]) {
							cellIndex++
						}

						cell[rowIndex][cellIndex + i] = {
							element:    th,
							duplicated: i > 0
						}
					}

					cellIndex += th.props.colSpan - 1;
				}
				else if (th.props.rowSpan > 1) {
					for (let i = 0; i < th.props.rowSpan; i++) {
						if (!cell[rowIndex + i]) {
							cell[rowIndex + i] = []
						}

						while (cell[rowIndex + i][cellIndex]) {
							cellIndex++
						}

						cell[rowIndex + i][cellIndex] = {
							element:    th,
							duplicated: i > 0
						}
					}
				}
				else {
					if (!cell[rowIndex]) {
						cell[rowIndex] = []
					}

					while (cell[rowIndex][cellIndex]) {
						cellIndex++
					}

					cell[rowIndex][cellIndex] = {
						element:    th,
						duplicated: false
					}
				}
			})
		})
	}

	render() {
		const cell = [...this.state.cell]

		cell.forEach(i => {
			i[1].duplicated = true
		})

		console.log(cell)

		return (
			<thead>
			{
				cell.map((tr, i) => <tr key={i}>
					{
						tr.map((th, j) => this.renderCell(th, j))
					}
				</tr>)
			}
			</thead>
		)
	}

	renderCell(cell, index) {
		if (!cell.duplicated) {
			return (
				<th key={index} {...cell.element.props}></th>
			)
		}
	}
}
