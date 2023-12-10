import { useState } from 'react'

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.',
    'Programming can be fun, so can cryptography; however they should not be combined.'
  ]


  const randomIndex = (array) => {
    const len = array.length;
    const randomNumber = Math.floor(Math.random() * len);
    return randomNumber
  } 

  const randomStartIndex = randomIndex(anecdotes);
  
  const [selected, setSelected] = useState(randomStartIndex)
  const [points, setPoints ] = useState(new Array(anecdotes.length).fill(0))
  
  const randomIndexSet = (array) => {
    setSelected(randomIndex(array));
  }
  
  const vote = (index) => {
    const copy = [...points];
    copy[index] += 1;
    setPoints(copy);
  }

  const largeValueIndex = (array) => {
    let max = 0;
    let maxIndex = 0;
    for (let i =0; i< array.length; i++) {
      if (array[i] > max) {
        max = array[i];
        maxIndex = i;
      }
    }
    return maxIndex
  }

  const mostVoteIndex = largeValueIndex(points)

  return (
    <div>
      <Title text={"Anecdotes of the day"} />
       <Anecdotes anecdote={anecdotes[selected]} point={points[selected]} />

      <div>
        <Button handleClick={() => vote(selected)} text={"vote"} />
        <Button handleClick={() => randomIndexSet(anecdotes)}text={"next anecdote"} />
      </div>
      <Title text={"Anecdotes with most votes"} />
        <Anecdotes anecdote={anecdotes[mostVoteIndex]} point={points[mostVoteIndex]} />

    </div>
  )
}

const Title = (props) => <h1>{props.text}</h1>

const Button = (props) => {
  return (
      <button onClick={props.handleClick}>{props.text}</button>
  )
}

const Anecdotes = (props) => {
  const anecdote = props.anecdote;
  const point = props.point
  return (
    <div>
      {anecdote}
      <p>has {point} {point > 0 ? "votes": "vote"}</p>
    </div>
  )
}

export default App