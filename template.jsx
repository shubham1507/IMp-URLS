// client/src/pages/auth/register.jsx
import React, { useMemo, useState } from "react";
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
import { LoginLayout } from "@/components/auth/login-layout";

export default function Register() {
  const navigate = useNavigate();
  const API_GATEWAY_URL = import.meta.env.VITE_API_GATEWAY_URL;

  const [requesterName, setRequesterName] = useState("");
  const [requesterStaffId, setRequesterStaffId] = useState("");
  const [orgName, setOrgName] = useState("");
  const [orgDescription, setOrgDescription] = useState("");
  const [gbgf, setGbgf] = useState("");
  const [serviceLine, setServiceLine] = useState("");
  const [eimName, setEimName] = useState("");
  const [eimId, setEimId] = useState("");

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
      gbgf.trim() &&
      serviceLine.trim() &&
      eimName.trim() &&
      eimId.trim(),
    [
      requesterName,
      requesterStaffId,
      orgName,
      orgDescription,
      gbgf,
      serviceLine,
      eimName,
      eimId,
    ]
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
      const resp = await fetch(
        `${API_GATEWAY_URL}/v1/services/access/registration`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            accept: "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            requester_name: requesterName,
            requester_staff_id: requesterStaffId,
            organization_name: orgName,
            organization_description: orgDescription,
            gbgf,
            service_line: serviceLine,
            eim_name: eimName,
            eim_id: eimId,
          }),
        }
      );

      if (!resp.ok) {
        const text = await resp.text().catch(() => "");
        throw new Error(text || "Registration failed");
      }

      // ✅ success message changed
      setSuccessMessage(
        "Thank you for your interest. We will get back to you soon."
      );
      setInfoMessage("");

      // Optional: clear form
      setRequesterName("");
      setRequesterStaffId("");
      setOrgName("");
      setOrgDescription("");
      setGbgf("");
      setServiceLine("");
      setEimName("");
      setEimId("");

      // optional redirect after 2s
      setTimeout(() => navigate("/auth/login"), 2000);
    } catch (err) {
      setError(err?.message || "Something went wrong while submitting.");
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
              <Typography
                variant="body2"
                sx={{ ml: 1, color: "success.main", fontWeight: 500 }}
              >
                {successMessage}
              </Typography>
            </Box>
          )}

          <Box component="form" onSubmit={handleSubmit} noValidate>
            <Stack spacing={2} sx={{ mt: 2 }}>
              <FormControl fullWidth>
                <InputLabel>Requester Name</InputLabel>
                <OutlinedInput
                  value={requesterName}
                  onChange={(e) => setRequesterName(e.target.value)}
                />
              </FormControl>

              <FormControl fullWidth>
                <InputLabel>Requester Staff ID</InputLabel>
                <OutlinedInput
                  value={requesterStaffId}
                  onChange={(e) => setRequesterStaffId(e.target.value)}
                />
              </FormControl>

              <FormControl fullWidth>
                <InputLabel>Organization Name</InputLabel>
                <OutlinedInput
                  value={orgName}
                  onChange={(e) => setOrgName(e.target.value)}
                />
              </FormControl>

              <TextField
                label="Organization Description"
                value={orgDescription}
                onChange={(e) => setOrgDescription(e.target.value)}
                multiline
                minRows={3}
                fullWidth
              />

              <FormControl fullWidth>
                <InputLabel>GBGF</InputLabel>
                <OutlinedInput
                  value={gbgf}
                  onChange={(e) => setGbgf(e.target.value)}
                />
              </FormControl>

              <FormControl fullWidth>
                <InputLabel>Service Line</InputLabel>
                <OutlinedInput
                  value={serviceLine}
                  onChange={(e) => setServiceLine(e.target.value)}
                />
              </FormControl>

              <FormControl fullWidth>
                <InputLabel>EIM Name</InputLabel>
                <OutlinedInput
                  value={eimName}
                  onChange={(e) => setEimName(e.target.value)}
                />
              </FormControl>

              <FormControl fullWidth>
                <InputLabel>EIM ID</InputLabel>
                <OutlinedInput
                  value={eimId}
                  onChange={(e) => setEimId(e.target.value)}
                />
              </FormControl>

              <Stack direction="row" spacing={2} alignItems="center">
                <Button
                  type="submit"
                  variant="contained"
                  disabled={!isValid || loading}
                >
                  {loading ? (
                    <>
                      <CircularProgress size={20} sx={{ mr: 1 }} />
                      Submitting...
                    </>
                  ) : (
                    "Submit"
                  )}
                </Button>

                <Button
                  type="button"
                  variant="text"
                  onClick={() => navigate("/auth/login")}
                >
                  Back to Login
                </Button>
              </Stack>
            </Stack>
          </Box>
        </CardContent>
      </Card>
    </LoginLayout>
  );
}
