import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ListaCategorias from "./pages/ListaCategorias";
import ListaProductos from "./pages/ListaProductos";
import ProductoDetalle from "./pages/ProductoDetalle";

export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50 text-gray-900 p-6">
        <h1 className="text-2xl font-bold mb-4 text-center">🛠️ AutoQR - Ferreira Hogar</h1>
        <Routes>
          <Route path="/" element={<ListaCategorias />} />
          <Route path="/categoria/:categoriaId" element={<ListaProductos />} />
          <Route path="/producto/:categoriaId/:productoId" element={<ProductoDetalle />} />
        </Routes>
      </div>
    </Router>
  );
}
