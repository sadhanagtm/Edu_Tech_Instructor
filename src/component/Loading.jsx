// // import { Container } from 'postcss'
// import React from 'react'
// import { Container } from '@mui/material';
// const Loading=({show}) =>{
//   return show && (
//     <Container className="text-center">
//         <h1>Loading...</h1>
       
//     </Container>
//   )
// }

// export default Loading

import React from 'react';

const Loading = () => (
  <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
    <div className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full" role="status">
      <span className="visually-hidden">Loading...</span>
    </div>
  </div>
);

export default Loading;
