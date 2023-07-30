// hooks are imported from the react
// hooks are imported from the react-dom
 // axios is imported from the axios
  // navbar is imported from the navbar
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from "react-router";
import axios from 'axios';
import Navbar from '../navbar/Navbar';

// product details function is created
const ProductDetails = () => {
    const [product, setProduct] = useState({});
    const [cart, setCart] = useState([]);
    const {catagory, itemId } = useParams();
  
    useEffect(() => {
      axios.get(`https://fakestoreapi.com/products/${itemId}`)
        .then(response => setProduct(response.data))
        .catch(error => console.error('Error fetching products:', error));
    }, []);

    useEffect(() => {
        let cartItems = localStorage.getItem('cart');
        if (!cartItems) {
            cartItems = [];
          } else {
            cartItems = JSON.parse(cartItems);
          }
          setCart(cartItems);
      }, []);
  
      // add-cart function is created
    const addCart=()=>{
          const ca=[...cart];
          const ix=ca.findIndex((c)=>c.id==itemId);
          if(ix!=-1){
            ca[ix].count=ca[ix].count+1;
          }else{
            ca.push({id:itemId,count:1});
          }
          localStorage.setItem('cart', JSON.stringify(ca));
          setCart(ca);
    }

    // remove-from-cart  function is created
    const removeFromCart=()=>{
        const ca=[...cart];
        const ix=ca.findIndex((c)=>c.id==itemId);
        if(ix!=-1){
          ca[ix].count=ca[ix].count-1;
        }
       const filterCa=ca.filter((c)=>c.count!=0);
        localStorage.setItem('cart', JSON.stringify(filterCa));
        setCart(filterCa);
  }

    const cartItem=cart.find((c)=>c.id==itemId);
  return (
    <>
    <Navbar />
    <div className="mainPage">

          <div className='mainContainer'>

              <div className="leftSection">
                  <div className='imageBox'>
                      <img className="image" src={product.image} alt="" />
                  </div>

                  <div className='button'>
                      <button onClick={()=>{
                        if(cartItem==null){
                            addCart()
                        }
                      }} style={{fontSize:cartItem!=null?"28px":undefined}} className='btnOne'>
                        {cartItem!=null? <div className='addCartbutton'>
                        <svg  onClick={()=>removeFromCart()} stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 1024 1024" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M872 474H152c-4.4 0-8 3.6-8 8v60c0 4.4 3.6 8 8 8h720c4.4 0 8-3.6 8-8v-60c0-4.4-3.6-8-8-8z"></path></svg>
                        <div >
                        {cartItem.count}
                        </div>
                         <svg  onClick={()=>addCart()} stroke="currentColor" fill="currentColor" stroke-width="0" t="1551322312294" viewBox="0 0 1024 1024" version="1.1" pId="10297" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><defs></defs><path d="M474 152m8 0l60 0q8 0 8 8l0 704q0 8-8 8l-60 0q-8 0-8-8l0-704q0-8 8-8Z" pId="10298"></path><path d="M168 474m8 0l672 0q8 0 8 8l0 60q0 8-8 8l-672 0q-8 0-8-8l0-60q0-8 8-8Z" pId="10299"></path></svg>
                        </div>:<span>Add To Cart</span>}
                        </button>
                      <button className='btnTwo'>Buy Now</button>
                  </div>
              </div>

              <div className='rightSection'>
                  <div className="card-content">
                      <h2 className='card-title'>{product.title}</h2>
                      <p className='paragraph'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde laborum odio deserunt sequi, repudiandae animi!</p>
                      <p className='card-rateing'><span>Rating : </span>product?.rating?.rate</p>
                      <p className='card-amount'>$ <span>{product.price}</span></p>
                      <h3 className='offer'>Available offers</h3>
                      <ul className='listOrder'>
                          <li>Bank OfferFlat ₹1,250 Off on xyz Bank Credit Card EMI Trxns on orders priced between ₹15,000 to ₹39,999</li>
                          <li>Bank OfferFlat ₹3,000 Off on xyz Bank Credit Card EMI Trxns on orders priced between ₹40,000 to ₹49,999</li>
                          <li>Bank OfferFlat ₹4,000 Off on xyz Bank Credit Card EMI Trxns on orders of ₹50,000 and aboveT&C</li>
                          <li>Extra ₹500 Off on Bikes & Scooters on purchase of ₹30,000 or moreT&C</li>
                      </ul>
                  </div>
              </div>
          </div>
      </div>
      </>
  );
};

export default ProductDetails;