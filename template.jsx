{
  path: "settings",
  children: [
    {
      path: "general",
      lazy: async () => {
        const { default: GeneralPage } = await import("@components/dashboard/settings/general/General");
        return { Component: GeneralPage };
      }
    },
    {
      path: "notifications",
      lazy: async () => {
        const { default: NotificationsPage } = await import("@components/dashboard/settings/notifications/Notifications");
        return { Component: NotificationsPage };
      }
    },
    {
      path: "access",   // 🔥 NEW route
      lazy: async () => {
        const { default: AccessPage } = await import("@components/dashboard/settings/access/Access");
        return { Component: AccessPage };
      }
    }
  ]
}
