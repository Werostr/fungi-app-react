import reviews from "../services/reviews";
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import HeartRating from "./HeartRating";
import { Box, Grid, Typography, Button, TextField } from "@mui/material";

export default function ReviewForm({
  allFungi,
  currentFungus,
  updateFungi,
  handleLogout,
  user,
}) {
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

      const { savedReview, average } = await reviews.addNew(id, data);
      if (savedReview === "Forbidden" || savedReview === "Unauthorized") {
        handleLogout();
      } else {
        currentFungus.reviews.push(savedReview);
        currentFungus.average = average;
        updateFungi(
          allFungi.map((e) => {
            if (e._id === currentFungus._id) {
              return { ...currentFungus };
            } else {
              return e;
            }
          })
        );
      }

      // updateFungus({
      //   ...currentFungus,
      //   reviews: [...currentFungus.reviews, savedReview],
      //   average,
      // });
    } catch (error) {
      console.log("Error during creating review", error);
    }
    setComment("");
    setRating(0);
  };
  return (
    <>
      <Box sx={{ display: "flex", justifyContent: "center", width: "100%" }}>
        <Typography variant="h5" sx={{ marginBottom: 2 }}>
          Leave a review
        </Typography>
      </Box>

      <Grid
        component="form"
        onSubmit={handleAddReview}
        sx={{
          paddingBottom: 1,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
        }}
        container
      >
        <Grid
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
          item
          xs={12}
        >
          <HeartRating
            name="rating"
            disabled={user.id ? false : true}
            value={rating}
            getLabelText={(value) => `${value} Heart${value !== 1 ? "s" : ""}`}
            precision={0.5}
            onChange={(event, value) => setRating(value)}
          />
        </Grid>
        <Grid sx={{ marginY: 2 }} item xs={12}>
          <TextField
            required={user.id ? true : false}
            disabled={user.id ? false : true}
            label="Comment"
            name="comment"
            value={user.id ? comment : "Sign in to leave a review"}
            multiline
            rows={3}
            onChange={({ target }) => setComment(target.value)}
          />
        </Grid>
        <Grid item xs={12}>
          <Button
            sx={{
              color: "primary.dark",
              borderColor: "primary.light",
              "&:hover": {
                borderColor: "primary.dark",
              },
            }}
            type="submit"
            variant="outlined"
            disabled={user.id ? false : true}
          >
            Add
          </Button>
        </Grid>
      </Grid>
    </>
  );
}
