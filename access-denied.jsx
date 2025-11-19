//src/pages/dashboard/access-denied.jsx
import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import { WarningCircle as WarningCircleIcon } from "@phosphor-icons/react/dist/ssr/WarningCircle";

export default function AccessDenied() {
  const navigate = useNavigate();

  const handleGoBack = () => {
    // Go back to dashboard overview (index route)
    navigate("/dashboard");
  };

  return (
    <Box
      sx={{
        height: "100%",
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        p: 3,
      }}
    >
      <Box
        sx={{
          maxWidth: 480,
          textAlign: "center",
          display: "flex",
          flexDirection: "column",
          gap: 2,
        }}
      >
        <Box
          sx={{
            mx: "auto",
            width: 72,
            height: 72,
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            bgcolor: "action.hover",
          }}
        >
          <WarningCircleIcon
            weight="duotone"
            style={{ fontSize: "2.5rem" }}
          />
        </Box>

        <Typography variant="h4" component="h1">
          You don&apos;t have an access
        </Typography>

        <Typography
          variant="body1"
          sx={{ color: "text.secondary" }}
        >
          You are trying to open a page that is restricted to platform admins.
          Please contact your administrator if you believe this is a mistake.
        </Typography>

        <Box sx={{ mt: 1 }}>
          <Button
            variant="contained"
            onClick={handleGoBack}
          >
            Go back to dashboard
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
