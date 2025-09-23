import React, { useState } from "react";
import { Box, Typography, CircularProgress, Button } from "@mui/material";
import { DataTable } from "@components/core/data-table";
import { useExperiments } from "@hooks/useExperiments";

export function ExecuteExperimentsTable({ selectedProject, filters }) {
  const { data: experiments, isLoading, isError, error, refetch, isFetching } =
    useExperiments(selectedProject, filters);

  // local state for "refresh clicked"
  const [refreshing, setRefreshing] = useState(false);

  const handleRefresh = async () => {
    setRefreshing(true);       // start loading state
    await refetch();           // call API
    setRefreshing(false);      // stop loading state
  };

  if (isLoading || refreshing || isFetching) {
    return (
      <Box display="flex" alignItems="center" justifyContent="center" sx={{ mt: 4, mb: 4 }}>
        <CircularProgress size={20} sx={{ mr: 2 }} />
        <Typography variant="body2">Loading data...</Typography>
      </Box>
    );
  }

  if (isError) {
    return (
      <Box sx={{ textAlign: "center", mt: 4 }}>
        <Typography variant="body2" color="error">
          {error.message}
        </Typography>
      </Box>
    );
  }

  const rows = experiments?.data || [];

  return (
    <React.Fragment>
      {/* 🔄 Refresh button */}
      <Box sx={{ display: "flex", justifyContent: "flex-start", mb: 2 }}>
        <Button onClick={handleRefresh} variant="contained" size="small">
          Refresh
        </Button>
      </Box>

      {/* 📝 Table */}
      <DataTable
        columns={[
          { field: "name", name: "Experiment name" },
          { field: "uid", name: "Experiment UID" },
          { field: "id", name: "Experiment Id" },
          { field: "environment", name: "Environment type" },
          { field: "status", name: "Status" },
        ]}
        rows={rows}
      />

      {/* No data fallback */}
      {rows.length === 0 && (
        <Box sx={{ mt: 2 }}>
          <Typography textAlign="center" variant="body2" color="text.secondary">
            No experiments available.
          </Typography>
        </Box>
      )}
    </React.Fragment>
  );
}
