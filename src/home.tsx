import { Admin_Login } from "./components/admin/admin_login";
import { User_Login } from "./components/user/user_login";

export function Home(){

    return(
        <div className="container-fluid">
            <header className="d-flex justify-content-between p-4 bg-dark text-white">
                <div>
                    <span className="fs-4 fw-bold bi bi-youtube"> Video Library</span>
                </div>
                <div>
                    <nav>
                        <span>Category</span>
                        <span className="mx-2">Movie</span>
                        <span className="mx-2">Education</span>
                    </nav>
                </div>
                <div>
                    <span className="btn btn-danger bi bi-gear-fill"> Setting</span>
                </div>


            </header>
            <div className="row">
                <div className="col bg-light align-item-center mt-5">
                    <div className="d-flex justify-content-center ">
                        <p className="fs-6 fw-bold">Masetr your craft with expert-led tutorial.</p>
                    </div>
                    <div className="d-flex justify-content-center">
                        <div className="mt-4 me-3 justify-content-center border border-1 rounded rounded-3 bg-light text-danger w-50">
                            <span className="fs-4 fw-bold bi bi-mailbox2"> Work Email: </span><span className="fs-5 fw-bold">sunil_nit</span><br />
                        <span className="fs-4 fw-bold bi bi-key-fill">Access Key: </span><span className="fs-5 fw-bold">9415576098</span>
                        </div>
                    </div>
                    
                </div>
                <div className="col">
                    <div className="mt-5 ps-5 pe-4 w-75">
                        <ul className="nav nav-pills "> 
                            <li className="nav-item">
                                <a href="#adminlogin" data-bs-toggle='tab' className="nav-link active">Admin Login</a>
                            </li>
                            <li className="nav-item">
                                <a href="#login" data-bs-toggle='tab' className="nav-link">User Login</a>
                            </li>

                        </ul>
                        <div className="tab-content">
                            <div className="tab-pane show active mt-5" id="adminlogin">
                                <Admin_Login/>
                                
                            </div>
                            
                                <div className="tab-pane mt-5 " id="login">
                                    <User_Login/>
                               </div>

                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}