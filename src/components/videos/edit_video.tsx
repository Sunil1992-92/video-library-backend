import axios from "axios";
import {useFormik } from "formik";
import { useEffect} from "react";
import{Link, useNavigate, useParams} from "react-router-dom"




export function Edit_Video(){

    let navigate=useNavigate();
    let params=useParams();

    const fromik=useFormik({
        initialValues:{
            video_id: 0,
            title: "",
            description: "",
             url: "",
             likes: 0,
             dislikes: 0,
             views: 0,
             category_id: 0      
              },
         enableReinitialize: true,
        onSubmit:(editvedio)=>{
            axios.put(`http://127.0.0.1:4041/videos/${params.id}`,editvedio)
            .then(()=>{
                console.log('updated');
                alert('Video Update Successfully')
                 navigate(`/admin-dashboard`);
            })
           
        }
    })
    function LoadVideo(){
        axios.get(`http://127.0.0.1:4041/videos/${params.id}`)
        .then(response=>{
            
            console.log(response.data);
            fromik.setValues(response.data)
            
        });
    }

    useEffect(()=>{
        LoadVideo();
    },[])

    return(
        <form onSubmit={fromik.handleSubmit}  className="w-50 mt-2">
                <div className="modal-header">
                    <h4>Edit Video</h4>
                </div>
                <div className="modal-body">
                    <dl>
                        <dt>Video Id</dt>
                        <dd><input type="text" readOnly  value={fromik.values.video_id} className="form-control" name="video_id" /></dd>
                        <dt>Title</dt>
                        <dd><input type="text" onChange={fromik.handleChange} value={fromik.values.title} className="form-control" name="title" /></dd>
                        <dt>Description</dt>
                        <dd><textarea name="description" onChange={fromik.handleChange} value={fromik.values.description} rows={4} cols={40} className="form-control" ></textarea></dd>
                        <dt>URL</dt>
                        <dd><input type="text" onChange={fromik.handleChange} value={fromik.values.url} className="form-control" name="url" /></dd>
                        <dt>Likes</dt>
                        <dd><input  type="text" onChange={fromik.handleChange} value={fromik.values.likes} className="form-control" name="likes" /></dd>
                        <dt>Dislikes</dt>
                        <dd><input type="text" onChange={fromik.handleChange} value={fromik.values.dislikes} className="form-control" name="dislikes" /></dd>
                        <dt>Views</dt>
                        <dd><input type="text" onChange={fromik.handleChange} value={fromik.values.views} className="form-control" name="views" /></dd>
                        <dt>Category</dt>
                        
                    </dl>
                </div>
                <div className="modal-footer">
                    <button type="submit" className="btn btn-primary">Save</button>
                    <Link to={`/admin-dashboard`}className="btn btn-warning mx-2" >Cancel</Link>
        
                </div>
               </form>
    )
} 


