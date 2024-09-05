import Navbar from '../components/Navbar';
import ProductCarousel from '../components/Carousel';
import Footer from '../components/Footer';

export default function HomePage() {
  return (
    <div className="wrapper">
      <Navbar />
      <div className="content">
        <ProductCarousel />
      </div>
      <Footer />
    </div>
  );
}
