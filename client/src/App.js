import React from 'react';
import Rules from "./components/Rules"
import Grid from "./components/Grid"
import Home from "./components/Home"
import {Route} from 'react-router-dom'
import Footer from "./components/Footer"
import './App.css';

function App() {
  return (
    <div className="App">
      <Route exact path="/"><Home/></Route>
      <Route exact path="/rules"><Rules /></Route>
      <Route exact path="/play"><Grid /></Route>
      <Footer />
    </div>
  );
}

export default App;
