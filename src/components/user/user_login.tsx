import { useFormik } from "formik";
import { useCookies } from "react-cookie"
import { useNavigate } from "react-router-dom"
//import { type UserContract } from "../../contracts/user_contracts";
import axios from "axios";
import { Link } from "react-router-dom";



export function User_Login(){

    let nevigate=useNavigate();

   const[,setCookie,]=useCookies(['user_id','user_name']);

    
    const formik=useFormik({
        initialValues:{
            user_id:'',
            password:''
        },
        onSubmit(user){
           // axios.get(`http://127.0.0.1:4041/users`)
           axios.get("https://video-library-backend-cjyn.onrender.com/users")
            .then(response=>{
                console.log(response.data)
                var record =response.data.find((item:any)=>item.user_id===user.user_id)
                if(record){
                    if(user.password===record.password){
                        setCookie('user_name',user.user_id);
                        nevigate('/user-dashboard')
                    }else{
                        alert('Invalid Password')
                    }
                }else{
                        alert('Invalid User Id')
                    }
                
            })
        }
    })

    

    return (
        <div>
            <form onSubmit={formik.handleSubmit} className="mt-4 w-100">
                <dl>
                <dt>User Id</dt>
                <dd><input type="text" name="user_id" onChange={formik.handleChange} className="form-control"/></dd>
                <dt>Password</dt>
                <dd><input name="password" onChange={formik.handleChange} type="password" className="form-control" /></dd>
            </dl>
            <button type="submit" className="btn btn-primary">Login</button>
            <Link to="/user-registration" className="btn btn-success mx-2">User Register</Link>

            </form>
        </div>
    )
}