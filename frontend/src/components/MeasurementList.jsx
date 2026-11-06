import { formatFriendlyDate } from "../dateUtils";

export default function MeasurementList({ measurements }) {
    if (measurements.length === 0) {
        return <p>No measurements yet.</p>;
    }

    const sorted = [...measurements].sort((a, b) =>
        b.measurementDate.localeCompare(a.measurementDate)
    );

    return (
        <div className="card">
            <table>
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Weight (lbs)</th>
                        <th>Neck (in)</th>
                        <th>Waist (in)</th>
                        <th>Hip (in)</th>
                    </tr>
                </thead>
                <tbody>
                    {sorted.map((m) => (
                        <tr key={m.id}>
                            <td>{formatFriendlyDate(m.measurementDate)}</td>
                            <td>{m.bodyWeightLbs}</td>
                            <td>{m.neckIn}</td>
                            <td>{m.waistIn}</td>
                            <td>{m.hipIn ?? "-"}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
