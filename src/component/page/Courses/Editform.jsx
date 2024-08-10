
import React, { useRef, useState, useEffect } from "react";
import { Field, Formik, Form } from "formik";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import axios from "../../../Hoc/Axios";
import JoditEditor from "jodit-react";
import { RiVideoUploadLine } from "react-icons/ri";
import ClipLoader from "react-spinners/ClipLoader";

function Editform() {
  const [loading, setLoading] = useState(false);
  const [options, setOptions] = useState([]);
  const [image, setImage] = useState("");
  const [video, setVideo] = useState("");
  const [course, setCourse] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();
  const { id } = useParams();


//     try {
//       axios
//         .get(`course/user`)
//         .then((res) => {
//           setCourse([res.data.userData]);
//         })
//         .catch((error) => {
//           console.log(error);
//         });
//     } catch (error) {
//       console.log(error);
//     }
//   };

  // useEffect(() => {
  //   if (location.state && location.state.courseData) {
  //     setCourse(location.state.courseData);
  //     // getData(location.state.courseData);
  //   }
  // }, [location]);

  // useEffect(() => {
  //   axios.get("/category")
  //     .then((res) => {
  //       setOptions([...res.data.newArr]);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // }, []);


  useEffect(() => {
    if (location.state && location.state.courseData) {
      setCourse(location.state.courseData);
    } else {
     
      axios.get(`/course/${id}`)
        .then((res) => {
          setCourse(res.data.course);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [location, id]);

  useEffect(() => {
    axios.get("/category")
      .then((res) => {
        setOptions([...res.data.newArr]); 
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);


  
  const handleImageClick = () => {
    document.getElementById('imageInput').click();
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
  };

  const handleVideoClick = () => {
    document.getElementById('videoInput').click();
  };

  const handleVideoChange = (e) => {
    const file = e.target.files[0];
    setVideo(file);
  };

  return (
    <div className="mt-24">
      {course && (
        <Formik
          initialValues={{
            name: course.name || "",
            price: course.price || "",
            duration: course.duration || "",
            description: course.description || "",
            oldimage: course.image || "",
            image: "",
            oldoverview: course.overview || "",
            overview: "",
            rating: course.rating || "",
            tags: course.tags || "",
            discount: course.discount || "",
            category: course.categoryId || "",
          }}
          onSubmit={(values) => {
            const formData = new FormData();
            setLoading(true);

            formData.append("name", values.name);
            formData.append("price", values.price);
            formData.append("duration", values.duration);
            formData.append("description", values.description);
            formData.append("image", image || values.oldimage);
            formData.append("rating", values.rating);
            formData.append("tags", values.tags);
            formData.append("discount", values.discount);
            formData.append("overview", video || values.oldoverview);
            formData.append("categoryId", values.category);

            axios.patch(`/course/${id}/instructor`, formData)
              .then((res) => {
                
                toast.success("Save Successfully");
                setLoading(false);
                navigate(`/course/${id}/coursedetail`);
              })
              .catch((error) => {
                console.log(error);
                toast.error(error.response.data.message);
                setLoading(false);
              });
          }}
        >
          {({ handleSubmit, setFieldValue, values }) => (
            <Form onSubmit={handleSubmit}>
              <Toaster />
              {loading && (
                <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50">
                  <ClipLoader size={50} color={"#123abc"} loading={loading} />
                </div>
              )}
              <div className="lg:ml-64 mt-24 mx-6 lg:mx-12">
               
                <div className="lg:grid lg:grid-cols-3 gap-8 mt-8 sm:grid sm:grid-cols-2 flex flex-col">
                <div className="text-left">
                    <div className="text-lg font-medium text-purple-700 mb-2">
                      Name
                    </div>
                   <div>
                        <Field
                        name="name"
                        type="text"
                        className="outline-none h-8 w-full outline-gray-200"
                        onChange={(e) => setFieldValue("name", e.target.value)}
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
                        className="outline-none h-8 w-full outline-gray-200"
                        onChange={(e) => setFieldValue("price", e.target.value)}
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
                        className="outline-none h-8 w-full outline-gray-200"
                        onChange={(e) => setFieldValue("duration", e.target.value)}
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
                        className="outline-none h-8 w-full outline-gray-200"
                        onChange={(e) => setFieldValue("rating", e.target.value)}
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
                        type="text"
                        className="outline-none h-8 w-full outline-gray-200"
                        onChange={(e) => setFieldValue("discount", e.target.value)}
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
                        className="outline-none h-8 w-full outline-gray-200"
                        onChange={(e) => setFieldValue("tags", e.target.value)}
                      />
                    </div>
                  </div>
                </div>

                <div className="mt-10 w-full">
                  <div className="font-medium text-purple-700 mb-2">
                    Select a Category
                  </div>
                  <select
                    className="outline-none h-8 outline-gray-200 w-full"
                    value={values.category}
                    onChange={(e) => setFieldValue('category', e.target.value)}
                  >
                    <option value="">Select a category</option>
                    {options.map(option => (
                      <option key={option.id} value={option.id}>
                        {option.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className=" md:grid lg:grid-cols-3 sm:grid sm:grid-cols-2 gap-10  mt-10 flex flex-col">
               
                  <div className="text-left mt-0">
                    <div className="text-lg font-medium text-purple-700 mb-2">
                      Upload Image
                    </div>
                    <div onClick={handleImageClick} className="border sm:w-48 cursor-pointer">
                      {values.image ? (
                        <img
                          src={URL.createObjectURL(values.image)}
                          className="h-48 lg:w-48 sm:w-48 object-contain cursor-pointer"
                          alt=""
                        />
                      ) : (
                        <img
                          src={`http://192.168.1.106:8080/public/${values.oldimage}`}
                          className="h-48 lg:w-48 sm:w-48"
                          alt=""
                        />
                      )}
                      <input
                        id="imageInput"
                        name="image"
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        style={{ display: "none" }}
                      />
                    </div>
                  </div>
                 
                  <div className="w-full lg:col-span-2">
  <div className="font-semibold text-purple-700 mb-2">
    Upload Course Video
  </div>
  <div onClick={handleVideoClick} className="w-full">
    {video ? (
      
      <video controls
        src={URL.createObjectURL(video)}
        className="w-full h-48 bg-black"
      />
    ) : values.oldoverview ? (
      
      <video controls
        src={`http://192.168.1.106:8080/public/${values.oldoverview}`}
        className="w-full h-48 bg-black"
      />
    ) : (
     
      <div className="h-48 w-56 cursor-pointer border border-black border-dashed flex flex-col justify-center items-center text-gray-400">
        <div className="text-5xl">
          <RiVideoUploadLine />
        </div>
        <div>Click to upload</div>
      </div>
    )}
    <input
      id="videoInput"
      name="overview"
      type="file"
      accept="video/*"
      onChange={handleVideoChange}
      style={{ display: "none" }}
    />
  </div>
</div>

                  
                </div>
                
                <div className="text-left mt-10">
                  <div className="text-lg font-medium text-purple-700 mb-2">
                    Description
                  </div>
                  <JoditEditor
                    ref={useRef(null)}
                    value={values.description}
                    tabIndex={1}
                    onBlur={(newContent) => setFieldValue("description", newContent)}
                  />
                </div>
                <div className="text-left flex gap-5">
                  <button
                    onClick={() => navigate(-1)}
                    type="button"
                    className="bg-red-600 h-10 my-5 w-24 text-lg rounded-lg text-center text-white hover:bg-red-500"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="bg-green-600 h-10 my-5 w-24 text-lg rounded-lg text-center text-white hover:bg-green-500"
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

export default Editform;

