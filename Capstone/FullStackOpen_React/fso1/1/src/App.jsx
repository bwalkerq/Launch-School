import { useState } from 'react'

const Button = ({onClick, text} ) => {
  return <button onClick={onClick}>{text}</button>
}

const StatisticLine = ({ text, stat}) => <p>{text}: {stat}</p>

const Statistics = ({ good, bad, neutral, total}) => {
  function average() {
    return (good + -1 * bad) / total
  }

  if (total === 0) {
    return <p>no feedback given</p>
  }
  return (
    <div>
      <StatisticLine text='good' stat={good}/>
      <StatisticLine text='neutral' stat={neutral}/>
      <StatisticLine text='bad' stat={bad}/>
      <StatisticLine text='total' stat={total}/>
      <StatisticLine text='average' stat={average()}/>
      <StatisticLine text='positive' stat={good/total}/>
    </div>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [total, setTotal] = useState(0)

  const handleGood = () => {
    setGood(good + 1)
    setTotal(total + 1)
  }

  const handleBad = () => {
    setBad(bad + 1)
    setTotal(total + 1)
  }

  const handleNeutral = () => {
    setNeutral(neutral + 1)
    setTotal(total + 1)
  }

  return (
    <div>
      <h2>give feedback</h2>
      <Button onClick={handleGood} text='Good'/>
      <Button onClick={handleNeutral} text='Neutral'/>
      <Button onClick={handleBad} text='Bad'/>
      <h2>statistics</h2>
      <Statistics good={good} bad={bad} neutral={neutral} total={total}/>
    </div>
  )
}

export default App