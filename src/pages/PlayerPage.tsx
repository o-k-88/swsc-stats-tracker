import { Link, Navigate, useParams } from "react-router-dom";
import { getPlayer } from "../data/loadTeams";
import Avatar from "../components/Avatar";
import ShareChart from "../components/ShareChart";

export default function PlayerPage() {
  const { teamId, playerId } = useParams<{ teamId: string; playerId: string }>();
  const result = teamId && playerId ? getPlayer(teamId, playerId) : undefined;

  if (!result) {
    return <Navigate to="/" replace />;
  }

  const { team, player } = result;
  const goalsPerGame = player.gamesPlayed > 0 ? player.goals / player.gamesPlayed : 0;
  const assistsPerGame = player.gamesPlayed > 0 ? player.assists / player.gamesPlayed : 0;
  const total = player.goals + player.assists;

  const teamTotalGames = team.record?.total ?? team.events.length;
  const teamGoalsFor = team.record?.goalsFor ?? 0;

  return (
    <div className="page">
      <Link to={`/teams/${team.id}`} className="back-link">
        ← Back to {team.name}
      </Link>

      <section className="page-header player-header">
        <Avatar name={player.name} position={player.position} size="lg" />
        <div>
          <h1>{player.name}</h1>
          <p className="muted">
            #{player.number} · {player.position} · {team.name}
          </p>
        </div>
      </section>

      <section className="stat-cards">
        <div className="stat-card">
          <span className="stat-card__value">{player.gamesPlayed}</span>
          <span className="stat-card__label">Games Played</span>
        </div>
        <div className="stat-card">
          <span className="stat-card__value">{player.goals}</span>
          <span className="stat-card__label">Goals</span>
        </div>
        <div className="stat-card">
          <span className="stat-card__value">{player.assists}</span>
          <span className="stat-card__label">Assists</span>
        </div>

        <div className="stat-card">
          <span className="stat-card__value">{goalsPerGame.toFixed(2)}</span>
          <span className="stat-card__label">Goals / Game</span>
        </div>
        <div className="stat-card">
          <span className="stat-card__value">{assistsPerGame.toFixed(2)}</span>
          <span className="stat-card__label">Assists / Game</span>
        </div>
        <div className="stat-card">
          <span className="stat-card__value">{total}</span>
          <span className="stat-card__label">Total</span>
        </div>
      </section>

      <section>
        <h2>Share of Team Totals</h2>
        <ShareChart
          rows={[
            {
              label: "GP",
              value: teamTotalGames > 0 ? (player.gamesPlayed / teamTotalGames) * 100 : 0,
            },
            {
              label: "Goals",
              value: teamGoalsFor > 0 ? (player.goals / teamGoalsFor) * 100 : 0,
            },
            {
              label: "Assists",
              value: teamGoalsFor > 0 ? (player.assists / teamGoalsFor) * 100 : 0,
            },
          ]}
        />
      </section>
    </div>
  );
}
