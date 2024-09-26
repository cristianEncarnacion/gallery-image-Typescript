import { useState, useEffect } from "react";
import { getData } from "./Data"; // Importa la función correctamente

function App() {
  type Info = {
    id: string;
    alt_description: string;
    description: string;
    urls: {
      small: string;
      full: string;
    };
  };

  const [info, setInfo] = useState<Info[]>([]);
  const [selectedImage, setSelectedImage] = useState<Info | null>(null);

  useEffect(() => {
    async function fetchData() {
      const results = await getData();
      setInfo(results);
    }

    fetchData();
  }, []);

  function handleClick(item: Info) {
    setSelectedImage(item);
  }

  function closeModal() {
    setSelectedImage(null);
  }

  return (
    <>
      <div className="bg-gradient-to-r from-blue-400 to-purple-600 min-h-screen p-4">
        <h1 className="text-3xl font-bold text-center text-white mb-6">
          Galería de Imágenes Naturales
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {info.map((item: Info) => (
            <div key={item.id} className="relative">
              <img
                src={item.urls.small}
                alt={item.alt_description}
                className="w-full h-auto rounded-lg shadow-md transition-transform transform hover:scale-105 cursor-pointer"
                onClick={() => handleClick(item)}
              />
            </div>
          ))}
        </div>

        {selectedImage && (
          <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50">
            <div className="bg-white rounded-lg p-4 max-w-md w-full max-h-[80vh] overflow-y-auto">
              <img
                src={selectedImage.urls.small}
                alt={selectedImage.alt_description}
                className="w-full h-auto rounded-lg shadow-lg"
              />
              <p className="text-black mt-2">
                {selectedImage.description || "Sin descripción"}
              </p>
              <button
                onClick={closeModal}
                className="mt-2 text-white bg-red-500 hover:bg-red-700 rounded px-3 py-1"
              >
                Cerrar
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default App;
