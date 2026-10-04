
import { Link } from 'react-router-dom';
import './header.css';
import { FaHouse} from 'react-icons/fa6';
import { FaSearch } from 'react-icons/fa';

export function Header(){
return(
<header>
<h2>Recipe Explorer</h2>
<nav>

<Link to={'/Home'}><FaHouse />home</Link>
<Link to={'/Recipes'}>Recipes</Link>
<Link to={'/Contact-us'}>Contact-Us</Link>
<Link to={'/about'}>about</Link>
<input type="search" /><FaSearch />





<button>logout</button>
</nav>
</header>

)


}