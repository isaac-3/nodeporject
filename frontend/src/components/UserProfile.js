import React,{useEffect, useState, useContext} from 'react';
import {UserContext} from '../App'
import {useParams} from 'react-router-dom'
import M from 'materialize-css'

const UserProfile = () => {

    const [profile, setProfile] = useState(null)
    const {state, dispatch} = useContext(UserContext)
    const {userId} = useParams()
    useEffect(()=>{
        fetch(`http://localhost:3001/profile/${userId}`, {
            headers: {"Authorization": "Bearer "+localStorage.getItem("jwt")}
        })
        .then(res => res.json())
        .then(res => {
            setProfile(res)
        })
    },[])
    if(profile === null || undefined){
        return(
            <h1>
                loadinbf
            </h1>
        )
    }

    const followUser = () => {
        fetch("http://localhost:3001/follow", {
            method: "PUT",
            headers: { "Content-Type": "application/json", "Authorization": "Bearer "+localStorage.getItem("jwt") },
            body: JSON.stringify({
                followId: userId
            })
        })
        .then(res => res.json())
        .then(data => {
            dispatch({type: 'UPDATE', payload: {followers: data.followers, following: data.following}})
            localStorage.setItem("user", JSON.stringify(data))
            setProfile(prevState => {
                return {
                    ...prevState,
                    user: {
                        ...prevState.user,
                        followers: [...prevState.user.followers, data._id]
                    }
                }
            })
        })
    }

    const unfollowUser = () => {
        fetch("http://localhost:3001/unfollow", {
            method: "PUT",
            headers: { "Content-Type": "application/json", "Authorization": "Bearer "+localStorage.getItem("jwt") },
            body: JSON.stringify({
                unfollowId: userId
            })
        })
        .then(res => res.json())
        .then(data => {
            dispatch({type: 'UPDATE', payload: {followers: data.followers, following: data.following}})
            localStorage.setItem("user", JSON.stringify(data))
            setProfile(prevState => {
                let newFollowers = prevState.user.followers.filter(item=> item !== data._id)
                return {
                    ...prevState,
                    user: {
                        ...prevState.user,
                        followers: newFollowers
                    }
                }
            })
        })
    }
    
    return (
        <div style={{maxWidth: "550px", margin: '0px auto'}}>
            <div style={{display: "flex", justifyContent: "space-around", margin: "80px 0px", borderBottom:"1px solid grey"}}>
                <div>
                    <img style={{width: "160px", height: "160px", borderRadius: "80px"}}
                        src="https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60"
                    />
                </div>
                <div>
                    <h4>{profile.user.name}</h4>
                    <div style={{display: "flex", justifyContent: "space-between", width:"108%"}}>
                        <h6>{profile.posts.length} post</h6>
                        <h6>{profile.user.followers.length} followers</h6>
                        <h6>{profile.user.following.length} following</h6>
                    </div>
                    {profile.user.followers.includes(state._id) ? 
                        <button className="btn waves-effect waves-light #64b5f6 blue darken-1" style={{margin: "10px"}}
                            onClick={() => unfollowUser()}
                        >Unfollow</button> :
                        <button className="btn waves-effect waves-light #64b5f6 blue darken-1" style={{margin: "10px"}}
                            onClick={() => followUser()}
                        >Follow</button>
                    }
                </div>
            </div>

            <div className="gallery">
                {
                    profile.posts.map(post=>{
                        return(
                            <img className="item" src={post.photo} key={post._id} alt={post.title}/>
                        )
                    })
                }
            </div>
        </div>
    );
}
 
export default UserProfile;