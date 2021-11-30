import React from "react"
import "./Square.css"

function Square({ value, isMine }) {
  const [isOpen, setIsOpen] = React.useState(false);

  const display = isMine ? '💣' : value
  const className = isOpen ? 'open' : 'closed'

	return (
		<button className={className + ' square'} onClick={() => setIsOpen(true)}>
      { isOpen ?? display }
    </button>
	)
}

export default Square