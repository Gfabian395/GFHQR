import React from "react";
import QRCode from "react-qr-code";
import "./QRGenerator.css";

export default function QRGenerator({ categoriaId, productoId }) {
  const url = `${window.location.origin}/producto/${categoriaId}/${productoId}`;

  return (
    <div className="qr-container">
      <QRCode value={url} size={120} />
    </div>
  );
}
