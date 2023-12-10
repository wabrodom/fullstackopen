import { useState } from 'react'

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const addGood = () => {
    const updateGood = good +1;
    setGood(updateGood);
  }

  const addNeutral = () => {
    setNeutral(neutral +1);
  }

  const addBad = () => {
    setBad(bad + 1);
  }

  return (
    <div>

      <section>
        <Title text="Give Feedback" />
          <AllFeedBackButton 
            handleClicks={[addGood, addNeutral, addBad]} 
            text={['Good', 'Neutral', 'Bad']} 
          />
      </section>

      <section>
        <Title text={"Statistics"} /> 
          <Statistics 
            feedBackCount={[good, neutral, bad]} 
            text={['Good', 'Neutral', 'Bad']} 
          />
      </section>

    </div>
  )
}

const Title = (props) => (<h1>{props.text}</h1>);

const AllFeedBackButton = ({handleClicks, text}) => {
  return (
    <div>
      <Button handleClick={handleClicks[0]} text={text[0]} />
      <Button handleClick={handleClicks[1]} text={text[1]} />
      <Button handleClick={handleClicks[2]} text={text[2]} />
    </div>
  )
}
const Button = (props) => {
  return (
    <button onClick={props.handleClick}>
      {props.text}
    </button>
  )
};

const Statistics = (props) => {
  const feedBackCount = props.feedBackCount;
  const text = props.text

  if (feedBackCount.every(value => value === 0)) {
    return (
      <div>
        <p>No feedback given.</p>
      </div>
    )
  }
  return (
    <table>
      <tbody>
        <StatisticLine value={feedBackCount[0]} text={text[0]}/>
        <StatisticLine value={feedBackCount[1]} text={text[1]}/>
        <StatisticLine value={feedBackCount[2]} text={text[2]}/>
        <StatisticLine value={feedBackCount} text={"All"}/>
        <MathStatistics allCount={feedBackCount}/>
      </tbody>
    </table>
  )
}

const StatisticLine = (props) => {
  const value = props.value
  
  if (Array.isArray(value)) {
    const sumValues = value.reduce((acc, curr) => acc + curr, 0)
    return (
      <tr>
        <td>{props.text}</td>
        <td>{sumValues}</td>
      </tr>
    )
  }

  return (
    <tr>
      <td>{props.text}</td>
      <td>{props.value}</td>
    </tr>
  )
};
 
const MathStatistics = (props) => {
  const allCount = props.allCount;
  const totalFeedBack = allCount.reduce((acc, curr) => acc + curr, 0);
  const weightedAll = (array) => {
    const arr = [...array];
    for (let i = 0; i< arr.length; i++) {
      if      (i === 1) arr[i] = arr[i] * 0;
      else if (i === 2) arr[i] = arr[i] *(-1);
    }
    return arr;
  }

  const totalWeightAll = weightedAll(allCount).reduce((acc,curr) => acc+ curr, 0);
  const avg = totalWeightAll / allCount.length;
  const positivePercent = (allCount[0] / totalFeedBack ) * 100;

  return (
    <>
      <tr>
        <td>average</td> 
        <td>{avg}</td>
      </tr>
      <tr>
        <td>positive</td> 
        <td>{positivePercent} %</td>
      </tr>
    </>
  )
}

export default App
