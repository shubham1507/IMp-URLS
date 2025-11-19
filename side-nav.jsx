import * as React from "react";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import { useColorScheme } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import { ArrowSquareOut as ArrowSquareOutIcon } from "@phosphor-icons/react/dist/ssr/ArrowSquareOut";
import { CaretDown as CaretDownIcon } from "@phosphor-icons/react/dist/ssr/CaretDown";
import { CaretRight as CaretRightIcon } from "@phosphor-icons/react/dist/ssr/CaretRight";

import { paths } from "@/paths";
import { isNavItemActive } from "@/lib/is-nav-item-active";
import { usePathName } from "@/hooks/use-pathname";
import { RouterLink } from "@/components/core/link";
import { Logo } from "@/components/core/logo";

import { icons } from "../nav-icons";
import { WorkspacesSwitch } from "../workspaces-switch";
import { navColorStyles } from "./styles";

// …imports stay as in your reference file…

export function SideNav({ color = "evident", items = [] }) {
  const pathname = usePathName();
  const { colorScheme = "light" } = useColorScheme();

  const styles = navColorStyles[colorScheme][color];
  const logoColor = logoColors[colorScheme][color];

  return (
    <Box
      sx={{
        ...styles,
        bgcolor: "var(--SideNav-background)",
        borderRight: "var(--SideNav-border)",
        color: "var(--SideNav-color)",
        display: { xs: "none", lg: "flex" },
        flexDirection: "column",
        height: "100%",
        left: 0,
        position: "fixed",
        top: 0,
        width: "var(--SideNav-width)",
        zIndex: "var(--SideNav-zIndex)",
      }}
    >
      <Stack spacing={2} sx={{ p: 2, pt: 1, pl: 3 }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Box component={RouterLink} href={paths.home} sx={{ display: "inline-flex" }}>
            <Logo color={logoColor} height={45} width={45} />
          </Box>
          <Typography variant="h5" sx={{ pt: 0.5 }}>
            ChaosArmor
          </Typography>
        </Box>
      </Stack>

      <Box
        component="nav"
        sx={{
          flex: "1 1 auto",
          overflowY: "auto",
          p: 2,
          scrollbarWidth: "none",
          "&::-webkit-scrollbar": { display: "none" },
        }}
      >
        {renderNavGroups({ items, pathname })}
      </Box>
    </Box>
  );
}

function renderNavGroups({ items, pathname }) {
  const children = items.reduce((acc, curr) => {
    acc.push(
      <Stack component="li" key={curr.key} spacing={1.5}>
        {curr.title ? (
          <div>
            <Typography
              sx={{
                color: "var(--NavGroup-title-color)",
                fontSize: "0.875rem",
                fontWeight: 500,
              }}
            >
              {curr.title}
            </Typography>
          </div>
        ) : null}
        <div>{renderNavItems({ depth: 0, items: curr.items, pathname, groupKey: curr.key })}</div>
      </Stack>
    );

    return acc;
  }, []);

  return (
    <Stack component="ul" spacing={2} sx={{ listStyle: "none", m: 0, p: 0 }}>
      {children}
    </Stack>
  );
}

function renderNavItems({ depth = 0, items = [], pathname, groupKey }) {
  let effectiveItems = items;

  // Only filter inside SETTINGS group, and only for non-admin
  let isPlatformAdmin = true;
  if (typeof window !== "undefined") {
    isPlatformAdmin = localStorage.getItem("is_platform_admin") === "true";
  }

  if (!isPlatformAdmin && groupKey === "settings") {
    const restrictedSettingsPaths = [
      "/dashboard/settings/access",
      "/dashboard/settings/environment",
      "/dashboard/settings/organization",
      "/dashboard/settings/project",
      "/dashboard/settings/audit",
    ];

    effectiveItems = items.filter((item) => {
      if (!item?.href) return true;
      return !restrictedSettingsPaths.some((p) => item.href?.startsWith(p));
    });
  }

  const children = effectiveItems.reduce((acc, curr) => {
    const { items: childItems, key, ...item } = curr;

    const forceOpen = childItems
      ? childItems.some(
          (childItem) => childItem.href && pathname.startsWith(childItem.href)
        )
      : false;

    acc.push(
      <NavItem
        depth={depth}
        forceOpen={forceOpen}
        key={key}
        pathname={pathname}
        {...item}
      >
        {childItems
          ? renderNavItems({
              depth: depth + 1,
              pathname,
              items: childItems,
              groupKey,
            })
          : null}
      </NavItem>
    );

    return acc;
  }, []);

  return (
    <Stack
      component="ul"
      data-depth={depth}
      spacing={1}
      sx={{ listStyle: "none", m: 0, p: 0 }}
    >
      {children}
    </Stack>
  );
}

// NavItem stays exactly as in your reference file
