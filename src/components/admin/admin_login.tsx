import{ useNavigate} from "react-router-dom"
import { useFormik } from "formik";
import axios from "axios";

export function Admin_Login(){

    let nevigate=useNavigate();

    const formik=useFormik({
        initialValues:{
            admin_id:'',
            password:''
        },
        onSubmit(admin){
            axios.get(`http://127.0.0.1:4041/admin`)
            .then(responce=>{
                 var record= responce.data.find((item:any)=>item.admin_id===admin.admin_id)
                 if(record){
                    if(admin.password===record.password){
                        nevigate('/admin-dashboard')
                    }else{
                        alert('Invalid Password')
                    }
                 }else{
                    alert('Invalid Admin Id')
                 }
                 
            })
        }
    })

    return(
        <div>
            <form onSubmit={formik.handleSubmit}>
                <dl>
                <dt>Work Email</dt>
                <dd><input type="text" onChange={formik.handleChange} name="admin_id" className="form-control" /></dd>
                <dt>Access Key</dt>
                <dd><input type="password" onChange={formik.handleChange} name="password" className="form-control" /></dd>
            </dl>
             <button type="submit" className="btn btn-dark">Admin Login</button>
            </form>
           
           
            
        </div>
    )
}