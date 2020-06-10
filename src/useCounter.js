import React, {useState, useCallback, useEffect, useRef} from 'react';
import formatTimeForTimer from './formatTimeForTimer.js';

export default function (){
    let countingIntervalId = useRef(null);
    let startTime = useRef(null);
    let [lapTimes, setLapTimes] = useState([]);
    let [timerText, setTimerText] = useState('00:00.00');
    let lastLapTime = useRef(0);
    let isInitial = useRef(true);
    let isCounting = useRef(false);

    let getShowTime = function() {
      let currentTime = Date.now();
      const totalTime = currentTime - startTime.current;
      setTimerText(formatTimeForTimer(totalTime));
    };
    
    const startStop = function() {
      const currentTime = Date.now();
      isCounting.current = !isCounting;
  
      if (countingIntervalId.current != null) {
        // stopping
        clearInterval(countingIntervalId.current);
        countingIntervalId.current = null;

      } else {
        // starting
        if (startTime.current == null) {
          startTime.current = currentTime;
        }
        
        countingIntervalId.current = setInterval(getShowTime, 10);
      }
    }
  
    const resetLap = function(){
   
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
      }
    }
  
    const logLap = function(){
      let laptime;
      let currentTime = Date.now();
      const totalTime = currentTime - startTime.current;
    
        if(isInitial){
          
          
          laptime=formatTimeForTimer(totalTime);
          //time[index]= totalTime;
          lastLapTime.current = totalTime;
          isInitial.current = false;
      }else{
          //time[index]=difference-lasttime;
          
          laptime=formatTimeForTimer(totalTime-lastLapTime);
          lastLapTime.current = totalTime;
          
      }
  
      
      //const newContent = {};
      //newContent.lap= laptime;
      lapTimes.push(laptime);
      
  
    }

    return { lapTimes, timerText, startStop, resetLap, isCounting}
  }

