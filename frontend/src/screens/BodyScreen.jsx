import { useEffect, useState } from "react";
import { API_URL } from "../api";
import { describeFetchError } from "../errorMessages";
import MetricsCard from "../components/MetricsCard.jsx";
import MeasurementList from "../components/MeasurementList.jsx";
import Modal from "../components/Modal.jsx";
import MeasurementForm from "../components/MeasurementForm.jsx";

export default function BodyScreen() {
    const [measurements, setMeasurements] = useState([]);
    const [measurementsStatus, setMeasurementsStatus] = useState("loading");
    const [measurementsErrorMsg, setMeasurementsErrorMsg] = useState("");

    const [metrics, setMetrics] = useState(null);
    const [metricsStatus, setMetricsStatus] = useState("loading");
    const [metricsErrorMsg, setMetricsErrorMsg] = useState("");

    const [isAddOpen, setIsAddOpen] = useState(false);

    function fetchMeasurements() {
        return fetch(`${API_URL}/api/measurements`)
            .then((res) => {
                if (!res.ok) throw new Error(`Server error: ${res.status}`);
                return res.json();
            })
            .then((data) => {
                setMeasurements(data);
                setMeasurementsStatus("ready");
            })
            .catch((err) => {
                setMeasurementsErrorMsg(describeFetchError(err));
                setMeasurementsStatus("error");
            });
    }

    function loadMeasurements() {
        setMeasurementsStatus("loading");
        fetchMeasurements();
    }

    function fetchMetrics() {
        return fetch(`${API_URL}/api/metrics`)
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
                setMetricsErrorMsg(describeFetchError(err));
                setMetricsStatus("error");
            });
    }

    function loadMetrics() {
        setMetricsStatus("loading");
        fetchMetrics();
    }

    useEffect(() => {
        fetchMeasurements();
        fetchMetrics();
    }, []);

    function handleSaved() {
        setIsAddOpen(false);
        loadMeasurements();
        loadMetrics();
    }

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
            <button type="button" onClick={() => setIsAddOpen(true)}>
                Add
            </button>
            {measurementsStatus === "loading" && <p>Loading measurements...</p>}
            {measurementsStatus === "error" && (
                <p>Error: {measurementsErrorMsg}</p>
            )}
            {measurementsStatus === "ready" && (
                <MeasurementList measurements={measurements} />
            )}

            {isAddOpen && (
                <Modal title="Add Measurement" onCancel={() => setIsAddOpen(false)}>
                    <MeasurementForm onSaved={handleSaved} />
                </Modal>
            )}
        </section>
    );
}
