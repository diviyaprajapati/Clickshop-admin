import { useState, useEffect } from 'react';
import API from '../src/api';
import { toast } from 'react-toastify';
import Card from './card'; // ✅ Card component wapas

const ProductForm = ({ fetchProducts, selected, setSelected }) => {
  const [form, setForm] = useState({
    id: '',
    title: '',
    description: '',
    price: '',
    quantity: '',
    category: '',
  });

  const [imageFile, setImageFile] = useState(null);
  const [preview, setPreview] = useState('');
  const [fileInputKey, setFileInputKey] = useState(Date.now());

  useEffect(() => {
    if (selected) {
      const { id, title, description, price, quantity, category, image } = selected;
      setForm({ id, title, description, price, quantity, category });
      setPreview(image || '');
      setImageFile(null);
      setFileInputKey(Date.now());
    }
  }, [selected]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setImageFile(file);
    if (file) {
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    Object.entries(form).forEach(([key, value]) => data.append(key, value));
    if (imageFile) {
      data.append('image', imageFile);
    }

    try {
      if (selected && selected._id) {
        await API.put(`/${selected._id}`, data, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
        toast.success('✅ Product updated successfully!');
      } else {
        await API.post('/', data, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
        toast.success('✅ Product added successfully!');
      }

      setForm({
        id: '',
        title: '',
        description: '',
        price: '',
        quantity: '',
        category: '',
      });
      setImageFile(null);
      setPreview('');
      setFileInputKey(Date.now());
      setSelected(null);
      fetchProducts();
    } catch (error) {
      console.error('❌ Submit Error:', error);
      toast.error('❌ Failed to save product. Please try again.');
    }
  };

  return (
    <div className="mb-10 max-w-4xl mx-auto">
      {/* ✅ Live Card Preview */}
      <div className="mb-6">
         <h2 className="text-4xl font-semibold mb-3 text-blue-600 text-center">Admin Panal</h2>
        <h2 className="text-xl font-semibold mb-3 text-center">Live Product Preview</h2>
        <div className="flex justify-center">
          <Card {...form} image={preview} />
        </div>
      </div>

      {/* ✅ Product Form */}
      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-white p-6 rounded shadow"
        encType="multipart/form-data"
      >
        <input
          name="id"
          value={form.id}
          onChange={handleChange}
          placeholder="ID"
          className="p-2 border rounded w-full"
          required
        />

        <div className="w-full">
          <label className="block bg-purple-600 text-white text-center py-2 rounded cursor-pointer hover:bg-purple-700 transition">
            {imageFile ? imageFile.name : "Choose Image"}
            <input
              key={fileInputKey}
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
              required={!selected}
            />
          </label>
        </div>

        <input
          name="title"
          value={form.title}
          onChange={handleChange}
          placeholder="Title"
          className="p-2 border rounded w-full"
          required
        />

        <input
          name="description"
          value={form.description}
          onChange={handleChange}
          placeholder="Description"
          className="p-2 border rounded w-full"
          required
        />

        <input
          name="price"
          value={form.price}
          onChange={handleChange}
          placeholder="Price"
          className="p-2 border rounded w-full"
          required
        />

        <input
          name="quantity"
          value={form.quantity}
          onChange={handleChange}
          placeholder="Quantity"
          className="p-2 border rounded w-full"
          required
        />

        <select
          name="category"
          value={form.category}
          onChange={handleChange}
          className="p-2 border rounded w-full"
          required
        >
          <option value="">Select Category</option>
          <option value="Fashion">Fashion</option>
          <option value="Home & Living">Home & Living</option>
          <option value="Sports">Sports</option>
          <option value="Books">Books</option>
          <option value="Beauty">Beauty</option>
          <option value="Toys">Toys</option>
          <option value="Clothing">Clothing</option>
          <option value="Mobile Accessories">Mobile Accessories</option>
          <option value="Electronics">Electronics</option>
          <option value="Groceries">Groceries</option>
        </select>

        <button
          type="submit"
          className="md:col-span-2 bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        >
          {selected ? 'Update' : 'Add'} Product
        </button>
      </form>
    </div>
  );
};

export default ProductForm;
