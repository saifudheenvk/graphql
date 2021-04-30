import React from "react";
import Events from "../Events";
import NewEvents from "../NewEvents";
export const DashboardConfig = [
  {
    url: "/dashboard/events",
    component: () => <Events />,
  },
  {
    url: "/dashboard/newevent",
    component: () => <NewEvents />,
  },
  {
    url: "/dashboard/bookings",
    component: () => <div>Bookings</div>,
  },
];
