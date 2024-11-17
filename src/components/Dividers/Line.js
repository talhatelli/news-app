import React from "react";

const Line = ({ lineWidth, lineHeight }) => {
  return (
    <div
      style={{
        width: `${lineWidth}px`,
        height: `${lineHeight}px`,
        backgroundColor: "#FF9F1C",
        margin: "2px 0",
      }}
    />
  );
};

export default Line;
