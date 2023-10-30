import React from "react";
import { VIDEO_DATA } from "../data/data";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";

const VideoList = () => {
  const navigate = useNavigate();

  return (
    <Box>
      <Box sx={{ marginTop: "15px" }}>
        <Typography variant="h6" align="center">
          The video data are collected from{" "}
          <Link
            to="https://gist.github.com/jsturgis/3b19447b304616f18657"
            target="blank"
          >
            GitHub
          </Link>
        </Typography>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-between",
          padding: "20px 50px",
        }}
      >
        {VIDEO_DATA &&
          VIDEO_DATA.map((movie, i) => {
            return (
              <Card sx={{ width: "20%", margin: "20px" }} key={i}>
                <CardMedia
                  sx={{ height: 140 }}
                  image={movie.thumb}
                  title="green iguana"
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {movie.title}
                  </Typography>

                  <Typography color="#858383">{movie.subtitle}</Typography>
                </CardContent>
                <CardActions>
                  <Button
                    size="small"
                    variant="contained"
                    style={{ background: "#597976" }}
                    onClick={() =>
                      navigate("/video-player", {
                        state: {
                          videoURL: movie.sources[0],
                        },
                      })
                    }
                  >
                    Show
                  </Button>
                </CardActions>
              </Card>
            );
          })}
      </Box>
    </Box>
  );
};

export default VideoList;
