import React from 'react';
import logo from './logo.svg';
import './App.css';
import Watch from './stopwatch.js';

function App() {
  return (
    <div className="App">
      
      <Watch startStop={startStop} resetLap={resetLap}></Watch>
    </div>
  );
}

function startStop(){
  alert("start");
}

function resetLap(){
  alert("reset");
}

export default App;
