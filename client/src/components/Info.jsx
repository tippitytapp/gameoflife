import React from "react";
import * as Tub from "../assets/tub.PNG"
import * as beehive from "../assets/beehive.PNG"
import * as loaf from "../assets/loaf.PNG"
import * as boat from "../assets/boat.PNG"
import * as block from "../assets/block.PNG"
import Header from "./Header"
import * as beacon from "../assets/beacon.gif"
import * as blinker from "../assets/blinker.gif"
import * as pulsar from "../assets/pulsar.gif"

function Info(){
    return(
        <>
            <Header />
            <div className="info">
                <h2>:WHERE IT CAME FROM:</h2>
                <p>In the 1940's, John Von Neumann defined life as a creation which can reproduce itself and simulate a Turing Machine, though he was well ahead of the technology to prove his hypothesis</p>
                <p>Stanislaw Ulam invened cellular automata, which were intended to simulate von Neumann's theoretical electromagnetic constructions.</p> 
                <p>In turn, von Neumann successful, but incompletely constructed Ulam's cellular automation.</p>
                <h2>:WHERE DOES JOHN CONWAY COME IN:</h2>
                <p>John Conway began doing experiments in 1968, motivated by questions of mathematical logic and in part by the work of Ulam.</p>
                <p>Conway's goal was to define an interesting, yet unpredictable cell automation game.</p>
                <h2>:WHAT DID IT DO:</h2>
                <p>The GAME OF LIFE admitted of a configuration which was alive in the sense of satisfying von Neumann's two general requirements</p>
                <h2>:PATTERNS:</h2>
                <p>There are 3 types of patterns; though the number of patterns is enumerable.</p>
                <p>Those types are: Still Lifes, Oscillators, and Spaceships</p>
                <h3>Still Lifes:</h3>
                <p>Still lifes do not move, nor do they change state. they sit still, forever, unless interupted by Oscillators or Spaceships</p>
                <p>Examples of Still Lifes include:</p>
                <div className="stilllifes">
                <img src={Tub} alt="tub"/>
                <img src={beehive} alt="behive" />
                <img src={loaf} alt="loaf" />
                <img src={boat} alt="boat" />
                <img src={block} alt="block" />
                </div>
                <h3>Oscillators:</h3>
                <p>Oscillators are patterns that change, but do not move, they have a certain number of changes before they are back to their original state.</p>
                <p>Examples of Oscillators include:</p>
                <div className="oscillators">
                    <img src={beacon} alt="beacon" />
                    <img src={blinker} alt="blinker" />
                    <img src={pulsar} alt="pulsar" />
                </div>

            </div>
        </>
    )
}

export default Info