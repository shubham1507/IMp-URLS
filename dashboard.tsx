import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import MainEnvForm from "../../../components/environment/MainEnvForm";

const Environment = () => {
  const [environments, setEnvironments] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);

  // 🔹 Load sample or API data
  useEffect(() => {
    setEnvironments([
      { id: 1, org: "org1", project: "projA", envName: "env1", type: "IKP" },
      { id: 2, org: "org2", project: "projB", envName: "env2", type: "HIC" },
    ]);
  }, []);

  // 🔹 Add Environment handler
  const handleAddEnvironment = (newEnv) => {
    setEnvironments([...environments, { id: Date.now(), ...newEnv }]);
    setOpenDialog(false);
  };

  // 🔹 Delete Environment handler
  const handleDelete = (id) => {
    const updated = environments.filter((env) => env.id !== id);
    setEnvironments(updated);
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography
        variant="h5"
        sx={{ mb: 2, fontWeight: "bold", textAlign: "center" }}
      >
        Environment Management
      </Typography>

      {/* Add Environment Button */}
      <Box display="flex" justifyContent="flex-end" mb={2}>
        <Button
          variant="contained"
          color="primary"
          onClick={() => setOpenDialog(true)}
        >
          Add Environment
        </Button>
      </Box>

      {/* Environment Table */}
      <Card>
        <CardContent>
          <Typography variant="h6" sx={{ mb: 1 }}>
            Existing Environments
          </Typography>

          <TableContainer
            component={Paper}
            sx={{ borderRadius: "8px", boxShadow: "none" }}
          >
            <Table>
              <TableHead sx={{ backgroundColor: "#f9fafb" }}>
                <TableRow>
                  <TableCell sx={{ fontWeight: 600 }}>Organization</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Project</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Environment</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Type</TableCell>
                  <TableCell
                    sx={{ fontWeight: 600, textAlign: "center", width: "150px" }}
                  >
                    Actions
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {environments.length > 0 ? (
                  environments.map((env) => (
                    <TableRow key={env.id}>
                      <TableCell>{env.org}</TableCell>
                      <TableCell>{env.project}</TableCell>
                      <TableCell>{env.envName}</TableCell>
                      <TableCell>{env.type}</TableCell>
                      <TableCell align="center">
                        <Button
                          variant="outlined"
                          color="error"
                          size="small"
                          sx={{
                            borderRadius: "20px",
                            textTransform: "none",
                            fontWeight: 500,
                          }}
                          onClick={() => handleDelete(env.id)}
                        >
                          Delete
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={5} align="center">
                      No environments available.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>

      {/* ✅ Add Environment Modal */}
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
          <MainEnvForm onAdd={handleAddEnvironment} />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)} color="inherit">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Environment;
-----

  import React, { useState, useEffect } from "react";
import { TextField, MenuItem, Box, Button } from "@mui/material";
import EnvConfFormIKP from "./EnvConfFormIKP";
import EnvConfFormHIC from "./EnvConfFormHIC";

const MainEnvForm = ({ onAdd }) => {
  const [organization, setOrganization] = useState("");
  const [project, setProject] = useState("");
  const [envName, setEnvName] = useState("");
  const [envType, setEnvType] = useState("");
  const [projects, setProjects] = useState([]);

  const orgProjectMap = {
    org1: ["projA", "projB"],
    org2: ["projC", "projD"],
  };

  useEffect(() => {
    if (organization) {
      setProjects(orgProjectMap[organization] || []);
      setProject("");
    }
  }, [organization]);

  const handleSubmit = () => {
    if (!organization || !project || !envName || !envType) {
      alert("Please fill all fields before adding.");
      return;
    }

    const newEnv = {
      org: organization,
      project,
      envName,
      type: envType,
    };
    onAdd(newEnv);

    // reset form
    setOrganization("");
    setProject("");
    setEnvName("");
    setEnvType("");
  };

  return (
    <Box sx={{ mt: 1, display: "flex", flexDirection: "column", gap: 2 }}>
      <TextField
        select
        label="Organization Name"
        value={organization}
        onChange={(e) => setOrganization(e.target.value)}
        fullWidth
      >
        <MenuItem value="org1">org1</MenuItem>
        <MenuItem value="org2">org2</MenuItem>
      </TextField>

      <TextField
        select
        label="Project Name"
        value={project}
        onChange={(e) => setProject(e.target.value)}
        fullWidth
        disabled={!organization}
      >
        {projects.map((p) => (
          <MenuItem key={p} value={p}>
            {p}
          </MenuItem>
        ))}
      </TextField>

      <TextField
        label="Environment Name"
        value={envName}
        onChange={(e) => setEnvName(e.target.value)}
        fullWidth
      />

      <TextField
        select
        label="Environment Type"
        value={envType}
        onChange={(e) => setEnvType(e.target.value)}
        fullWidth
      >
        <MenuItem value="IKP">IKP</MenuItem>
        <MenuItem value="HIC">HIC</MenuItem>
        <MenuItem value="GCP">GCP</MenuItem>
        <MenuItem value="AWS">AWS</MenuItem>
      </TextField>

      {envType === "IKP" && <EnvConfFormIKP />}
      {envType === "HIC" && <EnvConfFormHIC />}

      <Box display="flex" justifyContent="flex-end" mt={3}>
        <Button variant="contained" color="success" onClick={handleSubmit}>
          Add Environment
        </Button>
      </Box>
    </Box>
  );
};

export default MainEnvForm;
