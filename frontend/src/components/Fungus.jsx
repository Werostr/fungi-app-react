import fungi from "../services/fungi";
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ReviewForm from "./ReviewForm";
import Review from "./Review";

export default function Fungus({ allFungi, updateFungus }) {
  const id = useParams().id;
  const navigate = useNavigate();
  const [currentFungus, setCurrentFungus] = useState({});
  // allFungi.find((f) => f._id === id)

  useEffect(() => {
    fungi
      .getOneById(id)
      .then((foundFungus) => setCurrentFungus(foundFungus))
      .catch((err) => console.log(err));
  }, [id]);

  const handleDelete = async () => {
    await fungi.deleteOne(id);
    const updatedCases = allFungi.filter((c) => c._id !== id);
    updateFungus(updatedCases);
    navigate("/fungi");
  };

  return (
    <>
      <p>{currentFungus.variety}</p>
      {currentFungus.reviews &&
        currentFungus.reviews.map((review) => {
          return (
            <Review
              allFungi={allFungi}
              updateFungus={updateFungus}
              currentFungus={currentFungus}
              review={review}
            />
          );
        })}
      <ReviewForm
        allFungi={allFungi}
        currentFungus={currentFungus}
        updateFungus={updateFungus}
      />
      <button
        onClick={() => {
          navigate(`/fungi/${id}/edit`);
        }}
      >
        Edit
      </button>
      <button
        onClick={() => {
          navigate(`/fungi`);
        }}
      >
        Back
      </button>
      <button onClick={handleDelete}>Delete</button>
    </>
  );
}
