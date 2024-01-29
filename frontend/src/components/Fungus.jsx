import fungi from "../services/fungi";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function Fungus({ allFungi }) {
  const id = useParams().id;
  console.log(allFungi);
  const [currentFungus, setCurrentFungus] = useState();
  // allFungi.find((f) => f._id === id)

  useEffect(() => {
    fungi
      .getOneById(id)
      .then((foundFungus) => setCurrentFungus(foundFungus))
      .catch((err) => console.log(err));
  }, [id]);

  return (
    <>
      {currentFungus &&
        Object.values(currentFungus).map((value, index) => (
          <p key={index}>{value}</p>
        ))}
    </>
  );
}
