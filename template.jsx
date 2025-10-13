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

  const { data, isLoading: rolesLoading, isError: rolesError } = useRoles();
  const roles = data?.roles ?? [];

  // Add People Modal
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
    await new Promise((r) => setTimeout(r, 400));
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

  const handleRemove = (id) => setRows((prev) => prev.filter((r) => r.id !== id));

  // Role change (modal)
  const [tempRoleByRow, setTempRoleByRow] = useState({});
  const [dirtyRowIds, setDirtyRowIds] = useState(new Set());
  const [savingRowIds, setSavingRowIds] = useState(new Set());

  const [roleDlgOpen, setRoleDlgOpen] = useState(false);
  const [roleDlgRow, setRoleDlgRow] = useState(null);

  const openRoleDialog = (row) => {
    setRoleDlgRow(row);
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
    closeRoleDialog();
  };

  const saveRoleChange = async (rowId) => {
    setSavingRowIds((prev) => {
      const next = new Set(prev);
      next.add(rowId);
      return next;
    });

    await new Promise((r) => setTimeout(r, 600));

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
      <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: 2 }}>
        <Typography variant="h5">Manage access</Typography>
        <Button variant="contained" startIcon={<AddIcon />} onClick={() => setAddOpen(true)}>
          Add people
        </Button>
      </Stack>

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
                  <TableCell sx={{ color: "#000 !important", fontWeight: 700 }}>Member Name</TableCell>
                  <TableCell sx={{ color: "#000 !important", fontWeight: 700 }}>Role</TableCell>
                  <TableCell align="right" sx={{ color: "#000 !important", fontWeight: 700 }}>
                    Actions
                  </TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {filtered.map((r) => (
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
                            {r.id} {r.username}
                          </Typography>
                        </Stack>
                      </Stack>
                    </TableCell>

                    <TableCell sx={{ whiteSpace: "nowrap" }}>
                      <Stack direction="row" spacing={1} alignItems="center">
                        <Button size="small" variant="outlined" onClick={() => openRoleDialog(r)}>
                          Role:{" "}
                          {renderRoleName(tempRoleByRow[r.id] ?? r.roleId, r.roleName ?? "—")}
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

      {/* Choose Role Modal */}
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
                    <Stack direction="row" spacing={1.5} alignItems="flex-start" sx={{ width: "100%" }}>
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
    </Box>
  );
}
