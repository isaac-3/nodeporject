import React,{useState} from 'react';
import {Link, useHistory} from 'react-router-dom'
import M from 'materialize-css'

const Login = () => {

    const history = useHistory()
    const [password, setPassword] = useState('')
    const [email, setEmail] = useState('')

    const postdata = () => {
        if(!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)){
            M.toast({html: "invaild emila", classes: "#c62828 red darken-3"})
            return
        }
        fetch("http://localhost:3001/signin", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                email,
                password
            })
        }).then(res => res.json())
        .then(data=>{
            console.log(data)
            if(data.error){
                M.toast({html: data.error, classes: "#c62828 red darken-3"})
            }else{
                M.toast({html: "signedin successfully", classes: "#43a047 green darken-1"})
                history.push('/')
            }
        }).catch(err => {
            console.log(err)
        })
    }
    return (
        <div className="mycard">
            <div className="card auth-card input-field">
                <h2>Instagram</h2>
                <input
                type="text"
                placeholder="email"
                value={email}
                onChange={(e)=>setEmail(e.target.value)}
                />
                <input
                type="text"
                placeholder="password"
                value={password}
                onChange={(e)=>setPassword(e.target.value)}
                />
                <button className="btn waves-effect waves-light #64b5f6 blue darken-1"
                    onClick={()=>postdata()}
                >Login</button>
                <h5><Link to='/signup'>Dont have an account ?</Link></h5>
            </div>
        </div>
    );
}
 
export default Login;