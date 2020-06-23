import React from "react";
import Header from "./Header"

function Rules(){
    return(
      <>
                <Header/>
        <div className="rulespage">

        <div className="rules"> <p style={{fontSize:"1.5rem"}}>Rules:</p>
          <p>Any live cell with fewer than two live neighbours dies, as if by underpopulation.</p>
          <p>Any live cell with two or three live neighbours lives on to the next generation.</p>
          <p>Any live cell with more than three live neighbours dies, as if by overpopulation.</p>
          <p>Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.</p>
        </div>
        </div>
        </>
    )
}

export default Rules;