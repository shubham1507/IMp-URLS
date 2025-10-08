import React, { useEffect, useMemo, useState } from "react";
import { useLocation } from "react-router-dom";
import {
  Box,
  Grid,
  Typography,
  Divider,
  Paper,
  Stack,
  Chip,
  IconButton,
  Collapse,
  CircularProgress,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import SecurityIcon from "@mui/icons-material/Security";   // org feel
import TuneIcon from "@mui/icons-material/Tune";           // project feel

// If you already inject roles from the parent, the component will use them.
// Otherwise it will fetch from ROLES_ENDPOINT.
const ROLES_ENDPOINT = "/api/roles"; // ← change if your API path differs

// helpers
const titleCase = (s = "") =>
  s
    .replace(/_/g, " ")
    .toLowerCase()
    .replace(/\b\w/g, (c) => c.toUpperCase());

const scopeIcon = (scope) =>
  scope === "org" ? <SecurityIcon fontSize="small" /> : <TuneIcon fontSize="small" />;

export default function TeamMemberRoles({ roles: rolesFromProps }) {
  const location = useLocation();
  const [expandedKey, setExpandedKey] = useState(null); // collapsed by default
  const [roles, setRoles] = useState(rolesFromProps || []);
  const [loading, setLoading] = useState(!rolesFromProps);
  const [error, setError] = useState(null);

  // Hard reset whenever this route mounts/changes
  useEffect(() => {
    setExpandedKey(null);
  }, [location.pathname]);

  // fetch roles only if not provided as prop
  useEffect(() => {
    if (rolesFromProps) return;

    let isMounted = true;
    (async () => {
      try {
        setLoading(true);
        setError(null);
        const res = await fetch(ROLES_ENDPOINT);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        // Supports both { roles: [...] } and direct array responses
        const list = Array.isArray(data) ? data : data.roles || [];
        if (isMounted) setRoles(list);
      } catch (e) {
        console.error("Failed to fetch roles:", e);
        if (isMounted) setError("Failed to load roles.");
      } finally {
        if (isMounted) setLoading(false);
      }
    })();
    return () => {
      isMounted = false;
    };
  }, [rolesFromProps]);

  const toggle = (key) => setExpandedKey((prev) => (prev === key ? null : key));

  const empty = useMemo(() => !loading && !error && roles.length === 0, [loading, error, roles]);

  return (
    <Box sx={{ px: { xs: 2, md: 6 }, py: 4, maxWidth: 1200, mx: "auto" }}>
      <Typography variant="h4" fontWeight={700} gutterBottom>
        Repository roles
      </Typography>

      <Divider sx={{ my: 2 }} />

      <Grid container spacing={3} alignItems="flex-start">
        {/* LEFT SIDE */}
        <Grid item xs={12} md={4} lg={3}>
          <Box sx={{ position: { md: "sticky" }, top: 88, pr: { md: 3 } }}>
            <Typography variant="h6" sx={{ mb: 1, fontWeight: 700 }}>
              Pre-defined roles
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Listed below are all the available roles that can be granted to
              members and teams in this organization. Expand a role to view the
              details of the permissions included.
            </Typography>
          </Box>
        </Grid>

        {/* RIGHT SIDE */}
        <Grid item xs={12} md={8} lg={9}>
          {/* loading / error / empty states */}
          {loading && (
            <Stack alignItems="center" justifyContent="center" sx={{ py: 6 }}>
              <CircularProgress size={24} />
            </Stack>
          )}
          {error && (
            <Typography variant="body2" color="error" sx={{ py: 2 }}>
              {error}
            </Typography>
          )}
          {empty && (
            <Typography variant="body2" color="text.secondary" sx={{ py: 2 }}>
              No roles found.
            </Typography>
          )}

          {!loading && !error && roles.length > 0 && (
            <Stack spacing={1.5}>
              {roles.map((r) => {
                const open = expandedKey === r.id;
                return (
                  <Paper
                    key={r.id}
                    elevation={0}
                    sx={{
                      border: 1,
                      borderColor: "divider",
                      borderRadius: 2,
                      overflow: "hidden",
                    }}
                  >
                    {/* Header row (NOT clickable) */}
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 1.25,
                        px: 2,
                        minHeight: 64,
                        "&:hover": { bgcolor: "action.hover" },
                      }}
                    >
                      <Stack direction="row" alignItems="center" spacing={1.25} sx={{ pointerEvents: "none" }}>
                        {scopeIcon(r.scope)}
                        <Typography variant="subtitle1" fontWeight={700}>
                          {titleCase(r.name)}
                        </Typography>
                        <Chip
                          size="small"
                          variant="outlined"
                          color={r.scope === "org" ? "primary" : "secondary"}
                          label={r.scope?.toUpperCase() || "UNKNOWN"}
                        />
                        {r.isSystem && <Chip size="small" variant="outlined" label="System" />}
                      </Stack>

                      <Box sx={{ flex: 1 }} />

                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{ mr: 1.5, pointerEvents: "none" }}
                      >
                        {r.description}
                      </Typography>

                      {/* The ONLY toggle */}
                      <IconButton
                        size="small"
                        edge="end"
                        aria-label={open ? "Collapse" : "Expand"}
                        onClick={() => toggle(r.id)}
                        sx={{
                          transform: open ? "rotate(180deg)" : "none",
                          transition: "transform 0.2s ease",
                        }}
                      >
                        <ExpandMoreIcon />
                      </IconButton>
                    </Box>

                    <Divider />

                    {/* Body (collapsible) */}
                    <Collapse in={open} timeout="auto" unmountOnExit>
                      <Grid container>
                        <Grid item xs={12} sm={4} sx={{ px: 2, py: 2, bgcolor: "background.default" }}>
                          <Typography variant="subtitle2" color="text.secondary" fontWeight={600}>
                            Details
                          </Typography>
                        </Grid>
                        <Grid item xs={12} sm={8} sx={{ px: 2, py: 2 }}>
                          <Stack spacing={0.5}>
                            <Typography variant="body2">
                              <strong>Role ID:</strong> {r.id}
                            </Typography>
                            <Typography variant="body2">
                              <strong>Scope:</strong> {r.scope}
                            </Typography>
                            <Typography variant="body2">
                              <strong>System role:</strong> {r.isSystem ? "Yes" : "No"}
                            </Typography>
                          </Stack>
                        </Grid>
                      </Grid>
                    </Collapse>
                  </Paper>
                );
              })}
            </Stack>
          )}
        </Grid>
      </Grid>
    </Box>
  );
}
