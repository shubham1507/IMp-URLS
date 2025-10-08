// client/src/pages/dashboard/settings/access.jsx
import React, { useMemo, useState } from "react";
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
  Link as MuiLink,
  CircularProgress,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import { Trash as TrashIcon } from "@phosphor-icons/react";
import { useRoles } from "@hooks/useRoles";

/** Your current hard-coded directory (kept as-is) */
const DIRECTORY = [
  {
    id: "45460399",
    name: "Prasad Chavan",
    username: "pchavan",
    type: "Outside Collaborator",
    avatarBG: "#8BC34A",
  },
];

/** Fallback label/description helpers (if API returns strings only) */
const DEFAULT_LABELS = {
  org_admin: "Organization Admin",
  org_auditor: "Organization Auditor",
  project_maintainer: "Project Maintainer",
  project_operator: "Project Operator",
  project_viewer: "Project Viewer",
  admin: "Admin",
  write: "Write",
  read: "Read",
};

const DEFAULT_DESCRIPTIONS = {
  org_admin:
    "Recommended for people who need full access to the organization, including sensitive and destructive actions.",
  org_auditor:
    "Recommended for auditors who need to view organization activity and settings without write access.",
  project_maintainer:
    "Recommended for project managers who need to manage repositories without access to sensitive actions.",
  project_operator:
    "Recommended for contributors who need to operate and manage tasks without destructive actions.",
  project_viewer:
    "Recommended for non-code contributors who want to view or discuss your project.",
  admin:
    "Recommended for people who need full access to the project, including sensitive and destructive actions.",
  write: "Recommended for contributors who actively push to your project.",
  read: "Recommended for non-code contributors who want to view or discuss your project.",
};

/** Normalize API response into a uniform array of {id,label,description} */
function normalizeRoles(data) {
  if (!data) return [];
  // Case B: already objects
  if (Array.isArray(data) && typeof data[0] === "object") {
    return data.map((r) => ({
      id: r.id ?? r.key ?? r.value ?? r.name,
      label: r.label ?? DEFAULT_LABELS[r.id] ?? r.id,
      description:
        r.description ?? DEFAULT_DESCRIPTIONS[r.id] ?? "Role",
    }));
  }
  // Case A: array of strings
  if (Array.isArray(data)) {
    return data.map((key) => ({
      id: key,
      label: DEFAULT_LABELS[key] ?? key,
      description: DEFAULT_DESCRIPTIONS[key] ?? "Role",
    }));
  }
  // Fallback
  return [];
}

export default function Access() {
  // --- Local state kept from your version ---
  const [rows, setRows] = useState(DIRECTORY);
  const [query, setQuery] = useState("");
  const [addOpen, setAddOpen] = useState(false);
  const [psidInput, setPsidInput] = useState("");
  const [selectedId, setSelectedId] = useState(null);
  const [roleKey, setRoleKey] = useState(null); // will store selected role id
  const [adding, setAdding] = useState(false);

  // --- Fetch roles from API ---
  const { data: rawRoles, isLoading, isError } = useRoles();
  const roles = useMemo(() => normalizeRoles(rawRoles), [rawRoles]);

  // Default selected role (once loaded)
  React.useEffect(() => {
    if (!roleKey && roles.length) {
      setRoleKey(roles[0].id);
    }
  }, [roles, roleKey]);

  // Filter rows by query
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

  const canAdd = Boolean(selectedId) && Boolean(roleKey) && !adding;

  const handleSubmitAdd = async () => {
    if (!canAdd) return;
    setAdding(true);
    await new Promise((r) => setTimeout(r, 250));

    const picked = DIRECTORY.find((r) => r.id === selectedId);
    const chosen = roles.find((r) => r.id === roleKey);
    // Save both id and label so the table shows a friendly chip
    const newRow = {
      ...picked,
      roleId: chosen?.id,
      roleLabel: chosen?.label ?? chosen?.id ?? "Read",
    };

    setRows((prev) => [newRow, ...prev.filter((r) => r.id !== newRow.id)]);
    setAdding(false);
    setAddOpen(false);
    setSelectedId(null);
    setRoleKey(roles[0]?.id ?? null);
    setPsidInput("");
  };

  const handleRemove = (id) =>
    setRows((prev) => prev.filter((r) => r.id !== id));

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
          <Button variant="outlined" disabled>
            Add teams
          </Button>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => setAddOpen(true)}
          >
            Add people
          </Button>
        </Stack>
      </Stack>

      {/* Main card */}
      <Card variant="outlined">
        <CardContent>
          <TextField
            placeholder="Find people or a team…"
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

          {/* Table or empty state */}
          {rows.length === 0 ? (
            <Box
              sx={{
                border: (t) => `1px dashed ${t.palette.divider}`,
                borderRadius: 2,
                p: 6,
                textAlign: "center",
                bgcolor: (t) =>
                  t.palette.mode === "light"
                    ? "rgba(0,0,0,0.02)"
                    : "transparent",
              }}
            >
              <Typography variant="h6" sx={{ mb: 1 }}>
                No people added to org
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                Assigned individuals and teams will appear here once you add them.
              </Typography>
              <Button variant="contained" onClick={() => setAddOpen(true)}>
                Add people
              </Button>
            </Box>
          ) : (
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell padding="checkbox" />
                  <TableCell>Direct access</TableCell>
                  <TableCell>Type</TableCell>
                  <TableCell>Role</TableCell>
                  <TableCell align="right">Delete</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filtered.map((r) => (
                  <TableRow key={r.id} hover>
                    <TableCell padding="checkbox">
                      <Checkbox />
                    </TableCell>
                    <TableCell>
                      <Stack direction="row" spacing={1} alignItems="center">
                        <Avatar sx={{ width: 28, height: 28, bgcolor: r.avatarBG }}>
                          {r.name?.[0] || "U"}
                        </Avatar>
                        <Stack>
                          <Typography variant="body2" sx={{ fontWeight: 600 }}>
                            {r.name}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            {r.id} · {r.username}
                          </Typography>
                        </Stack>
                      </Stack>
                    </TableCell>
                    <TableCell>
                      <Chip size="small" label={r.type} />
                    </TableCell>
                    <TableCell>
                      <Chip size="small" label={r.roleLabel ?? "Read"} />
                    </TableCell>
                    <TableCell align="right">
                      <Tooltip title="Remove access">
                        <IconButton size="small" onClick={() => handleRemove(r.id)}>
                          <TrashIcon color="blue" size={18} />
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
      <Dialog
        open={addOpen}
        onClose={() => setAddOpen(false)}
        fullWidth
        maxWidth="md"
      >
        <DialogTitle>Add people to repository</DialogTitle>
        <DialogContent sx={{ pt: 1 }}>
          {/* Search input */}
          {!selectedId && (
            <TextField
              autoFocus
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
              sx={{ mb: 2 }}
            />
          )}

          {/* Search result card (demo - picks first entry) */}
          {!selectedId && psidInput.trim() && (
            <Card
              variant="outlined"
              sx={{
                py: 1.5,
                borderRadius: 2,
                cursor: "pointer",
                borderColor: selectedId ? "primary.main" : "divider",
              }}
              onClick={() => setSelectedId(DIRECTORY[0].id)}
            >
              <CardContent>
                <Stack direction="row" spacing={1.5} alignItems="center">
                  <Avatar
                    sx={{ bgcolor: DIRECTORY[0].avatarBG, width: 36, height: 36 }}
                  >
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
                <Avatar
                  sx={{
                    bgcolor: DIRECTORY[0].avatarBG,
                    width: 28,
                    height: 28,
                    mr: 1,
                  }}
                >
                  {DIRECTORY[0].name[0]}
                </Avatar>
                <Box sx={{ flex: 1 }}>
                  <Typography variant="body2" sx={{ fontWeight: 600 }}>
                    {DIRECTORY[0].name}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {DIRECTORY[0].id}
                  </Typography>
                  <MuiLink component="button" variant="caption" sx={{ ml: 1 }}>
                    View role details
                  </MuiLink>
                </Box>
                <IconButton size="small" onClick={() => setSelectedId(null)}>
                  <CloseIcon fontSize="small" />
                </IconButton>
              </Card>

              <Divider sx={{ mb: 2 }} />

              {/* Roles from API */}
              <Typography variant="subtitle2" sx={{ mb: 1 }}>
                Choose a role
              </Typography>

              {isLoading && (
                <Stack direction="row" spacing={1.5} alignItems="center" sx={{ py: 1 }}>
                  <CircularProgress size={18} />
                  <Typography variant="body2" color="text.secondary">
                    Loading roles…
                  </Typography>
                </Stack>
              )}

              {isError && (
                <Typography variant="body2" color="error" sx={{ mb: 1 }}>
                  Couldn’t load roles. Please try again later.
                </Typography>
              )}

              {!isLoading &&
                !isError &&
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
                        roleKey === r.id
                          ? `1px solid ${t.palette.primary.main}`
                          : `1px solid ${t.palette.divider}`,
                      cursor: "pointer",
                      "& + &": { mt: 1 },
                    }}
                    onClick={() => setRoleKey(r.id)}
                  >
                    <Radio
                      checked={roleKey === r.id}
                      onChange={() => setRoleKey(r.id)}
                      value={r.id}
                      size="small"
                      sx={{ mt: 0.25 }}
                    />
                    <Box>
                      <Typography variant="body2" sx={{ fontWeight: 600 }}>
                        {r.label}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {r.description}
                      </Typography>
                    </Box>
                  </Stack>
                ))}
            </Box>
          )}
        </DialogContent>

        <DialogActions sx={{ pr: 3, pb: 2 }}>
          <Button
            onClick={() => {
              setAddOpen(false);
              setSelectedId(null);
              setRoleKey(roles[0]?.id ?? null);
              setPsidInput("");
            }}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={handleSubmitAdd}
            disabled={!canAdd}
          >
            {adding
              ? "Adding..."
              : selectedId
              ? `Add ${selectedId}`
              : "Add to repository"}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
