import React, { useState, useEffect } from "react";
import Table from "../../page component/Table";
import axios from "../../../Hoc/Axios";


import { MdModeEdit } from "react-icons/md";
import { Link } from "react-router-dom";
import { FaMessage } from "react-icons/fa6";
import Replybox from "../Message/Replybox";


function Category() {
  const[show,setShow]=useState(false)

  const columns = [
    {
      name: "Name",
      sortable: true,

      cell: (row) => {
        console.log(row);
        return (
          <div>
            <Link to={`/category/${row.id}`}>{row.name}</Link>
          </div>
        );
      },

      selector: (row) => row.name,
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

    // {
    //   name: "Action",
    //   cell: (row) => (
    //     <div className="gap-4 flex items-center justify-center text-xl ">
    //      <Link to={"/editcategory"} 
    //      state={{
    //       id:row.id
    //      }}> 
        
    //       <button className="  "  id={row.id}>
    //         <MdModeEdit />
    //       </button>
    //      </Link>
            
    //      <button className=" " onClick={()=>setShow(true)} id={row.ID}>
    //       <FaMessage className="h-4 w-4" />
    //       </button>
    //       {show && <Replybox onClose={()=>setShow(false)}/>}
    //     </div>
    //   ),
    //   selector: (row) => row.action,
    // },
  ];

  const [App, setapp] = useState([]);
  const [filter, setFilter] = useState([]);
  const [query, setQuery] = useState("");

  const getdata = (id) => {
    try {
      axios
        .get(`/category`)
        .then((res) => {
          console.log(res);
          setapp([...res.data.newArr]);
          setFilter([...res.data.newArr]);
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

  const handleEdit = () => { };

 

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

  return (
    <div className="lg:ml-60">



      <div className=" mt-28 ">
        <input
          type="text"
          name="name"
          autoComplete="off"
          value={query}
          className=" border-2 border-black rounded-xl sm:h-8  mx-3 w-32 sm:w-64 px-3 "

          onChange={(e) => handlesearch(e)}
          placeholder="Search here"
        />
      </div>

      <Link to={"/addcategory"}>
        <div className="  top-24 lg:right-10 right-4 absolute mt-4">
          <button className="lg:h-10 h-7 w-24 bg-red-700 text-white lg:text-lg font-semibold  rounded-xl ">
            Add New
          </button>
        </div>
      </Link>

      {App && <Table data={App} columns={columns} />}

    </div>
  );
}

export default Category;





// import React, { useState, useEffect } from "react";
// import Table from "../../page component/Table";
// import axiosinstance from "../../../Hoc/Axios";

// import { MdModeEdit } from "react-icons/md";
// import { Link } from "react-router-dom";
// import { FaMessage } from "react-icons/fa6";
// import Replybox from "../Message/Replybox";


// function Category() {
//   const[show, setShow]=useState(false)
//   const columns = [
//     { name: "Name",sortable: true, selector: (row) => row.name },
    
//     { name: "Image",sortable: true, cell: (row) =>{
//         let image=`${import.meta.env.VITE_API_URL}/public/${row.image}`
//    return  <div className="h-8 w-8">
//       <img src={image} />
//     </div>
//     },

//     selector: (row) =>row.image},
  

//      {
//        name:"Action",
//        cell: (row) => (
//          <div className="gap-4 flex items-center justify-center text-xl ">
//           <Link to={"/editcategory"}>
//            <button
//              className="  "
//              onClick={handleEdit}
//              id={row.ID}
//            >
//             <MdModeEdit />
//            </button>
//            </Link>
//            <button
//              className=" "
//              onClick={()=>setShow(true)}
//              id={row.ID}
//            >
//              <FaMessage className="h-4 w-4" />
//            </button>
//            {show && <Replybox onClose={()=>setShow(false)} />}
//          </div>
//        ),
//        selector: (row) => row.action,
//      },
//   ];

//   const [App, setapp] = useState([]);
//   const [filter, setFilter] = useState([]);
//   const [query, setQuery] = useState('');


//   const getdata = (id) => {
//     try {
//       axiosinstance
//         .get(`/category`)
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

 

//   console.log(App);

//   const handlesearch=(event)=>{
//     const getSearch= event.target.value;
//     setQuery(getSearch);
// if (getSearch.length > 0) {
//   const searchdata= App.filter( (item)=>item.name.toLowerCase().includes(getSearch));
//   setapp(searchdata);
  
// } else{
//   setapp(filter);
// }

// setQuery(getSearch);

//   }

//   return (
//     <div className="lg:ml-60">
//     <div className=" mt-28 ">
//         <input type="text" name="name" value={query} className=" border-2 border-gray-700 mx-3  sm:w-64 pl-3 h-8 rounded-xl outline-none" onChange={(e)=>handlesearch(e)} placeholder="Search here"/>
//       </div>

//       {App && <Table data={App} columns={columns} />}

//     <Link to={"/addcategory"}>
//       <div className=" top-28 lg:right-10 right-4 absolute">
//         <button className="lg:h-10 h-8 w-24 bg-red-700 text-white text-lg font-semibold  rounded-md ">Add New</button>
//       </div>
//     </Link>
 
//     </div>
//   );
// }

// export default Category;