import React, { useState, useEffect } from "react";
import {
  Button,
  Card,
  CardContent,
  Typography,
  Box,
  IconButton,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import MainEnvForm from "../../../components/environment/MainEnvForm";

const Environment = () => {
  const [environments, setEnvironments] = useState([]);
  const [showForm, setShowForm] = useState(false);

  // 🔹 Sample data (replace later with API)
  useEffect(() => {
    setEnvironments([
      { id: 1, org: "org1", project: "projA", envName: "env1", type: "IKP" },
      { id: 2, org: "org2", project: "projB", envName: "env2", type: "HIC" },
    ]);
  }, []);

  // 🔹 Add environment handler
  const handleAddEnvironment = (newEnv) => {
    setEnvironments([...environments, { id: Date.now(), ...newEnv }]);
    setShowForm(false);
  };

  // 🔹 Delete environment handler
  const handleDelete = (id) => {
    const updated = environments.filter((env) => env.id !== id);
    setEnvironments(updated);
  };

  return (
    <Box sx={{ padding: 3 }}>
      <Typography
        variant="h5"
        align="center"
        sx={{ mb: 2, fontWeight: "bold" }}
      >
        Environment Management
      </Typography>

      <Box display="flex" justifyContent="flex-end" mb={2}>
        <Button
          variant="contained"
          color="primary"
          onClick={() => setShowForm(!showForm)}
        >
          {showForm ? "Close Form" : "Add Environment"}
        </Button>
      </Box>

      {showForm && (
        <MainEnvForm
          onAdd={handleAddEnvironment} // ✅ Pass handler
        />
      )}

      <Card sx={{ mt: 3 }}>
        <CardContent>
          <Typography variant="h6" sx={{ mb: 1 }}>
            Existing Environments
          </Typography>
          <table
            className="env-table"
            style={{ width: "100%", borderCollapse: "collapse" }}
          >
            <thead>
              <tr style={{ backgroundColor: "#f5f5f5" }}>
                <th style={{ border: "1px solid #ccc", padding: "8px" }}>
                  Organization
                </th>
                <th style={{ border: "1px solid #ccc", padding: "8px" }}>
                  Project
                </th>
                <th style={{ border: "1px solid #ccc", padding: "8px" }}>
                  Environment
                </th>
                <th style={{ border: "1px solid #ccc", padding: "8px" }}>
                  Type
                </th>
                <th style={{ border: "1px solid #ccc", padding: "8px" }}>
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {environments.map((env) => (
                <tr key={env.id}>
                  <td style={{ border: "1px solid #ccc", padding: "8px" }}>
                    {env.org}
                  </td>
                  <td style={{ border: "1px solid #ccc", padding: "8px" }}>
                    {env.project}
                  </td>
                  <td style={{ border: "1px solid #ccc", padding: "8px" }}>
                    {env.envName}
                  </td>
                  <td style={{ border: "1px solid #ccc", padding: "8px" }}>
                    {env.type}
                  </td>
                  <td
                    style={{
                      border: "1px solid #ccc",
                      padding: "8px",
                      textAlign: "center",
                    }}
                  >
                    <IconButton
                      color="error"
                      onClick={() => handleDelete(env.id)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Environment;
--------------

  import React, { useState, useEffect } from "react";
import { TextField, MenuItem, Box, Typography, Button } from "@mui/material";
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
    <Box sx={{ p: 2, border: "1px solid #ddd", borderRadius: "8px", mb: 2 }}>
      <Typography variant="h6" sx={{ mb: 2 }}>
        Add New Environment
      </Typography>

      <Box display="flex" flexDirection="column" gap={2}>
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
      </Box>

      <Box sx={{ mt: 3 }}>
        {envType === "IKP" && <EnvConfFormIKP />}
        {envType === "HIC" && <EnvConfFormHIC />}
      </Box>

      {/* ✅ Add button to save new environment */}
      <Box display="flex" justifyContent="flex-end" mt={3}>
        <Button variant="contained" color="success" onClick={handleSubmit}>
          Add Environment
        </Button>
      </Box>
    </Box>
  );
};

export default MainEnvForm;
