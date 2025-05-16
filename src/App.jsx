// react , components , estaticos 
import Welcome from './components/Welcome'
import './App.css'
import { QuizContext } from './context/quiz'
import Question from './components/Question'
import { useContext, useEffect } from 'react'
import GameOver from './components/GameOver'
import PickCategory from './components/pickCategory'

function App() {

  const [quizState, dispatch] = useContext(QuizContext);




  return (

      <div className="App">
        <h1>Programming quiz</h1>
        {quizState.gameStage === "Start" && <Welcome />}
        {quizState.gameStage === "Category" && <PickCategory />}
        {quizState.gameStage ===  "Playing" && <Question />}
        {quizState.gameStage ===   "End" && <GameOver />}
      </div>
 
  )
}

export default App
