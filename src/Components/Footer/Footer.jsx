import React from "react";
import "./Footer.css";
import { useState } from "react";
import html2canvas from "html2canvas";
import { ReactDOM } from "react";

const downloadTreeAsPNG = async () => {
  const binaryTreeComponent = document.querySelector(".tree");

  if (binaryTreeComponent) {
    const canvas = await html2canvas(binaryTreeComponent);
    const pngUrl = canvas
      .toDataURL("image/png")
      .replace("image/png", "image/octet-stream");
    let downloadLink = document.createElement("a");
    downloadLink.href = pngUrl;
    downloadLink.download = "binaryTree.png";
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  }
};

export function Footer(props) {
  const [value, setValue] = useState(3);

  const handleSliderChange = (e) => {
    const newValue = e.target.value;
    setValue(newValue);
    props.setDifficulty(newValue); // Update the difficulty in the App component
  };

  return (
    <footer>
      <p>
        press <span className="key">Space key</span> to refresh!
      </p>
      <button
        style={{
          backgroundColor: "black",
          color: "white",
          padding: "10px 20px",
          border: "none",
          outline: "none",
        }}
        onClick={downloadTreeAsPNG}
      >
        Download Tree
      </button>
      {/* Slider */}
      <div>
        <input
          type="range"
          min="1"
          max="5"
          value={value}
          onChange={handleSliderChange}
        />
        <div>Difficulty: {value}</div>
      </div>
    </footer>
  );
}
