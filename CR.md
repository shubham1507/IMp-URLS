
# Change Management Process for DevOps SRE Team

## 1. How to Raise a Change Request (CR)

A CR should be created with the following mandatory details:

### A. CR Ownership
- CR must be raised by the individual responsible for executing the change.

### B. CR Categorization
- Ensure correct CR category (e.g., standard, emergency, normal).

### C. Short Description
- Clearly define what change is being performed.

### D. Detailed Description
Include:
- Type: Disruptive or Non-Disruptive
- Change details
- Criticality level
- Testing performed
- Implementation activities
- Service Impact
- Rollback plan

### E. Contact Information
- Include the name and contact of the CR owner.

### F. Justification
- Why the change is necessary (e.g., issue fix, enhancement, feature enablement).

### G. Implementation Plan
- Include step-by-step details with exact commands/scripts.

### H. Business and Customer Impact
- List all direct or indirect impacts.

### I. Verification Steps
- Define how success will be validated post-change.

### J. Backout Plan
- Define how to revert in case of failure.

### K. Post-Implementation Verification Plan
- Team responsible for verification and what needs to be checked.

### L. Conflict Check and Justification
- Check for overlapping tasks and justify criticality.

### M. Impacted Configuration Items (CI)
- Mention affected services, infra, etc.

### N. Change Tasks
- Include all related OJPM/Jira task references.

### O. Accurate Time Planning
- Ensure planned date/time is realistic and validated with leads.

### P. CR Schedule
- Raise the CR at least 1 week before execution (preferably on Friday).

### Q. ICE Score
- Must be calculated and must meet approval thresholds.


## 2. CR Planning (Pre-Execution)

Before the actual change:

- **a. Communication**: Email all impacted application/service teams and stakeholders.
- **b. Document the Steps**: Create detailed execution plan in Confluence or equivalent.
- **c. Review**: Get the CR reviewed in CAB.
- **d. Pre-checks**: Perform app-level prechecks, validate logs via Splunk or monitoring tools.
- **e. Validate All Steps**: Ensure every step is validated in test/staging before prod.
- **f. ECR Creation**: If CR is triggered due to application issue, raise INC or ECR accordingly.
- **g. MIM Involvement**: Engage MIM team if CR can cause impact to other teams.
- **h. Rollback Preparation**: Clearly define and verify rollback steps before CR window.
- **i. Failure Handling**:
  1. Investigate reason (e.g., pipeline, config, infra, platform, or network issue).
  2. Request help from app team or create INC/ECR if needed.
  3. Complete pending tasks in the next CR window.
  4. Conduct full end-to-end testing and health checks.
  5. Only then proceed with production.

## 3. CR Failure Handling Checklist

If the CR fails:
1. Immediately notify lead.
2. Document failure reason with RCA.
3. Create follow-up tasks in JIRA or OJPM.
4. Update stakeholders with resolution timeline.

## 4. CR Validation & Approval Criteria

- Clear description and justification
- Verified test results
- Rollback tested
- No schedule conflicts
- ICE score is acceptable
- End-to-end plan reviewed and approved
