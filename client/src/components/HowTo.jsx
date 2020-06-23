import React from "react";
import Header from "./Header";

function HowTo(){
    return(
        <div>
            <Header/>
            <div className="howtoplay">
                <h2>:To Setup:</h2>
                    <span>OPTION 1:</span><span> YOU CAN CLICK INDIVIDUAL CELLS TO TURN THEM ON OR OFF</span><br />
                    <span>OPTION 2:</span><span>YOU CAN CLICK ON THE RANDOMIZE GAME BUTTON TO HAVE A RANDOM STARTING BOARD</span>
                <h2>:To Start:</h2>
                    <span>CLICK THE START BUTTON</span>
                <h2>:To Pause:</h2>
                    <span>CLICK STOP*</span>
                <h2>:To Reset:</h2>
                    <span>CLICK RESET</span><br />
                    <span>*this will not reset the board</span>
            </div>
        </div>
    )
}

export default HowTo