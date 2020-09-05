import React from 'react';
import './App.css';
import {BrowserRouter, Route} from 'react-router-dom'
import NavBar from './components/Navbar'
import Home from './components/Home'
import Login from './components/Login'
import Profile from './components/Profile'
import Signup from './components/Signup'

function App() {
  return (
    <BrowserRouter>
    <NavBar/>
    <Route exact path='/' component={Home}/>
    <Route exact path='/login' component={Login}/>
    <Route exact path='/signup' component={Signup}/>
    <Route exact path='/profile' component={Profile}/>
    </BrowserRouter>
  );
}

export default App;
