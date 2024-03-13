import { useNavigate } from "react-router-dom";
import React from "react";
import Masonry from "@mui/lab/Masonry";
import { Fade, Typography, Grid, Box, Container } from "@mui/material";
import HeartRating from "./HeartRating";

export default function UserFungi({ user }) {
  const navigate = useNavigate();

  const navigateToFungus = (id) => {
    navigate(`/fungi/${id}`);
  };

  return (
    <Container
      maxWidth="xl"
      sx={{
        paddingX: { xs: 5, sm: 7, md: 5, lg: 3, xl: 0 },
      }}
    >
      <Box
        sx={{
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
      </Box>
    </Container>
  );
}
