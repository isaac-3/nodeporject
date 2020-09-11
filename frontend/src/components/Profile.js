import React,{useEffect, useState, useContext} from 'react';
import {UserContext} from '../App'


const Profile = () => {

    const [posts, setPosts] = useState([])
    const {state, dispatch} = useContext(UserContext)
    const [image, setImage] = useState('')
    const [url, setUrl] = useState(undefined)

    useEffect(()=>{
        fetch("http://localhost:3001/mypost", {
            headers: {"Authorization": "Bearer "+localStorage.getItem("jwt")}
        })
        .then(res => res.json())
        .then(res => {
            setPosts(res.mypost)
        })
    },[]) 
    useEffect(()=>{
        if(image){
            const data = new FormData()
            data.append("file", image)
            data.append("upload_preset", "insta-clone")
            data.append("cloud_name", "iisaac")
            fetch("https://api.cloudinary.com/v1_1/iisaac/image/upload", {
                method: "POST",
                body: data
            })
            .then(res => res.json())
            .then(data=>{
                fetch("http://localhost:3001/updatepic", {
                    method: "PUT",
                    headers: { "Content-Type": "application/json", "Authorization": "Bearer "+localStorage.getItem("jwt") },
                    body: JSON.stringify({
                        pic: data.url
                    })
                })
                .then(res => res.json())
                .then(res=>{
                    localStorage.setItem("user", JSON.stringify({...state, pic:res.pic}))
                    dispatch({type: 'UPDATEPIC', payload: res.pic})
                })
            }).catch(err => {
                console.log(err)
            })
        }
    },[image])
    const updatePhoto = (file) => {
        setImage(file)
    }
    if(state == null){
        return <h1>loading</h1>
    }
    
    return (
        <div style={{maxWidth: "550px", margin: '0px auto'}}>
            <div style={{display: "flex", justifyContent: "space-around", margin: "80px 0px", borderBottom:"1px solid grey"}}>
                <div style={{position: 'relative'}}>
                    <img style={{width: "160px", height: "160px", borderRadius: "80px"}}
                        src={state.pic}
                    />
                    {/* <i className="material-icons" style={{position: 'absolute', bottom:'0', right:'0'}}
                        onClick={() => updatePhoto()}
                    >camera_alt</i> */}
                    <div className="file-field input-field">
                        <div className="btn #64b5f6 blue darken-1">
                            <span><i className="material-icons">camera_alt</i></span>
                            <input type="file" onChange={(e) => updatePhoto(e.target.files[0])}/>
                        </div>
                        <div className="file-path-wrapper">
                            <input className="file-path validate" type="text"/>
                        </div>
                    </div>
                </div>
                <div>
                    <h4>{state ? state.name : ". . ."}</h4>
                    <div style={{display: "flex", justifyContent: "space-between", width:"108%"}}>
                        <h6>{posts.length} post</h6>
                        <h6>{state.followers.length} followers</h6>
                        <h6>{state.following.length} following</h6>
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