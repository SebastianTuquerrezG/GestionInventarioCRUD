import Navbar from "../components/Navbar";
import ProductForm from "../components/productForm";
import ProductList from "../components/productList";
import Footer from "../components/Footer";

export default function ProductsPage() {
    return (
        <div>
        <Navbar />
        <main>
            <h2>Gestión de Productos</h2>
            <ProductForm />
            <ProductList />
        </main>
        <Footer />
        </div>
    );
}
