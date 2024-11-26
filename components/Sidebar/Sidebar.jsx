import { NavLink } from "react-router-dom";

import "./Sidebar.css";
import { WeatherWidget } from "../WeatherWidget/WeatherWidget";

export function Sidebar({ className }) {
  return (
    <div className={`sidebar ${className}`}>
      <h2>Menu</h2>
      <ul>
        <li>
          <NavLink to="/dashboard/home">Dashboard</NavLink>
        </li>
        <li>
          <NavLink to="/dashboard/profile">Profile</NavLink>
        </li>
        <li>
          <NavLink to="/dashboard/settings">Settings</NavLink>
        </li>
      </ul>

      <WeatherWidget />
    </div>
  );
}
