import React, { useState } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  Button,
  Box,
  Stack,
  Typography,
  Divider,
  IconButton,
  Card,
  CardContent,
  Chip,
  Grid,
  Alert,
  CircularProgress,
} from "@mui/material";
import { PlayCircle as PlayCircleIcon } from "@phosphor-icons/react/dist/ssr/PlayCircle";
import { CheckCircle as CheckCircleIcon } from "@phosphor-icons/react/dist/ssr/CheckCircle";
import { Warning as WarningIcon } from "@mui/icons-material/Warning";
import { Error as ErrorIcon } from "@mui/icons-material/Error";
import { useExperimentMutations } from "@hooks/useExperimentMutations";

//
// Drop-in modal that shows row data (from the first API call) inside the confirm dialog
//
export function ExecuteExperimentModal({ open, onClose, rowdata, parameters }) {
  // your hook (unchanged)
  const {
    executeExperimentMutation, // POST /execute
    isExecutePending,
    isExecuteSuccess,
    isExecuteError,
    executeError,
  } = useExperimentMutations();

  const [executeStatus, setExecuteStatus] = useState(null); // "executing" | "success" | "error"

  // ADDED: tiny helper to render a label/value pair neatly
  const Item = ({ label, value }) => (
    <Stack direction="row" spacing={1}>
      <Typography variant="body2" sx={{ minWidth: 170, color: "text.secondary" }}>
        {label}:
      </Typography>
      <Typography variant="body2">{value ?? "—"}</Typography>
    </Stack>
  );

  // Build payload as you already had (keep your keys)
  const experimentId = rowdata?._id || rowdata?.id; // ADDED: support either key safely

  const payload = {
    executed_by: "43226675", // TODO: replace with real user id
    overrides: {
      action: rowdata?.action,
      resource_name: rowdata?.resource_name,
      resource_namespace: rowdata?.resource_namespace,
      environment_type: rowdata?.environment_type || rowdata?.environmentType,
      // ADDED: forward parameters from list page if present
      parameters: parameters || rowdata?.parameters || null,
      // keep your other fields if you had them (grace period, propagation, etc.)
    },
    force: false,
  };

  const handleClose = () => {
    setExecuteStatus(null);
    onClose?.();
  };

  const handleExecuteExperiment = async () => {
    setExecuteStatus("executing");
    try {
      await executeExperimentMutation.mutateAsync({ experimentId, payload });
      setExecuteStatus("success");
    } catch (error) {
      setExecuteStatus("error");
      // optional: log error.response?.data?.detail
      // console.error(error);
    }
  };

  return (
    <Dialog open={!!open} onClose={handleClose} fullWidth maxWidth="md">
      <Card elevation={0} sx={{ borderRadius: 0 }}>
        <Stack spacing={2} padding={2}>
          <Stack direction="row" justifyContent="space-between" alignItems="center">
            <Typography variant="h6" component="div">
              {/* Title shows the id from the list API */}
              Confirm Execution: <b>Experiment Id</b> – {experimentId || "—"}
            </Typography>
          </Stack>

          {/* ADDED: Details pulled from the first page API (rowdata) */}
          <DialogContent dividers sx={{ pt: 1 }}>
            <Stack spacing={1.25}>
              <Item label="Experiment name" value={rowdata?.name} />
              <Item label="Experiment UID" value={rowdata?.uid || rowdata?.experiment_uid} />
              <Item
                label="Environment type"
                value={rowdata?.environmentType || rowdata?.environment_type}
              />
              <Item label="Resource type" value={rowdata?.resource_type} />
              <Item label="Resource name" value={rowdata?.resource_name} />
              <Item label="Namespace" value={rowdata?.resource_namespace} />
              <Item label="Action" value={rowdata?.action} />
              <Item label="Created at" value={rowdata?.createdAt || rowdata?.created_at} />

              {/* ADDED: Show parameters if available from the list call */}
              {(parameters || rowdata?.parameters) && (
                <>
                  <Divider sx={{ my: 1 }} />
                  <Typography variant="subtitle2">Parameters</Typography>
                  <Stack sx={{ pl: 1 }}>
                    {Object.entries(parameters || rowdata?.parameters || {}).map(([k, v]) => (
                      <Typography key={k} variant="body2">
                        • {k}: {typeof v === "object" ? JSON.stringify(v) : String(v)}
                      </Typography>
                    ))}
                  </Stack>
                </>
              )}

              {/* Existing info banner */}
              <Alert severity="info" icon={<WarningIcon />} sx={{ mt: 1 }}>
                Please review the experiment details before execution.
              </Alert>

              {/* Pending / Success / Error states (unchanged, just grouped) */}
              {executeStatus === "executing" && (
                <Alert severity="info" icon={<CircularProgress size={20} color="inherit" />}>
                  Executing experiment, please wait…
                </Alert>
              )}

              {executeStatus === "success" && (
                <Alert severity="success" icon={<CheckCircleIcon />}>
                  <Typography variant="body2" component="div">
                    <b>Experiment</b> executed successfully.
                  </Typography>
                </Alert>
              )}

              {executeStatus === "error" && (
                <Alert severity="error" icon={<ErrorIcon />}>
                  <Typography variant="body2" component="div" sx={{ color: "red" }}>
                    Failed to execute the experiment.
                  </Typography>
                  {/* If your API errors are arrays, render them safely */}
                  {Array.isArray(executeError?.response?.data?.detail) &&
                    executeError.response.data.detail.map((err, i) => (
                      <Typography key={i} variant="caption" sx={{ display: "block" }}>
                        {err.msg} {err?.loc ? `(at ${err.loc.join(" > ")})` : ""}
                      </Typography>
                    ))}
                </Alert>
              )}
            </Stack>
          </DialogContent>

          <DialogActions sx={{ px: 2 }}>
            <Button onClick={handleClose} color="info" variant="outlined">
              Cancel
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={handleExecuteExperiment}
              startIcon={<PlayCircleIcon />}
              disabled={executeStatus === "executing"}
            >
              Execute Experiment
            </Button>
          </DialogActions>
        </Stack>
      </Card>
    </Dialog>
  );
}

export default ExecuteExperimentModal;
