import React from 'react';
import logo from './logo.svg';
import './App.css';
import useCounter from './useCounter.js';

function Watch() {
    const { startStop, resetLap, timerText, lapTimes, isCounting } = useCounter();

    const startStopButtonText = isCounting ? "Stop" : "Start";
    const resetLapButtonText = isCounting ? "Lap" : "Reset";
    const children = lapTimes.map((data, idx) =>{
        return (
          <tr key={idx}>
            <td>Lap {idx}</td>
            <td>{data}</td>
          </tr>
        );
      })


  const toggleButtonColorClass = isCounting ? "started" : "stopped"
  const resetLapButtonDisabled = !isCounting && timerText === "00:00.00";
  return (
    <div className="App">
      <h1 id="timer">{timerText}</h1>
      <div id="actionButtons">
          <button id="lapResetButton" disabled={resetLapButtonDisabled} onClick={resetLap}>{resetLapButtonText}</button>
          <button id="toggleButton" className={toggleButtonColorClass} onClick={startStop}>{startStopButtonText}</button>
      </div>
      <div id="lapTableDiv">
        <table id="lapTable">
  <tbody>{children}</tbody>
        </table>
      </div>
    </div>
  );
}

export default Watch;
