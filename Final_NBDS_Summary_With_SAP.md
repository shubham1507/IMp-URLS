
# ✅ Final NBDS Architecture Summary with SAP, Rapport, Middleware, OLFM, AuroraDB, Snowflake

This document summarizes the architecture diagram integrating NBDS webservice with surrounding enterprise components like Rapport, Middleware, OLFM, SAP, AuroraDB, and Snowflake.

---

## 🧩 System Components & Interactions

### 🟦 1. Rapport Application (On-Prem)

- Sends credit application requests to **NBDS Webservice EC2** using **HTTPS API Call**
- A **bidirectional connection** exists:
  - ➡️ Rapport → NBDS: `HTTPS API Call`
  - ⬅️ NBDS → Rapport: `HTTPS response`

---

### ☁️ 2. NBDS Webservice EC2 (AWS VPC)

- Receives API calls from Rapport
- Retrieves secrets from **AWS Secrets Manager** via `HTTPS`
- Connects to **AuroraDB** via `TCP` to query/store credit information
- Uploads results/decisions to **S3 Bucket** via `HTTPS PUT`
- Sends direct reports/data to **Snowflake** using:
  - `HTTPS`
  - or `HTTPS/JDBC`

---

### 🪣 3. S3 Bucket

- Acts as a **storage gateway**
- **NBDS EC2 pushes files** to S3 via `HTTPS PUT`
- **Middleware pulls files** using `HTTPS GET` (read-only interaction)

---

### 🧠 4. Middleware

- Pulls credit decision files from **S3 Bucket**
- Sends deal booking data to **OLFM** via `HTTPS` (one-way)
- Sends processed data to **Snowflake** via `HTTPS/JDBC`
- Communicates with **SAP** over `HTTPS` (purpose may include posting to SAP financial systems)

---

### 🏛 5. OLFM

- Receives lease/loan decision files from Middleware via `HTTPS`
- OLFM is a **consumer only** (no response/data flow back)

---

### 💽 6. Aurora DB

- Backend relational database connected to **NBDS Webservice**
- Connection is **one-way** via `TCP` from NBDS EC2

---

### ❄️ 7. Snowflake

- Acts as the **central data warehouse**
- Ingests data from:
  - **NBDS EC2** (direct reports)
  - **Middleware** (aggregated pipeline)
- All interactions via **HTTPS/JDBC**

---

## 🔐 Protocol & Direction Table

| Source             | Destination       | Protocol        | Direction        |
|--------------------|------------------|------------------|------------------|
| Rapport App        | NBDS EC2          | HTTPS API Call   | Request          |
| NBDS EC2           | Rapport App       | HTTPS            | Response         |
| NBDS EC2           | Aurora DB         | TCP              | One-way          |
| NBDS EC2           | S3 Bucket         | HTTPS (PUT)      | One-way (write)  |
| NBDS EC2           | AWS Secrets Mgr   | HTTPS            | One-way          |
| Middleware         | S3 Bucket         | HTTPS (GET)      | One-way (read)   |
| Middleware         | OLFM              | HTTPS            | One-way          |
| Middleware         | Snowflake         | HTTPS/JDBC       | One-way          |
| Middleware         | SAP               | HTTPS            | One-way or Sync  |
| NBDS EC2           | Snowflake         | HTTPS/JDBC       | One-way          |

---

## ✅ Final Notes for Manager Confirmation

- This diagram is architecturally sound and represents all major components involved in the NBDS processing flow.
- Protocols like `HTTPS`, `TCP`, and `JDBC` are used with correct directional data flows.
- Middleware acts as a **gateway**, **not writing** back to S3.
- OLFM and SAP are **downstream consumer systems**.
- Snowflake serves as the **reporting/data warehouse hub**.

✅ **This diagram is ready to be referred for architecture review, security analysis, and management presentations.**
