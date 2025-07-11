import { useState } from 'react'

const Header = ({text}) => <h1>{text}</h1>

const Button = ({onClick, text}) => 
<button onClick={onClick}>{text}</button>

const StatisticLine = ({text, value}) => 
  <p>{text} {value}</p>

const Statistics = ({good, neutral, bad}) => {
  const all = good + neutral + bad
  let average
  let positive
  if(all === 0){
    return(
      <div>
        <p>No feedback given</p>
      </div>
    )
  }else{
    average = (good + bad *(-1)) / all
    positive = good / all *100 + '%'
    return(
      /*
      <div>
      <StatisticLine text='good' value={good}/>
      <StatisticLine text='neutral' value={neutral}/>
      <StatisticLine text='bad' value={bad}/>
      <StatisticLine text='all' value={all}/>
      <StatisticLine text='average' value={average}/>
      <StatisticLine text='positive' value={positive}/>
      </div>
      */
     <table >
      <tbody>
        <tr>
          <td><StatisticLine text='good'/></td>
          <td><StatisticLine value={good}/></td>
        </tr>
        <tr>
          <td><StatisticLine text='neutral'/></td>
          <td><StatisticLine value={neutral}/></td>
        </tr>
        <tr>
          <td><StatisticLine text='bad'/></td>
          <td><StatisticLine value={bad}/></td>
        </tr>
        <tr>
          <td><StatisticLine text='all'/></td>
          <td><StatisticLine value={all}/></td>
        </tr>
        <tr>
          <td><StatisticLine text='average'/></td>
          <td><StatisticLine value={average}/></td>
        </tr>
        <tr>
          <td><StatisticLine text='positive'/></td>
          <td><StatisticLine value={positive}/></td>
        </tr>
      </tbody>
    </table>
    )
  } 
}

const App = () => {
  // guarda los clics de cada botón en su propio estado
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const increaseGood = () =>{
    console.log('increase good')
    setGood(good+1)
  }

  const increaseNeutral = () =>{
    console.log('increase neutral')
    setNeutral(neutral+1)
  }

  const increaseBad = () =>{
    console.log('increase bad')
    setBad(bad+1)
  }

  return (
    <div>
      <Header text='give feedback'/>
      <Button onClick={increaseGood} text='Good'/>
      <Button onClick={increaseNeutral} text='Neutral'/>
      <Button onClick={increaseBad} text='Bad'/>
      <Header text='statistics'/>
      <Statistics good={good} neutral={neutral} bad={bad}/>
    </div>
  )
}

export default App