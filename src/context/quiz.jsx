import { Children, createContext, useReducer } from "react";
import questions from '../data/question_complete'

const STAGES = ["Start", "Category", "Playing", "End"];

const initialState = {
    gameStage: STAGES[0],
    questions,
    currentQuestion: 0,
    score: 0,
    answerSelected: false,
    help: false,
    optionToHide: null

}

const quizReduce = (state, action) => {

    console.log(state, action)

    switch (action.type) {
        case "CHANGE_STATE":
            return {
                ...state,
                gameStage: STAGES[1],
            };

        case "START_GAME":
            let quizQuestions = null
            state.questions.forEach((question) => {
                if(question.category === action.payload) {
                    quizQuestions = question.questions
                }
            })

            return {
                ...state,
                questions: quizQuestions,
                currentQuestion: 0,
                gameStage: STAGES[2],
            }

        case "REORDER_QUESTIONS":
            const reorderedQuestions = state.questions.sort(() => {
                return Math.random() - 0.5;
            });
            return {
                ...state,
                questions: reorderedQuestions,
            };

        case "CHANGE_QUESTION":
            const nexQuestion = state.currentQuestion + 1;

            let endGame = false

            if (!state.questions[nexQuestion]) {
                endGame = true
            }

            return {
                ...state,
                currentQuestion: nexQuestion,
                gameStage: endGame ? STAGES[3] : state.gameStage,
                answerSelected: false,
                answer: null,
                help: false,
            };
        case "NEW_GAME":
            return initialState;

        case "CHECK_ANSWER":
            if (state.answerSelected) return state;
          

           const answer = action.payload.answer
           const option = action.payload.option
            let correctAnswer = 0

            if (answer === option) correctAnswer = 1;

            return {
                ...state,
                score: state.score + correctAnswer,
                answerSelected: true,
                answer: option,
            };

            case "SHOW_TIP": 
             return {
                ...state,
                help: "tip",
             }

             case "REMOVE_OPTION":
                const questionWithoutOption = state.questions[state.currentQuestion];

                let repeat = true;
                let optionToHide;

                questionWithoutOption.options.forEach((option) => {
                    if(option !== questionWithoutOption.answer && repeat) {
                        optionToHide = option;
                        repeat = false;
                    }
                });

                return {
                    ...state,
                    optionToHide,
                    help: true,
                };


                
        default:
            return state;
    }
}

export const QuizContext = createContext()

export const QuizProvider = ({ children }) => {
    const value = useReducer(quizReduce, initialState);

    return <QuizContext.Provider value={value}>{children}</QuizContext.Provider>;
};


// PAREI NA TELA DE GAME OVER 
