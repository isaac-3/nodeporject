
import React,{useState, useEffect, useContext} from 'react';
import {UserContext} from '../App'
import {Link} from 'react-router-dom'

const SubUserPosts = () => {

    const [data, setData] = useState([])
    // const [icomment, setiComment] = useState('')
    const {state, dispatch} = useContext(UserContext)

    useEffect(() => {
        fetch("http://localhost:3001/subpost", {
            headers: {"Authorization": "Bearer "+localStorage.getItem("jwt")}
        })
        .then(res => res.json())
        .then(res => {
            setData(res.posts)
        })
    },[])

    const likePost = (id) => {
        fetch("http://localhost:3001/like", {
            method: "PUT",
            headers: { "Content-Type": "application/json", "Authorization": "Bearer "+localStorage.getItem("jwt") },
            body: JSON.stringify({
                postId: id
            })
        })
        .then(res => res.json())
        .then(res=>{
            const newData = data.map(item => {
                if(item._id === res._id){
                    return res
                }else{
                    return item
                }
            })
            setData(newData)
        })
    }
    const unlikePost = (id) => {
        fetch("http://localhost:3001/unlike", {
            method: "PUT",
            headers: { "Content-Type": "application/json", "Authorization": "Bearer "+localStorage.getItem("jwt") },
            body: JSON.stringify({
                postId: id
            })
        })
        .then(res => res.json())
        .then(res=>{
            const newData = data.map(item => {
                if(item._id === res._id){
                    return res
                }else{
                    return item
                }
            })
            setData(newData)
        })
    }
    const makeComment = (text, postId) => {
        fetch("http://localhost:3001/comment", {
            method: "PUT",
            headers: { "Content-Type": "application/json", "Authorization": "Bearer "+localStorage.getItem("jwt") },
            body: JSON.stringify({
                postId,
                text
            })
        })
        .then(res => res.json())
        .then(res=>{
            const newData = data.map(item => {
                if(item._id === res._id){
                    return res
                }else{
                    return item
                }
            })
            setData(newData)
        })
        // setiComment('')
    }
    const deletePost = (postId) => {
        fetch(`http://localhost:3001/deletepost/${postId}`, {
            method: "DELETE",
            headers: { "Authorization": "Bearer "+localStorage.getItem("jwt")}
        })
        .then(res => res.json())
        .then(res=>{
            const newData = data.filter(item => {
                return item._id !== res._id
            })
            setData(newData)
        })
    }
    const deleteComment = (postId, commentId) => {
        fetch(`http://localhost:3001/deletecomment/${postId}`, {
            method: "DELETE",
            headers: { "Content-Type": "application/json", "Authorization": "Bearer "+localStorage.getItem("jwt")},
            body: JSON.stringify({
                commentId: commentId
            })
        })
        .then(res => res.json())
        .then(res=>{
            const newData = data.map(item => {
                if(item._id === res._id){
                    return res
                }else{
                    return item
                }
            })
            setData(newData)
        })
    }
    
    return (
        <div className="home">
            {
                data.map(item => {
                    return(
                        <div className="card home-card" key={item._id}>
                            <div>
                                <img style={{width: "30px", height: "30px", borderRadius: "50%", float: 'left',margin: "8px"}}
                                    src={item.postedBy.pic}
                                />
                                <h5 style={{padding: "8px"}}>
                                    <Link to={item.postedBy._id !== state._id ? '/profile/'+item.postedBy._id : '/profile'}>
                                    {item.postedBy.name}
                                    </Link>
                                    {item.postedBy._id === state._id &&
                                        <i className="material-icons" style={{float: 'right'}}
                                            onClick={() => deletePost(item._id)}
                                        >delete</i>
                                    }
                                </h5>
                            </div>
                            <div className="card-image">
                                <img src={item.photo}/>
                            </div>
                            <div className="card-content">
                                {item.likes.includes(state._id) ? 
                                    <i className="material-icons" style={{color: 'red'}}
                                    onClick={() => unlikePost(item._id)}
                                    >favorite</i>
                                    :
                                    <i className="material-icons"
                                        onClick={() => likePost(item._id)}
                                    >favorite</i>
                                }
                                <h6>{item.likes.length} likes</h6>
                                <h6>{item.title}</h6>
                                <p>{item.body}</p>
                                {
                                    item.comments.map(comment => {
                                        return(
                                        <h6 key={comment._id}><span style={{fontWeight: '500'}}>{comment.postedBy.name}</span>  {comment.text}
                                            {comment.postedBy._id === state._id &&
                                                <i className="material-icons" style={{float: 'right'}}
                                                    onClick={() => deleteComment( item._id, comment._id)}
                                                >delete</i>
                                            }
                                        </h6>
                                        )
                                    })
                                }
                                <form onSubmit={(e) => {
                                    e.preventDefault()
                                    makeComment(e.target[0].value, item._id)
                                }}>
                                    <input type='text' placeholder="add a comment"
                                    //  value={icomment} onChange={(e) => setiComment(e.target.value)}
                                     />
                                </form>
                            </div>
                        </div>
                    )
                })
            }
        </div>
    );
}
 
export default SubUserPosts;