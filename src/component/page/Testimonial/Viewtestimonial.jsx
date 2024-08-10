import React, { useState, useEffect } from "react";
import Table from "../../page component/Table";
import axios from "../../../Hoc/Axios";
import { MdDelete } from "react-icons/md";
import { MdModeEdit } from "react-icons/md";
import { Link } from "react-router-dom";
import { FaMessage } from "react-icons/fa6";
import Replybox from "../Message/Replybox";


function Viewtestimonial() {
 
  const[show,setShow]=useState(false)

  const columns = [
    {
      name: "Name",
      sortable: true,

      cell: (row) => {
        console.log(row);
        return (
          <div className="">
            <Link to={`/Testimonial/${row.id}`}>{row.name}</Link>
          </div>
        );
      },

      selector: (row) => row.image ,
    },

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

    { name: "description", sortable: true, selector: (row) => row.desc },
    { name: "facebook", sortable: true, selector: (row) => row.facebook },
    { name: "instagram", sortable: true, selector: (row) => row.instagram },
    { name: "linkedin", sortable: true, selector: (row) => row.linkedin },

    {
      name: "Action",
      cell: (row) => (
        <div className="gap-4 flex items-center justify-center text-xl ">
          <Link
            to={"/edittestimonial"}
            state={{
              id:row.id
            }}
          >
            <button className=" " id={row.id}>
              <MdModeEdit />
            </button>
          </Link>

          <button onClick={()=>setShow(true)} id={row.id} >
            <FaMessage className="h-4 w-4"/>
          </button>
          {show && <Replybox onClose={()=>setShow(false)}/>}

         
        </div>
      ),
      selector: (row) => row.action,
    },
  ];

  const [testimonial, setTestimonial] = useState([]);
  const [filter, setFilter] = useState([]);
  const [query, setQuery] = useState("");

  const getdata = (id) => {
    try {
      axios
        .get(`/testomonial`)
        .then((res) => {
          console.log(res);
          setTestimonial([...res.data.result]);
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

  
  console.log(testimonial);

  const handlesearch = (event) => {
    const getSearch = event.target.value;
    setQuery(getSearch);
    if (getSearch.length > 0) {
      const searchdata = testimonial.filter((item) =>
        item.name.toLowerCase().includes(getSearch)
      );
      setTestimonial(searchdata);
    } else {
      setTestimonial(filter);
    }

    setQuery(getSearch);
  };

  return (
    <div className="lg:ml-60">
     
      <div className=" mt-28">
      <input type="text" name="name" value={query} className=" border-2 border-gray-700 mx-3 sm:w-64 px-3 h-8 rounded-xl outline-none" onChange={(e)=>handlesearch(e)} placeholder="Search here"/>
    
      </div>

      <Link to={"/testimonials"}>
        <div className="  top-24 lg:right-10 right-4 absolute mt-4">
          <button className="lg:h-10 h-7 w-24 bg-red-700 text-white lg:text-lg font-semibold  rounded-xl ">
            Add New
          </button>
        </div>
      </Link>

      {testimonial && <Table data={testimonial} columns={columns} />}

    </div>
  );
}

export default Viewtestimonial




// import axiosinstance from "../../../Hoc/Axios";
// import { MdDelete } from "react-icons/md";
// import { MdModeEdit } from "react-icons/md";
// import { Link } from "react-router-dom";
// import { IoChevronBack } from "react-icons/io5";
// import { FaMessage } from "react-icons/fa6";
// import Replybox from "../Message/Replybox";


// function Viewtestimonial() {
//   const[show,setShow]=useState(false)
//   const columns = [
      
//     { name: "Title",sortable: true,
//       cell:(row)=>{
//         console.log(row)
//         return(
//           <div>
//             <Link to={`/Testimonial/${row.id}`}>{row.title}</Link>
//           </div>
//         )
//       },
//        selector: (row) => row.title },


//     { name: "Description",sortable: true, selector: (row) => row.description },

//     { name: "Image",sortable: true, cell: (row) =>{
//       let image=`${import.meta.env.VITE_API_URL}/public/${row.image}`
//  return  <div className="h-8 w-8">
//     <img src={image} />
//   </div>
//   },

//   selector: (row) =>row.video},
    
//     { name: "Video",sortable: true, cell: (row) =>{
//         let video=`${import.meta.env.VITE_API_URL}/public/${row.video}`
//    return  <div className="h-8 w-8">
//       <video src={video} />
//     </div>
//     },

//     selector: (row) =>row.video},
  

//      {
//        name: "Action",
//        cell: (row) => (
//          <div className="gap-4 flex items-center justify-center text-xl ">
//             <Link to={'/edittestimonial'}  state={{id:row.id}}>
//            <button
//              className="  "
//              onClick={handleEdit}
            
//              id={row.ID}
//            >
//             <MdModeEdit />
//            </button>
//            </Link>
//            <button className=" " onClick={()=>setShow(true)} id={row.ID}>
//           <FaMessage className="h-4 w-4" />
//           </button>
//           {show && <Replybox onClose={()=>setShow(false)}/>}
          
//          </div>
//        ),
//        selector: (row) => row.action,
//      },
//   ];

//   const [testimonial, settestimonial] = useState([]);
//   const [filter, setFilter] = useState([]);
//   const [query, setQuery] = useState('');


//   const getdata = (id) => {
//     try {
//       axiosinstance
//         .get(`/testomonial`)
//         .then((res) => {
//           console.log(res);
//           setapp([...res.data.result]);
//           setFilter([...res.data.result]);

//         })
//         .catch((error) => {
//           console.log(error);
//         });
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   useEffect(() => {
//     getdata();
//   }, []);

//   const data = [ ];

//   const handleEdit = () => {
    
//   };
//   const handleDelete = () => {
    
//   };

 

//   console.log(testimonial);

//   const handlesearch=(event)=>{
//     const getSearch= event.target.value;
//     setQuery(getSearch);
// if (getSearch.length > 0) {
//   const searchdata=testimonial.filter( (item)=>item.name.toLowerCase().includes(getSearch));
//   setapp(searchdata);
  
// } else{
//   setapp(filter);
// }

// setQuery(getSearch);




//   }




//   return (
//     <div className="lg:ml-60">
//     {/* <Link to={"/testimonials"}>
//                   <div className=" bg-zinc-200 h-7 w-8 py-1 pl-1 text-center  rounded-md float-end hover:bg-zinc-300 my-2 mx-1 "><IoChevronBack   className="h-5 w-5"/></div>
//                   </Link> */}
//     <div className=" mt-28">
//         <input type="text" name="name" value={query} className=" border-2 border-gray-700 mx-3 lg:mx-0 sm:w-64 outline-none rounded-xl h-8 pl-3" onChange={(e)=>handlesearch(e)} placeholder="Search here"/>
//       </div>

//       {testimonial && <Table data={testimonial} columns={columns} />}

//     <Link to={"/testimonials"}>
//       <div className="  top-28 lg:right-10 right-4 absolute">
//         <button className="lg:h-10 h-8 w-24 bg-red-700 text-white text-lg font-semibold  rounded-md ">Add New</button>
//       </div>
//     </Link>


//       <div className=" text-xl ">



//         <button onClick={handleEdit}>
//           {/* <MdOutlineEditNote /> */}
//         </button>
//         <button onClick={handleDelete}>
//           {/* <RiDeleteBin5Fill /> */}
//         </button>
//       </div>
//     </div>
//   );
// }

// export default Viewtestimonial;