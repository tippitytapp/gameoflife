import React from "react";
import {Link} from "react-router-dom"
function Header(){
    return(
        <header className="header">
        <h1 style={{fontSize: "4rem"}}>Game of Life</h1>
        <div className="headerlinks">
        <Link to="/">Home</Link>
        <Link to='/info'>About the Game</Link>
        <Link to="/rules">Rules</Link>
        <Link to="/play">Play</Link>
        <Link to="/howtoplay">Need Help?</Link>
        </div>
      </header>
    )
}

export default Header;