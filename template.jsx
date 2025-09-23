import * as React from "react";
import { useState, useEffect } from "react";
import { Link as RouterLink } from "react-router-dom";

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
import { Eye as EyeIcon } from "@phosphor-icons/react/dist/ssr/Eye";
import { XCircle as XCircleIcon } from "@phosphor-icons/react/dist/ssr/XCircle";
import { PauseCircle as PauseCircleIcon } from "@phosphor-icons/react/dist/ssr/PauseCircle";

import { paths } from "@/paths";
import dayjs from "@lib/dayjs";
import { DataTable } from "@components/core/data-table";
import { useExperiments } from "@hooks/useExperiments";

export function BrowseExperimentsTable({
  selectedProject,
  filters,
  experimentsCount,     // (kept if used elsewhere)
  onEyeIconClick,        // (kept if used elsewhere)
  onExperimentsChange,
}) {
  const {
    data: experiments,
    isLoading,
    isError,
    error,
    refetch,
    isFetching,           // from React Query (background fetch flag)
  } = useExperiments(selectedProject, filters);

  // Manual refresh state – used to hide rows and show loader
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Notify parent when data changes
  useEffect(() => {
    if (experiments && onExperimentsChange) onExperimentsChange(experiments);
  }, [experiments, filters, onExperimentsChange]);

  // Manual refresh with 3s minimum loader
  const handleManualRefresh = async () => {
    try {
      setIsRefreshing(true);
      await Promise.all([
        refetch(),                                 // fetch latest
        new Promise((res) => setTimeout(res, 3000)) // min 3s spinner
      ]);
    } finally {
      setIsRefreshing(false);
    }
  };

  // Initial load OR manual refresh: hide table, show loader
  if (isLoading || isRefreshing) {
    return (
      <Box display="flex" alignItems="center" justifyContent="center" sx={{ mt: 2, mb: 2 }}>
        <CircularProgress size={20} color="primary" sx={{ mr: 2 }} />
        <Typography color="primary">Loading experiments ...</Typography>
      </Box>
    );
  }

  if (isError) {
    return (
      <Box sx={{ textAlign: "center", mt: 4 }}>
        <Typography variant="h6" color="error">
          Error loading experiments: {error?.message || "Unknown error"}
        </Typography>
      </Box>
    );
  }

  const columns = [
    {
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
    { field: "id", name: "Experiment UID", width: "150px" },
    { field: "experiment_code", name: "Experiment Id", width: "250px" },
    { field: "environment", name: "Environment type", width: "150px", align: "center" },
    {
      formatter: (row) => dayjs(row.createdAt).format("MMM D, YYYY h:mm A"),
      name: "Creation date and time",
      width: "200px",
      align: "center",
    },
    {
      formatter: (row) => {
        const mapping = {
          running:   { label: "Running",     icon: <ClockIcon        color="var(--mui-palette-warning-main)" weight="fill" /> },
          completed: { label: "Completed",   icon: <CheckCircleIcon  color="var(--mui-palette-success-main)" weight="fill" /> },
          failed:    { label: "Failed",      icon: <XCircleIcon      color="var(--mui-palette-error-main)"  weight="fill" /> },
          pending:   { label: "Not Executed",icon: <PauseCircleIcon  size={20} color="var(--mui-palette-info-main)" weight="fill" /> },
        };
        const { label, icon } = mapping[row.status] || { label: "Unknown", icon: null };
        return <Chip icon={icon} label={label} size="small" variant="outlined" />;
      },
      name: "Status",
      width: "175px",
      align: "left",
    },
    {
      formatter: (row) => (
        <IconButton
          component={RouterLink}
          to={paths.dashboard.experiments.details(row.id)}
          onClick={() => onEyeIconClick?.(row)}
        >
          <EyeIcon />
        </IconButton>
      ),
      name: "Actions",
      hideName: true,
      width: "50px",
      align: "right",
    },
  ];

  const formattedRows =
    experiments?.data?.map((row) => ({
      id: row.id,
      name: row.name,
      experiment_code: row.experiment_code,
      executedBy: row.executed_by?.staff_id || "N/A",
      createdAt: row.created_at,
      environment: row.environment_type,
      status: row.status || "Unknown",
      outcome: row.result?.findings?.outcome || "N/A",
    })) || [];

  return (
    <React.Fragment>
      {/* Sticky header with Refresh */}
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
          display: "flex",
          justifyContent: "flex-start",
        }}
      >
        <Tooltip title="Reload latest experiments now">
          <span>
            <Button
              variant="contained"
              size="small"
              color="primary"
              onClick={handleManualRefresh}
              disabled={isRefreshing || isFetching}
              startIcon={!(isRefreshing || isFetching) ? <RefreshIcon /> : null}
            >
              {isRefreshing || isFetching ? (
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

      {/* Table (hidden during refresh by the early return above) */}
      <DataTable
        columns={columns}
        rows={formattedRows}
        key={formattedRows.map((row) => row.id).join(",")}
      />

      {formattedRows.length === 0 ? (
        <Box sx={{ mt: 2, mb: 2 }}>
          <Typography color="text.secondary" sx={{ textAlign: "center" }} variant="body2">
            No experiments found
          </Typography>
        </Box>
      ) : null}
    </React.Fragment>
  );
}
