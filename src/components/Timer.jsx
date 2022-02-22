import React from "react"

function Timer({ hasFinishedGame, finalTimer }) {
	const [timer, settimer] = React.useState(0)

	React.useEffect(() => {
		setTimeout(() => settimer(timer + 1), 1000)
	}, [timer])

	React.useEffect(() => {
		console.log(timer)
		finalTimer(timer)
	}, [hasFinishedGame])

	return <div>{!hasFinishedGame && timer}</div>
}

export default Timer
