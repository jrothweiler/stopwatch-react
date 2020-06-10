import React from 'react';
import logo from './logo.svg';
import './App.css';

function Watch(props) {
    const startStopButtonText = props.isCounting ? "Stop" : "Start";
    const resetLapButtonText = props.isCounting ? "Lap" : "Reset";
    const children = props.lapTimes.map((data, idx) =>{
        return (
          <li id={idx}>
            <label class='left'>Lap {idx}</label>
            <label class='right'>{data}</label>
          </li>
        );
      })

  return (
    <div className="App">
        <h1 class="display">{props.timerText}</h1>
        <div class="button_container">
            <div class="resetlap">
                <button onClick={props.resetLap} id="reset" class="resetbtn">{resetLapButtonText}</button>
            </div>
            <div class="startstop">
                <button onClick={props.startStop} id="start" class="startbtn">{startStopButtonText}</button>
            </div>
        </div>
        <div class="laplist" id="laps">{children}</div>
    </div>
  );
}

export default Watch;
