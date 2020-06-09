import React, {useState, useCallback, useEffect} from 'react';
import logo from './logo.svg';
import './App.css';
import Watch from './stopwatch.js';

function App() {
  let [countingIntervalId, setCountingIntervalId] = useState(null);
  let [lapTimes, setLapTimes] = useState([]);
  let [isCounting, setIsCounting] = useState(false);
  let [startTime, setStartTime] = useState(null);
  let [millisecondsPaused, setMillisecondsPaused] = useState(0);
  let [timerText, setTimerText] = useState('00:00.00');
  let [lastPauseTime, setLastPauseTime] = useState(0);


  
  let getShowTime = useCallback(function() {
    console.log("updating");
    if (isCounting) {
      let currentTime = Date.now();
      const totalTime = currentTime - startTime;
      console.log(`Current time: ${currentTime}, start time: ${startTime}`)
      setTimerText(formatTimeForTimer(totalTime));
    }
    
  }, [startTime])

  //useEffect(getShowTime);

  const startStop = function() {
    const currentTime = Date.now();
    setIsCounting(!isCounting);

    if (countingIntervalId != null) {
      // stopping
      clearInterval(countingIntervalId);
      setLastPauseTime(currentTime - startTime);
    } else {
      // starting
      //(startTime == null) {
        setStartTime(currentTime+lastPauseTime);
      //}
      
      setCountingIntervalId(setInterval(getShowTime, 10)) 
    }
  }

  return (
    <div className="App">
      <Watch timerText={timerText} isCounting={isCounting} startStop={startStop} resetLap={resetLap}></Watch>
    </div>
  );
}



function resetLap(){
  alert("reset");
}


// format a number for use in the timer, i.e. pad numbers less than 10 with leading zeroes
function padNumber(value) {
  return value.toString().padStart(2, '0');
}

// formats the given centisecond time in MM:SS.CC notation.
function formatTimeForTimer(elapsedTime) {
  const milliseconds = elapsedTime % 1000;
  const [minutes, seconds, centiseconds] = [
      Math.floor(elapsedTime / 60000),
      Math.floor(elapsedTime / 1000) % 60,
      Math.round(milliseconds / 10)
  ].map(padNumber)

  return `${minutes}:${seconds}.${centiseconds}`
}


export default App;
