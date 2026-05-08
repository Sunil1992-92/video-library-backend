import {BrowserRouter, Route,Routes} from "react-router-dom";
import { Admin_DashBpard } from "./components/admin/admin_dashboard";
import { Home } from "./home";
import { Admin_Login } from "./components/admin/admin_login";
import { User_Register } from "./components/user/user_register";
import { User_Login } from "./components/user/user_login";
import { User_DashBoard } from "./components/user/user_dashboard";
import { Add_Video } from "./components/videos/add_video";
import { Edit_Video } from "./components/videos/edit_video";
import { Delete_Video } from "./components/videos/delete_video";


export function Tutorial_Home(){

    return(
        <div className="container-fluid">
            <BrowserRouter>
            
            <section>
                <Routes>
                    <Route path='/' element={<Home/>} />
                    <Route path="user-login" element={<User_Login/>}/>
                    <Route path="/user-dashboard" element={<User_DashBoard/>}/>
                    
                    <Route path="/user-registration" element={<User_Register/>}/>
                    <Route path='admin-login' element={<Admin_Login/>}/>
                    <Route path="/admin-dashboard" element={<Admin_DashBpard/>} />
                    <Route path="/add-video" element={<Add_Video/>}/>
                    <Route path="/edit_video/:id" element={<Edit_Video/>}/>
                    <Route path="/delete-video/:id" element={<Delete_Video/>}/>

                    
                </Routes>


            </section>
            </BrowserRouter>

        </div>
    )
}