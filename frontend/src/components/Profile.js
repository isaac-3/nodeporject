import React,{useEffect, useState, useContext} from 'react';
import {UserContext} from '../App'


const Profile = () => {

    const [posts, setPosts] = useState([])
    const {state, dispatch} = useContext(UserContext)

    useEffect(()=>{
        fetch("http://localhost:3001/mypost", {
            headers: {"Authorization": "Bearer "+localStorage.getItem("jwt")}
        })
        .then(res => res.json())
        .then(res => {
            setPosts(res.mypost)
        })
    },[]) 
    
    return (
        <div style={{maxWidth: "550px", margin: '0px auto'}}>
            <div style={{display: "flex", justifyContent: "space-around", margin: "80px 0px", borderBottom:"1px solid grey"}}>
                <div>
                    <img style={{width: "160px", height: "160px", borderRadius: "80px"}}
                        src="https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60"
                    />
                </div>
                <div>
                    <h4>{state ? state.name : ". . ."}</h4>
                    <div style={{display: "flex", justifyContent: "space-between", width:"108%"}}>
                        <h6>40 post</h6>
                        <h6>40 followers</h6>
                        <h6>40 following</h6>
                    </div>
                </div>
            </div>

            <div className="gallery">
                {
                    posts.map(post=>{
                        return(
                            <img className="item" src={post.photo} key={post._id} alt={post.title}/>
                        )
                    })
                }
            </div>
        </div>
    );
}
 
export default Profile;