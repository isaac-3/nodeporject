import React, {useEffect, useReducer, createContext, useContext} from 'react';
import './App.css';
import {BrowserRouter, Route, Switch, useHistory} from 'react-router-dom'
import NavBar from './components/Navbar'
import Home from './components/Home'
import Login from './components/Login'
import Profile from './components/Profile'
import Signup from './components/Signup'
import CreatePost from './components/CreatePost'
import {reducer, initialState} from './reducers/userReducer'

export const UserContext = createContext()

const Routing = () => {

  const history = useHistory()
  const {state, dispatch} = useContext(UserContext)
  
  useEffect(()=>{
    const user = JSON.parse(localStorage.getItem("user"))
    if(user){
      dispatch({type: "USER", payload: user})
    }else{
      history.push('/login')
    }
  },[])
  return(
    <Switch>
      <Route exact path='/' component={Home}/>
      <Route exact path='/login' component={Login}/>
      <Route exact path='/signup' component={Signup}/>
      <Route exact path='/profile' component={Profile}/>
      <Route exact path='/create' component={CreatePost}/>
    </Switch>
  )
}

function App() {
  
  const [state, dispatch] = useReducer(reducer, initialState)

  return (
    <UserContext.Provider value={{state, dispatch}}>
      <BrowserRouter>
        <NavBar/>
        <Routing/>
      </BrowserRouter>
    </UserContext.Provider>
  );
}

export default App;
