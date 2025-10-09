// client/src/pages/dashboard/settings/team-and-member-roles.jsx
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
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import SecurityIcon from "@mui/icons-material/Security";
import TuneIcon from "@mui/icons-material/Tune";
import { useRoles } from "@hooks/useRoles";

// Helper: pretty role names (same as before)
const prettyName = (apiName = "") =>
  apiName
    .replace(/^org_/i, "Organization ")
    .replace(/^project_/i, "Project ")
    .replace(/_/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());

// Helper: icon by scope
const scopeIcon = (scope) =>
  scope === "org" ? <SecurityIcon fontSize="small" /> : <TuneIcon fontSize="small" />;

// Helper: convert permission string → object
const parsePermission = (perm) => {
  // example: "projects:create@org"
  const [left, level] = perm.split("@");
  const [scope, permission] = left.split(":");
  const scopeLabel =
    scope === "org"
      ? "Organizations"
      : scope === "projects"
      ? "Projects"
      : scope === "environments"
      ? "Environments"
      : scope === "experiments"
      ? "Experiments"
      : scope === "results"
      ? "Results"
      : scope === "audit"
      ? "Audit"
      : scope;
  const permLabel =
    permission.charAt(0).toUpperCase() + permission.slice(1).toLowerCase();
  const levelLabel =
    level === "org"
      ? "Organization"
      : level === "project"
      ? "Project"
      : level ?? "-";

  // human readable description
  const description = `${permLabel} ${scopeLabel} at ${levelLabel} level`;

  return {
    scope: scopeLabel,
    permission: permLabel,
    level: levelLabel,
    description,
  };
};

export default function TeamMemberRoles() {
  const location = useLocation();
  const { data, isLoading, isError } = useRoles();
  const roles = data?.roles ?? [];

  const [expandedKey, setExpandedKey] = useState(null);
  useEffect(() => setExpandedKey(null), [location.pathname]);
  const toggle = (key) => setExpandedKey((prev) => (prev === key ? null : key));

  const empty = useMemo(() => !isLoading && !isError && roles.length === 0, [
    isLoading,
    isError,
    roles,
  ]);

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
          {isLoading && (
            <Stack alignItems="center" justifyContent="center" sx={{ py: 6 }}>
              <CircularProgress size={24} />
            </Stack>
          )}

          {isError && (
            <Typography variant="body2" color="error" sx={{ py: 2 }}>
              Failed to load roles.
            </Typography>
          )}

          {empty && (
            <Typography variant="body2" color="text.secondary" sx={{ py: 2 }}>
              No roles found.
            </Typography>
          )}

          {!isLoading && !isError && roles.length > 0 && (
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
                    {/* Header */}
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
                      <Stack direction="row" alignItems="center" spacing={1.25}>
                        {scopeIcon(r.scope)}
                        <Typography variant="subtitle1" fontWeight={700}>
                          {prettyName(r.name)}
                        </Typography>
                        <Chip
                          size="small"
                          variant="outlined"
                          color={r.scope === "org" ? "primary" : "secondary"}
                          label={(r.scope || "").toUpperCase()}
                        />
                        {r.is_system && (
                          <Chip size="small" variant="outlined" label="System" />
                        )}
                      </Stack>

                      <Box sx={{ flex: 1 }} />

                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{ mr: 1.5 }}
                      >
                        {r.description}
                      </Typography>

                      <IconButton
                        size="small"
                        edge="end"
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

                    {/* Expand content */}
                    <Collapse in={open} timeout="auto" unmountOnExit>
                      <Box sx={{ px: 2, py: 2 }}>
                        <Typography
                          variant="subtitle2"
                          fontWeight={600}
                          sx={{ mb: 1 }}
                        >
                          Permissions
                        </Typography>

                        <Table size="small">
                          <TableHead>
                            <TableRow>
                              <TableCell sx={{ fontWeight: 600 }}>Scope</TableCell>
                              <TableCell sx={{ fontWeight: 600 }}>Permission</TableCell>
                              <TableCell sx={{ fontWeight: 600 }}>Level</TableCell>
                              <TableCell sx={{ fontWeight: 600 }}>Description</TableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {(r.permissions || []).map((perm) => {
                              const p = parsePermission(perm);
                              return (
                                <TableRow key={perm}>
                                  <TableCell>{p.scope}</TableCell>
                                  <TableCell>{p.permission}</TableCell>
                                  <TableCell>{p.level}</TableCell>
                                  <TableCell>{p.description}</TableCell>
                                </TableRow>
                              );
                            })}
                          </TableBody>
                        </Table>
                      </Box>
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
