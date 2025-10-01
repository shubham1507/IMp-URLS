// Access.jsx — complete file
// Implements: empty state, add people flow with hardcoded PSID 45460309,
// role selection (Admin/Write/Read), and add/delete in the table.
//
// Notes:
// - All data is local/hardcoded to match your current requirement.
// - Replace the mock search map or handlers with real APIs later.

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
  FormControlLabel,
  Radio,
  RadioGroup,
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Tooltip
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import AddIcon from "@mui/icons-material/PersonAdd";
import CloseIcon from "@mui/icons-material/Close";

// ---------------- Hardcoded "directory" for search demo ----------------
const DIRECTORY = {
  "45460309": {
    id: "45460309",
    name: "Prasad Chavan",
    username: "pchavan",
    type: "Outside Collaborator",
    avatarBg: "#8BC34A",
  },
};

export default function Access() {
  // ---------------- Table data ----------------
  const [rows, setRows] = useState([]); // empty at first -> shows "No people..." state
  const [query, setQuery] = useState("");
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return rows;
    return rows.filter(
      r =>
        r.name.toLowerCase().includes(q) ||
        r.username.toLowerCase().includes(q) ||
        r.id.toLowerCase().includes(q)
    );
  }, [query, rows]);

  // ---------------- Modal state ----------------
  const [addOpen, setAddOpen] = useState(false);
  const [psidInput, setPsidInput] = useState("");
  const [selectedId, setSelectedId] = useState(null);
  const [role, setRole] = useState("Read"); // Admin / Write / Read
  const [adding, setAdding] = useState(false);

  // compute "search result" for the PSID input (hardcoded)
  const result = useMemo(() => {
    const key = psidInput.trim();
    return DIRECTORY[key] || null;
  }, [psidInput]);

  const canAdd = Boolean(selectedId) && !adding;

  const handleSubmitAdd = async () => {
    if (!canAdd) return;
    setAdding(true);

    // mock network delay
    await new Promise(r => setTimeout(r, 250));

    const picked = DIRECTORY[selectedId];
    const newRow = {
      ...picked,
      role, // selected role from radio
    };

    setRows(prev => {
      // avoid duplicates on repeated adds
      const exists = prev.some(r => r.id === newRow.id);
      if (exists) {
        return prev.map(r => (r.id === newRow.id ? newRow : r));
      }
      return [...prev, newRow];
    });

    // reset modal
    setAdding(false);
    setPsidInput("");
    setSelectedId(null);
    setRole("Read");
    setAddOpen(false);
  };

  const handleRemove = (id) => {
    setRows(prev => prev.filter(r => r.id !== id));
  };

  // ---------------- UI ----------------
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
            <Checkbox disabled /> {/* Select all (UI only) */}
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
            <Chip size="small" label={`Direct access`} variant="outlined" />
            <Chip size="small" label={`Organization access`} variant="outlined" />
          </Stack>

          <Divider sx={{ mb: 2 }} />

          {/* ---------- Empty state when no rows ---------- */}
          {rows.length === 0 ? (
            <Box
              sx={{
                border: (t) => `1px dashed ${t.palette.divider}`,
                borderRadius: 2,
                p: 6,
                textAlign: "center",
                bgcolor: (t) => (t.palette.mode === "light" ? "#fafafa" : "transparent"),
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
                      <Chip size="small" color="default" label={r.role} />
                    </TableCell>
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
      <Dialog open={addOpen} onClose={() => !adding && setAddOpen(false)} fullWidth maxWidth="sm">
        <DialogTitle>Add people to repository</DialogTitle>
        <DialogContent>
          <Stack spacing={2} sx={{ pt: 1 }}>
            <TextField
              autoFocus
              label="Search by username, full name, or email"
              placeholder="Try 45460309"
              value={psidInput}
              onChange={(e) => {
                setPsidInput(e.target.value);
                setSelectedId(null); // reset selection on change
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

            {/* Search result card (hardcoded match for 45460309) */}
            {result && (
              <Card
                variant="outlined"
                sx={{
                  cursor: "pointer",
                  borderColor: selectedId === result.id ? "primary.main" : "divider",
                }}
                onClick={() => setSelectedId(result.id)}
              >
                <CardContent sx={{ py: 1.5 }}>
                  <Stack direction="row" spacing={1.5} alignItems="center">
                    <Avatar sx={{ bgcolor: result.avatarBg, width: 32, height: 32 }}>
                      {result.name[0]}
                    </Avatar>
                    <Stack sx={{ flex: 1 }}>
                      <Typography variant="body2" sx={{ fontWeight: 600 }}>
                        {result.name}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {result.id} · invite {result.type.toLowerCase()}
                      </Typography>
                    </Stack>
                    <Chip
                      size="small"
                      color={selectedId === result.id ? "primary" : "default"}
                      label={selectedId === result.id ? "Selected" : "Select"}
                    />
                  </Stack>
                </CardContent>
              </Card>
            )}

            {/* Role chooser — only show after a person is selected */}
            {selectedId && (
              <Box sx={{ mt: 1 }}>
                <Typography variant="subtitle2" sx={{ mb: 1 }}>
                  Choose a role
                </Typography>
                <RadioGroup
                  row
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                >
                  <FormControlLabel value="Admin" control={<Radio />} label="Admin" />
                  <FormControlLabel value="Write" control={<Radio />} label="Write" />
                  <FormControlLabel value="Read" control={<Radio />} label="Read" />
                </RadioGroup>
              </Box>
            )}
          </Stack>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2 }}>
          <Button onClick={() => setAddOpen(false)} disabled={adding}>Cancel</Button>
          <Button
            variant="contained"
            onClick={handleSubmitAdd}
            disabled={!canAdd}
          >
            {adding
              ? "Adding…"
              : selectedId
                ? `Add ${selectedId}`
                : "Add to repository"}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
