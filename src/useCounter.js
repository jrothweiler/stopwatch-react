import {useState, useRef, useEffect, useReducer} from 'react';

let useStopWatch = () =>{
  let startTime = useRef(null);
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
        return {isCounting: !state.isCounting};
        
      case 'reset':
        return {...state, isCounting: state.isCounting, isInitial:true};

      
      default:
        return state;
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
  }, [state.isInitial])

  return  [{isCounting: state.isCounting,
     ellapsedTime, 
     isInitial: state.isInitial,
    millisecondsPaused: millisecondsPaused.current, 
    startTime: startTime.current}, dispatch] 
}
const useLapsStopWatch = () => {
  let lastLapTime = useRef(0);
  const [{ellapsedTime, isInitial, isCounting, millisecondsPaused, startTime}, dispatch] = useStopWatch();
  
  function lapReducer(state, action) {
    switch (action) {
      case 'lap':
        let currentTime = Date.now();
        let totalTime = currentTime - startTime - millisecondsPaused- lastLapTime.current;
        return {lapTimes: [totalTime, ...state.lapTimes]}
      case 'reset':
        return { lapTimes: [] }

      
      default:
        return state;
    }
  }
  
  let [lapState, lapDispatch] = useReducer(lapReducer, {
    lapTimes: []
  });

  useEffect(() => {
    lastLapTime.current = lapState.lapTimes.reduce((acc, b) => acc + b, 0)
  }, [lapState.lapTimes]);

  
  return [{isCounting: isCounting,
    ellapsedTime, 
    isInitial: isInitial, lapTimes:lapState.lapTimes}, (action) => {
      lapDispatch(action);
      dispatch(action);
    }];
}

export default useLapsStopWatch;