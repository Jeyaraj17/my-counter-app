import React, { useState } from "react";
import { Container, Button } from "@mui/material";
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
    <Container sx={{ marginTop: "10%", position: "relative" }}>
      <h4 className="Heading">Counter application</h4>
      <div className="container">
        <div className="controls grid">
          <div className="subtract">
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
          </div>

          <div className="progress-div">
            <div className="progress-container">
              <div
                className="progress-bar"
                style={{ width: `${(count / 150) * 100}%` }}
              ></div>
            </div>

            <p className="text">{count}%</p>

            <form className="range-box">
              <input
                className="range"
                type="range"
                onChange={handleChange}
                value={count}
                max={150}
              />
            </form>
          </div>

          <div className="add">
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
          </div>
        </div>

        <div className="undo-redo-div">
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
        </div>
      </div>
      <footer>
        <span className="footer">
          Designed by <a href=".">Jeyaraj</a> |
        </span>

        <span className="link">
          <a href=".">github link</a>
        </span>
      </footer>
    </Container>
  );
}
