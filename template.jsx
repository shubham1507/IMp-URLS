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
  Tooltip,
  Link as MuiLink,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import AddIcon from "@mui/icons-material/PersonAdd";
import CloseIcon from "@mui/icons-material/Close";
import { Trash as TrashIcon } from "@phosphor-icons/react/dist/ssr/Trash";
import { useRoles } from "@hooks/useRoles"; // GET /access/roles

const DIRECTORY = {
  "45460309": {
    id: "45460309",
    name: "Prasad Chavan",
    username: "pchavan",
    type: "Outside Collaborator",
    avatarBg: "#8BC34A",
  },
};

const prettyName = (apiName = "") =>
  apiName
    .replace(/^org_/i, "Organization ")
    .replace(/^project_/i, "Project ")
    .replace(/_/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());

export default function Access() {
  const [rows, setRows] = useState([]);
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

  // Add People modal state
  const [addOpen, setAddOpen] = useState(false);
  const [psidInput, setPsidInput] = useState("");
  const [selectedId, setSelectedId] = useState(null);

  // Roles from API
  const { data, isLoading, isError } = useRoles(); // expects { roles: [...] }
  const roles = data?.roles ?? [];
  const [selectedRoleId, setSelectedRoleId] = useState(null);
  const [adding, setAdding] = useState(false);

  const result = useMemo(() => DIRECTORY[psidInput.trim()] || null, [psidInput]);
  const canAdd = Boolean(selectedId) && Boolean(selectedRoleId) && !adding;

  const handleSubmitAdd = async () => {
    if (!canAdd) return;
    setAdding(true);
    await new Promise((r) => setTimeout(r, 250));

    const picked = DIRECTORY[selectedId];
    const roleObj = roles.find((r) => r.id === selectedRoleId);

    const newRow = {
      ...picked,
      roleId: selectedRoleId,
      roleName: roleObj ? prettyName(roleObj.name) : "Role",
    };

    setRows((prev) => [newRow, ...prev.filter((r) => r.id !== newRow.id)]);
    setAdding(false);
    setPsidInput("");
    setSelectedId(null);
    setSelectedRoleId(null);
    setAddOpen(false);
  };

  const handleRemove = (id) => setRows((prev) => prev.filter((r) => r.id !== id));

  return (
    <Box sx={{ p: { xs: 1, sm: 2 } }}>
      <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: 2 }}>
        <Typography variant="h5">Manage access</Typography>
        <Stack direction="row" spacing={1}>
          <Button variant="contained" startIcon={<AddIcon />} onClick={() => setAddOpen(true)}>
            Add people
          </Button>
        </Stack>
      </Stack>

      <Card variant="outlined">
        <CardContent>
          <Stack direction={{ xs: "column", sm: "row" }} spacing={2} alignItems="center" sx={{ mb: 2 }}>
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
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                Assigned individuals and teams will appear here once you add them.
              </Typography>
            </Box>
          ) : (
            <Table>
              <TableHead>
                <TableRow>
                  {/* ✅ Removed checkbox column completely */}
                  <TableCell>Member access</TableCell>
                  <TableCell>Role</TableCell>
                  <TableCell align="right">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filtered.map((r) => (
                  <TableRow key={r.id} hover>
                    {/* ✅ Removed per-row checkbox */}
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
                    <TableCell>
                      <Chip size="small" label={r.roleName ?? "—"} />
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
                {filtered.length === 0 && rows.length > 0 && (
                  <TableRow>
                    <TableCell colSpan={3}>
                      <Typography variant="body2" color="text.secondary">
                        No results match “{query}”.
                      </Typography>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      {/* Add People Modal */}
      <Dialog
        open={addOpen}
        onClose={() => !adding && setAddOpen(false)}
        fullWidth
        maxWidth="md"
      >
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
              {/* Selected user pill ABOVE roles */}
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

              {isLoading && (
                <Typography variant="body2" color="text.secondary" sx={{ px: 1, py: 0.5 }}>
                  Loading roles…
                </Typography>
              )}

              {isError && (
                <Typography variant="body2" color="error" sx={{ px: 1, py: 0.5 }}>
                  Couldn’t load roles.
                </Typography>
              )}

              {!isLoading && !isError && (
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
          <Button
            variant="contained"
            onClick={handleSubmitAdd}
            disabled={!canAdd}
          >
            {adding ? "Adding…" : selectedId ? `Add ${selectedId}` : "Add to project"}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
