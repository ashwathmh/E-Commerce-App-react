// import hooks  from react
// import axios from axios
// import Navbar from Navbar
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from '../navbar/Navbar';
import CartCard from '../cart-card/cart-card';
const CartItems = () => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    axios.get(`https://fakestoreapi.com/products`)
      .then(response => setProducts(response.data))
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

  const addCart=(id)=>{
        const ca=[...cart];
        const ix=ca.findIndex((c)=>c.id==id);
        if(ix!=-1){
          ca[ix].count=ca[ix].count+1;
        }else{
          ca.push({id:id,count:1});
        }
        localStorage.setItem('cart', JSON.stringify(ca));
        setCart(ca);
  }
  const removeFromCart=(id)=>{
      const ca=[...cart];
      const ix=ca.findIndex((c)=>c.id==id);
      if(ix!=-1){
        ca[ix].count=ca[ix].count-1;
      }
     const filterCa=ca.filter((c)=>c.count!=0);
      localStorage.setItem('cart', JSON.stringify(filterCa));
      setCart(filterCa);
}

const deleteFromCart=(id)=>{
  const ca=[...cart];
  const filterCa=ca.filter((c)=>c.id!=id);
  localStorage.setItem('cart', JSON.stringify(filterCa));
  setCart(filterCa);
}
let totalAmount=0;
let totalCount=0;
  return (
    <>
     <Navbar />
     <div style={{display:"flex",flexDirection:"column",height:"80vh",width:"100vw",overflow:"auto"}}>
     <h className="shopping-header">Shopping Cart</h>
<div style={{display:"flex",flexWrap:"wrap",gap:"10px", justifyContent:"center"}}>

  
  {cart.map((c)=>{
    const item=products.find((i)=>i.id==c.id);
    if(item){
      totalAmount+=item.price*c.count;
      totalCount+=c.count;
      return (
        <CartCard title={item.title} rate={item.rating.rate} amount={item.price} imgUrl={item.image} count={c.count} onDeleteClick={()=>deleteFromCart(c.id)} onPlusClick={()=>addCart(c.id)} onMinusClick={()=>removeFromCart(c.id)} />
      )
    }
  })}
</div>

{/* this is ordersummery */}

<div className='cart-pay'>
<h className="cart-payHead">Order Summary</h>
<div className='cart-flex'>
<h>Total Number of Items</h>
<p>{totalCount}</p>
</div>
<div className='cart-flex'>
<h>Total Amount</h>
<p>${totalAmount}</p>
</div>
<div className='cart-flex'>
  <h>Shipping & Handling</h>
  <p>${cart.length==0?0:20}</p>
</div>
<p className="line">
<hr/></p>
<div className='cart-flex cartBold'>
  <h>Order Total </h>
  <p>${cart.length==0?0:totalAmount+20}</p>
</div>
<button className='cart-flex cart-button'>Pay Now</button>
</div>
</div>


    </>
    
  );
};

export default CartItems