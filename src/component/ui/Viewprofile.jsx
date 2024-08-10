
import { Field, Formik, Form } from "formik";
import React, { useRef, useState, useEffect, useMemo } from "react";
import toast, { Toaster } from "react-hot-toast";
import {  Navigation, Password } from "@mui/icons-material";



import { useLocation, useParams } from "react-router-dom"; 
import axiosinstance from "../../Hoc/Axios"
import { IoCloudUploadSharp } from "react-icons/io5";

function Viewprofile() {

  
  const [value, setFieldValue] = useState("");
  const [instructor, setInstructor] = useState([]);
 
  const location = useLocation();
  const inputRef = useRef(null);
  const cvRef = useRef(null);
  const [image, setImage] = useState("");
  const [cv, setCV] = useState("");
  const [redirect, setredirect] = useState(false);

  const handleImageClick = () => {
    inputRef.current.click();
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    console.log(file);
    setImage(e.target.files[0]);
  };

  const handleCVClick = () => {
    cvRef.current.click();
  };

  const handleCVChange = (e) => {
    const file = e.target.files[0];
    console.log(file);
    setCV(e.target.files[0]);
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


  
  const getdata = (id) => {
    try {
      axiosinstance
        .get('user/profile')
        .then((res) => {
          console.log(res);
          setInstructor([res.data.userData]);
          
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(()=>{
    getdata();
  },[]);

 

  return (
    <div className="mt-16">
      {
       console.log(instructor)
      }
      {instructor && instructor.length > 0 && (
        <Formik
        
          initialValues={{
            firstName:
              instructor && instructor.length > 0
                ? instructor[0].firstName
                : "saa",
            lastName:
              instructor && instructor.length > 0 ? instructor[0].lastName : "",
            middleName:
              instructor && instructor.length > 0
                ? instructor[0].middleName
                : "",
            password:
              instructor && instructor.length > 0 ? instructor[0].password : "",
            oldimage: instructor && instructor.length > 0 ? instructor[0].image : "",
            image:"",
            email:
              instructor && instructor.length > 0 ? instructor[0].email : "",
            phone:
              instructor && instructor.length > 0 ? instructor[0].phone : "",
            address:
            instructor && instructor.length > 0 ? instructor[0].address : "",
            cv:
            instructor && instructor.length > 0 ? instructor[0].cv : "",
            experience:
            instructor && instructor.length > 0 ? instructor[0].experience : "",
          }}
          onSubmit={(values, { resetForm }) => {
            try {
              const formData = new FormData();
              formData.append("firstName",values.firstName);
              formData.append("middleName", values.middleName);
              formData.append("lastName", values.lastName);
              formData.append("password", values.password);
              formData.append("email", values.email);
              formData.append("phone", values.phone);
              formData.append("image", values.image);
              formData.append("address", values.address);

                 
            axiosinstance
            .patch('user/profile',formData)
            .then((res)=>{
              console.log(res);
              toast.success("Save Successfully");
              setredirect((prev)=>!prev);
              setInstructor([...res.data.data]);
              
              resetForm()
            })
            .catch((error)=>{
              console.log(error);
              toast.error(error.response.data.message);
            });

            } catch (error) {
              console.log(error);
            }

            console.log(values);
           
          }} 
            

            
            
        >

          
          {({ handleSubmit, setFieldValue, values }) => {
            return (
              <div>
              <Form onSubmit={handleSubmit} className="flex flex-col lg:grid lg:grid-cols-2  sm:justify-center gap-8 sm:mt-16  mt-24 mx-2   lg:ml-56">
                <Toaster />
                {console.log(values, instructor)}

               

<div className=' gap-5 h-fit  my-2 sm:mt-10 bg-white shadow-2xl border border-blue-300 rounded-2xl'>

 
{instructor?.map((val, i) => {
                    console.log(val);
                    let image = `${import.meta.env.VITE_API_URL}/public/${val.image}`;

                    return (
                      <div className=" my-2   flex flex-col    ">
                      <div className=' w-28 h-8 bg-blue-600 text-white text-center rounded-2xl py-1  mx-4 my-2'> 
  Profile View
  </div>
 <div className=''>
   <img src={image}
   alt=""
className='w-28 h-28 object-cover rounded-full  border-blue-600 border-2  ml-6 my-3  cursor-pointer '
/>
</div>


                    
                    

        <div className=" grid grid-cols-2  gap-7 mx-1 ml-6 my-7  ">
        <div className="   ">
                            <div className="  text-purple-700 text-lg sefont font-semibold ">
                              First Name
                            </div>
                            <div className=" text-xs sm:text-base  trifont capitalize  ">{val.firstName}</div>
                          </div>

                          <div className=" ">
                            <div className=" text-lg text-purple-700 sefont font-semibold ">
                              Middle Name
                              
                            </div>
                            <div className=" text-xs  sm:text-base  capitalize"> {val.middleName}</div>
                          </div>
                          

                         
                          <div >
                            <div className=" text-lg font-semibold sefont text-purple-700">
                              Last Name
                            </div>
                            <div className=" text-xs sm:text-base capitalize"> {val.lastName}</div>
                          </div>


                          <div className=" ">
                            <div className=" text-lg font-semibold sefont text-purple-700">
                              Email
                            </div>
                            <div className=" text-xs sm:text-base lowercase"> {val.email}</div>
                          </div>
                         
                         

                          <div className="">
                            <div className=" text-lg font-semibold sefont text-purple-700">
                              Phone
                            </div>
                            <div className="text-xs  sm:text-base capitalize"> {val.phone}</div>
                          </div>
                          <div className="">
                          <div className=" text-lg font-semibold sefont text-purple-700">
                              Address
                            </div>
                            <div className=" text-xs  sm:text-base capitalize"> {val.address}</div>
                          </div>
                          
                          <div className="">
                          <div className=" text-lg font-semibold sefont text-purple-700">
                              Experience
                            </div>
                            <div className=" text-xs  sm:text-base capitalize"> {val.experience}</div>
                          </div>

                          <div className="">
                          <div className=" text-lg font-semibold sefont text-purple-700">
                              Skills
                            </div>
                            <div className=" text-xs  sm:text-base capitalize"> {val.skills}</div>
                          </div>
                   

                        </div>
                      </div>
                    );
                  })}

 


 
</div> 

 <div className=' sm:my-8  '>
<div className='sm:text-2xl  text-center text-xl pt-4 sm:pt-0 prifont  '>Update Profile
</div>


  
<div className=' gap-8  sm:grid sm:grid-cols-2 flex flex-col  mt-16 sm:my-11 '>
<div className=' flex flex-col  gap-4  sm:gap-6 lg:gap-4'>
<div className='h-36 w-full my-auto bg-white  border border-blue-300 rounded-2xl  '>

<div className='h-6 w-24 bg-blue-500 text-center font-semibold rounded-3xl relative bottom-2 mx-3 sm:mx-5 text-xs pt-1'>Your Profile</div>



{/* <div onClick={handleImageClick}>
                        {values.image ? (
                          <img
                            src={URL.createObjectURL(values.image)}
                          className='w-24 h-24 object-cover rounded-full  border-blue-600 border-2  mx-5  cursor-pointer '
                            alt=""
                            name="image"
                          />
                        ) : (

                            // <div className="w-24  h-24  object-cover rounded-full  border-blue-600 border-2  mx-5  cursor-pointer">
                            
                          // </div>
                            <div className="">
                       <img
                      //  src=""
                       src={`http://192.168.100.31.8080/public/${values.oldimage}`}
                       className='w-24 h-24 object-cover rounded-full  border-blue-600 border-2 mx-5  cursor-pointer '
                      
                       alt=""
                      name="image"
                      />
                      </div>
                        )}
                        <input
                          name="image"
                          type="file"
                          ref={inputRef}
                          onChange={(e) => {
                            setFieldValue("image", e.target.files[0]);
                          }}
                          style={{display:"none" }}
                        />
                      </div> */}

<div
                        onClick={handleImageClick}
                       
                      >
                        {values.image ? (
                          <img
                            src={URL.createObjectURL(values.image)}
                            className='w-24 h-24 object-cover rounded-full  border-blue-600 border-2 mx-5  cursor-pointer'
                            alt=""
                            name="image"
                          />
                        ) : (
                          <img
                            src={`http://192.168.1.106:8080/public/${values.oldimage}`}
                           className='w-24 h-24 object-cover rounded-full  border-blue-600 border-2 mx-5  cursor-pointer'
                            alt=""
                            
                            name="image"
                          />
                        )}
                        <input
                          name="image"
                          type="file"
                          ref={inputRef}
                          accept="image/*"
                          className='w-24 h-24 object-cover rounded-full  border-blue-600 border-2 mx-5  cursor-pointer'
                          onChange={(e) => {
                            setFieldValue("image", e.target.files[0]);
                          }}
                          style={{ display: "none" }}
                        />
                      </div>
 <button onClick={handleImageClick}
  className='h-8 w-28 text-center  bg-blue-500  border-2 border-blue-300 shadow-xl rounded-3xl flex items-center ml-28 relative bottom-5 text-sm justify-center'>Change image</button>
 
</div>

<div className=' flex flex-col  '>
  <label  className='w-28 font-semibold h-4 text-xs bg-blue-300 text-center rounded-full mx-3 relative top-2'   htmlFor="name" >First Name</label>
   <Field
    type="text"
    placeholder=''
    name="firstName"
   //  value=
    className='h-11 w-full px-3 border border-blue-300 rounded-3xl text-black placeholder:text-gray-700 outline-none '
  
    />
</div>

<div className=' flex flex-col  '>
  <label  className='w-28 font-semibold h-4 text-xs bg-blue-300 text-center rounded-full mx-3 relative top-2'   htmlFor="name" >Middle Name</label>
   <Field
    type="text"
    placeholder=''
    name="middleName"
   //  value=
    className='h-11 w-full px-3 border border-blue-300 rounded-3xl text-black placeholder:text-gray-700 outline-none '

    />
</div>
<div className=' flex flex-col  '>
  <label  className='w-28 font-semibold h-4 text-xs bg-blue-300 text-center rounded-full mx-3 relative top-2'   htmlFor="name" >Last Name</label>
   <Field
    type="text"
    placeholder=''
    name="lastName"
   //  value=
    className='h-11 w-full px-3 border border-blue-300 rounded-3xl text-black placeholder:text-gray-700 outline-none '
    
    />
</div>







</div>



<div className=' flex flex-col  gap-4   sm:gap-6 lg:gap-4  relative  bottom-5 sm:bottom-0 sm:top-2 '>


                      <div className=' flex flex-col  '>
                      
                        <label  className=' w-20 text-xs font-semibold  h-4 bg-blue-300 text-center rounded-full mx-3 relative top-2 '   htmlFor="email" >Email</label>
                         <Field
                          type="email"
                          placeholder=''
                          name="email"
                         //  value=
                          className='h-11 w-full px-3 border border-blue-300 rounded-3xl text-black placeholder:text-gray-700 outline-none '
                         
                          />
                       
                      </div>


<div className=' flex flex-col '>

  <label  className='w-28 relative top-2 font-semibold h-4 text-xs bg-blue-300 text-center rounded-full mx-3'   htmlFor="phone" >Phone Number</label>
   <Field
    type="number"
    placeholder=''
    name="phone"
   //  value=
     className='h-11 w-full px-3 border border-blue-300 rounded-3xl text-black placeholder:text-gray-700 outline-none '
     
    />
  
</div>
<div className=' flex flex-col '>

  <label  className=' relative top-2 w-24 h-4 text-xs font-semibold bg-blue-300 text-center rounded-full mx-3'   htmlFor="address" >Adrress</label>
   <Field
    type="text"
    placeholder=''
    name="address"
   //  value=
    className='h-11 w-full px-3 border border-blue-300 rounded-3xl text-black placeholder:text-gray-700 outline-none '
    
   
    />
  
</div>

<div className=' flex flex-col '>

  <label  className=' relative top-2 w-24 h-4 text-xs font-semibold bg-blue-300 text-center rounded-full mx-3'   htmlFor="experience" >Experience</label>
   <Field
    type="text"
    placeholder=''
    name="experience"
   //  value=
    className='h-11 w-full px-3 border border-blue-300 rounded-3xl text-black placeholder:text-gray-700 outline-none '
   
    />
  
</div>

<div className=' flex flex-col '>

<label  className=' relative top-2 w-24 h-4 text-xs font-semibold bg-blue-300 text-center rounded-full mx-3'   htmlFor="skills" >Skills</label>
 <Field
  type="text"
  placeholder=''
  name="skills"
 //  value=
  className='h-11 w-full px-3 border border-blue-300 rounded-3xl text-black placeholder:text-gray-700 outline-none '
 
  />

</div>



</div>

 </div>

 <div className="text-left  w-full relative lg:bottom-6  ">
                    <div className=" font-medium text-blue-800 mb-2">
                      Upload your CV
                    </div>
                    <div onClick={handleCVClick} className="w-full border ">
                      {values.cv ? (
                        <img
                        src={URL.createObjectURL(values.cv)}
                        className="h-48 object-contain w-full cursor-pointer"
                        alt="cv"
                        name="cv"
                        />
                      ) : (
                        <div className="h-48 w-full  cursor-pointer border border-black border-dashed flex text-xl flex-col  justify-center text-center items-center text-gray-400 ">
                          <div className="text-5xl">
                            <IoCloudUploadSharp />
                          </div>
                          <div>Click to upload</div>
                        </div>
                      )}
                      <input
                        name="cv"
                        type="file"
                        ref={cvRef}
                        accept="image/*"
                        // onChange={(e) => {
                        //   setFieldValue("cv", e.target.files[0]);
                        // }}
                        style={{ display: "none" }}
                      />
                     
                    </div>
                      <button className='h-11 w-full sm:w-48  bg-green-600 font-semibold shadow-2xl text-center rounded-3xl my-6 '>Update Profile</button>
                  </div>
 
</div>


              </Form>
              </div>
            );
          }}
        </Formik>
       )} 
    </div>
  );
}

export default Viewprofile;
