import * as React from "react";
import dashboardConfig from "@config/dashboard";
import { useSettings } from "@components/core/settings/settings-context";
import HorizontalLayout from "./horizontal/horizontal-layout";
import VerticalLayout from "./vertical/vertical-layout";

// [ADD] imports for loader
import { useLocation } from "react-router-dom";          // <-- ADDED
import Backdrop from "@mui/material/Backdrop";           // <-- ADDED
import CircularProgress from "@mui/material/CircularProgress"; // <-- ADDED

export function DashboardLayout(props) {
  const settings = useSettings();
  const layout = settings.dashboard.layout ?? dashboardConfig.layout;

  // ---- ROUTE CHANGE LOADER (ADDED) ----
  const location = useLocation();
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    setLoading(true);                     // show loader immediately on path change
    const t = setTimeout(() => setLoading(false), 500); // keep visible 0.5s (use 3000 for 3s)
    return () => clearTimeout(t);
  }, [location.pathname]);
  // -------------------------------------

  return (
    <>
      {/* BACKDROP LOADER (ADDED) */}
      <Backdrop
        sx={{ color: "#fff", zIndex: (t) => t.zIndex.drawer + 1 }}
        open={loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>

      {/* Your existing layout rendering */}
      {layout === "horizontal" ? (
        <HorizontalLayout {...props} />
      ) : (
        <VerticalLayout {...props} />
      )}
    </>
  );
}
