import React from "react";
import {Link} from "react-router-dom"
function Header(){
    return(
        <header className="header">
        <h1>Game of Life</h1>
        <p>click on the cells you would like to turn on, then hit the start button. </p>
        <Link to="/">Home</Link>
        <Link to='/info'>About the Game</Link>
        <Link to="/rules">Rules</Link>
        <Link to="/play">Play</Link>
        <Link to="/howtoplay">Need Help?</Link>
      </header>
    )
}

export default Header;