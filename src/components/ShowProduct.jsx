import axios from 'axios'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';
import downloadImage from '../assets/download.jpeg'; // adjust path if needed



function ShowProduct() {
    const {id}=useParams();
    var nav=useNavigate()
    const [showid,setShowid]=useState([])
    const [editmodel,setEditmodel]=useState(false)
    useEffect(() => {
    axios.get(`https://grocesy.onrender.com/progetid/${id}`)
    .then((res)=>setShowid(res.data.Data))
    .catch((err)=>alert(err.message))
    
    },[])
    const updateData=() => {
    axios.put(`https://grocesy.onrender.com/proupdate/${id}`,showid)
    .then((res)=>alert(res.data.message))
    .catch((err)=>alert(err.message))
    setEditmodel(false)
    }
    const deleteData=() => {
    axios.delete(`https://grocesy.onrender.com/prodelete/${id}`)
    .then((res)=>alert(res.data.message))
    .catch((err)=>alert(err.message))
    nav('/home')
    }
    return (
  <div className="show-product-container">
    {editmodel && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>update Product</h2>
            <input
              type="text"
              placeholder="Product Name"
              value={showid.productname}
              onChange={(e) => setShowid({...showid,productname:e.target.value})}
            />
            <input
              type="text"
              placeholder="Description"
              value={showid.desc}
              onChange={(e) => setShowid({...showid,desc:e.target.value})}
            />
            <input
              type="number"
              placeholder="Price"
              value={showid.price}
              onChange={(e) => setShowid({...showid,price:e.target.value})}
            />
            <input
              type="number"
              placeholder="Rating (1-5)"
              value={showid.rating}
              onChange={(e) => setShowid({...showid,rating:e.target.value})}
            />
            <input
              type="date"
              placeholder="Expire date"
              value={showid.exp_date}
              onChange={(e) => setShowid({...showid,exp_date:e.target.value})}
            />
            <input
              type="number"
              placeholder="Qty"
              value={showid.qty}
              onChange={(e) => setShowid({...showid,qty:e.target.value})}
            />
            <div className="modal-buttons">
              <button onClick={updateData} className="save-btn">update</button>
              
            </div>
          </div>
        </div>
      )}

    <div className="show-product-card">
      <img src={downloadImage} alt={showid.productname} />
      <div className="show-product-content">
        <h3>{showid.productname}</h3>
        <p className="desc">Description: {showid.desc}</p>
        <p className="price">Price: {showid.price}</p>
        <p className="rating">⭐ Rating: {showid.rating}</p>
        <p className='Qty'>Qty: {showid.qty}</p>
        <div className="button-group">
          <button className='p' onClick={()=>setEditmodel(true)}>edit</button>
          <button className='r'onClick={deleteData}>delete</button>
        </div>
      </div>
    </div>
  </div>
);

}

export default ShowProduct