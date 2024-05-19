import React, { useState, useEffect } from "react";
import Table from "../page component/Table";
import axiosinstance from "../../Hoc/Axios";

import { MdDelete } from "react-icons/md";
import { MdModeEdit } from "react-icons/md";
import { Link } from "react-router-dom";



function Courses() {
  const columns = [
    { name: "Name",sortable: true, 
       cell:(row)=>{
        console.log(row)
        return(
          <div >
            <Link to={`/Courses/${row.id}`}>
              {row.name}
            </Link>
          </div>
        )

       },



    selector: (row) => row.name },

    { name: "Image",sortable: true, cell: (row) =>{
        let image=`${import.meta.env.VITE_API_URL}/public/${row.image}`
   return  <div className="h-8 w-8">
      <img src={image} />
    </div>
    },

         selector: (row) =>row.image},
    { name: "price",id:"1", selector: (row) => row.price },
    { name: 'Duration', id:"2",sortable: true, selector: (row) => row.duration },
    { name: "Description", id:"3",sortable: true, selector: (row) => row.description },
    { name: "Rating",id:"4",sortable: true, selector: (row) => row.rating },
    { name: "Discount", id:"6",sortable: true, selector: (row) => row.discount },
    { name: "Tags", id:"7", sortable: true, selector: (row) => row.tags },

     {
       name: "Action",
       cell: (row) => (
         <div className="gap-4 flex items-center justify-center text-xl ">
          <Link to={'/editform'}>
           <button
             className="  "
             onClick={handleEdit}
             id={row.ID}
           >
            <MdModeEdit />
           </button>
           </Link>
           <button
             className=" "
             onClick={handleEdit}
             id={row.ID}
           >
             <MdDelete />
           </button>
         </div>
       ),
      selector: (row) => row.action,
     },
  ];

  const [Course, setcourse] = useState([]);
  const [filter, setFilter] = useState([]);
  const [query, setQuery] = useState('');



  const getdata = (id) => {
    try {
      axiosinstance
        .get(`/course`)
        .then((res) => {
          console.log(res);
          setcourse([...res.data.result]);
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

  const data = [ ];

  const handleEdit = () => {
    // const newName = prompt("Enter the new name:", name);
    // if (newName !== null && newName !== "") {
    //   setName(newName);
    // }
  };
  const handleDelete = () => {
    // const confirmDelete = window.confirm(
    //   "Are you sure you want to delete this name?"
    // );
    // if (confirmDelete) {
    //   setName("");
    // }
  };


  console.log(Course);

  const handlesearch=(event)=>{
    const getSearch= event.target.value;
    setQuery(getSearch);
if (getSearch.length > 0) {
  const searchdata= Course.filter( (item)=>item.name.toLowerCase().includes(getSearch));
  setcourse(searchdata);
  
} else{
  setcourse(filter);
}

setQuery(getSearch);


  }

  return (
    <div className="ml-60">
    
    <div className=" mt-20">
        <input type="text" name="name" value={query} className=" border-2 border-black  rounded" onChange={(e)=>handlesearch(e)} placeholder="search here"/>
      </div>


     <Link to={"/Addcourse"}>
      <div className="  top-20 right-10 absolute">
        <button className="h-10 w-24 bg-red-700 text-white text-lg font-semibold  rounded-md ">Add New</button>
      </div>
     </Link>

      {Course && <Table data={Course} columns={columns} />}
      <div className=" text-xl ">
        <button onClick={handleEdit}>
          {/* <MdOutlineEditNote /> */}
        </button>
        <button onClick={handleDelete}>
          {/* <RiDeleteBin5Fill /> */}
        </button>
      </div>
    </div>
  );
}

export default Courses;