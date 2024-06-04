
import { Field, Formik, Form, ErrorMessage } from "formik";
import React, { useRef, useState, useEffect, useMemo } from "react";
import toast, { Toaster } from "react-hot-toast";
import { Navigation } from "@mui/icons-material";
import axios from "../../../Hoc/Axios";
import { IoCloudUploadSharp } from "react-icons/io5";
import JoditEditor from "jodit-react";
import { RiVideoUploadLine } from "react-icons/ri";
import { useLocation, useParams } from "react-router";
import * as Yup from "yup"
const schema=Yup.object().shape({
  rating: Yup.string()
  // .required("This field is required"),
  .matches(/^[0-5]$/,"Rating should be only upto 5"),
  
  
})
function Editform() {
  
  const location=useLocation()
  const[course, setcourse]=useState([]);
  const [value, setFieldValue] = useState("");
  const inputRef = useRef(null);
  const [image, setImage] = useState("");
  const [redirect, setredirect] = useState(false);
  const [placeholder, setplaceholder] = useState("enter description...");

  const editor = useRef(null);
  const [content, setContent] = useState("");

  const handleImageClick = () => {
    inputRef.current.click();
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    console.log(file);
    setImage(e.target.files[0]);
  };
  const videoRef = useRef(null);
const handleVideoClick = () => {
  videoRef.current.click();
};

const handleVideoChange = () => {
  const file = e.target.files[0];
  console.log(file);
  setVideo(e.target.files[0]);
};


  useEffect(() => {
    let interval;
    if (redirect) {
      interval = setTimeout(() => {
        Navigation("/");
      }, 2000);
    }
    return () => {
      clearTimeout(interval);
    };
  }, [redirect]);

   const getdata=(id)=>{
    try{
      axios.get(`/course/${id}`)
      .then((res)=>{
        console.log(res);
        setcourse([res.data.result]);
      })
      .catch((error)=>{
        console.log(error);
      });
    }
    catch(error){
      console.log(error);
    }
  };
  
  useEffect(()=>{
    if (location &&location.state &&location.state.id){
      getdata(location.state.id)
    }
  },[]);


    // const  getdatas=(id)=>{
    //   try{
    //     axios.patch(`/course/${id}`)
    //     .then((res)=>{
    //       console.log(res);
    //       setcourse([res.data.result]);
    //     })
    //     .catch((error)=>{
    //       console.log(error);
    //     });
    //   }
    //   catch(error){
    //     console.log(error);
    //   }
    //   };
    //   useEffect(() => {
    //     getdatas();
    //   }, []);
      
  return (
    <div className="mt-20">
      {
        course && course.length>0 &&(
      
      <Formik
        initialValues={{
          name: course && course.length>0 ? course[0].name: "",
          price: course && course.length>0 ? course[0].price: "",
          duration: course && course.length>0 ? course[0].duration: "",
          description:  course && course.length>0 ? course[0].description: "",
          image: "",
          rating: course && course.length>0 ? course[0].rating:"",
          tags:course && course.length>0 ? course[0].tags: "",
          discount: course && course.length>0 ? course[0].discount:"",
        }}
        onSubmit={(values, { resetForm }) => {

     const  getdatas=(id)=>{

            try {
            const formData = new FormData();
            formData.append("name", values.name);
            formData.append("price", values.price);
            formData.append("duration", values.duration);
            formData.append("description", values.description);
            formData.append("rating", values.rating);
            formData.append("tags", values.tags);
            formData.append("discount", values.discount);
            formData.append("image", values.image);
            formData.append("video", values.video);

axios
  .patch(`/course/${id}`, formData)
  .then((res) => {
    console.log(res);
    toast.success("Update Successful");
    setredirect((prev) => !prev);
    localStorage.setItem("token", res.data.accesstoken);
    Navigate("/");
    
  })
  .catch((error) => {
    console.log(error);
    toast.error(error.response.data.message);
  });
} catch (error) {
console.log(error);
}

console.log(values);
resetForm();
     }
useEffect(() => {
      getdatas();
    }, []);
}}
 >
        {({ handleSubmit, setFieldValue, values }) => {
          return (
            <Form onSubmit={handleSubmit}>
              <Toaster />

              <div className=" lg:ml-64 mt-24 mx-6 lg:mx-12">
                <div className="lg:grid lg:grid-cols-3 sm:grid sm:grid-cols-2  gap-8 flex flex-col">
                  <div className="text-left">
                    <div className="text-lg font-medium text-purple-700 mb-2">
                      Name
                    </div>
                    <div>
                      <Field
                        name="name"
                        type="text"
                        className="outline-none h-10 w-full outline-gray-200"
                        onChange={(e) => {
                          setFieldValue("name", e.target.value);
                        }}
                      />
                    </div>
                  </div>

                  <div className="text-left">
                    <div className="text-lg font-medium text-purple-700 mb-2">
                      Price
                    </div>
                    <div>
                      <Field
                        name="price"
                        type="number"
                        className="outline-none h-10 w-full outline-gray-200"
                        onChange={(e) => {
                          setFieldValue("price", e.target.value);
                        }}
                      />
                       
                    </div>
                  </div>

                  <div className="text-left">
                    <div className="text-lg font-medium text-purple-700 mb-2">
                      Duration
                    </div>
                    <div>
                      <Field
                        name="duration"
                        type="text"
                        className="outline-none h-10 w-full outline-gray-200"
                        onChange={(e) => {
                          setFieldValue("duration", e.target.value);
                        }}
                      />
                    </div>
                  </div>


                  <div className="text-left">
                    <div className="text-lg font-medium text-purple-700 mb-2">
                      Rating
                    </div>
                    <div>
                      <Field
                        name="rating"
                        type="number"
                  
                        className="outline-none h-10 w-full outline-gray-200"
                        onChange={(e) => {
                          setFieldValue("rating",e.target.value);
                        }}
                      />
                       <ErrorMessage
                        name="rating"
                     component={"div"}
                    className="text-red-600"
                         />
                    </div>
                  </div>

                  <div className="text-left">
                    <div className="text-lg font-medium text-purple-700 mb-2">
                      Discount
                    </div>
                    <div>
                      <Field
                        name="discount"
                        type="percentge"
                        className="outline-none h-10 w-full outline-gray-200"
                        onChange={(e) => {
                          setFieldValue("discount", e.target.value);
                        }}
                      />
                    </div>
                  </div>

                  <div className="text-left">
                    <div className="text-lg font-medium text-purple-700 mb-2">
                      Tags
                    </div>
                    <div>
                      <Field
                        name="tags"
                        type="text"
                        className="outline-none h-10 w-full outline-gray-200"
                        onChange={(e) => {
                          setFieldValue("tags", e.target.value);
                        }}
                      />
                    </div>
                  </div>
                </div>

               
                  <div className="text-left mt-10 ">
                    <div className="text-lg font-medium text-purple-700 mb-2">
                      Upload Image
                    </div>
                    <div onClick={handleImageClick}>
                      {values.image ? (
                        <img
                          src={URL.createObjectURL(values.image)}
                          className="h-56  w-56 cursor-pointer"
                          alt="image"
                          name="image"
                        />
                      ) : (
                        <div className="h-56 w-56  cursor-pointer border border-black border-dashed flex text-xl flex-col  justify-center text-center items-center text-gray-400 ">
                          <div className="text-5xl">
                            <IoCloudUploadSharp />
                          </div>
                          <div>Click to upload</div>
                        </div>
                      )}
                      <Field
                        name="image"
                        type="file"
                        ref={inputRef}
                        onChange={(e) => {
                          setFieldValue("image", e.target.files[0]);
                        }}
                        style={{ display: "none" }}
                      />
                    </div>
                  </div>

                  <div className="text-left mt-10 w-full">
                    <div className="text-lg font-medium text-purple-700 mb-2 ">
                      Description
                      <JoditEditor
                      name="description"
                        ref={editor}
                        value={content}
                       className="text-black"
                        tabIndex={1} 
                        onBlur={(newContent) => setContent(newContent)} 
                        onChange={(newContent) => {
                        setFieldValue("description", newContent);
                        }}
                      />
                    </div>
                  </div>

                  <div className=" mt-10 w-full">
              <div className="">
                    <div className="text-lg  font-semibold  text-purple-700 mb-2">
                      Upload Course Video
                    </div>
                    <div onClick={handleVideoClick}>
                      {values.video ? (
                        <video controls
                        src={URL.createObjectURL(values.video)}
                        alt="video"
                        name="video"
                        className=" w-full height={200}  bg-black controls={true} muted={true} loop={true} autoPlay={true}border border-black cursor-pointer"
                        />
                      ) : (
                        <div className=" h-56 w-56 cursor-pointer  border border-black border-dashed flex text-xl flex-col  justify-center text-center items-center text-gray-400 ">
                          <div className="text-5xl ">
                          <RiVideoUploadLine />
                          </div>
                          <div>Click to upload</div>
                        </div>
                      )}
                      <Field
                        name="video"
                        type="file"
                        ref={videoRef}
                        className="w-full height={200} bg-black controls={true}  muted={true} loop={true} autoPlay={true} "
                        
                        
                        onChange={(e) => {
                          setFieldValue("video", e.target.files[0]);
                        }}
                        style={{ display: "none" }}
                      />
                    </div>
                  </div>
              </div>


                  <div className="text-left flex gap-6 my-5  ">
                    <button
                      onClick={() => {
                        Navigation(-1);
                      }}
                      type="button"
                      className="bg-red-600 h-11 my-5 w-24 shadow-2xl text-lg rounded-lg text-center text-white hover:bg-red-500"
                    >
                      Cancel
                    </button>

                    <button
                      type="submit"
                      className="bg-indigo-600 h-11 my-5 w-24 shadow-2xl text-lg rounded-lg text-center text-white hover:bg-indigo-500"
                    >
                      Save
                    </button>
                  </div>
                </div>
             
            </Form>
          );
        }}
      </Formik>
          
        )
      }
    </div>

  );
}
export default Editform;
        




// import React, { useRef, useState, useEffect } from "react";
// import toast, { Toaster } from "react-hot-toast";
// import { IoCloudUploadSharp } from "react-icons/io5";
// import { RiVideoUploadLine } from "react-icons/ri";
// import JoditEditor from "jodit-react";
// import axios from "../../Hoc/Axios";
// import {  useParams } from "react-router-dom";

// function Editform() {
//   const history = useHistory();
//   const { id } = useParams();
//   const [course, setCourse] = useState({});
//   const [redirect, setRedirect] = useState(false);
//   const [content, setContent] = useState("");

//   useEffect(() => {
    
//     axios.get(`/course/${id}`)
//       .then((res) => {
//         setCourse(res.data.result);
//       })
//       .catch((error) => {
//         console.log(error);
//       });
//   }, [id]);

//   const handleSubmit = (values) => {
//     try {
//       const formData = new FormData();
//       formData.append("name", values.name);
//       formData.append("price", values.price);
//       formData.append("duration", values.duration);
//       formData.append("description", values.description);
//       formData.append("rating", values.rating);
//       formData.append("tags", values.tags);
//       formData.append("discount", values.discount);
//       formData.append("image", values.image);
//       formData.append("video", values.video);

//       axios.patch(`/course/${id}`, formData)
//         .then((res) => {
//           console.log(res);
//           toast.success("Update Successful");
//           setRedirect(true);
//         })
//         .catch((error) => {
//           console.log(error);
//           toast.error(error.response.data.message);
//         });
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   useEffect(() => {
//     let timeout;
//     if (redirect) {
//       timeout = setTimeout(() => {
//         history.push("/"); 
//       }, 2000);
//     }
//     return () => clearTimeout(timeout);
//   }, [redirect, history]);

//   const handleImageChange = (e) => {
//     const file = e.target.files[0];
//     console.log(file);
   
//   };

//   const handleVideoChange = (e) => {
//     const file = e.target.files[0];
//     console.log(file);
   
//   };

//   return (
//     <div className="mt-20">
//       <Formik
//         initialValues={{
//           name: course.name || "",
//           price: course.price || "",
//           duration: course.duration || "",
//           description: course.description || "",
//           image: "",
//           rating: course.rating || "",
//           tags: course.tags || "",
//           discount: course.discount || "",
//         }}
//         onSubmit={(values) => {
//           handleSubmit(values);
//         }}
//       >
//         {({ handleSubmit, setFieldValue, values }) => (
//           <Form onSubmit={handleSubmit}>
//             <Toaster />
//             {/* Form fields */}
//           </Form>
//         )}
//       </Formik>
//     </div>
//   );
// }

// export default Editform;



             










