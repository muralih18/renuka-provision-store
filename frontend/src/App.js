import React, { useState } from "react";
import Sidebar from "./components/Sidebar";
import products from "./data/products";
import axios from "axios";

function App() {
  const [category, setCategory] = useState("All");
  const [cart, setCart] = useState({});
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  const filteredProducts =
    category === "All"
      ? products
      : products.filter((p) => p.category === category);

  const addToCart = (product) => {
    console.log(product.name);
    setCart((prevCart) => ({
      ...prevCart,
      [product.name]: (prevCart[product.name] || 0) + 1
    }));
  };
  const removeFromCart = (product) => {
  setCart((prevCart) => {
    const updated = { ...prevCart };

    if (updated[product.name] > 1) {
      updated[product.name] -= 1;
    } else {
      delete updated[product.name];
    }

    return updated;
  });
};

  const placeOrder = async () => {
    await axios.post("http://127.0.0.1:5000/order", {
      name,
      phone,
      items: cart
    });
    alert("Order placed successfully!");
  };

  return (
    <div style={{ display: "flex" }}>

      {/* LEFT SIDEBAR */}
      <Sidebar setCategory={setCategory} selected={category} />

      {/* RIGHT PRODUCT AREA */}
      <div style={{ width: "75%", padding: "20px" }}>
        <h2>{category} Products</h2>

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))",
          gap: "10px"
          }}>
          {filteredProducts.map((p) => (
            <div key={p.id} style={{
              width: "180px",
              background: "#fff",
              borderRadius: "10px",
              padding: "10px",
              margin: "10px",
              boxShadow: "0 2px 8px rgba(0,0,0,0.1)"
              }}>
              <img src={p.image} alt="" style={{ width: "100%", borderRadius: "8px" }} />

              <h4 style={{ margin: "10px 0" }}>{p.name}</h4>

              <p style={{ fontWeight: "bold" }}>₹{p.price}</p>

              {cart[p.name] ? (
  <div style={{
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    background: "#eee",
    borderRadius: "5px",
    padding: "5px"
  }}>
    <button onClick={() => removeFromCart(p)}>-</button>

    <span>{cart[p.name]}</span>

    <button onClick={() => addToCart(p)}>+</button>
  </div>
) : (
  <button
    onClick={() => addToCart(p)}
    style={{
      background: "#ff5252",
      color: "white",
      border: "none",
      padding: "8px",
      width: "100%",
      borderRadius: "5px",
      cursor: "pointer"
    }}
  >
    Add
  </button>
)}
            </div>
          ))}
        </div>
        <h3>🛒 Cart</h3>
        {Object.keys(cart).map((item) => (
          <div key={item}>
            {item} - {cart[item]}
          </div>
        ))}
        <h3>Customer Details</h3>
        <input placeholder="Name" onChange={(e) => setName(e.target.value)} />
        <br /><br />
        <input placeholder="Phone" onChange={(e) => setPhone(e.target.value)} />

        <br /><br />
        <button onClick={placeOrder}>Checkout</button>
      </div>

    </div>
  );
}

export default App;