import { useState, useEffect } from "react";

export default function Sidebar({ cartitems, setCartitems, setIsCartopen }) {
  const [total, setTotal] = useState(0);

  // Calculate total (price * quantity for each item)
  useEffect(() => {
    const totalAmount = cartitems.reduce((acc, item) => {
      const price = Number(item.price) || 0;
      const qty = Number(item.quantity) || 1; // fallback to 1
      return acc + price * qty;
    }, 0);
    setTotal(totalAmount);
  }, [cartitems]);

  // Increase quantity
  const increaseQuantity = (index) => {
    const updatedCart = [...cartitems];
    updatedCart[index].quantity = (updatedCart[index].quantity || 1) + 1;
    setCartitems(updatedCart);
  };

  // Decrease quantity
  const decreaseQuantity = (index) => {
    const updatedCart = [...cartitems];
    if ((updatedCart[index].quantity || 1) > 1) {
      updatedCart[index].quantity -= 1;
      setCartitems(updatedCart);
    }
  };

  // Remove product
  const removeProduct = (index) => {
    const updatedCart = [...cartitems];
    updatedCart.splice(index, 1);
    setCartitems(updatedCart);
  };
  const BuyNow = () => {
        var options = {
            key: "rzp_test_xtkRHI1sGHBCGM",
            key_secret: "3nIQtwifGeUyqOvkRI689JSh",
            amount: total * 100,
            currency: "INR",
            name: "Product Delivery",
            description: "for testing purpose...",
            handler: function (response) {
                alert(response.razorpay_payment_id)
                window.location.reload();
            },
            profill: {
                name: 'Ramchi',
                email: 'ramchiramchi16@gmail.com',
                contact: '9789657942'
            },
            notes: {
                address: "Razorpay Corporate"
            },
            theme: {
                color: "#2cdb8aff"
            }
        }
        var pay=new window.Razorpay(options)
        pay.open();
    }
  return (
    <div style={sidebarOverlay}>
      <div style={sidebarStyle}>
        <h2>Your Cart</h2>
        <button style={closeBtnStyle} onClick={() => setIsCartopen(false)}>X</button>
        {cartitems.length > 0 ? (
          cartitems.map((e, index) => (
            <div key={index} style={cartItemStyle}>
              <h4>Name: {e.productname.toUpperCase()}</h4>
              <p>Price: {e.price}₹</p>
              <p>⭐Rating: {e.rating}</p>
              <p>Quantity: {e.quantity || 1}</p>

              {/* Buttons */}
              <button onClick={() => increaseQuantity(index)} style={qtyBtnStyle}>+</button>
              <button onClick={() => decreaseQuantity(index)} style={qtyBtnStyle}>-</button>
              <button onClick={() => removeProduct(index)} style={removeBtnStyle}>Remove</button>
            </div>
          ))
        ) : (
          <h1>No product added..</h1>
        )}
        <h2>Total Amount: ₹ {total}/</h2>
        <button style={buyNowStyle}  onClick={BuyNow}>Buy Now</button>
      </div>
    </div>
  );
}
const qtyBtnStyle = {
  margin: "5px",
  padding: "5px 10px",
  border: "none",
  backgroundColor: "#007bff",
  color: "white",
  borderRadius: "5px",
  cursor: "pointer",
};

const removeBtnStyle = {
  marginTop: "10px",
  padding: "5px 10px",
  border: "none",
  backgroundColor: "crimson",
  color: "white",
  borderRadius: "5px",
  cursor: "pointer",
};


const sidebarOverlay = {
  position: "fixed",
  top: 0, right: 0, bottom: 0, left: 0,
  backgroundColor: "rgba(0,0,0,0.3)",
  display: "flex",
  justifyContent: "flex-end",
  zIndex: 999

};

const sidebarStyle = {
  width: "300px",
  backgroundColor: "#fff",
  height: "100%",
  padding: "20px",
  overflowY: "auto",
  position: "relative",
};

const closeBtnStyle = {
  position: "absolute",
  top: "10px",
  right: "10px",
  background: "red",
  color: "white",
  border: "none",
  borderRadius: "50%",
  width: "30px",
  height: "30px",
  cursor: "pointer",
};

const cartItemStyle = {
  padding: "10px",
  borderBottom: "1px solid #ccc",
};

const buyNowStyle = {
  marginTop: "20px",
  padding: "10px",
  backgroundColor: "green",
  color: "#fff",
  width: "100%",
  border: "none",
  borderRadius: "8px",
  cursor: "pointer",
};


