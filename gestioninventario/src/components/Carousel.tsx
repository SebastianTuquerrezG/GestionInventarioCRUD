import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import Image from "next/image";
import styles from "./ProductCarousel.module.css"; // Archivo CSS para los estilos personalizados

interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  image: string;
}

const products: Product[] = [
  {
    id: 1,
    name: "Tarjeta Grafica MSI",
    category: "Tarjeta Grafica",
    price: 200.99,
    image: "/utils/grafica.png",
  },
  {
    id: 2,
    name: "Memoria RAM TridenZ",
    category: "Memoria RAM",
    price: 75.99,
    image: "/utils/ram.png",
  },
  {
    id: 3,
    name: "Refrigeracion Liquida Cougar",
    category: "Refrigeracion Liquida",
    price: 80.99,
    image: "/utils/refrigeracion.png",
  },
];

export default function ProductCarousel() {
  return (
    <div className={styles.carouselContainer}>
      <Carousel autoPlay infiniteLoop showThumbs={false} showStatus={false}>
        {products.map((product) => (
          <div key={product.id} className={styles.carouselItem}>
            <Image
              src={product.image}
              alt={product.name}
              width={1500} // Estos valores se adaptarán al tamaño del contenedor
              height={1100}
              className={styles.productImage}
            />
            <p className={styles.legend}>
              {product.name} - ${product.price}
            </p>
          </div>
        ))}
      </Carousel>
    </div>
  );
}

