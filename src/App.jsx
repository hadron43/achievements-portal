import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import Navigation from './components/Navigation';
import Home from './pages/Home'
import Profile from './pages/Profile'
import Search from './pages/Search';

import './App.scss';

function App() {
  return (
    <BrowserRouter basename="/">
      <div className="App pl-2 pr-2">
        <Navigation />

        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/profile" exact component={Profile} />
          <Route path="/search" component={Search}></Route>
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
