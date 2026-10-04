
import './hero.css';
import { Link } from 'react-router-dom';

export function Hero(){
return(
<div className='hero'>


  <div className="hero-text">
<h2>Discover Delicious Recipes </h2>
<p>Explore easy, delicious recipes for every occasion. From
quick weeknight dinners to elaborate weekend feasts, find
your next culinary inspiration here.
</p>
 <Link to={'/Recipes'}><button >explore Recipes</button></Link>
<button >watch -   video</button>

</div>
<div className="hero-image">
    {/* <img src="https://images.unsplash.com/photo-1506368249639-73a05d6f6488?w=500&auto=format&fit
    =crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cmVjaXBlc3xlbnwwfHwwfHx8MA%3D%3D:"/> */}


</div>

</div>



)


}