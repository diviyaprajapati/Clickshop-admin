import { useEffect, useState } from 'react';
import API from '../src/api';
import ProductCard from './ProductCard';
import ProductForm from './ProductForm';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [selected, setSelected] = useState(null);

  const fetchProducts = async () => {
    const res = await API.get('/');
    setProducts(res.data);
  };

  const handleDelete = async (id) => {
    await API.delete(`/${id}`);
    fetchProducts();
  };

  const clearForm = () => setSelected(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="max-w-6xl mx-auto px-4">
      <h2 className="text-xl font-semibold mb-2">{selected ? 'Update' : 'Add'} Product</h2>
      <ProductForm selected={selected} refresh={fetchProducts} clear={clearForm} />

      <h2 className="text-xl font-semibold mt-10 mb-4">All Products</h2>

      {/* Grid Layout for Horizontal Cards */}
      {products.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {products.map((product) => (
            <ProductCard
              key={product._id}
              product={product}
              onEdit={setSelected}
              onDelete={handleDelete}
              onAddToCart={() => console.log('Add to Cart:', product)}
              onView={() => console.log('View Product:', product)}
            />
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500">No products found.</p>
      )}
    </div>
  );
};

export default ProductList;
