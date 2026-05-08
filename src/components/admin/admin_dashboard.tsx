import { useEffect, useState } from "react"
import type { VideoContract } from "../../contracts/video_contract"
import axios from "axios"
import { Link } from "react-router-dom"
import { Outlet } from "react-router-dom"



export function Admin_DashBpard(){

    const[videos,setVideos]=useState<VideoContract[]>([]);
    const[selectCategory,setSelectCategory]=useState<string>('all')
    const[searchStr,setSearchStr]=useState<string>("");
    const [sortOrder,setSortOrder]=useState<'default'| 'asc'|'desc'>('default');
    const[categories,setCotegories]=useState<any[]>([])

    function LoadVideos(){
        axios.get(`http://127.0.0.1:4041/videos`)
        .then(response=>{
            setVideos(response.data);
            
            console.log(response.data);
        })
    }

    function handleSearchChange(e:any){
        setSearchStr(e.target.value)
    }
  const filteredVideo = videos
    .filter(video =>
        video.title.toLowerCase().includes(searchStr.toLowerCase())
    )
    .filter(video =>
        selectCategory==="all"
        ?
        true
        :
        video.category_name?.toLowerCase().includes(selectCategory.toLowerCase())
        // this is not come because not data store in videos by name "category_name" 
        // so category List only load so when a select a category then it will return null
    )
    .sort((a, b) => {
        if (sortOrder === 'asc') {
            return  a.likes - b.likes;
        } else if (sortOrder === 'desc') {
            return b.likes - a.likes;
        } else {
            return 0;
        }
    });
    
    function handleSortChange(e:any){
        setSortOrder(e.target.value)
    }

   
    
    function LoadCategory(){
        axios.get(`http://127.0.0.1:4041/categories`)
        .then(response=>{
            setCotegories(response.data);
            console.log(response.data)
        })
    }


    function handleChangeCategory(e:any){
        const value=e.target.value;
        setSelectCategory(value);
        console.log("Selected:", value);
    }


    useEffect(()=>{
        LoadVideos();
        LoadCategory();
    },[])
    return(
       <div>
            <div className="d-flex justify-content-between p-4 bg-body-secondary" role="header">
                <div>
                    <span className="fs-5 fw-bold bi bi-youtube">Video Manager</span>
                </div>
                <div>
                    <div className="input-group">
                        <input type="text" onChange={handleSearchChange} value={searchStr} className="form-control"/>
                        <button onClick={handleSearchChange} className="btn btn-dark bi bi-search"></button>
                    </div>
                </div>
                <div>
                    <Link to={'/add-video/'} className="btn btn-primary bi bi-plus">New Video</Link>
                </div>
                <div>
                    
                    <Link to={'/'}>Back To Home</Link>
                    

                </div>
                <div>
                <span className="bi bi-person-circle fs-5"></span>
                </div>
            </div>
            <div  role="main">
                <div className="mt-2">
                    <span className="fs-5 fw-bold">Video Tutorial</span><br />
                <p>Manage and monitor your uploaded tutorial content. <br /> View performance matrics
                    and update video meta data in real time.
                </p>
                </div>
                <div className="d-flex justify-content-evenly border border-1 p-4 bg-light mt-4">
                    <div>
                    <span>Likes Range</span>
                    <select onChange={handleSortChange} className="form-select">
                        <option value="default">Sort Views</option>
                        <option value="asc">Low To High</option>
                        <option value="desc">High To Low</option>
                    
                    
                    
                    </select>
                </div>
                <div>
                    <span>Category</span>
                    <select className="form-select" name="category" onChange={handleChangeCategory}>
                       <option value="all">All Category</option>
                       {
                        categories.map((cat:any)=>(
                            <option key={cat._id} value={cat.category_name}>
                                {cat.category_name}
                            </option>
                        )
                            
                        )
                       }   
                       
                    </select>
                </div>
                
                <div>
                    <button className="btn btn-dark bi bi-justify-left">More Filter</button>
                    <button className="btn btn-dark bi bi-chevron-bar-down mx-2"></button>
                </div>
 
                </div>
                <div role="section">
                
                    <div>
                        <table className="table table-hover">
                            <thead>
                                <tr>
                                    <th>Video Title</th>
                                    <th>Videos</th>
                                    <th>Description</th>
                                    <th>Views</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    filteredVideo.length > 0 ? (
                                     filteredVideo.map(video=>(
                                        <tr key={video.views}>
                                            <td>{video.title}</td>
                                            <td>
                                                <iframe src={video.url} width={100} height={80} />
                                            </td>
                                            <td>{video.description}</td>
                                            <td>{video.likes}</td>
                                            <td>
                                                <Link to={`/edit_video/${video.video_id}`} className="btn btn-warning bi bi-pen-fill"></Link>
                                                <Link to={`/delete-video/${video.video_id}`} className="btn btn-danger mx-2 bi bi-trash-fill"></Link>
                                            </td>

                                        </tr>

                                    ))
                                 ) :
                                    (
                                        <tr>
                                            <td colSpan={5} className="text-danger text-center">
                                                No Video Found
                                            </td>
                                        </tr>
                                    )
                                
                                               
                                    
                                }
                            </tbody>
                        </table>
                        
                    </div>
                     <Outlet context={searchStr} />
                </div>
                               
            </div>
       </div>
    )
}