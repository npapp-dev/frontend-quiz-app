import {useReducer} from 'react';
import Header from "../components/Header.jsx";
import Main from "../components/Main.jsx";
import Loader from "../components/Loader.jsx";
import Error from "../components/Error.jsx";
import StartScreen from "./StartScreen.jsx";
import Progress from "../components/Progress.jsx";
import Question from "../components/Question.jsx";
import Timer from "../components/Timer.jsx";
import NextButton from "../components/NextButton.jsx";
import FinishScreen from "./FinishScreen.jsx";

const SECS_PER_QUESTION = 30;

const questions = {
    "questions": [
        {
            "question": "Which is the most popular JavaScript framework?",
            "options": ["Angular", "React", "Svelte", "Vue"],
            "correctOption": 1,
            "points": 10,
        },
        {
            "question": "Which company invented React?",
            "options": ["Google", "Apple", "Netflix", "Facebook"],
            "correctOption": 3,
            "points": 10
        },
        {
            "question": "What's the fundamental building block of React apps?",
            "options": ["Components", "Blocks", "Elements", "Effects"],
            "correctOption": 0,
            "points": 10
        },
        {
            "question": "What's the name of the syntax we use to describe the UI in React components?",
            "options": ["FBJ", "Babel", "JSX", "ES2015"],
            "correctOption": 2,
            "points": 10
        },
        {
            "question": "How does data flow naturally in React apps?",
            "options": [
                "From parents to children",
                "From children to parents",
                "Both ways",
                "The developers decides"
            ],
            "correctOption": 0,
            "points": 10
        },
        {
            "question": "How to pass data into a child component?",
            "options": ["State", "Props", "PropTypes", "Parameters"],
            "correctOption": 1,
            "points": 10
        },
        {
            "question": "How to loop inside JSX?",
            "options":["You can simply use Array.prototype.map with ES6 arrow function syntax.", "You can simply use *ngFor decorator with an array.", "You can loop only in the parent component using Array.prototype.map."],
            "correctOption":0,
            "points":10
        },
        {
            "question": "When to use derived state?",
            "options": [
                "Whenever the state should not trigger a re-render",
                "Whenever the state can be synchronized with an effect",
                "Whenever the state should be accessible to all components",
                "Whenever the state can be computed from another state variable"
            ],
            "correctOption": 3,
            "points": 30
        },
        {
            "question": "What triggers a UI re-render in React?",
            "options": [
                "Running an effect",
                "Passing props",
                "Updating state",
                "Adding event listeners to DOM elements"
            ],
            "correctOption": 2,
            "points": 20
        },
        {
            "question": "When do we directly \"touch\" the DOM in React?",
            "options": [
                "When we need to listen to an event",
                "When we need to change the UI",
                "When we need to add styles",
                "Almost never"
            ],
            "correctOption": 3,
            "points": 20
        },
        {
            "question": "In what situation do we use a callback to update state?",
            "options": [
                "When updating the state will be slow",
                "When the updated state is very data-intensive",
                "When the state update should happen faster",
                "When the new state depends on the previous state"
            ],
            "correctOption": 3,
            "points": 30
        },
        {
            "question": "If we pass a function to useState, when will that function be called?",
            "options": [
                "On each re-render",
                "Each time we update the state",
                "Only on the initial render",
                "The first time we update the state"
            ],
            "correctOption": 2,
            "points": 30
        },
        {
            "question": "Which hook to use for an API request on the component's initial render?",
            "options": ["useState", "useEffect", "useRef", "useReducer"],
            "correctOption": 1,
            "points": 10
        },
        {
            "question": "Which variables should go into the useEffect dependency array?",
            "options": [
                "Usually none",
                "All our state variables",
                "All state and props referenced in the effect",
                "All variables needed for clean up"
            ],
            "correctOption": 2,
            "points": 30
        },
        {
          "question": "What is the difference between Shadow DOM and Virtual DOM?",
            "options":[
                "Nothing",
                "Virtual DOM is the visual representation of Shadow DOM",
                "The Shadow DOM is a browser technology designed primarily for scoping variables and CSS in web components. The Virtual DOM is a concept implemented by libraries in JavaScript on top of browser APIs.",
                "The Virtual DOM is a browser technology designed primarily for scoping variables and CSS in web components. The Shadow DOM is a concept implemented by libraries in JavaScript on top of browser APIs."
            ],
            "correctOption":2,
            "points":40
        },
        {
            "question": "An effect will always run on the initial render.",
            "options": [
                "True",
                "It depends on the dependency array",
                "False",
                "In depends on the code in the effect"
            ],
            "correctOption": 0,
            "points": 30
        },
        {
            "question": "When will an effect run if it doesn't have a dependency array?",
            "options": [
                "Only when the component mounts",
                "Only when the component unmounts",
                "The first time the component re-renders",
                "Each time the component is re-rendered"
            ],
            "correctOption": 3,
            "points": 20
        },
        {
            "question": "What is React Fiber?",
            "options":[
                "Browser technology.",
                "Javascript engine.",
                "Fiber is the new reconciliation engine or reimplementation of core algorithm in React v16.",
                "Fiber is the new rendering engine and implementation of core algorithm in React v16."
            ],
            "correctOption": 2,
            "points":20
        },
        {
            "question": "What is the goal of React Fiber?",
            "options":[
                "Improve rendering process in the commit phase.",
                "The goal of React Fiber is to increase its suitability for areas like animation, layout, gestures, ability to pause, abort, or reuse work and assign priority to different types of updates; and new concurrency primitives.",
                "The goal of React Fiber is to implement suitability areas like animation, layout, gestures, ability to pause, abort, or reuse work and assign priority to different types of updates; and new concurrency primitives.",
                "To provide a rendering engine for React."
            ],
            "correctOption":1,
            "points":10
        },
        {
            "question": "Why you can't update props in React?",
            "options":[
                "The React philosophy is that props should be immutable(read only) and top-down. This means that a parent can send any prop values to a child, but the child can't modify received props.",
                "The React philosophy is that props should be mutable(writable) and bottom-up. This means that a parent cannot send any prop values to a child, but the child can modify received props.",
                "The React philosophy is that props should be immutable(writable) and top-down. This means that a parent can send any prop values to a child, but the child can't modify received props.",
            ],
            "correctOption":0,
            "points":20
        }
    ]
}

const initialState = {
    questions: questions.questions,
    status: 'ready',
    index: 0,
    answer: null,
    points: 0,
    highscore: 0,
    secondsRemaining: questions.questions.length * SECS_PER_QUESTION
}

function reducer(state, action) {
    const question = state.questions.at(state.index);
    switch (action.type) {
        case "dataReceived":
            return {
                ...state,
                questions: action.payload,
                status: "ready"
            };
        case 'dataFailed':
            return {
                ...state,
                status: "error"
            }
        case 'start':
            return {
                ...state,
                status: "active",
                secondsRemaining: Number(state.questions.length * SECS_PER_QUESTION)
            }
        case 'nextQuestion':
            return {
                ...state,
                index: state.index+1, answer: null
            }
        case 'newAnswer':
            return {
                ...state,
                answer: action.payload,
                points: action.payload === question.correctOption ? state.points + question.points : state.points
            }
        case 'finish':
            return {
                ...state,
                status: "finished",
                highscore: state.points > state.highscore ? state.points : state.highscore
            }
        case 'restart':
            return {
                ...initialState, questions: state.questions, status: "ready"
            }
        case 'tick':
            return {
                ...state,
                secondsRemaining: Number(state.secondsRemaining) - 1,
                status: state.secondsRemaining === 0 ? "finished" : state.status
            }
        default:
            throw new Error("Action unknown");
    }
}


export default function ReactQuizScreen() {
    const [{questions, status, index, answer, points, highscore, secondsRemaining}, dispatch] = useReducer(reducer, initialState);

    const numQuestions = questions.length;
    const maxPossiblePoints = questions.reduce((prev, cur) => prev + cur.points, 0);

    return <div className="app">
        <Header quizType="react"/>
        <Main>
            {status === 'loading' && <Loader/>}
            {status === 'error' && <Error/>}
            {status === 'ready' && <StartScreen numQuestions={numQuestions} dispatch={dispatch} />}
            {status === 'active' && <>
                <Progress index={index} numQuestions={numQuestions} points={points} answer={answer} maxPossiblePoints={maxPossiblePoints}/>
                <Question question = {questions[index]} dispatch={dispatch} answer={answer}/>

                <footer>
                    <Timer dispatch={dispatch} secondsRemaining={secondsRemaining}/>
                    <NextButton dispatch={dispatch} answer={answer} index={index} numQuestions={numQuestions}>Next</NextButton>
                </footer>
            </>}
            {status === 'finished' && <FinishScreen points={points} maxPossiblePoints={maxPossiblePoints} highscore={highscore} dispatch={dispatch}/>}
        </Main>
    </div>

}
