// Dialog (modal) version state — only needed if you enable the Dialog
const [roleDlgOpen, setRoleDlgOpen] = useState(false);
const [selectedRowId, setSelectedRowId] = useState(null);   // which table row is being edited
const [tempRoleByRow, setTempRoleByRow] = useState({});     // rowId -> roleId (temp selection)

// Open/close the dialog
const openRoleDialog = (rowId) => {
  setSelectedRowId(rowId);
  setRoleDlgOpen(true);
};

const closeRoleDialog = () => {
  setRoleDlgOpen(false);
  setSelectedRowId(null);
};

// When a role is clicked inside the dialog
const handleRolePick = (rowId, roleId) => {
  setTempRoleByRow((prev) => ({ ...prev, [rowId]: roleId }));
};

// Save the picked role to the rows table data
const saveRoleDialog = () => {
  const roleId = tempRoleByRow[selectedRowId];
  if (!roleId) return;

  setRows((prev) =>
    prev.map((r) =>
      r.id === selectedRowId ? { ...r, roleId, roleName: prettyName(roles.find(x => x.id === roleId)?.name || "") } : r
    )
  );

  setRoleDlgOpen(false);
  setSelectedRowId(null);
};




<Button
  size="small"
  variant="outlined"
  onClick={() => openRoleDialog(r.id)}
>
  Role: {r.roleName ?? "—"}
</Button>
