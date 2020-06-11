import {useState, useRef, useEffect} from 'react';
import formatTimeForTimer from './formatTimeForTimer.js';

export default function (){
    let countingIntervalId = useRef(null);
    let startTime = useRef(null);
    let [lapTimes, setLapTimes] = useState([]);
    let [timerText, setTimerText] = useState('00:00.00');
    let lastLapTime = useRef(0);
    let isInitial = useRef(true);
    let [isCounting, setIsCounting] = useState(false);
    let millisecondsPaused = useRef(0);
    let lastStopwatchToggleTime = useRef(null);
    
    let getShowTime = function() {
      let currentTime = Date.now();
      const totalTime = currentTime - startTime.current - millisecondsPaused.current;
      setTimerText(formatTimeForTimer(totalTime));
    };
    
    const startStop = function() {
      const currentTime = Date.now();
      setIsCounting((x) => !x);
  
      if (countingIntervalId.current != null) {
        // stopping
        clearInterval(countingIntervalId.current);
        countingIntervalId.current = null;

      } else {
        // starting
        if (startTime.current == null) {
          startTime.current = currentTime;
        } else {
          const pauseTime = currentTime - lastStopwatchToggleTime.current;
          millisecondsPaused.current += pauseTime;
        }
        
        countingIntervalId.current = setInterval(getShowTime, 10);
      }
      lastStopwatchToggleTime.current = currentTime;
    }
  
    const resetLap = function() {
      if (countingIntervalId.current != null) {
        // lap
        //alert("lap");
        logLap();
      } else {
        // reset
        startTime.current = null;
        setTimerText('00:00.00');
        setLapTimes([]);
        isInitial.current= true;
        lastLapTime.current = 0;
        millisecondsPaused.current = 0;
      }
    }
  
    const logLap = function(){
      let laptime;
      let currentTime = Date.now();
      const totalTime = currentTime - startTime.current - millisecondsPaused.current;
    
        if(isInitial.current){
          laptime=formatTimeForTimer(totalTime);
          //time[index]= totalTime;
          lastLapTime.current = totalTime;
          isInitial.current = false;
      }else{
          //time[index]=difference-lasttime;
          
          laptime=formatTimeForTimer(totalTime-lastLapTime.current);
          lastLapTime.current = totalTime;
      }
  
      //const newContent = {};
      //newContent.lap= laptime;
      lapTimes.push(laptime);
    }

    // clean up the interval after unmounting
    useEffect(() => { clearInterval(countingIntervalId.current) }, []);

    return { lapTimes, timerText, startStop, resetLap, isCounting}
  }



