import React from "react";

export default function AccessDenied() {
  return (
    <div
      style={{
        padding: "60px 20px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "60vh",
        color: "#d9534f",
      }}
    >
      <div
        style={{
          fontSize: "48px",
          marginBottom: "16px",
          fontWeight: "bold",
        }}
      >
        ⛔
      </div>

      <h1
        style={{
          fontSize: "28px",
          marginBottom: "10px",
          fontWeight: "600",
          color: "#333",
        }}
      >
        You Don't Have Access
      </h1>

      <p
        style={{
          fontSize: "16px",
          color: "#666",
          maxWidth: "480px",
          textAlign: "center",
          lineHeight: "1.5",
        }}
      >
        You do not have permission to view this page.  
        If you believe this is a mistake, please contact your administrator.
      </p>
    </div>
  );
}