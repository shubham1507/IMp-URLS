const experimentName   = rowData?.experiment_name ?? rowData?.name ?? "N/A";
 const experimentCode   = rowData?.experiment_code ?? "N/A";
 const createdDatetime  = rowData?.created_at ? dayjs(rowData.created_at).format("MMM D, YYYY h:mm A") : "N/A";
 const description      = rowData?.description ?? "N/A";
 const platform         = rowData?.parameters?.platform ?? "N/A";
 const clusterName      = rowData?.parameters?.clusterName ?? rowData?.parameters?.cluster_name ?? "N/A";
 const resourceNames    = Array.isArray(rowData?.resources)
   ? rowData.resources.map(r => r?.name).filter(Boolean).join(", ")
   : "N/A";
