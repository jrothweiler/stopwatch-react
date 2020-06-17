import React from 'react';
import './App.css';
import useCounter from './useCounter.js';
import formatTimeForTimer from './formatTimeForTimer.js';

function Watch() {
  const [ {isCounting, ellapsedTime, lapTimes}, dispatch] = useCounter();
  const startStopButtonText = isCounting ? "Stop" : "Start";
  const resetLapButtonText = isCounting ? "Lap" : "Reset";
  const resetBtnOnClick= isCounting ? 'lap' : 'reset';
  
  const min = lapTimes.length < 2 ? null : Math.min(...lapTimes)
  const max = lapTimes.length < 2 ? null : Math.max(...lapTimes)
  

 const children = lapTimes.map((data, idx) =>{
    let newidx= lapTimes.length-idx;
    let rowStyle={color: "white"};
    
    if (data===max ) {
      rowStyle={color: "red"};
    } else if(data===min) {
      rowStyle={color: "green"};
    }

    let rowObject = <tr key={newidx} style={rowStyle}>
                      <td>Lap {newidx++}</td>
                      <td>{formatTimeForTimer(data)}</td>
                    </tr>
    return rowObject;
  })

  const toggleButtonColorClass = isCounting ? "started" : "stopped";
  const resetLapButtonDisabled = !isCounting && ellapsedTime === 0;

  return (
    <div className="App">
      <h1 id="timer">{formatTimeForTimer(ellapsedTime)}</h1>
      <div id="actionButtons">
        <button id="lapResetButton" disabled={resetLapButtonDisabled} onClick={() => dispatch(resetBtnOnClick)}>{resetLapButtonText}</button>
        <button id="toggleButton" className={toggleButtonColorClass} onClick={() => dispatch('toggle')}>{startStopButtonText}</button>
      </div>
      <div id="lapTableDiv">
        <table id="lapTable">
          {<tbody>{children}</tbody>}
        </table>
  </div>
    </div>
  );
}

export default Watch;
