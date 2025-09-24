-  const parameters = JSON.parse(rowData?.parameters || "{}");
-  console.log("parameters => ", parameters);
+  // Parse parameters (string from table) into an object
+  const params =
+    typeof rowData?.parameters === "string"
+      ? safeParse(rowData.parameters)
+      : rowData?.parameters || {};
+  console.log("parameters => ", params);

+  function safeParse(s) {
+    try { return JSON.parse(s); } catch { return {}; }
+  }


- const experimentName  = rowData?.name ?? "N/A";
- const experimentCode  = rowData?.experiment_code ?? "N/A";
- const createdDatetime = rowData?.created_at
-   ? dayjs(rowData.created_at).format("MMM D, YYYY h:mm A")
-   : "N/A";
- const description     = rowData?.description ?? "N/A";
- const platform        = rowData?.parameters?.platform ?? "N/A";
- const clusterName     = rowData?.parameters?.clusterName ?? "N/A";
- const resourceNames   = Array.isArray(rowData?.resources)
-   ? rowData.resources.map(r => r?.name).filter(Boolean).join(", ")
-   : "N/A";
+ const experimentName  = rowData?.name ?? rowData?.experiment_name ?? "N/A";
+ const experimentCode  = rowData?.experiment_code ?? "N/A";
+ // accept either the already-formatted createdAt OR raw created_at
+ const createdDatetime =
+   rowData?.createdAt ??
+   (rowData?.created_at ? dayjs(rowData.created_at).format("MMM D, YYYY h:mm A") : "N/A");
+ const description     = rowData?.description ?? "N/A";
+ const platform        = params?.platform ?? "N/A";
+ const clusterName     = params?.clusterName ?? "N/A";
+ const resourceNames   = Array.isArray(params?.resources)
+   ? params.resources.map(r => r?.name).filter(Boolean).join(", ")
+   : "N/A";
