 import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import axios from "axios"
import {type VideoContract } from "../../contracts/video_contract"
import { useNavigate } from "react-router-dom"


export function Delete_Video(){

    const params=useParams();
    const navigate=useNavigate();

    const[video,setVideo]=useState<VideoContract |null>(null)

    function loadVideo(){
        console.log("Params ID:", params.id);
        axios.get(`http://127.0.0.1:4041/videos/${params.id}`)
        .then(response=>{
            setVideo(response.data);
           // console.log(response.data);
        })
        .catch(error=>{
            console.log('get Error',error);
        })
    }

    function handleDeleteVideo(){
        axios.delete(`http://127.0.0.1:4041/videos/${params.id}`)
        .then(()=>{
            console.log(params)
            alert("video deleted")
            navigate("/admin-dashboard")
           // console.log('vedeo delete')
            
        })
        
    }
    useEffect(()=>{
       if(params.id)
       { loadVideo();}
        
    
    },[params.id])
    return(
        <div className="mt-5">
            <h1>Delete Video</h1>
            <div>
                 {
                    video &&(
                        <dl>
                        <dt>Title</dt>
                        <dd>{video.title}</dd>
                        <dt>Discription</dt>
                        <dd>{video.description}</dd>
                        <dt>URL</dt>
                        <dd>{video.url}</dd>
                        <dt>Likes</dt>
                        <dd>{video.likes}</dd>
                        <dt>Dislikes</dt>
                        <dd>{video.dislikes}</dd>

                    </dl>
                    
                    
                    )
                 }
                  
            </div>
            <button onClick={handleDeleteVideo} className="btn btn-primary">Yes</button>
            <Link to="/admin-dashboard" className="mx-2">No</Link>

        </div>
    )
}
    

