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
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import { Trash as TrashIcon } from "@phosphor-icons/react/dist/ssr/Trash";

const DIRECTORY = [
  {
    id: "45460399",
    name: "Prasad Chavan",
    username: "pchavan",
    type: "Outside Collaborator",
    avatarBG: "#8BC34A",
  },
];

const ROLE_DESCRIPTIONS = {
  Admin:
    "Recommended for people who need full access to the project, including sensitive and destructive actions.",
  Write:
    "Recommended for contributors who need to actively push to your project.",
  Read:
    "Recommended for non-code contributors who want to view or discuss your project.",
};

const ROLES = ["Admin", "Write", "Read"];

export default function Access() {
  const [rows, setRows] = useState(DIRECTORY);
  const [query, setQuery] = useState("");
  const [addOpen, setAddOpen] = useState(false);
  const [psidInput, setPsidInput] = useState("");
  const [selectedId, setSelectedId] = useState(null);
  const [role, setRole] = useState("Read");
  const [adding, setAdding] = useState(false);

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

  const canAdd = useMemo(() => Boolean(selectedId), [selectedId]);

  const handleSubmitAdd = async () => {
    if (!canAdd) return;
    setAdding(true);
    await new Promise((r) => setTimeout(r, 250));
    const newRow = DIRECTORY.find((r) => r.id === selectedId);
    setRows((prev) => [...prev.filter((r) => r.id !== newRow.id), newRow]);
    setAdding(false);
    setAddOpen(false);
    setSelectedId(null);
    setRole("Read");
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
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => setAddOpen(true)}
          >
            Add people
          </Button>
        </Stack>
      </Stack>

      {/* Table */}
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
                    theme.palette.mode === "light"
                      ? "rgba(0,0,0,0.02)"
                      : "transparent"
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
              <Button
                variant="contained"
                onClick={() => setAddOpen(true)}
                sx={{ mt: 2 }}
              >
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
                          <Typography
                            variant="body2"
                            sx={{ fontWeight: 600 }}
                          >
                            {r.name}
                          </Typography>
                          <Typography
                            variant="caption"
                            color="text.secondary"
                          >
                            {r.username}
                          </Typography>
                        </Box>
                      </Stack>
                    </TableCell>
                    <TableCell>
                      <Chip size="small" label={r.type} />
                    </TableCell>
                    <TableCell>
                      <Chip size="small" label="Read" />
                    </TableCell>
                    <TableCell align="right">
                      <Tooltip title="Remove access">
                        <IconButton
                          size="small"
                          sx={{ color: "primary.main" }}
                          onClick={() => handleRemove(r.id)}
                        >
                          <TrashIcon size={18} />
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
          {/* Search */}
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

          {/* Search Result */}
          {psidInput.trim() && (
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
                    sx={{
                      bgcolor: DIRECTORY[0].avatarBG,
                      width: 36,
                      height: 36,
                    }}
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

          {/* Selected User Pill */}
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
                  <Typography
                    variant="caption"
                    color="text.secondary"
                    component="button"
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

          {/* Choose Role */}
          <Card variant="outlined" sx={{ p: 1, borderRadius: 1, mb: 2 }}>
            <Typography variant="subtitle2" sx={{ mb: 1 }}>
              Choose role
            </Typography>
            <Stack direction="row" spacing={1.5} alignItems="flex-start">
              {ROLES.map((r) => (
                <Box
                  key={r}
                  sx={{
                    p: 1,
                    borderRadius: 1,
                    border: (theme) =>
                      `1px solid ${
                        role === r
                          ? theme.palette.primary.main
                          : theme.palette.divider
                      }`,
                    cursor: "pointer",
                  }}
                  onClick={() => setRole(r)}
                >
                  <Radio
                    size="small"
                    checked={role === r}
                    onChange={() => setRole(r)}
                    value={r}
                  />
                  <Typography variant="body2" sx={{ fontWeight: 600 }}>
                    {r}
                  </Typography>
                  <Typography
                    variant="caption"
                    color="text.secondary"
                    sx={{ mt: 0.5 }}
                  >
                    {ROLE_DESCRIPTIONS[r]}
                  </Typography>
                </Box>
              ))}
            </Stack>
          </Card>
        </DialogContent>

        <DialogActions sx={{ pr: 3, pb: 2 }}>
          <Button
            onClick={() => {
              setAddOpen(false);
              setSelectedId(null);
              setRole("Read");
              setPsidInput("");
            }}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={handleSubmitAdd}
            disabled={!canAdd || adding}
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
