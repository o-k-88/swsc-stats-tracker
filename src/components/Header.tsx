import { NavLink } from "react-router-dom";
import { teams } from "../data/loadTeams";

export default function Header() {
  return (
    <header className="site-header">
      <div className="site-header__inner">
        <NavLink to="/" className="site-header__brand">
          SWSC Stats Tracker
        </NavLink>
        <nav className="site-header__nav">
          <NavLink
            to="/"
            end
            className={({ isActive }) => (isActive ? "nav-link nav-link--active" : "nav-link")}
          >
            Home
          </NavLink>
          {teams.map((team) => (
            <NavLink
              key={team.id}
              to={`/teams/${team.id}`}
              className={({ isActive }) => (isActive ? "nav-link nav-link--active" : "nav-link")}
            >
              {team.name}
            </NavLink>
          ))}
        </nav>
      </div>
    </header>
  );
}
