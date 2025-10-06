import React, { useState } from "react";
import {
  Box,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Card,
  CardContent,
  Divider,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const roles = [
  {
    name: "Read",
    description: "Read and clone repositories. Open and comment on issues and pull requests.",
    permissions: [
      "Read and clone repositories",
      "Open and comment on issues",
      "Open and comment on pull requests",
    ],
  },
  {
    name: "Triage",
    description: "Read permissions plus manage issues and pull requests.",
    permissions: [
      "Close an issue",
      "Add or remove a label",
      "Assign or remove a user",
      "Remove an assigned user",
    ],
  },
  {
    name: "Write",
    description: "Triage permissions plus read, clone, and push to repositories.",
    permissions: [
      "Push commits to branches",
      "Manage pull requests",
      "Create or delete branches",
    ],
  },
  {
    name: "Maintain",
    description: "Write permissions plus manage issues, pull requests, and some repository settings.",
    permissions: [
      "Manage repository settings (limited)",
      "Manage issues and pull requests",
      "Manage teams and collaborators",
    ],
  },
  {
    name: "Admin",
    description: "Full access to repositories including sensitive and destructive actions.",
    permissions: [
      "Manage repository settings",
      "Delete repositories",
      "Manage access and permissions",
      "Perform all administrative actions",
    ],
  },
];

export default function TeamMemberRoles() {
  const [expanded, setExpanded] = useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom fontWeight="bold">
        Repository roles
      </Typography>

      <Typography variant="subtitle1" color="text.secondary" gutterBottom>
        Listed below are all the available roles that can be granted to members and teams in this
        organization. Expand a role to view the details of the permissions included.
      </Typography>

      <Divider sx={{ my: 3 }} />

      <Typography variant="h5" gutterBottom fontWeight="medium">
        Pre-defined roles
      </Typography>

      {roles.map((role, index) => (
        <Accordion
          key={index}
          expanded={expanded === role.name}
          onChange={handleChange(role.name)}
          sx={{ mb: 1, borderRadius: 2 }}
        >
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="h6">{role.name}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Card variant="outlined">
              <CardContent>
                <Typography variant="body1" sx={{ mb: 2 }}>
                  {role.description}
                </Typography>
                <Typography variant="subtitle2" sx={{ mb: 1 }}>
                  Permissions:
                </Typography>
                <ul>
                  {role.permissions.map((perm, i) => (
                    <li key={i}>
                      <Typography variant="body2">{perm}</Typography>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </AccordionDetails>
        </Accordion>
      ))}
    </Box>
  );
}
