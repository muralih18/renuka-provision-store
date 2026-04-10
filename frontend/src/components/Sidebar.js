import React from "react";

const categories = [
  "All",
  "Oils",
  "Essentials",
  "Dry Fruits",
  "Flours"
];

function Sidebar({ setCategory, selected }) {
  return (
    <div style={{
      width: "25%",
      backgroundColor: "#f4f4f4",
      padding: "10px",
      height: "100vh"
    }}>
      <h3>Categories</h3>

      {categories.map((cat) => (
        <div
          key={cat}
          onClick={() => setCategory(cat)}
          style={{
            padding: "10px",
            margin: "5px 0",
            cursor: "pointer",
            backgroundColor: selected === cat ? "#6a1b9a" : "#fff",
            color: selected === cat ? "#fff" : "#000",
            borderRadius: "5px"
          }}
        >
          {cat}
        </div>
      ))}
    </div>
  );
}

export default Sidebar;