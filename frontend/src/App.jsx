import { useEffect, useState } from "react";

function App() {
  const [mensaje, setMensaje] = useState("");
  const url = "https://api.between-bytes.tech";

  const mostrarMensaje = async () => {
    try {
      const response = await fetch(url);
      const data = await response.json();
      setMensaje(data.mensaje);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    mostrarMensaje();
  }, []);

  return (
    <div
      style={{
        margin: "auto",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "90vh",
        width: "100%",
        fontSize: "1.5rem",
        fontWeight: "bold",
      }}
    >
      <p>
        {mensaje == ""
          ? "Esperando respuesta de API".toUpperCase()
          : mensaje.toUpperCase()}
      </p>
    </div>
  );
}

export default App;
