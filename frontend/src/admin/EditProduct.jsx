import { useState, useEffect } from 'react';
import api from '../api/axios';
import { useNavigate, useParams } from 'react-router';



const EditProduct = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [form, setForm] = useState({
        title: "",
        description: '',
        price: '',
        image: '',
        category: '',
        stock: '',
    });

    const allowedFields = ['title', 'description', 'price', 'image', 'category', 'stock'];

    const loadProduct = async () => {
        try {
            const response = await api.get(`/products`);
            const product = response.data.find((p) => p._id === (id));
            setForm(product);

        } catch (error) {
            console.error("Error loading product:", error);
        }
    }

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    }

      
    useEffect(() => {
        loadProduct();
    }, []);

    
    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
            await api.put(`/products/update/${id}`, form);
            alert("Product updated successfully");
            navigate('/admin/products');
        }catch (error) {
            console.error("error:",error);
        }
    }


  
  
  
  return (
    <div className="max-w-lg mx-auto mt-10 bg-white p-6 shadow rounded">
      <h2 className="text-xl font-bold mb-4">Edit Product</h2>

      <form className="space-y-3" onSubmit={handleSubmit}>
        {allowedFields.map((key) => (
          <input
            key={key}
            name={key}
            value={form[key]}
            onChange={handleChange}
            placeholder={key}
            className="w-full border px-3 py-2 rounded"
          />
        ))}

        <button className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition">
          Update Product
        </button>
      </form>
    </div>
  );
}

export default EditProduct;