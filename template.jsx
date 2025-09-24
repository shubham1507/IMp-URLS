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
     description: row.description, // already added earlier
+    // NEW: flatten these so the modal receives them even if DataTable trims fields
+    platform: row.parameters?.platform,
+    clusterName: row.parameters?.clusterName,
+    resources: row.parameters?.resources, // array of { name, namespace }
     parameters: JSON.stringify(row.parameters || {}, null, 2), // keep the string too
   }));



const experimentName  = rowData?.name ?? rowData?.experiment_name ?? "N/A";
const experimentCode  = rowData?.experiment_code ?? "N/A";
const createdDatetime =
  rowData?.createdAt ??
  (rowData?.created_at ? dayjs(rowData.created_at).format("MMM D, YYYY h:mm A") : "N/A");
const description   = rowData?.description ?? "N/A";

- const platform      = params?.platform ?? "N/A";
- const clusterName   = params?.clusterName ?? "N/A";
- const resourceNames = Array.isArray(params?.resources)
-   ? params.resources.map(r => r?.name).filter(Boolean).join(", ")
-   : "N/A";

+ // Prefer flattened fields from the table row; fallback to parsed params
+ const platform    = rowData?.platform ?? params?.platform ?? "N/A";
+ const clusterName = rowData?.clusterName ?? params?.clusterName ?? "N/A";
+ const resArray    = Array.isArray(rowData?.resources) ? rowData.resources
+                    : Array.isArray(params?.resources) ? params.resources
+                    : [];
+ const resourceNames = resArray.length
+   ? resArray.map(r => r?.name).filter(Boolean).join(", ")
+   : "N/A";
