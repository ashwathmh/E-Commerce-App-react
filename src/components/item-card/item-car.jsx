// import hooks from react
// import styles from app.css

import React, { useEffect, useState } from 'react';
import '../../App.css';

// item-card function created
const ItemCard = ({ title, rate, price,imgUrl,onClick }) => {
    return(
        <div onClick={onClick} className='card-container'>
        <img src={imgUrl} alt=""  className='card-image' />
        <div className="card-content">
          <h4 className='card-title'>{title}</h4>
          <p className='card-rateing'>Rate : {rate}</p>
          <p className='card-amount'>$ <span>{price}</span></p>
        </div>
      </div>
    )
};

export default ItemCard;