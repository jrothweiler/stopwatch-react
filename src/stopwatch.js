import React from 'react';
import logo from './logo.svg';
import './App.css';

function Watch(props) {
    const startStopButtonText = props.isCounting ? "Stop" : "Start";
    const resetLapButtonText = props.isCounting ? "Lap" : "Reset";

    const toggleButtonColorClass = props.isCounting ? "started" : "stopped"
    const resetLapButtonDisabled = !props.isCounting && props.timerText === "00:00.00";
  return (
    <div className="App">
      <h1 id="timer">{props.timerText}</h1>
      <div id="actionButtons">
          <button id="lapResetButton" disabled={resetLapButtonDisabled} onClick={props.resetLap}>{resetLapButtonText}</button>
          <button id="toggleButton" className={toggleButtonColorClass} onClick={props.startStop}>{startStopButtonText}</button>
      </div>
      <div class="laplist" id="laps"></div>
    </div>
  );
}

export default Watch;
