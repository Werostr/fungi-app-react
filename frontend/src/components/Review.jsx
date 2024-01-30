import React, { useState } from "react";
import reviews from "../services/reviews";
import { useParams } from "react-router-dom";

export default function Review({
  allFungi,
  updateFungus,
  currentFungus,
  review,
}) {
  const id = useParams().id;
  const reviewId = review._id;
  const [isDeleted, setIsDeleted] = useState(false);

  const handleDelete = async () => {
    await reviews.deleteOne(id, reviewId);
    const updatedFungus = {
      ...currentFungus,
      reviews: currentFungus.reviews.filter((e) => e._id !== reviewId),
    };

    updateFungus(
      allFungi.map((e) => {
        if (e._id === id) {
          return { ...updatedFungus };
        } else {
          return e;
        }
      })
    );
    setIsDeleted(true);
  };

  if (isDeleted) {
    return null;
  }

  return (
    <>
      <div>{review && review.comment}</div>
      <button onClick={handleDelete}>Delete</button>
    </>
  );
}
