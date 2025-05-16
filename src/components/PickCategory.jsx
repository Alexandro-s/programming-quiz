import { useContext } from 'react';
import { QuizContext } from '../context/quiz';
import girl_choose from '../assets/girl-choose.png'

import './PickCategory.css'


const PickCategory = () => {
    const [quizState, dispatch] = useContext(QuizContext)

    const chooseCategoryAndReorderQuestions = (category) => {
        dispatch({ type: "START_GAME", payload: category });
        dispatch({ type: "REORDER_QUESTIONS" });

    };
    return (
        <div id='category'>
            <h2>Choose a category</h2>
            <p>The questions will refer to one of the programming languages below</p>
            <div className='btn-choose'>{quizState.questions.map((question) => (
                <button onClick={() => chooseCategoryAndReorderQuestions(question.category)} key={question.category}>{question.category}</button>
            ))}</div>
            <img src={girl_choose} alt="" />


        </div>
    )
}

export default PickCategory;