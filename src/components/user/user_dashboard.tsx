import { Outlet,Link, useNavigate } from "react-router-dom";
import { Videos_details } from "../videos/video_detail";
import { useCookies } from "react-cookie";
 import {useEffect, useState } from "react";
import type { UserContract } from "../../contracts/user_contracts";
import type { VideoContract } from "../../contracts/video_contract";
import axios from "axios";


export function User_DashBoard(){

    const[cookie,setCookie,removeCookie]=useCookies(['user_id','user_name']);
    const [user, setUser] = useState<UserContract[]>([]);
    const[searchString,setSearchString]=useState<string>("");
    const[videos,]=useState<VideoContract[]>([]);
    let navigate=useNavigate()


    function LoadUser(){
        axios.get(`http://127.0.0.1:4041/users`)
        .then(response=>{
            setUser(response.data);
            setCookie(cookie.user_id,cookie.user_name);
        })
    }

    useEffect(()=>{
        
        if(cookie['user_name']){
            LoadUser();
        }else{
            navigate('/')
        }
    },[cookie['user_id']])

    function handleRemoveClick(){
        removeCookie('user_id');
        navigate('/');
        
    }

    

    function handleSearchChange(e:any){
        setSearchString(e.target.value);
    }
   const filteredVideo = videos
    .filter(video =>
        video.title.toLowerCase().includes(searchString.toLowerCase())
    )
      
    return(
        <div className="container-fluid">
            <header className="d-flex justify-content-between p-4 bg-body-tertiary">
                <div>
                    <span className="fs-5 fw-bold text-primary">EduStream</span>
                </div>
                 
                 <div className="w-50">
                    
                    <div className="input-group">
                        <input type="text" className="form-control" value={searchString} onChange={handleSearchChange} placeholder="search by title or category" />
                        <button className="btn btn-primary bi bi-search-heart"></button>
                    </div>
                 </div>
                <div>
                    <span className="fs-4 fw-bold bi bi-person-circle"> {cookie.user_name}</span>
                    <button onClick={handleRemoveClick} className="mx-2 btn btn-danger bi bi-gear-fill"> SignOut</button>
                </div>
            </header>
            <main>
                <div className="row">
                    <div className="col-3">
                        <div className="d-flex flex-column mt-2" role="nav">
                            <span className="fs-4  bi bi-house"> Home</span>
                            <span className="fs-4 pt-2 bi bi-yin-yang"> My Library</span>
                            <span className="fs-4 pt-2 bi bi-terminal-dash"> Trending</span>
                            <span className="fs-4 pt-2 bi bi-clock-history"> History</span>
                            <span className="fs-4 pt-2 bi bi-usb"> Subscribe</span>
                            <Link className="btn btn-primary mt-5" to="/">Back To Home</Link>
                        </div>
                        <div className="mt-2">
                            <span className="bi bi-person-circle text-success"> Total User Who are used this Site</span>
                            { user.map(u => <div>{u.user_name}</div>)}
                            
                        </div>

                    </div>
                    <div className="col-9">
                        <Videos_details />
                        <Outlet context={{ searchString, filteredVideo }} />
                    </div>

                </div>
            </main>
            
            
        </div>
    )
}