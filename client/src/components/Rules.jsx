import React from "react";
import Header from "./Header"

function Rules(){
    return(
        <div>
          <Header/>
        <ol className="rules"> Rules:
          <li>Any live cell with fewer than two live neighbours dies, as if by underpopulation.</li>
          <li>Any live cell with two or three live neighbours lives on to the next generation.</li>
          <li>Any live cell with more than three live neighbours dies, as if by overpopulation.</li>
          <li>Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.</li>
        </ol>
        </div>
    )
}

export default Rules;