// client/src/pages/auth/register.jsx
import React, { useState, useMemo } from "react";
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Tabs,
  Tab,
  Divider,
  Stack,
  FormControl,
  InputLabel,
  OutlinedInput,
  TextField,
  Button,
  Typography,
  CircularProgress,
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { useNavigate } from "react-router-dom";
import LoginLayout from "@components/auth/login-layout";

export default function Register() {
  const navigate = useNavigate();
  const API_GATEWAY_URL = import.meta.env.VITE_API_GATEWAY_URL;

  const [requesterName, setRequesterName] = useState("");
  const [requesterStaffId, setRequesterStaffId] = useState("");
  const [orgName, setOrgName] = useState("");
  const [orgDescription, setOrgDescription] = useState("");
  const [gbgf, setGbgf] = useState("");

  const [loading, setLoading] = useState(false);
  const [infoMessage, setInfoMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [error, setError] = useState("");

  const isValid = useMemo(
    () =>
      requesterName.trim() &&
      requesterStaffId.trim() &&
      orgName.trim() &&
      orgDescription.trim() &&
      gbgf.trim(),
    [requesterName, requesterStaffId, orgName, orgDescription, gbgf]
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccessMessage("");
    if (!isValid) {
      setError("Please fill all required fields.");
      return;
    }
    setLoading(true);
    setInfoMessage("Submitting registration request ...");

    try {
      // TODO: replace endpoint if your backend differs
      const resp = await fetch(
        `${API_GATEWAY_URL}/v1/services/access/registration`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json", accept: "application/json" },
          credentials: "include",
          body: JSON.stringify({
            requester_name: requesterName,
            requester_staff_id: requesterStaffId,
            organization_name: orgName,
            organization_description: orgDescription,
            gbgf,
          }),
        }
      );

      if (!resp.ok) {
        const text = await resp.text().catch(() => "");
        throw new Error(text || "Registration failed");
      }

      setSuccessMessage("Registration submitted successfully.");
      setInfoMessage("");
      // brief success pause then redirect to login
      setTimeout(() => navigate("/auth/login"), 900);
    } catch (err) {
      setError(
        err?.message || "Something went wrong while submitting the request."
      );
    } finally {
      setLoading(false);
      setInfoMessage("");
    }
  };

  return (
    <LoginLayout>
      <Card>
        <CardHeader title="Register Organization Access" sx={{ px: 3 }} />
        <Divider />
        <CardContent sx={{ minHeight: 300 }}>
          <Tabs value="register" variant="fullWidth" sx={{ px: 3 }}>
            <Tab value="register" label="Register" tabIndex={0} />
          </Tabs>

          {error && (
            <Typography color="error" variant="body2" sx={{ mt: 2 }}>
              {error}
            </Typography>
          )}

          {infoMessage && (
            <Box display="flex" alignItems="center" sx={{ mt: 2 }}>
              <CircularProgress size={18} />
              <Typography variant="body2" sx={{ ml: 1 }}>
                {infoMessage}
              </Typography>
            </Box>
          )}

          {successMessage && (
            <Box display="flex" alignItems="center" sx={{ mt: 2 }}>
              <CheckCircleIcon fontSize="small" />
              <Typography variant="body2" sx={{ ml: 1 }}>
                {successMessage}
              </Typography>
            </Box>
          )}

          <Box component="form" onSubmit={handleSubmit} noValidate>
            <Stack spacing={2} sx={{ mt: 2 }}>
              <FormControl fullWidth>
                <InputLabel htmlFor="requester_name">Requester Name</InputLabel>
                <OutlinedInput
                  id="requester_name"
                  label="Requester Name"
                  value={requesterName}
                  onChange={(e) => setRequesterName(e.target.value)}
                />
              </FormControl>

              <FormControl fullWidth>
                <InputLabel htmlFor="requester_staff_id">
                  Requester Staff ID
                </InputLabel>
                <OutlinedInput
                  id="requester_staff_id"
                  label="Requester Staff ID"
                  value={requesterStaffId}
                  onChange={(e) => setRequesterStaffId(e.target.value)}
                />
              </FormControl>

              <FormControl fullWidth>
                <InputLabel htmlFor="organization_name">
                  Organization Name
                </InputLabel>
                <OutlinedInput
                  id="organization_name"
                  label="Organization Name"
                  value={orgName}
                  onChange={(e) => setOrgName(e.target.value)}
                />
              </FormControl>

              <TextField
                id="organization_description"
                label="Organization Description"
                value={orgDescription}
                onChange={(e) => setOrgDescription(e.target.value)}
                multiline
                minRows={3}
                fullWidth
              />

              <FormControl fullWidth>
                <InputLabel htmlFor="gbgf">GBGF</InputLabel>
                <OutlinedInput
                  id="gbgf"
                  label="GBGF"
                  value={gbgf}
                  onChange={(e) => setGbgf(e.target.value)}
                />
              </FormControl>

              <Stack direction="row" spacing={2} alignItems="center">
                <Button
                  type="submit"
                  variant="contained"
                  disabled={!isValid || loading}
                >
                  Submit
                </Button>
                <Button
                  type="button"
                  variant="text"
                  onClick={() => navigate("/auth/login")}
                >
                  Back to Login
                </Button>
                {loading && (
                  <Box display="flex" alignItems="center">
                    <CircularProgress size={22} />
                    <Typography variant="body2" sx={{ ml: 1 }}>
                      Processing...
                    </Typography>
                  </Box>
                )}
              </Stack>
            </Stack>
          </Box>
        </CardContent>
      </Card>
    </LoginLayout>
  );
}
