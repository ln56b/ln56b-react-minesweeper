import React from 'react'
import './Square.css'
import { FIELD_STATES } from '../config/constants'

function valueDisplay(value) {
	switch (value) {
		case 1:
			return <font color='blue'>1</font>
		case 2:
			return <font color='green'>2</font>
		case 3:
			return <font color='red'>3</font>
		case 4:
			return <font color='#0e026b'>4</font>
		case 5:
			return <font color='#6b0000'>5</font>
		case 6:
			return <font color='#004b73'>6</font>
		case 7:
			return <font color='#875703'>7</font>
		case 8:
			return <font color='black'>8</font>
		default:
			return ''
	}
}

function Square({ value, isMine, state, openField, flagField, isReadonly }) {
	const isOpen = state === FIELD_STATES.OPEN
	const isFlagged = state === FIELD_STATES.FLAGGED
	const className = isOpen ? 'open' : 'closed'
	let display = ''

	if (isOpen) {
		display = isMine ? '💣' : valueDisplay(value)
	} else if (isFlagged) {
		display = '🚩'
	}

	function handleRightClick(event) {
		event.preventDefault()
		if (isReadonly) {
			return
		}
		flagField()
	}

	return (
		<button
			className={className + ' square'}
			onClick={() => (isReadonly ? null : openField())}
			onContextMenu={handleRightClick}
		>
			{display}
		</button>
	)
}

export default Square
