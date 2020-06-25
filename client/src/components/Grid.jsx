import React, {useState, useCallback, useRef} from "react";
import produce from "immer"
import Header from "./Header"
import Dropdown from 'react-bootstrap/Dropdown'
import DropdownButton from 'react-bootstrap/DropdownButton'
import "bootstrap/dist/css/bootstrap.min.css"


let generation = 0;
const neighborpositions=[[-1, -1], [-1, 0], [-1, 1], [0, -1], [0, 1], [1, -1], [1, 0], [1, 1]]
let numRows = 25;
let numCols = 49;
function Grid(){


    // set state for number of rows and columns so that it can be modified by user selection 
    // const [numRows, setNumRows] = useState(25)
    // const [numCols, setNumCols] = useState(49)
    // set cellcolor so that the user can change the cell color
    const [cellColor, setCellColor] = useState('orangered')
    // set state to determine if the game is being played or not
    const [playing, setPlaying] = useState(false)
    // set the gamespeed so it can be changed by user easier
    const [gameSpeed, setGameSpeed] = useState(250)
    const setBoardSize = (rows, cols) => {numRows = rows; numCols = cols}
    
    // const [boardSize, setBoardSize] = useState(numRows, numCols)
    // const [dropdownOpen, setDropDownOpen] = useState(false)
    // const toggle = () => {setDropDownOpen(prevState => !prevState)}
    const [grid, setGrid] = useState(() => {
        const rows = []
        for (let i = 0; i< numRows; i++){
            rows.push(Array.from(Array(numCols), () => Math.floor(Math.random(2))))
        }
        return rows;
    });
const playingRef = useRef(playing)
const speedRef = useRef(gameSpeed)
speedRef.current = gameSpeed
playingRef.current = playing
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
                        const nI = i+x;
                        const nJ = j+y;
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


    return(<><Header/>
    <p className="generational">there have been      <h3 style={{color: `${cellColor}`, textDecoration: 'underline'}}>__{generation}__</h3>      generations</p><div className="game"><div className="buttons">
        <button onClick={()=>{setPlaying(true); playingRef.current = true; play()}}>Start Game</button>
        <button onClick={()=>{setPlaying(false); playingRef.current = false;}}>Pause Game</button>
        <button onClick={()=>setGrid(() => {
    const rows = []
    for (let i = 0; i< numRows; i++){
        generation = 0
        rows.push(Array.from(Array(numCols), () => (Math.random() > 0.8 ? 1 : 0)))
    }
    return rows;
})}>Randomize Game</button>
    <button onClick={()=>setGrid(() => {
    const rows = []
    for (let i = 0; i< numRows; i++){
        generation = 0;
        rows.push(Array.from(Array(numCols), () => 0))
    }
    return rows;
})} >Reset</button>
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
<div className="boardsize">
    <h3>Change Board Size</h3>
    <DropdownButton style={{background:`${cellColor}`, borderRadius:'5px'}} id="dropdown-basic-button" variant="secondary" title="board size">
        <Dropdown.Item onClick={()=>{setBoardSize(25, 49)}}>25 x 49 (Default)</Dropdown.Item>
        <Dropdown.Item onClick={()=>{setBoardSize(50, 50)}}>50 x 50</Dropdown.Item>
        <Dropdown.Item onClick={()=>{setBoardSize(100, 100)}}>100 x 100</Dropdown.Item>
    </DropdownButton>
</div>


</div>
        <div className="grid" style={{display: 'grid', gridTemplateColumns: `repeat(${numCols}, 20px)`}}>
            {grid.map((row, i )=> { 
                return(
                row.map((col, k) => {
                    return(
                        <div key={`${i}-${k}`} style={{width: 20, height: 20, backgroundColor: grid[i][k] ? `${cellColor}` : 'white', border: '1px solid darkgrey', borderRadius: 10}}  onClick={()=>{
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