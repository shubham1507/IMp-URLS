import { Outlet } from "react-router-dom";

import DashboardLayout from "@/components/dashboard/layout/dashboard-layout";

// Small helper to guard admin-only routes
const guardAdmin = (loader) => {
  return async () => {
    const isPlatformAdmin =
      typeof window !== "undefined" &&
      localStorage.getItem("is_platform_admin") === "true";

    if (!isPlatformAdmin) {
      const { default: AccessDenied } = await import(
        "@/pages/dashboard/access-denied.jsx"
      );
      return { Component: AccessDenied };
    }

    const module = await loader();
    const Page = module.default;
    return { Component: Page };
  };
};

export const route = {
  path: "dashboard",
  element: (
    <DashboardLayout>
      <Outlet />
    </DashboardLayout>
  ),
  children: [
    // ────────────────────────────────────────────
    // DASHBOARD OVERVIEW  (NO ADMIN GUARD)
    // ────────────────────────────────────────────
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
    // EXPERIMENTS (ALL ACCESSIBLE TO NON-ADMIN)
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
    // SETTINGS
    // ────────────────────────────────────────────
    {
      path: "settings",
      children: [
        // ADMIN-ONLY
        {
          path: "organization",
          lazy: guardAdmin(() =>
            import("@/pages/dashboard/settings/organization")
          ),
        },
        // ADMIN-ONLY
        {
          path: "project",
          lazy: guardAdmin(() =>
            import("@/pages/dashboard/settings/project")
          ),
        },
        // ADMIN-ONLY
        {
          path: "audit",
          lazy: guardAdmin(() =>
            import("@/pages/dashboard/settings/audit")
          ),
        },
        // ADMIN-ONLY
        {
          path: "access",
          lazy: guardAdmin(() =>
            import("@/pages/dashboard/settings/access.jsx")
          ),
        },
        // ADMIN-ONLY
        {
          path: "environment",
          lazy: guardAdmin(() =>
            import("@/pages/dashboard/settings/environment.jsx")
          ),
        },

        // These are accessible to everyone
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