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
import { LoginLayout } from "@/components/auth/login-layout"; // keep as named export

export default function Register() {
  const navigate = useNavigate();

  // form fields
  const [requesterName, setRequesterName] = useState("");
  const [requesterStaffId, setRequesterStaffId] = useState("");
  const [orgName, setOrgName] = useState("");
  const [orgDescription, setOrgDescription] = useState("");
  const [gbgf, setGbgf] = useState("");
  const [serviceLine, setServiceLine] = useState("");
  const [eimName, setEimName] = useState("");
  const [eimId, setEimId] = useState("");

  // ui state
  const [loading, setLoading] = useState(false);
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

    // ❗No API call right now. Simulate submit + loader.
    setLoading(true);

    // mimic network latency then show success
    setTimeout(() => {
      setLoading(false);
      setSuccessMessage("Thank you");
      // optional: clear form
      setRequesterName("");
      setRequesterStaffId("");
      setOrgName("");
      setOrgDescription("");
      setGbgf("");
      setServiceLine("");
      setEimName("");
      setEimId("");
      // optional: navigate after success
      // setTimeout(() => navigate("/auth/login"), 1500);
    }, 1200);
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

          {/* error (validation only; no server errors shown) */}
          {error && (
            <Typography color="error" variant="body2" sx={{ mt: 2 }}>
              {error}
            </Typography>
          )}

          {/* success: show plain 'Thank you' */}
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
                  label="Requester Name"
                />
              </FormControl>

              <FormControl fullWidth>
                <InputLabel>Requester Staff ID</InputLabel>
                <OutlinedInput
                  value={requesterStaffId}
                  onChange={(e) => setRequesterStaffId(e.target.value)}
                  label="Requester Staff ID"
                />
              </FormControl>

              <FormControl fullWidth>
                <InputLabel>Organization Name</InputLabel>
                <OutlinedInput
                  value={orgName}
                  onChange={(e) => setOrgName(e.target.value)}
                  label="Organization Name"
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
                  label="GBGF"
                />
              </FormControl>

              <FormControl fullWidth>
                <InputLabel>Service Line</InputLabel>
                <OutlinedInput
                  value={serviceLine}
                  onChange={(e) => setServiceLine(e.target.value)}
                  label="Service Line"
                />
              </FormControl>

              <FormControl fullWidth>
                <InputLabel>EIM Name</InputLabel>
                <OutlinedInput
                  value={eimName}
                  onChange={(e) => setEimName(e.target.value)}
                  label="EIM Name"
                />
              </FormControl>

              <FormControl fullWidth>
                <InputLabel>EIM ID</InputLabel>
                <OutlinedInput
                  value={eimId}
                  onChange={(e) => setEimId(e.target.value)}
                  label="EIM ID"
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

                <Button type="button" variant="text" onClick={() => navigate("/auth/login")}>
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
