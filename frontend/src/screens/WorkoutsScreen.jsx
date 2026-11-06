import { useEffect, useState } from "react";
import { API_URL } from "../api";
import WorkoutList from "../components/WorkoutList.jsx";

export default function WorkoutsScreen() {
    const [workouts, setWorkouts] = useState([]);
    const [status, setStatus] = useState("loading");
    const [errorMsg, setErrorMsg] = useState("");

    function loadWorkouts() {
        setStatus("loading");
        fetch(`${API_URL}/api/workouts`)
            .then((res) => {
                if (!res.ok) throw new Error(`Server error: ${res.status}`);
                return res.json();
            })
            .then((data) => {
                setWorkouts(data);
                setStatus("ready");
            })
            .catch((err) => {
                setErrorMsg(err.message);
                setStatus("error");
            });
    }

    useEffect(() => {
        loadWorkouts();
    }, []);

    return (
        <section>
            <h2>Workouts</h2>

            {status === "loading" && <p>Loading workouts...</p>}
            {status === "error" && <p>Error: {errorMsg}</p>}
            {status === "ready" && (
                <WorkoutList workouts={workouts} onDeleted={loadWorkouts} />
            )}
        </section>
    );
}
