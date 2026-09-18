import { useMemo, useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { getTeam, topAssisters, topScorers } from "../data/loadTeams";
import Avatar from "../components/Avatar";

export default function TeamPage() {
  const { teamId } = useParams<{ teamId: string }>();
  const team = teamId ? getTeam(teamId) : undefined;
  const [query, setQuery] = useState("");
  const [positionFilter, setPositionFilter] = useState("All");

  const positions = useMemo(
    () => (team ? Array.from(new Set(team.players.map((p) => p.position))).sort() : []),
    [team],
  );

  const sortedPlayers = useMemo(
    () => (team ? [...team.players].sort((a, b) => a.number - b.number) : []),
    [team],
  );

  const filteredPlayers = sortedPlayers.filter((player) => {
    const matchesQuery = player.name.toLowerCase().includes(query.trim().toLowerCase());
    const matchesPosition = positionFilter === "All" || player.position === positionFilter;
    return matchesQuery && matchesPosition;
  });

  if (!team) {
    return <Navigate to="/" replace />;
  }

  const scorers = topScorers(team);
  const assisters = topAssisters(team);

  return (
    <div className="page">
      <section className="page-header">
        <h1>{team.name}</h1>
        {team.season && <p className="muted">{team.season}</p>}
        {team.record && (
          <p className="team-record">
            {team.record.wins}W - {team.record.losses}L - {team.record.draws}D
            <span className="muted"> ({team.record.total} games)</span>
          </p>
        )}
      </section>

      <section className="leaderboards">
        <div className="leaderboard">
          <h2>Top Goal Scorers</h2>
          <ol className="leaderboard__list">
            {scorers.map((player) => (
              <li key={player.id}>
                <Link
                  to={`/teams/${team.id}/players/${player.id}`}
                  className="leaderboard__player"
                >
                  <Avatar name={player.name} position={player.position} />
                  {player.name}
                </Link>
                <span className="leaderboard__value">{player.goals}</span>
              </li>
            ))}
          </ol>
        </div>
        <div className="leaderboard">
          <h2>Top Assisters</h2>
          <ol className="leaderboard__list">
            {assisters.map((player) => (
              <li key={player.id}>
                <Link
                  to={`/teams/${team.id}/players/${player.id}`}
                  className="leaderboard__player"
                >
                  <Avatar name={player.name} position={player.position} />
                  {player.name}
                </Link>
                <span className="leaderboard__value">{player.assists}</span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section>
        <h2>Team Events</h2>
        <div className="table-scroll">
          <table className="data-table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Event</th>
                <th>Location</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {team.events.map((event) => (
                <tr key={event.id}>
                  <td>{event.date}</td>
                  <td>{event.event}</td>
                  <td>{event.location}</td>
                  <td>{event.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section>
        <h2>Roster</h2>
        <div className="roster-controls">
          <input
            type="text"
            className="roster-search"
            placeholder="Search players..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <select
            className="roster-filter"
            value={positionFilter}
            onChange={(e) => setPositionFilter(e.target.value)}
          >
            <option value="All">All positions</option>
            {positions.map((position) => (
              <option key={position} value={position}>
                {position}
              </option>
            ))}
          </select>
        </div>
        {filteredPlayers.length === 0 ? (
          <p className="muted">No players match your search.</p>
        ) : (
        <div className="table-scroll">
          <table className="data-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Position</th>
                <th>GP</th>
                <th>Goals</th>
                <th>Assists</th>
                <th>Goals/GP</th>
                <th>Assists/GP</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              {filteredPlayers.map((player) => (
                <tr key={player.id}>
                  <td>{player.number}</td>
                  <td>
                    <Link
                      to={`/teams/${team.id}/players/${player.id}`}
                      className="roster-player"
                    >
                      <Avatar name={player.name} position={player.position} />
                      {player.name}
                    </Link>
                  </td>
                  <td>{player.position}</td>
                  <td>{player.gamesPlayed}</td>
                  <td>{player.goals}</td>
                  <td>{player.assists}</td>
                  <td>
                    {player.gamesPlayed > 0 ? (player.goals / player.gamesPlayed).toFixed(2) : "-"}
                  </td>
                  <td>
                    {player.gamesPlayed > 0
                      ? (player.assists / player.gamesPlayed).toFixed(2)
                      : "-"}
                  </td>
                  <td>{player.goals + player.assists}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        )}
      </section>
    </div>
  );
}
