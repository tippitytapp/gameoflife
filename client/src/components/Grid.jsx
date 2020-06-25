import React, {useState, useCallback, useRef} from "react";
import produce from "immer"
import Header from "./Header"
import Dropdown from 'react-bootstrap/Dropdown'
import DropdownButton from 'react-bootstrap/DropdownButton'
import "bootstrap/dist/css/bootstrap.min.css"


// setting global variables for use wth useCallback
let generation = 0;
const neighborpositions=[[-1, -1], [-1, 0], [-1, 1], [0, -1], [0, 1], [1, -1], [1, 0], [1, 1]]
let numRows = 25;
let numCols = 49;
let height = 581/numRows
let width = 1248/numCols

function Grid(){

    // set cellcolor so that the user can change the cell color
    const [cellColor, setCellColor] = useState('orangered')
    // set state to determine if the game is being played or not
    const [playing, setPlaying] = useState(false)
    const playingRef = useRef(playing)
    playingRef.current = playing
    // set the gamespeed so it can be changed by user easier
    const [gameSpeed, setGameSpeed] = useState(250)
    const speedRef = useRef(gameSpeed)
    speedRef.current = gameSpeed
        // allows or dynamic updating of board size
        const setBoardSize = (rows, cols) => {numRows = rows; numCols = cols; height=581/rows; width=1248/cols}
        const setGridGrid = () => {
            const rows = [];
            for (let i = 0; i< numRows; i++){
                rows.push(Array.from(Array(numCols), () => Math.floor(Math.random(2))))
            }
            return rows;
        }
        // sets the grid
        const [grid, setGrid] = useState(setGridGrid())

        // this is the game... 
        const play = useCallback(()=>{
            if(!playingRef.current){
                return
            }
            setGrid((oldgrid)=>{
                return produce(oldgrid, gridCopy => {
                    generation += 1
                    for(let i=0; i< numRows; i++){
                        for (let j = 0; j < numCols; j++){
                            let nb = 0;
                            neighborpositions.forEach(([x, y])=>{
                                // this makes the edges wrap arround
                                const nI = (i + x + numRows) % numRows;
                                const nJ = (j + y + numCols) % numCols;
                                if (nI >= 0 && nI < numRows && nJ >= 0 && nJ < numCols){

                                    nb += oldgrid[nI][nJ]
                                }
                            })
                            if (nb < 2 || nb > 3){
                                gridCopy[i][j] = 0;
                            } else if(oldgrid[i][j] === 0 && nb === 3){
                                gridCopy[i][j] = 1
                            }
                        }
                    }
                
                })
            })
            setTimeout(play, speedRef.current)
        },[])

        // start playing
        const start = () => {setPlaying(true); playingRef.current = true; play()}
        // pause playing
        const pause = () => {setPlaying(false); playingRef.current = false;}
        // randomize game
        const randomize = () => {
            setGrid(() => {
            const rows = []
            for (let i = 0; i< numRows; i++){
                // reset generation to 0
                generation = 0
                // create a grid with random alive and dead cells. 
                rows.push(Array.from(Array(numCols), () => (Math.random() > 0.8 ? 1 : 0)))
            }
            return rows;
            })
        }
        // reset board
        const reset = () => {
            setGrid(() => {
            const rows = []
            for (let i = 0; i< numRows; i++){
                // reset generation to 0
                generation = 0;
                // create a grid of all dead cells
                rows.push(Array.from(Array(numCols), () => 0))
            }
            return rows;
            })
        }

    return(<><Header/>
    <div className="generational">
    <p>there have been</p>
    <p style={{color: `${cellColor}`, textDecoration: 'underline', fontSize:'2rem'}}>__{generation}__</p>
    <p> generations</p>
    </div>
    <div className="game">
        <div className="buttons">
        <button onClick={()=>start()}>Start Game</button>
        <button onClick={()=>pause()}>Pause Game</button>
        <button onClick={()=>randomize()}>Randomize Game</button>
        <button onClick={()=>reset()} >Reset</button>
        {/* Cell color dropdown */}
        <div className="cellcolor">
            <h3>Change Cell Color</h3>
            <DropdownButton style={{background:`${cellColor}`, borderRadius:'5px'}}id="dropdown-basic-button" variant="secondary" title="cell color">
                <Dropdown.Item onClick={()=>setCellColor('orangered')} >Default</Dropdown.Item>
                <Dropdown.Item onClick={()=>setCellColor('red')} >Red</Dropdown.Item>
                <Dropdown.Item onClick={()=>setCellColor('orange')} >Orange</Dropdown.Item>
                <Dropdown.Item onClick={()=>setCellColor('yellow')} >Yellow</Dropdown.Item>
                <Dropdown.Item onClick={()=>setCellColor('green')} >Green</Dropdown.Item>
                <Dropdown.Item onClick={()=>setCellColor('blue')} >Blue</Dropdown.Item>
                <Dropdown.Item onClick={()=>setCellColor('indigo')} >Indigo</Dropdown.Item>
                <Dropdown.Item onClick={()=>setCellColor('violet')} >Violet</Dropdown.Item>
            </DropdownButton>
        </div>
        {/* Gamespeed dropdown */}
        <div className="gamespeed">
            <h3>Change Game Speed</h3>
            <DropdownButton style={{background:`${cellColor}`, borderRadius:'5px'}} id="dropdown-basic-button" variant="secondary" title="game speed" >
                <Dropdown.Item onClick={()=>{setGameSpeed(2500)}}>2500ms(2.5s)</Dropdown.Item>
                <Dropdown.Item onClick={()=>{setGameSpeed(1750)}}>1750ms(1.75s)</Dropdown.Item>
                <Dropdown.Item onClick={()=>{setGameSpeed(1000)}}>1000ms(1s)</Dropdown.Item>
                <Dropdown.Item onClick={()=>{setGameSpeed(250)}}>250ms (Default)</Dropdown.Item>
                <Dropdown.Item onClick={()=>{setGameSpeed(1)}}>1ms</Dropdown.Item>
            </DropdownButton>
        </div>
        {/* Boardsize dropdown */}
        <div className="boardsize">
            <h3>Change Board Size</h3>
            <DropdownButton style={{background:`${cellColor}`, borderRadius:'5px'}} id="dropdown-basic-button" variant="secondary" title="board size">
                <Dropdown.Item onClick={()=>{setBoardSize(12, 25); reset()}}>12 x 25</Dropdown.Item>
                <Dropdown.Item onClick={()=>{setBoardSize(25, 50); reset()}}>25 x 50 (Default)</Dropdown.Item>
                <Dropdown.Item onClick={()=>{setBoardSize(35, 70); reset()}}>35 x 70</Dropdown.Item>
            </DropdownButton>
        </div>


</div>
        <div className="grid" style={{display: 'grid', gridTemplateColumns: `repeat(${numCols}, ${height}px)`}}>
            {grid.map((row, i )=> { 
                return(
                row.map((col, k) => {
                    return(
                        <div key={`${i}-${k}`} style={{width: width, height: height, backgroundColor: grid[i][k] ? `${cellColor}` : 'white', border: '1px solid darkgrey', borderRadius: 10}}  onClick={()=>{
                            if(playing !== true){
                                generation = 0
                                const newGrid = produce(grid, gridCopy => {
                                    gridCopy[i][k] = gridCopy[i][k] ? 0 : 1;
                                })
                                setGrid(newGrid)
                            }
                        }}/>
                    )
                })
            )})}
        </div>
        </div>
    </>)
}

export default Grid;