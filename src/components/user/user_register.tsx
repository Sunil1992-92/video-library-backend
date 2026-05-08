
import{Link, useNavigate} from "react-router-dom"
import {useFormik} from "formik" 
import axios from "axios";

export function  User_Register(){


     let navigate=useNavigate();

      const formik=useFormik({
        initialValues:{
            user_id:'',
            user_name:'',
            password:'',
            email:''
        },
        onSubmit:(user:any)=>{
            axios.post(`http://127.0.0.1:4041/register_user`,user)
            .then(()=>{
                console.log('User Register');
                
            })
            alert('User Successfully Register ..');
              navigate('/user-login')
        }
          

    })

    

    return(
        <div>
            
           <form onSubmit={formik.handleSubmit} className="mt-4 w-25">
            <h5>User Register</h5>
            <dl>
                <dt>User Id</dt>
                <dd><input type="text" onChange={formik.handleChange} name="user_id" className="form-control" /></dd>
                   
                <dt>User Name</dt>
                <dd><input type="text" onChange={formik.handleChange} name="user_name" className="form-control" /></dd>
                <dt>Password</dt>
                <dd><input type="password" onChange={formik.handleChange} name="password" className="form-control" /></dd>
                <dt>Email</dt>
                <dd><input type="email" onChange={formik.handleChange} name="email" className="form-control" /></dd>
            </dl>
            <button type="submit" className="btn btn-primary w-100">User Register</button>
            <div className="mt-3">
                <Link to={'/'} >Have Account? Login</Link>
            </div>
           </form>
            
        </div>
    )
}