import { useNavigate } from "react-router-dom";
import fungi from "../services/fungi";
import { useState } from "react";
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
  Alert,
} from "@mui/material";

export default function NewFungus({ allFungi, updateFungi }) {
  const [variety, setVariety] = useState("");
  const [poisonous, setPoisonous] = useState(false);
  const [description, setDescription] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [fileName, setFileName] = useState("");
  const [selectedFiles, setSelectedFiles] = useState([]);
  const navigate = useNavigate();

  const handleAddFungus = async (event) => {
    event.preventDefault();
    if (selectedFiles.length === 0) {
      return <Alert severity="warning">This is a warning Alert.</Alert>;
    }
    try {
      const data = new FormData();
      data.append("variety", variety);
      data.append("poisonous", poisonous);
      data.append("description", description);
      data.append("city", city);
      data.append("country", country);
      for (let i = 0; i < selectedFiles.length; i++) {
        data.append("files", selectedFiles[i]);
      }

      const newFungus = await fungi.addNew(data);
      updateFungi([...allFungi, { ...newFungus }]);

      navigate(`/fungi/${newFungus._id}`);
    } catch (error) {
      console.log("Error during creating new fungus", error);
    }
  };

  const handleSelectImages = (e) => {
    const files = e.target.files;
    setSelectedFiles(files);
    setFileName("Selected " + e.target.files.length + " photo(s)");
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
        Create new fungus
      </Typography>

      <form onSubmit={handleAddFungus}>
        <Grid container>
          <Grid item sx={{ marginBottom: 2 }} xs={12}>
            <TextField
              color="primary"
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
              aria-labelledby="poisonous"
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
              {fileName || "Attach images"}
              <input
                type="file"
                hidden
                multiple
                onChange={handleSelectImages}
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
              Add
            </Button>
          </Grid>
        </Grid>
      </form>
      {/* <input
        type="text"
        placeholder="variety"
        name="variety"
        value={variety}
        onChange={({ target }) => setVariety(target.value)}
      ></input>
      <select
        name="poisonous"
        onChange={({ target }) => setPoisonous(target.value)}
      >
        <option value={false}>No</option>
        <option value={true}>Yes</option>
      </select>
      <input
        type="text"
        placeholder="description"
        name="description"
        value={description}
        onChange={({ target }) => setDescription(target.value)}
      ></input>
      <input
        type="text"
        placeholder="city"
        name="city"
        value={city}
        onChange={({ target }) => setCity(target.value)}
      ></input>
      <input
        type="text"
        placeholder="country"
        name="country"
        value={country}
        onChange={({ target }) => setCountry(target.value)}
      ></input>
      <Button
        variant="contained"
        component="label"
        disableElevation
        //startIcon={<CloudUploadIcon />}
      >
        {fileName || "Attach images"}
        <input type="file" hidden multiple onChange={handleSelectImages} />
      </Button>
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
      </Button> */}
    </Card>
  );
}
