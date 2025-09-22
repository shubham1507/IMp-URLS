{/* Sticky Refresh header */}
<Box
  sx={{
    position: "sticky",
    top: 0,
    zIndex: 2,
    mb: 2,
    pt: 1,
    pb: 1,
    bgcolor: "background.paper",
    borderBottom: (theme) => `1px solid ${theme.palette.divider}`,
  }}
>
  <Tooltip title="Reload latest experiments now">
    <span>
      <Button
        variant="contained"
        color="primary"
        size="small"
        onClick={handleManualRefresh}
        disabled={isRefreshing}
        startIcon={!isRefreshing ? <RefreshIcon /> : null}
      >
        {isRefreshing ? (
          <>
            <CircularProgress size={16} sx={{ mr: 1 }} />
            Refreshing…
          </>
        ) : (
          "Refresh"
        )}
      </Button>
    </span>
  </Tooltip>
</Box>
