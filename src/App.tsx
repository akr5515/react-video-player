import { Route, Routes } from "react-router-dom";
import "./App.css";

import VideoPlayer from "./pages/videoPlayer";
import VideoList from "./pages/videoList";
import Header from "./components/header";

function App() {
  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<VideoList />} />
        <Route path="/video-player" element={<VideoPlayer />} />
      </Routes>
    </div>
  );
}
export default App;
