export default function MetricsCard({ bodyFatPercentage, ffmi }) {
    return (
        <div className="metrics-card">
            <h3>Current Stats</h3>
            <p>Body Fat: {bodyFatPercentage.toFixed(1)}%</p>
            <p>FFMI: {ffmi.toFixed(1)}</p>
        </div>
    );
}
