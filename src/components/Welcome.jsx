import programming_quiz from "../assets/girl.png"
import './Welcome.css'
import { useContext } from "react"
import { QuizContext } from "../context/quiz"


const Welcome = () => {
    const [quizState, dispatch] = useContext(QuizContext);


console.log(quizState)
    return (
        <div id="welcome">
            <h2>Welcome</h2>
            <p>Click the button below to get started</p>
     
            <img src={programming_quiz} alt="Start of Quiz" />
            <button onClick={() => dispatch({type: "CHANGE_STATE"})}>Start</button>
        </div>
    )
}

export default Welcome