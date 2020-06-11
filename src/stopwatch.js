import React from 'react';
import logo from './logo.svg';
import './stopwatch.css';
import useCounter from './useCounter.js';
import findMax from './findMax.js';
import findMin from './findMin.js';

function Watch() {
    const { startStop, resetLap, timerText, lapTimes, isCounting, className} = useCounter();

    const startStopButtonText = isCounting ? "Stop" : "Start";
    const resetLapButtonText = isCounting ? "Lap" : "Reset";
    const children = lapTimes.map((data, idx) =>{
        let newidx= lapTimes.length-idx;
        if(findMax(lapTimes)==idx&&lapTimes.length>2){
          return (
            <li id={newidx} style={{color: "red"}}>
              <label className='left'>Lap {newidx++}</label>
              <label className='right'>{data}</label>
            </li>
          );
        }else if(findMin(lapTimes)===idx&&lapTimes.length>2){
          return (
            <li id={newidx} style={{color: "green"}}>
              <label className='left'>Lap {newidx++}</label>
              <label className='right'>{data}</label>
            </li>
          );
        }else {
          return (
            <li id={newidx} style={{color: "white"}}>
              <label className='left'>Lap {newidx++}</label>
              <label className='right'>{data}</label>
            </li>
          );
        }
        
      })

  return (
    <div className="App">
        <h1 className="display">{timerText}</h1>
        <div className="button_container">
            <div className="resetlap">
                <button onClick={resetLap} id="reset" className="resetbtn">{resetLapButtonText}</button>
            </div>
            <div className="startstop">
                <button onClick={startStop} id="start" className={className}>{startStopButtonText}</button>
            </div>
        </div>
        <div className="laplist" id="laps">{children}</div>
    </div>
  );
}

export default Watch;
