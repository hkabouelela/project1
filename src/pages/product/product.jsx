import { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import { toast } from "react-toastify";
import { useCart } from "../../context/useCart";

export function Product(){
    const { addToCart } = useCart();
    const [products,setProducts]=useState([]);
    useEffect(()=>{
fetch('https://dummyjson.com/products')
.then(res => res.json())
.then(data => setProducts(data.products));
},[]);


function addcart(product){
addToCart(product, 1);
toast.success(`${product.title} added to cart!`);
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
<button onClick={() => addcart(p)}>add to cart</button>
</div>




))}


</div>




</>


)



}