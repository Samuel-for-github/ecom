"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface Product {
    _id: string;
    name: string;
    description: string;
    price: number;
    stock: number;
    image: string;
}

export default function Dashboard() {
    const { data: session, status } = useSession();
    const router = useRouter();
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [isEditing, setIsEditing] = useState(false);
    const [currentProduct, setCurrentProduct] = useState<Partial<Product>>({
        name: "",
        description: "",
        price: 0,
        stock: 0,
        image: "",
    });

    useEffect(() => {
        if (status === "unauthenticated") {
            router.push("/login");
        } else if (status === "authenticated") {
            fetchProducts();
        }
    }, [status, router]);

    const fetchProducts = async () => {
        setLoading(true);
        try {
            const res = await fetch("/api/products");
            const data = await res.json();
            setProducts(data);
        } catch (error) {
            console.error("Failed to fetch products", error);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const method = currentProduct._id ? "PUT" : "POST";
        const url = currentProduct._id ? `/api/products/${currentProduct._id}` : "/api/products";

        try {
            const { _id, ...updateData } = currentProduct;

            const res = await fetch(url, {
                method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(method === "PUT" ? updateData : currentProduct),
            });

            if (res.ok) {
                setIsEditing(false);
                setCurrentProduct({ name: "", description: "", price: 0, stock: 0, image: "" });
                fetchProducts();
            }
        } catch (error) {
            console.error("Failed to save product", error);
        }
    };

    const handleEdit = (product: Product) => {
        setCurrentProduct(product);
        setIsEditing(true);
    };

    const handleDelete = async (id: string) => {
        if (confirm("Are you sure you want to delete this product?")) {
            try {
                const res = await fetch(`/api/products/${id}`, {
                    method: "DELETE",
                });
                if (res.ok) {
                    fetchProducts();
                }
            } catch (error) {
                console.error("Failed to delete product", error);
            }
        }
    };

    if (status === "loading" || loading) {
        return <div className="flex justify-center items-center min-h-screen">Loading...</div>;
    }

    return (
        <div className="min-h-screen bg-gray-50 p-8">
            <div className="max-w-6xl mx-auto">
                <div className="flex justify-between items-center mb-8">
                    <div>
                        <Link href="/" className="text-2xl font-black tracking-tighter text-blue-600 mb-2 block">E-STORE</Link>
                        <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
                    </div>
                    <button
                        onClick={() => {
                            setIsEditing(true);
                            setCurrentProduct({ name: "", description: "", price: 0, stock: 0, image: "" });
                        }}
                        className="px-6 py-3 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition shadow-lg shadow-blue-200"
                    >
                        Add New Product
                    </button>
                </div>

                {isEditing && (
                    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                        <div className="bg-white p-8 rounded-3xl w-full max-w-md shadow-2xl">
                            <h2 className="text-2xl font-bold mb-6">{currentProduct._id ? "Edit Product" : "Add Product"}</h2>
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-1">Product Name</label>
                                    <input
                                        type="text"
                                        required
                                        value={currentProduct.name}
                                        onChange={(e) => setCurrentProduct({ ...currentProduct, name: e.target.value })}
                                        className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none text-black"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-1">Description</label>
                                    <textarea
                                        required
                                        value={currentProduct.description}
                                        onChange={(e) => setCurrentProduct({ ...currentProduct, description: e.target.value })}
                                        className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none text-black"
                                    />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-1">Price</label>
                                        <input
                                            type="number"
                                            required
                                            value={currentProduct.price}
                                            onChange={(e) => setCurrentProduct({ ...currentProduct, price: Number(e.target.value) })}
                                            className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none text-black"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-1">Stock</label>
                                        <input
                                            type="number"
                                            required
                                            value={currentProduct.stock}
                                            onChange={(e) => setCurrentProduct({ ...currentProduct, stock: Number(e.target.value) })}
                                            className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none text-black"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-1">Image URL</label>
                                    <input
                                        type="text"
                                        required
                                        value={currentProduct.image}
                                        onChange={(e) => setCurrentProduct({ ...currentProduct, image: e.target.value })}
                                        className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none text-black"
                                    />
                                </div>
                                <div className="flex gap-4 mt-6">
                                    <button
                                        type="submit"
                                        className="flex-1 py-3 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition shadow-lg shadow-blue-100"
                                    >
                                        {currentProduct._id ? "Update" : "Create"}
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setIsEditing(false)}
                                        className="flex-1 py-3 bg-gray-100 text-gray-700 rounded-xl font-bold hover:bg-gray-200 transition"
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}

                <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
                    <table className="w-full text-left">
                        <thead className="bg-gray-50 border-b border-gray-100">
                            <tr>
                                <th className="px-6 py-4 text-sm font-bold text-gray-700">Product</th>
                                <th className="px-6 py-4 text-sm font-bold text-gray-700">Price</th>
                                <th className="px-6 py-4 text-sm font-bold text-gray-700">Stock</th>
                                <th className="px-6 py-4 text-sm font-bold text-gray-700 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {products.map((product) => (
                                <tr key={product._id} className="hover:bg-gray-50/50 transition">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-4">
                                            <div className="w-12 h-12 bg-gray-100 rounded-xl overflow-hidden flex-shrink-0 relative">
                                                {product.image ? (
                                                    <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                                                ) : (
                                                    <div className="w-full h-full flex items-center justify-center text-[10px] text-gray-400 font-bold uppercase p-1 text-center">
                                                        No Img
                                                    </div>
                                                )}
                                            </div>
                                            <div>
                                                <div className="font-bold text-gray-900">{product.name}</div>
                                                <div className="text-xs text-gray-500 line-clamp-1">{product.description}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 font-semibold text-gray-900">₹{product.price}</td>
                                    <td className="px-6 py-4 text-gray-600">{product.stock}</td>
                                    <td className="px-6 py-4 text-right">
                                        <button
                                            onClick={() => handleEdit(product)}
                                            className="text-blue-600 hover:text-blue-800 font-bold mr-4 text-sm"
                                        >
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => handleDelete(product._id)}
                                            className="text-red-600 hover:text-red-800 font-bold text-sm"
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
