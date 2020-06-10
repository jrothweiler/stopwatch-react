import React, {useState, useCallback, useEffect, useRef} from 'react';
import logo from './logo.svg';
import './App.css';
import Watch from './stopwatch.js';


function App() {
  
  
  //let [isCounting, setIsCounting] = useState(false);
  
  //let [millisecondsPaused, setMillisecondsPaused] = useState(0);
  
  //let [lastPauseTime, setLastPauseTime] = useState(0);
  //let [children, setChildren] = useState([]);
  //let [isInitial, setIsInitial] = useState(true);
  
  return (
    <div className="App">
      <Watch/>
    </div>
  );
  
}

export default App;
