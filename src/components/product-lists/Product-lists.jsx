// hooks are imported from the react
// axios is imported from the axios
// styles are imported from the app.css
// hooks are imported from the react-dom
// navbar is imported from the navbar
// main-image is imported from the main-image
// product-card is imported from the Product-card 
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../../App.css';
import { useNavigate } from "react-router";
import Navbar from '../navbar/Navbar';
import MainImage from '../main-image/Main-Image';
import ProductCard from '../product-card/Product-Card';

// Product-list function is created
const ProductLists = () => {
  const [products, setProducts] = useState([]);
  const [searchText, setSearchText] = useState("");
  const navigate = useNavigate();

  // get method is used in useEffect
  useEffect(() => {
    axios.get('https://fakestoreapi.com/products/categories')
      .then(response => setProducts(response.data))
      .catch(error => console.error('Error fetching products:', error));
  }, []);

  return (
        <>
      <Navbar showSearch={true} searchText={searchText} onSearchChange={(v)=>setSearchText(v)}/>
      <div style={{overflow:"auto",height:"88vh"}}>
      <MainImage/>
      <catagoryHeader/>
      <div className='container'>
     

     {/* Product Mapping */}
      {products.map((p,ix)=>{
        return(
          <div onClick={() => {
            const el = document.querySelector(`[data-ref='${ix.toString()}']`);
            if (!el) {
              return;
            }
            el.scrollIntoView({
              behavior: "smooth",
            });
          }} className='catagory-Name' >
            <p>{p}</p>
          </div>
        )
      })}

      <div className='cat'>
      {products.filter((f)=>f.includes(searchText)||searchText=="").map((p,ix)=>{
        return(
          <div data-ref={ix.toString()} onClick={()=>navigate(`/product-lists/${p}`)}  className='head'>
             <ProductCard  title={p} />
          </div>
        )
      })}
      
     </div>
     </div>
      </div>
     
    </>
 
  );
};

export default ProductLists;