import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  Divider,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";

import Alert from "@mui/material/Alert";
import InfoIcon from "@mui/icons-material/Info";
import ErrorIcon from "@mui/icons-material/Error";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import CircularProgress from "@mui/material/CircularProgress";

import { PlayCircle } from "@phosphor-icons/react/dist/ssr/PlayCircle";
import { X as XIcon } from "@phosphor-icons/react/dist/ssr/X";

import { useExperimentMutations } from "@hooks/useExperimentMutations";
import dayjs from "dayjs"; // ADDED: for formatting created_at

export function ExecuteExperimentModal({ open, onClose, rowData }) {
  console.log("rowData => ", rowData);
  const parameters = JSON.parse(rowData?.parameters || "{}");
  console.log("parameters => ", parameters);

  const experimentId = rowData?.id;

  // ADDED: derive the exact fields to display from the API shape you showed
  const experimentName  = rowData?.name ?? "N/A"; // UPDATED: use `name` from API
  const experimentCode  = rowData?.experiment_code ?? "N/A";
  const createdDatetime = rowData?.created_at
    ? dayjs(rowData.created_at).format("MMM D, YYYY h:mm A")
    : "N/A";
  const description     = rowData?.description ?? "N/A";
  const platform        = rowData?.parameters?.platform ?? "N/A";
  const clusterName     = rowData?.parameters?.clusterName ?? "N/A";
  const resourceNames   = Array.isArray(rowData?.resources)
    ? rowData.resources.map((r) => r?.name).filter(Boolean).join(", ")
    : "N/A";

  const { executeExperimentMutation } = useExperimentMutations();
  const [executeStatus, setExecuteStatus] = useState(null);

  const {
    data: executeData,
    isPending: isExecutePending,
    isSuccess: isExecuteSuccess,
    isError: isExecuteError,
    error: executeError,
  } = executeExperimentMutation;

  // Payload used by Execute API
  let payload = {
    executedBy: "432626757", // Replace with dynamic user ID if needed
    action: rowData.action,
    resources: rowData.resources,
    parameters: rowData.parameters,
    force: false,
    overrides: {
      dryRun: false,
      propagation_policy: rowData.propagation_policy,
      grace_period_seconds: rowData.grace_period_seconds,
    },
  };

  const handleClose = () => {
    setExecuteStatus(null);
    onClose();
  };

  const handleExecuteExperiment = async () => {
    setExecuteStatus("executing");
    console.log("payload => ", payload);

    try {
      await executeExperimentMutation.mutateAsync({ experimentId, payload });
    } catch (error) {
      console.error(
        "Error executing experiment:",
        error?.response?.data?.detail?.findings?.body?.message
      );
    }
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="execute-experiment-modal"
      fullWidth
      maxWidth="sm" // UPDATED: slightly smaller modal (optional)
    >
      <Card>
        <Stack spacing={2} padding={2}>
          {/* Title */}
          <Typography
            variant="h6"
            sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}
          >
            Confirm Execution: <b>{experimentId}</b>
            <IconButton onClick={handleClose}>
              <XIcon size={20} />
            </IconButton>
          </Typography>

          {/* Info alert */}
          {executeStatus === null && (
            <Alert
              severity="info"
              icon={<InfoIcon fontSize="inherit" style={{ color: "orange" }} />}
            >
              Please review the experiment details before execution.
            </Alert>
          )}

          {/* MOVED BELOW ALERT: Details card now appears after the info message */}
          <Card variant="outlined" sx={{ p: 2 }}>
            <Stack spacing={1}>
              <Typography variant="body2"><b>Experiment Name</b> — {experimentName}</Typography>
              <Typography variant="body2"><b>Experiment Code</b> — {experimentCode}</Typography>
              <Typography variant="body2"><b>Creation Datetime</b> — {createdDatetime}</Typography>
              <Typography variant="body2"><b>Description</b> — {description}</Typography>
              <Typography variant="body2"><b>Platform</b> — {platform}</Typography>
              <Typography variant="body2"><b>Cluster Name</b> — {clusterName}</Typography>
              <Typography variant="body2"><b>Resources (Only Names)</b> — {resourceNames}</Typography>
            </Stack>
          </Card>

          {/* Success / Error / Pending states */}
          {isExecuteSuccess && (
            <Alert
              severity="success"
              icon={<CheckCircleIcon fontSize="inherit" style={{ color: "green" }} />}
            >
              Experiment <b>{experimentId}</b> executed successfully.
            </Alert>
          )}

          {isExecuteError && (
            <Alert
              severity="error"
              icon={<ErrorIcon fontSize="inherit" style={{ color: "red" }} />}
            >
              Failed to execute the experiment:
              <div>
                {Array.isArray(executeError?.response?.data?.detail?.api_error)
                  ? executeError.response.data.detail.api_error.map((err, index) => (
                      <div key={index}>
                        {err.msg} [{(err.loc || []).join(" -> ")}]
                      </div>
                    ))
                  : executeError?.response?.data?.detail?.message}
              </div>
            </Alert>
          )}

          {isExecutePending && (
            <Alert severity="info" icon={<CircularProgress size={20} color="inherit" />}>
              Executing experiment, please wait...
            </Alert>
          )}
        </Stack>

        <Divider />

        {/* Footer actions */}
        <DialogActions>
          <Button onClick={handleClose} color="info" variant="outlined">
            Close
          </Button>

          {executeStatus === null && (
            <Button
              onClick={handleExecuteExperiment}
              variant="contained"
              color="primary"
              startIcon={<PlayCircle />}
              sx={{ alignSelf: "flex-end" }}
            >
              Execute Experiment
            </Button>
          )}
        </DialogActions>
      </Card>
    </Dialog>
  );
}
