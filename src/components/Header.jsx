export default function Header({quizType}){
    return (
        <header>
            <img src={quizType === "react" ? "react.svg" : "angular.png"} alt="React logo"/>
            <h1>{quizType === "react" ? "React" : "Angular"} Quiz</h1>
        </header>
    )
}
