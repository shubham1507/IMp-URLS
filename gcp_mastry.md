================================================================================
               GOOGLE CLOUD + DEVOPS COMPLETE CERTIFICATION SYLLABUS
================================================================================

CERTIFICATION ROADMAP
=====================

1. Associate Cloud Engineer (ACE)
        ↓
2. Professional Cloud DevOps Engineer
        ↓
3. Professional Cloud Architect (PCA)
        ↓
4. Professional Cloud Security Engineer


================================================================================
PHASE 1 — GOOGLE CLOUD ASSOCIATE CLOUD ENGINEER (ACE)
================================================================================

GOAL:
Build a strong hands-on GCP administration and operations foundation.

-------------------------------------------------------------------------------
1. CLOUD & GCP FUNDAMENTALS
-------------------------------------------------------------------------------

1.1 Cloud Computing Fundamentals
- IaaS, PaaS, SaaS
- Public, Private, Hybrid and Multi-cloud
- Regions
- Zones
- Edge locations
- High availability
- Scalability
- Elasticity
- Fault tolerance
- Disaster recovery
- Shared responsibility model

1.2 Google Cloud Architecture
- Google Cloud global infrastructure
- Regions and zones
- Projects
- Resources
- Resource hierarchy

Organization
    ↓
Folders
    ↓
Projects
    ↓
Resources

- Resource Manager
- Project IDs
- Project numbers
- Billing accounts
- Quotas and limits
- Labels
- Tags

1.3 Google Cloud Console and Tools
- Google Cloud Console
- Cloud Shell
- gcloud CLI
- gsutil
- bq CLI
- REST APIs
- Cloud SDK
- Application Default Credentials
- Client libraries


-------------------------------------------------------------------------------
2. IAM & ACCESS MANAGEMENT
-------------------------------------------------------------------------------

2.1 IAM Fundamentals
- Principals
- Roles
- Permissions
- IAM policies

2.2 IAM Roles
- Basic roles
- Predefined roles
- Custom roles

2.3 Identity Types
- Google accounts
- Google Groups
- Service accounts
- Workforce identities
- Workload identities

2.4 Service Accounts
- Creating service accounts
- Assigning roles
- Service account impersonation
- Service account keys
- Key rotation
- Avoiding long-lived keys

2.5 IAM Best Practices
- Least privilege
- Separation of duties
- Group-based access
- Service account security
- IAM troubleshooting


-------------------------------------------------------------------------------
3. GOOGLE CLOUD NETWORKING
-------------------------------------------------------------------------------

3.1 VPC Fundamentals
- Virtual Private Cloud
- Global VPC
- Subnets
- Regional subnets
- IP ranges
- CIDR
- Primary IP ranges
- Secondary IP ranges

3.2 IP Addressing
- Internal IP
- External IP
- Static IP
- Ephemeral IP

3.3 Routes
- System-generated routes
- Custom routes
- Route priority

3.4 Firewall
- VPC firewall rules
- Ingress
- Egress
- Priority
- Target tags
- Service accounts

3.5 DNS
- Cloud DNS
- Public zones
- Private zones
- DNS records

3.6 Connectivity
- VPC Peering
- Shared VPC
- Cloud VPN
- HA VPN
- Cloud Interconnect
- Cloud Router
- BGP

3.7 Internet Connectivity
- Cloud NAT
- Private Google Access
- Private Service Access

3.8 Load Balancing
- Application Load Balancer
- Network Load Balancer
- Internal vs external load balancing
- Backend services
- Health checks


-------------------------------------------------------------------------------
4. COMPUTE ENGINE
-------------------------------------------------------------------------------

4.1 VM Fundamentals
- VM instances
- Machine families
- Machine types
- CPU
- Memory
- Images

4.2 VM Storage
- Persistent Disk
- Hyperdisk
- Local SSD
- Boot disks

4.3 VM Operations
- Create
- Start
- Stop
- Reset
- Delete
- Resize

4.4 Instance Templates

4.5 Managed Instance Groups

4.6 Unmanaged Instance Groups

4.7 Autoscaling

4.8 Autohealing

4.9 Spot VMs

4.10 Startup scripts

4.11 Metadata

4.12 SSH access

4.13 OS Login


-------------------------------------------------------------------------------
5. GOOGLE KUBERNETES ENGINE — GKE
-------------------------------------------------------------------------------

5.1 Kubernetes Fundamentals
- Cluster
- Control plane
- Node
- Pod
- Deployment
- ReplicaSet
- Service
- Namespace
- ConfigMap
- Secret

5.2 GKE Architecture

5.3 Standard GKE

5.4 Autopilot GKE

5.5 Regional vs zonal clusters

5.6 Node pools

5.7 Cluster autoscaling

5.8 Horizontal Pod Autoscaling

5.9 Workload deployment

5.10 Services and ingress

5.11 GKE networking basics

5.12 GKE security basics

5.13 Workload Identity Federation for GKE

5.14 Cluster upgrades

5.15 kubectl operations

5.16 GKE troubleshooting


-------------------------------------------------------------------------------
6. SERVERLESS & APPLICATION SERVICES
-------------------------------------------------------------------------------

6.1 Cloud Run
- Services
- Containers
- Revisions
- Traffic splitting
- Autoscaling
- Authentication

6.2 Cloud Functions / Cloud Run functions

6.3 App Engine
- Standard
- Flexible

6.4 Choosing between:
- Compute Engine
- GKE
- Cloud Run
- App Engine


-------------------------------------------------------------------------------
7. STORAGE
-------------------------------------------------------------------------------

7.1 Cloud Storage

7.2 Buckets

7.3 Objects

7.4 Storage classes
- Standard
- Nearline
- Coldline
- Archive

7.5 Lifecycle management

7.6 Object versioning

7.7 Retention policies

7.8 IAM permissions

7.9 Signed URLs

7.10 Encryption


-------------------------------------------------------------------------------
8. DATABASE SERVICES
-------------------------------------------------------------------------------

8.1 Cloud SQL
- MySQL
- PostgreSQL
- SQL Server
- HA
- Backups
- Read replicas

8.2 Cloud Spanner

8.3 Firestore

8.4 Bigtable

8.5 Choosing appropriate database services


-------------------------------------------------------------------------------
9. DATA & MESSAGING
-------------------------------------------------------------------------------

9.1 BigQuery fundamentals

9.2 Datasets

9.3 Tables

9.4 Queries

9.5 Pub/Sub
- Topics
- Subscriptions
- Publishers
- Subscribers

9.6 Event-driven architectures


-------------------------------------------------------------------------------
10. MONITORING & OPERATIONS
-------------------------------------------------------------------------------

10.1 Cloud Monitoring

10.2 Cloud Logging

10.3 Metrics

10.4 Logs Explorer

10.5 Dashboards

10.6 Alerting policies

10.7 Uptime checks

10.8 Log-based metrics

10.9 Audit Logs

10.10 Error Reporting

10.11 Troubleshooting GCP resources


-------------------------------------------------------------------------------
11. BILLING & COST MANAGEMENT
-------------------------------------------------------------------------------

11.1 Billing accounts

11.2 Budgets

11.3 Billing alerts

11.4 Cost reports

11.5 Labels

11.6 Resource optimization

11.7 Committed use discounts

11.8 Cost troubleshooting


-------------------------------------------------------------------------------
12. INFRASTRUCTURE AS CODE
-------------------------------------------------------------------------------

12.1 Terraform fundamentals

12.2 Providers

12.3 Resources

12.4 Variables

12.5 Outputs

12.6 State

12.7 Remote state

12.8 Modules

12.9 GCP Terraform provider

12.10 Provision:
- VPC
- Subnets
- Firewall
- Compute Engine
- GKE
- Storage
- IAM


================================================================================
PHASE 2 — PROFESSIONAL CLOUD DEVOPS ENGINEER
================================================================================

GOAL:
Master CI/CD, GKE, automation, SRE, observability and reliable production
operations.


-------------------------------------------------------------------------------
13. DEVOPS FUNDAMENTALS
-------------------------------------------------------------------------------

13.1 DevOps principles

13.2 Agile and DevOps

13.3 CALMS

13.4 CI

13.5 Continuous Delivery

13.6 Continuous Deployment

13.7 Infrastructure as Code

13.8 GitOps

13.9 DevSecOps

13.10 Platform engineering


-------------------------------------------------------------------------------
14. SOURCE CONTROL
-------------------------------------------------------------------------------

14.1 Git fundamentals

14.2 Branching

14.3 Pull requests

14.4 Code reviews

14.5 Branch protection

14.6 Trunk-based development

14.7 GitFlow

14.8 Release strategies


-------------------------------------------------------------------------------
15. CI/CD ON GOOGLE CLOUD
-------------------------------------------------------------------------------

15.1 Cloud Build

15.2 Build triggers

15.3 cloudbuild.yaml

15.4 Build steps

15.5 Build artifacts

15.6 Substitutions

15.7 Private pools

15.8 Artifact Registry

15.9 Container image management

15.10 Vulnerability scanning

15.11 Cloud Deploy

15.12 Delivery pipelines

15.13 Targets

15.14 Releases

15.15 Rollouts

15.16 Approvals

15.17 Rollbacks


-------------------------------------------------------------------------------
16. DEPLOYMENT STRATEGIES
-------------------------------------------------------------------------------

16.1 Rolling deployment

16.2 Recreate deployment

16.3 Blue-Green deployment

16.4 Canary deployment

16.5 Traffic splitting

16.6 Progressive delivery

16.7 Feature flags

16.8 Rollback strategies


-------------------------------------------------------------------------------
17. ADVANCED GKE
-------------------------------------------------------------------------------

17.1 Production cluster architecture

17.2 Regional clusters

17.3 Private clusters

17.4 Node pools

17.5 Autoscaling

17.6 Pod disruption budgets

17.7 Resource requests

17.8 Resource limits

17.9 Affinity

17.10 Anti-affinity

17.11 Taints

17.12 Tolerations

17.13 Network policies

17.14 Ingress

17.15 Gateway API

17.16 Persistent storage

17.17 Stateful workloads

17.18 Workload Identity

17.19 RBAC

17.20 Cluster upgrades

17.21 Release channels

17.22 Backup and recovery

17.23 GKE troubleshooting


-------------------------------------------------------------------------------
18. GITOPS
-------------------------------------------------------------------------------

18.1 GitOps principles

18.2 Declarative infrastructure

18.3 Git as source of truth

18.4 Argo CD

18.5 Applications

18.6 ApplicationSets

18.7 Sync

18.8 Auto-sync

18.9 Drift detection

18.10 Rollback

18.11 Helm

18.12 Kustomize

18.13 Environment promotion


-------------------------------------------------------------------------------
19. SITE RELIABILITY ENGINEERING — SRE
-------------------------------------------------------------------------------

19.1 SRE principles

19.2 SLI

19.3 SLO

19.4 SLA

19.5 Error budgets

19.6 Reliability targets

19.7 Toil

19.8 Toil reduction

19.9 Automation

19.10 Capacity planning

19.11 Availability

19.12 Latency

19.13 Reliability

19.14 Performance


-------------------------------------------------------------------------------
20. OBSERVABILITY
-------------------------------------------------------------------------------

20.1 Metrics

20.2 Logs

20.3 Traces

20.4 Cloud Monitoring

20.5 Cloud Logging

20.6 Cloud Trace

20.7 Error Reporting

20.8 Profiler concepts

20.9 OpenTelemetry

20.10 Dashboards

20.11 Alerting

20.12 Log-based metrics

20.13 Custom metrics

20.14 Application monitoring

20.15 GKE monitoring


-------------------------------------------------------------------------------
21. INCIDENT MANAGEMENT
-------------------------------------------------------------------------------

21.1 Incident lifecycle

21.2 Detection

21.3 Alerting

21.4 Triage

21.5 Mitigation

21.6 Resolution

21.7 Root Cause Analysis

21.8 Postmortems

21.9 Blameless postmortems

21.10 MTTR

21.11 MTTD

21.12 Runbooks

21.13 Playbooks


-------------------------------------------------------------------------------
22. DEVOPS AUTOMATION
-------------------------------------------------------------------------------

22.1 Terraform

22.2 Reusable modules

22.3 Environment management

22.4 Remote state

22.5 CI/CD integration

22.6 Infrastructure pipelines

22.7 Policy validation

22.8 Automated testing

22.9 Configuration management

22.10 Secret management


================================================================================
PHASE 3 — PROFESSIONAL CLOUD ARCHITECT (PCA)
================================================================================

GOAL:
Design secure, scalable, reliable, cost-effective enterprise GCP architectures.


-------------------------------------------------------------------------------
23. ENTERPRISE CLOUD ARCHITECTURE
-------------------------------------------------------------------------------

23.1 Requirements gathering

23.2 Functional requirements

23.3 Non-functional requirements

23.4 Architecture trade-offs

23.5 Scalability

23.6 Availability

23.7 Reliability

23.8 Performance

23.9 Security

23.10 Cost optimization

23.11 Operational excellence


-------------------------------------------------------------------------------
24. GCP RESOURCE ORGANIZATION
-------------------------------------------------------------------------------

24.1 Organization

24.2 Folders

24.3 Projects

24.4 Resource hierarchy

24.5 Organization policies

24.6 IAM architecture

24.7 Billing architecture

24.8 Environment separation

DEV
TEST
UAT
PROD


-------------------------------------------------------------------------------
25. LANDING ZONE ARCHITECTURE
-------------------------------------------------------------------------------

25.1 Enterprise landing zones

25.2 Resource hierarchy

25.3 Shared VPC

25.4 Central networking

25.5 Central security

25.6 Central logging

25.7 IAM governance

25.8 Organization policies

25.9 Project provisioning

25.10 Terraform-based landing zones


-------------------------------------------------------------------------------
26. ENTERPRISE NETWORK ARCHITECTURE
-------------------------------------------------------------------------------

26.1 Shared VPC

26.2 Hub-and-spoke

26.3 VPC Peering

26.4 Cloud VPN

26.5 HA VPN

26.6 Cloud Interconnect

26.7 Dedicated Interconnect

26.8 Partner Interconnect

26.9 Cloud Router

26.10 BGP

26.11 Cloud NAT

26.12 Private Service Connect

26.13 Private Google Access

26.14 DNS architecture

26.15 Load balancing architecture


-------------------------------------------------------------------------------
27. HYBRID & MULTI-CLOUD
-------------------------------------------------------------------------------

27.1 Hybrid cloud

27.2 Multi-cloud

27.3 On-premises connectivity

27.4 VPN

27.5 Interconnect

27.6 DNS integration

27.7 Identity integration

27.8 Workload migration

27.9 Data migration

27.10 GKE multi-environment concepts


-------------------------------------------------------------------------------
28. COMPUTE ARCHITECTURE
-------------------------------------------------------------------------------

28.1 Compute Engine

28.2 Managed Instance Groups

28.3 GKE

28.4 Cloud Run

28.5 Serverless architecture

28.6 Autoscaling

28.7 Load balancing

28.8 Choosing appropriate compute platforms


-------------------------------------------------------------------------------
29. DATA ARCHITECTURE
-------------------------------------------------------------------------------

29.1 Cloud Storage

29.2 Cloud SQL

29.3 Spanner

29.4 Bigtable

29.5 Firestore

29.6 BigQuery

29.7 Pub/Sub

29.8 Dataflow concepts

29.9 Dataproc concepts

29.10 Data lifecycle

29.11 Data residency

29.12 Backup architecture


-------------------------------------------------------------------------------
30. HIGH AVAILABILITY
-------------------------------------------------------------------------------

30.1 Zonal architecture

30.2 Regional architecture

30.3 Multi-region architecture

30.4 Load balancing

30.5 Autoscaling

30.6 Database HA

30.7 GKE HA

30.8 Failure-domain design


-------------------------------------------------------------------------------
31. DISASTER RECOVERY
-------------------------------------------------------------------------------

31.1 RPO

31.2 RTO

31.3 Backup

31.4 Restore

31.5 Pilot light

31.6 Warm standby

31.7 Active-passive

31.8 Active-active

31.9 Cross-region DR

31.10 DR testing


-------------------------------------------------------------------------------
32. MIGRATION
-------------------------------------------------------------------------------

32.1 Migration assessment

32.2 Discovery

32.3 Dependency analysis

32.4 Rehost

32.5 Replatform

32.6 Refactor

32.7 Repurchase

32.8 Retire

32.9 Retain

32.10 Database migration

32.11 Application migration

32.12 Migration validation


-------------------------------------------------------------------------------
33. COST ARCHITECTURE
-------------------------------------------------------------------------------

33.1 TCO

33.2 Rightsizing

33.3 Autoscaling

33.4 Storage lifecycle

33.5 Committed use discounts

33.6 Spot VMs

33.7 Cost attribution

33.8 Budgets

33.9 Quotas

33.10 FinOps principles


================================================================================
PHASE 4 — PROFESSIONAL CLOUD SECURITY ENGINEER
================================================================================

GOAL:
Add enterprise GCP security, DevSecOps, IAM, network security, data protection,
threat detection and compliance.


-------------------------------------------------------------------------------
34. CLOUD SECURITY FUNDAMENTALS
-------------------------------------------------------------------------------

34.1 Shared responsibility

34.2 Defense in depth

34.3 Zero Trust

34.4 Least privilege

34.5 Separation of duties

34.6 Threat modeling

34.7 Risk management

34.8 Security governance


-------------------------------------------------------------------------------
35. ADVANCED IAM
-------------------------------------------------------------------------------

35.1 IAM architecture

35.2 Predefined roles

35.3 Custom roles

35.4 IAM Conditions

35.5 Service accounts

35.6 Service account impersonation

35.7 Workload Identity Federation

35.8 Workforce Identity Federation

35.9 Privileged access

35.10 Least privilege

35.11 IAM troubleshooting


-------------------------------------------------------------------------------
36. ORGANIZATION SECURITY
-------------------------------------------------------------------------------

36.1 Organization Policy Service

36.2 Policy constraints

36.3 Resource hierarchy

36.4 Security guardrails

36.5 Project isolation

36.6 Environment separation

36.7 Policy enforcement


-------------------------------------------------------------------------------
37. NETWORK SECURITY
-------------------------------------------------------------------------------

37.1 Firewall policies

37.2 Hierarchical firewall policies

37.3 VPC isolation

37.4 Private Google Access

37.5 Private Service Connect

37.6 Cloud NAT

37.7 Cloud Armor

37.8 WAF

37.9 DDoS protection

37.10 VPC Service Controls

37.11 Network segmentation

37.12 Zero-trust networking


-------------------------------------------------------------------------------
38. DATA SECURITY
-------------------------------------------------------------------------------

38.1 Encryption at rest

38.2 Encryption in transit

38.3 Google-managed encryption

38.4 Customer-managed encryption keys

38.5 Cloud KMS

38.6 Cloud HSM

38.7 Key rotation

38.8 Key lifecycle

38.9 Secret Manager

38.10 Secret rotation

38.11 Sensitive Data Protection

38.12 Data classification

38.13 Data Loss Prevention concepts


-------------------------------------------------------------------------------
39. SECURITY MONITORING
-------------------------------------------------------------------------------

39.1 Cloud Audit Logs

39.2 Admin Activity logs

39.3 Data Access logs

39.4 System Event logs

39.5 Policy Denied logs

39.6 Security Command Center

39.7 Security findings

39.8 Event Threat Detection

39.9 Vulnerability findings

39.10 Centralized logging

39.11 SIEM integration

39.12 Security alerting


-------------------------------------------------------------------------------
40. CONTAINER & GKE SECURITY
-------------------------------------------------------------------------------

40.1 GKE security architecture

40.2 Private clusters

40.3 Workload Identity

40.4 Kubernetes RBAC

40.5 NetworkPolicy

40.6 Pod security

40.7 Image security

40.8 Artifact Registry security

40.9 Vulnerability scanning

40.10 Binary Authorization

40.11 Software supply-chain security

40.12 Admission controls

40.13 Secret management


-------------------------------------------------------------------------------
41. DEVSECOPS
-------------------------------------------------------------------------------

41.1 Secure SDLC

41.2 Shift-left security

41.3 SAST

41.4 SCA

41.5 DAST

41.6 Secrets scanning

41.7 Container scanning

41.8 IaC scanning

41.9 Pipeline security

41.10 Security gates

41.11 Artifact signing

41.12 Binary Authorization

41.13 Supply-chain security

41.14 Policy as Code

41.15 Terraform security scanning


-------------------------------------------------------------------------------
42. APPLICATION & API SECURITY
-------------------------------------------------------------------------------

42.1 Application security fundamentals

42.2 API authentication

42.3 API authorization

42.4 OAuth/OIDC concepts

42.5 TLS

42.6 Certificate management

42.7 Secret management

42.8 Rate limiting

42.9 WAF protection

42.10 Cloud Armor

42.11 API exposure controls


-------------------------------------------------------------------------------
43. COMPLIANCE & GOVERNANCE
-------------------------------------------------------------------------------

43.1 Security governance

43.2 Compliance fundamentals

43.3 Audit requirements

43.4 Data residency

43.5 Data retention

43.6 Logging requirements

43.7 Access reviews

43.8 Policy enforcement

43.9 Security posture management


================================================================================
MASTER HANDS-ON PROJECT
================================================================================

PROJECT:
ENTERPRISE GCP DEVSECOPS / INTERNAL DEVELOPER PLATFORM


ARCHITECTURE
============

                    GCP ORGANIZATION
                           │
                    Organization Policy
                           │
                   ┌───────┴────────┐
                   │                │
               Folders          Central IAM
                   │
          ┌────────┼─────────┐
          │        │         │
         DEV      UAT       PROD
          │        │         │
          └────────┼─────────┘
                   │
                Shared VPC
                   │
       ┌───────────┼────────────┐
       │           │            │
   Private GKE   Cloud Run   Data Services
       │
       │
       ▼
   Kubernetes Platform
       │
   ┌───┼─────────────┐
   │   │             │
 Helm Kustomize    Argo CD
       │
       ▼
      GitOps
       ▲
       │
 GitHub / Repository
       │
       ▼
     CI Pipeline
       │
       ├── Unit Tests
       ├── SAST
       ├── SCA
       ├── Secrets Scan
       ├── IaC Scan
       ├── Container Scan
       │
       ▼
 Artifact Registry
       │
       ▼
 Binary Authorization
       │
       ▼
 Cloud Deploy / Argo CD
       │
       ▼
 DEV → UAT → PROD
       │
       ▼
 Cloud Monitoring
 Cloud Logging
 Cloud Trace
 Security Command Center
       │
       ▼
 Alerts / SLO / Incident Management


================================================================================
TOOLS TO MASTER ACROSS THE FOUR PHASES
================================================================================

GCP
---
gcloud
Cloud Shell
IAM
Compute Engine
Cloud Storage
Cloud SQL
GKE
Cloud Run
Cloud Build
Cloud Deploy
Artifact Registry
Cloud Monitoring
Cloud Logging
Cloud Trace
Cloud DNS
Cloud Load Balancing
Cloud NAT
Cloud VPN
Cloud Interconnect
Cloud Armor
Cloud KMS
Secret Manager
Security Command Center
VPC Service Controls


DEVOPS
------
Git
GitHub
Docker
Kubernetes
Terraform
Helm
Kustomize
Argo CD
CI/CD
GitOps


SRE
---
SLI
SLO
SLA
Error Budgets
Monitoring
Logging
Tracing
Alerting
Incident Management
Postmortems
Capacity Planning


DEVSECOPS
---------
SAST
SCA
DAST
Secret Scanning
Container Scanning
IaC Scanning
Policy as Code
Binary Authorization
Supply-chain Security
IAM
KMS
Secret Manager
Cloud Armor
Security Command Center


================================================================================
RECOMMENDED LEARNING ORDER
================================================================================

PHASE 1
ACE
↓
GCP Fundamentals
↓
IAM
↓
Networking
↓
Compute
↓
Storage
↓
Databases
↓
GKE
↓
Serverless
↓
Monitoring
↓
Terraform
↓
ACE EXAM


PHASE 2
Professional Cloud DevOps Engineer
↓
Git
↓
Docker
↓
Advanced Kubernetes/GKE
↓
Cloud Build
↓
Artifact Registry
↓
Cloud Deploy
↓
Terraform
↓
GitOps / Argo CD
↓
Observability
↓
SRE
↓
Incident Management
↓
DEVOPS EXAM


PHASE 3
Professional Cloud Architect
↓
Enterprise Architecture
↓
Landing Zone
↓
Networking Architecture
↓
Hybrid Connectivity
↓
Compute Architecture
↓
Data Architecture
↓
HA
↓
DR
↓
Migration
↓
Cost Optimization
↓
PCA EXAM


PHASE 4
Professional Cloud Security Engineer
↓
IAM
↓
Organization Policies
↓
Network Security
↓
Cloud Armor
↓
VPC Service Controls
↓
KMS
↓
Secret Manager
↓
Security Command Center
↓
GKE Security
↓
DevSecOps
↓
Security Monitoring
↓
Governance
↓
SECURITY ENGINEER EXAM


================================================================================
FINAL TARGET SKILL PROFILE
================================================================================

Google Cloud
+
Terraform
+
Linux
+
Git
+
Docker
+
Kubernetes / GKE
+
Helm / Kustomize
+
Argo CD / GitOps
+
Cloud Build / Cloud Deploy
+
Networking
+
IAM
+
Observability
+
SRE
+
Cloud Architecture
+
Cloud Security
+
DevSecOps


TARGET ROLES
============

Senior GCP DevOps Engineer
Senior Cloud Engineer
GCP Platform Engineer
Site Reliability Engineer
DevSecOps Engineer
Cloud Security Engineer
Cloud Platform Engineer
Platform/SRE Lead
Cloud Solutions Architect
Cloud/Platform Architect
