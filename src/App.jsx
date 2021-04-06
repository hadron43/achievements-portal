import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { Provider } from 'react-redux';
import { ConfigureStore } from './redux/configureStore';

import Navigation from './components/Navigation';
import Home from './pages/Home'
import Profile from './pages/Profile'
import Search from './pages/Search';

import './App.scss';

const store = ConfigureStore();

function App() {
  return (
    <Provider store={store}>
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
    </Provider>
  );
}

export default App;
