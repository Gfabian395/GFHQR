import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { collection, getDocs, doc } from "firebase/firestore";
import { db } from "../firebaseConfig";
import QRGenerator from "../components/QRGenerator";
import "./ListaProductos.css";

export default function ListaProductos() {
  const { categoriaId } = useParams();
  const [productos, setProductos] = useState([]);
  const [categoriaNombre, setCategoriaNombre] = useState("");

  useEffect(() => {
    const obtenerProductos = async () => {
      const categoriaRef = doc(db, "categorias", categoriaId);
      const productosSnap = await getDocs(collection(categoriaRef, "productos"));
      const data = productosSnap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setProductos(data);
    };

    const obtenerCategoria = async () => {
      const snap = await getDocs(collection(db, "categorias"));
      const cat = snap.docs.find(d => d.id === categoriaId);
      if (cat) setCategoriaNombre(cat.data().nombre);
    };

    obtenerProductos();
    obtenerCategoria();
  }, [categoriaId]);

  return (
    <div className="productos-container">
      <Link to="/" className="volver-link">← Volver</Link>
      <h2 className="productos-title">{categoriaNombre || "Productos"}</h2>

      <div className="productos-grid">
        {productos.map(prod => (
          <div key={prod.id} className="producto-card">
            <img
              src={prod.imagenUrl}
              alt={prod.nombre}
              className="producto-img"
            />
            <h3 className="producto-nombre">{prod.nombre}</h3>
            <p className="producto-precio">💰 ${prod.precio}</p>
            <div className="producto-footer">
              <Link
                to={`/producto/${categoriaId}/${prod.id}`}
                className="detalle-link"
              >
                Ver detalle
              </Link>
              <QRGenerator categoriaId={categoriaId} productoId={prod.id} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
