const POSITION_COLORS: Record<string, string> = {
  Forward: "#dc2626",
  Midfielder: "#16a34a",
  Defender: "#2b7fff",
  Goalkeeper: "#b45309",
};

const DEFAULT_COLOR = "#5b6673";

function getInitials(name: string): string {
  const parts = name.trim().split(/\s+/);
  const first = parts[0]?.[0] ?? "";
  const last = parts.length > 1 ? parts[parts.length - 1][0] : "";
  return (first + last).toUpperCase();
}

interface AvatarProps {
  name: string;
  position: string;
  size?: "sm" | "lg";
}

export default function Avatar({ name, position, size = "sm" }: AvatarProps) {
  return (
    <span
      className={`avatar avatar--${size}`}
      style={{ backgroundColor: POSITION_COLORS[position] ?? DEFAULT_COLOR }}
      aria-hidden="true"
    >
      {getInitials(name)}
    </span>
  );
}
