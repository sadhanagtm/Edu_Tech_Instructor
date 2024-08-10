



import { Formik, Form, ErrorMessage } from "formik";
import React, { useRef, useState, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import axios from "../../../Hoc/Axios";
import JoditEditor from "jodit-react";
import { RiVideoUploadLine } from "react-icons/ri";
import * as Yup from "yup";
import { ClipLoader } from "react-spinners";

const schema = Yup.object().shape({
  title: Yup.string().required("This field is required"),
  subtitle: Yup.string().required("This field is required"),
  description: Yup.string().required("This field is required"),
  video: Yup.mixed().required("This field is required"),
});

function Addsyallabus() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();
  const [content, setContent] = useState("");
  const videoRef = useRef(null);

  const handleVideoClick = () => {
    videoRef.current.click();
  };

  const handleVideoChange = (e) => {
    const file = e.target.files[0];
    console.log(file);
    setFieldValue("video", file);
  };

  const handleSubmit = (values, { resetForm }) => {
    setLoading(true); 
    const formData = new FormData();
    formData.append("title", values.title);
    formData.append("subtitle", values.subtitle);
    formData.append("description", values.description);
    formData.append("video", values.video);

    axios
      .post(`/course/${id}/coursedetail/add/syllabus`, formData)
      .then((res) => {
        console.log(res);
        toast.success("Post Successful");
        navigate("/course");
        setLoading(false)
        
    resetForm();
    setLoading(false); 
      })
      .catch((error) => {
        console.log(error);
        toast.error(error.response?.data?.message || "An error occurred");
        setLoading(false); 
      });
      
    
  };

  return (
    <div className="mt-24">
      <Formik
        initialValues={{
          title: "",
          subtitle: "",
          description: "",
          video: null,
        }}
        validationSchema={schema}
        onSubmit={handleSubmit}
       
      >
        {({ handleSubmit, setFieldValue, values }) => (
          <Form onSubmit={handleSubmit}>
            <Toaster />
            {loading && (
                <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50">
                  <ClipLoader size={50} color={"#123abc"} loading={loading} />
                </div>
              )}
            <div className="lg:ml-60 mt-24 mx-5 lg:mx-8">
              <div className="font-bold text-2xl text-purple-800 hover:text-purple-700 hover:border-b-0 border-b-2 border-purple-800 w-fit cursor-pointer">
                Syllabus
              </div>
              <div className="sm:grid sm:grid-cols-2 mt-8 gap-7 flex flex-col">
                <div className="text-left">
                  <div className="text-lg font-medium text-purple-700 mb-2">Title</div>
                  <input
                    name="title"
                    type="text"
                    autoComplete="off"
                    className="outline-none h-10 w-full outline-gray-200"
                    onChange={(e) => setFieldValue("title", e.target.value)}
                  />
                  <ErrorMessage name="title" component="div" className="text-red-600" />
                </div>

                <div className="text-left">
                  <div className="text-lg font-medium text-purple-700 mb-2">Subtitle</div>
                  <input
                    name="subtitle"
                    type="text"
                    autoComplete="off"
                    className="outline-none h-10 w-full outline-gray-200"
                    onChange={(e) => setFieldValue("subtitle", e.target.value)}
                  />
                  <ErrorMessage name="subtitle" component="div" className="text-red-600" />
                </div>
              </div>

              <div className="text-left mt-10 w-full">
                <div className="text-lg font-medium text-purple-700 mb-2">
                  Description
                </div>
                <JoditEditor
                  value={content}
                  tabIndex={1}
                  onBlur={(newContent) => {
                    setContent(newContent);
                    setFieldValue("description", newContent);
                  }}
                  onChange={(newContent) => setContent(newContent)}
                />
                <ErrorMessage name="description" component="div" className="text-red-600" />
              </div>

              {/* <div className="mt-10 w-full">
                <div className="text-lg font-semibold text-purple-700 mb-2">
                  Upload Course Video
                </div>
                <div onClick={handleVideoClick}>
                  {values.video ? (
                    <video
                      controls
                      src={URL.createObjectURL(values.video)}
                      className="w-full h-56 bg-black cursor-pointer"
                    />
                  ) : (
                    <div className="h-56 w-56 cursor-pointer border border-black border-dashed flex text-xl flex-col justify-center text-center items-center text-gray-400">
                      <RiVideoUploadLine className="text-5xl" />
                      <div>Click to upload</div>
                    </div>
                  )}
                  <input
                    name="video"
                    type="file"
                    ref={videoRef}
                    onChange={handleVideoChange}
                    style={{ display: "none" }}
                  />
                  <ErrorMessage name="video" component="div" className="text-red-600" />
                </div>
              </div> */}
              {/* <div className=" mt-10 w-full"> */}
              <div className=" mt-10 w-full">
                    <div className="text-lg  font-semibold  text-purple-700 mb-2">
                       Upload Course Video
                    </div>
                   <div onClick={handleVideoClick}>
                     {values.video ? (
                        <video controls
                        src={URL.createObjectURL(values.video)}
                        alt=""
                        name="video"
                        
                        className="w-full height={200}  bg-black controls={true} muted={true} loop={true} autoPlay={true}border border-black cursor-pointer"
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
                        accept="video/*"
                        ref={videoRef}
                        className="w-full height={200} bg-black controls={true}  muted={true} loop={true} autoPlay={true} "
                        
                        
                        onChange={(e) => {
                          setFieldValue("video", e.target.files[0]);
                        }}
                        style={{ display: "none" }}
                      />
                       <ErrorMessage
                        name="video"
                     component={"div"}
                    className="text-red-600"
                         />
                    </div>
                  </div>

              <div className="text-left flex gap-6 my-5">
                <button
                  type="button"
                  onClick={() => navigate(-1)}
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
        )}
      </Formik>
    </div>
  );
}

export default Addsyallabus;

