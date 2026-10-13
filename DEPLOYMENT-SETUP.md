# ChaosArmor frontend: add DEV deployment

## Status and scope

This is an integration draft, not a verified end-to-end deployment. The build,
ZIP publishing, controls, application metadata, existing parameters and
cr_minion settings are preserved from the working configuration supplied in chat.
Only deployment parameters were appended and the disabled deploy block replaced.
Keep the repository filename ci-config.yaml so the existing pipeline can find it.

The attached reference uses AAP to launch deployment playbooks. It does not show
the playbook itself. Its IDs 87014 and 31584 and credentials belong to PerformanceApi;
do not use them unless the platform owner explicitly confirms they are suitable.
This file implements DEV only. Production requires a separately approved template,
inventory, credentials and change-control configuration; the reference's production
and CR automation values were not copied into this application.

## Confirm these items with the Jenkins/AAP owner before triggering

1. Does your shared-library version support raw ZIP AAP jobs with extra_vars and
   no deploy.aap.packages block? The reference only demonstrates package_from_pom.
   If packages is mandatory, obtain its supported raw-artifact schema. Do not add
   a dummy pom.xml or invent a package_from_zip field.
2. Can aap_prod_host and prod_jenkins_credential_id be omitted for DEV-only jobs?
3. What Jenkins credential TYPE does the AAP integration expect: username/password
   or a token? Use the type expected by the installed library, not a guess.
4. Does the library wait for the AAP job to finish and fail the pipeline if the
   job fails? Verify deployment runs only after successful publication and controls.
5. Is the non-production controller URL from the reference correct for this app?
6. What is the actual published ZIP URL and archive layout? Neither is established
   by artifact_path alone. Copy the URL from a successful publish log or Nexus.

Do not treat YAML parsing as validation of the internal shared-library schema.
Even deploy_to_dev=false may not avoid eager validation of AAP placeholders.

## Connections and credentials

These are Jenkins/AAP connections, not Azure DevOps service connections.

| Location | Required connection | Action |
| --- | --- | --- |
| Jenkins | Existing SCM access and four ChaosArmor credentials in the YAML | Reuse unchanged |
| Jenkins | Frontend DEV AAP API credential | Create or reuse an approved credential; proposed ID ChaosArmorAAPDevSecret. Replace REPLACE_WITH_FRONTEND_AAP_DEV_CREDENTIAL_ID. Grant the account permission to launch/read the frontend template. Confirm credential type with library owner. |
| AAP | SCM credential for the deployment-playbook repository | Attach to an AAP Project if private SCM access requires it |
| AAP | Target machine credential | SSH for Linux or approved Windows/WinRM credential, depending on the actual server. Attach to the template; grant only required deployment privileges. |
| AAP | Nexus download credential | Provide read access to raw-alm-dev_n3p through an approved AAP credential and secure variable injection. Jenkins's ChaosArmorNexusSecret is not automatically available to AAP. |

Network paths must work from the actual execution locations: Jenkins to AAP;
AAP execution environment to target hosts; and the machine executing the download
task to Nexus. Trust corporate CA certificates. Do not disable TLS verification.

## Create or reuse a frontend AAP job template

Set up an AAP Project pointing to the deployment playbook, an inventory containing
the approved DEV host, an execution environment with required modules, and the
credentials above. Set job type to Run. Use a dedicated frontend deployment
playbook, not the Java API playbook. Replace the template_id placeholder with the
numeric ID from this job template. Enable the approved mechanism to accept the
extra variables at launch (Prompt on launch or corresponding survey inputs).

Required playbook input contract:

| Variable | Source / meaning |
| --- | --- |
| target_hosts | Jenkins target_server; must resolve to an allowed inventory host |
| nexus_artifact_Id | Jenkins package_name; capitalization matches reference |
| nexus_artifact_version | Jenkins package_version |
| nexus_repository | raw-alm-dev_n3p |
| nexus_artifact_path | com/hsbc/chaosarmor |
| nexus_artifact_url | Exact raw ZIP URL for that name/version, supplied as a Jenkins parameter |

The last three names are a proposed frontend playbook contract, not established
features of the PerformanceApi playbook. The frontend playbook must consume them.
Reject empty values, placeholder hosts, unexpected Nexus hosts/repositories, and
name/version mismatches before changing the target. Restrict target selection to
the approved inventory. Keep deployment paths and web server configuration in
approved inventory/group variables rather than arbitrary Jenkins inputs.

Environment values to define in AAP inventory/group variables after choosing the
hosting platform: site document root, staging/release directory, application URL,
web-server/site name, ownership/permissions, and retention/rollback policy.
Their variable names depend on the playbook; no implementation is supplied here
because the server OS and web server are not known.

The playbook must download the exact published ZIP using the AAP Nexus credential,
stage and extract it, verify index.html and referenced assets, deploy into the
approved web root with correct permissions, perform an HTTP check and report
failure to AAP/Jenkins. Preserve the previous release for rollback. Inspect one
actual ZIP first to determine whether index.html is at its root or under dist/.
For client-side routes, configure the chosen web server's SPA fallback. Use the
approved static server (e.g. existing IIS or Nginx), not a development server.

## Jenkins variables for the first DEV run

| Parameter | Value |
| --- | --- |
| package_name | chaos-armor-frontend-ui |
| package_version | A new unused version, e.g. 0.1.0-demo.8 only if unused |
| deploy_to_dev | true after setup and validation |
| target_server | Exact frontend DEV inventory host |
| nexus_artifact_url | Confirmed URL pattern populated for the version published by this same run |

The existing package_version default remains 0.1.0-demo.7 to preserve the baseline.
Override it at launch. The publishing filename pattern is unknown, so this draft
requires an explicit URL rather than guessing it from Maven conventions. Use the
last successful ZIP URL to establish the pattern with the platform owner; if the
URL is not predictable, first build/publish with deployment disabled, then test
that artifact directly in AAP. Do not republish an existing version just to deploy.
An automatic pipeline handoff can be added when the library's raw-artifact output
or naming contract is confirmed.

No extra Jenkins environment variables are assumed. If the frontend uses VITE_*
settings, identify the actual names in its source/environment files. Build-time
frontend values are bundled into assets: AAP variables do not rewrite them.
Never put secrets into browser-exposed configuration. Any required change to
build-time environment injection must be agreed separately to preserve this build.

## Local checks and first execution

You do not need to run the application locally to enable AAP deployment. Optional
frontend smoke test from your repository on a corporate-network workstation:

```powershell
npm ci --include=dev
npm run build
Test-Path .\dist\index.html
# Only if package.json defines a preview script:
npm run preview -- --host 127.0.0.1
```

Use your approved npm registry authentication. Never commit tokens. These checks
validate the frontend output, not Jenkins credentials, Nexus publication or AAP.

Before running the complete pipeline, the AAP owner should syntax-check the actual
playbook with its inventory and execution environment, inspect the published ZIP,
and run the template against the approved DEV host using a known artifact. Check
the application URL, assets and a deep route. Then run Jenkins with a fresh version
and deploy_to_dev=true. Confirm its AAP job ID, final successful job status, target
URL and deployed version. If deployment fails, diagnose that AAP job; do not change
the working npm/ZIP publishing configuration as a first response.

## Validation performed here

Parsed the generated YAML and the attached reference locally; checked the existing
build, controls and cr_minion blocks against the supplied baseline, checked the
new deployment parameter references, and checked that no Maven package lookup or
PerformanceApi template IDs were included. Full application build and deployment
could not be tested here: the source repository, internal shared-library schema,
AAP template/playbook, server details and corporate credentials were not supplied.
