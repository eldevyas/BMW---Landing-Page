import React, { useState } from "react";
import './css/App.css'
import './css/Header.css'
import './css/fonts.css'
import Header from './public/Header'
import Navigation from './public/Navigation'


function Page() {
  const [count, setCount] = useState(0)

  
  return (
      <div className="scrollwrapper" id="Wrapper">
        <div className= "main child" id= "home">
          <Header/>
          <Navigation/>
          <canvas id="canvas"></canvas>
          <div id= "fade"></div>

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
                  <div className= "up">
                    <div>
                      <div className= "icon"></div>
                      <h1>Engine</h1>
                      <h2>548hp</h2>
                    </div>
                    <div>
                      <div className= "icon"></div>
                      <h1>Torque</h1>
                      <h2>450nm</h2>
                  </div>
                  </div>
                  
                  <div className= "down">
                    <div>
                      <div className= "icon"></div>
                      <h1>Weight</h1>
                      <h2>1850kg</h2>
                    </div>
                    <div>
                      <div className= "icon"></div>
                      <h1>0 - 60MPH</h1>
                      <h2>3.8secs</h2>
                    </div>
                  </div> 
                </div>

                <div className= "right">
                  <img className= "article-img" src= "src/img/m3.jpeg"></img>
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

export default Page



