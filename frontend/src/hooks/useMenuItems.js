import { useEffect, useState } from 'react';
import axios from 'axios';

const useMenuItems = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMenuItems = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/menuitems');
        setMenuItems(res.data);
      } catch (err) {
        setError(err.message || 'Failed to load');
      } finally {
        setLoading(false);
      }
    };
    fetchMenuItems();
  }, []);

  return { menuItems, loading, error };
};

export default useMenuItems;
