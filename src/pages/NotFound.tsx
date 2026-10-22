import { Link } from "react-router-dom";
import { teams } from "../data/loadTeams";

export default function NotFound() {
  return (
    <div className="page not-found">
      <section className="hero">
        <span className="hero__kicker">404 · Out of bounds</span>
        <h1>
          That one went <em>wide</em>.
        </h1>
        <p className="hero__lede">
          The page you're looking for doesn't exist or has been moved. Let's get you back in play.
        </p>
      </section>

      <section className="not-found__links">
        <Link to="/" className="not-found__home">
          ← Back to home
        </Link>
        {teams.length > 0 && (
          <nav className="not-found__teams" aria-label="Teams">
            <span className="muted">Or jump to a team:</span>
            {teams.map((team) => (
              <Link key={team.id} to={`/teams/${team.id}`} className="nav-link">
                {team.name}
              </Link>
            ))}
          </nav>
        )}
      </section>
    </div>
  );
}
