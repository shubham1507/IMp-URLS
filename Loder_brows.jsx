// Dynamic label for resources based on action type
let resourceLabel = "Resources (Only Names)";
if (rowData?.action === "pod_delete") {
  resourceLabel = "List of pods to be deleted";
} else if (rowData?.action === "deployment_delete") {
  resourceLabel = "List of deployments to be deleted";
} else if (rowData?.action === "replicaset_delete") {
  resourceLabel = "List of ReplicaSets to be deleted";
}
