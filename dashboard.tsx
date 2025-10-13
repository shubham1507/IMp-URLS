{/* 
  ------------------------------------------------------------
  ✅ ALTERNATE DESIGN: Large Dialog-style Role Selector (for reuse)
  ------------------------------------------------------------
  <Dialog
    open={roleDlgOpen}
    onClose={closeRoleDialog}
    fullWidth
    maxWidth="sm"
  >
    <DialogTitle>Choose role</DialogTitle>
    <DialogContent>
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
              tempRoleByRow[selectedRowId] === r.id
                ? `1px solid ${t.palette.primary.main}`
                : `1px solid ${t.palette.divider}`,
            cursor: "pointer",
          }}
          onClick={() => handleRolePick(selectedRowId, r.id)}
        >
          <Radio
            checked={tempRoleByRow[selectedRowId] === r.id}
            onChange={() => handleRolePick(selectedRowId, r.id)}
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
    </DialogContent>
    <DialogActions>
      <Button onClick={closeRoleDialog}>Cancel</Button>
      <Button
        variant="contained"
        onClick={saveRoleDialog}
        disabled={!selectedRowId}
      >
        Save
      </Button>
    </DialogActions>
  </Dialog>
*/}
