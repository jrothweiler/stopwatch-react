import React from 'react';
import './App.css';
import useCounter from './useCounter.js';
import findMax from './findMax.js';
import findMin from './findMin.js';
import formatTimeForTimer from './formatTimeForTimer.js';

function Watch() {
  //const { startStop, resetLap, timerText, lapTimes, isCounting} = useCounter();
  const [ {isCounting, ellapsedTime}, dispatch] = useCounter();
  const startStopButtonText = isCounting ? "Stop" : "Start";
  const resetLapButtonText = isCounting ? "Lap" : "Reset";
 /*const children = lapTimes.map((data, idx) =>{
    let newidx= lapTimes.length-idx;
    let rowStyle={color: "white"};
    
    if (findMax(lapTimes)===idx && lapTimes.length >= 2) {
      rowStyle={color: "red"};
    } else if(findMin(lapTimes)===idx && lapTimes.length >= 2) {
      rowStyle={color: "green"};
    }

    let rowObject = <tr key={newidx} style={rowStyle}>
                      <td>Lap {newidx++}</td>
                      <td>{data}</td>
                    </tr>
    return rowObject;
  })*/

  const toggleButtonColorClass = isCounting ? "started" : "stopped";
  const resetLapButtonDisabled = !isCounting && ellapsedTime === 0;

  return (
    <div className="App">
      <h1 id="timer">{formatTimeForTimer(ellapsedTime)}</h1>
      <div id="actionButtons">
        <button id="lapResetButton" disabled={resetLapButtonDisabled} onClick={() => dispatch('reset')}>{resetLapButtonText}</button>
        <button id="toggleButton" className={toggleButtonColorClass} onClick={() => dispatch('toggle')}>{startStopButtonText}</button>
      </div>
      {/*<div id="lapTableDiv">
        <table id="lapTable">
          <tbody>{children}</tbody>
        </table>
  </div>*/}
    </div>
  );
}

export default Watch;
