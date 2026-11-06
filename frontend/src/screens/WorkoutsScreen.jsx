import { useEffect, useState } from "react";
import { API_URL } from "../api";
import { describeFetchError } from "../errorMessages";
import WorkoutList from "../components/WorkoutList.jsx";
import Modal from "../components/Modal.jsx";
import WorkoutForm from "../components/WorkoutForm.jsx";

export default function WorkoutsScreen() {
    const [workouts, setWorkouts] = useState([]);
    const [status, setStatus] = useState("loading");
    const [errorMsg, setErrorMsg] = useState("");

    const [isAddOpen, setIsAddOpen] = useState(false);

    function fetchWorkouts() {
        return fetch(`${API_URL}/api/workouts`)
            .then((res) => {
                if (!res.ok) throw new Error(`Server error: ${res.status}`);
                return res.json();
            })
            .then((data) => {
                setWorkouts(data);
                setStatus("ready");
            })
            .catch((err) => {
                setErrorMsg(describeFetchError(err));
                setStatus("error");
            });
    }

    function loadWorkouts() {
        setStatus("loading");
        fetchWorkouts();
    }

    useEffect(() => {
        fetchWorkouts();
    }, []);

    function handleSaved() {
        setIsAddOpen(false);
        loadWorkouts();
    }

    return (
        <section>
            <h2>Workouts</h2>

            <button type="button" className="btn-primary" onClick={() => setIsAddOpen(true)}>
                Add
            </button>

            {status === "loading" && <p>Loading workouts...</p>}
            {status === "error" && <p className="error-banner">{errorMsg}</p>}
            {status === "ready" && (
                <WorkoutList workouts={workouts} onDeleted={loadWorkouts} />
            )}

            {isAddOpen && (
                <Modal title="Add Workout">
                    <WorkoutForm
                        onSaved={handleSaved}
                        onCancel={() => setIsAddOpen(false)}
                    />
                </Modal>
            )}
        </section>
    );
}
