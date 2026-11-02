import { Link } from "react-router-dom";
import { teams } from "../data/loadTeams";

function formatGoalDiff(diff: number) {
  return diff > 0 ? `+${diff}` : String(diff);
}

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
          The website is dedicated to tracking the progress of U13 EA and U11 NYCFC players,
          providing insights into their development. Stay informed about upcoming events and be part
          of our vibrant community as we support the future stars of soccer.
        </p>
      </section>

      <section className="team-section">
        <h2 className="team-section__heading">Teams</h2>
        <div className="team-grid">
          {teams.map((team) => (
            <Link key={team.id} to={`/teams/${team.id}`} className="team-card">
              <div className="team-card__header">
                <div>
                  <h3>{team.name}</h3>
                  {team.season && <p className="team-card__season">{team.season}</p>}
                </div>
                <span className="team-card__badge">{team.players.length} players</span>
              </div>

              {team.record && (
                <div className="team-card__body">
                  <div className="team-card__record">
                    <div className="team-card__result team-card__result--win">
                      <strong>{team.record.wins}</strong>
                      <span>Wins</span>
                    </div>
                    <div className="team-card__result team-card__result--draw">
                      <strong>{team.record.draws}</strong>
                      <span>Draws</span>
                    </div>
                    <div className="team-card__result team-card__result--loss">
                      <strong>{team.record.losses}</strong>
                      <span>Losses</span>
                    </div>
                  </div>

                  <div
                    className="team-card__bar"
                    role="img"
                    aria-label={`${team.record.wins} wins, ${team.record.draws} draws, ${team.record.losses} losses`}
                  >
                    <span className="team-card__bar-win" style={{ flexGrow: team.record.wins }} />
                    <span className="team-card__bar-draw" style={{ flexGrow: team.record.draws }} />
                    <span className="team-card__bar-loss" style={{ flexGrow: team.record.losses }} />
                  </div>

                  <dl className="team-card__goals">
                    <div>
                      <dt>Played</dt>
                      <dd>{team.record.total}</dd>
                    </div>
                    <div>
                      <dt>Scored</dt>
                      <dd>{team.record.goalsFor}</dd>
                    </div>
                    <div>
                      <dt>Conceded</dt>
                      <dd>{team.record.goalsAgainst}</dd>
                    </div>
                    <div>
                      <dt>Diff</dt>
                      <dd>{formatGoalDiff(team.record.goalsFor - team.record.goalsAgainst)}</dd>
                    </div>
                  </dl>
                </div>
              )}

              <span className="team-card__cta">
                View roster <span aria-hidden="true">→</span>
              </span>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
