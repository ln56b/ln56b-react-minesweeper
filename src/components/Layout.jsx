import React from "react"
import Table from "./Table"

const height = 6
const width = 9
const testMineNumber = 10

const createFilledTable = (width, height, value) => Array(width).fill(null).map(() => new Array(height).fill(value))
const randomInt = (n) => Math.floor(Math.random() * n)

const generateRandomMines = (width, height, mineNumber) => {
	let mines = createFilledTable(width, height, false)
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
	
	const testMines = generateRandomMines(width, height, mineNumber)
	const [mines, setMines] = React.useState(testMines)

	return (
		<div>
			<Table
				width={width}
				height={height}
				mineNumber={mineNumber}
				mines={mines}
			/>
		</div>
	)
}

export default Layout
