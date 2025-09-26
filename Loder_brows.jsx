// CHANGED: controlled value; shows the initialized 120 on first visit
<TextField
  type="number"
  inputProps={{ min: 0 }}
  value={formdata?.parameters?.gracefulDeletionTimeout ?? 120}
  onChange={(e) => {
    const n = Number(e.target.value);
    setFormData(prev => ({
      ...prev,
      parameters: {
        ...prev?.parameters,
        gracefulDeletionTimeout: Number.isFinite(n) && n >= 0 ? n : 0,
      },
    }));
  }}
  sx={{ width: "250px" }}
/>

// make sure "First-first" exists as an option
<Select
  value={formdata?.parameters?.targetmode ?? "First-first"}  // CHANGED
  onChange={(e) =>
    setFormData(prev => ({
      ...prev,
      parameters: { ...prev?.parameters, targetmode: e.target.value },
    }))
  }
  sx={{ width: "250px" }}
>
  <option value="all">All</option>
  <option value="by_name">By Name</option>
  <option value="First-first">First-first</option> {/* CHANGED */}
</Select>
