import React from 'react';
import { ShoppingCart, Eye } from 'lucide-react';

const Card = ({ image, title, description, price, category }) => {
  // Optional: Add button handlers if needed

  return (
    <div className="w-full max-w-sm bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300">
      {/* Image */}
      <div className="relative overflow-hidden">
        <img
          src={image?.startsWith('http') || image?.startsWith('blob') ? image : `http://localhost:5000${image}`}
          alt={title}
          className="w-full h-40 object-cover"
        />

        {/* Category Badge */}
        {category && (
          <div className="absolute top-3 left-3 bg-blue-600 text-white px-3 py-1 rounded-full text-[10px] sm:text-xs font-semibold">
            {category}
          </div>
        )}
      </div>

      {/* Product Info */}
      <div className="p-4">
        <h2 className="text-base sm:text-xl font-semibold text-gray-800 mb-2 line-clamp-1">{title}</h2>
        <p className="text-xs sm:text-sm text-gray-600 mb-3 line-clamp-2">{description}</p>

        {price && (
          <div className="flex items-center gap-2 mb-4">
            <p className="text-base sm:text-xl font-bold text-green-600">₹{price}</p>
            <p className="text-xs sm:text-sm text-gray-500 line-through">₹{Math.floor(price * 1.2)}</p>
            <span className="text-[10px] sm:text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full font-semibold">
              17% OFF
            </span>
          </div>
        )}

        {/* Buttons */}
        <div className="flex gap-2">
          <button className="flex-1 flex items-center justify-center gap-2 bg-blue-600 text-white px-3 py-2 text-xs sm:text-sm rounded-lg hover:bg-blue-700 transition-all duration-300">
            <ShoppingCart size={16} /> Add to Cart
          </button>

          <button className="flex-1 flex items-center justify-center gap-2 border-2 border-blue-600 text-blue-600 px-3 py-2 text-xs sm:text-sm rounded-lg hover:bg-blue-600 hover:text-white transition-all duration-300">
            <Eye size={16} /> View
          </button>
        </div>
      </div>
    </div>
  );
};

export default Card;
