import React, { useState } from "react";
import './css/App.css'
import './css/fonts.css'



function Header() {
  const [count, setCount] = useState(0)

  
  return (
      <div className="scrollwrapper" id="Wrapper">
        <div className= "main child" id= "home">
          <div className="header">
            <img src= "src/img/logo.png" className="change"></img>
            <div className= "navigation">
              <a href='#'>Home</a>
              <a href='#'>Models</a>
              <a href='#'>About</a>
              <a href='#'>Test Drive</a>
            </div>
            <div className= "nav-toggle change">
                <div></div>
                <div></div>
                <div></div>
            </div>
          </div>

          <canvas id="canvas"></canvas>

          <div className="content" >
            <h1 className="Dimensional" id="Dimensional">More <span>Drive</span>, More emotion, this is new</h1>
            <p>Concept by Yassine C.</p>
          </div>

          <div className="bottom">
            <div className= "model">
                <p>Model</p>
                <h1>M3 E92</h1>
            </div>

            <div className= "next change" id='next'>
            <p><a>Enter</a></p>
            </div>
          </div>

          
        </div>

        <div className= "models child" id="models">
            <div className= "article">
                <div className= "left">

                </div>

                <div className= "right">
                </div>
            </div>
            <div className="bottom">
            <div className= "next change" id='back'>
                <p><a>Back</a></p>
                </div>

                <div className= "next change" id='next2'>
                <p><a>Next</a></p>
                </div>
            </div>
        </div>
      </div>
  )
};

export default Header



