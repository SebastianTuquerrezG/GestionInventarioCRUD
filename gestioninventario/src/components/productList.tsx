// components/ProductList.tsx
import { useState, useEffect } from "react";
import axios from "axios";

interface Product {
    id: number;
    name: string;
    category: string;
    quantity: number;
    price: number;
    description: string;
}

    export default function ProductList() {
    const [products, setProducts] = useState<Product[]>([]);

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        const response = await axios.get("/api/products");
        setProducts(response.data);
    };

    const handleDelete = async (id: number) => {
        await axios.delete(`/api/products/${id}`);
        fetchProducts(); // Recargar productos después de eliminar
    };

    const handleEdit = async (id: number) => {
        await axios.put(`/api/products/${id}`);
        fetchProducts(); // Recargar productos después de
    }

    return (
        <div>
        <h1>Product List</h1>
        <ul>
            {products.map((product) => (
            <li key={product.id}>
                {product.name} - {product.category} - {product.price} - {product.quantity}$
                <button onClick={() => handleEdit(product.id)}>Edit</button>
                <button onClick={() => handleDelete(product.id)}>Delete</button>
            </li>
            ))}
        </ul>
        </div>
    );
}
