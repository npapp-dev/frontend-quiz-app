import {useState} from 'react'
import {Route, Routes, useNavigate} from 'react-router-dom';
import './App.css'
import ReactQuizScreen from "./screens/ReactQuizScreen";
import AngularQuizScreen from "./screens/AngularQuizScreen.jsx";

function App() {
    const [selectedQuiz, setSelectedQuiz] = useState("");
    const navigate = useNavigate();

    return (
        <>
                <Routes>
                    <Route path="/" element={
                        <div className="main-screen">
                            <h1>Select a Quiz to test your knowledge</h1>
                            <select className="select-dropdown" value={selectedQuiz}
                                    onChange={(e) => setSelectedQuiz(e.target.value)}>
                                <option value="Angular">Angular</option>
                                <option value="React">React</option>
                            </select>
                            <button className="btn btn-ui" onClick={"React"===selectedQuiz ? () => navigate('react') : ()=>navigate('angular')}>Start Quiz</button>
                        </div>
                    }/>
                    <Route path="react" element={<ReactQuizScreen/>}/>
                    <Route path="angular" element={<AngularQuizScreen/>}/>
                </Routes>
        </>
    )
}

export default App
