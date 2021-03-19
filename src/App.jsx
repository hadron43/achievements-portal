import React from 'react';
import { HashRouter } from 'react-router-dom'
import Navigation from './components/Navigation';

import './App.scss';

function App() {
  return (
    <HashRouter basename="/">
      <div className="App">
        <Navigation />

        

      </div>
    </HashRouter>
  );
}

export default App;
