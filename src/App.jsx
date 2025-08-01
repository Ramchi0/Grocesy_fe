import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import SignIn from './components/SignIn';
import Navbar from './components/Navbar';
import Home from './components/Home';
import ShowProduct from './components/ShowProduct';
import Sidebar from './components/Sidebar';



function App() {
  const [cartitems,setCartitems]=useState([]);
  const[iscartopen,setIsCartopen]=useState(false);
  return (
    <> 
    
    <Router>
      <Navbar carditems={cartitems} setIsCardOpen={setIsCartopen}/>
      {iscartopen && <Sidebar setIsCartopen={setIsCartopen} setCartitems={setCartitems} cartitems={cartitems}/>}
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path='/home' element={<Home cartitems={cartitems} setCartitems={setCartitems}/>}/>
        <Route path='/showproduct/:id' element={<ShowProduct/>}/>
      </Routes>
    </Router></>
   
  );
}

export default App;
