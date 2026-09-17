import type { Player, Team } from "./types";

const modules = import.meta.glob("./teams/*.json", { eager: true }) as Record<
  string,
  { default: Team }
>;

export const teams: Team[] = Object.values(modules)
  .map((mod) => mod.default)
  .sort((a, b) => a.name.localeCompare(b.name));

export function getTeam(teamId: string): Team | undefined {
  return teams.find((team) => team.id === teamId);
}

export function getPlayer(
  teamId: string,
  playerId: string,
): { team: Team; player: Player } | undefined {
  const team = getTeam(teamId);
  const player = team?.players.find((p) => p.id === playerId);
  if (!team || !player) return undefined;
  return { team, player };
}

export function topScorers(team: Team, count = 3): Player[] {
  return [...team.players]
    .sort((a, b) => b.goals - a.goals)
    .slice(0, count);
}

export function topAssisters(team: Team, count = 3): Player[] {
  return [...team.players]
    .sort((a, b) => b.assists - a.assists)
    .slice(0, count);
}
