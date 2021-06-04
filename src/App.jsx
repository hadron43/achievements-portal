import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { Provider } from 'react-redux';
import { ConfigureStore } from './redux/configureStore';

import Navigation from './components/Navigation';
import Footer from './components/Footer';
import Home from './pages/Home'
import Profile from './pages/Profile'
import Search from './pages/Search';

import './App.scss';
import Login from './pages/Authenticate/Login';
import SignUp from './pages/Authenticate/SignUp';
import AddAchievement from './pages/AddAchievement';
import AddProject from './pages/AddProject';
import MyAchievements from './pages/MyAchievements';
import MyProjects from './pages/MyProjects';

const store = ConfigureStore();

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter basename="/">
        <div className="App pl-2 pr-2" style={{minHeight: '90vh'}}>
          <Navigation />

          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/profile" exact component={Profile} />
            <Route path="/search" component={Search}></Route>
            <Route path="/login" component={Login}></Route>
            <Route path="/signup" component={SignUp}></Route>
            <Route path="/addachievement" component={AddAchievement}></Route>
            <Route path="/addproject" component={AddProject}></Route>
            <Route path="/myachievements" component={MyAchievements}></Route>
            <Route path="/myprojects" component={MyProjects}></Route>
          </Switch>

        </div>

        <Footer />
      </BrowserRouter>
    </Provider>
  );
}

export default App;
