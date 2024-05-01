import {useEffect} from "react";

export default function Timer({secondsRemaining, dispatch}){
    const mins = Math.floor(secondsRemaining/60);
    const seconds = secondsRemaining % 60;

    useEffect(function(){
        const id = setInterval(function() {
            dispatch({type: 'tick'})
        }, 1000);
        return () => clearInterval(id);
    }, [dispatch])
    return <div>
        <p className="timer">You have {mins < 10 && "0"}{mins}:{seconds<10 && "0"}{seconds} to complete the Quiz.</p>
    </div>
}
