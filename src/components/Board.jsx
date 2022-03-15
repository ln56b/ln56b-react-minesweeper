import './Board.css'
import React from 'react'
import Square from './Square'
import { FIELD_STATES } from '../config/constants'

const createFilledBoard = (width, height, value) =>
	Array(width)
		.fill(null)
		.map(() => new Array(height).fill(value))

const calculateFieldValue = (x, y, mines) => {
	if (x < 0 || mines.length <= x || y < 0 || mines[0].length <= y) {
		throw new Error('calculateFieldValue: invalid parameters')
	}
	let sum = !!mines[x][y - 1] + !!mines[x][y + 1]
	if (x !== 0) {
		sum += !!mines[x - 1][y - 1] + !!mines[x - 1][y] + !!mines[x - 1][y + 1]
	}
	if (x !== mines.length - 1) {
		sum += !!mines[x + 1][y - 1] + !!mines[x + 1][y] + !!mines[x + 1][y + 1]
	}
	return sum
}

const calculateFieldValues = (width, height, mines) => {
	let fieldValues = createFilledBoard(width, height, 0)

	for (let x = 0; x < width; x++) {
		for (let y = 0; y < height; y++) {
			fieldValues[x][y] = calculateFieldValue(x, y, mines)
		}
	}
	return fieldValues
}

let openCellsNumber = 0

function Board({
	width,
	height,
	mineNumber,
	mines,
	endGame,
	hasFinishedGame,
	hasOpenedFirstCell,
}) {
	const [fieldStates, setFieldStates] = React.useState(
		createFilledBoard(width, height, FIELD_STATES.CLOSED)
	)
	const [fieldValues, setFieldValues] = React.useState(
		createFilledBoard(width, height, 0)
	)

	const openArea = ({ fieldStates, fieldValues, x, y }) => {
		if (
			x < 0 ||
			fieldStates.length <= x ||
			y < 0 ||
			fieldStates[0].length <= y ||
			fieldStates[x][y] === FIELD_STATES.OPEN ||
			fieldStates[x][y] === FIELD_STATES.FLAGGED
		) {
			return
		}
		fieldStates[x][y] = FIELD_STATES.OPEN
		openCellsNumber++

		if (fieldValues[x][y] > 0) {
			return fieldStates
		}
		for (let x1 of [x - 1, x, x + 1]) {
			for (let y1 of [y - 1, y, y + 1]) {
				openArea({ fieldStates, fieldValues, x: x1, y: y1 })
			}
		}
	}

	React.useEffect(() => {
		openCellsNumber = 0
		setFieldStates(createFilledBoard(width, height, FIELD_STATES.CLOSED))
		setFieldValues(calculateFieldValues(width, height, mines))
	}, [mines, height, width])

	React.useEffect(() => {
		if (openCellsNumber === 1) {
			hasOpenedFirstCell(true)
		}
		if (mineNumber + openCellsNumber === height * width) {
			endGame('win')
		}
	}, [openCellsNumber])

	function openField(x, y) {
		if (
			fieldStates[x][y] === FIELD_STATES.OPEN ||
			fieldStates[x][y] === FIELD_STATES.FLAGGED
		) {
			return
		}
		let newFieldStates = JSON.parse(JSON.stringify(fieldStates))
		if (mines[x][y]) {
			newFieldStates[x][y] = FIELD_STATES.OPEN
			endGame('lose')
		} else {
			openArea({ fieldStates: newFieldStates, fieldValues, x, y })
		}
		setFieldStates(newFieldStates)
		return
	}

	function flagField(x, y) {
		if (fieldStates[x][y] === FIELD_STATES.OPEN) {
			return
		}
		let newFieldStates = JSON.parse(JSON.stringify(fieldStates))
		if (fieldStates[x][y] === FIELD_STATES.CLOSED) {
			newFieldStates[x][y] = FIELD_STATES.FLAGGED
		} else if (fieldStates[x][y] === FIELD_STATES.FLAGGED) {
			newFieldStates[x][y] = FIELD_STATES.CLOSED
		}
		setFieldStates(newFieldStates)
		return
	}

	return (
		<div className='board'>
			{createFilledBoard(width, height, 0).map((column, x) => (
				<div className='board-column' key={x}>
					{fieldValues.length === width &&
						fieldStates.length === width &&
						column.map((field, y) => (
							<Square
								key={`${x.toString()},${y.toString()}`}
								value={fieldValues[x][y]}
								isMine={mines[x][y]}
								state={fieldStates[x][y]}
								openField={() => openField(x, y)}
								flagField={() => flagField(x, y)}
								isReadonly={hasFinishedGame}
							/>
						))}
				</div>
			))}
		</div>
	)
}

export default Board
