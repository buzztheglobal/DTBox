import React, { useEffect, useState } from "react";
import axios from "axios";

const MenuItems = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log("🔍 Fetching menu items...");
    axios.get("http://localhost:5000/api/menuitems")
      .then((res) => {
        console.log("✅ API Response:", res.data); // ✅ Check API data
        setMenuItems(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("❌ Error fetching menu items:", err);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <h2>Menu Items</h2>
      {menuItems.length === 0 ? (
        <p>⚠️ No data found</p>
      ) : (
        menuItems.map((item) => (
          <div key={item.id}>
            <h4>{item.title}</h4>
            <p>{item.seo_description || "❌ No description"}</p>
          </div>
        ))
      )}
    </div>
  );
};

export default MenuItems;
