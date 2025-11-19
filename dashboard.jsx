import { Outlet } from "react-router-dom";

import DashboardLayout from "@/components/dashboard/layout/dashboard-layout";

export const route = {
  path: "dashboard",
  element: (
    <DashboardLayout>
      <Outlet />
    </DashboardLayout>
  ),
  children: [
    {
      index: true,
      lazy: async () => {
        const { default: DashboardPage } = await import(
          "@/pages/dashboard/dashboard-page"
        );
        return { Component: DashboardPage };
      },
    },

    // ────────────────────────────────────────────
    // EXPERIMENTS (NO ADMIN GUARD HERE)
    // ────────────────────────────────────────────
    {
      path: "experiments",
      children: [
        {
          path: "browse",
          lazy: async () => {
            const { default: ExperimentsBrowsePage } = await import(
              "@/pages/dashboard/experiments/browse"
            );
            return { Component: ExperimentsBrowsePage };
          },
        },
        {
          path: "create",
          lazy: async () => {
            const { default: ExperimentsCreatePage } = await import(
              "@/pages/dashboard/experiments/create"
            );
            return { Component: ExperimentsCreatePage };
          },
        },
        {
          path: "execute",
          lazy: async () => {
            const { default: ExperimentsExecutePage } = await import(
              "@/pages/dashboard/experiments/execute"
            );
            return { Component: ExperimentsExecutePage };
          },
        },
        {
          path: "status",
          children: [
            {
              index: true,
              lazy: async () => {
                const { default: ExperimentStatusPage } = await import(
                  "@/pages/dashboard/experiments/status"
                );
                return { Component: ExperimentStatusPage };
              },
            },
            {
              path: ":experimentId",
              lazy: async () => {
                const { default: ExperimentStatusPage } = await import(
                  "@/pages/dashboard/experiments/status"
                );
                return { Component: ExperimentStatusPage };
              },
            },
          ],
        },
      ],
    },

    // ────────────────────────────────────────────
    // SETTINGS (ADMIN-GUARDED ROUTES ONLY)
    // ────────────────────────────────────────────
    {
      path: "settings",
      children: [
        {
          path: "organization",
          lazy: async () => {
            const isPlatformAdmin =
              typeof window !== "undefined" &&
              localStorage.getItem("is_platform_admin") === "true";

            if (!isPlatformAdmin) {
              const { default: AccessDenied } = await import(
                "@/pages/dashboard/access-denied.jsx"
              );
              return { Component: AccessDenied };
            }

            const { default: SettingsOrganizationPage } = await import(
              "@/pages/dashboard/settings/organization"
            );
            return { Component: SettingsOrganizationPage };
          },
        },
        {
          path: "project",
          lazy: async () => {
            const isPlatformAdmin =
              typeof window !== "undefined" &&
              localStorage.getItem("is_platform_admin") === "true";

            if (!isPlatformAdmin) {
              const { default: AccessDenied } = await import(
                "@/pages/dashboard/access-denied.jsx"
              );
              return { Component: AccessDenied };
            }

            const { default: SettingsProjectPage } = await import(
              "@/pages/dashboard/settings/project"
            );
            return { Component: SettingsProjectPage };
          },
        },
        {
          path: "audit",
          lazy: async () => {
            const isPlatformAdmin =
              typeof window !== "undefined" &&
              localStorage.getItem("is_platform_admin") === "true";

            if (!isPlatformAdmin) {
              const { default: AccessDenied } = await import(
                "@/pages/dashboard/access-denied.jsx"
              );
              return { Component: AccessDenied };
            }

            const { default: AuditPage } = await import(
              "@/pages/dashboard/settings/audit"
            );
            return { Component: AuditPage };
          },
        },
        {
          path: "access",
          lazy: async () => {
            const isPlatformAdmin =
              typeof window !== "undefined" &&
              localStorage.getItem("is_platform_admin") === "true";

            if (!isPlatformAdmin) {
              const { default: AccessDenied } = await import(
                "@/pages/dashboard/access-denied.jsx"
              );
              return { Component: AccessDenied };
            }

            const { default: AccessPage } = await import(
              "@/pages/dashboard/settings/access.jsx"
            );
            return { Component: AccessPage };
          },
        },
        {
          path: "environment",
          lazy: async () => {
            const isPlatformAdmin =
              typeof window !== "undefined" &&
              localStorage.getItem("is_platform_admin") === "true";

            if (!isPlatformAdmin) {
              const { default: AccessDenied } = await import(
                "@/pages/dashboard/access-denied.jsx"
              );
              return { Component: AccessDenied };
            }

            const { default: EnvironmentPage } = await import(
              "@/pages/dashboard/settings/environment.jsx"
            );
            return { Component: EnvironmentPage };
          },
        },
        {
          path: "team-and-member-role",
          lazy: async () => {
            const { default: TeamAndMemberRolePage } = await import(
              "@/pages/dashboard/settings/team_and_member_role.jsx"
            );
            return { Component: TeamAndMemberRolePage };
          },
        },
        {
          path: "notification",
          lazy: async () => {
            const { default: Notification } = await import(
              "@/pages/dashboard/settings/notification"
            );
            return { Component: Notification };
          },
        },
        {
          path: "general",
          lazy: async () => {
            const { default: General } = await import(
              "@/pages/dashboard/settings/general"
            );
            return { Component: General };
          },
        },
      ],
    },
  ],
};
