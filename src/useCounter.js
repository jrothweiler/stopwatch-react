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

  function reducer(state, {type, payload}) {
    switch (type) {
      case 'toggle':
        
        
          
        
        return {...state, lastStopwatchToggleTime: payload, 
                isCounting: !state.isCounting, 
                startTime: state.startTime===null?payload:state.startTime, 
                millisecondsPaused: (state.startTime!==null&&state.isCounting===false)? (payload-state.lastStopwatchToggleTime) + state.millisecondsPaused : state.millisecondsPaused};
       
      case 'tick' :

        return {... state, ellapsedTime: payload-state.startTime-state.millisecondsPaused}

      case 'reset':
        return {...state, startTime: null, lastStopwatchToggleTime: null, ellapsedTime:0, millisecondsPaused: 0 };

      
      default:
        return state;
    }
  }

  let initialState = {isCounting : false, startTime: null, lastStopwatchToggleTime: null, ellapsedTime: 0, millisecondsPaused:0};
  const [state, internalDispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    
    if (state.isCounting) {
      const token =  setInterval(()=>{internalDispatch({type:'tick', payload:Date.now()})}, 10);
      return () => { clearInterval(token) };
    }
    
 
  }, [state.isCounting])

  
  /*useEffect(() => {
    
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
    
      isSecondTime.current = true;
      console.log('test');
    
    
  }, [state.isCounting]);

 useEffect(() => {
    if (state.isInitial) {
      setEllapsedTime(0);
      lastStopwatchToggleTime.current = 0;
      millisecondsPaused.current = 0;
      startTime.current = null;
    }
  }, [state.isInitial])*/

  const dispatch = (type) => {
    if (type === "tick") {
      return;
    }

    internalDispatch({ type, payload: Date.now() });
  };

  return  [{isCounting: state.isCounting, ellapsedTime:state.ellapsedTime}, dispatch] 
}
const useLapsStopWatch = () => {
  let lastLapTime = useRef(0);
  const [{ellapsedTime, isCounting}, internalDispatch] = useStopWatch();
  
  function lapReducer(state, {type, payload}) {
    switch (type) {
      case 'lap':
        const totalTime = state.lapTimes.reduce((a, b) => a + b, 0);

        return {lapTimes: [(ellapsedTime - totalTime), ...state.lapTimes]}
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

  const dispatch = (type) => {
    if (type === "tick") {
      return;
    }

    lapDispatch({type, payload: Date.now()});
    internalDispatch(type);
  };
  
  return [{isCounting: isCounting,
    ellapsedTime, lapTimes:lapState.lapTimes}, dispatch];
}

export default useLapsStopWatch;