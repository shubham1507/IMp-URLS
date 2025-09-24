-  const formattedRows = (experiments.data || []).map((row) => ({
+  const formattedRows = (experiments.data || []).map((row) => ({
     id: row.id,
     action: row.action,
-    name: row.experiment_name,
+    name: row.name ?? row.experiment_name, // keep both just in case
     code: row.experiment_code,
     executedBy: row.executed_by_staff_id || "N/A",
     createdAt: dayjs(row.created_at).format("MMM D, YYYY h:mm A"),
     status: row.status,
     outcome: row.result?.findings?.outcome || "N/A",
+    description: row.description, // <-- ADDED
     parameters: JSON.stringify(row.parameters || {}, null, 2), // stringify params
   }));
