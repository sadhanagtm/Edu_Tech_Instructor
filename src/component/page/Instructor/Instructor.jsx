import React, { useState, useEffect } from "react";

import Table from "../../page component/Table";
import axiosinstance from "../../../Hoc/Axios";

import { MdDelete } from "react-icons/md";
import { MdModeEdit } from "react-icons/md";
import { Link } from "react-router-dom";
import { FaMessage } from "react-icons/fa6";
import Replybox from "../Message/Replybox";

function Instructor() {
  const [show,setShow]=useState(false)
  const columns = [
    { name: "First Name", sortable: true, selector: (row) => row.firstName },
    { name: "Middle Name", sortable: true, selector: (row) => row.middleName },
    { name: "Last Name", sortable: true, selector: (row) => row.lastName },
    { name: "Password", sortable: true, selector: (row) => row.password },


    {
      name: "Image",
      sortable: true,
      cell: (row) => {
        let image = `${import.meta.env.VITE_API_URL}/public/${row.image}`;
        return (
          <div className="h-8 w-8">
            <img src={image} />
          </div>
        );
      },

      selector: (row) => row.image,
    },

    { name: "Address", sortable: true, selector: (row) => row.address },
    { name: "Phone", sortable: true, selector: (row) => row.phone },
    { name: "Email", sortable: true, selector: (row) => row.email },
    {
      name: "Action",
      cell: (row) => (
        <div className="gap-4 flex items-center justify-center text-xl ">
          <Link to={'/editinstructor'}>
          <button className="  " onClick={handleEdit} id={row.ID}>
            <MdModeEdit />
          </button>
          </Link>
          <button className=" " onClick={()=>setShow(true)} id={row.ID}>
          <FaMessage className="h-4 w-4" />
          </button>
          {show && <Replybox onClose={()=>setShow(false)}/>}
        </div>
      ),
      selector: (row) => row.action,
    },
  ];

  const [teacher, setTeacher] = useState([]);
  const [filter, setFilter] = useState([]);
  const [query, setQuery] = useState("");

  const getdata = (id) => {
    try {
      axiosinstance
        .get(`/instructor`)
        .then((res) => {
          console.log(res);
          setTeacher([...res.data.result]);
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
    getdata();
  }, []);

  const data = [];

  const handleEdit = () => {};

  const handleDelete = () => {};

  console.log(teacher);

  const handlesearch = (event) => {
    const getSearch = event.target.value;
    setQuery(getSearch);
    if (getSearch.length > 0) {
      const searchdata = teacher.filter((item) =>
        item.name.toLowerCase().includes(getSearch)
      );
      setTeacher(searchdata);
    } else {
      setTeacher(filter);
    }

    setQuery(getSearch);
  };

  return (
    <div className="lg:ml-60">
      <div className=" mt-24">
        <input
          type="text"
          name="name"
          value={query}
          className="border-2 border-gray-700 mx-3  sm:w-64 outline-none rounded-xl h-8 pl-3"
          onChange={(e) => handlesearch(e)}
          placeholder="Search here"
        />
      </div>
     
     <Link to={"/addinstructor"}>
     
      <div className="  top-24 lg:right-10 right-4 absolute">
        <button className=" lg:h-10 h-8 w-24 bg-red-700 text-white text-lg font-semibold  rounded-md ">Add New</button>
      </div>
     </Link>

      {teacher && <Table data={teacher} columns={columns} />}
    </div>
  );
}

export default Instructor;

