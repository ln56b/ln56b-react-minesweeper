import React from "react"
import Editor from "./Editor"
import Table from "./Table"

const createFilledTable = (width, height, value) =>
	new Array(width)
		.fill(null)
		.map(() => new Array(height).fill(value))

const randomInt = (n) => Math.floor(Math.random() * n)

const generateRandomMines = (width, height, mineNumber) => {
	if (!width || !height) {
		throw new Error('generateRandomMines: no width or height given')
	}
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
	const [mineNumber, setMineNumber] = React.useState(13)
	const [height, setHeight] = React.useState(6)
	const [width, setWidth] = React.useState(4)
	const testMines = generateRandomMines(width, height, mineNumber)
	const [mines, setMines] = React.useState(testMines)

	const onSubmitForm = ({ height: newHeight, width: newWidth, mines: newMines }) => {
		setHeight(newHeight)
		setWidth(newWidth)
		setMineNumber(newMines)
		setMines(() => generateRandomMines(newWidth, newHeight, newMines))
	}

	const onGameEnd = (state) => {
		if (state === 'win') {
			console.log('you won!')
		} else {
			console.log('you lost!')
		}
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
				endGame={onGameEnd}
			/>
		</React.Fragment>
	)
}

export default Layout
