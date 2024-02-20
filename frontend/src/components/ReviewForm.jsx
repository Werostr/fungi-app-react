import reviews from "../services/reviews";
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import HeartRating from "./HeartRating";
import { Box, Grid, Typography, Button, TextField } from "@mui/material";

export default function ReviewForm({
  allFungi,
  currentFungus,
  updateFungus,
  updateFungi,
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

      <form
        style={{
          width: "100%",
        }}
        onSubmit={handleAddReview}
      >
        <Grid
          sx={{
            paddingBottom: 1,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
          container
          spacing={2}
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
              value={rating}
              getLabelText={(value) =>
                `${value} Heart${value !== 1 ? "s" : ""}`
              }
              precision={0.5}
              onChange={(event, value) => setRating(value)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Comment"
              name="comment"
              value={comment}
              multiline
              rows={3}
              onChange={({ target }) => setComment(target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <Button
              sx={{
                color: "#ff6d75",
                borderColor: "#ff6d75",
                "&:hover": {
                  borderColor: "#ff8c94",
                },
              }}
              type="submit"
              variant="outlined"
            >
              Add
            </Button>
          </Grid>
        </Grid>
      </form>

      {/* // <Card sx={{ padding: 2 }}>
    //   <form onSubmit={handleAddReview}>
    //     <input
    //       type="text"
    //       placeholder="comment"
    //       name="comment"
    //       value={comment}
    //       onChange={({ target }) => setComment(target.value)}
    //     ></input>
    //     <input
    //       type="number"
    //       placeholder="rating"
    //       name="rating"
    //       value={rating}
    //       onChange={({ target }) => setRating(target.value)}
    //     ></input>
    //     <button>Add review</button>
    //   </form>
    // </Card> */}
    </>
  );
}
