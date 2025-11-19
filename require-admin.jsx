// src/components/auth/require-admin.jsx
import React from "react";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";

/**
 * <RequireAdmin>
 *   <YourProtectedPage />
 * </RequireAdmin>
 *
 * This component is responsible for:
 *  - Fetching /auth/me
 *  - Reading claims.is_platform_admin
 *  - Showing "You don't have access" for non-admin users
 */
export function RequireAdmin({ children }) {
    const [loading, setLoading] = React.useState(true);
    const [isAdmin, setIsAdmin] = React.useState(false);

    React.useEffect(() => {
        let isMounted = true;

        async function loadUser() {
            try {
                const res = await fetch("/auth/me", {
                    credentials: "include",
                });

                if (!res.ok) {
                    throw new Error("Failed to load /auth/me");
                }

                const data = await res.json();

                if (!isMounted) return;

                const platformAdmin = Boolean(data?.claims?.is_platform_admin);
                setIsAdmin(platformAdmin);
            } catch (error) {
                // On error we assume non-admin to be safe
                if (isMounted) {
                    setIsAdmin(false);
                }
            } finally {
                if (isMounted) {
                    setLoading(false);
                }
            }
        }

        loadUser();

        return () => {
            isMounted = false;
        };
    }, []);

    if (loading) {
        // Simple full-page-ish loader while we decide access
        return (
            <Box
                sx={{
                    minHeight: "60vh",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                }}
            >
                <CircularProgress />
            </Box>
        );
    }

    if (!isAdmin) {
        // Non-admin: show "no access" page
        return (
            <Box sx={{ p: 4 }}>
                <Typography variant="h4" gutterBottom>
                    You don&apos;t have access
                </Typography>
                <Typography variant="body1" color="text.secondary">
                    This section is restricted to organization administrators. If you believe this is
                    a mistake, please contact your ChaosArmor admin.
                </Typography>
            </Box>
        );
    }

    // Admin: render the protected content
    return <>{children}</>;
}
