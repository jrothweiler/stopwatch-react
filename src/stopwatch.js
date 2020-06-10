import React from 'react';
import logo from './logo.svg';
import './App.css';
import useCounter from './useCounter.js';

function Watch() {
    const { startStop, resetLap, timerText, lapTimes, isCounting } = useCounter();

    const startStopButtonText = isCounting ? "Stop" : "Start";
    const resetLapButtonText = isCounting ? "Lap" : "Reset";
    const children = lapTimes.map((data, idx) =>{
        let newidx= lapTimes.length-idx;
        return (
          <li id={newidx}>
            <label class='left'>Lap {newidx++}</label>
            <label class='right'>{data}</label>
          </li>
        );
      })

  return (
    <div className="App">
        <h1 class="display">{timerText}</h1>
        <div class="button_container">
            <div class="resetlap">
                <button onClick={resetLap} id="reset" class="resetbtn">{resetLapButtonText}</button>
            </div>
            <div class="startstop">
                <button onClick={startStop} id="start" class="startbtn">{startStopButtonText}</button>
            </div>
        </div>
        <div class="laplist" id="laps">{children}</div>
    </div>
  );
}

export default Watch;
