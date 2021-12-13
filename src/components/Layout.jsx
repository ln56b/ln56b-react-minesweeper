import React from "react"
import Table from "./Table"

const height = 6
const width = 9
const testMineNumber = 10

function Layout() {
	const baseArray = Array(width).fill(Array(height).fill(false))
  const testMines = JSON.parse(JSON.stringify(baseArray))
  testMines[0][0] = true
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
