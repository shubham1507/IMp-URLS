
# ✅ Ansible Interview Questions & Answers (with Examples)

---

## 1. What is configuration management?
Configuration management ensures systems maintain a desired state using automation tools like Ansible.

**Example:**
```yaml
- name: Ensure httpd is installed and running
  hosts: webservers
  become: yes
  tasks:
    - name: Install httpd
      yum:
        name: httpd
        state: present
    - name: Start and enable httpd
      service:
        name: httpd
        state: started
        enabled: true
```

---

## 2. Do you think Ansible is better than other CM tools? Why?
Yes:
- Agentless (SSH/WinRM)
- YAML syntax is beginner-friendly
- Idempotent
- Galaxy community support

---

## 3. Ansible playbook to install `httpd`
```yaml
- name: Install Apache
  hosts: web
  become: yes
  tasks:
    - name: Install httpd
      yum:
        name: httpd
        state: present
    - name: Start httpd
      service:
        name: httpd
        state: started
        enabled: true
```

---

## 4. How has Ansible helped your org? (Scenario)
Reduced manual config time from 3 hrs to 15 mins using playbook to:
- Install monitoring agent
- Validate agent health
- Ensure consistency across 200+ servers

---

## 5. What is Ansible dynamic inventory?
Dynamic inventory fetches host list from external sources like AWS, GCP, Azure.

**Example:**
```bash
ansible-inventory -i aws_ec2.yaml --list
```

---

## 6. What is Ansible Tower and have you used it?
Yes, Tower gives:
- GUI for playbooks
- RBAC
- Job templates
- Credential management
- Approval workflows

---

## 7. How do you manage RBAC in Tower?
Use:
- Organizations
- Teams
- Roles (Admin, Execute, Use)
- Credentials scoped to roles

---

## 8. What is `ansible-galaxy`?
Tool to create or download roles:
```bash
ansible-galaxy init myrole
ansible-galaxy install geerlingguy.nginx
```

---

## 9. Structure of playbook using roles
```
roles/
└── nginx/
    ├── tasks/main.yml
    ├── handlers/main.yml
    ├── templates/nginx.conf.j2
    ├── defaults/main.yml
```
```yaml
- hosts: web
  roles:
    - nginx
```

---

## 10. What are handlers?
Tasks triggered by "notify". Used for actions like restarting services.

---

## 11. Run tasks only on Windows VMs?
Yes:
```yaml
when: ansible_os_family == "Windows"
```

---

## 12. Does Ansible support parallel execution?
Yes:
```bash
ansible-playbook -f 10 site.yml
```

---

## 13. Protocol for Windows?
**WinRM** for Windows. **SSH** for Linux.

---

## 14. Variable precedence order?
From lowest to highest:
1. Role defaults
2. Inventory vars
3. Group/host_vars
4. Play vars
5. Include/import
6. set_fact
7. Extra vars `--extra-vars`

---

## 15. How do you handle secrets?
Use **Ansible Vault**:
```bash
ansible-vault encrypt secrets.yml
```

---

## 16. Ansible for IaC?
Yes. Compared to Terraform:
- Terraform better for cloud infra
- Ansible better for config mgmt

---

## 17. Scenario-based playbook
Playbook to deploy and monitor app across 150 nodes reduced deployment from 45 to 8 mins.

---

## 18. What can Ansible improve?
- No state tracking
- Slow on large scale (SSH overhead)
- Better Windows support

---

## 19. Manual or CI/CD?
CI/CD via Jenkins → triggers playbook from Git repo.

---

## 20. CI/CD definition
- CI: Test and merge
- CD: Deploy to environments

---

## 21. Why Ansible over Chef/Salt?
- Simpler YAML
- Agentless
- Faster adoption

---

## 22. Push-based architecture?
Yes. Ansible pushes from control node to targets.

---

## 23. Pull-based vs push?
Pull = target pulls (Puppet).  
Push = controller initiates (Ansible).

---

## 24. What is inventory?
File listing target hosts.

---

## 25. Used Ansible modules?
Yes. Examples:
- `apt`, `yum`, `copy`, `file`, `user`

---

## 26. Types of modules?
- System
- Network
- Cloud
- Windows
- Utility

---

## 27. Static vs dynamic inventory
Static = local file  
Dynamic = AWS, Azure, etc.

---

## 28. IPv4 or IPv6?
Mostly IPv4 unless specified.

---

## 29. How Ansible works?
- Inventory + playbook + SSH
- Executes modules
- Returns results

---

## 30. Play vs Playbook?
Playbook = collection of plays  
Play = tasks for target group

---

## 31. What are plugins?
Extend Ansible's behavior. Types:
- Callback
- Connection
- Lookup
- Inventory

---

## 32. Used Ansible Vault?
Yes. Used to secure passwords, keys.

---

## 33. Encrypt/decrypt using Vault
```bash
ansible-vault encrypt file.yml
ansible-vault decrypt file.yml
```

---

## 34. Create encrypted file?
```bash
ansible-vault create secrets.yml
```

---

## 35. Using Ansible Tower?
Yes. Used for approvals, RBAC, GUI, audit.

---

## 36. Why use Tower?
RBAC, API access, logs, GUI for ops.

---

## 37. Who chose Tower?
DevOps + Infra + Security during review.

---

## 38. Recursive file copy?
Use `copy` or `synchronize` module.

---

## 39. `copy` vs `synchronize`?
`synchronize` = rsync = faster, better for large dirs.

---

## 40. Handling sensitive info?
Use:
- Ansible Vault
- CI/CD secrets injection

---

## 41. Handlers usage?
Triggered only on "changed" tasks.

---

## 42. Indentation & syntax?
Use 2 spaces. Avoid tabs. Validate with `--syntax-check`.

---

## 43. Editor used?
**VS Code** + Ansible plugin.

---

## 44. Nginx install playbook?
```yaml
- hosts: web
  become: yes
  tasks:
    - name: Install nginx
      apt:
        name: nginx
        state: present
```

---

## 45. Do handlers get triggered?
Only if notified and task changed.

---

## 46. How to verify playbook success?
- Task output
- `debug`, `assert`
- Manual SSH check

---

## 47. Linux or Windows remote?
Both. Linux = SSH, Windows = WinRM

---

## 48. Questions to interviewer?
Ask about automation strategy, team structure, cloud setup, Tower usage.

---

## 49. Default transport?
SSH for Linux  
WinRM for Windows

---

## 50. Workflow?
1. Inventory
2. Playbook
3. Task execution
4. Results gathered

---

## 51. Inventory types?
- Static
- Dynamic

---

## 52. Push or Pull?
Push-based (Ansible initiates)

---

## 53. Host range pattern?
```ini
[test]
test[1:99].domain.com
```

---

## 54. Can bad indentation break it?
Yes. YAML is indentation-sensitive.

---

## 55. Print even/odd hosts?
```bash
ansible test[1:99:2] -m ping  # odd
ansible test[2:100:2] -m ping # even
```

---

## 56. Find unique hosts?
```bash
ansible all --list-hosts
```

---

## 57. View facts?
```bash
ansible host1 -m setup
```

---

## 58. Config file priority?
1. /etc/ansible/ansible.cfg
2. ~/.ansible.cfg
3. ansible.cfg (cwd)
4. `ANSIBLE_CONFIG` env var

---

## 59. View module doc?
```bash
ansible-doc copy
```

---

## 60. `gather_facts: no` meaning?
Disables automatic fact gathering.

---
