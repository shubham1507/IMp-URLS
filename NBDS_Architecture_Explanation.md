
# NBDS Architecture Summary (Human-Understandable Version)

The system architecture connects our **on-premises credit processing system (Rapport)** with a **cloud-based decision engine (NBDS in AWS)** and **external reporting tools** (like Snowflake and SnapLogic). It ensures real-time credit decisions and supports downstream reporting with secure, protocol-based data flows.

---

## 🟩 1. User Request Flow: From Rapport to NBDS

- The user or a system triggers a **credit application** from the **Rapport Web UI**.
- This request flows through the **App Server (Rapport)** and is forwarded directly to the **NBDS Webservice (EC2 instance in AWS)**.
- The connection is secured via **HTTPS** and acts as an **API call** carrying application details (e.g., lease amount, customer info).

---

## 🧠 2. NBDS Processing Logic

Once the NBDS EC2 receives the request:
- It retrieves secure credentials from **AWS Secrets Manager** (via HTTPS).
- It connects to an internal **Aurora DB** over **TCP** to fetch or store credit decision history.
- It runs **business logic** to evaluate the application (based on credit score, delinquency, etc.).
- After processing, it sends the **decision response** back to the Rapport App Server over **HTTPS**.

✅ This forms a **two-way REST API loop** between Rapport and NBDS.

---

## ☁️ 3. File & Reporting Output Flow

After the decision:
- NBDS generates **reports or GL extract files** and stores them in **an AWS S3 bucket** using **HTTPS PUT**.
- These files are available for **scheduled pickup** or automated downstream syncs.

---

## 📊 4. Reporting to Snowflake

- The data stored in S3 is routed to **Snowflake**, a cloud-based data warehouse.
- This transfer occurs over **secure HTTPS or JDBC protocols**.
- This enables business users to generate **Power BI reports** and monitor KPIs in real-time.

---

## 🔄 5. SnapLogic Integration for Streaming Data

- Separate from NBDS, systems like **InfoLease** push **Kafka streams** into **SnapLogic**.
- **SnapLogic** transforms and loads that data into **Snowflake** over **HTTPS**.
- This supports consolidated and up-to-date business intelligence.

---

## 🔐 6. All Connections Are Secure

| Connection                     | Protocol         |
|-------------------------------|------------------|
| Rapport Web → App Server      | HTTPS            |
| App Server → NBDS EC2         | HTTPS (API)      |
| NBDS EC2 → App Server         | HTTPS (Response) |
| NBDS EC2 → Aurora DB          | TCP              |
| NBDS EC2 → S3 Bucket          | HTTPS PUT        |
| NBDS EC2 → Secrets Manager    | HTTPS            |
| S3 → Snowflake                | HTTPS / JDBC     |
| SnapLogic → Snowflake         | HTTPS            |

All services communicate using **industry-standard encryption protocols** to maintain confidentiality and security.

---

## ✅ Summary Statement for Your Manager

> "Our architecture allows credit decisions to flow securely from the Rapport on-prem system to NBDS in AWS using REST APIs. NBDS processes the logic, interacts with its own database and secrets manager, and returns results back to Rapport. It also generates reports into S3, which then feed into Snowflake for analytics. The entire setup is securely connected over HTTPS, TCP, and JDBC, ensuring performance, traceability, and compliance."
