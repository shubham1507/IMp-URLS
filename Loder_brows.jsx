<Box>
  <Typography variant="body2" sx={{ fontWeight: "bold" }}>
    {resourceLabel}
  </Typography>
  {resArray.length > 0 ? (
    <ul style={{ margin: "4px 0 0 16px" }}>
      {resArray.map((r, idx) => (
        <li key={idx}>{r?.name}</li>
      ))}
    </ul>
  ) : (
    <Typography variant="body2">N/A</Typography>
  )}
</Box>
