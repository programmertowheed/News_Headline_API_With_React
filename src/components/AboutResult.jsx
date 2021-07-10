import React from 'react'

 const AboutResult = React.forwardRef(({ currentPage, totalPage, totalResult },ref) => {
   return (
     <div ref={ref} className="d-flex">
       <p className="text-block-50">About {totalResult} result found</p>
       <p className="text-block-50" style={{ marginLeft: "auto" }}>
         {currentPage} page of {totalPage}
       </p>
     </div>
   );
 });
export default AboutResult