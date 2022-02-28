import React from 'react'

function Timer({ hasOpenedFirstCell, hasFinishedGame }) {
	const [timer, setTimer] = React.useState(0)

	React.useEffect(() => {
		if (hasOpenedFirstCell && !hasFinishedGame) {
			setTimeout(() => setTimer(timer + 1), 1000)
		}
	}, [timer, hasOpenedFirstCell, hasFinishedGame])

	return <div>{timer}</div>
}

export default Timer
