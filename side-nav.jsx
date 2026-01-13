Hi Team,

I am facing an issue while authenticating Google Cloud SDK (gcloud) using a service account from my office network.

Issue Summary

When running the below command:

gcloud auth activate-service-account --key-file=<service-account>.json

The authentication fails with the following error:

Tunnel connection failed: 403 Forbidden
X-Squid-Error: ERR_ACCESS_DENIED

Technical Details

- Proxy: Squid (port 3128)
- Proxy authentication is successful
- HTTPS CONNECT request to Google OAuth endpoint is being blocked by proxy policy

Verified using curl:

CONNECT oauth2.googleapis.com:443
HTTP/1.1 403 Forbidden
X-Squid-Error: ERR_ACCESS_DENIED

Required Action

To enable Google Cloud authentication, please allow HTTPS CONNECT (TCP 443) access to the following domains:

- oauth2.googleapis.com
- accounts.google.com
- www.googleapis.com

These endpoints are mandatory for OAuth token exchange used by Google Cloud SDK, Terraform, kubectl (GKE), and CI/CD integrations.

Business Impact

Due to this restriction, it is currently not possible to:

- Authenticate service accounts
- Access GCP APIs via gcloud
- Use GKE / Terraform / automated deployments from the corporate network

Please let me know if you need any additional details from my side.

Thanks & Regards,
Shubham Joshi
Senior Software Engineer (DevOps)