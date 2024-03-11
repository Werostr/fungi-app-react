import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import Masonry from "@mui/lab/Masonry";
import {
  Button,
  CircularProgress,
  Fade,
  Typography,
  Grid,
  Box,
} from "@mui/material";
import HeartRating from "./HeartRating";

export default function UserFungi({ user }) {
  const navigate = useNavigate();

  const navigateToFungus = (id) => {
    navigate(`/fungi/${id}`);
  };

  return (
    <Box
      sx={{
        padding: { xs: 2, sm: 4, md: 6, lg: 10 },
        display: "flex",
        alignItems: "center",
      }}
    >
      <Grid
        container
        sx={{
          width: "100%",
          minHeight: 829,
          marginTop: 5,
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Masonry columns={{ xs: 1, sm: 1, md: 2, lg: 3, xl: 4 }} spacing={3}>
          {user.fungi.map((fungus, index) => (
            <Fade in={true} timeout={1000 + index * 300} key={fungus._id}>
              <Box
                onClick={() => navigateToFungus(fungus._id)}
                sx={{
                  cursor: "pointer",
                  transition: "box-shadow 1s, transform 1s",
                  borderRadius: "20px",
                  "&:hover": {
                    boxShadow: "0px 0px 15px 0px rgba(0,0,0,0.4)",
                    transform: "scale(1.04)",
                  },
                }}
              >
                <Box
                  sx={{
                    borderRadius: "20px 20px 0px 0px",
                    backgroundColor: "rgb(255, 226, 216, 0.5)",
                    display: "flex",
                    justifyContent: "space-between",
                    padding: 2,
                  }}
                >
                  <HeartRating
                    name="rating"
                    value={fungus.average}
                    precision={0.5}
                    readOnly
                  />
                  <Typography>{fungus.variety}</Typography>
                </Box>
                <img
                  srcSet={`${fungus.images[0].url}?w=162&auto=format&dpr=2 2x`}
                  src={`${fungus.images[0].url}?w=162&auto=format`}
                  alt={fungus.variety}
                  loading="lazy"
                  style={{
                    borderRadius: "2px 2px 20px 20px",
                    display: "block",
                    width: "100%",
                    backgroundColor: "rgb(255, 226, 216, 0.5)",
                  }}
                />
              </Box>
            </Fade>
          ))}
        </Masonry>
      </Grid>
    </Box>
  );
}
