import { useContext } from "react";
import { QuizContext } from "../context/quiz";
import girlFinished from "../assets/girl-finished.png"
import './GameOver.css'

const GameOver = () => {
    const [quizState, dispatch] = useContext(QuizContext);

    return (
        <div id="gameover">
            <h2>Finish !</h2>
            <p>Score: {quizState.score} </p>
            <p>You got {quizState.score} out of {quizState.questions.length} questions right</p>
            <div className="img-container">
                <img src={girlFinished} alt="Finish" />
            </div>
            <button onClick={() =>  dispatch({type: "NEW_GAME"})}>Restart</button>
            </div>
    );
};

export default GameOver