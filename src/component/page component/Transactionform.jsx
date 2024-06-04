
import {  Formik, Form } from "formik";
import React, {  useState, useEffect,} from "react";
import toast, { Toaster } from "react-hot-toast";
import { Description, Navigation } from "@mui/icons-material";
import axios from "../../Hoc/Axios";

function Transactionform() {
  
  const [value, setFieldValue] = useState("");
  
  const [redirect, setredirect] = useState(false);
  
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
            name:"",
            date:"",
            invoiceID:"",
            Amount:"", 
        }}
        onSubmit={(values, { resetForm }) => {
          try {
           

            axios
              .post("",values )
              .then((res) => {
                console.log(res);
                toast.success("Sending Successful");
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
               <div className="h-16 w-11/12  text-center ml-7 rounded-3xl py-4  mt-20 font-semibold  text-lg shadow-2xl bg-zinc-200 ">Transaction Process
               </div>

              

                  <div className=" mt-12 grid ml-20  w-11/12 grid-cols-2 gap-5">
                  <div className="text-left">
                     <div className="text-lg font-medium text-purple-700 mb-2">
                      Course Name
                    </div>
                     <div>
                      <input
                        name="name"        
                    type="text"
                        className="outline-none h-10 w-[380px] outline-gray-200"
                      onChange={(e) => {
                          setFieldValue("name", e.target.value);
                        }}
                    />
                 </div>
              </div> 

                    <div className="text-left">
                     <div className="text-lg font-medium text-purple-700 mb-2">
                       Date
                    </div>
                     <div>
                      <input
                        name="date"        
                    type="date"
                        className="outline-none h-10 w-[380px] outline-gray-200"
                      onChange={(e) => {
                          setFieldValue("date", e.target.value);
                        }}
                    />
                 </div>
              </div>  
              <div className="text-left my-2">
                     <div className="text-lg font-medium text-purple-700 mb-2">
                       Invoice Id
                    </div>
                     <div>
                      <input
                        name="invoiceID"        
                    type="text"
                        className="outline-none h-10 w-[380px] outline-gray-200"
                      onChange={(e) => {
                          setFieldValue("invoiceID", e.target.value);
                        }}
                    />
                 </div>
              </div> 

               <div className="text-left my-2">
                     <div className="text-lg font-medium text-purple-700 mb-2">
                       Amount
                    </div>
                     <div>
                      <input
                        name="amount"        
                    type="number"
                        className="outline-none h-10 w-[380px] outline-gray-200"
                      onChange={(e) => {
                          setFieldValue("amount", e.target.value);
                        }}
                    />
                 </div>
              </div>     

                    </div>

                    <div className="text-left flex justify-end mx-40 gap-7 my-9 ">
                    <button
                      onClick={() => {
                        Navigation(-1);
                      }}
                      type="button"
                      className="bg-red-600 h-11 my-5 w-28 shadow-2xl text-lg rounded-lg text-center text-white hover:bg-red-500"
                    >
                      Cancel
                    </button>

                    <button
                      type="submit"
                      className="bg-green-600 h-11 my-5 w-28 shadow-2xl text-lg rounded-lg text-center text-white hover:bg-green-500"
                    >
                      Send
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

export default Transactionform;
        






             










