
import React, { Fragment, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { MdModeEdit } from "react-icons/md";
import Table from "../../page component/Table";
import axiosinstance from "../../../Hoc/Axios";
import Replybox from "../Message/Replybox";
import { FaMessage } from "react-icons/fa6";
import axios from "../../../Hoc/Axios"; 

function Mycourse() {
  const [show, setShow] = useState(false);
  const [enrollmentCount, setEnrollmentCount] = useState(null);

  const params = useParams();

  const columns = [
    {
      name: "Title",
      sortable: true,
      cell: (row) => (
        <div>
           {/* <Link to={`/Syllabus/${row.id}`}>{row.title}</Link> */}
            <Link to={`/course/${params.id}/syllabus/${row.id}`}  state={{ id: row.id }}> {row.title}</Link>
        </div>
      ),
      selector: (row) => row.title,
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
    {
      name: "Action",
      cell: (row) => (
        <div className="gap-4 flex items-center justify-center text-xl">
          <Link to={`/course/${params.id}/syllabus/${row.id}/edit`} state={{ id: row.id }}>
        
            <button className="" id={row.ID}>
              <MdModeEdit />
            </button>
          </Link>
          <button onClick={() => setShow(true)} className="" id={row.id}>
            <FaMessage className="h-4 w-4" />
          </button>
          {show && <Replybox onClose={() => setShow(false)} />}
        </div>
      ),
      selector: (row) => row.action,
    },
  ];

  const [app, setApp] = useState([]);
  const [filter, setFilter] = useState([]);
  const [query, setQuery] = useState("");

  const getDatas = (id) => {
    try {
      axios
        .get(`/course/${id}/syllabus`)
        .then((res) => {
          setApp([...res.data.result]);
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
      getDatas(params.id);
    }
  }, [params]);

  const handleSearch = (event) => {
    const getSearch = event.target.value;
    setQuery(getSearch);
    if (getSearch.length > 0) {
      const searchData = app.filter((item) =>
        item.name.toLowerCase().includes(getSearch)
      );
      setApp(searchData);
    } else {
      setApp(filter);
    }
  };

  const [Open, setOpen] = useState("CourseInfo");
  const [course, setCourse] = useState([]);
  const getData = (id) => {
    try {
      axiosinstance
        .get(`/course/${id}`)
        .then((res) => {
          console.log(res);
          setCourse([res.data.result]);
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
      getData(params.id);
    }
  }, [params]);
  const getEnrollmentCount = (id) => {
    try {
      axios
        .get(`/course/${id}/enrollments/count`)
        .then((res) => {
          setEnrollmentCount(res.data.enrollmentCount);
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
      getData(params.id);
      getEnrollmentCount(params.id);
    }
  }, [params]);
  

  return (
    <Fragment>
      {course ? (
        <div className="h-full lg:ml-52 pb-10 lg:mt-16 mt-20">
          <div className="grid grid-cols-2 text-center items-center h-9 bg-zinc-300 shadow-2xl">
            <div
              onClick={() => {
                setOpen("CourseInfo");
              }}
              className={`cursor-pointer h-8 ${
                Open === "CourseInfo"
                  ? "text-black shadow-2xl bg-zinc-100 rounded-r-3xl"
                  : ""
              } text-center prifont text-lg hover:text-blue-500`}
            >
              Course Information
            </div>
            <div
              onClick={() => {
                setOpen("Syllabus");
              }}
              className={`cursor-pointer h-8 ${
                Open !== "CourseInfo"
                  ? "text-black shadow-2xl bg-zinc-100 rounded-l-3xl"
                  : ""
              } text-center prifont text-lg hover:text-blue-500`}
            >
              View Syllabus
            </div>
          </div>

          {Open === "CourseInfo" ? (
           

  <div className="lg:grid lg:grid-cols-2 flex flex-col">
  <div className="flex flex-col">
    <div className="lg:mx-4 my-2 shadow-2xl">
      {course?.map((val, i) => {
        let image = `${import.meta.env.VITE_API_URL}/public/${val.image}`;
        return (
          <div key={i} className="my-12 ml-8 flex flex-col h-fit">
            <div>
              <img
                src={image}
                alt="image"
                className="h-48 w-48 border border-black"
              />
            </div>
            <div>
              <div className="grid grid-cols-2 gap-6 mt-16">
                <div>
                  <div className="sefont text-purple-700 text-lg font-semibold">
                    Name
                  </div>
                  <div className="capitalize">{val.name}</div>
                </div>
                <div>
                  <div className="sefont text-lg text-purple-700 font-semibold">
                    Duration
                  </div>
                  <div className="uppercase">{val.duration}</div>
                </div>
                <div>
                  <div className="text-lg sefont font-semibold text-purple-700">
                    Price
                  </div>
                  <div className="capitalize">{val.price}</div>
                </div>
                <div>
                  <div className="sefont text-lg font-semibold text-purple-700">
                    Rating
                  </div>
                  <div className="capitalize">{val.rating}</div>
                </div>
                <div>
                  <div className="sefont text-lg font-semibold text-purple-700">
                    Discount
                  </div>
                  <div className="capitalize">{val.discount}</div>
                </div>
                <div>
                  <div className="sefont text-lg font-semibold text-purple-700">
                    Tags
                  </div>
                  <div className="uppercase">{val.tags}</div>
                </div>
                <div>
                  <div className="sefont text-lg font-semibold text-purple-700">
                    Video
                  </div>
                  <div className="uppercase">{val.overview}</div>
                </div>
                <div>
                  <div className="sefont text-lg font-semibold text-purple-700">
                    Total Enrollments
                  </div>
                  <div className="capitalize">
                    {enrollmentCount !== null ? enrollmentCount : 'Loading...'}
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  </div>
 
</div>
          ) : (
            <div className="ml-5 mt-7">
              <div>
                <input
                  type="text"
                  name="name"
                  value={query}
                  className="border-2 border-gray-700 h-8 lg:w-64 rounded-xl pl-3 outline-none"
                  onChange={(e) => handleSearch(e)}
                  placeholder="Search here"
                />
              </div>
              {app && <Table data={app} columns={columns} />}
              <Link to={`/course/${params.id}/coursedetail/add/syllabus`}>
                <div className="top-36 lg:right-16 right-4 absolute">
                  <button className="lg:h-10 h-8 w-24 bg-red-700 text-white text-lg font-semibold rounded-md">
                    Add New
                  </button>
                </div>
              </Link>
            </div>
          )}
        </div>
      ) : (
        "LOADING"
      )}
    </Fragment>
  );
}

export default Mycourse;
