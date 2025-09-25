// src/components/dashboard/experiments/create-experiment/parameters/deployment-roling-update-faluire-parameters.jsx
import React, { useMemo } from "react";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Checkbox from "@mui/material/Checkbox";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import Switch from "@mui/material/Switch";
import FormControlLabel from "@mui/material/FormControlLabel";
import Divider from "@mui/material/Divider";

/**
 * PARAMETERS THIS COMPONENT HANDLES
 * - resources: string[] (selected deployment names)
 * - targetMode: "all" | "first" | "by_name"     (dropdown)
 * - waitTimeout: number                          (seconds; default 120)
 * - autoRestore: boolean                         (toggle; default true)
 *
 * PROPS
 * - deployments: string[]  => all available deployment names to choose from
 * - parameters: object     => current parameters object (from form state)
 * - onChange:   fn(next)   => called with the merged parameters when anything changes
 *
 * NOTE: keep the field keys aligned with your backend / review step.
 */
export default function DeploymentRolingUpdateFaluireParameters({
  deployments = [],
  parameters = {},
  onChange = () => {},
}) {
  // defaults (non-destructive merge)
  const params = useMemo(
    () => ({
      resources: [],
      targetMode: "first",
      waitTimeout: 120,
      autoRestore: true,
      ...parameters,
    }),
    [parameters]
  );

  const toggleResource = (name) => {
    const exists = params.resources.includes(name);
    const resources = exists
      ? params.resources.filter((n) => n !== name)
      : [...params.resources, name];
    onChange({ ...params, resources });
  };

  const handleTargetMode = (e) => onChange({ ...params, targetMode: e.target.value });
  const handleWaitTimeout = (e) =>
    onChange({ ...params, waitTimeout: Number(e.target.value) || 0 });
  const handleAutoRestore = (e) => onChange({ ...params, autoRestore: e.target.checked });

  return (
    <Stack direction={{ xs: "column", md: "row" }} spacing={3}>
      {/* Left: Select Deployments */}
      <Box sx={{ flex: 1, minWidth: 300 }}>
        <Typography variant="h6" sx={{ mb: 1 }}>
          Select Deployments for failure
        </Typography>
        <List dense disablePadding>
          {deployments.map((name) => {
            const checked = params.resources.includes(name);
            return (
              <ListItem
                key={name}
                onClick={() => toggleResource(name)}
                secondaryAction={
                  <Checkbox edge="end" checked={checked} onChange={() => toggleResource(name)} />
                }
                sx={{ py: 0.25 }}
              >
                <ListItemText primary={name} />
              </ListItem>
            );
          })}
          {deployments.length === 0 && (
            <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
              No deployments found in this namespace/cluster.
            </Typography>
          )}
        </List>
      </Box>

      <Divider flexItem orientation="vertical" sx={{ display: { xs: "none", md: "block" } }} />

      {/* Right: Parameters */}
      <Stack spacing={2} sx={{ flex: 1, minWidth: 280 }}>
        <Typography variant="h6">Rolling Update Failure Parameters</Typography>

        <FormControl fullWidth>
          <InputLabel id="target-mode-label">Target Mode</InputLabel>
          <Select
            labelId="target-mode-label"
            label="Target Mode"
            value={params.targetMode}
            onChange={handleTargetMode}
          >
            {/* Use the labels you prefer; values should match what the API expects */}
            <MenuItem value="all">All</MenuItem>
            <MenuItem value="first">First</MenuItem>
            <MenuItem value="by_name">By Name</MenuItem>
          </Select>
        </FormControl>

        <TextField
          type="number"
          label="Wait Timeout (seconds)"
          value={params.waitTimeout}
          onChange={handleWaitTimeout}
          inputProps={{ min: 0 }}
          fullWidth
        />

        <FormControlLabel
          control={<Switch checked={!!params.autoRestore} onChange={handleAutoRestore} />}
          label="Auto restore"
        />
      </Stack>
    </Stack>
  );
}
