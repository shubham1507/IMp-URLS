import React, { useState } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import FormGroup from "@mui/material/FormGroup";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormHelperText from "@mui/material/FormHelperText";
import Checkbox from "@mui/material/Checkbox";
import TextField from "@mui/material/TextField";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Switch from "@mui/material/Switch";
import Alert from "@mui/material/Alert";
import CircularProgress from "@mui/material/CircularProgress";

// NOTE: these two mirrors your pods version but for deployments:
import { useChaosOrchestratorQueries } from "@/hooks/usechaosorchestratorqueries";
import { fetchIKPDeploymentsList } from "@/api/ikp/deployments"; // <— create if not present

export default function IKPDeploymentDeleteParameters({
  formData,
  setFormData,
  onResourcesChange,
}) {
  const namespace = formData.parameters?.namespace;
  const env_id = formData.envId;

  // queryKey/fn should mirror pods but with "deployments"
  const queryKey = ["deployments", env_id, namespace];
  const queryFn = () => fetchIKPDeploymentsList(env_id, namespace);
  const queryOptions = { retry: 3, staleTime: 10 * 60 * 1000, refetchOnWindowFocus: false };

  const { data, isLoading, isSuccess, isError, error } =
    useChaosOrchestratorQueries(queryKey, queryFn, queryOptions);

  // same mapping as pods component, but to deployment names
  const resourceList = data?.data?.items?.map((item) => item?.name) ?? [];

  // keep selected list inside formData.parameters.resources
  const resources = formData?.parameters?.resources ?? [];

  const setResources = (next) =>
    setFormData((prev) => ({
      ...prev,
      parameters: { ...prev.parameters, resources: next },
    }));

  const handleResourceChange = (e) => {
    const { checked, value } = e.target;
    const next = checked
      ? [...new Set([...resources, value])]
      : resources.filter((n) => n !== value);

    setResources(next);
    onResourcesChange?.(next); // if your pods component calls this
  };

  // dry-run, timeout, propagation — same as pods
  const setParam = (key, value) =>
    setFormData((prev) => ({
      ...prev,
      parameters: { ...prev.parameters, [key]: value },
    }));

  if (isLoading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="280px">
        <CircularProgress size={20} />
        <Typography sx={{ ml: 1 }}>Loading deployments…</Typography>
      </Box>
    );
  }

  if (isError) {
    return (
      <Alert severity="error" sx={{ mt: 2 }}>
        {error?.response?.status === 404
          ? "No deployments found for the given environment/namespace."
          : `Error loading deployments: ${error?.message}`}
      </Alert>
    );
  }

  if (isSuccess) {
    return (
      <Stack spacing={3} divider={<Divider flexItem />}>
        <Grid container spacing={3}>
          <Grid item md={4} xs={12}>
            <Typography variant="h6" gutterBottom sx={{ pb: 3 }}>
              Select deployments for deletion
            </Typography>
            <FormControl component="fieldset">
              <FormGroup>
                {resourceList.map((name, idx) => (
                  <FormControlLabel
                    key={idx}
                    control={
                      <Checkbox
                        checked={resources.includes(name)}
                        onChange={handleResourceChange}
                        value={name}
                        name={name}
                      />
                    }
                    label={name}
                  />
                ))}
              </FormGroup>
              {resources.length === 0 && (
                <FormHelperText>Select at least one deployment</FormHelperText>
              )}
            </FormControl>
          </Grid>

          <Grid item md={4} xs={12}>
            <Typography variant="h6" gutterBottom sx={{ pb: 3 }}>
              Dry Run
            </Typography>
            <FormControlLabel
              control={
                <Switch
                  checked={formData?.parameters?.dryrun ?? false}
                  onChange={(e) => setParam("dryrun", e.target.checked)}
                />
              }
              label={formData?.parameters?.dryrun ? "enabled" : "disabled"}
            />
          </Grid>

          <Grid item md={4} xs={12}>
            <Typography variant="h6" gutterBottom sx={{ pb: 3 }}>
              Graceful Deletion Timeout (seconds)
            </Typography>
            <TextField
              type="number"
              variant="outlined"
              defaultValue={0}
              inputProps={{ min: 0 }}
              value={formData?.parameters?.gracefulDeletionTimeout ?? 0}
              onChange={(e) => setParam("gracefulDeletionTimeout", Number(e.target.value || 0))}
            />
          </Grid>

          <Grid item md={4} xs={12}>
            <Typography variant="h6" gutterBottom sx={{ pb: 3 }}>
              Propagation policy
            </Typography>
            <Select
              value={formData?.parameters?.propagationpolicy ?? "Background"}
              onChange={(e) => setParam("propagationpolicy", e.target.value)}
              sx={{ width: "250px" }}
            >
              <MenuItem value="Background">Background</MenuItem>
              <MenuItem value="Foreground">Foreground</MenuItem>
              <MenuItem value="Orphan">Orphan</MenuItem>
            </Select>
          </Grid>
        </Grid>
      </Stack>
    );
  }

  return null;
}
