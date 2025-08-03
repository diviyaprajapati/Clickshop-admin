import React, { useEffect, useState } from 'react';
import API from '../api';
import ProductForm from '../ProductForm';
import ProductCard from '../ProductCard';

const Dashboard = () => {
  const [products, setProducts] = useState([]);
  const [selected, setSelected] = useState(null); // 🟡 For edit
  const [refreshKey, setRefreshKey] = useState(0); // 🔁 trigger refresh

  const fetchProducts = async () => {
    try {
      const res = await API.get('/');
      setProducts(res.data);
    } catch (err) {
      console.error('Error fetching products:', err);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [refreshKey]);

  const handleDelete = async (id) => {
    await API.delete(`/${id}`);
    setRefreshKey(prev => prev + 1);
  };

  const clearSelected = () => {
    setSelected(null);
  };

  return (
    <div className="p-4">
      <ProductForm
        selected={selected}
        refresh={() => setRefreshKey(prev => prev + 1)}
        clear={clearSelected}
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
        {products.map((product) => (
          <ProductCard
            key={product._id}
            product={product}
            onEdit={setSelected} // 👈 When Edit is clicked
            onDelete={handleDelete}
          />
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
