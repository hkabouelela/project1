import { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import { toast } from "react-toastify";

export function Product(){

    const [products,setProducts]=useState([]);
    useEffect(()=>{
fetch('https://dummyjson.com/products')
.then(res => res.json())
.then(data => setProducts(data.products));
},[]);


function addcart(){
   
toast.success("product added Successfully")

}


return(
    <>



<div className="grid">
{products.map((p)=>(
<div className="card" key={p.id}>
   <Link to={`/product/${p.id}`}style={{textDecoration:"none",color:"black"}} >
<img src={p.thumbnail} alt={p.description} />
<h2>{p.title}</h2>
<p>price :${p.price}</p>
</Link> 
<button onClick={addcart}>add to cart</button>
</div>




))}


</div>




</>


)



}