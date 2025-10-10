{/* ===== Choose Role Dialog (per row) ===== */}
<Dialog open={roleDlgOpen} onClose={closeRoleDialog} fullWidth maxWidth="sm">
  <DialogTitle>Choose role</DialogTitle>
  <DialogContent dividers>
    {isLoading && (
      <Typography variant="body2" color="text.secondary">
        Loading roles…
      </Typography>
    )}
    {isError && (
      <Typography variant="body2" color="error">
        Couldn’t load roles.
      </Typography>
    )}
    {!isLoading && !isError && (
      <Stack spacing={1.25}>
        {roles.map((role) => (
          <Stack
            key={role.id}
            direction="row"
            spacing={1.5}
            alignItems="flex-start"
            sx={{
              p: 1,
              borderRadius: 1,
              border: (t) =>
                roleDlgSelectedRoleId === role.id
                  ? `1px solid ${t.palette.primary.main}`
                  : `1px solid ${t.palette.divider}`,
              cursor: "pointer",
            }}
            onClick={() => setRoleDlgSelectedRoleId(role.id)}
          >
            <Radio
              checked={roleDlgSelectedRoleId === role.id}
              onChange={() => setRoleDlgSelectedRoleId(role.id)}
              value={role.id}
              size="small"
              sx={{ mt: 0.25 }}
            />
            <Box>
              <Typography variant="body2" sx={{ fontWeight: 600 }}>
                {prettyName(role.name)}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                {role.description}
              </Typography>
            </Box>
          </Stack>
        ))}
      </Stack>
    )}
  </DialogContent>
  <DialogActions sx={{ px: 3, py: 2 }}>
    <Button onClick={closeRoleDialog}>Cancel</Button>
    <Button
      onClick={saveRoleDialog}
      variant="contained"
      disabled={!roleDlgSelectedRoleId}
    >
      Save
    </Button>
  </DialogActions>
</Dialog>
