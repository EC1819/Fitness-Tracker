import { useEffect, useState } from "react";
import { API_URL } from "../api";
import MetricsCard from "../components/MetricsCard.jsx";
import MeasurementList from "../components/MeasurementList.jsx";

export default function BodyScreen() {
    const [measurements, setMeasurements] = useState([]);
    const [measurementsStatus, setMeasurementsStatus] = useState("loading");
    const [measurementsErrorMsg, setMeasurementsErrorMsg] = useState("");

    const [metrics, setMetrics] = useState(null);
    const [metricsStatus, setMetricsStatus] = useState("loading");
    const [metricsErrorMsg, setMetricsErrorMsg] = useState("");

    useEffect(() => {
        fetch(`${API_URL}/api/measurements`)
            .then((res) => {
                if (!res.ok) throw new Error(`Server error: ${res.status}`);
                return res.json();
            })
            .then((data) => {
                setMeasurements(data);
                setMeasurementsStatus("ready");
            })
            .catch((err) => {
                setMeasurementsErrorMsg(err.message);
                setMeasurementsStatus("error");
            });
    }, []);

    useEffect(() => {
        fetch(`${API_URL}/api/metrics`)
            .then((res) => {
                if (res.status === 404) return null;
                if (!res.ok) throw new Error(`Server error: ${res.status}`);
                return res.json();
            })
            .then((data) => {
                if (data) {
                    setMetrics(data);
                    setMetricsStatus("ready");
                } else {
                    setMetricsStatus("empty");
                }
            })
            .catch((err) => {
                setMetricsErrorMsg(err.message);
                setMetricsStatus("error");
            });
    }, []);

    return (
        <section>
            <h2>Body</h2>

            {metricsStatus === "loading" && <p>Loading stats...</p>}
            {metricsStatus === "empty" && (
                <p>Add a measurement to see your stats.</p>
            )}
            {metricsStatus === "error" && <p>Error: {metricsErrorMsg}</p>}
            {metricsStatus === "ready" && (
                <MetricsCard
                    bodyFatPercentage={metrics.bodyFatPercentage}
                    ffmi={metrics.ffmi}
                />
            )}

            <h3>History</h3>
            {measurementsStatus === "loading" && <p>Loading measurements...</p>}
            {measurementsStatus === "error" && (
                <p>Error: {measurementsErrorMsg}</p>
            )}
            {measurementsStatus === "ready" && (
                <MeasurementList measurements={measurements} />
            )}
        </section>
    );
}
