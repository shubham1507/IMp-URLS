
# ✅ Final NBDS Architecture Summary (with Middleware, OLFM, Snowflake, SnapLogic, InfoLease)

This document provides a clear and human-readable overview of how components in the NBDS architecture are interconnected, their protocol usage, and the direction of data flow.

---

## 🟦 1. Rapport On-Prem System Initiates Credit Application

- A user or front-end system submits a credit application via the **Rapport Web Server**.
- The **App Server** sends the request to **NBDS Webservice (EC2)** in the AWS cloud via a **HTTPS API Call**.

---

## ☁️ 2. NBDS Processing in AWS

- **NBDS EC2** performs:
  - Secure credential access from **AWS Secrets Manager** (HTTPS)
  - Reads/writes from **Aurora DB** using **TCP**
  - Writes decision output files to **S3 Bucket** via **HTTPS PUT**

---

## 🔁 3. Middleware Gateway Operations

- **Middleware pulls files** from the **S3 Bucket** (one-way HTTPS GET pattern).
- From there:
  - Sends lease booking data to **OLFM** via **HTTPS** (one-way)
  - Sends reporting and analytical data to **Snowflake** via **HTTPS/JDBC**

---

## 📊 4. Real-Time Data Enrichment from InfoLease

- **InfoLease**, an external vendor system, publishes Kafka streams of transactional data.
- **SnapLogic** consumes this data using **Kafka protocol**.
- SnapLogic transforms the data and **pushes it to Snowflake** via **HTTPS**.

---

## 🔐 Protocol & Direction Summary Table

| From                   | To                         | Protocol           | Direction   |
|------------------------|----------------------------|--------------------|-------------|
| Rapport Web Server     | Rapport App Server         | HTTPS              | One-way     |
| App Server             | NBDS EC2                   | HTTPS (API Call)   | Request     |
| NBDS EC2               | App Server                 | HTTPS              | Response    |
| NBDS EC2               | Aurora DB                  | TCP                | One-way     |
| NBDS EC2               | AWS Secrets Manager        | HTTPS              | One-way     |
| NBDS EC2               | S3 Bucket                  | HTTPS (PUT)        | One-way     |
| S3 Bucket              | Middleware                 | HTTPS (GET/Pull)   | One-way     |
| Middleware             | OLFM                       | HTTPS              | One-way     |
| Middleware             | Snowflake                  | HTTPS / JDBC       | One-way     |
| InfoLease              | SnapLogic                  | Kafka Stream       | One-way     |
| SnapLogic              | Snowflake                  | HTTPS              | One-way     |

---

## ✅ Final Talking Points (for Manager Call)

- NBDS handles adjudication, writes decisions to S3.
- Middleware pulls data, sends to OLFM (booking) and Snowflake (analytics).
- InfoLease streams live data to SnapLogic → SnapLogic feeds Snowflake.
- All transfers are secured via HTTPS, TCP, or Kafka.
- OLFM and InfoLease are external; Snowflake serves as our unified reporting warehouse.
