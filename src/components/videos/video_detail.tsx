// import { useEffect, useState } from "react"
// import{type VideoContract } from "../../contracts/video_contract"
// import axios from "axios";


// export function Videos_details(){

// const [videos,setVideos]=useState<VideoContract[]>([]);



// function LoadAppointment(){
//         axios.get(`http://127.0.0.1:4041/videos`)
//         .then(responce=>{
//             setVideos(responce.data);
        
//             console.log(responce.data);
//         })
//     }

//     useEffect(()=>{
//         LoadAppointment();
//     },[])
//     return(
//         <div className="mt-4">
            
//                 <div className="d-flex flex-wrap ">
//                     {
//                       videos.map(item=>
//                       {
//                          const safeUrl = item.url.replace("http://", "https://");
                     
//                          return(
//                                <div className="mx-2" key={`${item.video_id}`}>
//                                 <div className="card" style={{width:'300px',height:'400px'}}>
//                                     <iframe className="card-img-top"   src={safeUrl} width={150} height={100} allowFullScreen />
//                                     <div className="card-header">
//                                         <span className="fs-4 fw-bold">{item.title}</span>

//                                     </div>
//                                     <div className="card-body">
//                                         <ul className="list-unstyled">
//                                             <li className="bi bi-hand-thumbs-up"><span>Likes </span> {item.likes}</li>
//                                             <li className="bi bi-eye"><span>Views </span> {item.views}</li>
//                                             <li className="bi bi-arrow-counterclockwise"><span>Comments</span> {item.comments}</li>
//                                             <li><span className="bi bi-usb"></span>{item.description}</li>
//                                         </ul>

//                                     </div>
//                                 </div>

//                             </div>
//                         )
//                       }
//                 )
//                 </div>
//         </div>
//     )

// }









import { useEffect, useState } from "react";
import { type VideoContract } from "../../contracts/video_contract";
import axios from "axios";

export function Videos_details() {

    const [videos, setVideos] = useState<VideoContract[]>([]);

    function LoadAppointment() {
       // axios.get(`http://127.0.0.1:4041/videos`)
     //  axios.get("http://localhost:5000/videos")
     axios.get("https://video-library-backend-cjyn.onrender.com/videos")
            .then(response => {
                setVideos(response.data);

                console.log(response.data);
            });
    }

    useEffect(() => {
        LoadAppointment();
    }, []);

    return (
        <div className="mt-4">

            <div className="d-flex flex-wrap">

                {
                    videos.map(item => {

                        const safeUrl =
                            item.url.replace("http://", "https://");

                        return (

                            <div className="mx-2" key={item.video_id}>

                                <div
                                    className="card"
                                    style={{ width: '300px', height: '400px' }}
                                >

                                    <iframe
                                        className="card-img-top"
                                        src={safeUrl}
                                        width={150}
                                        height={100}
                                        allowFullScreen
                                    />

                                    <div className="card-header">
                                        <span className="fs-4 fw-bold">
                                            {item.title}
                                        </span>
                                    </div>

                                    <div className="card-body">

                                        <ul className="list-unstyled">

                                            <li className="bi bi-hand-thumbs-up">
                                                <span>Likes </span>
                                                {item.likes}
                                            </li>

                                            <li className="bi bi-eye">
                                                <span>Views </span>
                                                {item.views}
                                            </li>

                                            <li className="bi bi-arrow-counterclockwise">
                                                <span>Comments </span>
                                                {item.comments}
                                            </li>

                                            <li>
                                                <span className="bi bi-usb"></span>
                                                {item.description}
                                            </li>

                                        </ul>

                                    </div>

                                </div>

                            </div>
                        );
                    })
                }

            </div>

        </div>
    );
}