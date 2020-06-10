import React, {useState, useCallback, useEffect, useRef} from 'react';
import logo from './logo.svg';
import './App.css';
import Watch from './stopwatch.js';

function App() {
  let [countingIntervalId, setCountingIntervalId] = useState(null);
  let [lapTimes, setLapTimes] = useState([]);
  let [isCounting, setIsCounting] = useState(false);
  let startTime = useRef(null);
  //let [millisecondsPaused, setMillisecondsPaused] = useState(0);
  let [timerText, setTimerText] = useState('00:00.00');
  //let [lastPauseTime, setLastPauseTime] = useState(0);
  //let [children, setChildren] = useState([]);
  let [isInitial, setIsInitial] = useState(true);
  let [lastLapTime, setLastLapTime] = useState(0);
  
  let getShowTime = function() {
    let currentTime = Date.now();
    const totalTime = currentTime - startTime.current;
    setTimerText(formatTimeForTimer(totalTime));
  };

  const startStop = function() {
    const currentTime = Date.now();
    setIsCounting(!isCounting);

    if (countingIntervalId != null) {
      // stopping
      clearInterval(countingIntervalId);
      setCountingIntervalId(null);
    } else {
      // starting
      if (startTime.current == null) {
        startTime.current = currentTime;
      }
      
      setCountingIntervalId(setInterval(getShowTime, 10));
    }
  }

  const resetLap = function(){
 
    if (countingIntervalId != null) {
      // lap
      //alert("lap");
      logLap();
    } else {
      // reset
      startTime.current = null;
      setTimerText('00:00.00');
      setLapTimes([]);
      setIsInitial(true);
      setLastLapTime(0);
    }
  }

  const logLap = function(){
    let laptime;
    let currentTime = Date.now();
    const totalTime = currentTime - startTime.current;
  
      if(isInitial){
        
        
        laptime=formatTimeForTimer(totalTime);
        //time[index]= totalTime;
        setLastLapTime(totalTime);
        setIsInitial(false);
    }else{
        //time[index]=difference-lasttime;
        
        laptime=formatTimeForTimer(totalTime-lastLapTime);
        setLastLapTime(totalTime);
        
    }

    
    const newContent = {};
    newContent.lap= laptime;
    lapTimes.push(newContent);
    

  }

  const children = lapTimes.map((data, idx) =>{
    return (
      <li id={idx}>
        <label class='left'>Lap {idx}</label>
        <label class='right'>{data.lap}</label>
      </li>
    );
  })
  
  return (
    <div className="App">
      <Watch timerText={timerText} isCounting={isCounting} startStop={startStop} resetLap={resetLap} children={children}></Watch>
    </div>
  );
  
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
