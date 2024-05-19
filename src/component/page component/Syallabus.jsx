
import { Field, Formik, Form } from "formik";
import React, { useRef, useState, useEffect, useMemo } from "react";
import toast, { Toaster } from "react-hot-toast";
import { Description, Navigation } from "@mui/icons-material";
import axios from "../../Hoc/Axios"
import JoditEditor from "jodit-react";
import { RiVideoUploadLine } from "react-icons/ri";


function Syallabus() {
  
  const [value, setFieldValue] = useState("");
 
  const [redirect, setredirect] = useState(false);
  const [placeholder, setplaceholder] = useState("enter description...");

  const editor = useRef(null);
  const [content, setContent] = useState("");


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

  return (
    <div className="mt-20">
      <Formik
        initialValues={{
          title: "",
          subtitle: "",
          description: "",

          
        }}
        onSubmit={(values, { resetForm }) => {
          try {
            const formData = new FormData();
            formData.append("title", values.title);
            formData.append("subtitle", values.subtitle);
            formData.append("description", values.description);
            formData.append("video", values.video);

            axios
              .post("/syllabus/", formData)
              .then((res) => {
                console.log(res);
                toast.success("Post Successful");
                setredirect((prev) => !prev);
                localStorage.setItem("token", res.data.accesstoken);
                Navigate("/");
                // setcourse([...res.data.data]);
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
        }}
      >
        {({ handleSubmit, setFieldValue, values }) => {
          return (
            <Form onSubmit={handleSubmit}>
              <Toaster />

              <div className="ml-64 mt-16 ">
                <div className=" flex gap-12 w-full">
                  <div className="text-left">
                    <div className="text-lg font-medium text-purple-700 mb-2">
                      Title
                    </div>
                    <div>
                      <Field
                        name="title"
                        type="text"
                        className="outline-none h-10 w-[280px] outline-gray-200"
                        onChange={(e) => {
                          setFieldValue("title", e.target.value);
                        }}
                      />
                    </div>
                  

                  
                </div>


                <div className="text-left">
                    <div className="text-lg font-medium text-purple-700 mb-2">
                     Sub Title
                    </div>
                    <div>
                      <Field
                        name="subtitle"
                        type="text"
                        className="outline-none h-10 w-[280px] outline-gray-200"
                        onChange={(e) => {
                          setFieldValue("subtitle", e.target.value);
                        }}
                      />
                    </div>
                    </div>

                  
                </div>
               
                  <div className="text-left mt-10  w-11/12">
                    <div className="text-lg font-medium text-purple-700 mb-2 ">
                      Description
                      
                      <JoditEditor
                        ref={editor}
                        value={content}
                       className="text-black"
                        // config={config}
                        tabIndex={1} // tabIndex of textarea
                        onBlur={(newContent) => setContent(newContent)} // preferred to use only this option to update the content for performance reasons
                        onChange={(newContent) => {
                            setFieldValue("description", e.target.value);
                        }}
                      />
                    </div>
                  </div>

                  
              <div className="mt-10 w-11/12">
                    <div className="text-lg  font-semibold  text-purple-700 mb-2">
                      Upload Course Video
                    </div>
                    <div onClick={handleVideoClick}>
                      {values.video ? (
                        <video controls
                        src={URL.createObjectURL(values.video)}
                        alt=""
                        name="video"
                        className="width={1010} height={200}  bg-black controls={true} muted={true} loop={true} autoPlay={true}border border-black cursor-pointer"
                        />
                      ) : (
                        <div className=" h-56 w-56 cursor-pointer  border border-black border-dashed flex text-xl flex-col  justify-center text-center items-center text-gray-400 ">
                          <div className="text-5xl ">
                          <RiVideoUploadLine />
                          </div>
                          <div>Click to upload</div>
                        </div>
                      )}
                      <input
                        name="video"
                        type="file"
                        ref={videoRef}
                        className="width={1010} height={200} bg-black controls={true}  muted={true} loop={true} autoPlay={true} "
                        
                        
                        onChange={(e) => {
                          setFieldValue("video", e.target.files[0]);
                        }}
                        style={{ display: "none" }}
                      />
                    </div>
                  </div>
             

                  <div className="text-left flex gap-5 my-8 ">
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
                      Post
                    </button>
                  </div>
                
              </div>
            </Form>
          );
      
        }}
      </Formik>
     
    </div>

  );
}

export default Syallabus;
        






             










