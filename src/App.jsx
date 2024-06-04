import React from "react";
import "./App.css";
import Logins from "./component/page/Logins";

import { Route, Routes, BrowserRouter as Router } from "react-router-dom";
import Registration from "./component/page/Registration";
import Layout from "./Hoc/Layout";
import DashBaord from "./component/page/DashBaord";
import Edit from "./component/page component/Edit";
import Sure from "./component/page/Sure";


import Instructor from "./component/page/Instructor/Instructor";
import Addinstructor from "./component/page/Instructor/Addinstructor";
import Category from "./component/page/Category/Category";
// import KYCform from "./component/page/KYCverification/KYCform";

import Transaction from "./component/page/Transaction";
import Addsyallabus from "./component/page/Courses/Addsyallabus";
import Transactionform from "./component/page component/Transactionform";
import Testimonials from "./component/page/Testimonial/Testimonials";
import Editform from "./component/page/Courses/Editform";
import Addcourse from "./component/page/Courses/Addcourse";
import Coursetable from "./component/page/Courses/Coursetable";
import Addcategory from "./component/page/Category/Addcategory";
import Viewcourse from "./component/page/Courses/Viewcourse";
import KYCform from "./component/page/KYCverification/KYCform";
import Editinstructor from "./component/page/Instructor/Editinstructor";
import Editcategory from "./component/page/Category/Editcategory";
import Viewtestimonial from "./component/page/Testimonial/Viewtestimonial";
import Addtestimonial from "./component/page/Testimonial/Addtestimonial";
import Readmsg from "./component/page/Message/Readmsg";
// import Replybox from "./component/page/Message/Replybox";



function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<DashBaord />} />
            <Route path="edit" element={<Edit />} />
            <Route path="kycform" element={<KYCform/>}/>
            <Route path="coursetable" element={<Coursetable />} />
            <Route path="instructor" element={<Instructor />} />
            <Route path="addinstructor" element={<Addinstructor />} />
            <Route path="category" element={<Category/>} />
            <Route path="addcategory" element={<Addcategory />} />
            <Route path="transaction" element={<Transaction />} />
            <Route path="transactionform" element={<Transactionform />} />
            <Route path="addsyallabus" element={<Addsyallabus />} />
            <Route path="addcourse" element={<Addcourse />} />
            <Route path="Courses/:id" element={<Viewcourse/>} />
            <Route path="editform" element={<Editform/>} />
            <Route path="editinstructor" element={<Editinstructor/>} />
            <Route path="editinstructor" element={<Editinstructor/>} />
            <Route path="editcategory" element={<Editcategory/>} />
            <Route path="testimonials" element={<Testimonials/>} />
            <Route path="viewtestimonial" element={< Viewtestimonial/>} />
            <Route path="addtestimonial" element={< Addtestimonial/>} />
            <Route path="readmsg" element={< Readmsg/>} />
            {/* <Route path="reply" element={< Replybox/>} /> */}
          </Route>
          <Route path="/login" element={<Logins />} />
          <Route path="/registration" element={<Registration />} />
          <Route path="/sure" element={<Sure />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
