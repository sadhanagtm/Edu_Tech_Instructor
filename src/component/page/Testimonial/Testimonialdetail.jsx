import React, { Fragment, useEffect, useState } from "react";
import axios from "../../../Hoc/Axios";

import {  useParams } from "react-router-dom";


function Testimonialdetail() {
 


  const [Show, setShow] = useState("TestimonialInfo");
  const [testimonial, setTestimonial] = useState([]);
  const params = useParams();
  const getdata = (id) => {
    try {
      axios
        .get(`/testomonial/${id}`)
        .then((res) => {
          console.log(res);
          setTestimonial([...res.data.result]);
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (params && params.id) {
      getdata(params.id);
    }
  }, [params]);

  

  return (
    
     
        <div className="  h-full lg:ml-52  pb-10 mt-20  flex flex-col ">
         
           
          
          <div className="  bg-white shadow-2xl border border-red-100 mt-1  prifont font-semibold  lg:mx-4  py-2 hover:bg-zinc-50 item-center  h-10 rounded-xl text-center "> Testimonial Information</div> 
            
         
            <div className=" ">
              <div className="flex flex-col ">
                <div className="lg:mx-4 mt-3 lg:shadow-2xl shadow-lg  border border-red-100   ">
                  {testimonial?.map((val, i) => {
                    console.log(val);
                    let image = `${import.meta.env.VITE_API_URL}/public/${val.image}`;

                    return (
                      <div className=" my-12  flex flex-col    ">
                        <div className=" ml-8 ">
                          <img
                            src={image}
                            alt="/"
                            className="h-48  w-48 border border-black"
                             />
                        </div>   

                        <div className="mx-1 ml-7 gap-5 grid grid-cols-2 mt-16  ">
                           
                        <div className=" ">
                            <div className=" text-lg text-purple-700 sefont font-semibold ">
                              Name
                              
                            </div>
                            <div className=" text-xs  sm:text-base  capitalize"> {val.name}</div>
                          </div>
                          
                           
                        <div className=" ">
                            <div className=" text-lg text-purple-700 sefont font-semibold ">
                              Facebook
                              
                            </div>
                            <div className=" text-xs  sm:text-base  capitalize"> {val.facebook}</div>
                          </div>
                          
                           
                        <div className=" ">
                            <div className=" text-lg text-purple-700 sefont font-semibold ">
                              Instagram
                              
                            </div>
                            <div className=" text-xs  sm:text-base  capitalize"> {val.instagram}</div>
                          </div>
                          
                           
                        <div className=" ">
                            <div className=" text-lg text-purple-700 sefont font-semibold ">
                              Linkedin
                              
                            </div>
                            <div className=" text-xs  sm:text-base  capitalize"> {val.linkedin}</div>
                          </div>
                          
                          

                          <div className=" ">
                            <div className=" text-lg text-purple-700 sefont font-semibold ">
                              Description
                              
                            </div>
                            <div className=" text-xs  sm:text-base  capitalize"> {val.desc}</div>
                          </div>
                          
                          <div >
                            <div className=" text-lg font-semibold sefont text-purple-700">
                              Video
                            </div>
                            {/* <div className=" text-xs sm:text-base capitalize"> {val.video}</div> */}
                            <div className="text-xs sm:text-base capitalize">
                        <a href={val.video} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">
                          {val.video}
                        </a>
                      </div>
                          </div>

                          </div>
                      </div>
                    );
                  })}
                </div>
              </div>

            
           </div>
          
      </div>
      

  );
}

export default Testimonialdetail;
