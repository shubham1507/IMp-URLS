import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import CircularProgress from "@mui/material/CircularProgress";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import RefreshIcon from "@mui/icons-material/Refresh";

import { CheckCircle as CheckCircleIcon } from "@phosphor-icons/react/dist/ssr/CheckCircle";
import { Clock as ClockIcon } from "@phosphor-icons/react/dist/ssr/Clock";
import { PlayCircle as PlayCircleIcon } from "@phosphor-icons/react/dist/ssr/PlayCircle";
import { Trash as TrashIcon } from "@phosphor-icons/react/dist/ssr/Trash";
import { Image as ImageIcon } from "@phosphor-icons/react/dist/ssr/Image";
import { XCircle as XCircleIcon } from "@phosphor-icons/react/dist/ssr/XCircle";
import { Hourglass as HourglassIcon } from "@phosphor-icons/react/dist/ssr/Hourglass";
import { PauseCircle as PauseCircleIcon } from "@phosphor-icons/react/dist/ssr/PauseCircle";

import { ExecuteExperimentModal } from "@/components/dashboard/experiments/execute/execute-experiment-modal";
import { DeleteExperimentModal } from "@/components/dashboard/experiments/execute/delete-experiment-modal";
import dayjs from "@/lib/dayjs";
import { DataTable } from "@/components/core/data-table";
import { useExperiments } from "@/hooks/useExperiments";

export function ExecuteExperimentsTable({ selectedProject, filters, onExperimentsChange }) {
  // Fetch experiments; refetch is used by the manual Refresh button
  const { data: experiments, isLoading, isError, error, refetch } =
    useExperiments(selectedProject, filters);

  // UI state
  const [isRefreshing, setIsRefreshing] = useState(false); // manual refresh flag
  const [executeModalOpen, setExecuteModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [selectedExperimentId, setSelectedExperimentId] = useState(null);

  // Optional: inform parent whenever data changes
  useEffect(() => {
    if (experiments && onExperimentsChange) {
      onExperimentsChange(experiments);
    }
  }, [experiments, filters, onExperimentsChange]);

  // Open Execute modal
  const handleClickExecuteModal = (row) => {
    setSelectedRow(row); // keep whole row for modal
    setSelectedExperimentId(row.id); // id used by modal if needed
    setExecuteModalOpen(true);
  };

  // Close Execute modal
  const handleCloseExecuteModal = () => {
    setExecuteModalOpen(false);
    setSelectedRow(null); // clear selection
  };

  // Open Delete modal
  const handleClickDeleteModal = (experimentId) => {
    setSelectedExperimentId(experimentId);
    setDeleteModalOpen(true);
  };

  // Close Delete modal
  const handleCloseDeleteModal = () => {
    setDeleteModalOpen(false);
    setSelectedExperimentId(null);
  };

  // Manual refresh wrapper: hide rows, show "Loading data...", then refetch
  const handleManualRefresh = async () => {
    try {
      setIsRefreshing(true);
      await refetch();
    } finally {
      setIsRefreshing(false);
    }
  };

  // Initial load (first render) OR manual refresh loading UI
  if (isLoading || isRefreshing) {
    return (
      <Box display="flex" alignItems="center" justifyContent="center" sx={{ mt: 2, mb: 2 }}>
        <CircularProgress size={20} color="primary" sx={{ mr: 2 }} />
        <Typography color="primary">Loading experiments ...</Typography>
      </Box>
    );
  }

  // Error state
  if (isError) {
    return (
      <Box sx={{ textAlign: "center", mt: 4 }}>
        <Typography variant="h6" color="error">
          Error loading experiments: {error?.message || "Unknown error"}
        </Typography>
      </Box>
    );
  }

  // Table columns
  const columns = [
    {
      // Name with custom cell UI
      formatter: (row) => (
        <Stack direction="row" spacing={2} sx={{ alignItems: "center" }}>
          <Typography color="text.primary" variant="body2">
            {row.name}
          </Typography>
        </Stack>
      ),
      name: "Experiment name",
      width: "150px",
      align: "center",
    },
    {
      field: "uid",
      name: "Experiment UID",
      width: "150px",
    },
    {
      field: "experiment_code",
      name: "Experiment Id",
      width: "250px",
    },
    {
      field: "environment",
      name: "Environment type",
      width: "150px",
      align: "center",
    },
    {
      // Status with Chip + icon mapping
      name: "Status",
      width: "150px",
      align: "left",
      formatter: (row) => {
        const mapping = {
          running: {
            label: "Running",
            icon: <ClockIcon color="var(--mui-palette-warning-main)" weight="fill" />,
          },
          completed: {
            label: "Completed",
            icon: <CheckCircleIcon color="var(--mui-palette-success-main)" weight="fill" />,
          },
          failed: {
            label: "Failed",
            icon: <XCircleIcon color="var(--mui-palette-error-main)" weight="fill" />,
          },
          pending: {
            label: "Not Executed",
            icon: <PauseCircleIcon size={20} color="var(--mui-palette-info-main)" weight="fill" />,
          },
        };
        const { label, icon } = mapping[row.status] ?? { label: "Unknown", icon: null };
        return <Chip icon={icon} label={label} size="small" variant="outlined" />;
      },
    },
    {
      // Execute action
      formatter: (row) => (
        <IconButton onClick={() => handleClickExecuteModal(row)}>
          <PlayCircleIcon weight="bold" color="red" />
        </IconButton>
      ),
      name: "Action",
      width: "100px",
      align: "left",
    },
    {
      // Delete action
      formatter: (row) => (
        <IconButton onClick={() => handleClickDeleteModal(row.id)}>
          <TrashIcon color="blue" />
        </IconButton>
      ),
      name: "Delete",
      width: "100px",
      align: "center",
    },
  ];

  // Normalize API data into rows expected by DataTable
  const formattedRows = (experiments?.data || []).map((row) => ({
    id: row.id, // internal key for row
    uid: row.uid || row.experiment_uid || "N/A", // Experiment UID
    action: row.action,
    name: row.name,
    experiment_code: row.experiment_code || row.code || "N/A", // Experiment Id/code
    executedBy: row.executed_by?.staff_id ?? row.executed_by_staff_id ?? "NA",
    createdAt: dayjs(row.created_at || row.createdAt).format("MMM D, YYYY h:mm A"),
    environment: row.environment?.type || row.environment_type || "Unknown",
    status: row.status ?? "Unknown",
    outcome: row.result?.findings?.outcome ?? "N/A",
    parameters:
      typeof row.parameters === "object"
        ? JSON.stringify(row.parameters)
        : row.parameters || "N/A",
  }));

  return (
    <React.Fragment>
      {/* Sticky Refresh header */}
      <Box
        sx={{
          position: "sticky",
          top: 0,
          zIndex: 2,
          mb: 2,
          pt: 1,
          pb: 1,
          bgcolor: "background.paper",
          borderBottom: (theme) => `1px solid ${theme.palette.divider}`,
        }}
      >
        <Tooltip title="Reload latest experiments now">
          <span>
            <Button
              variant="contained"
              color="primary"
              size="small"
              onClick={handleManualRefresh} // NOTE: onClick (camelCase)
              disabled={isRefreshing}
              startIcon={!isRefreshing ? <RefreshIcon /> : null}
            >
              {isRefreshing ? (
                <>
                  <CircularProgress size={16} sx={{ mr: 1 }} />
                  Refreshing…
                </>
              ) : (
                "Refresh"
              )}
            </Button>
          </span>
        </Tooltip>
      </Box>

      {/* Data table */}
      <DataTable
        columns={columns}
        rows={formattedRows}
        key={formattedRows.map((row) => row.id).join(",")}
      />

      {/* Empty state */}
      {formattedRows.length === 0 ? (
        <Box sx={{ mt: 2, mb: 2 }}>
          <Typography color="text.secondary" sx={{ textAlign: "center" }} variant="body2">
            No pending experiments found waiting for execution.
          </Typography>
        </Box>
      ) : null}

      {/* Delete modal */}
      {deleteModalOpen && (
        <DeleteExperimentModal
          open={deleteModalOpen}
          onClose={handleCloseDeleteModal}
          experimentId={selectedExperimentId}
        />
      )}

      {/* Execute modal */}
      {executeModalOpen && (
        <ExecuteExperimentModal
          open={executeModalOpen}
          onClose={handleCloseExecuteModal}
          rowData={selectedRow}
          experimentId={selectedExperimentId}
        />
