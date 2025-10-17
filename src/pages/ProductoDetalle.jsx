import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebaseConfig";
import "./ProductoDetalle.css";

export default function ProductoDetalle() {
  const { categoriaId, productoId } = useParams();
  const [producto, setProducto] = useState(null);

  useEffect(() => {
    const obtenerProducto = async () => {
      const productoRef = doc(db, `categorias/${categoriaId}/productos/${productoId}`);
      const snap = await getDoc(productoRef);
      if (snap.exists()) setProducto(snap.data());
    };
    obtenerProducto();
  }, [categoriaId, productoId]);

  if (!producto) return <p className="loading-text">Cargando producto...</p>;

  return (
    <div className="producto-detalle-container">
      <Link to={`/categoria/${categoriaId}`} className="volver-link">
        ← Volver a productos
      </Link>
      <img
        src={producto.imagenUrl}
        alt={producto.nombre}
        className="producto-detalle-img"
      />
      <h2 className="producto-detalle-nombre">{producto.nombre}</h2>
      <p className="producto-detalle-precio">💰 Precio: ${producto.precio}</p>
      {producto.descripcion && (
        <p className="producto-detalle-desc">{producto.descripcion}</p>
      )}
      <p className="producto-detalle-id">ID: {productoId}</p>
    </div>
  );
}
