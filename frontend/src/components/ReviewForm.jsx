import reviews from "../services/reviews";
import React, { useState } from "react";
import { useParams } from "react-router-dom";

export default function ReviewForm({ allFungi, currentFungus, updateFungus }) {
  const id = useParams().id;
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(0);

  const handleAddReview = async (event) => {
    event.preventDefault();
    try {
      const data = {
        comment,
        rating,
      };

      const newReview = await reviews.addNew(id, data);
      currentFungus.reviews.push(newReview);
      updateFungus(
        allFungi.map((e) => {
          if (e._id === currentFungus._id) {
            return { ...currentFungus };
          } else {
            return e;
          }
        })
      );
    } catch (error) {
      console.log("Error during creating review", error);
    }
    setComment("");
    setRating(0);
  };
  return (
    <>
      <form onSubmit={handleAddReview}>
        <input
          type="text"
          placeholder="comment"
          name="comment"
          value={comment}
          onChange={({ target }) => setComment(target.value)}
        ></input>
        <input
          type="number"
          placeholder="rating"
          name="rating"
          value={rating}
          onChange={({ target }) => setRating(target.value)}
        ></input>
        <button>Add review</button>
      </form>
    </>
  );
}
