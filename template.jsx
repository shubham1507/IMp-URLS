// client/src/components/dashboard/settings/access/Access.jsx
// ---------------------------------------------------------
// Manage Access (hardcoded demo):
// - Empty state when no rows
// - Add People modal:
//     * Type PSID "45460309" -> shows result card
//     * After selecting a person: HIDE search
//       - Left: role options w/ descriptions (Admin / Write / Read)
//       - Right: selected user pill (sticky), with "View role details" link and X
//     * "Add {PSID}" adds row to table (insert at TOP)
// - Each row has a delete button

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
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import AddIcon from "@mui/icons-material/PersonAdd";
import CloseIcon from "@mui/icons-material/Close";

// ---- Hardcoded directory (PSID -> user) ----
const DIRECTORY = {
  "45460309": {
    id: "45460309",
    name: "Prasad Chavan",
    username: "pchavan",
    type: "Outside Collaborator",
    avatarBg: "#8BC34A",
  },
};

// ---- Role descriptions ----
const ROLE_DESCRIPTIONS = {
  Admin:
    "Recommended for people who need full access to the project, including sensitive and destructive actions.",
  Write:
    "Recommended for contributors who actively push to your project.",
  Read:
    "Recommended for non-code contributors who want to view or discuss your project.",
};

export default function Access() {
  // ---------- Table ----------
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

  // ---------- Modal ----------
  const [addOpen, setAddOpen] = useState(false);
  const [psidInput, setPsidInput] = useState("");
  const [selectedId, setSelectedId] = useState(null);
  const [role, setRole] = useState("Read");
  const [adding, setAdding] = useState(false);

  const result = useMemo(() => DIRECTORY[psidInput.trim()] || null, [psidInput]);
  const canAdd = Boolean(selectedId) && !adding;

  const handleSubmitAdd = async () => {
    if (!canAdd) return;
    setAdding(true);
    await new Promise((r) => setTimeout(r, 250)); // mock call
    const picked = DIRECTORY[selectedId];
    const newRow = { ...picked, role };
    setRows((prev) => [newRow, ...prev.filter((r) => r.id !== newRow.id)]); // insert at top
    // reset
    setAdding(false);
    setPsidInput("");
    setSelectedId(null);
    setRole("Read");
    setAddOpen(false);
  };

  const handleRemove = (id) => setRows((prev) => prev.filter((r) => r.id !== id));

  return (
    <Box sx={{ p: { xs: 1, sm: 2 } }}>
      <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: 2 }}>
        <Typography variant="h5">Manage access</Typography>
        <Stack direction="row" spacing={1}>
          <Button variant="outlined" disabled>
            Add teams
          </Button>
          <Button variant="contained" startIcon={<AddIcon />} onClick={() => setAddOpen(true)}>
            Add people
          </Button>
        </Stack>
      </Stack>

      <Card variant="outlined">
        <CardContent>
          <Stack direction={{ xs: "column", sm: "row" }} spacing={2} alignItems="center" sx={{ mb: 2 }}>
            <Checkbox disabled />
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
            <Chip size="small" label="Direct access" variant="outlined" />
            <Chip size="small" label="Organization access" variant="outlined" />
          </Stack>

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
                  <TableCell padding="checkbox"><Checkbox disabled /></TableCell>
                  <TableCell>Direct access</TableCell>
                  <TableCell>Type</TableCell>
                  <TableCell>Role</TableCell>
                  <TableCell align="right">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filtered.map((r) => (
                  <TableRow key={r.id} hover>
                    <TableCell padding="checkbox"><Checkbox /></TableCell>
                    <TableCell>
                      <Stack direction="row" spacing={1} alignItems="center">
                        <Avatar sx={{ width: 28, height: 28, bgcolor: r.avatarBg }}>
                          {r.name?.[0] || "U"}
                        </Avatar>
                        <Stack>
                          <Typography variant="body2" sx={{ fontWeight: 600 }}>{r.name}</Typography>
                          <Typography variant="caption" color="text.secondary">
                            {r.id} · {r.username}
                          </Typography>
                        </Stack>
                      </Stack>
                    </TableCell>
                    <TableCell><Chip size="small" label={r.type} /></TableCell>
                    <TableCell><Chip size="small" label={r.role} /></TableCell>
                    <TableCell align="right">
                      <Tooltip title="Remove access">
                        <IconButton size="small" onClick={() => handleRemove(r.id)}>
                          <CloseIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                ))}
                {filtered.length === 0 && rows.length > 0 && (
                  <TableRow>
                    <TableCell colSpan={5}>
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

      {/* ---------------- Add People Modal ---------------- */}
      <Dialog open={addOpen} onClose={() => !adding && setAddOpen(false)} fullWidth maxWidth="md">
        <DialogTitle>Add people to repository</DialogTitle>

        <DialogContent>
          {/* A) No selection: show search + result */}
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
                  sx={{ cursor: "pointer", borderColor: selectedId ? "primary.main" : "divider" }}
                  onClick={() => setSelectedId(result.id)}
                >
                  <CardContent sx={{ py: 1.5 }}>
                    <Stack direction="row" spacing={1.5} alignItems="center">
                      <Avatar sx={{ bgcolor: result.avatarBg, width: 36, height: 36 }}>
                        {result.name[0]}
                      </Avatar>
                      <Stack sx={{ flex: 1 }}>
                        <Typography variant="body2" sx={{ fontWeight: 600 }}>{result.name}</Typography>
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

          {/* B) Selected: left roles, right selected-user pill */}
          {selectedId && result && (
            <Stack
              direction={{ xs: "column", md: "row" }}
              spacing={2}
              sx={{ pt: 1 }}
            >
              {/* Left: roles with descriptions */}
              <Box sx={{ flex: 1, minWidth: 0 }}>
                <Typography variant="subtitle2" sx={{ mb: 1 }}>Choose a role</Typography>
                <Stack spacing={1.25}>
                  {["Read", "Write", "Admin"].map((r) => (
                    <Stack
                      key={r}
                      direction="row"
                      alignItems="flex-start"
                      spacing={1.5}
                      sx={{
                        p: 1,
                        borderRadius: 1,
                        border: (t) =>
                          r === role ? `1px solid ${t.palette.primary.main}` : `1px solid ${t.palette.divider}`,
                      }}
                      onClick={() => setRole(r)}
                    >
                      <Radio
                        checked={role === r}
                        onChange={() => setRole(r)}
                        value={r}
                        size="small"
                        sx={{ mt: 0.25 }}
                      />
                      <Box>
                        <Typography variant="body2" sx={{ fontWeight: 600 }}>{r}</Typography>
                        <Typography variant="caption" color="text.secondary">
                          {ROLE_DESCRIPTIONS[r]}
                        </Typography>
                      </Box>
                    </Stack>
                  ))}
                </Stack>
              </Box>

              {/* Right: selected user pill (sticky like GitHub) */}
              <Box
                sx={{
                  width: { xs: "100%", md: 320 },
                  position: { md: "sticky" },
                  top: { md: 8 },
                  alignSelf: { md: "flex-start" },
                }}
              >
                <Card variant="outlined" sx={{ px: 1.25, py: 0.75, borderRadius: 2 }}>
                  <Stack direction="row" spacing={1} alignItems="center">
                    <Avatar sx={{ bgcolor: result.avatarBg, width: 28, height: 28 }}>
                      {result.name[0]}
                    </Avatar>
                    <Box sx={{ flex: 1, minWidth: 0 }}>
                      <Typography variant="body2" sx={{ fontWeight: 600 }} noWrap>
                        {result.name}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">{result.id}</Typography>
                    </Box>
                    <IconButton
                      size="small"
                      onClick={() => {
                        setSelectedId(null);
                        setRole("Read");
                        setPsidInput("");
                      }}
                    >
                      <CloseIcon fontSize="small" />
                    </IconButton>
                  </Stack>
                </Card>
                <Box sx={{ textAlign: "right", mt: 0.5 }}>
                  <MuiLink component="button" type="button" variant="caption">
                    View role details
                  </MuiLink>
                </Box>
              </Box>
            </Stack>
          )}
        </DialogContent>

        <DialogActions sx={{ px: 3, pb: 2 }}>
          <Button
            onClick={() => {
              setAddOpen(false);
              setSelectedId(null);
              setPsidInput("");
              setRole("Read");
            }}
            disabled={adding}
          >
            Cancel
          </Button>
          <Button variant="contained" onClick={handleSubmitAdd} disabled={!canAdd}>
            {adding ? "Adding…" : selectedId ? `Add ${selectedId}` : "Add to repository"}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
