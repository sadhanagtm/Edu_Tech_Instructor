import React from "react";
import "./App.css";
import Logins from "./component/page/Logins";

import { Route, Routes, BrowserRouter as Router } from "react-router-dom";
import Registration from "./component/page/Registration";
import Layout from "./Hoc/Layout";
import DashBaord from "./component/page/DashBaord";
import Edit from "./component/page component/Edit";
import Sure from "./component/page/Sure";
import KYCverification from "./component/page/KYCverification";
import Courses from "./component/page component/Courses";
import Syallabus from "./component/page component/Syallabus";
import Instructor from "./component/page/Instructor";
import Addinstructor from "./Add/Addinstructor";

import Addcategory from "./Add/Addcategory";
import Category from "./component/page/Category";
import Asd from "./component/page/Asd";
import Addcourse from "./Add/Addcourse";
import Editform from "./component/page component/Editform";
function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<DashBaord />} />
            <Route path="edit" element={<Edit />} />
            <Route path="kycverification" element={<KYCverification />} />
            <Route path="courses" element={<Courses />} />
            <Route path="syallabus" element={<Syallabus />} />
            <Route path="instructor" element={<Instructor />} />
            <Route path="addinstructor" element={<Addinstructor />} />
            <Route path="category" element={<Category />} />
            <Route path="addcategory" element={<Addcategory />} />
            <Route path="addcourse" element={<Addcourse />} />
            <Route path="Courses/:id" element={<Asd/>} />
            <Route path="editform" element={<Editform/>} />
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
