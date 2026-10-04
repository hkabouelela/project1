import { Link, useNavigate } from 'react-router-dom';
import './header.css';
import { FaHouse, FaLayerGroup } from 'react-icons/fa6';
import { FaProductHunt } from 'react-icons/fa';

export function Header (){
const Navigate= useNavigate()

function handleLogout(){
localStorage.removeItem("token");
Navigate('/');

}



return(
<header>
    <div className='container'>
<h2>ShopStream</h2>

<nav className='nav-logo'>
    <Link to={'/home'}><FaHouse /></Link>
    <Link to={'/products'}><FaProductHunt /></Link>
    <Link to={'/categories'}><FaLayerGroup /></Link>



</nav>
</div>
<div className='searchnlogout'>
    
<input className="search"type="search" value= "search products" />


{localStorage.getItem("token") && <button onClick={handleLogout}>log out</button>}
</div>

</header>







)




}