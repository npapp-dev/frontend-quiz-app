import {useNavigate} from "react-router-dom";
import Header from "../components/Header.jsx";
import styles from "./AngularQuiz.module.css";

export default function AngularQuizScreen(){
    const navigate = useNavigate();

    return <div className={styles.app}>
        <Header quizType="angular"/>
        <p className={styles.inProgress}>In progress ...</p>
        <button className="btn btn-ui" onClick={()=>navigate('/')}>Home page</button>
    </div>
}
