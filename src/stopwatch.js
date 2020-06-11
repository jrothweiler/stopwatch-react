import React from 'react';
import './App.css';
import useCounter from './useCounter.js';
import findMax from './findMax.js';
import findMin from './findMin.js';

function Watch() {
    const { startStop, resetLap, timerText, lapTimes, isCounting} = useCounter();

    const startStopButtonText = isCounting ? "Stop" : "Start";
    const resetLapButtonText = isCounting ? "Lap" : "Reset";
    const children = lapTimes.map((data, idx) =>{
        
        let newidx= lapTimes.length-idx;
        let rowStyle={color: "white"};
        
        if(findMax(lapTimes)===idx&&lapTimes.length>2){
          rowStyle={color: "red"};
          /*return (rowObject
            <tr key={newidx} style={{color: "red"}}>
              <td>Lap {newidx++}</td>
              <td>{data}</td>
            </tr>
            
          );*/
        }else if(findMin(lapTimes)===idx&&lapTimes.length>2){
          rowStyle={color: "green"};
          /*return (rowObject
            <tr key={newidx} style={{color: "green"}}>
              <td>Lap {newidx++}</td>
              <td>{data}</td>
            </tr>
          );*/
        }/*else {
          
          return (rowObject
            <tr key={newidx} style={{color: "white"}}>
              <td>Lap {newidx++}</td>
              <td>{data}</td>
            </tr>
          );
        }*/

        let rowObject = <tr key={newidx} style={rowStyle}>
                          <td>Lap {newidx++}</td>
                          <td>{data}</td>
                        </tr>
        return rowObject;
        
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
