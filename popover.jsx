import * as React from "react";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import MenuItem from "@mui/material/MenuItem";
import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";
import { User as UserIcon } from "@phosphor-icons/react/dist/ssr/User";
import { LockKey as LockKeyIcon } from "@phosphor-icons/react/dist/ssr/LockKey";

import { paths } from "@/paths";
import { RouterLink } from "@/components/core/link";

// Staff ID from env; fallback to known ID (change if needed)
const STAFF_ID = import.meta.env.VITE_STAFF_ID || "43226675";

const initialUser = {
  id: "",
  name: "User",
  avatar: "/assets/avatar-3.png",
  email: "",
};

// ✅ Same sign-out behavior as original code
function SignOutButton() {
  return (
    <MenuItem
      component="a"
      href="/sign-out"
      sx={{ justifyContent: "center" }}
    >
      Sign out
    </MenuItem>
  );
}

export function UserPopover({ anchorEl, onClose, open }) {
  const [user, setUser] = React.useState(initialUser);
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    let baseUrl = import.meta.env.VITE_API_GATEWAY_URL;

    if (!baseUrl) {
      console.error("[UserPopover] VITE_API_GATEWAY_URL is not set");
      return;
    }

    baseUrl = baseUrl.replace(/\/$/, "");

    if (!STAFF_ID) {
      console.error("[UserPopover] STAFF_ID is not set");
      return;
    }

    const controller = new AbortController();

    async function fetchProfile() {
      try {
        setLoading(true);

        const url = `${baseUrl}/api/v1/users/${STAFF_ID}/profile`;
        console.log("[UserPopover] Fetching profile:", url);

        const token =
          window.localStorage.getItem("access_token") ||
          window.localStorage.getItem("token");

        const headers = {
          accept: "application/json",
        };

        if (token) {
          headers["Authorization"] = `Bearer ${token}`;
        }

        const res = await fetch(url, {
          method: "GET",
          headers,
          credentials: "include",
          signal: controller.signal,
        });

        if (!res.ok) {
          console.error(
            "[UserPopover] Failed to fetch user profile",
            res.status,
            res.statusText
          );
          return;
        }

        const data = await res.json();
        console.log("[UserPopover] profile response =", data);

        setUser({
          id: data?.staff_id ?? "",
          name: data?.display_name ?? "User",
          email: data?.email ?? "",
          avatar: "/assets/avatar-3.png",
        });
      } catch (err) {
        if (err.name !== "AbortError") {
          console.error("[UserPopover] Error fetching user profile", err);
        }
      } finally {
        setLoading(false);
      }
    }

    fetchProfile();
    return () => controller.abort();
  }, []);

  const handleClose = () => {
    if (onClose) {
      onClose();
    }
  };

  return (
    <Popover
      anchorEl={anchorEl}
      anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      onClose={handleClose}
      open={open}
      slotProps={{ paper: { sx: { width: 280 } } }}
      transformOrigin={{ horizontal: "right", vertical: "top" }}
    >
      {/* 🔹 Top section: Name + Email (same design as original) */}
      <Box sx={{ p: 2 }}>
        <Typography variant="subtitle1">
          {loading ? "Loading..." : user.name}
        </Typography>
        <Typography color="text.secondary" variant="body2">
          {loading ? "" : user.email}
        </Typography>
      </Box>

      <Divider />

      {/* 🔹 Middle section: Account + Settings list (no Billing) */}
      <Box sx={{ p: 1 }}>
        <List>
          <ListItem
            component={RouterLink}
            href={paths.dashboard.profile.account}
            onClick={handleClose}
          >
            <UserIcon style={{ marginRight: 8 }} />
            Account
          </ListItem>

          <ListItem
            component={RouterLink}
            href={paths.dashboard.profile.settings}
            onClick={handleClose}
          >
            <LockKeyIcon style={{ marginRight: 8 }} />
            Settings
          </ListItem>
        </List>
      </Box>

      <Divider />

      {/* 🔹 Bottom section: centered Sign out button */}
      <Box sx={{ p: 1 }}>
        <SignOutButton />
      </Box>
    </Popover>
  );
}