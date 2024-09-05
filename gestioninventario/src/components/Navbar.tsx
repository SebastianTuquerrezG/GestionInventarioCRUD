import Link from "next/link";
import { FaStore } from "react-icons/fa"; // Importa un icono de tienda
import styles from "./Navbar.module.css"; // Estilos personalizados

export default function Navbar() {
  return (
    <nav className={styles.navbar}>
      <div className={styles.navLeft}>
        {/* Envolver el ícono y el título 'Mi Tienda' en el mismo contenedor */}
        <Link href="/" className={styles.navTitleLink}>
          <div className={styles.titleContainer}>
            <FaStore className={styles.icon} /> {/* Ícono de tienda */}
            <b>
              <h1 className={styles.navTitle}>Mi Tienda</h1>
            </b>
          </div>
        </Link>
      </div>
      <div className={styles.navRight}>
        <Link href="/products">
          <button className={styles.navButton}>Gestionar Productos</button>
        </Link>
        <Link href="/movements">
          <button className={styles.navButton}>Gestionar Movimientos</button>
        </Link>
      </div>
    </nav>
  );
}
