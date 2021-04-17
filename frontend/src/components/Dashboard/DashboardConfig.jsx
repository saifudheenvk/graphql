import React from "react";
import Events from "../Events";
export const DashboardConfig = [
  {
    url: "/dashboard/events",
    component: () => <Events />,
  },
  {
    url: "/dashboard/newevent",
    component: () => <div>New Events</div>,
  },
  {
    url: "/dashboard/bookings",
    component: () => <div>Bookings</div>,
  },
];
