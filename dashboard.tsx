import React, { useState, useEffect } from "react";
import { Button, Card, CardContent, Typography, Box } from "@mui/material";
import MainEnvForm from "../components/environment/MainEnvForm";

const Environment = () => {
  const [environments, setEnvironments] = useState([]);
  const [showForm, setShowForm] = useState(false);

  // Sample data (replace with API call)
  useEffect(() => {
    setEnvironments([
      { id: 1, org: "org1", project: "projA", envName: "env1", type: "IKP" },
      { id: 2, org: "org2", project: "projB", envName: "env2", type: "HIC" },
    ]);
  }, []);

  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h5" align="center" sx={{ mb: 2, fontWeight: "bold" }}>
        Environment Management
      </Typography>

      <Box display="flex" justifyContent="flex-end" mb={2}>
        <Button variant="contained" color="primary" onClick={() => setShowForm(!showForm)}>
          {showForm ? "Close Form" : "Add Environment"}
        </Button>
      </Box>

      {showForm && <MainEnvForm />}

      <Card sx={{ mt: 3 }}>
        <CardContent>
          <Typography variant="h6" sx={{ mb: 1 }}>
            Existing Environments
          </Typography>
          <table className="env-table" style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ backgroundColor: "#f5f5f5" }}>
                <th style={{ border: "1px solid #ccc", padding: "8px" }}>Organization</th>
                <th style={{ border: "1px solid #ccc", padding: "8px" }}>Project</th>
                <th style={{ border: "1px solid #ccc", padding: "8px" }}>Environment</th>
                <th style={{ border: "1px solid #ccc", padding: "8px" }}>Type</th>
              </tr>
            </thead>
            <tbody>
              {environments.map((env) => (
                <tr key={env.id}>
                  <td style={{ border: "1px solid #ccc", padding: "8px" }}>{env.org}</td>
                  <td style={{ border: "1px solid #ccc", padding: "8px" }}>{env.project}</td>
                  <td style={{ border: "1px solid #ccc", padding: "8px" }}>{env.envName}</td>
                  <td style={{ border: "1px solid #ccc", padding: "8px" }}>{env.type}</td>
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
----------------------------------------------------------------------------

  //MainForm

  import React, { useState, useEffect } from "react";
import { TextField, MenuItem, Box, Typography } from "@mui/material";
import EnvConfFormIKP from "./EnvConfFormIKP";
import EnvConfFormHIC from "./EnvConfFormHIC";

const MainEnvForm = () => {
  const [organization, setOrganization] = useState("");
  const [project, setProject] = useState("");
  const [envName, setEnvName] = useState("");
  const [envType, setEnvType] = useState("");

  const [projects, setProjects] = useState([]);

  // Mock org-project data
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

      {/* Render environment configuration based on selected type */}
      <Box sx={{ mt: 3 }}>
        {envType === "IKP" && <EnvConfFormIKP />}
        {envType === "HIC" && <EnvConfFormHIC />}
        {/* Future: Add EnvConfFormGCP, EnvConfFormAWS */}
      </Box>
    </Box>
  );
};

export default MainEnvForm;
--------------------------------------

  // EnvConfFormIKP

  import React from "react";
import { TextField, Box, Typography } from "@mui/material";

const EnvConfFormIKP = () => {
  return (
    <Box sx={{ mt: 2, p: 2, border: "1px solid #ccc", borderRadius: "6px" }}>
      <Typography variant="subtitle1" sx={{ mb: 2 }}>
        IKP Environment Configuration
      </Typography>

      <Box display="flex" flexDirection="column" gap={2}>
        <TextField label="Cluster Name" fullWidth />
        <TextField label="Namespace" fullWidth />
        <TextField label="Context" fullWidth />
        <TextField label="Kubectl Configuration" fullWidth multiline rows={4} />
      </Box>
    </Box>
  );
};

export default EnvConfFormIKP;

//
import React from "react";
import { TextField, Box, Typography } from "@mui/material";

const EnvConfFormHIC = () => {
  return (
    <Box sx={{ mt: 2, p: 2, border: "1px solid #ccc", borderRadius: "6px" }}>
      <Typography variant="subtitle1" sx={{ mb: 2 }}>
        HIC Environment Configuration
      </Typography>

      <Box display="flex" flexDirection="column" gap={2}>
        <TextField label="Cluster ID" fullWidth />
        <TextField label="Environment Token" fullWidth />
      </Box>
    </Box>
  );
};

export default EnvConfFormHIC;

