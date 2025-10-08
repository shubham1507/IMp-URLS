import React, { useEffect, useState } from "react";
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
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import VisibilityIcon from "@mui/icons-material/Visibility";
import BuildIcon from "@mui/icons-material/Build";
import EditIcon from "@mui/icons-material/Edit";
import TuneIcon from "@mui/icons-material/Tune";
import SecurityIcon from "@mui/icons-material/Security";

const roles = [
  {
    key: "Read",
    icon: <VisibilityIcon fontSize="small" />,
    description:
      "Read and clone repositories. Open and comment on issues and pull requests.",
    groups: [
      {
        heading: "Issue and Pull Request",
        items: [
          "Open and comment on an issue",
          "Open and comment on a pull request",
        ],
      },
    ],
  },
  {
    key: "Triage",
    icon: <BuildIcon fontSize="small" />,
    description: "Read permissions plus manage issues and pull requests.",
    groups: [
      {
        heading: "Issue and Pull Request",
        items: [
          "Close an issue",
          "Add or remove a label",
          "Assign or remove a user",
          "Remove an assigned user",
        ],
      },
    ],
  },
  {
    key: "Write",
    icon: <EditIcon fontSize="small" />,
    description:
      "Triage permissions plus read, clone, and push to repositories.",
    groups: [
      { heading: "Code", items: ["Push to branches", "Create or delete branches"] },
      { heading: "Pull Requests", items: ["Open, review, and merge pull requests"] },
    ],
  },
  {
    key: "Maintain",
    icon: <TuneIcon fontSize="small" />,
    description:
      "Write permissions plus manage issues, pull requests, and some repository settings.",
    groups: [
      {
        heading: "Repository",
        items: [
          "Manage some repository settings",
          "Manage teams and collaborators",
          "Manage issues and pull requests",
        ],
      },
    ],
  },
  {
    key: "Admin",
    icon: <SecurityIcon fontSize="small" />,
    description:
      "Full access to repositories including sensitive and destructive actions.",
    groups: [
      {
        heading: "Repository",
        items: [
          "Manage all repository settings",
          "Manage access and permissions",
          "Delete repositories and perform administrative actions",
        ],
      },
    ],
  },
];

export default function TeamMemberRoles() {
  const [expandedKey, setExpandedKey] = useState(null); // collapsed by default
  const location = useLocation();

  // Hard reset whenever this route mounts/changes
  useEffect(() => {
    setExpandedKey(null);
  }, [location.pathname]);

  const toggle = (key) => setExpandedKey((prev) => (prev === key ? null : key));

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
          <Stack spacing={1.5}>
            {roles.map((r) => {
              const open = expandedKey === r.key;
              return (
                <Paper
                  key={r.key}
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
                      {r.icon}
                      <Typography variant="subtitle1" fontWeight={700}>
                        {r.key}
                      </Typography>
                      <Chip size="small" variant="outlined" label="Pre-defined" />
                    </Stack>

                    <Box sx={{ flex: 1 }} />

                    <Typography variant="body2" color="text.secondary" sx={{ mr: 1.5, pointerEvents: "none" }}>
                      {r.description}
                    </Typography>

                    {/* The ONLY toggle */}
                    <IconButton
                      size="small"
                      edge="end"
                      aria-label={open ? "Collapse" : "Expand"}
                      onClick={() => toggle(r.key)}
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
                    {r.groups.map((g, idx) => (
                      <Grid
                        key={g.heading}
                        container
                        sx={{
                          borderTop: idx === 0 ? "none" : 1,
                          borderColor: "divider",
                        }}
                      >
                        <Grid item xs={12} sm={4} sx={{ px: 2, py: 2, bgcolor: "background.default" }}>
                          <Typography variant="subtitle2" color="text.secondary" fontWeight={600}>
                            {g.heading}
                          </Typography>
                        </Grid>
                        <Grid item xs={12} sm={8} sx={{ px: 2, py: 2 }}>
                          <Box component="ul" sx={{ m: 0, pl: 2 }}>
                            {g.items.map((it) => (
                              <li key={it}>
                                <Typography variant="body2">{it}</Typography>
                              </li>
                            ))}
                          </Box>
                        </Grid>
                      </Grid>
                    ))}
                  </Collapse>
                </Paper>
              );
            })}
          </Stack>
        </Grid>
      </Grid>
    </Box>
  );
}
