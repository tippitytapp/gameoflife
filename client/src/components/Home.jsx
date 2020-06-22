import React from "react"
import {Link} from "react-router-dom"

function Home(){
    return(
        <div>
            <h1>Conway's Game of Life</h1>
            <div className="homepagebuttons">
                <Link to="/info"><button className="home-page-btn">What is Conway's Game of Life?</button></Link>
                <Link to="/rules"><button className="home-page-btn">What are the rules?</button></Link>
                <Link to="/howtoplay"><button className="home-page-btn">Getting Started</button></Link>
                <Link to="/play"><button className="home-page-btn">Start Playing</button></Link>
            </div>
        </div>
    )
}

export default Home;