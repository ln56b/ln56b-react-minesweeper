import React from 'react'

function Timer({ hasOpenedFirstCell, hasFinishedGame }) {
	const [timer, settimer] = React.useState(0)

	React.useEffect(() => {
		if (hasOpenedFirstCell && !hasFinishedGame) {
			setTimeout(() => settimer(timer + 1), 1000)
		}
	}, [timer, hasOpenedFirstCell, hasFinishedGame])

	return <div>{timer}</div>
}

export default Timer
