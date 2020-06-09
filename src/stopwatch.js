import React from 'react';
import logo from './logo.svg';
import './App.css';

function Watch(props) {
    console.log(props);
    const startStopButtonText = props.isCounting ? "Stop" : "Start";
    const resetLapButtonText = props.isCounting ? "Lap" : "Reset";
  return (
    <div className="App">
        <h1 class="display">00:00,00</h1>
        <div class="button_container">
            <div class="resetlap">
                <button onClick={props.resetLap} id="reset" class="resetbtn">{resetLapButtonText}</button>
            </div>
            <div class="startstop">
  <button onClick={props.startStop} id="start" class="startbtn">{startStopButtonText}</button>
            </div>
        </div>
        <div class="laplist" id="laps"></div>
    </div>
  );
}

export default Watch;
