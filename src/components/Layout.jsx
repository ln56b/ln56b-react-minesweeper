import React from "react"
import Table from "./Table"

const height = 6
const width = 9
const testMineNumber = 10

const createFilledTable = (width, height, value) => Array(width).fill(null).map(() => new Array(height).fill(value))

function Layout() {
  const testMines = createFilledTable(width, height, false)
  testMines[0][0] = true
	testMines[3][4] = true
	testMines[8][2] = true
	testMines[2][1] = true
 	const [mineNumber, setMineNumber] = React.useState(testMineNumber)
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
