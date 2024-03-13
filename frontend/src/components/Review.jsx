import React, { useState } from "react";
import reviews from "../services/reviews";
import { useParams } from "react-router-dom";
import { Grid, IconButton, Typography, Rating, Card } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import HeartRating from "./HeartRating";

export default function Review({
  allFungi,
  updateFungi,
  currentFungus,
  review,
  handleLogout,
  user,
}) {
  const id = useParams().id;
  const reviewId = review._id;

  const handleDelete = async () => {
    const average = await reviews.deleteOne(id, reviewId);
    console.log(average);
    if (average === "Forbidden" || average === "Unauthorized") {
      handleLogout();
    } else {
      const updatedFungus = {
        ...currentFungus,
        reviews: currentFungus.reviews.filter((e) => e._id !== reviewId),
        average,
      };

      updateFungi(
        allFungi.map((e) => {
          if (e._id === id) {
            return { ...updatedFungus };
          } else {
            return e;
          }
        })
      );
    }
  };

  return (
    <Grid
      component={Card}
      sx={{
        marginY: 3,
        backgroundColor: "secondary.main",
        borderRadius: 2,
      }}
      container
    >
      <Grid item xs={9}>
        <Grid
          sx={{ display: "flex", justifyContent: "start", padding: 1 }}
          item
          xs={12}
        >
          <HeartRating
            name="rating"
            value={review.rating}
            precision={0.5}
            disabled
          />
        </Grid>
        <Grid item xs={12}>
          <Typography
            sx={{ display: "flex", justifyContent: "start", paddingX: 1 }}
          >
            {review.author ? review.author.username : "author"}
          </Typography>
        </Grid>
        <Grid
          sx={{
            display: "flex",
            justifyContent: "start",
            textAlign: "start",
            marginTop: 1,
            padding: 1,
          }}
          item
          xs={12}
        >
          <Typography
            sx={{
              borderTop: "1px solid #ff6d75",
              wordWrap: "break-word",
              overflowWrap: "break-word",
              inlineSize: "90%",
              padding: 3,
              paddingBottom: 4,
              paddingLeft: 1,
            }}
          >
            {review.comment}
          </Typography>
        </Grid>
      </Grid>
      <Grid
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "start",
          marginTop: 2,
        }}
        item
        xs={3}
      >
        {user.id === review.author._id && (
          <IconButton aria-label="delete" onClick={handleDelete}>
            <DeleteIcon />
          </IconButton>
        )}
      </Grid>
    </Grid>
  );
}
