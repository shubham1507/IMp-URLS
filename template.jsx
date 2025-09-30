import React, { useMemo, useState } from "react";
import {
  Box, Card, CardContent, Typography, Stack, Button, TextField,
  InputAdornment, Table, TableHead, TableRow, TableCell, TableBody,
  Dialog, DialogTitle, DialogContent, DialogActions, Checkbox, Avatar, Chip
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import PersonAddIcon from "@mui/icons-material/PersonAdd";

export default function AccessPage() {
  const [rows, setRows] = useState([
    { id: "45460309", name: "Prasad Chavan", username: "pchavan", type: "Outside Collaborator", role: "Admin" }
  ]);
  const [q, setQ] = useState("");
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");

  const filtered = useMemo(() => {
    const s = q.trim().toLowerCase();
    return s ? rows.filter(r => (r.name+r.username+r.id).toLowerCase().includes(s)) : rows;
  }, [q, rows]);

  const addPerson = () => {
    if (!input.trim()) return;
    setRows(r => [...r, { id: Date.now()+"", name: input.trim(), username: input.split("@")[0], type: "Member", role: "Read" }]);
    setInput(""); setOpen(false);
  };

  return (
    <Box sx={{ p: 2 }}>
      <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
        <Typography variant="h5">Manage access</Typography>
        <Button variant="contained" startIcon={<PersonAddIcon />} onClick={() => setOpen(true)}>
          Add people
        </Button>
      </Stack>

      <Card variant="outlined">
        <CardContent>
          <TextField
            fullWidth size="small" placeholder="Find people or a team…"
            value={q} onChange={e=>setQ(e.target.value)}
            InputProps={{ startAdornment: <InputAdornment position="start"><SearchIcon /></InputAdornment> }}
            sx={{ mb: 2 }}
          />
          <Table>
            <TableHead>
              <TableRow>
                <TableCell padding="checkbox"><Checkbox disabled /></TableCell>
                <TableCell>Direct access</TableCell>
                <TableCell>Type</TableCell>
                <TableCell>Role</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filtered.map(r => (
                <TableRow key={r.id} hover>
                  <TableCell padding="checkbox"><Checkbox /></TableCell>
                  <TableCell>
                    <Stack direction="row" spacing={1} alignItems="center">
                      <Avatar>{r.name?.[0] || "U"}</Avatar>
                      <Stack>
                        <Typography variant="body2" fontWeight={600}>{r.name}</Typography>
                        <Typography variant="caption" color="text.secondary">{r.id} · {r.username}</Typography>
                      </Stack>
                    </Stack>
                  </TableCell>
                  <TableCell><Chip size="small" label={r.type} /></TableCell>
                  <TableCell>{r.role}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Dialog open={open} onClose={() => setOpen(false)} fullWidth maxWidth="sm">
        <DialogTitle>Add people to repository</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus fullWidth margin="dense"
            label="Search by username, full name, or email"
            value={input} onChange={e=>setInput(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={()=>setOpen(false)}>Cancel</Button>
          <Button variant="contained" onClick={addPerson} disabled={!input.trim()}>Add to repository</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
