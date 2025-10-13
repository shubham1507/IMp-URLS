const handleRolePick = (rowId, roleId) => {
  setTempRoleByRow((prev) => ({ ...prev, [rowId]: roleId }));
  setDirtyRowIds((prev) => new Set(prev).add(rowId)); // mark as changed
  closeRolePopover();
};
