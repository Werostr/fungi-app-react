import fungi from "../services/fungi";
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ReviewForm from "./ReviewForm";
import Review from "./Review";
import {
  Box,
  Container,
  Grid,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
  CircularProgress,
} from "@mui/material";

import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import HeartRating from "./HeartRating";
import { NoMeals, Restaurant } from "@mui/icons-material";

export default function Fungus({ allFungi, updateFungi, handleLogout, user }) {
  const id = useParams().id;
  const navigate = useNavigate();
  const [isLoaded, setIsLoaded] = useState(false);
  const [currentFungus, setCurrentFungus] = useState({});
  // allFungi.find((f) => f._id === id

  useEffect(() => {
    setIsLoaded(false);
    fungi
      .getOneById(id)
      .then((foundFungus) => {
        if (!foundFungus) {
          navigate("/not-found");
        }
        setCurrentFungus(foundFungus);
      })
      .catch((err) => console.log(err));
    setIsLoaded(true);
  }, [id, allFungi]);

  const handleDelete = async () => {
    const res = await fungi.deleteOne(id);
    console.log(res);
    if (res === "Forbidden" || res === "Unauthorized") {
      handleLogout();
    } else if (res === "OK") {
      const updatedFungi = allFungi.filter((c) => c._id !== id);
      updateFungi(updatedFungi);
      navigate("/fungi");
    }
  };

  return (
    <Grid container>
      <Grid item xs={12} sm={12} md={6} lg={6}>
        <Card
          sx={{ marginX: 5, marginY: 10, backgroundColor: "secondary.main" }}
        >
          <Carousel
            showArrows={true}
            showThumbs={false}
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
            }}
          >
            {currentFungus.images &&
              currentFungus.images.map((image, index) => (
                <Box
                  key={index}
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    height: "100%",
                    position: "relative",
                  }}
                >
                  {isLoaded ? (
                    <img
                      src={image.url}
                      alt={`Image ${index + 1}`}
                      loading="eager"
                      style={{
                        height: "100%",
                      }}
                    />
                  ) : (
                    <Box sx={{ marginTop: 5 }}>
                      <CircularProgress disableShrink />
                    </Box>
                  )}
                </Box>
              ))}
          </Carousel>
          <CardContent>
            <Grid
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                marginBottom: 1,
              }}
              item
              xs={12}
            >
              <HeartRating
                name="currentFungus.average"
                value={currentFungus.average || 0}
                precision={0.5}
                readOnly
              />
            </Grid>
            <Grid container spacing={1}>
              <Grid
                sx={{
                  backgroundColor: "secondary.main",
                  marginY: 1,
                  display: "flex",
                  justifyContent: "start",
                  textAlign: "start",
                }}
                component={Card}
                item
                xs={7}
              >
                <Typography
                  sx={{
                    padding: 1,
                    wordWrap: "break-word",
                    overflowWrap: "break-word",
                    inlineSize: "95%",
                  }}
                >
                  {currentFungus.description}
                </Typography>
              </Grid>

              <Grid item xs={5}>
                <Grid
                  sx={{
                    backgroundColor: "secondary.main",
                    marginBottom: 1,
                    paddingY: 1,
                  }}
                  component={Card}
                  item
                  xs={12}
                >
                  <Typography>{currentFungus.variety}</Typography>
                </Grid>

                <Grid
                  sx={{
                    backgroundColor: "secondary.main",
                    marginBottom: 1,
                    paddingY: 1,
                  }}
                  component={Card}
                  item
                  xs={12}
                >
                  <Typography
                    sx={{ display: "flex", justifyContent: "center" }}
                  >
                    {currentFungus.poisonous ? (
                      <NoMeals></NoMeals>
                    ) : (
                      <Restaurant></Restaurant>
                    )}
                  </Typography>
                </Grid>
                <Grid
                  sx={{
                    backgroundColor: "secondary.main",
                    marginBottom: 1,
                    paddingY: 1,
                  }}
                  component={Card}
                  item
                  xs={12}
                >
                  <Typography>
                    {currentFungus.city}, {currentFungus.country}
                  </Typography>
                </Grid>
                <Grid
                  sx={{
                    backgroundColor: "secondary.main",
                    marginBottom: 1,
                    paddingY: 1,
                  }}
                  component={Card}
                  item
                  xs={12}
                >
                  <Typography>
                    {currentFungus.author
                      ? currentFungus.author.username
                      : "author"}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
          </CardContent>
          {currentFungus.author && user.id === currentFungus.author._id && (
            <CardActions>
              <Button
                onClick={() => {
                  navigate(`/fungi/${id}/edit`);
                }}
                size="small"
              >
                Edit
              </Button>
              <Button onClick={handleDelete} size="small">
                Delete
              </Button>
            </CardActions>
          )}
        </Card>
      </Grid>
      <Grid item xs={12} sm={12} md={6} lg={6}>
        <Card
          sx={{
            marginX: 5,
            marginY: 10,
            padding: 10,
            width: "auto",
            backgroundColor: "secondary.main",
          }}
        >
          <Grid container>
            <ReviewForm
              allFungi={allFungi}
              currentFungus={currentFungus}
              updateFungus={setCurrentFungus}
              updateFungi={updateFungi}
              handleLogout={handleLogout}
              user={user}
            />
          </Grid>

          <Grid sx={{ borderTop: 1, marginTop: 1 }} container>
            {currentFungus.reviews &&
              currentFungus.reviews
                .slice()
                .reverse()
                .map((review) => {
                  return (
                    <Review
                      key={review._id}
                      allFungi={allFungi}
                      updateFungi={updateFungi}
                      currentFungus={currentFungus}
                      review={review}
                      handleLogout={handleLogout}
                      user={user}
                    />
                  );
                })}
          </Grid>
        </Card>
      </Grid>
    </Grid>
  );
}
