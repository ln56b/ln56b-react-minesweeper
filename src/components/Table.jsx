import './Table.css'
import React from "react"
import Square from "./Square"

function Table({ height, width }) {
  const baseArray = Array(width).fill(Array(height).fill(false))
  const testMines = JSON.parse(JSON.stringify(baseArray))
  testMines[0][0] = true
  const [openFields, setOpenFields] = React.useState(baseArray)
  const [mines, setMines] = React.useState(testMines)

  function openField(x,y) {
    if (openFields[x][y]) {
      return;
    }
    const newOpenFields = JSON.parse(JSON.stringify(openFields));
    newOpenFields[x][y] = true;
    setOpenFields(newOpenFields);
  }

	return (
		<div className="table">
			{
        openFields.map((column, x) => (
          <div className="table-column" key={x}>
            {
              column.map((isFieldOpen, y) => (
                <Square
                  key={`${x.toString()},${y.toString()}`}
                  value={`${x.toString()},${y.toString()}`}
                  isMine={mines[x][y]}
                  isOpen={isFieldOpen}
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
