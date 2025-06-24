
# Final Human-Understandable Summary of NBDS Architecture

## 🔷 What Is This About?
We're discussing how credit adjudication requests (like lease approvals) flow securely across our **on-prem system (Rapport)**, **cloud decision engine (NBDS on AWS)**, and **external systems** for booking and reporting — such as **OLFM**, **Snowflake**, and **SnapLogic**.

---

## 🟦 1. Rapport (On-Premises) Starts the Process

- A user (usually GFS or CPQ system) initiates a **credit application** via the **Rapport web portal**.
- The request travels from:
  - **Web Server → App Server**
  - Then via **HTTPS → Middleware** (our central integration layer)
- Middleware routes the request to the cloud for processing.

---

## ☁️ 2. Middleware Forwards Request to NBDS in AWS

- Middleware sends the request to **NBDS Webservice (an EC2 instance in AWS)** over **HTTPS**.
- NBDS is responsible for evaluating:
  - Customer credit history
  - Business logic like score checks, delinquency, TCS codes, etc.

---

## 🧠 3. NBDS Processing

- NBDS pulls secure credentials from **AWS Secrets Manager**.
- It reads/writes to the **Aurora DB** using **TCP**, where credit data is stored.
- Once decision logic runs, the **approval/rejection decision** is sent back to **Middleware**, which then replies to **Rapport**.

✅ This forms a **two-way secured communication** through Middleware using **REST APIs over HTTPS**.

---

## 📂 4. NBDS Generates Files for OLFM

- After making a decision, NBDS stores **output files** (GL extracts, deal reports) into an **S3 bucket** using **HTTPS PUT**.
- **Middleware picks up these files** using scheduled jobs.
- Then it sends this data securely to **OLFM**, which books the lease deal with financial systems.

---

## 📊 5. Reporting in Snowflake

- NBDS or Middleware also sends decision data to **Snowflake** via **HTTPS or JDBC**.
- Snowflake is used by **Power BI** and other tools to create dashboards and reports for business visibility.

---

## 🔄 6. InfoLease & SnapLogic Integration

- **InfoLease** (an external vendor system) publishes **Kafka streams** containing real-time transactional data.
- These streams are picked up by **SnapLogic**, which transforms the data.
- SnapLogic then **pushes the data into Snowflake** via **HTTPS**, enabling unified analytics with NBDS data.

---

## 🔐 7. All Connections Are Secure

| Source                   | Destination              | Protocol         |
|--------------------------|--------------------------|------------------|
| Rapport App Server       | Middleware               | HTTPS            |
| Middleware               | NBDS EC2                 | HTTPS (REST API) |
| NBDS EC2                 | Aurora DB                | TCP              |
| NBDS EC2                 | S3 Bucket                | HTTPS PUT        |
| NBDS EC2                 | AWS Secrets Manager      | HTTPS            |
| Middleware               | OLFM                     | HTTPS            |
| Middleware/S3            | Snowflake                | HTTPS / JDBC     |
| InfoLease (Kafka)        | SnapLogic                | Kafka            |
| SnapLogic                | Snowflake                | HTTPS            |

---

## 🧾 Final Summary for Your Manager

> “This system securely processes lease credit applications from Rapport through Middleware to NBDS in AWS. NBDS evaluates the application using business rules, interacts with its own DB and secrets, and sends back decisions. It generates reports for OLFM to book deals, and also pushes data to Snowflake for analytics. SnapLogic brings in real-time Kafka streams from InfoLease to enhance reporting. Every step is securely integrated using HTTPS, TCP, and Kafka.”
