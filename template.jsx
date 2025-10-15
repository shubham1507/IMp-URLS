import * as React from "react";
import { Link } from "react-router-dom";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Chip from "@mui/material/Chip";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import CircularProgress from "@mui/material/CircularProgress";

import dayjs from "dayjs";
import DataTable from "@/components/core/data-table";
import { useExperiments } from "@/hooks/useExperiments";
import { paths } from "@/paths";
import {
  CheckCircle as CheckCircleIcon,
  XCircle as XCircleIcon,
  Clock as ClockIcon,
  PauseCircle as PauseCircleIcon,
  Eye as EyeIcon,
} from "@phosphor-icons/react/dist/ssr";
import RefreshIcon from "@mui/icons-material/Refresh";

/** 🔧 MOCK SWITCH */
import mockExperiments from "@/mock/experiments-data.json";
const USE_MOCK = true; // set false to go back to API

export function BrowseExperimentsTable({
  selectedProject,
  filters,
  experimentsCount,
  onEyeIconClick,
  onExperimentsChange,
}) {
  console.log("filters =>", filters);

  // If using API
  const api = useExperiments(selectedProject, filters);

  // Normalize shape whether MOCK or API
  const experiments = USE_MOCK ? mockExperiments : api.data;
  const isLoading = USE_MOCK ? false : api.isLoading;
  const isFetching = USE_MOCK ? false : api.isFetching;
  const isError = USE_MOCK ? false : api.isError;
  const error = USE_MOCK ? null : api.error;
  const refetch = USE_MOCK
    ? async () => {
        // fake a short fetch delay to show spinner
        await new Promise((r) => setTimeout(r, 500));
        return { data: mockExperiments };
      }
    : api.refetch;

  const [isRefreshing, setIsRefreshing] = React.useState(false);

  React.useEffect(() => {
    if (experiments && onExperimentsChange) {
      onExperimentsChange(experiments);
    }
  }, [experiments, filters, onExperimentsChange]);

  const handleManualRefresh = async () => {
    try {
      setIsRefreshing(true);
      await refetch();
    } finally {
      setIsRefreshing(false);
    }
  };

  /* … keep the rest of your component exactly as you already have it:
     loading/error UIs, columns, formattedRows, and the DataTable render … */
}
