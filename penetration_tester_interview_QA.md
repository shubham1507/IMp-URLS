# 🛡️ Penetration Tester Interview – Questions & Answers

This file contains **common questions and strong sample answers** tailored for a **Penetration Tester (Information Security)** role.

---

## 1. Core Penetration Testing & Methodology

**Q1. Walk me through your end-to-end penetration testing process.**  
✅ **Answer:**  
“My process follows PTES methodology:  
1. **Planning & Scoping** – rules of engagement.  
2. **Reconnaissance** – OSINT, Nmap, Shodan.  
3. **Scanning & Enumeration** – service/tech discovery.  
4. **Exploitation** – BurpSuite, Metasploit, manual payloads.  
5. **Post-Exploitation** – priv-esc, persistence, lateral movement.  
6. **Reporting** – CVSS scoring, risk mapping, PoC.  
7. **Remediation Support** – assist dev/ops teams.”  

**Q2. Difference between Vulnerability Assessment and Penetration Testing?**  
✅ **Answer:**  
- **VA**: Identifies vulnerabilities using automated scans, little exploitation.  
- **PT**: Actively exploits vulnerabilities to show real business risk.  

---

## 2. Web Application Security

**Q3. What are the OWASP Top 10 vulnerabilities?**  
✅ **Answer:**  
- Broken Access Control  
- Cryptographic Failures  
- Injection (SQLi, NoSQLi)  
- Insecure Design  
- Security Misconfiguration  
- Vulnerable Components (Log4Shell, Heartbleed)  
- Identification & Authentication Failures  
- Software & Data Integrity Failures  
- Security Logging Failures  
- SSRF  

**Q4. How do you test for SQL Injection?**  
✅ **Answer:**  
- Inject `' OR '1'='1--`.  
- UNION queries to extract DB schema.  
- Blind SQLi with `SLEEP(5)`.  
- Confirm by dumping schema.  

**Q5. Example of XSS attack?**  
✅ **Answer:**  
Payload: `<img src=x onerror=alert(1)>` → executes attacker JS.  

---

## 3. Infrastructure & OS Exploitation

**Q6. How do you harden a Linux server?**  
✅ **Answer:**  
- Disable root SSH login.  
- Key-based auth only.  
- Firewall rules.  
- Patch management.  
- Auditd/SELinux.  

**Q7. Windows Privilege Escalation techniques?**  
✅ **Answer:**  
- Unquoted service paths.  
- Weak registry ACLs.  
- SeImpersonatePrivilege → JuicyPotato.  
- LSASS dump with Mimikatz.  

---

## 4. Cryptography & Standards

**Q8. Explain TLS handshake.**  
✅ **Answer:**  
- ClientHello → ServerHello + certificate.  
- Key exchange (RSA/ECDHE).  
- Session key derived.  
- Secure symmetric channel established.  

**Q9. Difference between CVE, CWE, and CVSS?**  
✅ **Answer:**  
- **CVE** = unique vulnerability ID.  
- **CWE** = weakness category.  
- **CVSS** = severity score (0–10).  

---

## 5. Threat Modeling & Exploit Development

**Q10. How do you perform threat modeling?**  
✅ **Answer:**  
“I use **STRIDE** – Spoofing, Tampering, Repudiation, Info Disclosure, DoS, Elevation. Map threats to assets, assign risk, recommend mitigations.”  

**Q11. You discover a buffer overflow. Next steps?**  
✅ **Answer:**  
- Use `pattern_offset` to find EIP overwrite.  
- Craft shellcode payload.  
- Automate exploit with Python (Pwntools).  
- Validate in debugger.  

---

## 6. Governance, Risk & Compliance (GRC)

**Q12. What is PCI-DSS compliance?**  
✅ **Answer:**  
Security standard for cardholder data. Requires encryption, network segmentation, monitoring, and regular pen tests.  

---

## 7. Reporting & Communication

**Q13. How do you report SQLi in production?**  
✅ **Answer:**  
- **Executive Summary:** Critical DB dump risk.  
- **Technical Detail:** PoC request + payload.  
- **CVSS Score:** 9.8.  
- **Remediation:** Parameterized queries, WAF rules.  

**Q14. How do you handle devs who deny a bug?**  
✅ **Answer:**  
- Provide PoC evidence.  
- Show business impact.  
- Map to CWE/OWASP.  
- Suggest secure coding fix.  

---

# ✅ Quick Flashcards (One-Liners)

1. **Red Team vs Pentest:** Red = stealthy, goal-driven. Pentest = scoped vulns.  
2. **SQLi PoC:** `' OR '1'='1--`.  
3. **XSS PoC:** `<script>alert(1)</script>`.  
4. **IDOR:** Change `user_id=101 → 102`.  
5. **Linux PrivEsc:** SUID, cron jobs, sudo misconfigs.  
6. **Windows PrivEsc:** SeImpersonate, unquoted service paths.  
7. **TLS Handshake:** Hello → cert → key exchange → session key.  
8. **CVE vs CWE vs CVSS:** ID vs weakness vs score.  
9. **Crypto Pitfall:** Hardcoded keys.  
10. **SQLi Report:** Exec Summary + PoC + CVSS + fix.  

---

# 📝 STAR Stories (For Experience Questions)

### 1. SQL Injection in Banking Portal
- **Situation:** Tested login in banking portal.  
- **Task:** Check for injection flaws.  
- **Action:** Used `' OR '1'='1--`, escalated to UNION queries. Extracted schema.  
- **Result:** CVSS 9.8, urgent patch with parameterized queries.  

### 2. Windows Privilege Escalation
- **Situation:** Low-priv shell on Windows.  
- **Task:** Escalate to Domain Admin.  
- **Action:** Found SeImpersonatePrivilege, used JuicyPotato + Mimikatz.  
- **Result:** Complete domain compromise → client remediated with policy updates.  

---
