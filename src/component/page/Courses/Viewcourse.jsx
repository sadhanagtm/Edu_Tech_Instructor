import React, { Fragment, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {  MdModeEdit } from "react-icons/md";
import Table from "../../page component/Table";
import axiosinstance from "../../../Hoc/Axios";
import Replybox from "../Message/Replybox";
import { FaMessage } from "react-icons/fa6";
function Viewcourse() {
  const[show,setShow]=useState(false);
const params = useParams();

  const columns = [
   
      { 
        name: "Title", 
        sortable: true, 
        cell: (row) => {
          return (
            <div>
             
              {/* <Link to={`/course/${params.id}/syllabus/${params.syllabusId}/${row.id}/details/`}> */}
              <Link to={`/course/${params.id}/syllabus/${row.id}/details`}>
  {row.title}
</Link>

  {/* {row.title}
</Link> */}
            </div>
          );
        },
        selector: (row) => row.title 
      },
      
    
    

    { name: "Subtitle", sortable: true, selector: (row) => row.subtitle },
    { name: "Description", sortable: true, selector: (row) => row.description },

    {
      name: "Video",
      sortable: true,
      cell: (row) => {
        let video = `${import.meta.env.VITE_API_URL}/public/${row.video}`;
        return (
          <div className="h-8 w-8">
            <video controls src={video} />
          </div>
        );
      },

      selector: (row) => row.video,
    },
  ];

  const [App, setapp] = useState([]);
  const [filter, setFilter] = useState([]);
  const [query, setQuery] = useState("");

  const getdatas = (id) => {
    try {
      axiosinstance
        .get(`/syllabus/${id}`)
        .then((res) => {
          console.log(res);
          setapp([...res.data.result]);
          setFilter([...res.data.result]);
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
      getdatas(params.id);
    }
  }, [params]);

  const data = [];

  const handleEdit = () => {};
  
  console.log(App);

  const handlesearch = (event) => {
    const getSearch = event.target.value;
    setQuery(getSearch);
    if (getSearch.length > 0) {
      const searchdata = App.filter((item) =>
        item.name.toLowerCase().includes(getSearch)
      );
      setapp(searchdata);
    } else {
      setapp(filter);
    }

    setQuery(getSearch);
  };
  // **



  const [Open, setOpen] = useState("CourseInfo");
  const [course, setcourse] = useState([]);
  // const params = useParams();
  const getdata = (id) => {
    try {
      axiosinstance
        .get(`/course/${id}`)
        .then((res) => {
          console.log(res);
          setcourse([res.data.result]);
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
  getdatas(params.id)
  }
  }, [params]);

  return (
    <Fragment>
      {course ? (
        <div className="  h-full lg:ml-52  pb-10 lg:mt-16 mt-20 ">
          {/* {console.log(course)} */}
          <div className="grid grid-cols-2 text-center items-center h-9 bg-zinc-300 shadow-2xl  ">
            <div
              onClick={() => {
                setOpen("CourseInfo");
              }}
              className={` cursor-pointer  h-8 ${
                Open === "CourseInfo" ? "text-black shadow-2xl bg-zinc-100  rounded-r-3xl  " : ""
              } text-center prifont text-lg hover:text-blue-500`}
            >
              Course Information
            </div>

            <div
              onClick={() => {
                setOpen("Syllabus");
              }}
              className={` cursor-pointer  h-8 ${
                Open !== "CourseInfo"
                  ? "text-black shadow-2xl bg-zinc-100 rounded-l-3xl"
                  : ""
              } text-center  prifont text-lg hover:text-blue-500`}
            >
              Syllabus
            </div>
          </div>

          {Open === "CourseInfo" ? (
            <div className=" lg:grid lg:grid-cols-2 flex flex-col ">
              <div className="flex flex-col ">
                <div className="  lg:mx-4 my-2 shadow-2xl  ">
                  {course?.map((val, i) => {
                    console.log(val);
                    let image = `${import.meta.env.VITE_API_URL}/public/${
                      val.image
                    }`;
                    return (
                      <div className=" my-12 ml-8 flex flex-col  h-fit ">
                        <div className="   ">
                          <img
                            src={image}
                            alt="image"
                            className="h-48 w-48 border border-black "
                          />
                        </div> 

                       <div className="  ">
                        <div className=" grid grid-cols-2 gap-6 mt-16 ">
                           
                          <div className="   ">
                            <div className=" sefont text-purple-700 text-lg  font-semibold ">
                              Name
                            </div>
                            <div className="  capitalize ">{val.name}</div>
                          </div>

                          <div className=" ">
                            <div className=" sefont text-lg text-purple-700 font-semibold ">
                             
                              Duration
                            </div>
                            <div className="  uppercase"> {val.duration}</div>
                          </div>
                          

                         
                          <div className="">
                            <div className=" text-lg sefont font-semibold text-purple-700">
                              Price
                            </div>
                            <div className="capitalize"> {val.price}</div>
                          </div>

                          <div className=" ">
                            <div className=" sefont text-lg font-semibold text-purple-700">
                              Rating
                            </div>
                            <div className="  capitalize"> {val?.rating}</div>
                          </div>

                         
                         
                          <div className="">
                            <div className=" sefont text-lg font-semibold text-purple-700">
                              Discount
                            </div>
                            <div className="capitalize"> {val.discount}</div>
                          </div>

                          <div className="">
                            <div className=" sefont text-lg font-semibold text-purple-700">
                              Tags
                            </div>
                            <div className=" uppercase"> {val.tags}</div>
                          </div>

                          <div className="">
                            <div className=" sefont text-lg font-semibold text-purple-700">
                              Overview
                            </div>
                            <div className=" uppercase"> {val.overview}</div>
                          </div>
                         
                        </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="flex flex-col  ">
                <div className=" my-5 h-full ">
                  <div className="font-semibold text-center text-purple-700 text-xl pt-7 sefont capitalize  ">
                    About this field
                  </div>
                  {course?.map((val, i) => {
                    return (
                      <div className="text-justify my-3 mx-3">
                        {val.description ? (
                          <div
                            dangerouslySetInnerHTML={{
                              __html: val.description,
                            }}
                            className="line-clamp-5 text-base px-2 py-1 font-normal    "
                          />
                        ) : (
                          <div className="line-clamp-3 text-sm py-1  font-normal px-2">
                            is simply dummy text of the printing and typesetting
                            industry. Lorem Ipsum has been the industry's
                            standard dummy text ever since the 1500s, when an
                            unknown printer took a galley of type and scrambled
                            it to make a type specimen book. It has survived not
                            only five centuries, but also the leap into
                            electronic typesetting, remaining essentially
                            unchanged. It was popularised in the 1960s with the
                            release of Letraset sheets containing Lorem Ipsum
                            passages, and more recently with desktop publishing
                            software like Aldus PageMaker including versions of
                            Lorem Ipsum.
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          ) : (
            // sylabus table
            <div className="ml-5 mt-7">
              <div className=" ">
                <input
                  type="text"
                  name="name"
                  value={query}
                  className=" border-2 border-gray-700 h-8 lg:w-64  rounded-xl pl-3 outline-none"
                  onChange={(e) => handlesearch(e)}
                  placeholder="Search here"
                />
              </div>

              {App && <Table data={App} columns={columns} />}

              {/* <Link to={"/addsyallabus"}>
                <div className="  top-36 lg:right-16 right-4 absolute">
                  <button className=" lg:h-10 h-8 w-24 bg-red-700 text-white text-lg font-semibold  rounded-md ">
                    Add New
                  </button>
                </div>
              </Link> */}

             
            </div>
          )}
        </div>
      ) : (
        "LOADING"
      )}
    </Fragment>
  );
}

export default Viewcourse;
