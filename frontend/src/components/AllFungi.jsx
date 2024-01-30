import { useNavigate } from "react-router-dom";
import fungi from "../services/fungi";
import React, { useEffect, useState } from "react";

export default function AllFungi({ allFungi }) {
  const navigate = useNavigate();
  //const [allFungi, setAllFungi] = useState([]);

  // useEffect(() => {
  //   fungi
  //     .getAll()
  //     .then((foundFungi) => {
  //       setAllFungi(foundFungi);
  //     })
  //     .catch((error) => {
  //       console.error("Błąd pobierania danych:", error);
  //     });
  // }, []);
  const navigateToFungus = (id) => {
    navigate(`/fungi/${id}`);
  };

  return (
    <>
      <div>
        {allFungi.map((f) => (
          <div key={f._id}>
            <p>
              {f.variety} {f.description}
            </p>
            <button onClick={() => navigateToFungus(f._id)}>Show</button>
          </div>
        ))}
      </div>
    </>
  );
}
