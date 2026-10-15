# Chaos-Armor Frontend UI — CI/CD Implementation

## 1. Overview

The Chaos-Armor Frontend UI pipeline automates dependency installation, application compilation, code quality analysis, security checks, and artifact publication to the internal Nexus repository.

**Current scope:** This page documents the Continuous Integration (CI) implementation through artifact publication. Deployment to a target environment (CD) is not covered by the supplied configuration.

## 2. Application Details

| Property                 | Value                     |
| ------------------------ | ------------------------- |
| EIM                      | `11092881`                |
| Application name         | `chaos-armor-frontend-ui` |
| Application version      | `0.1.0`                   |
| Default artifact version | `0.1.0-demo.7`            |
| Build metadata           | Enabled                   |
| Log tracing              | Disabled                  |
| Build output directory   | `./dist`                  |

The application version and published artifact version are configured separately.

## 3. Build Parameters

| Parameter         | Default value             | Purpose                                    |
| ----------------- | ------------------------- | ------------------------------------------ |
| `package_name`    | `chaos-armor-frontend-ui` | Name of the published frontend artifact    |
| `package_version` | `0.1.0-demo.7`            | Version assigned to the published artifact |

Increment `package_version` for each published build to keep releases identifiable and avoid duplicate publication or overwriting, depending on repository policy.

## 4. Build Environment and Prerequisites

The Jenkins build uses Node.js from:

```text
/usr/lib/nodejs/24.18.0
```

Build configuration:

```yaml
build:
  enabled: true
  override_build_order: true
```

The application build is enabled, and the configured build order takes precedence over the pipeline’s default order.

Before running the pipeline, ensure that:

* The source repository contains `package.json` and `package-lock.json`.
* The `build` script in `package.json` generates frontend assets under `./dist`.
* The Jenkins agent can access the source repository, Nexus, and scanning services.
* The required Jenkins credentials are available to the job.
* Sonatype IQ application `11092881_chaos-arm-dev-ui` exists under the configured organisation.

## 5. Pipeline Stages

### Stage 1 — Source Checkout and Runtime Preparation

The pipeline checks out the application source code into the Jenkins workspace and selects the configured Node.js runtime.

**Expected result:** The source code and required package files are available for dependency installation.

### Stage 2 — npm Registry Authentication

The pipeline configures the internal Nexus npm group repository:

```text
https://npm.systems.uk.hsbc:8081/nexus/repository/npm-group/
```

Authentication uses the Jenkins credential:

```text
ChaosArmorNexusSecret
```

This registry provides the npm dependencies required by the application.

### Stage 3 — Dependency Installation

The pipeline runs:

```bash
npm ci --include=dev
```

This installs dependencies using `package-lock.json`, including development dependencies required for the frontend build.

**Expected result:** Dependency installation completes successfully using the configured internal registry.

### Stage 4 — Frontend Build

The pipeline runs:

```bash
npm run build
```

This executes the application’s build script from `package.json`.

**Expected result:** Compiled frontend assets are generated under:

```text
./dist
```

### Stage 5 — SonarQube Analysis

SonarQube analysis is enabled:

```yaml
sonarqube:
  enabled: true
```

Authentication uses:

```text
ChaosArmorSonarQubeSecret
```

The analysis assesses source code for bugs, code smells, duplication, maintainability concerns, and potential security issues.

**Validation:** Review the analysis results and quality gate status. Whether a failed quality gate blocks publication depends on the shared pipeline implementation and configured enforcement.

### Stage 6 — Sonatype IQ Dependency Checks

Sonatype IQ checks are enabled:

```yaml
sonatype_iq:
  enabled: true
```

| Setting            | Value                        |
| ------------------ | ---------------------------- |
| Jenkins credential | `ChaosArmorSonatypeIQSecret` |
| Organisation       | `Unclaimed IQ Application`   |
| IQ application     | `11092881_chaos-arm-dev-ui`  |

Sonatype IQ evaluates third-party dependencies for known security vulnerabilities and licensing or policy risks.

**Validation:** Review the evaluation report and applicable policy violations.

### Stage 7 — CyberFlows Security Checks

CyberFlows uses the following settings:

| Setting            | Value                        |
| ------------------ | ---------------------------- |
| Jenkins credential | `ChaosArmorCyberFlowsSecret` |
| Timeout            | 120 seconds                  |
| SAST               | Enabled                      |
| DAST               | Disabled                     |
| Container scanning | Disabled                     |

The enabled SAST check analyses application source code for potential security vulnerabilities.

**Validation:** Review the scan result. Scan failure and timeout handling depend on the pipeline’s configured enforcement.

### Stage 8 — Artifact Packaging

The pipeline selects the frontend build output from:

```text
./dist
```

The inclusion pattern is:

```yaml
include:
  - '**'
```

All files and subdirectories under `./dist` are selected for ZIP packaging.

**Expected result:** The package contains the compiled frontend assets.

### Stage 9 — Nexus Publication

The packaged frontend artifact is published to the Nexus raw repository:

```text
raw-alm-dev_n3p
```

Authentication uses:

```text
ChaosArmorNexusSecret
```

| Artifact property | Value                     |
| ----------------- | ------------------------- |
| Base path         | `com/hsbc/chaosarmor`     |
| Name              | `chaos-armor-frontend-ui` |
| Version           | `0.1.0-demo.7`            |
| Source directory  | `./dist`                  |

The logical publication directory is:

```text
com/hsbc/chaosarmor/chaos-armor-frontend-ui/0.1.0-demo.7/
```

The exact ZIP filename and final download URL should be verified in the Jenkins publication logs or Nexus. They are not specified in the supplied configuration.

## 6. Publication Configuration

```yaml
zip:
  nexus:
    jenkins_credential_id: 'ChaosArmorNexusSecret'
    repository: 'raw-alm-dev_n3p'

  artifacts:
    - artifact_path: 'com/hsbc/chaosarmor'
      artifact_name: '$params.package_name'
      artifact_version: '$params.package_version'
      source_path: './dist'
      include:
        - '**'
```

This is the artifact publication section, rather than the complete pipeline configuration.

## 7. Jenkins Credentials

| Credential ID                | Usage                                                  |
| ---------------------------- | ------------------------------------------------------ |
| `ChaosArmorNexusSecret`      | npm dependency download and Nexus artifact publication |
| `ChaosArmorSonarQubeSecret`  | SonarQube authentication                               |
| `ChaosArmorSonatypeIQSecret` | Sonatype IQ authentication                             |
| `ChaosArmorCyberFlowsSecret` | CyberFlows SAST authentication                         |

Credentials are referenced by ID. Secret values must remain managed in Jenkins and must not be committed to source control or printed in build logs.

## 8. Execution Sequence

The intended execution sequence is:

1. Check out the application source code.
2. Select Node.js `24.18.0`.
3. Configure and authenticate to the Nexus npm registry.
4. Install dependencies using `npm ci --include=dev`.
5. Build the application using `npm run build`.
6. Run SonarQube analysis.
7. Run Sonatype IQ dependency checks.
8. Run CyberFlows SAST.
9. Package all generated files under `./dist`.
10. Publish the versioned package to Nexus.

The actual stage order and blocking behaviour should be confirmed against the shared pipeline implementation and Jenkins build logs.

## 9. Build Verification

| Area            | Verification                                                     |
| --------------- | ---------------------------------------------------------------- |
| Source checkout | Correct repository and revision checked out                      |
| Dependencies    | `npm ci --include=dev` completes successfully                    |
| Build           | `npm run build` completes and `./dist` contains generated assets |
| SonarQube       | Analysis report and quality gate status reviewed                 |
| Sonatype IQ     | Evaluation report and policy results reviewed                    |
| CyberFlows      | SAST result reviewed                                             |
| Packaging       | ZIP contains the expected frontend assets                        |
| Publication     | Versioned artifact is available in `raw-alm-dev_n3p`             |

A published artifact confirms that the build output has been stored in Nexus. Deployment and runtime validation require a separate CD process.

## 10. Troubleshooting

| Failure                         | Initial checks                                                                   |
| ------------------------------- | -------------------------------------------------------------------------------- |
| npm authentication failure      | Verify `ChaosArmorNexusSecret`, registry URL, and repository permissions         |
| Dependency installation failure | Check lockfile consistency, package availability, and Jenkins agent connectivity |
| Frontend build failure          | Review build logs, the `build` script, and required build-time configuration     |
| SonarQube failure               | Check credentials, connectivity, analysis settings, and quality gate results     |
| Sonatype IQ failure             | Check credentials, organisation, IQ application ID, and policy violations        |
| CyberFlows failure or timeout   | Review credentials, connectivity, scan logs, and the configured timeout          |
| Missing build output            | Confirm the application generates assets under `./dist`                          |
| Nexus publication failure       | Check repository permissions, destination path, and duplicate version policy     |

## 11. Final Deliverable and CD Scope

The CI pipeline produces a versioned frontend package with the following identity:

```text
Repository: raw-alm-dev_n3p
Base path:  com/hsbc/chaosarmor
Name:       chaos-armor-frontend-ui
Version:    0.1.0-demo.7
Source:     ./dist
```

To complete the CD documentation, add the target environment, artifact retrieval method, deployment automation, runtime configuration, approval process, health checks, and rollback procedure once those details are confirmed.
