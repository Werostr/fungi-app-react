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
  Container,
} from "@mui/material";
import AlertDialog from "./AlertDialog";

export default function NewFungus({ allFungi, updateFungi, handleLogout }) {
  const [variety, setVariety] = useState("");
  const [poisonous, setPoisonous] = useState(false);
  const [description, setDescription] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [fileName, setFileName] = useState("");
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const navigate = useNavigate();

  const handleAddFungus = async (event) => {
    event.preventDefault();
    if (selectedFiles.length === 0) {
      return setOpenDialog(true);
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
      console.log(newFungus);
      console.log(newFungus.author);
      console.log(newFungus.author.username);
      if (newFungus === "Forbidden" || newFungus === "Unauthorized") {
        handleLogout();
      } else {
        updateFungi([...allFungi, { ...newFungus }]);
        navigate(`/fungi/${newFungus._id}`);
      }
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
    <Container
      maxWidth="xl"
      sx={{
        paddingX: 10,
        paddingTop: { xs: 3, sm: 4, md: 4, lg: 5, xl: 6 },
        display: "flex",
        justifyContent: "center",
      }}
    >
      <AlertDialog
        open={openDialog}
        setOpen={setOpenDialog}
        variant="attachImages"
      />
      <Box sx={{ width: "800px" }}>
        <Card
          sx={{
            backgroundColor: "rgb(255, 226, 216)",
            backgroundImage:
              'linear-gradient(rgba(255, 255, 255, 0.6), rgba(255, 255, 255, 0.6)),url("https://res.cloudinary.com/dhxufgysz/image/upload/v1708350201/fungiElysium/zg3rifccl5szzuuevi7r.png")',
            backgroundSize: "cover",
            paddingX: "20%",
            paddingY: "4%",
          }}
        >
          <Typography variant="h4" sx={{ marginBottom: 4 }} xs={12}>
            Create new fungus
          </Typography>

          <Grid component="form" onSubmit={handleAddFungus} container>
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
                <FormControlLabel
                  value={false}
                  control={<Radio />}
                  label="No"
                />
                <FormControlLabel
                  value={true}
                  control={<Radio />}
                  label="Yes"
                />
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
                  color: "primary.dark",
                  borderColor: "primary.light",
                  "&:hover": {
                    borderColor: "primary.dark",
                  },
                }}
                type="submit"
                variant="outlined"
              >
                Add
              </Button>
            </Grid>
          </Grid>
        </Card>
      </Box>
    </Container>
  );
}
