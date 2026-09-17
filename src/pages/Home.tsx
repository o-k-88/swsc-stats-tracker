import { Link } from "react-router-dom";
import { teams } from "../data/loadTeams";

export default function Home() {
  return (
    <div className="page home">
      <section className="hero">
        <span className="hero__kicker">Saratoga Wilton Soccer Club</span>
        <h1>
          Welcome to <em>Soccer Stats</em> Tracker
        </h1>
        <p className="hero__lede">Developing the next generation of soccer stars.</p>
      </section>

      <section className="about">
        <h2>About</h2>
        <p>
          The website is dedicated to tracking the progress of U13 EA and White U11 NYCFC players,
          providing insights into their development. Stay informed about upcoming events and be part
          of our vibrant community as we support the future stars of soccer.
        </p>
      </section>

      <section className="team-section">
        <h2 className="team-section__heading">Teams</h2>
        <div className="team-grid">
          {teams.map((team) => (
            <Link key={team.id} to={`/teams/${team.id}`} className="team-card">
              <div>
                <h3>{team.name}</h3>
                {team.season && <p className="team-card__season">{team.season}</p>}
              </div>
              <div className="team-card__stats">
                <span>
                  <strong>{team.players.length}</strong> players
                </span>
                {team.record && (
                  <>
                    <span>
                      <strong>{team.record.total}</strong> games
                    </span>
                    <span className="team-card__record">
                      <strong>{team.record.wins}</strong>W
                      <strong>{team.record.losses}</strong>L
                      <strong>{team.record.draws}</strong>D
                    </span>
                  </>
                )}
              </div>
              <span className="team-card__cta">View roster →</span>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
