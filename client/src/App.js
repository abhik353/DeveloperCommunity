import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import {Provider} from 'react-redux'
import './App.css';
import NavBar from './components/layout/navbar'
import Footer from './components/layout/footer'
import Landing from './components/layout/landing'
import Register from './components/Auth/register'
import Login from './components/Auth/login'
import store from './store'
import jwt_decode from 'jwt-decode'
import setAuthToken from './utils/setAuthToken'
import {setCurrentUser, logoutUser} from './actions/authActions'
import Dashboard from './components/dashboard/dashboard'
import { clearCurrentProfile } from './actions/profileActions';
import PrivateRoute from './components/common/privateRoute'
import CreateProfile from './components/createProfile/createProfile'
import EditProfile from './components/editProfile/editProfile'
import AddExperience from './components/addCredentials/addExperience'
import AddEducation from './components/addCredentials/addEducation'
import Profiles from './components/profiles/profiles'
import Profile from './components/profile/profile'
import NotFound from './components/not-found/notFound';
import Posts from './components/posts/posts';
import Post from './components/post/post';


if(localStorage.jwtToken){
  setAuthToken(localStorage.jwtToken)
  const decoded = jwt_decode(localStorage.jwtToken)
  store.dispatch(setCurrentUser(decoded))
  const currentTime = Date.now()/1000
  if(decoded.exp < currentTime){
    store.dispatch(logoutUser())
    store.dispatch(clearCurrentProfile())
    window.location.href = './login'
  }
}


class App extends Component{
  render(){
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <NavBar />
            <Route exact path='/' component={Landing} />
            <div className="container">
              <Route exact path="/register" component={Register} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/profiles" component={Profiles} />
              <Route exact path="/profile/:handle" component={Profile} />
              <Switch>
                  <PrivateRoute exact path="/dashboard" component={Dashboard} />  
              </Switch>
              <Switch>
                  <PrivateRoute exact path="/create-profile" component={CreateProfile} />  
              </Switch> 
              <Switch>
                  <PrivateRoute exact path="/edit-profile" component={EditProfile} />  
              </Switch> 
              <Switch>
                  <PrivateRoute exact path="/add-experience" component={AddExperience} />  
              </Switch>
              <Switch>
                  <PrivateRoute exact path="/add-education" component={AddEducation} />  
              </Switch>  
              <Route exact path="/not-found" component={NotFound} />
              <Switch>
                  <PrivateRoute exact path="/feed" component={Posts} />  
              </Switch>
              <Switch>
                  <PrivateRoute exact path="/post/:id" component={Post} />  
              </Switch>
              
            </div>
            <Footer/>
          </div>
        </Router>
      </Provider>
      
      
    );

  }
  
}

export default App;
