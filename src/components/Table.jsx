import './Table.css'
import React from 'react'
import Square from './Square'

const createFilledTable = (width, height, value) => Array(width).fill(null).map(() => new Array(height).fill(value))

const calculateFieldValue = (x, y, mines) => {
  if (x < 0 || mines.length <= x || y < 0 || mines[0].length <= y) {
    throw new Error('calculateFieldValue: invalid parameters')
  }
  let sum = !!mines[x][y-1] + !!mines[x][y+1]
  if (x !== 0) {
    sum += !!mines[x-1][y-1] + !!mines[x-1][y] + !!mines[x-1][y+1]
  }
  if (x !== mines.length - 1) {
    sum += !!mines[x+1][y-1] + !!mines[x+1][y] + !!mines[x+1][y+1]
  }
  return sum
}

const calculateFieldValues = (width, height, mines) => {
  let fieldValues = createFilledTable(width, height, 0)

  for (let x = 0; x < width; x++) {
    for (let y = 0; y < height; y++) {
      fieldValues[x][y] = calculateFieldValue(x, y, mines)
    }
  }
  return fieldValues
}

function Table({ width, height, mineNumber, mines }) {
  const [openFields, setOpenFields] = React.useState(createFilledTable(width, height, false))
  const [fieldValues, setFieldValues] = React.useState(createFilledTable(width, height, 0))

  React.useEffect(() => {
    setOpenFields(createFilledTable(width, height, false))
    setFieldValues(calculateFieldValues(width, height, mines))
  }, [mines, height, width])

  function openField(x,y) {
    if (openFields[x][y]) {
      return
    }
    const newOpenFields = JSON.parse(JSON.stringify(openFields))
    newOpenFields[x][y] = true
    setOpenFields(newOpenFields)
  }

	return (
		<div className="table">
			{
        createFilledTable(width, height, 0).map((column, x) => (
          <div className="table-column" key={x}>
            { (fieldValues.length === width && openFields.length === width) &&
              column.map((field, y) => (
                <Square
                  key={`${x.toString()},${y.toString()}`}
                  value={fieldValues[x][y]}
                  isMine={mines[x][y]}
                  isOpen={openFields[x][y]}
                  setIsOpen={() => openField(x, y)}
                />
              ))
            }
          </div>
        ))
      }
		</div>
	)
}

export default Table
