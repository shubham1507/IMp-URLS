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
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Tooltip,
  Link as MuiLink,
  Radio,
  Popover,
  CircularProgress,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import AddIcon from "@mui/icons-material/PersonAdd";
import CloseIcon from "@mui/icons-material/Close";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Close";
import { Trash as TrashIcon } from "@phosphor-icons/react/dist/ssr/Trash";

// 🔹 hook that calls GET /access/roles and returns { roles: [...] }
import { useRoles } from "@hooks/useRoles";

// --- demo directory (your psid) ---
const DIRECTORY = {
  "45460309": {
    id: "45460309",
    name: "Prasad Chavan",
    username: "pchavan",
    type: "Outside Collaborator",
    avatarBg: "#8BC34A",
  },
};

// prettify API role names for display
const prettyName = (apiName = "") =>
  apiName
    .replace(/^org_/i, "Organization ")
    .replace(/^project_/i, "Project ")
    .replace(/_/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());

export default function Access() {
  // table data
  const [rows, setRows] = useState([]);
  const [query, setQuery] = useState("");

  // add people (kept as-is, minimal demo)
  const [addOpen, setAddOpen] = useState(false);
  const [psidInput, setPsidInput] = useState("");
  const [selectedId, setSelectedId] = useState(null);

  // roles from API
  const { data, isLoading, isError } = useRoles();
  const roles = data?.roles ?? [];

  // 🔸 role popup state (anchor + row it belongs to)
  const [roleAnchorEl, setRoleAnchorEl] = useState(null);
  const [roleRowId, setRoleRowId] = useState(null);

  // 🔸 per-row temp selection & dirty/saving status
  const [tempRoleByRow, setTempRoleByRow] = useState({}); // { [rowId]: roleId }
  const [dirtyRowIds, setDirtyRowIds] = useState(new Set()); // Set of rowIds that changed
  const [savingRowIds, setSavingRowIds] = useState(new Set()); // Set of rowIds saving

  // filter
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

  // simple add (demo)
  const result = useMemo(() => DIRECTORY[psidInput.trim()] || null, [psidInput]);
  const canAdd = Boolean(selectedId);

  const handleSubmitAdd = async () => {
    if (!canAdd) return;
    const picked = DIRECTORY[selectedId];

    // default role = first role if exists
    const defaultRole = roles[0];
    const newRow = {
      ...picked,
      roleId: defaultRole?.id ?? null,
      roleName: defaultRole ? prettyName(defaultRole.name) : "—",
    };
    setRows((prev) => [newRow, ...prev.filter((r) => r.id !== newRow.id)]);
    setPsidInput("");
    setSelectedId(null);
    setAddOpen(false);
  };

  const handleRemove = (id) => setRows((prev) => prev.filter((r) => r.id !== id));

  // --- Role cell interactions ---
  const openRolePopover = (event, row) => {
    setRoleAnchorEl(event.currentTarget);
    setRoleRowId(row.id);

    // initialize temp role with current if not already set
    setTempRoleByRow((prev) =>
      prev[row.id] ? prev : { ...prev, [row.id]: row.roleId ?? null }
    );
  };

  const closeRolePopover = () => {
    setRoleAnchorEl(null);
    setRoleRowId(null);
  };

  const chooseTempRole = (rowId, roleId) => {
    setTempRoleByRow((prev) => ({ ...prev, [rowId]: roleId }));

    // mark as dirty if different from row's current role
    const row = rows.find((r) => r.id === rowId);
    const isDirty = row?.roleId !== roleId;
    setDirtyRowIds((prev) => {
      const next = new Set(prev);
      if (isDirty) next.add(rowId);
      else next.delete(rowId);
      return next;
    });
  };

  const cancelRoleChange = (rowId) => {
    // revert temp role to current row value and clear dirty
    const row = rows.find((r) => r.id === rowId);
    setTempRoleByRow((prev) => ({ ...prev, [rowId]: row?.roleId ?? null }));
    setDirtyRowIds((prev) => {
      const next = new Set(prev);
      next.delete(rowId);
      return next;
    });
  };

  const saveRoleChange = async (rowId) => {
    setSavingRowIds((prev) => new Set(prev).add(rowId));

    // TODO: call your PUT / PATCH API here with { rowId, roleId: tempRoleByRow[rowId] }
    await new Promise((r) => setTimeout(r, 900)); // simulate network

    const selRoleId = tempRoleByRow[rowId];
    const roleObj = roles.find((r) => r.id === selRoleId);

    setRows((prev) =>
      prev.map((row) =>
        row.id !== rowId
          ? row
          : {
              ...row,
              roleId: selRoleId,
              roleName: roleObj ? prettyName(roleObj.name) : row.roleName,
            }
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

  return (
    <Box sx={{ p: { xs: 1, sm: 2 } }}>
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        sx={{ mb: 2 }}
      >
        <Typography variant="h5">Manage access</Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => setAddOpen(true)}
        >
          Add people
        </Button>
      </Stack>

      <Card variant="outlined">
        <CardContent>
          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={2}
            alignItems="center"
            sx={{ mb: 2 }}
          >
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
            />
          </Stack>

          <Divider sx={{ mb: 2 }} />

          {rows.length === 0 ? (
            <Box
              sx={{
                border: (t) => `1px dashed ${t.palette.divider}`,
                borderRadius: 2,
                p: 6,
                textAlign: "center",
                bgcolor: (t) =>
                  t.palette.mode === "light" ? "rgba(0,0,0,0.02)" : "transparent",
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
                {filtered.map((r) => {
                  const isDirty = dirtyRowIds.has(r.id);
                  const isSaving = savingRowIds.has(r.id);
                  const tempRoleId = tempRoleByRow[r.id] ?? r.roleId;
                  const tempRoleObj = roles.find((x) => x.id === tempRoleId);
                  const tempRoleName =
                    tempRoleObj?.name ? prettyName(tempRoleObj.name) : r.roleName;

                  return (
                    <TableRow key={r.id} hover>
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

                      <TableCell sx={{ whiteSpace: "nowrap" }}>
                        <Stack direction="row" spacing={1} alignItems="center">
                          <Button
                            size="small"
                            variant="outlined"
                            onClick={(e) => openRolePopover(e, r)}
                          >
                            Role: {tempRoleName ?? "—"}
                          </Button>

                          {/* 🔹 Show Save/Cancel only when role changed for this row */}
                          {isDirty && !isSaving && (
                            <>
                              <Tooltip title="Save">
                                <IconButton
                                  size="small"
                                  onClick={() => saveRoleChange(r.id)}
                                >
                                  <SaveIcon fontSize="small" />
                                </IconButton>
                              </Tooltip>
                              <Tooltip title="Cancel">
                                <IconButton
                                  size="small"
                                  onClick={() => cancelRoleChange(r.id)}
                                >
                                  <CancelIcon fontSize="small" />
                                </IconButton>
                              </Tooltip>
                            </>
                          )}

                          {isSaving && (
                            <CircularProgress size={18} thickness={5} />
                          )}
                        </Stack>
                      </TableCell>

                      <TableCell align="right">
                        <Tooltip title="Remove access">
                          <IconButton size="small" onClick={() => handleRemove(r.id)}>
                            <TrashIcon size={18} color="#1976d2" />
                          </IconButton>
                        </Tooltip>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      {/* 🔸 Role chooser popover */}
      <Popover
        open={Boolean(roleAnchorEl)}
        anchorEl={roleAnchorEl}
        onClose={closeRolePopover}
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
        transformOrigin={{ vertical: "top", horizontal: "left" }}
        PaperProps={{ sx: { width: 420, p: 1 } }}
      >
        {/* Header: Choose role + close */}
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          sx={{ px: 1, py: 0.5 }}
        >
          <Typography variant="subtitle1">Choose role</Typography>
          <IconButton size="small" onClick={closeRolePopover}>
            <CloseIcon fontSize="small" />
          </IconButton>
        </Stack>

        <Box sx={{ px: 1, pb: 1 }}>
          {isLoading && (
            <Typography variant="body2" color="text.secondary">
              Loading roles…
            </Typography>
          )}
          {isError && (
            <Typography variant="body2" color="error">
              Couldn’t load roles.
            </Typography>
          )}

          {!isLoading &&
            !isError &&
            roles.map((role) => {
              const checked =
                (tempRoleByRow[roleRowId] ??
                  rows.find((x) => x.id === roleRowId)?.roleId) === role.id;

              return (
                <Stack
                  key={role.id}
                  direction="row"
                  spacing={1}
                  alignItems="flex-start"
                  sx={{
                    p: 1,
                    borderRadius: 1,
                    border: (t) =>
                      checked
                        ? `1px solid ${t.palette.primary.main}`
                        : `1px solid ${t.palette.divider}`,
                    mb: 1,
                    cursor: "pointer",
                  }}
                  onClick={() => chooseTempRole(roleRowId, role.id)}
                >
                  <Radio checked={checked} value={role.id} size="small" sx={{ mt: 0.25 }} />
                  <Box>
                    <Typography variant="body2" sx={{ fontWeight: 600 }}>
                      {prettyName(role.name)}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {role.description}
                    </Typography>
                  </Box>
                </Stack>
              );
            })}
        </Box>
      </Popover>

      {/* Minimal Add people UI (kept simple) */}
      {addOpen && (
        <Card
          variant="outlined"
          sx={{ mt: 2, p: 2, display: "inline-block", maxWidth: 520 }}
        >
          <Stack spacing={1.5}>
            <Typography variant="subtitle1">Add people to repository</Typography>
            <TextField
              autoFocus
              label="Search by username, full name, or email"
              placeholder="Try 45460309"
              value={psidInput}
              onChange={(e) => {
                setPsidInput(e.target.value);
                setSelectedId(null);
              }}
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
                <CardContent sx={{ py: 1.25 }}>
                  <Stack direction="row" spacing={1.5} alignItems="center">
                    <Avatar sx={{ bgcolor: result.avatarBg, width: 36, height: 36 }}>
                      {result.name[0]}
                    </Avatar>
                    <Box sx={{ flex: 1 }}>
                      <Typography variant="body2" sx={{ fontWeight: 600 }}>
                        {result.name}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {result.id} · invite outside collaborator
                      </Typography>
                    </Box>
                    <Chip size="small" color="primary" label="Select" />
                  </Stack>
                </CardContent>
              </Card>
            )}

            <Stack direction="row" spacing={1} justifyContent="flex-end">
              <Button
                onClick={() => {
                  setAddOpen(false);
                  setPsidInput("");
                  setSelectedId(null);
                }}
              >
                Cancel
              </Button>
              <Button
                variant="contained"
                disabled={!canAdd}
                onClick={handleSubmitAdd}
              >
                {selectedId ? `Add ${selectedId}` : "Add to repository"}
              </Button>
            </Stack>
          </Stack>
        </Card>
      )}
    </Box>
  );
}
