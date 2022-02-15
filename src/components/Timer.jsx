import React from "react"

function Timer() {
  const [counter, setCounter] = React.useState(0);

  React.useEffect(() => {
    const timer =
      setInterval(() => setCounter(counter + 1), 1000);
    return () => clearInterval(timer);
  }, [counter]);

  return (
    <div>{counter}</div>
  )
}

export default Timer