
import { Field, Formik, Form } from "formik";
import React, { useRef, useState, useEffect, useMemo } from "react";
import toast, { Toaster } from "react-hot-toast";
import { Description, Navigation } from "@mui/icons-material";
import axios from "../../Hoc/Axios";
import { IoCloudUploadSharp } from "react-icons/io5";
import JoditEditor from "jodit-react";
import { RiVideoUploadLine } from "react-icons/ri";
import { useParams } from "react-router";


function Editform() {
  
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

  return (
    <div className="mt-20">
      <Formik
        initialValues={{
          name: "",
          price: "",
          duration: "",
          description: "",
          image: "",
          rating: "",
          tags: "",
          discount: "",
        }}
        onSubmit={(values, { resetForm }) => {
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
  .post("/course/:id", formData)
  .then((res) => {
    console.log(res);
    toast.success("Update Successful");
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
                <div className="grid grid-cols-3 gap-8  ">
                  <div className="text-left">
                    <div className="text-lg font-medium text-purple-700 mb-2">
                      Name
                    </div>
                    <div>
                      <Field
                        name="name"
                        type="text"
                        className="outline-none h-10 w-[280px] outline-gray-200"
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
                        className="outline-none h-10 w-[280px] outline-gray-200"
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
                        className="outline-none h-10 w-[280px] outline-gray-200"
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
                  
                        className="outline-none h-10 w-[280px] outline-gray-200"
                        onChange={(e) => {
                          setFieldValue("rating",e.target.value);
                        }}
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
                        className="outline-none h-10 w-[280px] outline-gray-200"
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
                        className="outline-none h-10 w-[280px] outline-gray-200"
                        onChange={(e) => {
                          setFieldValue("tags", e.target.value);
                        }}
                      />
                    </div>
                  </div>
                </div>

                <div className=" col-span-2 mt-10 grid grid-cols-1 justify-between">
                  <div className="text-left mt-0">
                    <div className="text-lg font-medium text-purple-700 mb-2">
                      Upload Image
                    </div>
                    <div onClick={handleImageClick}>
                      {values.image ? (
                        <img
                          src={URL.createObjectURL(values.image)}
                          className="h-56  w-56 cursor-pointer"
                          alt=""
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
                      <input
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

                  <div className=" mt-10 w-11/12">
              <div className="">
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
                {/* <video src="/Videos/video.mp4"  width={1090} height={200}  controls={true}  muted={true} loop={true} autoPlay={true} className=" bg-black"/> */}
              </div>


                  <div className="text-left flex gap-5 my-5 ">
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
              </div>
            </Form>
          );
      
        }}
      </Formik>
      
    </div>

  );
}

export default Editform;
        






             










