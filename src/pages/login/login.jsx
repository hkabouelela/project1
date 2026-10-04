import { useState } from "react"
import { useNavigate } from "react-router-dom";
import './login.css';
export function Login(){
 
const[username,setUsername]=useState('');
const[password,setPassword]=useState('');
const[error,setError]=useState('');
const[loading,setLoading]=useState(false);
const navigate=useNavigate();

async function handleLogin(e){
    e.preventDefault();
    setLoading(true);
    try{
        const res = await fetch('https://dummyjson.com/auth/login',{
            method : 'POST',
            headers: { 'Content-Type': 'application/json' },
            body :JSON.stringify({username , password}) 
        });
        const data = await res.json(); 

        if(!res.ok){
            setError(data.message || 'Invalid username or password');
            setLoading(false);
            return; //
        }

        localStorage.setItem("token", data.token); 
        navigate('/home');
    }
    catch(err){
        setError("Something went wrong. Please try again");
         setLoading(false);
    }
}

return(

<div className="login-page">
  <div className="login-card">
    <h2>Login</h2>
    <form onSubmit={handleLogin}>
      <label htmlFor="username">Username</label>
      <input type="text" id="username" name="username"
       value={username} 
       onChange={(e)=> setUsername(e.target.value)} required />
      <label htmlFor="Password">Password</label>
      <input type="password" id="Password" name="password"
      value={password}
       onChange={(e)=>setPassword(e.target.value)} required />



      {error && <p style={{color:"red"}}>{error}</p>}
      <button type="submit">
        {loading ? 'signin.... ': 'login'}
      </button>
    </form>
  </div>
</div>




)






}