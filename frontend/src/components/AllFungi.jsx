import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import React, { useEffect, useState } from "react";
import Masonry from "@mui/lab/Masonry";
import { Button, CircularProgress, Typography } from "@mui/material";
import HeartRating from "./HeartRating";

export default function AllFungi({ allFungi }) {
  const [sortedFungi, setSortedFungi] = useState(allFungi);
  const [sortOrder, setSortOrder] = useState("");
  const [isLoaded, setIsLoaded] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setIsLoaded(false);
    setSortedFungi(
      allFungi.slice().sort((a, b) => {
        if (sortOrder === "asc") {
          return a.average - b.average;
        } else if (sortOrder === "desc") {
          return b.average - a.average;
        }
      })
    );
    setIsLoaded(true);
  }, [allFungi, sortOrder]);

  const handleSort = () => {
    const newSortOrder = sortOrder === "asc" ? "desc" : "asc";
    setSortOrder(newSortOrder);
  };

  const navigateToFungus = (id) => {
    navigate(`/fungi/${id}`);
  };

  return (
    <>
      <Box
        sx={{
          padding: { xs: 2, sm: 4, md: 6, lg: 10 },
        }}
      >
        <Box sx={{ width: "100%", minHeight: 829, marginTop: 5 }}>
          <Button
            sx={{
              backgroundColor: "#ff6d75",
              "&:hover": {
                backgroundColor: "#ff8c94",
              },
              marginBottom: 5,
            }}
            onClick={handleSort}
            variant="contained"
          >
            sort {sortOrder === "asc" ? "descending" : "ascending"} by rating
          </Button>
          {isLoaded ? (
            <Masonry
              columns={{ xs: 1, sm: 1, md: 2, lg: 3, xl: 4 }}
              spacing={5}
            >
              {sortedFungi.map((fungus) => (
                <Box
                  key={fungus._id}
                  onClick={() => navigateToFungus(fungus._id)}
                  sx={{
                    cursor: "pointer",
                    transition: "box-shadow 0.3s, transform 0.3s",
                    "&:hover": {
                      boxShadow: "0px 0px 15px 0px rgba(0,0,0,0.4)",
                      transform: "scale(1.03)",
                    },
                  }}
                >
                  <Box
                    sx={{
                      borderRadius: 1,
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
                      borderBottomLeftRadius: 4,
                      borderBottomRightRadius: 4,
                      display: "block",
                      width: "100%",
                      backgroundColor: "rgb(255, 226, 216, 0.5)",
                    }}
                  />
                </Box>
              ))}
            </Masonry>
          ) : (
            <Box sx={{ marginTop: 5 }}>
              <CircularProgress disableShrink />
            </Box>
          )}
        </Box>
      </Box>
    </>
  );
}
