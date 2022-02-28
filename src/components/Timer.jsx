import React from 'react'

function Timer({ hasFinishedGame }) {
  const [timer, settimer] = React.useState(0)

  React.useEffect(() => {
    if (!hasFinishedGame) {
      setTimeout(() => settimer(timer + 1), 1000)
    }
  }, [timer, hasFinishedGame])

  return <div>{timer}</div>
}

export default Timer
