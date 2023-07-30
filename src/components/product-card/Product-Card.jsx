// hooks is imported from the react
// styles are imported from the app.css
import React, { useEffect, useState } from 'react';
import '../../App.css'; 

// product-card function is created
const ProductCard = ({ title}) => {

  // images are added
  const images=[
   {name:"electronics",url:"https://th.bing.com/th/id/OIP.ftrX5cDewguvTxT_4awQLAHaDg?w=314&h=166&c=7&r=0&o=5&dpr=1.5&pid=1.7",offer:"20% Offer Available",},
  {name:"jewelery",url:"https://th.bing.com/th/id/OIP.2NxJ9-4ZmuwxcMUnN4tVrQHaDU?w=323&h=156&c=7&r=0&o=5&dpr=1.5&pid=1.7",offer:"No Wastage"},
  {name:"men's clothing",url:"https://th.bing.com/th/id/OIP.StobSsn-X3pWFvt0jslRUwHaFx?w=251&h=196&c=7&r=0&o=5&dpr=1.5&pid=1.7",offer:"10% Offer Available"},
  {name:"women's clothing",url:"https://th.bing.com/th/id/OIP.ERc0t3HYSiCjLvmGnxuTcwAAAA?w=203&h=169&c=7&r=0&o=5&dpr=1.5&pid=1.7",offer:"50% Offer Available"}]
    
  return(
        <div className='product-card-container'>
        <div className="product-card-content">
          <h4 className='product-card-title'>{title}</h4>
          <div className="offerZone" >
            <h style={{color:'red'}}>{images.find((i)=>i.name===title).offer}</h>
          <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M21.41 11.58l-9-9C12.05 2.22 11.55 2 11 2H4c-1.1 0-2 .9-2 2v7c0 .55.22 1.05.59 1.42l9 9c.36.36.86.58 1.41.58.55 0 1.05-.22 1.41-.59l7-7c.37-.36.59-.86.59-1.41 0-.55-.23-1.06-.59-1.42zM5.5 7C4.67 7 4 6.33 4 5.5S4.67 4 5.5 4 7 4.67 7 5.5 6.33 7 5.5 7z"></path></svg>
        </div>
        </div>
        <img src={images.find((i)=>i.name===title).url} alt=""  className='product-card-image' />
      </div>
    )
};
export default ProductCard;