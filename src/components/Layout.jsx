import React from "react"
import Editor from "./Editor"
import Table from "./Table"

const testMineNumber = 10

const createFilledTable = (width, height, value) =>
	Array(width)
		.fill(null)
		.map(() => new Array(height).fill(value))
const randomInt = (n) => Math.floor(Math.random() * n)

const generateRandomMines = (width, height, mineNumber) => {
	let mines = createFilledTable(width, height, false)
	console.log("mines", mines)
	if (mineNumber === 0) {
		return mines
	}

	let num = 0
	do {
		const x = randomInt(width)
		const y = randomInt(height)
		if (!mines[x][y]) {
			mines[x][y] = true
			num++
		}
	} while (num < mineNumber)
	return mines
}

function Layout() {
	const [mineNumber, setMineNumber] = React.useState(testMineNumber)
	const [height, setHeight] = React.useState(9)
	const [width, setWidth] = React.useState(9)
	const testMines = generateRandomMines(width, height, mineNumber)
	const [mines, setMines] = React.useState(testMines)

	const onSubmitForm = ({ height, width, mines }) => {
		setHeight(height)
		setWidth(width)
		setMineNumber(mines)
		setMines(generateRandomMines(width, height, mines))
	}

	return (
		<React.Fragment>
			<p>Layout component works</p>
			<Editor submitForm={onSubmitForm} />
			<Table
				width={width}
				height={height}
				mineNumber={mineNumber}
				mines={mines}
			/>
		</React.Fragment>
	)
}

export default Layout
