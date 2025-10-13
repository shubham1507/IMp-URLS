// Compute the visible role label for a row (uses temp selection if present)
const getRoleLabel = (row) => {
  const effectiveRoleId = tempRoleByRow[row.id] ?? row.roleId;
  const roleObj = roles.find((x) => x.id === effectiveRoleId);
  return roleObj ? prettyName(roleObj.name) : (row.roleName ?? "—");
};

<TableCell sx={{ whiteSpace: "nowrap" }}>
  <Stack direction="row" spacing={1} alignItems="center">
    <Button
      size="small"
      variant="outlined"
      onClick={(e) => openRolePopover(e, r)}
    >
      Role: {getRoleLabel(r)}
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

    {savingRowIds.has(r.id) && <CircularProgress size={18} thickness={5} />}
  </Stack>
</TableCell>
