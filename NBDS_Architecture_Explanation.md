
# NBDS Architecture – Human-Readable Explanation

## ✅ Overview
We're looking at a credit adjudication architecture that connects our on-prem system (Rapport) with cloud infrastructure (NBDS hosted in AWS), along with external reporting and data vendors. This setup evaluates lease credit applications and syncs decision and reporting data across systems.

---

## 🧱 Major Zones
1. **Rapport On-Prem Environment**
2. **AWS VPC – NBDS Environment**
3. **External Vendors & Reporting**

---

## 🟥 1. Rapport On-Prem Environment (User Access + Request Initiation)

- User accesses the Rapport application via a web interface (Web Server + App Server).
- When a credit application comes in (e.g., from SAP or CPQ), it flows from:
  - **Rapport App Server → Middleware Server** (MW-Server) over **HTTPS**
- Middleware (MW) is the integration hub for routing requests.

---

## 🌐 2. AWS VPC – NBDS Environment (Maloon Logic + Processing)

- Middleware forwards **Maloon lease requests** to **NBDS Webservice** (EC2 in AWS) via **HTTPS REST API**.

### What NBDS does:
1. **Retrieves credentials** securely from **Secrets Manager**
2. **Connects to Aurora DB** using **TCP** (via JDBC/ODBC)
3. Executes **business logic** to assess credit worthiness
4. **Stores output files** (GL Extract, Deal Summary) to **S3** via **HTTPS PUT**
5. **Sends decision result** back to Middleware → Rapport over **HTTPS Response**

---

## 🟦 3. External Vendors & Reporting

- **Middleware picks up files** from **S3** and sends to **OLFM** via **Scheduled HTTPS or SFTP**
- **NBDS data is sent to Snowflake** via **HTTPS/JDBC**
- **InfoLease pushes Kafka streams** → **SnapLogic processes** → **loads into Snowflake**
- **LexisNexis** provides data via **HTTPS API**

---

## 🔁 Protocol Summary

| From                        | To                          | Protocol                     |
|----------------------------|-----------------------------|------------------------------|
| Rapport Web Server         | Rapport App Server          | IPC / HTTP                   |
| Rapport App Server         | MW-Server                   | HTTPS                        |
| MW-Server                  | NBDS Webservice EC2         | HTTPS REST API (POST)        |
| NBDS Webservice EC2        | MW-Server                   | HTTPS Response               |
| NBDS Webservice EC2        | Aurora DB                   | TCP (JDBC/ODBC)              |
| Aurora DB                  | Secrets Manager             | Internal AWS API (HTTPS)     |
| NBDS Webservice EC2        | S3 Bucket                   | HTTPS PUT                    |
| S3 Bucket                  | Middleware                  | HTTPS GET (Scheduled)        |
| Middleware                 | OLFM                        | HTTPS or SFTP                |
| NBDS/S3                    | Snowflake                   | HTTPS / JDBC                 |
| InfoLease → SnapLogic      | Snowflake                   | Kafka → HTTPS / JDBC         |
| LexisNexis                 | Snowflake                   | HTTPS / API                  |

---

## ✅ Key Points for Management
- All connections are **secured using industry-standard protocols** (HTTPS, TCP, Kafka).
- NBDS is the **core engine for credit decisioning** of Maloon applications.
- Middleware ensures clean routing of data between on-prem and cloud.
- Output data feeds into **OLFM (deal booking)** and **Snowflake (reporting)**.
- The system ensures **compliance, modularity, and traceability**.
