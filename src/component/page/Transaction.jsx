import React, { useState, useEffect } from "react";
import Table from "../page component/Table";
import axiosinstance from "../../Hoc/Axios";
import { Link } from "react-router-dom";



function Transaction() {
  const columns = [
    { name: " Course Name",sortable: true,id:"0", 
       selector:(row)=>row.name
    },
    { name: "Date",id:"1", selector: (row) => row.date},
    { name: 'Invoice ID', id:"2",sortable: true, selector: (row) => row.invoiceID},
    { name: "Amount", id:"3",sortable: true, selector: (row) => row.amount },
    { name: "Status",id:"4",sortable: true, selector: (row) => row.status },
    { name: "Action", id:"6",sortable: true, selector: (row) => row.action },
    

     {
      name: "Action",
       cell: (row) => (
        //  <div className="gap-4 flex items-center justify-center text-xl ">
        //   <Link to={'/editform'}>
        //    <button
        //      className="  "
        //      onClick={handleEdit}
        //      id={row.ID}
        //    >
        //     <MdModeEdit />
        //    </button>
        //    </Link>
        //    <button
        //      className=" "
        //      onClick={handleDelete}
        //      id={row.ID}
        //    >
        //      <MdDelete />
        //    </button>
        //  </div>
        <div></div>
       ),
      selector: (row) => row.action,
     },
  ];

  const [Transaction, setTransaction] = useState([]);
  const [filter, setFilter] = useState([]);
  const [query, setQuery] = useState('');


  const getdata = (id) => {
    try {
      axiosinstance
        .get('https://restcountries.com/v2/all')
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

 

  console.log(Transaction);

  const handlesearch=(event)=>{
    const getSearch= event.target.value;
    setQuery(getSearch);
if (getSearch.length > 0) {
  const searchdata= Transaction.filter( (item)=>item.name.toLowerCase().includes(getSearch));
  setcourse(searchdata);
  
} else{
  setcourse(filter);
}

setQuery(getSearch);
  }

  return (
    <div className="lg:ml-60 mt-20">
    
    <div className=" mt-24 mx-3">
        <input type="text" name="name" value={query} className=" border-2 border-gray-700 outline-none  rounded-xl sm:w-64 pl-3 h-8" onChange={(e)=>handlesearch(e)} placeholder="Search here"/>
      </div>

      {Transaction && <Table data={Transaction} columns={columns} />}
      
    </div>
  );
}

export default Transaction;
