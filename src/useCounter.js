import {useEffect, useReducer} from 'react';



let useStopWatch = () =>{
  function reducer(state, {type, payload}) {
    switch (type) {
      case 'toggle':
        return {
          ...state,
          lastStopwatchToggleTime: payload, 
          isCounting: !state.isCounting, 
          startTime: state.startTime === null ? payload : state.startTime, 
          millisecondsPaused: (state.startTime !== null && state.isCounting === false) 
            ? (payload-state.lastStopwatchToggleTime) + state.millisecondsPaused 
            : state.millisecondsPaused
        };

      case 'tick' :
        return {...state, ellapsedTime: payload - state.startTime - state.millisecondsPaused };

      case 'reset':
        return {...state, startTime: null, lastStopwatchToggleTime: null, ellapsedTime: 0, millisecondsPaused: 0 };

      default:
        return state;
    }
  }

  let initialState = {isCounting : false, startTime: null, lastStopwatchToggleTime: null, ellapsedTime: 0, millisecondsPaused: 0 };
  const [state, internalDispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    if (state.isCounting) {
      const token =  setInterval(()=>{internalDispatch({type:'tick', payload:Date.now()})}, 10);
      return () => { clearInterval(token) };
    }
  }, [state.isCounting])

  const dispatch = (type) => {
    if (type === "tick") {
      return;
    }

    internalDispatch({ type, payload: Date.now() });
  };

  return  [{isCounting: state.isCounting, ellapsedTime:state.ellapsedTime}, dispatch] 
}
const useLapsStopWatch = () => {
  const [{ellapsedTime, isCounting}, internalDispatch] = useStopWatch();
  
  function lapReducer(state, type) {
    switch (type) {
      case 'lap':
        const totalTime = state.lapTimes.reduce((a, b) => a + b, 0);
        return {lapTimes: [(ellapsedTime - totalTime), ...state.lapTimes]};
        
      case 'reset':
        return { lapTimes: [] };
      
      default:
        return state;
    }
  }
  
  let [lapState, lapDispatch] = useReducer(lapReducer, {
    lapTimes: []
  });

  const dispatch = (type) => {
    if (type === "tick") {
      return;
    }

    lapDispatch(type);
    internalDispatch(type);
  };
  
  return [{isCounting: isCounting, ellapsedTime, lapTimes: lapState.lapTimes}, dispatch];
}

export default useLapsStopWatch;