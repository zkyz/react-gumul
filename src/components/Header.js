import * as React from 'react'

export default class Header extends React.Component {

	state = {
		cell: []
	}

	static shouldComponentUpdate() {
		console.log('shouldComponentUpdate')
	}


	componentWillMount() {
		const {html} = this.props
		const {cell} = this.state

		let id = 0
		let rowIndex = -1

		html.props.children.forEach(tr => {
			rowIndex++

			if (!cell[rowIndex]) {
				cell[rowIndex] = []
			}

			let cellIndex = -1
			tr.props.children.forEach(th => {
				id++
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
								text: th.props.children,
								id
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
							text: th.props.children,
							id
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
							text: th.props.children,
							id
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
						text: th.props.children,
						id
					}
				}
			})
		})
	}

	render() {
		const cells = this.generateHtml(this.state.cell, [0,1,2,5])

		return (
			<thead>
			{
				cells.map((row, i) => <tr key={i}>
					{
						row.map((cell, j) => <th key={j} {...cell}/>)
					}
				</tr>)
			}
			</thead>
		)
	}

	generateHtml(rawCells, hiddenIndex) {
		let cells = []
		if (!hiddenIndex) {
			cells = [...rawCells]
		}
		else {
			let indexes = null
			if (Array.isArray(hiddenIndex)) {
				indexes = hiddenIndex.sort((a, b) => b - a)
			}
			else if (Number.isInteger(hiddenIndex)) {
				indexes = [hiddenIndex]
			}

			if (indexes) {
				rawCells.forEach(_row => {
					let row = [..._row]
					indexes.forEach(i => {
						row = row.slice(0, i).concat(row.slice(i + 1))
					})
					cells.push(row)
				})
			}
		}

		let cid = -1
		const rows = []

		for (let i = 0; i < cells.length; i++) {
			const row = []

			for (let j = 0; j < cells[i].length; j++) {
				if (cells[i][j].id > cid) {
					cid = cells[i][j].id

					let colSpan = 0
					while (cells[i].length > j + ++colSpan
						&& cid === cells[i][j + colSpan].id) {}

					let rowSpan = 0
					while (cells.length > i + ++rowSpan
						&& cid === cells[i + rowSpan][j].id) {}

					const cell = {children: cells[i][j].text}
					if (colSpan > 1) cell.colSpan = colSpan
					if (rowSpan > 1) cell.rowSpan = rowSpan

					row.push(cell)
				}
			}

			rows.push(row)
		}

		return rows
	}
}
