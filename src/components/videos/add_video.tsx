import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import type { CategoryContract } from "../../contracts/categories_contract"
import { useFormik } from "formik";
import axios from "axios";



 
export function Add_Video(){

    const[cateories,setCategories]=useState<CategoryContract[]>([]);
    let navigate=useNavigate();

    const formik=useFormik({
        initialValues:{
            video_id:'',
            title:'',
            description:'',
            url:'',
            likes:0,
            dislikes:0,
            views:0,
            category_id:0
        },
        onSubmit:(video)=>{
            axios.post(`http://127.0.0.1:4041/add_video`,video)
            .then(()=>{
                console.log('Added');
                
            alert('Video Added');
            navigate('/admin-dashboard')
            })
        }
    })

    function LoadCategories(){
        axios.get(`http://127.0.0.1:4041/categories`)
        .then(response=>{
            response.data.unshift({category_id:-1,category_name:'Select Category'});
            setCategories(response.data);

        })
    }

    useEffect(()=>{
        LoadCategories();
    },[])
    return(
       <form onSubmit={formik.handleSubmit} className="w-50 mt-2">
        <div className="modal-header">
            <h4>Add New Video</h4>
        </div>
        <div className="modal-body">
            <dl>
                <dt>Video Id</dt>
                <dd><input onChange={formik.handleChange} type="text"  className="form-control" name="video_id" /></dd>
                <dt>Title</dt>
                <dd><input type="text" onChange={formik.handleChange}  className="form-control" name="title" /></dd>
                <dt>Description</dt>
                <dd><textarea onChange={formik.handleChange} name="description"  rows={4} cols={40} className="form-control" ></textarea></dd>
                <dt>URL</dt>
                <dd><input type="text" onChange={formik.handleChange} className="form-control" name="url" /></dd>
                <dt>Likes</dt>
                <dd><input onChange={formik.handleChange} type="text"  className="form-control" name="likes" /></dd>
                <dt>Dislikes</dt>
                <dd><input type="text" onChange={formik.handleChange} className="form-control" name="dislikes" /></dd>
                <dt>Views</dt>
                <dd><input type="text" onChange={formik.handleChange} className="form-control" name="views" /></dd>
                <dt>Category</dt>
                <dd>
                    <select name="category_id" onChange={formik.handleChange} className="form-select w-25">
                        {
                            cateories?.map(category=>
                                <option value={category.category_id} key={category.category_id}>{category.category_name}</option>
                            )
                        }
                    </select>
                </dd>
            </dl>
        </div>
        <div className="modal-footer">
            <button type="submit" data-bs-dismiss="modal" className="btn btn-primary">Add</button>
            <Link to={'/admin-dashboard'}className="btn btn-warning mx-2" >Cancel</Link>

        </div>
       </form>
    )
}












