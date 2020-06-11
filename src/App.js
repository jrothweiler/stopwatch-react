import React, {useState, useCallback, useEffect, useRef} from 'react';
import logo from './logo.svg';
import './App.css';
import Watch from './stopwatch.js';


function App() {
  return (
    <div className="App">
      <Watch/>
    </div>
  );
  
}

export default App;
