function MetricCard({ label, value, tone = "" }) {
  return (
    <article className="box">
      <p className="box-label">{label}</p>
      <h2 className={tone}>{value}</h2>
    </article>
  );
}

export default MetricCard;
