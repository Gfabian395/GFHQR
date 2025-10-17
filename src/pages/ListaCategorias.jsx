import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebaseConfig";
import { Link } from "react-router-dom";
import "./ListaCategorias.css";

export default function ListaCategorias() {
  const [categorias, setCategorias] = useState([]);

  useEffect(() => {
    const obtenerCategorias = async () => {
      const snapshot = await getDocs(collection(db, "categorias"));
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setCategorias(data);
    };
    obtenerCategorias();
  }, []);

  return (
    <div className="categorias-grid">
      {categorias.map(cat => (
        <Link
          key={cat.id}
          to={`/categoria/${cat.id}`}
          className="categoria-card"
        >
          <div className="categoria-img-wrapper">
            <img
              src={cat.imagenUrl}
              alt={cat.nombre}
              className="categoria-img"
            />
          </div>
          <h2 className="categoria-title">{cat.nombre}</h2>
        </Link>
      ))}
    </div>
  );
}
