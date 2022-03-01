import { useState } from 'react'
import './App.css'
import './fonts.css'


function Header() {
  const [count, setCount] = useState(0)

  return (
      <div class="scrollwrapper" id="Wrapper">
        <div class= "main child">
          <div class="header">
            <img src= "src/img/logo.png"></img>
            <div class= "navigation">
              <a href='#'>Home</a>
              <a href='#'>Models</a>
              <a href='#'>About</a>
              <a href='#'>Test Drive</a>
            </div>
          </div>

          <canvas id="canvas"></canvas>

          <div class="content">
            <h1>More <span>Drive</span>, More emotion, this is new</h1>
            <p>Concept by Yassine C.</p>
          </div>

          <div class="model">
            <p>Model</p>
            <h1>M3 E92</h1>
          </div>

          <div class= "next" id='next'>
            <p>Enter</p>
          </div>
        </div>

        <div class= "models child">

        </div>
      </div>
  )
};

export default Header



