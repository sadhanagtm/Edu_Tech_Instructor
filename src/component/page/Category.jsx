import React, { useState, useEffect } from "react";
import Table from "../page component/Table";
import axiosinstance from "../../Hoc/Axios";

import { MdDelete } from "react-icons/md";
import { MdModeEdit } from "react-icons/md";
import { Link } from "react-router-dom";


function Category() {
  const columns = [
    { name: "Name",sortable: true, selector: (row) => row.name },
    
    { name: "Image",sortable: true, cell: (row) =>{
        let image=`${import.meta.env.VITE_API_URL}/public/${row.image}`
   return  <div className="h-8 w-8">
      <img src={image} />
    </div>
    },

         selector: (row) =>row.image},
  

     {
       name: "Action",
       cell: (row) => (
         <div className="gap-4 flex items-center justify-center text-xl ">
           <button
             className="  "
             onClick={handleEdit}
             id={row.ID}
           >
            <MdModeEdit />
           </button>
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

  const [App, setapp] = useState([]);
  const [filter, setFilter] = useState([]);
  const [query, setQuery] = useState('');


  const getdata = (id) => {
    try {
      axiosinstance
        .get(`/category`)
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

  // const [records, setRecords] = useState(data);
  // function handleFilter(event) {
  //   const newData = records.filter((row) => {
  //     return row.name.toLowerCase().includes(event.target.value.toLowerCase());
  //   });
  //   setRecords(newData);
  // }

  console.log(App);

  const handlesearch=(event)=>{
    const getSearch= event.target.value;
    setQuery(getSearch);
if (getSearch.length > 0) {
  const searchdata= App.filter( (item)=>item.name.toLowerCase().includes(getSearch));
  setapp(searchdata);
  
} else{
  setapp(filter);
}

setQuery(getSearch);




  }




  return (
    <div className="ml-60">
    <div className=" mt-20 ">
        <input type="text" name="name" value={query} className=" border-2 border-black  rounded" onChange={(e)=>handlesearch(e)} placeholder="search here"/>
      </div>

      {App && <Table data={App} columns={columns} />}

    <Link to={"/addcategory"}>
      <div className="  top-20 right-10 absolute">
        <button className="h-10 w-24 bg-red-700 text-white text-lg font-semibold  rounded-md ">Add New</button>
      </div>
    </Link>


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

export default Category;