

import { Field, Formik, Form, ErrorMessage } from "formik";
import React, { useRef, useState, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import { Navigation } from "@mui/icons-material";
import axios from "../../../Hoc/Axios";
import { IoChevronBack, IoCloudUploadSharp } from "react-icons/io5";
import * as Yup from "yup";
import { MdCategory } from "react-icons/md";
import { Link } from "react-router-dom";
import ClipLoader from "react-spinners/ClipLoader";

const schema = Yup.object().shape({
  name: Yup.string().required("This field is required"),
  image: Yup.string().required("This field is required"),
});

function Addcategory() {
  const [category, setCategory] = useState([]);
  const [loading, setLoading] = useState(false);
  const inputRef = useRef(null);
  const [image, setImage] = useState("");
  const [redirect, setRedirect] = useState(false);

  const handleImageClick = () => {
    inputRef.current.click();
  };

  useEffect(() => {
    let interval;
    if (redirect) {
      interval = setTimeout(() => {
        Navigation("/category");
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
          image: "",
        }}
        validationSchema={schema}
        onSubmit={(values, { resetForm }) => {
          setLoading(true); 
          const formData = new FormData();
          formData.append("name", values.name);
          formData.append("image", values.image);
          axios
            .post("/category/", formData)
            .then((res) => {
              console.log(res);
              toast.success("Post Successful");
              setRedirect(true);
              setCategory([...res.data.data]);
              resetForm();
              setLoading(false); 
            })
            .catch((error) => {
              console.log(error);
              toast.error(error.response.data.message);
              setLoading(false); 
            })
            .finally(() => {
              setLoading(false); 
            });
        }}
      >
        {({ handleSubmit, setFieldValue, values }) => (
          <Form onSubmit={handleSubmit} className="">
            <Toaster />
            {loading && (
                <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50">
                  <ClipLoader size={40} color={"#123abc"} loading={loading} />
                </div>
              )}
            <div className="lg:ml-64 mt-24 mx-6 lg:mx-12">
              <Link to={"/category"}>
                <div className="bg-zinc-300 h-8 w-8 py-1 px-1 text-center text-black rounded-full float-end hover:bg-zinc-400">
                  <IoChevronBack className="h-5 w-5" />
                </div>
              </Link>
              <div className="flex gap-2">
                <div className="flex items-center pt-1 text-purple-950">
                  <MdCategory className="h-6 w-6" />
                </div>
                <div className="font-bold text-2xl text-purple-800">
                  Category
                </div>
              </div>
              <div className="flex flex-col gap-5 mt-8">
                <div className="text-left">
                  <div className="text-lg font-medium text-purple-700 mb-2">
                    Name
                  </div>
                  <div>
                    <Field
                      name="name"
                      type="text"
                      autoComplete="off"
                      className="outline-none h-8 w-full outline-gray-200"
                      onChange={(e) => {
                        setFieldValue("name", e.target.value);
                      }}
                    />
                    <ErrorMessage
                      name="name"
                      component={"div"}
                      className="text-red-600"
                    />
                  </div>
                </div>

                <div className="text-left mt-5">
                  <div className="text-lg font-medium text-purple-700 py-2">
                    Upload Image
                  </div>
                  <div onClick={handleImageClick} className="sm:w-72 w-full">
                    {values.image ? (
                      <img
                        src={URL.createObjectURL(values.image)}
                        className="h-72 sm:w-72 w-full border object-contain cursor-pointer"
                        alt="image"
                        name="image"
                      />
                    ) : (
                      <div className="h-72 sm:w-72 w-full border border-black border-dashed flex text-xl flex-col justify-center text-center cursor-pointer items-center text-gray-400">
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
                      accept="image/*"
                      onChange={(e) => {
                        setFieldValue("image", e.target.files[0]);
                      }}
                      style={{ display: "none" }}
                    />
                    <ErrorMessage
                      name="image"
                      component={"div"}
                      className="text-red-600"
                    />
                  </div>
                </div>

                <div className="text-left flex gap-5">
                  <button
                    onClick={() => {
                      Navigation(-1);
                    }}
                    type="button"
                    className="bg-red-600 h-10 my-5 w-24 text-lg rounded-lg text-center text-white hover:bg-red-500"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="bg-indigo-600 h-10 my-5 w-24 text-lg rounded-lg text-center text-white hover:bg-indigo-500"
                  >
                    Post
                  </button>
                </div>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default Addcategory;
