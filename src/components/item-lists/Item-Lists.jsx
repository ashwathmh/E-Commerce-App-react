// import hooks from react
// import axios from axios
// import hooks from react
// import navbar from navbar
// import item-card from item-card
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from "react-router";
import Navbar from '../navbar/Navbar';
import ItemCard from '../item-card/item-car';

// item-list function created
const ItemLists = () => {
  const [products, setProducts] = useState([]);
  const [searchText, setSearchText] = useState("");
  const navigate = useNavigate();
  const { catagory } = useParams();
  const [sortType, setSortType] = useState("none");

  useEffect(() => {
    axios.get(`https://fakestoreapi.com/products/category/${catagory}`)
      .then(response => setProducts(response.data))
      .catch(error => console.error('Error fetching products:', error));
  }, []);

  return (
    <div style={{height:"95vh",width:"99vw", display:"flex",flexDirection:"column"}}>
      <Navbar showSearch={true} searchText={searchText} onSearchChange={(v)=>setSearchText(v)}/>
     
     <div style={{display:"flex",flexDirection:"column",height:"90vh",width:"99vw",overflow:"auto"}} className='cat'>
     <div className='list-Header-Filter'>
     <h id="listHeader">{catagory}</h>
     <div className='dropdown'>
      <label>Sort :</label>
     <select id="sort" name="sort" value={sortType} onChange={(v)=>setSortType(v.currentTarget.value)} >
     <option value="none">none</option>
            <option value="High">High to Low</option>
            <option value="Low">Low to High </option>
       </select>
       </div>
     </div>
     <div style={{width:"99vw", display:"flex",flexWrap:"wrap", gap:"10px",margin:"8px",justifyContent:'center'}}>
      {products.sort((a,b)=>sortType=="Low"?a.price-b.price:sortType=="High"?b.price-a.price:a.id-b.id).filter((f)=>f.title.includes(searchText)||searchText=="").map((p)=>{
        return(
          <ItemCard onClick={()=>navigate(`/items-lists/${catagory}/${p.id}`)} title={p.title} rate={p.rating.rate} price={p.price} imgUrl={p.image} />
        )
      })}
      </div>
     </div>
    </div>
  );
};

export default ItemLists;