import { lazy } from "react";
import { Outlet } from "react-router-dom";

import { DashboardLayout } from "@/components/dashboard/layout/dashboard-layout";

// NOTE: removed unused import of Environment to keep file clean
// import Environment from "../pages/dashboard/settings/environment";

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
                const { DashboardPage } = await import("@/pages/dashboard/dashboard-page");
                return { Component: DashboardPage };
            },
        },
        {
            path: "experiments",
            children: [
                {
                    path: "browse",
                    lazy: async () => {
                        const { ExperimentsBrowsePage } = await import(
                            "@/pages/dashboard/experiments/browse"
                        );
                        return { Component: ExperimentsBrowsePage };
                    },
                },
                {
                    path: "create",
                    lazy: async () => {
                        const { ExperimentsCreatePage } = await import(
                            "@/pages/dashboard/experiments/create"
                        );
                        return { Component: ExperimentsCreatePage };
                    },
                },
                {
                    path: "execute",
                    lazy: async () => {
                        const { ExperimentsExecutePage } = await import(
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
                                const { ExperimentStatusPage } = await import(
                                    "@/pages/dashboard/experiments/status"
                                );
                                return { Component: ExperimentStatusPage };
                            },
                        },
                        {
                            path: ":experimentId",
                            lazy: async () => {
                                const { ExperimentStatusPage } = await import(
                                    "@/pages/dashboard/experiments/status"
                                );
                                return { Component: ExperimentStatusPage };
                            },
                        },
                    ],
                },
            ],
        },

        {
            path: "settings",
            children: [
                // ORGANIZATION (admin-only)
                {
                    path: "organization",
                    lazy: async () => {
                        const [{ SettingsOrganizationPage }, { RequireAdmin }] = await Promise.all([
                            import("@/pages/dashboard/settings/organization"),
                            import("@/components/auth/require-admin"),
                        ]);

                        // We wrap the real page with <RequireAdmin> so non-admins
                        // see the "You don't have access" screen.
                        const Component = () => (
                            <RequireAdmin>
                                <SettingsOrganizationPage />
                            </RequireAdmin>
                        );

                        return { Component };
                    },
                },

                // PROJECT (admin-only)
                {
                    path: "project",
                    lazy: async () => {
                        const [{ SettingsProjectPage }, { RequireAdmin }] = await Promise.all([
                            import("@/pages/dashboard/settings/project"),
                            import("@/components/auth/require-admin"),
                        ]);

                        const Component = () => (
                            <RequireAdmin>
                                <SettingsProjectPage />
                            </RequireAdmin>
                        );

                        return { Component };
                    },
                },

                // AUDIT (admin-only)
                {
                    path: "audit",
                    lazy: async () => {
                        const [{ AuditPage }, { RequireAdmin }] = await Promise.all([
                            import("@/pages/dashboard/settings/audit"),
                            import("@/components/auth/require-admin"),
                        ]);

                        const Component = () => (
                            <RequireAdmin>
                                <AuditPage />
                            </RequireAdmin>
                        );

                        return { Component };
                    },
                },

                // ACCESS (admin-only)
                {
                    path: "access",
                    lazy: async () => {
                        const [{ default: AccessPage }, { RequireAdmin }] = await Promise.all([
                            import("@/pages/dashboard/settings/access.jsx"),
                            import("@/components/auth/require-admin"),
                        ]);

                        const Component = () => (
                            <RequireAdmin>
                                <AccessPage />
                            </RequireAdmin>
                        );

                        return { Component };
                    },
                },

                // ENVIRONMENT (admin-only)
                {
                    path: "environment",
                    lazy: async () => {
                        const [{ default: EnvironmentPage }, { RequireAdmin }] = await Promise.all([
                            import("@/pages/dashboard/settings/environment.jsx"),
                            import("@/components/auth/require-admin"),
                        ]);

                        const Component = () => (
                            <RequireAdmin>
                                <EnvironmentPage />
                            </RequireAdmin>
                        );

                        return { Component };
                    },
                },

                // MEMBER ROLES – you didn’t mention this in the restriction list,
                // so leaving it open. You can wrap it in RequireAdmin as well
                // if needed.
                {
                    path: "team_and_member_role",
                    lazy: async () => {
                        const { default: TeamandMemberRolePage } = await import(
                            "@/pages/dashboard/settings/team_and_member_role.jsx"
                        );
                        return { Component: TeamandMemberRolePage };
                    },
                },

                // Notifications – left open
                {
                    path: "notification",
                    lazy: async () => {
                        const { default: Notification } = await import(
                            "@/pages/dashboard/settings/notification"
                        );
                        return { Component: Notification };
                    },
                },

                // General – left open
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
