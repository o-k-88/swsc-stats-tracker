interface ShareRow {
  label: string;
  value: number;
}

interface ShareChartProps {
  rows: ShareRow[];
}

export default function ShareChart({ rows }: ShareChartProps) {
  return (
    <div className="share-chart">
      {rows.map((row) => {
        const pct = Math.max(0, Math.min(100, row.value));
        return (
          <div className="share-chart__column" key={row.label}>
            <span className="share-chart__value">{pct.toFixed(0)}%</span>
            <div className="share-chart__track">
              <div className="share-chart__bar" style={{ height: `${pct}%` }} />
            </div>
            <span className="share-chart__label">{row.label}</span>
          </div>
        );
      })}
    </div>
  );
}
