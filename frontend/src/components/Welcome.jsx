import { Container, Card, Typography, Grid } from "@mui/material";

export default function Welcome() {
  return (
    <>
      <Container
        maxWidth="xl"
        sx={{
          paddingY: 3,
          width: "100%",
          paddingX: "20%",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Card
          sx={{
            width: "70%",
            backgroundImage:
              'linear-gradient(rgba(255, 255, 255, 0.4), rgba(255, 255, 255, 0.4)),url("https://res.cloudinary.com/dhxufgysz/image/upload/v1710369874/fungiElysium/n0j6dobofy8f9syp6hua.jpg")',
            backgroundSize: "cover",
            paddingY: 5,
          }}
        >
          <Grid container>
            <Grid item xs={12}>
              <Typography variant="h4" sx={{ marginBottom: 3 }}>
                Welcome at Fungi Elysium
              </Typography>
            </Grid>
            <Grid item xs={6} sx={{ padding: 12, borderRight: 1 }}>
              <Typography>
                Suspendisse sed nisi lacus sed. Luctus venenatis lectus magna
                fringilla urna porttitor rhoncus. Imperdiet nulla malesuada
                pellentesque elit eget gravida cum. Scelerisque purus semper
                eget duis. Vulputate sapien nec sagittis aliquam malesuada
                bibendum. Amet est placerat in egestas erat imperdiet sed.
                Phasellus vestibulum lorem sed risus ultricies tristique. Donec
                et odio pellentesque diam volutpat. Tortor at auctor urna nunc
                id cursus metus. Mattis ullamcorper velit sed ullamcorper morbi
                tincidunt ornare massa eget. Neque vitae tempus quam
                pellentesque nec nam aliquam. Ornare lectus sit amet est
                placerat in.
              </Typography>
            </Grid>
            <Grid item xs={6} sx={{ padding: 12, borderLeft: 1 }}>
              <Typography>
                Molestie nunc non blandit massa enim nec dui nunc. Mi sit amet
                mauris commodo. Fermentum et sollicitudin ac orci phasellus
                egestas. Sed risus pretium quam vulputate. Varius quam quisque
                id diam vel. Mauris in aliquam sem fringilla. Felis eget nunc
                lobortis mattis aliquam faucibus. Dolor sit amet consectetur
                adipiscing elit duis tristique sollicitudin. Curabitur gravida
                arcu ac tortor dignissim. Id donec ultrices tincidunt arcu non
                sodales neque sodales.
              </Typography>
            </Grid>
          </Grid>
        </Card>
      </Container>
    </>
  );
}
