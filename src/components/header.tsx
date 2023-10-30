import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";

export default function Header() {
  const navigate = useNavigate();

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" style={{ background: "#008080" }}>
        <Toolbar>
          <Typography
            variant="h6"
            component="div"
            onClick={() => navigate("")}
            sx={{
              ":hover": {
                cursor: "pointer",
              },
            }}
          >
            React Video Player
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
