import { useContext, useEffect, useState } from "react"
import { QuizContext } from "../context/quiz"
import programming_question from "../assets/girl-question.png"
import girl_question_acepted from "../assets/girl-question-acepted.png"
import girl_question_error from "../assets/girl-question-error.png"
import Option from "./Option"
import './Question.css'

const Question = () => {

    const [quizState, dispatch] = useContext(QuizContext);
    const currentQuestion = quizState.questions[quizState.currentQuestion]
    const [imagemSrc, setImagemSrc] = useState(programming_question);
    const onSelectOpiton = (option) => {
        dispatch({
            type: "CHECK_ANSWER",
            payload: { answer: currentQuestion.answer, option }
        });
    };

    useEffect(() => {
        if (quizState.answerSelected) {
            if (quizState.answer === currentQuestion.answer) {
                setImagemSrc(girl_question_acepted);
            } else {
                setImagemSrc(girl_question_error)
            }
        } else {
            setImagemSrc(programming_question)
        }
    }, [quizState.answerSelected, quizState.answer, currentQuestion.answer]);

    return (
        <div id="question">
            <div className="img-container">
                <img src={imagemSrc} alt="Start of Quiz" />
            </div>
            <p>Question {quizState.currentQuestion + 1} of {quizState.questions.length
            } </p>
            <h2>{currentQuestion.question}</h2>
            <div id="options-container">
                {currentQuestion.options.map((option) => (
                    <Option option={option}
                      key={option} 
                      answer={currentQuestion.answer}
                      selectOption={() => onSelectOpiton(option)} 
                      hide={quizState.optionToHide === option ? "hide" : null}
                    />
                ))}
            </div>
            {!quizState.answerSelected && !quizState.help && (
                <>
                    {currentQuestion.tip && <button onClick={() => dispatch({ type: "SHOW_TIP" })}>Tip</button>}
                    <button onClick={() => dispatch({type: "REMOVE_OPTION"})}>Remove a question</button>
                </>
            )}

            {!quizState.answerSelected && quizState.help === "tip" && (
                <p className="p-tip">{currentQuestion.tip}</p>) }
            {quizState.answerSelected && 
                (<button onClick={() => dispatch({ type: "CHANGE_QUESTION" })}>Continue</button>)}

        </div>
    )
}

export default Question


