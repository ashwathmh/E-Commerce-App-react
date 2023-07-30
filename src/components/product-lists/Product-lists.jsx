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

  useEffect(() => {
    axios.get('https://fakestoreapi.com/products/categories')
      .then(response => setProducts(response.data))
      .catch(error => console.error('Error fetching products:', error));
  }, []);

  const images=[{name:"electronics",url:"https://www.figgers.com/wp-content/themes/figg-wirless/assets/images/acp-free.gif"},
  {name:"jewelery",url:"http://3.bp.blogspot.com/-KLgANztWG7o/TlVI--zkXbI/AAAAAAAABNw/wiKk_OhGRC8/s1600/necklace-zoom-DSC_9776.jpg"},
  {name:"men's clothing",url:"https://cdni.llbean.net/is/image/wim/266085_1207_41?hei=1095&wid=950&resMode=sharp2&defaultImage=llbstage/A0211793_2"},
  {name:"women's clothing",url:"https://ae01.alicdn.com/kf/HTB1.P8xSXXXXXX3XFXXq6xXFXXXq/chiffon-dress-stylish-floral-clothing-summer-sweep-long-dress-wear-jilbab-women-cloth-kaftan-free-ship.jpg"}]

  return (
        <>
      <Navbar showSearch={true} searchText={searchText} onSearchChange={(v)=>setSearchText(v)}/>
      <div style={{overflow:"auto",height:"88vh"}}>
      <MainImage/>
      <catagoryHeader/>
      <div className='container'>
     
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
          <div data-ref={ix.toString()} onClick={()=>navigate(`/items-lists/${p}`)}  className='head'>
             <ProductCard  title={p} rate={2} price={p} imgUrl={p} />
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