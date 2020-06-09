import React, {useState} from 'react';
import logo from './logo.svg';
import './App.css';
import Watch from './stopwatch.js';

function App() {
  let [countingIntervalId, setCountingIntervalId] = useState(-1);
  let [lapTimes, setLapTimes] = useState([]);
  let [isCounting, setIsCounting] = useState(false);

  const startStop = function() {
    setIsCounting(!isCounting);
  }

  return (
    <div className="App">
      <Watch isCounting={isCounting} startStop={startStop} resetLap={resetLap}></Watch>
    </div>
  );
}



function resetLap(){
  alert("reset");
}

export default App;
