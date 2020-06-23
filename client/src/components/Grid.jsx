import React, {useState, useCallback, useRef} from "react";
import produce from "immer"
import Header from "./Header"
// import {Dropdown, DropdownToggle, DropdownMenu, DropdownItem} from "reactstrap"


let generation = 0;
const numRows = 24;
const numCols = 49;
const neighborpositions=[[-1, -1], [-1, 0], [-1, 1], [0, -1], [0, 1], [1, -1], [1, 0], [1, 1]]


function Grid(){
    const [playing, setPlaying] = useState(false)
    const [cellColor, setCellColor] = useState('orangered')
    const [dropdownOpen, setDropDownOpen] = useState(false)
    const toggle = () => {setDropDownOpen(prevState => !prevState)}
const [grid, setGrid] = useState(() => {
    const rows = []
    for (let i = 0; i< numRows; i++){
        rows.push(Array.from(Array(numCols), () => Math.floor(Math.random(2))))
    }
    return rows;
});
const playingRef = useRef(playing)
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
    console.log(generation)
    setTimeout(play, 250)
},[])

    return(<><Header/>
    <p>there have been {generation} generations</p><div className="game"><div className="buttons">
        <button onClick={()=>{setPlaying(true); playingRef.current = true; play()}}>Start Game</button>
        <button onClick={()=>{setPlaying(false); playingRef.current = false;}}>Stop Game</button>
        <button onClick={()=>setGrid(() => {
    const rows = []
    for (let i = 0; i< numRows; i++){
        rows.push(Array.from(Array(numCols), () => (Math.random() > 0.8 ? 1 : 0)))
    }
    return rows;
})}>Randomize Game</button>
    <button onClick={()=>setGrid(() => {
    const rows = []
    for (let i = 0; i< numRows; i++){
        rows.push(Array.from(Array(numCols), () => 0))
    }
    return rows;
})} >Reset</button>
<div className="cellcolor">
    <h3>Change Cell Color</h3>
    <div className="colorbuttons">
<button style={{backgroundColor:'red'}}className="changecolor" onClick={()=>setCellColor('red')}></button>
<button style={{backgroundColor: 'orange'}} className='changecolor' onClick={()=>setCellColor('orange')}></button>
<button style={{backgroundColor:'yellow'}}className="changecolor" onClick={()=>setCellColor('yellow')}></button>
<button style={{backgroundColor: 'green'}} className='changecolor' onClick={()=>setCellColor('green')}></button>
<button style={{backgroundColor:'blue'}}className="changecolor" onClick={()=>setCellColor('blue')}></button>
<button style={{backgroundColor: 'indigo'}} className='changecolor' onClick={()=>setCellColor('indigo')}></button>
<button style={{backgroundColor: 'violet'}} className='changecolor' onClick={()=>setCellColor('violet')}></button>
</div>
</div>

</div>
        <div className="grid" style={{display: 'grid', gridTemplateColumns: `repeat(${numCols}, 20px)`}}>
            {grid.map((row, i )=> { 
                return(
                row.map((col, k) => {
                    return(
                        <div key={`${i}-${k}`} style={{width: 20, height: 20, backgroundColor: grid[i][k] ? `${cellColor}` : 'white', border: '1px solid darkgrey', borderRadius: 10}}  onClick={()=>{
                            const newGrid = produce(grid, gridCopy => {
                                gridCopy[i][k] = gridCopy[i][k] ? 0 : 1;
                            })
                            setGrid(newGrid)
                        }}/>
                    )
                })
            )})}
        </div>
        </div>
    </>)
}

export default Grid;