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
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Tooltip,
  Link as MuiLink,
  Radio,
  // Popover,  // <-- we keep popover code commented-out below
  CircularProgress,
} from "@mui/material";

import SearchIcon from "@mui/icons-material/Search";
import AddIcon from "@mui/icons-material/PersonAdd";
import CloseIcon from "@mui/icons-material/Close";
import SaveIcon from "@mui/icons-material/Save";
import CheckIcon from "@mui/icons-material/Check";
import { Trash as TrashIcon } from "@phosphor-icons/react/dist/ssr/Trash";
import { useRoles } from "../../../hooks/useRoles";

// Mock directory for “Add people” modal search
const DIRECTORY = {
  "45460309": {
    id: "45460309",
    name: "Prasad Chavan",
    username: "u45460309ca",
    type: "Non-perm",
    avatarBg: "#8BC34A",
  },
  "45312530": {
    id: "45312530",
    name: "Sumit Joshi",
    username: "u45312530ca",
    type: "Non-perm",
    avatarBg: "#1976d2",
  },
  "43976178": {
    id: "43976178",
    name: "Dnyaneshwar Kawade",
    username: "u43976178ca",
    type: "Non-perm",
    avatarBg: "#FF9800",
  },
  "43304543": {
    id: "43304543",
    name: "Maya Arora",
    username: "u43304543ca",
    type: "Perm",
    avatarBg: "#E91E63",
  },
};

const prettyName = (apiName = "") =>
  apiName
    .replace(/^org_/i, "Organization ")
    .replace(/^project_/i, "Project ")
    .replace(/_/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());

export default function Access() {
  // Seed with one existing member
  const [rows, setRows] = useState([
    {
      id: "43226675",
      name: "Nikhil Sonowal",
      username: "u43226675ca",
      type: "Org Admin",
      avatarBg: "#1976d2",
      roleId: "org_admin",
      roleName: "Organization Admin",
    },
  ]);
  const [query, setQuery] = useState("");

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

  // Roles from API
  const { data, isLoading: rolesLoading, isError: rolesError } = useRoles();
  const roles = data?.roles ?? [];

  // ---------- Add people modal ----------
  const [addOpen, setAddOpen] = useState(false);
  const [psidInput, setPsidInput] = useState("");
  const [selectedId, setSelectedId] = useState(null);
  const result = useMemo(() => DIRECTORY[psidInput.trim()] || null, [psidInput]);

  const [selectedRoleId, setSelectedRoleId] = useState(null);
  const canAdd = Boolean(selectedId) && Boolean(selectedRoleId);
  const [adding, setAdding] = useState(false);

  const handleSubmitAdd = async () => {
    if (!canAdd) return;
    setAdding(true);
    await new Promise((r) => setTimeout(r, 400)); // simulate network
    const picked = DIRECTORY[selectedId];
    const roleObj = roles.find((r) => r.id === selectedRoleId);

    const newRow = {
      ...picked,
      roleId: roleObj?.id,
      roleName: roleObj ? prettyName(roleObj.name) : "—",
    };

    setRows((prev) => [newRow, ...prev.filter((r) => r.id !== newRow.id)]);
    setAdding(false);
    setPsidInput("");
    setSelectedId(null);
    setSelectedRoleId(null);
    setAddOpen(false);
  };

  // Remove member
  const handleRemove = (id) => setRows((prev) => prev.filter((r) => r.id !== id));

  // ---------- Inline Role change (Save/Cancel + spinner) ----------
  // (The old popover is commented below; now we use a Dialog per your request.)

  // temp role selections per row: { [rowId]: roleId }
  const [tempRoleByRow, setTempRoleByRow] = useState({});
  // rows changed but not saved
  const [dirtyRowIds, setDirtyRowIds] = useState(new Set());
  // rows being saved
  const [savingRowIds, setSavingRowIds] = useState(new Set());

  // ===== Modal (Dialog) state for role picking =====
  const [roleDlgOpen, setRoleDlgOpen] = useState(false);
  const [roleDlgRow, setRoleDlgRow] = useState(null);

  const openRoleDialog = (row) => {
    setRoleDlgRow(row);
    // initialize temp with current if not present
    setTempRoleByRow((prev) => ({
      ...prev,
      [row.id]: prev[row.id] ?? row.roleId ?? null,
    }));
    setRoleDlgOpen(true);
  };
  const closeRoleDialog = () => {
    setRoleDlgOpen(false);
    setRoleDlgRow(null);
  };
  const handleRolePickFromDialog = (rowId, roleId) => {
    setTempRoleByRow((prev) => ({ ...prev, [rowId]: roleId }));
    setDirtyRowIds((prev) => new Set(prev).add(rowId));
    closeRoleDialog(); // auto-close like GitHub
  };

  // Save/Cancel
  const saveRoleChange = async (rowId) => {
    setSavingRowIds((prev) => {
      const next = new Set(prev);
      next.add(rowId);
      return next;
    });

    await new Promise((r) => setTimeout(r, 600)); // simulate API

    const newRoleId = tempRoleByRow[rowId];
    const roleObj = roles.find((r) => r.id === newRoleId);

    setRows((prev) =>
      prev.map((row) =>
        row.id === rowId
          ? {
              ...row,
              roleId: newRoleId,
              roleName: roleObj ? prettyName(roleObj.name) : row.roleName,
            }
          : row
      )
    );

    setDirtyRowIds((prev) => {
      const next = new Set(prev);
      next.delete(rowId);
      return next;
    });
    setSavingRowIds((prev) => {
      const next = new Set(prev);
      next.delete(rowId);
      return next;
    });
  };

  const cancelRoleChange = (rowId) => {
    setTempRoleByRow((prev) => {
      const next = { ...prev };
      delete next[rowId];
      return next;
    });
    setDirtyRowIds((prev) => {
      const next = new Set(prev);
      next.delete(rowId);
      return next;
    });
  };

  const renderRoleName = (roleId, fallback) => {
    const r = roles.find((x) => x.id === roleId);
    return r ? prettyName(r.name) : fallback ?? "—";
  };

  return (
    <Box sx={{ p: { xs: 1, sm: 2 } }}>
      {/* Header */}
      <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: 2 }}>
        <Typography variant="h5">Manage access</Typography>
        <Button variant="contained" startIcon={<AddIcon />} onClick={() => setAddOpen(true)}>
          Add people
        </Button>
      </Stack>

      {/* Table card */}
      <Card variant="outlined">
        <CardContent>
          <TextField
            fullWidth
            placeholder="Find people or a team…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
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
                border: (t) => `1px dashed ${t.palette.divider}`,
                borderRadius: 2,
                p: 6,
                textAlign: "center",
                bgcolor: (t) => (t.palette.mode === "light" ? "rgba(0,0,0,0.02)" : "transparent"),
              }}
            >
              <Typography variant="h6" sx={{ mb: 1 }}>
                No people added to org
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Assigned individuals and teams will appear here once you add them.
              </Typography>
            </Box>
          ) : (
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Member Name</TableCell>
                  <TableCell>Role</TableCell>
                  <TableCell align="right">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filtered.map((r) => (
                  <TableRow key={r.id} hover>
                    {/* Member */}
                    <TableCell>
                      <Stack direction="row" spacing={1} alignItems="center">
                        <Avatar sx={{ width: 28, height: 28, bgcolor: r.avatarBg }}>
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

                    {/* Role (button + Save/Cancel + loader) */}
                    <TableCell sx={{ whiteSpace: "nowrap" }}>
                      <Stack direction="row" spacing={1} alignItems="center">
                        <Button
                          size="small"
                          variant="outlined"
                          onClick={() => openRoleDialog(r)} // open modal (not popover)
                        >
                          Role:{" "}
                          {renderRoleName(
                            tempRoleByRow[r.id] ?? r.roleId,
                            r.roleName ?? "—"
                          )}
                        </Button>

                        {dirtyRowIds.has(r.id) && !savingRowIds.has(r.id) && (
                          <>
                            <Tooltip title="Save">
                              <IconButton size="small" onClick={() => saveRoleChange(r.id)}>
                                <SaveIcon fontSize="small" />
                              </IconButton>
                            </Tooltip>
                            <Tooltip title="Cancel">
                              <IconButton size="small" onClick={() => cancelRoleChange(r.id)}>
                                <CloseIcon fontSize="small" />
                              </IconButton>
                            </Tooltip>
                          </>
                        )}

                        {savingRowIds.has(r.id) && (
                          <CircularProgress size={18} thickness={5} />
                        )}
                      </Stack>
                    </TableCell>

                    {/* Actions */}
                    <TableCell align="right">
                      <Tooltip title="Remove access">
                        <IconButton size="small" onClick={() => handleRemove(r.id)}>
                          <TrashIcon size={18} color="#1976d2" />
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

      {/* ---------------- Role Popover (old) ---------------- */}
      {/*
      <Popover
        open={Boolean(rolePopoverAnchor)}
        anchorEl={rolePopoverAnchor}
        onClose={closeRolePopover}
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
        transformOrigin={{ vertical: "top", horizontal: "left" }}
        PaperProps={{ sx: { width: 360, p: 1 } }}
      >
        ... (kept for future use)
      </Popover>
      */}

      {/* ---------------- Choose Role Dialog (modal) ---------------- */}
      <Dialog open={roleDlgOpen} onClose={closeRoleDialog} fullWidth maxWidth="sm">
        <DialogTitle
          sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}
        >
          <Typography variant="h6">Choose role</Typography>
          <IconButton onClick={closeRoleDialog} size="small">
            <CloseIcon fontSize="small" />
          </IconButton>
        </DialogTitle>

        <DialogContent dividers>
          {rolesLoading && (
            <Typography variant="body2" color="text.secondary">
              Loading roles…
            </Typography>
          )}
          {rolesError && (
            <Typography variant="body2" color="error">
              Couldn’t load roles.
            </Typography>
          )}

          {!rolesLoading && !rolesError && roleDlgRow && (
            <Stack spacing={1}>
              {roles.map((role) => {
                const checked =
                  (tempRoleByRow[roleDlgRow.id] ?? roleDlgRow.roleId) === role.id;

                return (
                  <Button
                    key={role.id}
                    onClick={() => handleRolePickFromDialog(roleDlgRow.id, role.id)}
                    sx={{
                      justifyContent: "flex-start",
                      textTransform: "none",
                      borderRadius: 1,
                      p: 1.25,
                      border: (t) =>
                        checked
                          ? `1px solid ${t.palette.primary.main}`
                          : `1px solid ${t.palette.divider}`,
                    }}
                  >
                    <Stack
                      direction="row"
                      spacing={1.5}
                      alignItems="flex-start"
                      sx={{ width: "100%" }}
                    >
                      <Box sx={{ mt: "2px", width: 18 }}>
                        {checked ? <CheckIcon fontSize="small" /> : null}
                      </Box>
                      <Box sx={{ flex: 1 }}>
                        <Typography variant="body2" sx={{ fontWeight: 600 }}>
                          {prettyName(role.name)}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          {role.description}
                        </Typography>
                      </Box>
                    </Stack>
                  </Button>
                );
              })}
            </Stack>
          )}
        </DialogContent>
      </Dialog>

      {/* ---------------- Add People Modal ---------------- */}
      <Dialog open={addOpen} onClose={() => !adding && setAddOpen(false)} fullWidth maxWidth="md">
        <DialogTitle>Add people to repository</DialogTitle>
        <DialogContent>
          {!selectedId && (
            <Stack spacing={2} sx={{ pt: 1 }}>
              <TextField
                autoFocus
                label="Search by username, full name, or email"
                placeholder="Try 45460309"
                value={psidInput}
                onChange={(e) => {
                  setPsidInput(e.target.value);
                  setSelectedId(null);
                  setSelectedRoleId(null);
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
              {result && (
                <Card
                  variant="outlined"
                  sx={{
                    cursor: "pointer",
                    borderColor: selectedId ? "primary.main" : "divider",
                  }}
                  onClick={() => setSelectedId(result.id)}
                >
                  <CardContent sx={{ py: 1.5 }}>
                    <Stack direction="row" spacing={1.5} alignItems="center">
                      <Avatar sx={{ bgcolor: result.avatarBg, width: 36, height: 36 }}>
                        {result.name[0]}
                      </Avatar>
                      <Stack sx={{ flex: 1 }}>
                        <Typography variant="body2" sx={{ fontWeight: 600 }}>
                          {result.name}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          {result.id} · invite outside collaborator
                        </Typography>
                      </Stack>
                      <Chip size="small" color="primary" label="Select" />
                    </Stack>
                  </CardContent>
                </Card>
              )}
            </Stack>
          )}

          {selectedId && result && (
            <Box sx={{ pt: 1 }}>
              {/* Selected user pill */}
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
                <Avatar sx={{ bgcolor: result.avatarBg, width: 28, height: 28, mr: 1 }}>
                  {result.name[0]}
                </Avatar>
                <Box sx={{ flex: 1, minWidth: 0 }}>
                  <Typography variant="body2" sx={{ fontWeight: 600 }} noWrap>
                    {result.name}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {result.id}
                  </Typography>
                  <MuiLink component="button" variant="caption" sx={{ ml: 1 }}>
                    View role details
                  </MuiLink>
                </Box>
                <IconButton
                  size="small"
                  onClick={() => {
                    setSelectedId(null);
                    setSelectedRoleId(null);
                    setPsidInput("");
                  }}
                >
                  <CloseIcon fontSize="small" />
                </IconButton>
              </Card>

              {/* Choose a role (from API) */}
              <Typography variant="subtitle2" sx={{ mb: 1 }}>
                Choose a role
              </Typography>

              {rolesLoading && (
                <Typography variant="body2" color="text.secondary" sx={{ px: 1, py: 0.5 }}>
                  Loading roles…
                </Typography>
              )}
              {rolesError && (
                <Typography variant="body2" color="error" sx={{ px: 1, py: 0.5 }}>
                  Couldn’t load roles.
                </Typography>
              )}

              {!rolesLoading && !rolesError && (
                <Stack spacing={1.25}>
                  {roles.map((r) => (
                    <Stack
                      key={r.id}
                      direction="row"
                      spacing={1.5}
                      alignItems="flex-start"
                      sx={{
                        p: 1,
                        borderRadius: 1,
                        border: (t) =>
                          selectedRoleId === r.id
                            ? `1px solid ${t.palette.primary.main}`
                            : `1px solid ${t.palette.divider}`,
                        cursor: "pointer",
                      }}
                      onClick={() => setSelectedRoleId(r.id)}
                    >
                      <Radio
                        checked={selectedRoleId === r.id}
                        onChange={() => setSelectedRoleId(r.id)}
                        value={r.id}
                        size="small"
                        sx={{ mt: 0.25 }}
                      />
                      <Box>
                        <Typography variant="body2" sx={{ fontWeight: 600 }}>
                          {prettyName(r.name)}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          {r.description}
                        </Typography>
                      </Box>
                    </Stack>
                  ))}
                </Stack>
              )}
            </Box>
          )}
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2 }}>
          <Button
            onClick={() => {
              setAddOpen(false);
              setSelectedId(null);
              setPsidInput("");
              setSelectedRoleId(null);
            }}
            disabled={adding}
          >
            Cancel
          </Button>
          <Button variant="contained" onClick={handleSubmitAdd} disabled={!canAdd || adding}>
            {adding ? "Adding…" : selectedId ? `Add ${selectedId}` : "Add to project"}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
