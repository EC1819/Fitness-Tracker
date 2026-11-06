import { useEffect, useState } from "react";
import { API_URL } from "../api";
import { formatFriendlyDate } from "../dateUtils";
import { describeFetchError } from "../errorMessages";
import MetricsCard from "../components/MetricsCard.jsx";
import WeekWorkoutsCard from "../components/WeekWorkoutsCard.jsx";

function toIsoDate(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
}

function getCurrentWeekRange() {
    const today = new Date();
    const dayOfWeek = today.getDay();
    const diffToMonday = dayOfWeek === 0 ? -6 : 1 - dayOfWeek;

    const monday = new Date(today);
    monday.setDate(today.getDate() + diffToMonday);

    const sunday = new Date(monday);
    sunday.setDate(monday.getDate() + 6);

    return { start: toIsoDate(monday), end: toIsoDate(sunday) };
}

export default function HomeScreen() {
    const [measurements, setMeasurements] = useState([]);
    const [measurementsStatus, setMeasurementsStatus] = useState("loading");
    const [measurementsErrorMsg, setMeasurementsErrorMsg] = useState("");

    const [metrics, setMetrics] = useState(null);
    const [metricsStatus, setMetricsStatus] = useState("loading");
    const [metricsErrorMsg, setMetricsErrorMsg] = useState("");

    const [workouts, setWorkouts] = useState([]);
    const [workoutsStatus, setWorkoutsStatus] = useState("loading");
    const [workoutsErrorMsg, setWorkoutsErrorMsg] = useState("");

    function fetchMeasurements() {
        return fetch(`${API_URL}/api/measurements`)
            .then((res) => {
                if (!res.ok) throw new Error(`Server error: ${res.status}`);
                return res.json();
            })
            .then((data) => {
                setMeasurements(data);
                setMeasurementsStatus(data.length === 0 ? "empty" : "ready");
            })
            .catch((err) => {
                setMeasurementsErrorMsg(describeFetchError(err));
                setMeasurementsStatus("error");
            });
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

    function fetchWorkouts() {
        return fetch(`${API_URL}/api/workouts`)
            .then((res) => {
                if (!res.ok) throw new Error(`Server error: ${res.status}`);
                return res.json();
            })
            .then((data) => {
                setWorkouts(data);
                setWorkoutsStatus("ready");
            })
            .catch((err) => {
                setWorkoutsErrorMsg(describeFetchError(err));
                setWorkoutsStatus("error");
            });
    }

    useEffect(() => {
        fetchMeasurements();
        fetchMetrics();
        fetchWorkouts();
    }, []);

    const latestMeasurement =
        measurements.length === 0
            ? null
            : [...measurements].sort((a, b) =>
                  b.measurementDate.localeCompare(a.measurementDate)
              )[0];

    const { start, end } = getCurrentWeekRange();
    const thisWeeksWorkouts = workouts.filter(
        (w) => w.workoutDate >= start && w.workoutDate <= end
    );

    return (
        <section>
            <h2>Home</h2>

            <div className="card">
                <h3>Latest Weight</h3>
                {measurementsStatus === "loading" && <p>Loading weight...</p>}
                {measurementsStatus === "empty" && (
                    <p>Add a measurement to see your latest weight.</p>
                )}
                {measurementsStatus === "error" && (
                    <p>Error: {measurementsErrorMsg}</p>
                )}
                {measurementsStatus === "ready" && latestMeasurement && (
                    <p>
                        {latestMeasurement.bodyWeightLbs} lbs on{" "}
                        {formatFriendlyDate(latestMeasurement.measurementDate)}
                    </p>
                )}
            </div>

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

            {workoutsStatus === "loading" && <p>Loading workouts...</p>}
            {workoutsStatus === "error" && <p>Error: {workoutsErrorMsg}</p>}
            {workoutsStatus === "ready" && (
                <WeekWorkoutsCard workouts={thisWeeksWorkouts} />
            )}
        </section>
    );
}
