Gotcha—on Browse Experiments the click didn’t trigger any network call. That usually means the table’s data isn’t fetched inside that component (or its refetch isn’t wired), so your local button doesn’t know what to refresh.

Here are two solid ways to fix it—pick the one that matches how that page loads data.


---

Option A — You have useExperiments(...) in the Browse page

Make sure you’re actually pulling out refetch from the hook and calling it:

// at top with other imports
import RefreshIcon from "@mui/icons-material/Refresh";
import Tooltip from "@mui/material/Tooltip";
import { useState } from "react";
import CircularProgress from "@mui/material/CircularProgress";

// in component
const { data, isLoading, isError, refetch, isFetching } =
  useExperiments(selectedProject, filters);

const [isRefreshing, setIsRefreshing] = useState(false);

const handleManualRefresh = async () => {
  try {
    setIsRefreshing(true);
    await refetch();           // <-- must be the refetch from THIS hook instance
  } finally {
    setIsRefreshing(false);
  }
};

// UI (above your DataTable)
<Box sx={{ display: "flex", justifyContent: "flex-start", mb: 2 }}>
  <Tooltip title="Reload latest experiments now">
    <span>
      <Button
        variant="contained"
        size="small"
        color="primary"
        onClick={handleManualRefresh}
        disabled={isRefreshing || isFetching}
        startIcon={!isRefreshing && !isFetching ? <RefreshIcon /> : null}
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

Checklist

The Browse page must call useExperiments(...) itself.

Don’t pass refetch from somewhere else unless you’re sure it’s the same query instance.



---

Option B — Data is fetched higher up (route loader / parent component / context)

In this case your page/table doesn’t have direct refetch. Use React Query’s global invalidation so whoever owns the query will refetch:

import { useQueryClient } from "@tanstack/react-query";
import RefreshIcon from "@mui/icons-material/Refresh";

const queryClient = useQueryClient();
const [isRefreshing, setIsRefreshing] = useState(false);

// Make sure this key prefix matches your hook's key in useExperiments
// e.g. ['experiments', selectedProjectId, filters]
const handleManualRefresh = async () => {
  try {
    setIsRefreshing(true);
    await queryClient.invalidateQueries({
      // broad prefix match to be safe
      predicate: (q) =>
        Array.isArray(q.queryKey) && q.queryKey[0] === "experiments",
    });
  } finally {
    setIsRefreshing(false);
  }
};

Same button UI as above.
This will trigger any active experiments queries (including paginated ones) to refetch.


---

If it still doesn’t call the API

Quick checks:

1. enabled: false in the query? Then refetch/invalidate is ignored until enabled. Ensure enabled is true.


2. Very long staleTime? invalidateQueries bypasses cache, but a plain refetch may decide data is still fresh if you rely on other configs.


3. Wrong query key? Confirm the key used in useExperiments (e.g., ['experiments', projectId, filters, page, pageSize]) and match it in invalidateQueries.


4. Rows memoized? If you memoize rows, make sure you derive them from data so a refetch re-computes.


5. Button inside disabled element? Wrap in <span> when the button can be disabled (as shown) to avoid tooltip swallowing clicks.




---

If you paste the Browse page’s top 30–40 lines (imports + how it fetches experiments), I’ll drop the exact code using your real query key so the button fires a network call every time.

