import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import'./productDetails.css';
import { toast } from "react-toastify";



export function ProductDetails(){
const {id}=useParams();
const[product,setProduct]=useState(null);
const[count,setCount]=useState(1);



useEffect(()=>{
fetch(`https://dummyjson.com/products/${id}`)
.then(res => res.json())
.then(data => setProduct(data));


},[id])
if(!product){
return(
    <h2>Loading...... </h2>



)

}

function decrement(){
if(count>1){
    setCount(count-1);

}


}
function addcart(){
   
toast.success("product added Successfully")

}
return(
<>
<div className="container">
<img src={product.thumbnail} alt={product.description} />
<h2>{product.title}</h2>
<p>price :  ${product.price}</p><br /><br />
<p>Description : {product.description}</p><br />
<button onClick={()=>setCount(count+1)}>+</button>
<input type="number"  value={count}     min={1} max={10} />
<button onClick={decrement}>-</button><br /><br />
<button onClick={addcart}>add to cart</button>

</div>



</>




)




}