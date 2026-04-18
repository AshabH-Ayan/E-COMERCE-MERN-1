import { useState } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router";
import axios from "axios";

function AddProduct() {
    const navigate = useNavigate();

    const [form, setForm] = useState({
        title: '',
        description: '',
        price: '',
        category: '',
        stock: '',
        image: ''
    });

    const [uploading, setUploading] = useState(false);

    const CLOUD_NAME = "dnzmpmebf";     // 🔁 replace
    const UPLOAD_PRESET = "ecom-preset";      // 🔁 replace

    // ✅ Input fields (mapped)
    const fields = [
        { name: "title", placeholder: "Product Title" },
        { name: "description", placeholder: "Description" },
        { name: "price", placeholder: "Price", type: "number" },
        { name: "category", placeholder: "Category" },
        { name: "stock", placeholder: "Stock", type: "number" },
    ];

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    // ✅ Image Upload
    const handleImageUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", UPLOAD_PRESET);

        try {
            setUploading(true);

            const res = await axios.post(
                `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
                formData
            );

            setForm(prev => ({
                ...prev,
                image: res.data.secure_url
            }));

        } catch (err) {
            console.log("FULL ERROR:", err.response?.data || err.message);
            alert("Upload failed - check console");
        } finally {
            setUploading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!form.image) {
            alert("Please upload an image first");
            return;
        }

        try {
            await api.post('/products/add', form);
            navigate('/admin/products');
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="max-w-xl mx-auto mt-10 bg-white p-6 shadow-lg rounded-lg">

            <h2 className="text-2xl font-bold mb-6 text-center">
                Add New Product
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">

                {/* ✅ Inputs */}
                {fields.map((field) => (
                    <div key={field.name}>
                        <label className="block text-sm font-medium mb-1">
                            {field.placeholder}
                        </label>
                        <input
                            type={field.type || "text"}
                            name={field.name}
                            value={form[field.name]}
                            onChange={handleChange}
                            placeholder={field.placeholder}
                            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400 appearance-none"
                        />
                    </div>
                ))}

                {/* ✅ Image Upload */}
                <div className="border p-4 rounded bg-gray-50">
                    <p className="font-medium mb-2">Upload Product Image</p>

                    {uploading ? (
                        <p className="text-blue-500">Uploading...</p>
                    ) : (
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageUpload}
                        />
                    )}

                    {form.image && (
                        <div className="mt-3">
                            <p className="text-green-600 text-sm mb-1">
                                Image uploaded
                            </p>
                            <img
                                src={form.image}
                                alt="preview"
                                className="w-32 h-32 object-cover rounded border"
                            />
                        </div>
                    )}
                </div>

                {/* ✅ Submit */}
                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition"
                >
                    Add Product
                </button>

            </form>
        </div>
    );
}

export default AddProduct;