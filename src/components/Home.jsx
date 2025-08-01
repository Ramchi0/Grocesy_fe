import { useState } from 'react';
import '../style/grocery.css';
import axios from 'axios';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import downloadImage from '../assets/download.jpeg'; // correct path



const Home = ({cartitems,setCartitems}) => {
  var nav = useNavigate()
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [productname, setProductname] = useState("");
  const [price, setPrice] = useState("");
  const [desc, setDesc] = useState("");
  const [rating, setRating] = useState("");
  const [exp_date, setExp_date] = useState("");
  const [qty, setQty] = useState("");
  const [productData, setProductData] = useState([]);

  useEffect(() => {
    axios.get("https://grocesy.onrender.com/progetdata")
      .then((res) => setProductData(res.data.Data))
      .catch((err) => alert(err.message))

  }, [productData])

  const handleAddProduct = (e) => {
    e.preventDefault();
    const newEntry = {
      productname,price, desc, rating, exp_date, qty
    };
    axios.post("https://grocesy.onrender.com/post", newEntry)
      .then((res) => alert(res.data.message))
      .catch((err) => alert(err.message));
    setProductname("");
    setPrice("");
    setDesc("");
    setRating("");
    setExp_date("");
    setQty("");
  };
  const filtered = search === "" ? productData :
    productData.filter(p => p.productname.toLowerCase().includes(search.toLowerCase())
    );
 const handleAddCart=(product)=>{
   const exist=cartitems.find((e)=>{
    return e._id===product._id
   })
   if (!exist) setCartitems([...cartitems,product])
    else alert("Already added..")
 
 }
  return (

    <div className="container">
      <div className="top-bar">
        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value.trim())}
          className="search-box"
        />
        <button className="add-button" onClick={() => setShowModal(true)}>
          + Add Product
        </button>


      </div>

      {/* Product Grid */}
      <div className="product-grid">
        {filtered.length > 0 ? filtered.map((product) => (
          <div className="product-card" >
            <img className="img_sz" src={downloadImage}  onClick={() => nav(`/showproduct/${product._id}`)} alt={product.productname} />
            <h3>{product.productname}</h3>
            <p className="desc">Description:{product.desc}</p>
            <p className="price">Price:{product.price}</p>
            <p className="rating">⭐Rating:{product.rating}</p>
            <p className='Qty'>Qty:{product.qty}</p>
            <button className='p' onClick={()=>handleAddCart(product)}>
              Add to cart
            </button>

          </div>
        ))
          : (<h1>Products not found</h1>)
        }
      </div>
       {/* Extra Content Starts Here */}
            <div className="hero-banner">
              <h1>Welcome to Grocesy</h1>
              <p>Your one-stop shop for fresh groceries delivered to your door.</p>
            </div>

            <div className="categories">
              <h2>Shop by Category</h2>
              <div className="category-grid">
                <div className="category-card">Fruits</div>
                <div className="category-card">Vegetables</div>
                <div className="category-card">Dairy</div>
                <div className="category-card">Snacks</div>
                <div className="category-card">Beverages</div>
              </div>
            </div>


            <div className="offers">
              <h2>Today's Offers</h2>
              <ul>
                <li>Buy 1 Get 1 Free on Apples 🍎</li>
                <li>20% Off on Fresh Vegetables 🥦</li>
                <li>Free Delivery on Orders Over ₹500 🚚</li>
              </ul>
            </div>

            <footer className="footer">
              <p>&copy; 2025 Grocesy. All rights reserved.</p>
              <p>Contact: support@grocesy.com | +91 9876543210</p>
              <div className="social-icons">
                <span>📘</span> <span>📸</span> <span>🐦</span>
              </div>
            </footer>

      {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>Add New Product</h2>
            <input
              type="text"
              placeholder="Product Name"
              value={productname}
              onChange={(e) => setProductname(e.target.value)}
            />
            <input
              type="text"
              placeholder="Description"
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
            />
            <input
              type="number"
              placeholder="Price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
            <input
              type="number"
              placeholder="Rating (1-5)"
              value={rating}
              onChange={(e) => setRating(e.target.value)}
            />
            <input
              type="date"
              placeholder="Expire date"
              value={exp_date}
              onChange={(e) => setExp_date(e.target.value)}
            />
            <input
              type="number"
              placeholder="Qty"
              value={qty}
              onChange={(e) => setQty(e.target.value)}
            />
            <div className="modal-buttons">
              <button onClick={handleAddProduct} className="save-btn">Save</button>
              <button onClick={() => setShowModal(false)} className="cancel-btn">Cancel</button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default Home;
