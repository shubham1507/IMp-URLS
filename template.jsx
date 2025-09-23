import React from "react";
import { Outlet, NavLink } from "react-router-dom";
import Box from "@mui/material/Box";

// [ADDED] route-change loader deps
import { useLocation } from "react-router-dom";       // [ADDED]
import { useEffect, useState } from "react";          // [ADDED]
import Backdrop from "@mui/material/Backdrop";        // [ADDED]
import CircularProgress from "@mui/material/CircularProgress"; // [ADDED]

export default function DashboardLayout() {
  // [ADDED] track pathname changes
  const location = useLocation();                    
  const [routeLoading, setRouteLoading] = useState(false);

  useEffect(() => {
    // [ADDED] show loader immediately on route change
    setRouteLoading(true);

    // [ADDED] hide loader after delay (500ms here, set to 3000 for 3s)
    const t = setTimeout(() => setRouteLoading(false), 500);
    return () => clearTimeout(t);
  }, [location.pathname]);

  return (
    <div className="flex">
      {/* Sidebar */}
      <aside className="w-64 p-4">
        <nav className="space-y-2">
          <NavLink to="overview">Overview</NavLink>
          <NavLink to="experiments/browse">Browse experiments</NavLink>
          <NavLink to="experiments/create">Create experiment</NavLink>
          <NavLink to="experiments/execute">Execute experiment</NavLink>
          <NavLink to="experiments/status">Experiment Status</NavLink>
        </nav>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-6">
        {/* [ADDED] route-change loader overlay */}
        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={routeLoading}
        >
          <CircularProgress color="inherit" />
        </Backdrop>

        {/* Page content */}
        <Outlet />
      </main>
    </div>
  );
}
