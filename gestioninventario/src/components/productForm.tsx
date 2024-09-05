// components/ProductForm.tsx
import { useState } from 'react';
import axios from 'axios';

interface ProductFormProps {
    product?: {
        id: number;
        name: string;
        category: string;
        quantity: number;
        price: number;
        description: string;
    };
}

export default function ProductForm({ product }: ProductFormProps) {
    const [name, setName] = useState(product?.name || '');
    const [category, setCategory] = useState(product?.category || '');
    const [quantity, setQuantity] = useState(product?.quantity || 0);
    const [price, setPrice] = useState(product?.price || 0);
    const [description, setDescription] = useState(product?.description || '');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const data = { name, category, quantity, price, description };

        if (product) {
        // Editar producto
        await axios.put(`/api/products/${product.id}`, data);
        } else {
        // Crear nuevo producto
        await axios.post('/api/products/create', data);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
        <input
            type="text"
            value={name}
            onChange={e => setName(e.target.value)}
            placeholder="Name"
        />
        <input
            type="text"
            value={category}
            onChange={e => setCategory(e.target.value)}
            placeholder="Category"
        />
        <input
            type="number"
            value={quantity}
            onChange={e => setQuantity(Number(e.target.value))}
            placeholder="Quantity"
        />
        <input
            type="number"
            value={price}
            onChange={e => setPrice(Number(e.target.value))}
            placeholder="Price"
        />
        <textarea
            value={description}
            onChange={e => setDescription(e.target.value)}
            placeholder="Description"
        />
        <button type="submit">Submit</button>
        </form>
    );
}
