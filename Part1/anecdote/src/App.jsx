import { useState } from 'react'

const getRandomInt = (max) => Math.floor(Math.random() * max);

const Button = ({text, onClick}) => <button onClick={onClick}>{text}</button>

const Header = ({text}) => <h1>{text}</h1>

const Anecdote = ({text}) => <p>{text}</p>

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(Array(8).fill(0))
  
  const selectAnecdote = () => {
    setSelected(getRandomInt(anecdotes.length)) 
  }
  const handleVotes = () => {
    const copy = [...votes]
    copy[selected] += 1
    setVotes(copy)
  }

  const maxVotes = votes.indexOf(Math.max(...votes));

  console.log(selected)
  console.log(votes)
  return (
    <div>
      <Header text='Anecdote of the day'/>
      <Anecdote text={anecdotes[selected]}/>
      <p>has {votes[selected]} votes</p>
      <Button text='vote' onClick={handleVotes}/>
      <Button text='next anecdote' onClick={selectAnecdote}/>
      <Header text='Anecdote with most votes'/>
      <Anecdote text={anecdotes[maxVotes]}/>
    </div>
  )
}

export default App
