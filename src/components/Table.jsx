import React from "react"
import Square from "./Square"

function Table({ height, width }) {
  const baseArray = Array(width).fill(Array(height).fill(false))
  const testMines = JSON.parse(JSON.stringify(baseArray))
  testMines[0][0] = true
  const [openFields, setOpenFields] = React.useState(baseArray)
  const [mines, setMines] = React.useState(testMines)

	return (
		<div>
			
		</div>
	)
}

export default Table
