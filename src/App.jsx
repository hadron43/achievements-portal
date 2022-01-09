import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { Provider } from 'react-redux';
import { ConfigureStore } from './redux/configureStore';

import Navigation from './components/Navigation';
import Footer from './components/Footer';
import Home from './pages/Home'
import Profile from './pages/Profile'
import Projects from './pages/Projects';

import './App.scss';
import Login from './pages/Authenticate/Login';
import SignUp from './pages/Authenticate/SignUp';
import AddAchievement from './pages/AddAchievement';
import AddProject from './pages/AddProject';
import MyAchievements from './pages/MyAchievements';
import MyProjects from './pages/MyProjects';
import Achievement from './pages/Achievement';
import Project from './pages/Project';
import PendingProjects from './pages/PendingProjects';
import PendingAchievements from './pages/PendingAchievements';
import Achievements from './pages/Achievements';
import About from './pages/About';
import UserProfile from './pages/UserProfile';
import EditProject from './pages/EditProject';
import EditAchievement from './pages/EditAchievement';
import EditBanners from './pages/EditBanners';

const store = ConfigureStore();

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter basename="/">
        <div className="App pl-2 pr-2" style={{minHeight: '95vh'}}>
          <Navigation />

          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/about" exact component={About} />
            <Route path="/profile" exact component={Profile} />
            <Route path="/profile/:profileId" component={UserProfile} />
            <Route path="/projects" component={Projects}></Route>
            <Route path="/achievements" component={Achievements}></Route>
            <Route path="/login" component={Login}></Route>
            <Route path="/signup" component={SignUp}></Route>
            <Route path="/addachievement" component={AddAchievement}></Route>
            <Route path="/addproject" component={AddProject}></Route>
            <Route path="/myachievements" component={MyAchievements}></Route>
            <Route path="/myprojects" component={MyProjects}></Route>
            <Route path="/achievement/:achievementId" component={Achievement}></Route>
            <Route path="/project/:projectId" component={Project}></Route>
            <Route path="/editproject/:projectId" component={EditProject}></Route>
            <Route path="/editachievement/:achievementId" component={EditAchievement}></Route>
            <Route path="/pending-projects" component={PendingProjects}></Route>
            <Route path="/pending-achievements" component={PendingAchievements}></Route>
            <Route path="/banners" component={EditBanners} />
          </Switch>

        </div>

        <Footer />
      </BrowserRouter>
    </Provider>
  );
}

export default App;
