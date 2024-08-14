import React, { useState } from "react";
import {
  Container,
  Button,
  Box,
  Typography,
  Slider,
  Link,
} from "@mui/material";
import "./App.css"; // Import CSS for animation

export default function App() {
  const [count, setCount] = useState(0);
  const [history, setHistory] = useState([{ count: 0 }]); // History for undo/redo
  const [historyIndex, setHistoryIndex] = useState(0); // To track current position in

  // Add to the count
  const add = () => {
    if (count < 150) {
      const newCount = count + 1;
      setCount(newCount);
      updateHistory(newCount);
    } else {
      alert("Only numbers between 0 - 150 are allowed");
    }
  };

  // Subtract from the count
  const subtract = () => {
    if (count > 0) {
      const newCount = count - 1;
      setCount(newCount);
      updateHistory(newCount);
    } else {
      alert("Only numbers between 0 - 150 are allowed");
    }
  };

  // Update history for undo/redo
  const updateHistory = (newCount) => {
    const newHistory = history.slice(0, historyIndex + 1);
    newHistory.push({ count: newCount });
    setHistory(newHistory);
    setHistoryIndex(newHistory.length - 1);
  };

  // Undo action
  const undo = () => {
    if (historyIndex > 0) {
      setHistoryIndex(historyIndex - 1);
      setCount(history[historyIndex - 1].count);
    }
  };

  // Redo action
  const redo = () => {
    if (historyIndex < history.length - 1) {
      setHistoryIndex(historyIndex + 1);
      setCount(history[historyIndex + 1].count);
    }
  };

  const handleChange = (e) => {
    const newValue = Math.max(0, Math.min(150, Number(e.target.value))); // Ensure the value is within range
    setCount(newValue);
    updateHistory(newValue);
  };

  return (
    <Container>
      <Typography variant="h3" className="Heading">
        COUNTER APPLICATION
      </Typography>
      <Container
        sx={{
          marginTop: "10%",
          position: "relative",
          sm: { width: "20px", backgroundColor: "pink" },
        }}
      >
        <Box className="container">
          <Box className="controls grid">
            <Box className="subtract">
              <Button
                sx={{
                  fontSize: "1.3rem",
                  width: "6rem",
                  height: "6rem",
                  padding: "4rem",
                  borderRadius: "5rem",
                }}
                onClick={subtract}
              >
                Subtract
              </Button>
            </Box>

            <Box className="progress-div">
              <Box className="progress-container">
                <Box
                  className="progress-bar"
                  style={{ width: `${(count / 150) * 100}%` }}
                ></Box>
              </Box>

              <Typography variant="p" className="text">
                {count}%
              </Typography>

              <Box sx={{ width: "200px" }}>
                <Slider
                  onChange={handleChange}
                  value={count}
                  max={150}
                  defaultValue={50}
                  aria-label="Default"
                  valueLabelDisplay="auto"
                />
              </Box>
            </Box>

            <Box className="add">
              <Button
                sx={{
                  fontSize: "1.3rem",
                  width: "6rem",
                  height: "6rem",
                  padding: "4rem",
                  borderRadius: "5rem",
                  textAlign: "center",
                }}
                onClick={add}
              >
                Add
              </Button>
            </Box>
          </Box>

          <Box className="undo-redo-div">
            <Button
              sx={{
                textAlign: "center",
                fontSize: "1.3rem",
                width: "6rem",
                height: "6rem",
                padding: "4rem",
                borderRadius: "5rem",
              }}
              onClick={undo}
              disabled={historyIndex === 0}
            >
              Undo
            </Button>
            <Button
              sx={{
                textAlign: "center",
                fontSize: "1.3rem",
                width: "6rem",
                height: "6rem",
                padding: "4rem",
                borderRadius: "5rem",
                marginBottom: "2%",
              }}
              onClick={redo}
              disabled={historyIndex === history.length - 1}
            >
              Redo
            </Button>
          </Box>
        </Box>
        <Container sx={{ textAlign: "center", marginTop: "3%" }}>
          <Typography className="footer">
            Designed by <Link href=".">Jeyaraj</Link> |
          </Typography>

          <Typography className="link">
            <Link
              target="_blank"
              href="https://github.com/Jeyaraj17/my-counter-app"
            >
              github link
            </Link>
          </Typography>
        </Container>
      </Container>
    </Container>
  );
}
