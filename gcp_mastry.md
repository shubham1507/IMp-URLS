================================================================================
 GCP PROFESSIONAL CERTIFICATION MASTER SYLLABUS
 DevOps Engineer + Cloud Architect + Cloud Security Engineer
================================================================================

CERTIFICATIONS COVERED
----------------------
1. Google Professional Cloud DevOps Engineer
2. Google Professional Cloud Architect
3. Google Professional Cloud Security Engineer


################################################################################
# 1. PROFESSIONAL CLOUD DEVOPS ENGINEER
################################################################################

Primary Focus:
- DevOps
- CI/CD
- Infrastructure as Code
- Kubernetes
- SRE
- Observability
- Production troubleshooting
- Automation
- Reliability
- Security
- Cost optimization


===============================================================================
SECTION 1: GOOGLE CLOUD ORGANIZATION & INFRASTRUCTURE
===============================================================================

1. Google Cloud Resource Hierarchy
   - Organization
   - Folders
   - Projects
   - Resources
   - Project organization strategies
   - Environment separation
   - Dev/Test/Staging/Production
   - Shared networking
   - Shared VPC
   - Multi-project architectures
   - Application-centric resource organization
   - App Hub

2. IAM
   - IAM concepts
   - Principals
   - Roles
   - Permissions
   - Basic roles
   - Predefined roles
   - Custom roles
   - Least privilege
   - Organization-level IAM
   - Folder-level IAM
   - Project-level IAM
   - Resource-level IAM

3. Service Accounts
   - Creating service accounts
   - Managing service accounts
   - Service account permissions
   - Service account impersonation
   - Workload authentication
   - Service account security

4. Organization Policies
   - Organization Policy Service
   - Policy constraints
   - Inherited policies
   - Centralized governance

5. Infrastructure as Code
   - Terraform
   - Terraform providers
   - Resources
   - Variables
   - Outputs
   - Modules
   - State
   - Remote state
   - Infrastructure lifecycle
   - Terraform CI/CD
   - Google Cloud Foundation Toolkit
   - Config Connector
   - Helm

6. Infrastructure Automation
   - Python automation
   - Go automation
   - Shell scripting
   - gcloud CLI
   - Automated provisioning
   - Google-recommended infrastructure blueprints


===============================================================================
SECTION 2: CI/CD ARCHITECTURE
===============================================================================

1. Source Control
   - Git
   - Branching strategies
   - Pull requests
   - Code reviews
   - Git-based workflows

2. Cloud Build
   - Build configuration
   - cloudbuild.yaml
   - Build steps
   - Build triggers
   - Substitutions
   - Build environments
   - Private pools
   - Service accounts
   - Build security

3. Artifact Registry
   - Docker repositories
   - Package repositories
   - Artifact storage
   - Image tagging
   - Image versioning
   - Artifact lifecycle
   - Vulnerability scanning

4. Cloud Deploy
   - Delivery pipelines
   - Targets
   - Releases
   - Rollouts
   - Approvals
   - Promotion between environments

5. Deployment Tooling
   - Skaffold
   - Kustomize
   - Helm
   - Argo CD
   - Jenkins
   - GitOps
   - Packer

6. Hybrid/Multi-cloud CI/CD
   - GKE Enterprise
   - Hybrid deployments
   - Multi-cloud deployments
   - Third-party CI/CD integration

7. CI/CD Security
   - Pipeline IAM
   - Service account security
   - Secret protection
   - Artifact validation
   - Environment-specific permissions


===============================================================================
SECTION 3: BUILDING CI/CD PIPELINES
===============================================================================

1. Application Pipeline

   Developer
      |
      v
   Git Repository
      |
      v
   Cloud Build
      |
      +--> Unit Test
      +--> Integration Test
      +--> Security Scan
      +--> Build Container
      |
      v
   Artifact Registry
      |
      v
   Cloud Deploy
      |
      +--> Dev
      +--> QA
      +--> Staging
      +--> Production


2. Pipeline Triggers
   - Push triggers
   - Pull request triggers
   - Tag triggers
   - Manual triggers

3. Testing
   - Unit testing
   - Integration testing
   - Application testing
   - Infrastructure testing
   - Continuous testing

4. Deployment Strategies
   - Rolling deployment
   - Blue/Green deployment
   - Canary deployment
   - Traffic splitting
   - Progressive delivery
   - Rollback

5. Approval Workflows
   - Manual approvals
   - Production approval gates
   - Environment promotion

6. Infrastructure CI/CD
   - Terraform pipelines
   - terraform fmt
   - terraform validate
   - terraform plan
   - terraform apply
   - Infrastructure approval
   - GKE infrastructure deployment
   - Managed Instance Groups
   - Service Mesh configuration

7. Serverless CI/CD
   - Cloud Run
   - Functions
   - Build/deploy automation

8. Deployment Auditing
   - Cloud Audit Logs
   - Cloud Build history
   - Cloud Deploy history
   - Artifact Registry


===============================================================================
SECTION 4: SECRETS & SOFTWARE SUPPLY CHAIN SECURITY
===============================================================================

1. Secret Manager
   - Secret creation
   - Secret versions
   - IAM
   - Secret rotation
   - Application secret retrieval

2. Cloud KMS
   - Encryption keys
   - Key rings
   - Key rotation
   - IAM

3. Certificate Manager

4. Secret Injection
   - Build-time secrets
   - Runtime secrets
   - Avoiding secrets in source code

5. Artifact Security
   - Vulnerability analysis
   - Container scanning

6. Binary Authorization
   - Trusted container deployment
   - Deployment policies

7. Software Supply Chain Security
   - SLSA
   - Build provenance
   - Artifact integrity
   - Trusted builds


===============================================================================
SECTION 5: SITE RELIABILITY ENGINEERING — SRE
===============================================================================

1. SRE Fundamentals

2. Service Level Indicators — SLI
   Examples:
   - Availability
   - Latency
   - Error rate
   - Throughput

3. Service Level Objectives — SLO

   Example:
   Availability >= 99.9%

4. Service Level Agreements — SLA

5. SLI vs SLO vs SLA

6. Error Budgets

   Error Budget = 100% - SLO

   Example:

   SLO = 99.9%
   Error Budget = 0.1%

7. Reliability vs Deployment Velocity

8. Number of Nines
   - 99%
   - 99.9%
   - 99.99%
   - 99.999%

9. Service Lifecycle
   - Service onboarding
   - Launch planning
   - Deployment
   - Maintenance
   - Retirement

10. Capacity Planning
    - Quotas
    - Limits
    - Resource planning

11. Autoscaling
    - Managed Instance Groups
    - GKE
    - Cloud Run

12. Incident Mitigation
    - Traffic draining
    - Traffic redirection
    - Capacity increase
    - Rollback


===============================================================================
SECTION 6: OBSERVABILITY
===============================================================================

1. Cloud Logging
   - Log collection
   - Log analysis
   - Log Explorer
   - Structured logging

2. Cloud Audit Logs
   - Admin Activity
   - Data Access
   - System Event
   - Policy Denied

3. VPC Flow Logs

4. GKE/Application Logging

5. Log Management
   - Filters
   - Sampling
   - Exclusions
   - Retention
   - Cost optimization

6. Log Export
   - BigQuery
   - Pub/Sub
   - External SIEM

7. Sensitive Log Data
   - PII
   - PHI
   - Sensitive information handling

8. Cloud Monitoring

9. Metrics
   - System metrics
   - Application metrics
   - Network metrics
   - Custom metrics
   - Log-based metrics

10. Metrics Explorer

11. Google Cloud Managed Service for Prometheus

12. Synthetic Monitoring

13. Dashboards
    - Operational dashboards
    - SRE dashboards
    - SLO dashboards

14. Alerting
    - Alert policies
    - Threshold alerts
    - SLO alerts
    - Cost alerts
    - Notification channels


===============================================================================
SECTION 7: TROUBLESHOOTING & PERFORMANCE
===============================================================================

Troubleshoot:

- Infrastructure failures
- Application failures
- Network failures
- CI/CD failures
- Deployment failures
- Observability failures
- Performance problems
- Latency problems

Tools:

- Cloud Logging
- Cloud Monitoring
- Cloud Trace
- Error Reporting
- Application instrumentation

Performance Optimization:

- CPU
- Memory
- Network
- Scaling
- Application latency


===============================================================================
SECTION 8: COST OPTIMIZATION
===============================================================================

- Spot VMs
- Committed Use Discounts
- Sustained Use Discounts
- Network tiers
- Observability costs
- Infrastructure sizing
- Google Cloud Recommender

Recommender areas:

- Cost
- Security
- Performance
- Reliability
- Manageability


################################################################################
# 2. PROFESSIONAL CLOUD ARCHITECT
################################################################################

Primary Focus:

- Enterprise architecture
- Solution design
- Networking
- Compute
- Storage
- Databases
- Security
- HA/DR
- Migration
- Hybrid cloud
- Multi-cloud
- Cost optimization
- Reliability


===============================================================================
SECTION 1: CLOUD ARCHITECTURE DESIGN
===============================================================================

Understand:

- Business requirements
- Technical requirements
- Functional requirements
- Non-functional requirements

Architecture considerations:

- Scalability
- Availability
- Reliability
- Security
- Performance
- Maintainability
- Cost

Business considerations:

- Business use cases
- Product strategy
- ROI
- KPIs
- Build vs Buy
- Modify vs Replace
- Cost optimization


===============================================================================
SECTION 2: COMPUTE
===============================================================================

Compute Engine

- VM instances
- Machine families
- Machine types
- Custom machine types
- Images
- Disks
- Snapshots
- Instance templates
- Managed Instance Groups
- Autoscaling
- Autohealing
- Load balancing
- Spot VMs

Containers

- Docker
- Artifact Registry
- GKE

Serverless

- Cloud Run
- Functions

Choosing:

VM vs GKE vs Cloud Run vs Functions


===============================================================================
SECTION 3: GOOGLE KUBERNETES ENGINE
===============================================================================

- Kubernetes architecture
- GKE architecture
- Clusters
- Nodes
- Node pools
- Pods
- Deployments
- Services
- Ingress
- Load balancing
- Autoscaling
- Cluster Autoscaler
- HPA
- Workload Identity
- RBAC
- Network Policies
- Secrets
- Persistent storage
- Regional clusters
- GKE Enterprise


===============================================================================
SECTION 4: NETWORKING
===============================================================================

VPC

- Global VPC
- Subnets
- Regional subnets
- Routes
- Firewall rules

Shared VPC

VPC Peering

Private Google Access

Private Service Connect

Cloud NAT

Cloud Router

DNS

Load Balancing

- Global load balancing
- Regional load balancing
- Application Load Balancer
- Network Load Balancer

Hybrid Connectivity

- Cloud VPN
- HA VPN
- Cloud Interconnect
- Dedicated Interconnect
- Partner Interconnect

Hybrid architecture:

On-Prem
   |
VPN / Interconnect
   |
Google Cloud VPC


===============================================================================
SECTION 5: STORAGE
===============================================================================

Cloud Storage

Storage classes:

- Standard
- Nearline
- Coldline
- Archive

Understand:

- Lifecycle policies
- Retention policies
- Versioning
- Encryption
- IAM
- Signed URLs
- Data transfer
- Data growth planning


===============================================================================
SECTION 6: DATABASES
===============================================================================

Know when to select:

Cloud SQL
- MySQL
- PostgreSQL
- SQL Server

Cloud Spanner

Firestore

Bigtable

BigQuery

Understand:

- SQL vs NoSQL
- Relational vs non-relational
- Global scalability
- Transactions
- Analytics
- Availability
- Replication
- Backup
- DR


===============================================================================
SECTION 7: SECURITY ARCHITECTURE
===============================================================================

- IAM
- Least privilege
- Organization hierarchy
- Organization policies
- Separation of duties
- Service accounts
- KMS
- Secret Manager
- Encryption
- VPC Service Controls
- Context-Aware Access
- Auditing
- Remote access


===============================================================================
SECTION 8: HIGH AVAILABILITY & DISASTER RECOVERY
===============================================================================

Understand:

- Availability zones
- Regions
- Multi-zone
- Multi-region
- Regional architectures

HA patterns

Active/Active

Region A <------> Region B
 ACTIVE            ACTIVE


Active/Passive

Region A --------> Region B
 ACTIVE             STANDBY


DR concepts:

- RTO
- RPO
- Backup
- Restore
- Replication
- Failover
- Failback

Design for:

- Zonal failure
- Regional failure
- Application failure
- Database failure


===============================================================================
SECTION 9: MIGRATION
===============================================================================

Migration strategies

- Rehost
- Replatform
- Refactor
- Repurchase
- Retain
- Retire

Plan:

- Application migration
- VM migration
- Database migration
- Data migration
- Network migration

Hybrid migration architectures


===============================================================================
SECTION 10: DEVOPS & SDLC ARCHITECTURE
===============================================================================

- SDLC
- CI/CD
- Cloud Build
- Artifact Registry
- Cloud Deploy
- Testing
- Infrastructure as Code
- Terraform
- Deployment strategies
- Root Cause Analysis


===============================================================================
SECTION 11: BUSINESS CONTINUITY
===============================================================================

- Business continuity
- Disaster recovery
- Backup strategies
- Multi-region deployment
- Resilience testing
- Chaos engineering
- Penetration testing


===============================================================================
SECTION 12: PROGRAMMATIC GCP MANAGEMENT
===============================================================================

- Cloud Shell
- gcloud
- gsutil
- bq
- APIs
- SDKs
- Automation


===============================================================================
SECTION 13: ARCHITECT EXAM CASE STUDIES
===============================================================================

Study architecture decision-making using Google's current exam case studies,
such as:

- EHR Healthcare
- Helicopter Racing League
- Mountkirk Games
- TerramEarth

Focus on:

- Business requirements
- Technical requirements
- Existing architecture
- Migration
- Scalability
- Security
- Reliability
- Cost
- Recommended GCP services


################################################################################
# 3. PROFESSIONAL CLOUD SECURITY ENGINEER
################################################################################

Primary Focus:

- IAM
- Network security
- Data protection
- Encryption
- Security monitoring
- Threat detection
- Compliance
- Container security
- Cloud security architecture
- Software supply-chain security


===============================================================================
SECTION 1: IAM & ACCESS CONTROL
===============================================================================

IAM

- Principals
- Permissions
- Roles
- Policies

Roles

- Basic
- Predefined
- Custom

IAM hierarchy

Organization
   |
Folder
   |
Project
   |
Resource

Understand:

- Policy inheritance
- Least privilege
- Separation of duties
- IAM Conditions
- Privileged access
- Service accounts


===============================================================================
SECTION 2: SERVICE ACCOUNT SECURITY
===============================================================================

- Service accounts
- Service account IAM
- Service account impersonation
- Short-lived credentials
- Workload Identity
- Workload Identity Federation
- Avoiding service account keys
- Key rotation


===============================================================================
SECTION 3: IDENTITY
===============================================================================

- Cloud Identity
- Google Workspace integration
- Workforce Identity Federation
- Workload Identity Federation
- SSO
- Federation
- MFA
- Context-Aware Access
- Identity-Aware Proxy


===============================================================================
SECTION 4: NETWORK SECURITY
===============================================================================

VPC Security

- Firewall rules
- Hierarchical firewall policies
- Network segmentation
- Private networking
- Shared VPC

Secure connectivity

- VPN
- Interconnect
- Private Google Access
- Private Service Connect
- Cloud NAT

Boundary protection

- VPC Service Controls
- Service perimeters
- Restricted services
- Data exfiltration protection


===============================================================================
SECTION 5: WEB & EDGE SECURITY
===============================================================================

Cloud Armor

- WAF
- DDoS protection
- IP filtering
- Rate limiting
- Security policies

Load Balancer Security

TLS

Certificates

Certificate Manager


===============================================================================
SECTION 6: DATA PROTECTION
===============================================================================

Encryption at rest

Encryption in transit

Google-managed encryption keys

Customer-managed encryption keys — CMEK

Cloud KMS

- Key rings
- Keys
- Key versions
- Rotation
- IAM
- Audit

Cloud HSM

External Key Manager where applicable


===============================================================================
SECTION 7: SECRET MANAGEMENT
===============================================================================

Secret Manager

- Store secrets
- Retrieve secrets
- Secret versions
- IAM
- Rotation
- Audit

Protect:

- Passwords
- API keys
- Database credentials
- Tokens
- Certificates


===============================================================================
SECTION 8: STORAGE SECURITY
===============================================================================

Cloud Storage

- IAM
- Bucket access
- Uniform bucket-level access
- Signed URLs
- Retention policies
- Object versioning
- Encryption
- Public access prevention

Database security

- IAM
- Private IP
- TLS
- Encryption
- Backups
- Audit


===============================================================================
SECTION 9: GKE & CONTAINER SECURITY
===============================================================================

- GKE security
- Kubernetes RBAC
- IAM integration
- Workload Identity
- Network Policies
- Pod security
- Secret management
- Private clusters
- Container image security
- Vulnerability scanning

Binary Authorization

Artifact Registry security

Software supply-chain security

SLSA


===============================================================================
SECTION 10: SECURITY MONITORING
===============================================================================

Cloud Audit Logs

Cloud Logging

Cloud Monitoring

Security Command Center

Understand:

- Asset inventory
- Security findings
- Vulnerabilities
- Misconfigurations
- Threat detection
- Security posture


===============================================================================
SECTION 11: THREAT DETECTION
===============================================================================

Security Command Center

Event Threat Detection

Container Threat Detection

Detect:

- Suspicious IAM activity
- Credential misuse
- Malware
- Crypto mining
- Network attacks
- Container attacks
- Data exfiltration


===============================================================================
SECTION 12: SECURITY OPERATIONS
===============================================================================

Security lifecycle:

Prevent
   |
Detect
   |
Investigate
   |
Respond
   |
Recover

Study:

- Incident response
- Security monitoring
- Investigation
- Log analysis
- Threat detection
- Remediation
- Security automation


===============================================================================
SECTION 13: COMPLIANCE
===============================================================================

Understand cloud compliance concepts involving:

- PCI DSS
- HIPAA
- GDPR
- SOC
- ISO 27001

Know:

- Shared responsibility model
- Data residency
- Data sovereignty
- Data retention
- Audit requirements
- Regulatory requirements


===============================================================================
SECTION 14: SECURITY GOVERNANCE
===============================================================================

Organization Policies

IAM governance

Resource hierarchy

Centralized security

Security policies

Policy inheritance

Separation of duties

Least privilege


===============================================================================
SECTION 15: DEVSECOPS
===============================================================================

Secure pipeline:

Developer
   |
Git
   |
SAST / SCA / Secret Scan
   |
Cloud Build
   |
Container Scan
   |
Artifact Registry
   |
Binary Authorization
   |
Cloud Deploy
   |
GKE / Cloud Run

Understand:

- Shift-left security
- Dependency scanning
- Container scanning
- Secret scanning
- Artifact signing
- Provenance
- SLSA
- Binary Authorization
- CI/CD IAM security


===============================================================================
SECTION 16: AI WORKLOAD SECURITY
===============================================================================

The current Security Engineer scope also includes securing AI workloads.

Understand:

- AI workload identities
- IAM
- Data access
- Sensitive data
- Network isolation
- Model/API access
- Logging
- Monitoring
- Secrets
- Supply-chain security
- Least privilege


################################################################################
# COMMON SYLLABUS ACROSS ALL THREE
################################################################################

The certifications overlap significantly.

MASTER COMMON TOPICS:

1. IAM
2. Service Accounts
3. Organization / Folder / Project hierarchy
4. Organization Policies
5. VPC
6. Shared VPC
7. Firewall
8. Load Balancing
9. VPN
10. Interconnect
11. Compute Engine
12. Managed Instance Groups
13. GKE
14. Cloud Run
15. Cloud Storage
16. Cloud SQL
17. Cloud Spanner
18. BigQuery
19. Cloud Build
20. Artifact Registry
21. Cloud Deploy
22. Terraform
23. Git
24. CI/CD
25. Secret Manager
26. Cloud KMS
27. Cloud Logging
28. Cloud Monitoring
29. Cloud Audit Logs
30. Security Command Center
31. High Availability
32. Disaster Recovery
33. Autoscaling
34. Cost Optimization
35. Troubleshooting
36. SRE
37. SLI/SLO/SLA
38. Error Budgets
39. DevSecOps
40. Software Supply Chain Security


################################################################################
# DEVOPS / CLOUD / SRE ENGINEER — CONSOLIDATED LEARNING MAP
################################################################################

Instead of learning the three certifications independently, study in this
order:


PHASE 1 — GCP FOUNDATION
------------------------

GCP Resource Hierarchy
IAM
Service Accounts
Cloud Shell
gcloud
Projects
Billing
APIs
Organization Policies


PHASE 2 — NETWORKING
--------------------

VPC
Subnet
Routes
Firewall
Cloud NAT
Cloud DNS
Shared VPC
VPC Peering
Private Google Access
Private Service Connect
VPN
Interconnect
Load Balancing


PHASE 3 — COMPUTE
-----------------

Compute Engine
Instance Templates
Managed Instance Groups
Autoscaling
Autohealing
Spot VMs


PHASE 4 — STORAGE & DATABASE
----------------------------

Cloud Storage
Persistent Disk
Cloud SQL
Spanner
Firestore
Bigtable
BigQuery


PHASE 5 — CONTAINERS
--------------------

Docker
Artifact Registry
Kubernetes
GKE
RBAC
Workload Identity
Network Policies
Autoscaling
GKE Security


PHASE 6 — SERVERLESS
--------------------

Cloud Run
Functions
Event-driven architecture


PHASE 7 — TERRAFORM
-------------------

Terraform fundamentals
Providers
Resources
Variables
Outputs
State
Remote State
Modules
Workspaces
Terraform GCP Provider
Terraform CI/CD


PHASE 8 — CI/CD
---------------

Git
Cloud Build
Artifact Registry
Cloud Deploy
Jenkins
Argo CD
GitOps

Blue/Green
Canary
Rolling deployments
Traffic splitting


PHASE 9 — SECURITY
------------------

IAM
Organization Policies
Secret Manager
KMS
Cloud Armor
VPC Service Controls
IAP
Security Command Center
Audit Logs
Workload Identity
Binary Authorization


PHASE 10 — OBSERVABILITY
------------------------

Cloud Logging
Cloud Monitoring
Metrics
Prometheus
Dashboards
Alerts
Cloud Trace
Error Reporting
VPC Flow Logs


PHASE 11 — SRE
--------------

SLI
SLO
SLA
Error Budget
Availability
Latency
Capacity Planning
Incident Management
Root Cause Analysis
Postmortems
Reliability
Toil
Automation


PHASE 12 — HA & DR
------------------

Multi-zone
Regional architecture
Multi-region architecture
RTO
RPO
Backup
Replication
Failover
Disaster Recovery


PHASE 13 — DEVSECOPS
--------------------

SAST
SCA
Secret scanning
Container scanning
Artifact scanning
Binary Authorization
SLSA
Supply-chain security
Secure CI/CD


PHASE 14 — PRODUCTION TROUBLESHOOTING
-------------------------------------

Application troubleshooting
GKE troubleshooting
VM troubleshooting
Network troubleshooting
IAM troubleshooting
CI/CD troubleshooting
Performance troubleshooting
Logging/Monitoring troubleshooting


PHASE 15 — ARCHITECTURE
-----------------------

3-tier architecture
Microservices
Event-driven architecture
Hybrid cloud
Multi-cloud
Highly available architecture
Disaster recovery architecture
Secure architecture
Scalable architecture
Cost-optimized architecture


================================================================================
TARGET END STATE
================================================================================

After covering this combined syllabus, you should be capable of designing and
explaining an end-to-end environment such as:

                         USERS
                           |
                    Cloud Load Balancer
                           |
                      Cloud Armor
                           |
                  +--------+--------+
                  |                 |
              Cloud Run            GKE
                                    |
                            Microservices
                                    |
                       +------------+------------+
                       |                         |
                   Cloud SQL                  Pub/Sub
                       |
                  Cloud Storage

DEVOPS:

Developer
   |
   v
Git Repository
   |
   v
Cloud Build
   |
   +--> Tests
   +--> Security Scans
   +--> Docker Build
   |
   v
Artifact Registry
   |
   v
Binary Authorization
   |
   v
Cloud Deploy
   |
   +--> DEV
   +--> QA
   +--> STAGING
   +--> PRODUCTION


INFRASTRUCTURE:

Terraform
   |
   +--> VPC
   +--> IAM
   +--> GKE
   +--> Cloud SQL
   +--> Load Balancer
   +--> Monitoring
   +--> Security


OBSERVABILITY:

Applications
     |
     +--> Logs ------> Cloud Logging
     |
     +--> Metrics ---> Cloud Monitoring
     |
     +--> Traces ----> Cloud Trace
                         |
                         v
                    Dashboards
                         |
                         v
                       Alerts


SECURITY:

IAM
 |
 +--> Least Privilege
 +--> Workload Identity
 +--> Secret Manager
 +--> Cloud KMS
 +--> Cloud Armor
 +--> VPC Service Controls
 +--> Security Command Center
 +--> Audit Logs
 +--> Binary Authorization


SRE:

SLI
 |
 v
SLO
 |
 v
Error Budget
 |
 +---- Healthy ----> Continue deployments
 |
 +---- Exhausted --> Prioritize reliability


================================================================================
CERTIFICATION ORDER
================================================================================

Recommended:

1. Professional Cloud DevOps Engineer
             |
             v
2. Professional Cloud Architect
             |
             v
3. Professional Cloud Security Engineer


================================================================================
END OF MASTER SYLLABUS
================================================================================