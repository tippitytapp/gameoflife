import React from 'react';
import Header from "./components/Header"
import Rules from "./components/Rules"
import Grid from "./components/Grid"

import Footer from "./components/Footer"
import './App.css';

function App() {
  return (
    <div className="App">
      <Header />
      <Rules />
      <Grid />
      <Footer />
    </div>
  );
}

export default App;
