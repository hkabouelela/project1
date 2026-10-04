

import { Route, Routes } from 'react-router-dom'
import './App.css'
import { Header } from './component/Header/header'
import { Home } from './pages/Home/home'
import { Recipes } from './pages/recipes/recipes'
import { ContactUS } from './pages/contactus/contactUs'
import { About } from './pages/about/About'
import { RecipeDetails } from './pages/recipes/RecipeDetails'


function App() {
  // const [count, setCount] = useState(0)

  return (
    <>
     <Header />
    <Routes >
      <Route path='/' element={<Home />}/>
      <Route path='/Home' element={<Home />}/>
      <Route path='/recipes' element={<Recipes />}/>
      <Route path='/recipes/:id' element={<RecipeDetails />}/>
      <Route path='/recipe/:id' element={<RecipeDetails />}/>
      <Route path='/contact-us' element={<ContactUS />}/>
      <Route path='/Contact-us' element={<ContactUS />}/>
      <Route path='/contact' element={<ContactUS />}/>
      <Route path='/Contact' element={<ContactUS />}/>
      <Route path='/about' element={<About />}/>
      <Route path='/About' element={<About />}/>




    </Routes>
    
    </>
  )
}

export default App
