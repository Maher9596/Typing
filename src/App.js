import React, {useState, useEffect, useRef} from "react"
import './App.css';

function App() {
// BECAUSE I WILL USE TIME IN 2 DIFFERENT PLACES
const TIME = 10

// STATE FOR INPUTTED TEXT BY USER
const[word, setWords] = useState("")

// STATE FOR COUNTER
const[timeRemaining, setTimeRemaining] = useState(TIME)

// STATE FOR STARTING THE GAME
const[isGameOn, setIsGameOn] = useState(false)

// STATE FOR TIME
const[wordsCount, setWordsCount] = useState(0)

// I USE USEREF TO FOCUS ON THE TEXTAREA ON CLICK OF START
const inputRef = useRef(null)


// THIS FUNCTION WILL STORE WHAT THE USER INPUTS IN A STATE
const handleChange = (e) => {
  setWords(e.target.value)
}

// THIS FUNCTION WILL STORE WORDS SEPARATED BY " " IN AN ARRAY AND WILL RETURN THE LENGTH IT WHICH = NUMBER OF WORDS
const calculateWords = (word) => {
  const wordsArr= word.trim().split(" ")
  return wordsArr.filter(text => text !== "").length
}

// THIS FUNCTION WILL RESET THE SETTINGS SO THAT THE USER CAN START PLAYING AGAIN
const startGame = () => {
  setIsGameOn(true)
  setTimeRemaining(TIME)
  setWords("")
  inputRef.current.disabled = false
  inputRef.current.focus()
}

// THIS FUNCTION WILL CHANGE THE STATE OF THE GAME TO STOP AND COUNT NUMBER OF WORDS TYPED USING THE (CALCULATEWORDS) FN
const endGame = () => {
  setIsGameOn(false)
  setWordsCount(calculateWords(word))
}

// THE FIRST TIME THE APP RENDERS (ISGAMEON) WILL BE FALSE SO IT WILL NOT RUN.
// WHEN THE USER CLICKS START IT WILL FLIP (ISGAMEON) TO TRUE WHICH WLL START THE GAME
// WHEN THE TIME REACHES 0 (ENDGAME) WILL BE CALLED. WHICH WILL FLIP (ISGAMEON) TO FALSE
// I USED TO (SETTIMEOUT) INSTEAD OF (SETINTERVAL) BECAUSE WITH USEEFFECT IT IS EASIER
useEffect(() => {
  if(isGameOn && timeRemaining > 0) {
    setTimeout(() => {
      setTimeRemaining(prevTimeRemaining => prevTimeRemaining - 1)
    }, 1000)
  }else {
    endGame()
  }
}, [timeRemaining, isGameOn])

  return (
      <div className="container">
        <h1>How fast can you type</h1>
        <textarea
          type="text" 
          onChange={handleChange} 
          value={word}
          disabled={!isGameOn}
          ref={inputRef}
        />
        {timeRemaining > 3 ? <p>Time Remaining: {timeRemaining}</p> : <p style={{color: "red"}}>Time Remaining: {timeRemaining}</p>}
        <button 
          onClick={startGame}
          disabled={isGameOn}
        >
          Start
        </button>
        <p>Count Word: {wordsCount}</p>
      </div>
  )

}

export default App;
