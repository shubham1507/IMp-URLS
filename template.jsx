// client/src/pages/dashboard/settings/access.jsx
import React, { useMemo, useState, useEffect } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Stack,
  Button,
  TextField,
  InputAdornment,
  Divider,
  Chip,
  Avatar,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Radio,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Checkbox,
  Tooltip,
  CircularProgress,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import { Trash as TrashIcon } from "@phosphor-icons/react/dist/ssr/Trash";

// ⬇️ use the hook you created (make sure the path resolves in your project)
// If you have the @ alias to src, you can also: import { useRoles } from "@/hooks/useRoles.js";
import { useRoles } from "../../../hooks/useRoles.js";

/* -------------------------------------------------------------------------- */
/*                               Mock directory                               */
/* -------------------------------------------------------------------------- */

const DIRECTORY = [
  {
    id: "45460399",
    name: "Prasad Chavan",
    username: "pchavan",
    type: "Outside Collaborator",
    avatarBG: "#8BC34A",
  },
];

/* -------------------------------------------------------------------------- */
/*                         Helpers for role normalization                      */
/* -------------------------------------------------------------------------- */

// (Optional) human-friendly labels for role.name values from API
const NAME_TO_LABEL = {
  org_admin: "Organization Admin",
  org_auditor: "Organization Auditor",
  project_maintainer: "Project Maintainer",
  project_operator: "Project Operator",
  project_viewer: "Project Viewer",
};

function normalizeRoles(apiArray) {
  if (!Array.isArray(apiArray)) return [];
  return apiArray.map((r) => ({
    id: r.id,                 // API id (e.g., "68e4ab...9151")
    key: r.name,              // API name (e.g., "project_viewer")
    scope: r.scope,           // "org" | "project"
    label: NAME_TO_LABEL[r.name] ?? r.name,
    description: r.description || "No description provided.",
  }));
}

/* -------------------------------------------------------------------------- */
/*                                  Component                                  */
/* -------------------------------------------------------------------------- */

export default function Access() {
  // table data
  const [rows, setRows] = useState(DIRECTORY);

  // table search
  const [query, setQuery] = useState("");

  // add people modal
  const [addOpen, setAddOpen] = useState(false);
  const [psidInput, setPsidInput] = useState("");
  const [selectedId, setSelectedId] = useState(null);

  // role selection (from API)
  const { data: apiRoles, isLoading: rolesLoading, isError: rolesError } = useRoles();
  const roles = useMemo(() => normalizeRoles(apiRoles), [apiRoles]);
  const [roleKey, setRoleKey] = useState("");

  // default role preselect (first role when loaded)
  useEffect(() => {
    if (!roleKey && roles.length) {
      setRoleKey(roles[0].key);
    }
  }, [roles, roleKey]);

  const canAdd = useMemo(() => Boolean(selectedId && roleKey), [selectedId, roleKey]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return rows;
    return rows.filter(
      (r) =>
        r.name.toLowerCase().includes(q) ||
        r.username.toLowerCase().includes(q) ||
        r.id.toLowerCase().includes(q)
    );
  }, [query, rows]);

  const handleSubmitAdd = async () => {
    if (!canAdd) return;
    // simulate add
    const newRow = DIRECTORY.find((r) => r.id === selectedId);
    setRows((prev) => [...prev.filter((r) => r.id !== newRow.id), newRow]);
    // reset modal state
    setAddOpen(false);
    setSelectedId(null);
    setRoleKey(roles[0]?.key ?? "");
    setPsidInput("");
  };

  const handleRemove = (id) => setRows((prev) => prev.filter((r) => r.id !== id));

  return (
    <Box sx={{ p: { xs: 1, sm: 2 } }}>
      {/* Header */}
      <Stack
        direction={{ xs: "column", sm: "row" }}
        spacing={2}
        alignItems="center"
        justifyContent="space-between"
        sx={{ mb: 2 }}
      >
        <Typography variant="h5">Manage access</Typography>
        <Stack direction="row" spacing={1}>
          <Button variant="outlined">Add teams</Button>
          <Button variant="contained" startIcon={<AddIcon />} onClick={() => setAddOpen(true)}>
            Add people
          </Button>
        </Stack>
      </Stack>

      {/* Table / Empty state */}
      <Card variant="outlined">
        <CardContent>
          <TextField
            placeholder="Find people or a team."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            fullWidth
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
            sx={{ mb: 2 }}
          />
          <Divider sx={{ mb: 2 }} />
          {rows.length === 0 ? (
            <Box
              sx={{
                borderRadius: 2,
                border: (theme) =>
                  `1px dashed ${
                    theme.palette.mode === "light" ? "rgba(0,0,0,0.08)" : theme.palette.divider
                  }`,
                textAlign: "center",
                py: 6,
              }}
            >
              <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                No people added
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Individuals and teams will appear here once you add them.
              </Typography>
              <Button variant="contained" onClick={() => setAddOpen(true)} sx={{ mt: 2 }}>
                Add people
              </Button>
            </Box>
          ) : (
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell padding="checkbox" />
                  <TableCell>Name</TableCell>
                  <TableCell>Type</TableCell>
                  <TableCell>Role</TableCell>
                  <TableCell align="right">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filtered.map((r) => (
                  <TableRow key={r.id}>
                    <TableCell padding="checkbox">
                      <Checkbox />
                    </TableCell>
                    <TableCell>
                      <Stack direction="row" spacing={1} alignItems="center">
                        <Avatar sx={{ bgcolor: r.avatarBG, width: 28, height: 28 }}>
                          {r.name[0] || "U"}
                        </Avatar>
                        <Box>
                          <Typography variant="body2" sx={{ fontWeight: 600 }}>
                            {r.name}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            {r.username}
                          </Typography>
                        </Box>
                      </Stack>
                    </TableCell>
                    <TableCell>
                      <Chip size="small" label={r.type} />
                    </TableCell>
                    {/* For demo we show a static role pill; once you bind backend, replace with r.role */}
                    <TableCell>
                      <Chip size="small" label="Read" />
                    </TableCell>
                    <TableCell align="right">
                      <Tooltip title="Remove access">
                        <IconButton
                          size="small"
                          onClick={() => handleRemove(r.id)}
                          sx={{ color: "primary.main" }} // blue icon
                        >
                          <TrashIcon size={18} weight="regular" />
                        </IconButton>
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      {/* Add People Modal */}
      <Dialog open={addOpen} onClose={() => setAddOpen(false)} fullWidth maxWidth="md">
        <DialogTitle>Add people to repository</DialogTitle>
        <DialogContent sx={{ pt: 1 }}>
          {/* Search box */}
          <TextField
            label="Search by username, full name, or email."
            value={psidInput}
            onChange={(e) => {
              setPsidInput(e.target.value);
              setSelectedId(null);
            }}
            fullWidth
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />

          {/* Search result card */}
          {psidInput.trim() && (
            <Card
              variant="outlined"
              sx={{
                mt: 1.5,
                py: 1.5,
                borderRadius: 2,
                cursor: "pointer",
                borderColor: selectedId ? "primary.main" : "divider",
              }}
              onClick={() => setSelectedId(DIRECTORY[0].id)}
            >
              <CardContent>
                <Stack direction="row" spacing={1.5} alignItems="center">
                  <Avatar sx={{ bgcolor: DIRECTORY[0].avatarBG, width: 36, height: 36 }}>
                    {DIRECTORY[0].name[0]}
                  </Avatar>
                  <Box sx={{ flex: 1 }}>
                    <Typography variant="body2" sx={{ fontWeight: 600 }}>
                      {DIRECTORY[0].name}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {DIRECTORY[0].type.toLowerCase()}
                    </Typography>
                  </Box>
                </Stack>
              </CardContent>
            </Card>
          )}

          {/* Selected user pill */}
          {selectedId && (
            <Box sx={{ pt: 1 }}>
              <Card
                variant="outlined"
                sx={{
                  p: 1.25,
                  borderRadius: 2,
                  mb: 2,
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <Avatar sx={{ bgcolor: DIRECTORY[0].avatarBG, width: 28, height: 28, mr: 1 }}>
                  {DIRECTORY[0].name[0]}
                </Avatar>
                <Box sx={{ flex: 1 }}>
                  <Typography variant="body2" sx={{ fontWeight: 600 }}>
                    {DIRECTORY[0].name}
                  </Typography>
                  <Typography
                    variant="caption"
                    color="text.secondary"
                    component="span"
                    sx={{ ml: 1 }}
                  >
                    View role details
                  </Typography>
                </Box>
                <IconButton size="small" onClick={() => setSelectedId(null)}>
                  <CloseIcon fontSize="small" />
                </IconButton>
              </Card>
            </Box>
          )}

          {/* Choose role — now dynamic from API */}
          <Card variant="outlined" sx={{ p: 1.5, borderRadius: 1.5, mb: 2 }}>
            <Typography variant="subtitle2" sx={{ mb: 1 }}>
              Choose a role
            </Typography>

            {rolesLoading && (
              <Stack direction="row" spacing={1.5} alignItems="center" sx={{ py: 1 }}>
                <CircularProgress size={18} />
                <Typography variant="body2" color="text.secondary">
                  Loading roles…
                </Typography>
              </Stack>
            )}

            {!rolesLoading && rolesError && (
              <Typography variant="body2" color="error" sx={{ mb: 1 }}>
                Couldn’t load roles from server.
              </Typography>
            )}

            {!rolesLoading &&
              !rolesError &&
              roles.map((r) => (
                <Stack
                  key={r.id}
                  direction="row"
                  spacing={1.5}
                  alignItems="flex-start"
                  sx={{
                    p: 1,
                    borderRadius: 1,
                    border: (t) =>
                      roleKey === r.key
                        ? `1px solid ${t.palette.primary.main}`
                        : `1px solid ${t.palette.divider}`,
                    cursor: "pointer",
                    "& + &": { mt: 1 },
                  }}
                  onClick={() => setRoleKey(r.key)}
                >
                  <Radio
                    size="small"
                    checked={roleKey === r.key}
                    onChange={() => setRoleKey(r.key)}
                    value={r.key}
                    sx={{ mt: 0.25 }}
                  />
                  <Box>
                    <Typography variant="body2" sx={{ fontWeight: 600 }}>
                      {r.label}
                    </Typography>
                    <Typography variant="caption" color="text.secondary" sx={{ mt: 0.5 }}>
                      {r.description}
                    </Typography>
                  </Box>
                </Stack>
              ))}
          </Card>
        </DialogContent>

        <DialogActions sx={{ pr: 3, pb: 2 }}>
          <Button
            onClick={() => {
              setAddOpen(false);
              setSelectedId(null);
              setRoleKey(roles[0]?.key ?? "");
              setPsidInput("");
            }}
          >
            Cancel
          </Button>
          <Button variant="contained" onClick={handleSubmitAdd} disabled={!canAdd}>
            {selectedId ? `Add ${selectedId}` : "Add to repository"}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
