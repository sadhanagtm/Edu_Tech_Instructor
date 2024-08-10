
import { Field, Formik, Form, ErrorMessage } from "formik";
import React, { useRef, useState, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import axios from "../../../Hoc/Axios";
import JoditEditor from "jodit-react";
import { RiVideoUploadLine } from "react-icons/ri";

function Editsyllabus() {
  const params = useParams();
  const [value, setFieldValue] = useState("");
  const [syllabus, setSyllabus] = useState([]);
  const [redirect, setRedirect] = useState(false);
  const [placeholder, setPlaceholder] = useState("enter description...");
  const editor = useRef(null);
  const [content, setContent] = useState("");
  const videoRef = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();

  const handleVideoClick = () => {
    videoRef.current.click();
  };

  const handleVideoChange = (e) => {
    const file = e.target.files[0];
    console.log(file);
    setFieldValue("video", file);
  };

  const getData = (id) => {
    try {
      axios
        .get(`course/${id}/syllabus/${id}`)
        .then((res) => {
          setSyllabus([res.data.result]);
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (location && location.state && location.state.id) {
      getData(location.state.id);
    }
  }, [location]);

  useEffect(() => {
    if (redirect) {
      const interval = setTimeout(() => {
        console.log("Redirecting to homepage...");
        navigate("/");
      }, 2000);
      return () => clearTimeout(interval);
    }
  }, [redirect, navigate]);

  return (
    <div className="mt-20">
      {syllabus && syllabus.length > 0 && (
        <Formik
          initialValues={{
            title: syllabus[0].title || "",
            subtitle: syllabus[0].subtitle || "",
            description: syllabus[0].description || "",
            video: syllabus[0].video || "",
          }}
          onSubmit={(values, { resetForm }) => {
            try {
              const formData = new FormData();
              formData.append("title", values.title);
              formData.append("subtitle", values.subtitle);
              formData.append("description", values.description);
              formData.append("video", values.video);

              axios
                .patch(`/course/${location.state.id}/syllabus/${location.state.id}`, formData)
                .then((res) => {
                  toast.success("Save Successfully");
                  setRedirect(true);
                  setSyllabus([res.data.result]);
                })
                .catch((error) => {
                  toast.error(error.response.data.message);
                });
            } catch (error) {
              console.log(error);
            }

            resetForm();
          }}
        >
          {({ handleSubmit, setFieldValue, values }) => (
            <Form onSubmit={handleSubmit}>
              <Toaster />
              <div className="lg:ml-60 mt-24 mx-5 lg:mx-8">
                <div className="font-bold text-2xl text-purple-800 hover:text-purple-700 border-b-2 border-purple-800 w-fit cursor-pointer">
                  Syllabus
                </div>
                <div className="sm:grid sm:grid-cols-2 mt-8 gap-7 flex flex-col">
                  <div className="text-left">
                    <div className="text-lg font-medium text-purple-700 mb-2">
                      Title
                    </div>
                    <div>
                      <Field
                        name="title"
                        type="text"
                        autoComplete="off"
                        className="outline-none h-10 w-full outline-gray-200"
                        onChange={(e) => setFieldValue("title", e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="text-left">
                    <div className="text-lg font-medium text-purple-700 mb-2">
                      Subtitle
                    </div>
                    <div>
                      <Field
                        name="subtitle"
                        type="text"
                        autoComplete="off"
                        className="outline-none h-10 w-full outline-gray-200"
                        onChange={(e) => setFieldValue("subtitle", e.target.value)}
                      />
                    </div>
                  </div>
                </div>

                <div className="text-left mt-10 w-full">
                  <div className="text-lg font-medium text-purple-700 mb-2">
                    Description
                    <JoditEditor
                      ref={editor}
                      value={values.description}
                      className="text-black"
                      tabIndex={1}
                      onChange={(newContent) => {
                        setContent(newContent);
                        setFieldValue("description", newContent);
                      }}
                    />
                  </div>
                </div>

                {/* <div className="text-left mt-10 w-full">
                  <div className="text-lg font-medium text-purple-700 mb-2">
                    Video
                  </div>
                  <div>
                    <input
                      type="file"
                      name="video"
                      ref={videoRef}
                      accept="video/*"
                      onChange={handleVideoChange}
                      hidden
                    />
                    <div
                      className="h-40 w-full flex items-center justify-center border-2 border-dashed border-purple-500 rounded-lg cursor-pointer"
                      onClick={handleVideoClick}
                    >
                      <div className="text-center text-purple-500">
                        <RiVideoUploadLine size={50} />
                        <div className="mt-2">Upload Video</div>
                      </div>
                    </div>
                    {values.video && (
                      <video
                        src={`${import.meta.env.VITE_API_URL}/public/${values.video}`}
                        controls
                        className="mt-4 w-full"
                      />
                    )}
                  </div>
                </div>  */}
                <div className="w-full lg:col-span-2">
<div className="  font-semibold  text-purple-700 mb-2">
                      Upload Course Video
                    </div>
                  <div onClick={handleVideoClick} className="w-full"> 
                      {values.overview ? (
                        <video controls
                        src={`http://192.168.1.95:8080/public/${values.oldoverview}`}
                        alt=""
                        name="overview"
                        className="w-full h-48  bg-black controls={true} muted={true} loop={true} autoPlay={true}border border-black cursor-pointer"
                        />
                      ) : (
                        <div className=" h-48 w-56 cursor-pointer  border border-black border-dashed flex text-xl flex-col  justify-center text-center items-center text-gray-400 ">
                          <div className="text-5xl ">
                          <RiVideoUploadLine />
                          </div>
                          <div>Click to upload</div>
                        </div>
                      )}
                      <input
                        name="overview"
                        type="file"
                        ref={videoRef}
                        accept="video/*"
                        className="w-full h-48 bg-black controls={true}  muted={true} loop={true} autoPlay={true} "
                        
                        
                        onChange={(e) => {
                          setFieldValue("overview", e.target.files[0]);
                        }}
                        style={{ display: "none" }}
                      /> 
                       
                    </div>
                    </div>

                <div className="text-center lg:ml-40 lg:mr-40 mt-5">
                  <button
                    type="submit"
                    className="bg-purple-700 text-white w-44 h-12 font-bold text-lg rounded-xl hover:bg-purple-600"
                  >
                    Save 
                  </button>
                </div>
              </div>
            </Form>
          )}
        </Formik>
      )}
    </div>
  );
}

export default Editsyllabus;





