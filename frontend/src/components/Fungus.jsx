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
import Zoom from "react-medium-image-zoom";

export default function Fungus({ allFungi, updateFungi }) {
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
    await fungi.deleteOne(id);
    const updatedFungi = allFungi.filter((c) => c._id !== id);
    updateFungi(updatedFungi);
    navigate("/fungi");
  };

  return (
    <Grid container>
      <Grid item xs={12} sm={12} md={6} lg={6}>
        <Card sx={{ margin: 10, backgroundColor: "rgb(255, 226, 216, 0.5)" }}>
          <Carousel
            showArrows={true}
            //infiniteLoop={true}
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
            <Grid item xs={6}>
              <Typography>{currentFungus.description}</Typography>
            </Grid>
            <Grid item xs={6}></Grid>
            <Grid item xs={12}>
              <Typography>{currentFungus.average}</Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography>
                a{currentFungus.author && currentFungus.author}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography>
                {currentFungus.city},{currentFungus.country}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography>
                {currentFungus.poisonous === true ? "x" : "git"}
              </Typography>
            </Grid>
            {/* <Typography gutterBottom variant="h5" component="div">
                {currentFungus.variety}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {currentFungus.description}
              </Typography> */}
          </CardContent>
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
        </Card>
      </Grid>
      <Grid item xs={12} sm={12} md={6} lg={6}>
        <Card
          sx={{
            margin: 10,
            padding: 10,
            width: "auto",
            backgroundColor: "rgb(255, 226, 216, 0.5)",
          }}
        >
          <Grid container>
            <ReviewForm
              allFungi={allFungi}
              currentFungus={currentFungus}
              updateFungus={setCurrentFungus}
              updateFungi={updateFungi}
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
                      updateFungus={setCurrentFungus}
                      updateFungi={updateFungi}
                      currentFungus={currentFungus}
                      review={review}
                    />
                  );
                })}
          </Grid>
        </Card>
      </Grid>
    </Grid>
  );
  {
    /* <Box
      sx={{
        display: "flex",
        flexDirection: { xs: "column", sm: "column", md: "row", lg: "row" },
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Box>
        <Card sx={{ margin: 10, width: 400 }}>
          <CardMedia
            component="img"
            alt="green iguana"
            height="300"
            image="https://images.unsplash.com/photo-1706545512982-b457dbd80aeb?q=80&w=387&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {currentFungus.variety}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {currentFungus.description}
            </Typography>
          </CardContent>
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
        </Card>
      </Box>
      <Box>
        <Card sx={{ margin: 10, padding: 5 }}>
          <ReviewForm
            allFungi={allFungi}
            currentFungus={currentFungus}
            updateFungus={updateFungus}
          />
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
        </Card>
      </Box>
    </Box> */
  }
}
