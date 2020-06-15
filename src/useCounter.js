import {useState, useRef, useEffect, useReducer} from 'react';
//import formatTimeForTimer from './formatTimeForTimer.js';

export default function () {
  // {ellapsedTime, isRunning}
  // dispatch 'TOGGLE' | 'RESET'
  let startTime = useRef(null);
  //let isInitial = useRef(true);
  let millisecondsPaused = useRef(0);
  let lastStopwatchToggleTime = useRef(null);
  let countingIntervalId = useRef(null);
  let [ellapsedTime, setEllapsedTime] = useState(0);

  let isSecondTime = useRef(false);

  let getShowTime = function() {
    let currentTime = Date.now();
    setEllapsedTime(currentTime - startTime.current - millisecondsPaused.current)
    
    
  };

  function reducer(state, action) {
    switch (action) {
      case 'toggle':
        return {...state, isInitial:false, isCounting: !state.isCounting};
        
      case 'reset':
        console.log('reset log')
        return {...state, isInitial:true};
      default:
        throw new Error();
    }
  }

  let initialState = {isCounting : false, isInitial: true};
  const [state, dispatch] = useReducer(reducer, initialState);
  useEffect(() => {
    if (isSecondTime.current) {
      let currentTime= Date.now();
      if (!state.isCounting) {
        console.log("if branch")
          // stopping
          clearInterval(countingIntervalId.current);
          countingIntervalId.current = null;
      }else{
          // starting
          console.log("else branch")
          if (startTime.current == null) {
            startTime.current = currentTime;
          } else {
            const pauseTime = currentTime - lastStopwatchToggleTime.current;
            millisecondsPaused.current += pauseTime;
          }
          
          countingIntervalId.current = setInterval(getShowTime, 10);
      }
      lastStopwatchToggleTime.current = Date.now();
    } else {
      isSecondTime.current = true;
      console.log('test');
    }
    
  }, [state.isCounting]);

  useEffect(() => {
    if (state.isInitial) {
      setEllapsedTime(0);
      lastStopwatchToggleTime.current = 0;
      millisecondsPaused.current = 0;
      startTime.current = null;
    }
  }, state.isInitial)

  return  [{isCounting: state.isCounting, ellapsedTime, isInitial: state.isInitial}, dispatch] 
}
const useLapsStopWatch = () => {
  // useReducer
  //const [{ellapsedTime, isRunning}, dispatch] = useStopWatch()
  // ellapsedTime
  // isRunning
  // laps
  // dispatch 'TOGGLE' | 'RESET_LAP'
}


/*export default function () {
    let [lapTimes, setLapTimes] = useState([]);
    let [timerText, setTimerText] = useState('00:00.00');
    let [isCounting, setIsCounting] = useState(false);

    let countingIntervalId = useRef(null);
    let startTime = useRef(null);
    let lastLapTime = useRef(0);
    let isInitial = useRef(true);
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
  
    const logLap = function() {
      let laptime;
      let currentTime = Date.now();
      const totalTime = currentTime - startTime.current - millisecondsPaused.current;
    
      if(isInitial.current){
          laptime=formatTimeForTimer(totalTime);
          //time[index]= totalTime;
          lastLapTime.current = totalTime;
          isInitial.current = false;
      } else {
          laptime=formatTimeForTimer(totalTime-lastLapTime.current);
          lastLapTime.current = totalTime;
      }
      
      lapTimes.unshift(laptime);
    }

    // clean up the interval after unmounting
    useEffect(() => { clearInterval(countingIntervalId.current) }, []);

    return { lapTimes, timerText, startStop, resetLap, isCounting}
    
  }*/



