import React from 'react';
import Swal from 'sweetalert2';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ProductCard = ({ product, onEdit, onDelete }) => {
  const handleDelete = () => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'Do you really want to delete this product?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!',
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await onDelete(product._id);
          toast.success('Product deleted successfully!');
        } catch (error) {
          toast.error('Failed to delete product!');
        }
      }
    });
  };

  const backendUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000';

  return (
    <div className="bg-white rounded-2xl shadow p-4 mb-6 hover:shadow-lg transition-all duration-300 max-w-sm w-full">
      <img
        src={`${backendUrl}${product.image}`}
        alt={product.title}
        className="w-full h-40 object-cover mb-3 rounded"
      />
      <h3 className="text-lg font-semibold line-clamp-1">{product.title}</h3>
      <p className="text-gray-600 text-sm line-clamp-2 mb-1">{product.description}</p>
      <p className="font-bold text-green-600 mb-1">₹ {product.price}</p>
      <p className="text-sm text-gray-500">Category: {product.category}</p>
      <p className="text-sm text-gray-500">Quantity: {product.quantity}</p>

      <div className="flex flex-wrap gap-2 mt-4">
        <button
          onClick={() => {
            onEdit(product);
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600 transition-all"
        >
          Edit
        </button>

        <button
          onClick={handleDelete}
          className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 transition-all"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
