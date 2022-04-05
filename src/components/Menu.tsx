import React from "react";

function Menu(): JSX.Element {
   return (
      <div className="d-flex justify-content-between align-items-center fs-1 fw-bold">
         <p className="m-0">Shop</p>
         <button className="border-0 bg-white"><i className="bi bi-list"></i></button>
      </div>
   )
};


export default Menu;