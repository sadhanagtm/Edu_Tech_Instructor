import React, { useState, useEffect } from "react";
import Table from "../../page component/Table";
import axiosinstance from "../../../Hoc/Axios";
import { MdDelete } from "react-icons/md";
import { MdModeEdit } from "react-icons/md";
import { Link } from "react-router-dom";
import { FaMessage } from "react-icons/fa6";
import Replybox from "../Message/Replybox";



function Courses() {

  const[show,setShow]=useState(false)
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

    { name:"Image",sortable: true, cell:(row) =>{
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
         <div className=" flex items-center justify-center gap-4 text-xl ">
          <Link to={'/editform'} state={{
            id:row.id
          }}>
           <button
             className="  " 
            
             id={row.id}
           >
            <MdModeEdit />
           </button>
           </Link>
           

           <button

on onClick={()=>setShow(true)} 
             className="  " 
            
             id={row.id}
           >
            <FaMessage className="h-4 w-4" />
           </button>
           {show && <Replybox onClose={()=>setShow(false)}/>}

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
    <div className=" lg:ml-60">
    
    <div className=" mt-24">
        <input type="text" name="name" value={query} className=" border-2 border-gray-700 mx-3 sm:w-64 pl-3 h-8 rounded-xl outline-none" onChange={(e)=>handlesearch(e)} placeholder="Search here"/>
      </div>


     <Link to={"/Addcourse"}>
      <div className="  top-24 lg:right-10 right-4 absolute">
        <button className=" h-8 lg:h-10 w-24 bg-red-700 shadow-2xl text-white text-lg font-semibold  rounded-md ">Add New</button>
      </div>
     </Link>

      {Course && <Table data={Course} columns={columns} />}
      
    </div>
  );
}

export default Courses;