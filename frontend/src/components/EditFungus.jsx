import fungi from "../services/fungi";
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Box,
  Button,
  Card,
  Grid,
  TextField,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormLabel,
  Typography,
} from "@mui/material";

export default function EditFungus({ allFungi, updateFungi }) {
  const id = useParams().id;
  const [variety, setVariety] = useState("");
  const [poisonous, setPoisonous] = useState(null);
  const [description, setDescription] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  //const [fileName, setFileName] = useState("");
  // const [selectedFiles, setSelectedFiles] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fungi
      .getOneById(id)
      .then((foundFungus) => {
        if (!foundFungus) {
          navigate("/not-found");
        }
        setVariety(foundFungus.variety);
        setPoisonous(foundFungus.poisonous);
        setDescription(foundFungus.description);
        setCity(foundFungus.city);
        setCountry(foundFungus.country);
      })
      .catch((err) => console.log(err));
  }, [id]);

  const handleEditFungus = async (event) => {
    event.preventDefault();
    try {
      const data = {
        variety,
        poisonous,
        description,
        city,
        country,
      };
      const editedFungus = await fungi.updateOne(data, id);
      updateFungi(
        allFungi.map((e) => {
          if (e._id === editedFungus._id) {
            return { ...editedFungus };
          } else {
            return e;
          }
        })
      );
      navigate(`/fungi/${editedFungus._id}`);
    } catch (error) {
      console.log("Error during creating new fungus", error);
    }
  };
  const navigateToAll = () => {
    navigate(`/fungi`);
  };
  const navigateToFungus = () => {
    navigate(`/fungi/${id}`);
  };

  return (
    <Card
      sx={{
        backgroundColor: "rgb(255, 226, 216)",
        backgroundImage:
          'linear-gradient(rgba(255, 255, 255, 0.6), rgba(255, 255, 255, 0.6)),url("https://res.cloudinary.com/dhxufgysz/image/upload/v1708350201/fungiElysium/zg3rifccl5szzuuevi7r.png")',
        backgroundSize: "cover",
        margin: "10%",
        paddingX: "20%",
        paddingY: "5%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Typography
        variant="h4"
        sx={{ marginBottom: 4, borderBottom: 1 }}
        xs={12}
      >
        Edit your fungus
      </Typography>

      {/* <form > */}
      <Grid component="form" onSubmit={handleEditFungus} container>
        <Grid item sx={{ marginBottom: 2 }} xs={12}>
          <TextField
            sx={{ width: "100%" }}
            label="Variety"
            name="variety"
            value={variety}
            onChange={({ target }) => setVariety(target.value)}
            required
          />
        </Grid>

        <Grid item sx={{ marginBottom: 2 }} xs={12}>
          <TextField
            sx={{ width: "100%" }}
            label="City"
            name="city"
            value={city}
            onChange={({ target }) => setCity(target.value)}
            required
          />
        </Grid>

        <Grid item sx={{ marginBottom: 2 }} xs={12}>
          <TextField
            sx={{ width: "100%" }}
            label="Country"
            name="country"
            value={country}
            onChange={({ target }) => setCountry(target.value)}
            required
          />
        </Grid>

        <Grid item sx={{ marginBottom: 2 }} xs={12}>
          <TextField
            sx={{ width: "100%" }}
            label="Description"
            name="description"
            value={description}
            multiline
            rows={3}
            onChange={({ target }) => setDescription(target.value)}
            required
          />
        </Grid>

        <Grid
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "start",
            marginBottom: 2,
            paddingLeft: 2,
          }}
          item
          xs={6}
        >
          <FormLabel
            sx={{ display: "inherit", justifyContent: "start" }}
            id="poisonous"
          >
            Is it poisonous?
          </FormLabel>
          <RadioGroup
            row
            label="poisonous"
            name="poisonous"
            value={poisonous}
            onChange={({ target }) => setPoisonous(target.value)}
          >
            <FormControlLabel value={false} control={<Radio />} label="No" />
            <FormControlLabel value={true} control={<Radio />} label="Yes" />
          </RadioGroup>
        </Grid>
        <Grid
          item
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginBottom: 2,
          }}
          xs={6}
        >
          <Button
            sx={{
              backgroundColor: "#ff6d75",
              "&:hover": {
                backgroundColor: "#ff8c94",
              },
            }}
            variant="contained"
            component="label"
            disableElevation
            //startIcon={<CloudUploadIcon />}
          >
            {/* {fileName || "Attach images"} */}
            <input
              type="file"
              hidden
              multiple
              //onChange={handleSelectImages}
            />
          </Button>
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
            Edit
          </Button>
        </Grid>
      </Grid>
      {/* </form> */}
    </Card>
  );
}
