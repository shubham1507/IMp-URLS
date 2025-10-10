import React, { useMemo, useState, useEffect } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Stack,
  Button,
  TextField,
  InputAdornment,
  Divider,
  Tooltip,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import { Trash as TrashIcon } from "@phosphor-icons/react/dist/ssr/Trash";
import MainEnvForm from "../../../components/environment/MainEnvForm";

export default function Environment() {
  const [environments, setEnvironments] = useState([]);
  const [query, setQuery] = useState("");
  const [openDialog, setOpenDialog] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);

  // 🔹 Load sample or API data
  useEffect(() => {
    setEnvironments([
      { id: 1, org: "org1", project: "projA", envName: "env1", type: "IKP" },
      { id: 2, org: "org2", project: "projB", envName: "env2", type: "HIC" },
    ]);
  }, []);

  // 🔹 Filtered search
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return environments;
    return environments.filter(
      (env) =>
        env.org.toLowerCase().includes(q) ||
        env.project.toLowerCase().includes(q) ||
        env.envName.toLowerCase().includes(q) ||
        env.type.toLowerCase().includes(q)
    );
  }, [query, environments]);

  // 🔹 Add Environment
  const handleAddEnvironment = (newEnv) => {
    setEnvironments((prev) => [
      { id: Date.now(), ...newEnv },
      ...prev,
    ]);
    setOpenDialog(false);
  };

  // 🔹 Delete Environment
  const handleDelete = (id) => {
    setEnvironments((prev) => prev.filter((env) => env.id !== id));
  };

  return (
    <Box sx={{ p: { xs: 1, sm: 2 } }}>
      {/* Header Section */}
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        sx={{ mb: 2 }}
      >
        <Typography variant="h5">Environment Management</Typography>

        {/* ✅ Blue Add Environment button (like Access.jsx) */}
        <Stack direction="row" spacing={1}>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => setOpenDialog(true)}
          >
            Add Environment
          </Button>
        </Stack>
      </Stack>

      {/* Search Field */}
      <Card variant="outlined">
        <CardContent>
          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={2}
            alignItems="center"
            sx={{ mb: 2 }}
          >
            <TextField
              fullWidth
              placeholder="Find environment…"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
            />
          </Stack>

          <Divider sx={{ mb: 2 }} />

          {/* Empty State */}
          {filtered.length === 0 ? (
            <Box
              sx={{
                border: (t) => `1px dashed ${t.palette.divider}`,
                borderRadius: 2,
                p: 6,
                textAlign: "center",
                bgcolor: (t) =>
                  t.palette.mode === "light"
                    ? "rgba(0,0,0,0.02)"
                    : "transparent",
              }}
            >
              <Typography variant="h6" sx={{ mb: 1 }}>
                No environments available
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Added environments will appear here once you create them.
              </Typography>
            </Box>
          ) : (
            <Box sx={{ display: "flex", justifyContent: "center" }}>
              <Box sx={{ width: "85%" }}>
                <table
                  style={{
                    width: "100%",
                    borderCollapse: "collapse",
                  }}
                >
                  <thead>
                    <tr>
                      <th align="left" style={{ width: "25%", paddingBottom: 8 }}>
                        Organization
                      </th>
                      <th align="left" style={{ width: "25%", paddingBottom: 8 }}>
                        Project
                      </th>
                      <th align="left" style={{ width: "25%", paddingBottom: 8 }}>
                        Environment
                      </th>
                      <th align="left" style={{ width: "15%" }}>
                        Type
                      </th>
                      <th align="right" style={{ width: "10%" }}>
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {filtered.map((env) => (
                      <tr key={env.id} style={{ borderTop: "1px solid #eee" }}>
                        <td style={{ padding: "12px 8px" }}>
                          <Typography variant="body2" sx={{ fontWeight: 600 }}>
                            {env.org}
                          </Typography>
                        </td>
                        <td style={{ padding: "12px 8px" }}>{env.project}</td>
                        <td style={{ padding: "12px 8px" }}>{env.envName}</td>
                        <td style={{ padding: "12px 8px" }}>{env.type}</td>
                        <td align="right">
                          <Tooltip title="Delete Environment">
                            <IconButton
                              size="small"
                              onClick={() => handleDelete(env.id)}
                            >
                              <TrashIcon size={18} color="#1976d2" />
                            </IconButton>
                          </Tooltip>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </Box>
            </Box>
          )}
        </CardContent>
      </Card>

      {/* === Add Environment Modal === */}
      <Dialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        fullWidth
        maxWidth="md"
      >
        <DialogTitle sx={{ fontWeight: "bold" }}>
          Add New Environment
        </DialogTitle>
        <DialogContent dividers>
          <MainEnvForm
            onAdd={handleAddEnvironment}
            onValidate={(valid) => setIsFormValid(valid)} // enables/disables Add button
          />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => setOpenDialog(false)}
            color="inherit"
            startIcon={<CloseIcon />}
          >
            Cancel
          </Button>
          <Button
            onClick={() => document.getElementById("submitEnvForm")?.click()}
            variant="contained"
            color="primary"
            disabled={!isFormValid}
          >
            Add Environment
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
