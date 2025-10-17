import React from "react";
import QRCode from "react-qr-code";
import "./QRGenerator.css";

export default function QRGenerator({ categoriaId, productoId }) {
  // Detecta si estás en local o en deploy
  const baseUrl =
    window.location.hostname === "localhost"
      ? window.location.origin
      : "https://gfhqr.vercel.app/"; // <- reemplazar por tu URL final

  // URL del QR apuntando a la ruta de React Router
  const url = `${baseUrl}/categoria/${categoriaId}/producto/${productoId}`;

  return (
    <div className="qr-container">
      <QRCode value={url} size={120} />
    </div>
  );
}
