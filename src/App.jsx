import React, { Suspense, useEffect, useState } from "react";
import "./App.css";
import Logins from "./component/page/Logins";

import { Route, Routes, BrowserRouter as Router } from "react-router-dom";
import Registration from "./component/page/Registration";
import Layout from "./Hoc/Layout";
import DashBaord from "./component/page/DashBaord";
import Edit from "./component/page component/Edit";
import Sure from "./component/page/Sure";

import Addinstructor from "./component/page/Instructor/Addinstructor";
import Category from "./component/page/Category/Category";
import KYCform from "./component/page/KYCverification/KYCform";

import Transaction from "./component/page/Transaction";
import Addsyallabus from "./component/page/Courses/Addsyallabus";
import Transactionform from "./component/page component/Transactionform";
import Testimonials from "./component/page/Testimonial/Testimonials";
import Editform from "./component/page/Courses/Editform";
import Addcourse from "./component/page/Courses/Addcourse";
import Coursetable from "./component/page/Courses/Coursetable";
import Addcategory from "./component/page/Category/Addcategory";
import Viewcourse from "./component/page/Courses/Viewcourse";
// import KYCform from "./component/page/KYCverification/KYCform";

import Editcategory from "./component/page/Category/Editcategory";
import Viewtestimonial from "./component/page/Testimonial/Viewtestimonial";
import Viewcategory from "./component/page/Category/Viewcategory";

import Readmsg from "./component/page/Message/Readmsg";

import  Save  from "./component/page component/Save";
import  Post from "./component/page component/Post";
import Showprofile from "./component/Toolbar/Showprofile";
import Editsyllabus from "./component/page/Courses/Editsyllabus";
import Viewsyllabus from "./component/page/Courses/Viewsyllabus";
import Testimonialdetail from "./component/page/Testimonial/Testimonialdetail";
import Edittestimonial from "./component/page/Testimonial/Edittestimonial";
import Viewprofile from "./component/ui/Viewprofile";
import Forgot from "./component/page/Forgot";
import Hello from "./component/page/Hello";
import Password from"./component/page/Password";
import Mycoursetable from "./component/page/Courses/Mycoursetable";
import Mycourse from "./component/page/Courses/Mycourse";
import Loading from "./component/Loading";

import Replybox from "./component/page/Message/Replybox";           
import Viewmysyllabus from "./component/page/Courses/Viewmysyllabus";



function App() {

//   const[loading,setLoading]=useState(false)

//  useEffect(()=>{
//   privateAxios.interceptors.request.use(
//     (config)=>{
//     setLoading(true);
//     return config;
//   },
//  (error)=>{
//   return Promise.reject(error);
//  });


 
//   privateAxios.interceptors.response.use(
//     (config)=>{
//     setLoading(false);
//     return config;
//   },
//  (error)=>{
//   return Promise.reject(error);
//  });
 

// },[])

  

  return (
    <>
       {/* <Suspense fallback='loading...'> 
        <Loading show={loading}/> */}
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<DashBaord />} />
            <Route path="edit" element={<Edit />} />
            <Route path="showprofile" element={<Showprofile />} />
            <Route path="hello" element={<Hello/>}/>
                     

            <Route path="kycform" element={<KYCform/>}/>
            <Route path="courses" element={<Coursetable/>}/>
            <Route path="addcourse" element={<Addcourse />}/>
            <Route path="courses/:id" element={<Viewcourse/>}/>
            <Route path="course/:id/coursedetail" element={<Mycourse/>}/>
            {/* <Route path="course/:id" element={<Mycourse/>}/> */}
            <Route path="course" element={<Mycoursetable/>}/>
            <Route path="editform/:id" element={<Editform/>}/>
            <Route path="course/:id/coursedetail/add/syllabus" element={<Addsyallabus />}/>
            {/* <Route path="course/:id/syllabus/:syllabusId" element={<Editsyllabus />}/> */}
                      <Route path="course/:id/syllabus/:id/edit" element={<Editsyllabus />}/> 

            {/* <Route path="syllabus/:id/details" element={<Viewsyllabus />}/> */}
            <Route path="course/:id/syllabus/:syllabusId/details" element={<Viewsyllabus />}/>
            


           
            <Route path="course/:id/syllabus/:syllabusId/" element={<Viewmysyllabus />}/>
           
            
            <Route path="addinstructor" element={<Addinstructor />}/>
            <Route path="viewprofile" element={<Viewprofile />}/>
           
            <Route path="category" element={<Category/>} />
            <Route path="addcategory" element={<Addcategory />} />
            <Route path="editcategory" element={<Editcategory/>} />
            <Route path="Category/:id" element={<Viewcategory />} />
           
            <Route path="testimonials" element={<Testimonials/>} />
            <Route path="viewtestimonial" element={<Viewtestimonial/>} />
            <Route path="Testimonial/:id" element={<Testimonialdetail/>}/>
            <Route path="edittestimonial" element={<Edittestimonial/>}/>
           
            <Route path="transaction" element={<Transaction />} />
            <Route path="transactionform" element={<Transactionform />} />
.
            <Route path="post" element={<Post />} />
            <Route path="save" element={< Save/>} />
            <Route path="readmsg" element={< Readmsg/>} />

           
//             {/* <Route path="reply" element={< Replybox/>} /> */}
           </Route>
          <Route path="/login" element={<Logins />} />
          <Route path="/forgot" element={<Forgot />} />
          <Route path="/password" element={<Password />} />
          <Route path="/registration" element={<Registration />} />
        <Route path="/sure" element={<Sure />} />
        </Routes>
      </Router>
{/* //        </Suspense> */}
     </>
  ); }
 export default App;





