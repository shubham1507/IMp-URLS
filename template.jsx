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
  Select,
  MenuItem,
  FormControl,
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
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import CloseIcon from "@mui/icons-material/Close";

export default function Access() {
  // ---- Hardcoded data (replace with API later) ----
  const [rows, setRows] = useState([
    {
      id: "45460309",
      name: "Prasad Chavan",
      username: "pchavan",
      type: "Outside Collaborator",
      role: "Admin",
      avatarBg: "#8BC34A",
    },
  ]);

  // ---- Local state ----
  const [query, setQuery] = useState("");
  const [addOpen, setAddOpen] = useState(false);
  const [addInput, setAddInput] = useState("");

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

  const handleRoleChange = (id, value) => {
    setRows(prev => prev.map(r => (r.id === id ? { ...r, role: value } : r)));
  };

  const handleAdd = () => {
    if (!addInput.trim()) return;
    // mock parse – accepts username or email or employee id
    const username = addInput.trim().split("@")[0].replace(/\s+/g, "").toLowerCase();
    setRows(prev => [
      ...prev,
      {
        id: (Math.random() * 1e8).toFixed(0),
        name: addInput.trim(),
        username,
        type: "Member",
        role: "Read",
        avatarBg: "#90CAF9",
      },
    ]);
    setAddInput("");
    setAddOpen(false);
  };

  return (
    <Box sx={{ p: { xs: 1, sm: 2 } }}>
      <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: 2 }}>
        <Typography variant="h5">Manage access</Typography>
        <Stack direction="row" spacing={1}>
          <Button variant="outlined" startIcon={<GroupAddIcon />} disabled>
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
            <FormControl size="small" sx={{ minWidth: 140 }}>
              <Select value={"All"} disabled>
                <MenuItem value="All">Type</MenuItem>
              </Select>
            </FormControl>
            <FormControl size="small" sx={{ minWidth: 140 }}>
              <Select value={"All"} disabled>
                <MenuItem value="All">Role</MenuItem>
              </Select>
            </FormControl>
          </Stack>

          <Divider sx={{ mb: 2 }} />

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
                  <TableCell sx={{ minWidth: 160 }}>
                    <FormControl size="small" fullWidth>
                      <Select
                        value={r.role}
                        onChange={(e) => handleRoleChange(r.id, e.target.value)}
                      >
                        <MenuItem value="Admin">Admin</MenuItem>
                        <MenuItem value="Write">Write</MenuItem>
                        <MenuItem value="Triage">Triage</MenuItem>
                        <MenuItem value="Read">Read</MenuItem>
                        <MenuItem value="Maintain">Maintain</MenuItem>
                      </Select>
                    </FormControl>
                  </TableCell>
                  <TableCell align="right">
                    <Tooltip title="Remove access">
                      <IconButton size="small">
                        <CloseIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              ))}

              {filtered.length === 0 && (
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
        </CardContent>
      </Card>

      {/* -------- Add People Modal -------- */}
      <Dialog open={addOpen} onClose={() => setAddOpen(false)} fullWidth maxWidth="sm">
        <DialogTitle>Add people to repository</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Search by username, full name, or email"
            type="text"
            fullWidth
            value={addInput}
            onChange={(e) => setAddInput(e.target.value)}
          />
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2 }}>
          <Button onClick={() => setAddOpen(false)}>Cancel</Button>
          <Button variant="contained" onClick={handleAdd} disabled={!addInput.trim()}>
            Add to repository
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
