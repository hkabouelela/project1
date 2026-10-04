
import { Link } from 'react-router-dom';
import './banner.css';
export function Banner(){
return(
<div className='hero'>


  <div className="hero-text">
<h2>Experience the Future
of Innovation. </h2>
<p>Explore our curated selection of premium electronics
designed to elevate your daily stream of life. Precision
engineering meets minimalist design.
</p>
<Link to={'/products'}><button >shop now </button></Link>
<Link to={'/products'}><button >View Collections </button></Link>


</div>
<div className="hero-image">
    <img src="https://images.unsplash.com/photo-1599669454699-248893623440?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mzh8fGhlYWRwaG9uZXxlbnwwfHwwfHx8MA%3D%3D"/>


</div>

</div>



)


}