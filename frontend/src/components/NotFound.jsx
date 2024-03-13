import { Box, Card, Container, Typography } from "@mui/material";
import SentimentNeutralIcon from "@mui/icons-material/SentimentNeutral";

export default function NotFound() {
  return (
    <Container
      maxWidth="xl"
      sx={{ display: "flex", justifyContent: "center", paddingTop: 5 }}
    >
      <Card
        sx={{
          backgroundColor: "secondary.dark",
          height: "100px",
          width: "50%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: 3,
        }}
      >
        <Typography variant="h5" sx={{ marginRight: 1 }}>
          Page not found
        </Typography>{" "}
        <SentimentNeutralIcon fontSize="large" />
      </Card>
    </Container>
  );
}
