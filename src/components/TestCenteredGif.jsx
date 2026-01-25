import React from "react";

const TestCenteredGif = ({ show, onClose }) => {
  if (!show) return null;

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        width: "100vw",
        height: "100vh",
        backgroundColor: "rgba(0, 0, 0, 0.9)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 99999,
      }}
      onClick={onClose}
    >
      <div
        style={{
          position: "relative",
          maxWidth: "90%",
          maxHeight: "90%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <img
          src="/gifs/f1-motorsport.gif"
          alt="F1 Motorsport"
          style={{
            display: "block",
            maxWidth: "90vw",
            maxHeight: "80vh",
            width: "auto",
            height: "auto",
            borderRadius: "8px",
            border: "3px solid #50B6D1",
            boxShadow: "0 0 20px rgba(80, 182, 209, 0.5)",
            objectFit: "contain",
          }}
          onError={(e) => {
            // Show a text message if image doesn't exist
            e.target.style.display = "none";
            if (document.getElementById("gif-placeholder")) return;

            const placeholder = document.createElement("div");
            placeholder.id = "gif-placeholder";
            placeholder.style.cssText = `
              font-family: monospace;
              color: #50B6D1;
              text-align: center;
              padding: 40px;
              background: #1a1b26;
              border: 3px solid #50B6D1;
              border-radius: 8px;
              font-size: 1.5rem;
              max-width: 400px;
            `;
            placeholder.innerHTML =
              "🏎️ F1 MOTORSPORT GIF 🏎️<br><br><small>Upload your GIF to: /public/gifs/f1-motorsport.gif</small>";
            e.target.parentNode.appendChild(placeholder);
          }}
        />

        <div
          style={{
            marginTop: "20px",
            textAlign: "center",
            fontFamily: "monospace",
            color: "#50B6D1",
            fontSize: "1.2rem",
            fontWeight: "bold",
          }}
        ></div>
      </div>
    </div>
  );
};

export default TestCenteredGif;
