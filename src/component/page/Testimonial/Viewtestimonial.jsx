import React, { useState, useEffect } from "react";
import Table from "../../page component/Table";
import axiosinstance from "../../../Hoc/Axios";

import { MdDelete } from "react-icons/md";
import { MdModeEdit } from "react-icons/md";
import { Link } from "react-router-dom";


function Viewtestimonial() {
  const columns = [
    { name: "Name",sortable: true, selector: (row) => row.name },
    
    { name: "Video",sortable: true, cell: (row) =>{
        let video=`${import.meta.env.VITE_API_URL}/public/${row.video}`
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

  const [testimonial, settestimonial] = useState([]);
  const [filter, setFilter] = useState([]);
  const [query, setQuery] = useState('');


  const getdata = (id) => {
    try {
      axiosinstance
        .get(`/`)
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
    
  };
  const handleDelete = () => {
    
  };

 

  console.log(testimonial);

  const handlesearch=(event)=>{
    const getSearch= event.target.value;
    setQuery(getSearch);
if (getSearch.length > 0) {
  const searchdata=testimonial.filter( (item)=>item.name.toLowerCase().includes(getSearch));
  setapp(searchdata);
  
} else{
  setapp(filter);
}

setQuery(getSearch);




  }




  return (
    <div className="lg:ml-60">
    <div className=" mt-20 ">
        <input type="text" name="name" value={query} className=" border-2 border-gray-700 mx-3 lg:mx-0 sm:w-64 outline-none rounded-xl h-8 pl-3" onChange={(e)=>handlesearch(e)} placeholder="Search here"/>
      </div>

      {testimonial && <Table data={testimonial} columns={columns} />}

    <Link to={"/addtestimonial"}>
      <div className="  top-20 lg:right-10 right-4 absolute">
        <button className="lg:h-10 h-8 w-24 bg-red-700 text-white text-lg font-semibold  rounded-md ">Add New</button>
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

export default Viewtestimonial;