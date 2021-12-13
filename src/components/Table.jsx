import './Table.css'
import React from 'react'
import Square from './Square'

function Table({ height, width, mineNumber, mines }) {
  const baseFieldArray = Array(width).fill(Array(height).fill(false))
  const baseValueArray = Array(width).fill(Array(height).fill(0))

  const [openFields, setOpenFields] = React.useState(baseFieldArray)
  const [fieldValues, setFieldValues] = React.useState(baseValueArray)

  React.useEffect(() => {
    setOpenFields(baseFieldArray)
    setFieldValues(generateNewFieldValues(mines))
  }, [mines])

  function generateNewFieldValues(newMines) {
    // TODO: calculate all the values based on the new location of the mines
    return baseValueArray
  }

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
        baseFieldArray.map((column, x) => (
          <div className="table-column" key={x}>
            {
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
