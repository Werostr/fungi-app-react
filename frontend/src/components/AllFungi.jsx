import fungi from "../services/fungi";
import React, { useEffect, useState } from "react";

export default function AllFungi({ allFungi }) {
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

  return (
    <>
      <div>
        {allFungi.map((f) => (
          <p key={f._id}>
            {f.variety} {f.description}
          </p>
        ))}
      </div>
    </>
  );
}
