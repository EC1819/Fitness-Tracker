import { useState } from "react";
import { API_URL } from "../api";
import { formatFriendlyDate } from "../dateUtils";
import { describeFetchError } from "../errorMessages";
import { exerciseNameKey } from "../exerciseNames";

function groupSetsByExercise(sets) {
    const groups = [];
    const groupsByKey = new Map();

    for (const set of sets) {
        const key = exerciseNameKey(set.exerciseName);
        let group = groupsByKey.get(key);
        if (!group) {
            group = { exerciseName: set.exerciseName, sets: [] };
            groupsByKey.set(key, group);
            groups.push(group);
        }
        group.sets.push(set);
    }

    return groups;
}

function describeWeight(weightLbs) {
    return weightLbs === 0 ? "bodyweight" : `${weightLbs} lbs`;
}

function describeGroup(group) {
    const sorted = [...group.sets].sort((a, b) => a.setNumber - b.setNumber);
    const first = sorted[0];
    const allSame = sorted.every(
        (s) => s.reps === first.reps && s.weightLbs === first.weightLbs
    );

    if (allSame) {
        return `${group.exerciseName}: ${sorted.length} × ${first.reps} @ ${describeWeight(first.weightLbs)}`;
    }

    const details = sorted
        .map((s) => `Set ${s.setNumber}: ${s.reps} @ ${describeWeight(s.weightLbs)}`)
        .join(", ");
    return `${group.exerciseName} — ${details}`;
}

export default function WorkoutCard({ workout, onDeleted }) {
    const [isExpanded, setIsExpanded] = useState(false);
    const [deleteErrorMsg, setDeleteErrorMsg] = useState("");

    const groups = groupSetsByExercise(workout.sets);

    function handleDelete() {
        const confirmed = window.confirm("Delete this workout?");
        if (!confirmed) return;

        setDeleteErrorMsg("");
        fetch(`${API_URL}/api/workouts/${workout.id}`, { method: "DELETE" })
            .then((res) => {
                if (!res.ok) throw new Error(`Server error: ${res.status}`);
                onDeleted();
            })
            .catch((err) => setDeleteErrorMsg(describeFetchError(err)));
    }

    return (
        <li className="workout-card" onClick={() => setIsExpanded((prev) => !prev)}>
            <p className="workout-date">{formatFriendlyDate(workout.workoutDate)}</p>
            <ul>
                {groups.map((group) => (
                    <li key={group.exerciseName}>{describeGroup(group)}</li>
                ))}
            </ul>

            {isExpanded && (
                <div onClick={(e) => e.stopPropagation()}>
                    <button type="button" onClick={handleDelete}>
                        Delete
                    </button>
                    {deleteErrorMsg && <p className="error-banner">{deleteErrorMsg}</p>}
                </div>
            )}
        </li>
    );
}
